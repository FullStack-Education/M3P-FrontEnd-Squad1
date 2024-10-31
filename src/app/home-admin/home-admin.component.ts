import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AlunoService } from '../services/aluno.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  
  alunosCadastrados: number = 0;
  docentesCadastrados: number = 0;
  turmasCadastradas: number = 0;

  alunos: any[] = [];

  filteredAlunos: any[] = [];

  searchQuery: any;

  constructor(
    private router: Router,
    private alunoService: AlunoService
  ) {}

  ngOnInit() {
    this.docentesCadastrados = 25;
    this.turmasCadastradas = 99;

    this.buscarAlunos();
  }

  buscarAlunos() {
    return this.alunoService.getAlunos().subscribe(response => {
      this.alunos = response;
      this.alunosCadastrados = this.alunos.length;
      this.filteredAlunos = [...this.alunos];
    });
  }

  onSearch(searchQuery: string) {
    if (searchQuery) {
      this.filteredAlunos = this.alunos.filter(aluno =>
        aluno.nome.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        aluno.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        aluno.id.toString() == this.searchQuery
      );
    } else {
      this.filteredAlunos = [...this.alunos];
    }
  }

  verMaisAluno(aluno: any) {
    this.router.navigate(['/cadastro-aluno'], { state: { aluno } });
  }
}
