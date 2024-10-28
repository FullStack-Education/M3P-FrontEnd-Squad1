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
        genero: 'Masculino',
        nascimento: '1984-09-10',
        cpf: '000.000.000-00',
        rg: '123456-RI',
        idade: '21',
        expeditor: 'SSP',
        naturalidade: 'Florianópolis',
        estadoCivil: 'Casado(a)',
        telefone: '(48)99999-0000',
        email: 'docente@scholargate.com',
        senha: 'docente123',
        perfil: 'Docente',
        endereco: {
          cep: '88040-030',
          cidade: '',
          logradouro: '',
          numero: '',
          complemento: '',
          bairro: '',
          referencia: '',
        },
        materias: [
          'Matemática',
          'Física'
        ]
      },
      {
        id: '10',
        nome: 'Fulano de Tal',
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
        }
      }
    ]
  }

}
