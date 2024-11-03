import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AlunoService } from '../../shared/services/aluno.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-docente',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home-docente.component.html',
  styleUrls: ['./home-docente.component.css']
})
export class DocenteHomeComponent implements OnInit {

  constructor(
    private router: Router,
    private alunoService: AlunoService
  ) {}

  alunos: any[] = [];
  filteredAlunos: any[] = [];
  searchQuery: string = '';

  ngOnInit() {
    this.buscarAlunos();
  }

  buscarAlunos() {
    return this.alunoService.getAlunos().subscribe(response => {
      this.alunos = response;
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

  lancarNota(aluno: any) {
    this.router.navigate(['/cadastro-avaliacao'], { state: { aluno } });
  }
}
