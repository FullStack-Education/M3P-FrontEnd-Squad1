import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-docente',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-docente.component.html',
  styleUrls: ['./home-docente.component.css']
})
export class DocenteHomeComponent implements OnInit {
  alunos: any[] = [];

  constructor(
    private router: Router,
  ) {}


  ngOnInit() {
    this.alunos = [
      { nome: 'João Silva', idade: 20, email: 'joao@example.com' },
      { nome: 'Maria Oliveira', idade: 22, email: 'maria@example.com' },
      { nome: 'Carlos Santos', idade: 19, email: 'carlos@example.com' },
    ];
  }

  pesquisarAluno(query: string) {
    alert('Função de pesquisa ainda não implementada.');
  }

  lancarNota(aluno: any) {
    this.router.navigate(['/cadastro-avaliacao']);
  }
}
