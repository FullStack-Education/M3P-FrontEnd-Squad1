import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
  private readonly STORAGE_KEY = 'docentes';

  constructor() { }

  saveDocente(docente: any): void {
    const docentes = this.getDocentes();
    docentes.push(docente);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(docentes));
  }

  getDocentes(): any[] {
    const docentes = localStorage.getItem(this.STORAGE_KEY);
    return docentes ? JSON.parse(docentes) : [];
  }

  deleteDocente(docenteId: number): void {
    const docentes = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    const updatedDocentes = docentes.filter((docente: any) => docente.id !== docenteId);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedDocentes));
  }

}
