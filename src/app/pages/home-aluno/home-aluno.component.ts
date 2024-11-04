import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AlunoService } from '../../shared/services/aluno.service';

@Component({
  selector: 'app-home-aluno',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-aluno.component.html',
  styleUrls: ['./home-aluno.component.css']
})
export class HomeAlunoComponent implements OnInit {


  aluno: any;

  avaliacoes: any[] = []; 
  materias: string[] = [];

  cursos: any[] = [];
  cursosExtras = new Set();

  constructor(
    private router: Router, private alunoService: AlunoService
  ) {}

  ngOnInit() {
    this.buscaIdent();
    this.buscarNotasAluno(this.aluno);
  }

  buscarNotasAluno(id: number) {
    return this.alunoService.getNotasAluno(id).subscribe(response => {
      this.avaliacoes = response
      .sort((a: any, b: any) => new Date(a.data).getTime() - new Date(b.data).getTime())
      .reverse()
      .slice(0, 3);

      let materias: any[] = [];

      for (let avalacao of this.avaliacoes) {
        avalacao.data = this.formataData(avalacao.data);
        materias.push(avalacao.materia.nome);
      }

      this.materias = Array.from(new Set(materias));

      this.defineCursos();
    });
  }

  defineCursos() {
    let cursosMatriculados = new Set();
    for (let avaliacao of this.avaliacoes) {
      cursosMatriculados.add(avaliacao.aluno.turma.curso.nome);
    }

    cursosMatriculados.forEach(x => this.cursos.push(x));

    let cursosExtras = new Set();
    this.alunoService.getCursos().subscribe(response => {
      for (let curso of response) {
        cursosExtras.add(curso.nome)
      }

      this.lancaExtras(cursosExtras, cursosMatriculados);
    });   
  }

  formataData(data: string) {
    let arrayData = data.split('-')
    let dia = arrayData[2];
    let mes = arrayData[1];
    let ano = arrayData[0];
    return dia + '/' + mes + '/' + ano
  }

  verMaisAvaliacao(avaliacao: any) {
    this.router.navigate(['/listagem-notas']);
  }

  buscaIdent() {
    this.aluno = sessionStorage.getItem('entityId');
  }

  lancaExtras(setA: Set<any>, setB: Set<any>) {
    let extras = new Set([...setA].filter(x => !setB.has(x)));
    this.cursosExtras = extras;
  }
}
