import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DocenteService } from '../services/docente.service';

@Component({
  selector: 'app-listagem-docentes',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './listagem-docentes.component.html',
  styleUrls: ['./listagem-docentes.component.css'],
})
export class ListagemDocentesComponent implements OnInit {

  constructor(private router: Router) {}
  docenteService = inject(DocenteService);

  docentes = this.docenteService.getMock();
  searchQuery: string = '';
  filteredDocentes: any[] = [];

  ngOnInit(): void {
    this.filteredDocentes = [...this.docentes];
  }

  onSearch(searchQuery: string) {
    if (searchQuery) {
      this.filteredDocentes = this.docentes.filter(docente =>
        docente.nome.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        docente.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        docente.id.toString() == this.searchQuery
      );
    } else {
      this.filteredDocentes = [...this.docentes];
    }
  }

  onViewDocente(event: Event) {
    this.router.navigate(['/cadastro-docente'], { state: { event } });
  }
}
