import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AlunoService } from '../services/aluno.service';

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
  
  cursosExtras: string[] = ['Artesanato', 'Informática', 'Artes Cênicas']; 

  constructor(
    private router: Router, private alunoService: AlunoService
  ) {}

  ngOnInit() {
    this.buscaIdent();
    this.buscarNotasAluno(this.aluno);

    this.materias = ['Matemática', 'Português', 'Física'];
  }

  buscaIdent() {
    this.aluno = sessionStorage.getItem('entityId');
  }

  buscarNotasAluno(id: number) {
    return this.alunoService.getNotasAluno(id).subscribe(response => {
      this.avaliacoes = response
      .sort((a: any, b: any) => new Date(a.data).getTime() - new Date(b.data).getTime())
      .reverse()
      .slice(0, 3);

      for (let avalacao of this.avaliacoes) {
        avalacao.data = this.formataData(avalacao.data);
      }
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
}
