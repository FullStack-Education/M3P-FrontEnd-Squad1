import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-listagem-notas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listagem-notas.component.html',
  styleUrl: './listagem-notas.component.css'
})
export class ListagemNotasComponent {
  avaliacoes: any[] = [];

  ngOnInit() {
    
  }

  buscarAvaliacoes() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser && currentUser.role === 'ALUNO') {
      this.avaliacoes = this.getAvaliacoesDoAluno(currentUser.name);
    } else {
      alert('Acesso restrito para alunos.');
    }
  }

  getAvaliacoesDoAluno(nomeAluno: string): any[] {
    const todasAvaliacoes = JSON.parse(localStorage.getItem('avaliacoes') || '[]');
    return todasAvaliacoes.filter((avaliacao: any) =>
      avaliacao.aluno.toLowerCase() === nomeAluno.toLowerCase()
    ).sort((a: any, b: any) => new Date(a.dataInicio).getTime() - new Date(b.dataInicio).getTime());
  }
}
