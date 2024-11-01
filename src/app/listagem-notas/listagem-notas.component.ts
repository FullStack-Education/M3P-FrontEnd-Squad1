import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AvaliacaoService } from '../services/avaliacao.service';
import { AlunoService } from '../services/aluno.service';

@Component({
  selector: 'app-listagem-notas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listagem-notas.component.html',
  styleUrl: './listagem-notas.component.css'
})
export class ListagemNotasComponent {

  constructor(private avaliacaoService: AvaliacaoService,
     private alunoService: AlunoService) { }

  avaliacoes: any[] = [];
  aluno: any;

  ngOnInit() {
    this.buscaIdent();
    this.buscarNotasAluno(this.aluno);
  }

  buscaIdent() {
    this.aluno = sessionStorage.getItem('entityId');
  }

  buscarNotasAluno(id: number) {
    return this.alunoService.getNotasAluno(id).subscribe(response => {
      this.avaliacoes = response;
    });
  }

  formataData(data: string) {
    let arrayData = data.split('-')
    let dia = arrayData[2];
    let mes = arrayData[1];
    let ano = arrayData[0];
    return dia + '/' + mes + '/' + ano
  }
}
