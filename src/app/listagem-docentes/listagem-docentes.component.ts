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

  constructor(private router: Router,
    private docenteService: DocenteService) {}

  searchQuery: string = '';
  filteredDocentes: any[] = [];
  docentes: any[] = []


  ngOnInit(): void {
    this.carregarDocentes();
  }

  carregarDocentes() {
    return this.docenteService.getDocentes().subscribe(response => {
      this.docentes = response;
      this.filteredDocentes = [...this.docentes];
    });
  }

  onSearch(searchQuery: string) {
    if (searchQuery) {
      this.filteredDocentes = this.docentes.filter(docente =>
        docente.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        docente.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        docente.id.toString() === searchQuery
      );
    } else {
      this.filteredDocentes = [...this.docentes];
    }
  }  

  onViewDocente(docente: any) {
    this.router.navigate(['/cadastro-docente'], { state: { docente } });
  }
}
