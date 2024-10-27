import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listagem-docentes',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './listagem-docentes.component.html',
  styleUrls: ['./listagem-docentes.component.css'],
})
export class ListagemDocentesComponent implements OnInit {
  docentes: any[] = [];
  searchQuery: string = '';
  filteredDocentes: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadDocentes();
  }

  loadDocentes() {
    const storedDocentes = localStorage.getItem('docentes');
    if (storedDocentes) {
      this.docentes = JSON.parse(storedDocentes);
      this.filteredDocentes = [...this.docentes];
    }
  }

  onSearch() {
    if (this.searchQuery.trim() !== '') {
      this.filteredDocentes = this.docentes.filter((docente) =>
        docente.nome.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        docente.id.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredDocentes = [...this.docentes];
    }
  }

  onViewDocente() {
    this.router.navigate(['/cadastro-docente']);
  }
}
