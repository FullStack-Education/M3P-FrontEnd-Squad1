import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {
  private readonly STORAGE_KEY = 'avaliacoes';

  constructor() { }

  saveavaliacao(avaliacao: any): void {
    const avaliacoes = this.getavaliacoes();
    avaliacoes.push(avaliacao);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(avaliacoes));
  }

  getavaliacoes(): any[] {
    const avaliacoes = localStorage.getItem(this.STORAGE_KEY);
    return avaliacoes ? JSON.parse(avaliacoes) : [];
  }

  getAvaliacoesByDocente(docenteId: number): Observable<any[]> {
    const avaliacoes = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    const filteredAvaliacoes = avaliacoes.filter((avaliacao: any) => avaliacao.docenteId === docenteId);
    return of(filteredAvaliacoes);
  }

}
