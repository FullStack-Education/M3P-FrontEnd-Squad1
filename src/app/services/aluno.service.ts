import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private readonly STORAGE_KEY = 'alunos';

  constructor() { }

  saveAluno(aluno: any): void {
    const alunos = this.getalunos();
    alunos.push(aluno);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(alunos));
  }

  getalunos(): any[] {
    const alunos = localStorage.getItem(this.STORAGE_KEY);
    return alunos ? JSON.parse(alunos) : [];
  }
}
