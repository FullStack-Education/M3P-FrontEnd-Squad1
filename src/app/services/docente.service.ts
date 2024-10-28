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

  getMock(): any[] {
    return [
      {
        id: '2',
        nome: 'Otávio Queiroz',
        genero: '',
        nascimento: '',
        cpf: '',
        rg: '',
        idade: '',
        expeditor: '',
        naturalidade: '',
        estadoCivil: '',
        telefone: '',
        email: 'docente@scholargate.com',
        senha: 'docente123',
        perfil: 'Docente',
        endereco: {
          cep: '',
          cidade: '',
          logradouro: '',
          numero: '',
          complemento: '',
          bairro: '',
          referencia: '',
        },
        materias: {}
      },
      {
        id: '20',
        nome: 'Professor Silvério',
        genero: '',
        nascimento: '',
        cpf: '',
        rg: '',
        idade: '',
        expeditor: '',
        naturalidade: '',
        estadoCivil: '',
        telefone: '',
        email: 'docente@scholargate.com',
        senha: 'docente123',
        perfil: 'Docente',
        endereco: {
          cep: '',
          cidade: '',
          logradouro: '',
          numero: '',
          complemento: '',
          bairro: '',
          referencia: '',
        },
        materias: {}
      }
    ]
  }

    getDocenteLogado(nome: String) {
      let docentes = this.getMock();

      for (let docente of docentes) {
        if(docente.nome == nome) {
          return [docente];
        }
      }
    return []
  }

}