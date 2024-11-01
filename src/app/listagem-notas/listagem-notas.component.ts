import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AvaliacaoService } from '../services/avaliacao.service';

@Component({
  selector: 'app-listagem-notas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listagem-notas.component.html',
  styleUrl: './listagem-notas.component.css'
})
export class ListagemNotasComponent {

  constructor(private avaliacaoService: AvaliacaoService) { }

  avaliacoes: any[] = [];
  aluno: any;

  ngOnInit() {
    this.buscarAvaliacoes();
  }

  buscarAvaliacoes() {
    // const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    // if (currentUser && currentUser.role === 'ALUNO') {
    //   this.avaliacoes = this.avaliacaoService.getMock()
    //   .sort((a: any, b: any) => new Date(a.data).getTime() - new Date(b.data).getTime());
  
    //   for(let nota of this.avaliacoes) {
    //     nota.data = this.formataData(nota.data)
    //   }
    // }

  }
  

  formataData(data: string) {
    let arrayData = data.split('-')
    let dia = arrayData[2];
    let mes = arrayData[1];
    let ano = arrayData[0];
    return dia + '/' + mes + '/' + ano
  }
}
