import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  alunosCadastrados: number = 0;
  docentesCadastrados: number = 0;
  turmasCadastradas: number = 0;

  alunos: any[] = [];

  constructor(
    private router: Router,
  ) {}

  ngOnInit() {
    this.alunosCadastrados = 120;
    this.docentesCadastrados = 25;
    this.turmasCadastradas = 8;

    this.alunos = [
      { nome: 'João Silva', idade: 20, email: 'joao@example.com' },
      { nome: 'Maria Oliveira', idade: 22, email: 'maria@example.com' },
      { nome: 'Carlos Santos', idade: 19, email: 'carlos@example.com' },
    ];
  }

  pesquisarAluno(query: string) {
    alert('Função de pesquisa ainda não implementada.');
  }

  verMaisAluno(aluno: any) {
    this.router.navigate(['/cadastro-aluno']);
  }
}
