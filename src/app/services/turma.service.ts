import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {
  private readonly STORAGE_KEY = 'turmas';

  constructor() { }

  saveAluno(aluno: any): void {
    const turmas = this.getTurmas();
    turmas.push(aluno);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(turmas));
  }

  getTurmas(): any[] {
    const turmas = localStorage.getItem(this.STORAGE_KEY);
    return turmas ? JSON.parse(turmas) : [];
  }

  getTurmasByDocente(docenteId: number): Observable<any[]> {
    const turmas = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    const filteredTurmas = turmas.filter((turma: any) => turma.docenteId === docenteId);
    return of(filteredTurmas);
  }

}
