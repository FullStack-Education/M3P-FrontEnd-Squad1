import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-aluno',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-aluno.component.html',
  styleUrls: ['./home-aluno.component.css']
})
export class HomeAlunoComponent implements OnInit {
  avaliacoes: any[] = []; 
  materias: string[] = [];
  cursosExtras: string[] = ['Artesanato', 'Informática', 'Artes Cênicas']; 

  constructor(
    private router: Router,
  ) {}

  ngOnInit() {
    this.avaliacoes = [
      { nome: 'Prova de Matemática', materia: 'Matemática', data: '2024-08-15' },
      { nome: 'Redação', materia: 'Português', data: '2024-08-20' },
      { nome: 'Exame de Física', materia: 'Física', data: '2024-08-25' },
      { nome: 'Redação II', materia: 'Português', data: '2024-10-20' },
      { nome: 'Trabalho de Química', materia: 'Química', data: '2024-05-22' }
    ];

    this.materias = ['Matemática', 'Português', 'Física'];

    this.avaliacoes = this.avaliacoes
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, 3);
  }

  verMaisAvaliacao(avaliacao: any) {
    this.router.navigate(['/listagem-notas']);
  }
}
