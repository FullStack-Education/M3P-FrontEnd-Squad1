import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AlunoService } from '../../shared/services/aluno.service';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  
  alunosCadastrados: any;
  docentesCadastrados: any;
  turmasCadastradas: any;

  alunos: any[] = [];
  filteredAlunos: any[] = [];

  searchQuery: any;

  constructor(
    private router: Router,
    private alunoService: AlunoService,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.buscarAlunos();
    this.buscarEstatisticas();

  }

  buscarAlunos() {
    return this.alunoService.getAlunos().subscribe(response => {
      this.alunos = response;
      this.filteredAlunos = [...this.alunos];
    });
  }

  buscarEstatisticas() {
    this.adminService.getEstatisticas().subscribe( response => {
      this.alunosCadastrados = response.alunos;
      this.docentesCadastrados = response.docentes;
      this.turmasCadastradas = response.turmas;
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
