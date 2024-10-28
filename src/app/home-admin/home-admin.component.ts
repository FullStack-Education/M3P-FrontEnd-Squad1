import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AlunoService } from '../services/aluno.service';

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

  alunos = this.alunoService.getMock();

  constructor(
    private router: Router,
    private alunoService: AlunoService
  ) {}

  ngOnInit() {
    this.alunosCadastrados = 120;
    this.docentesCadastrados = 25;
    this.turmasCadastradas = 8;
  }

  pesquisarAluno(query: string) {
    alert('Função de pesquisa ainda não implementada.');
  }

  verMaisAluno(aluno: any) {
    this.router.navigate(['/cadastro-aluno'], { state: { aluno } });
  }
}
