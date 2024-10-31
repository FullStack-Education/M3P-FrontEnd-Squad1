import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private readonly STORAGE_KEY = 'alunos';

  constructor(private http:HttpClient) { }
  
  getTurmas(): Observable<any> {
    let url = 'http://localhost:8080/turmas';
    let token = sessionStorage.getItem('token');

    let headers = new HttpHeaders({
      'Authorization' : `${token}`
    })

    return this.http.get<any>(url, { headers });
  }

  getAlunos(): Observable<any> {
    let url = 'http://localhost:8080/alunos';
    let token = sessionStorage.getItem('token');

    let headers = new HttpHeaders({
      'Authorization' : `${token}`
    })

    return this.http.get<any>(url, { headers });
  }

  getMaterias(): Observable<any> {
    let url = 'http://localhost:8080/materias';
    let token = sessionStorage.getItem('token');

    let headers = new HttpHeaders({
      'Authorization' : `${token}`
    })

    return this.http.get<any>(url, { headers });
  }


  saveAluno(aluno: any): void {
    // const alunos = this.getalunos();
    // alunos.push(aluno);
    // localStorage.setItem(this.STORAGE_KEY, JSON.stringify(alunos));
  }

  // getalunos(): any[] {
  //   const alunos = localStorage.getItem(this.STORAGE_KEY);
  //   return alunos ? JSON.parse(alunos) : [];
  // }

  

  getMock(): any[] {
    return [
      {
        id: '12',
        nome: 'Pedro Torres',
        genero: 'Masculino',
        nascimento: '1984-09-10',
        cpf: '000.000.000-00',
        rg: '123456-RI',
        idade: '21',
        expeditor: 'SSP',
        naturalidade: 'Florianópolis',
        estadoCivil: 'Solteiro(a)',
        telefone: '(48)99999-0000',
        email: 'aluno@scholargate.com',
        senha: 'aluno123',
        perfil: 'ALUNO',
        endereco: {
          cep: '88040-030',
          cidade: '',
          logradouro: '',
          numero: '',
          complemento: '',
          bairro: '',
          referencia: '',
        },
        turma: [
          'Turma A',
        ]
      },
      {
        id: '2',
        nome: 'André das Couves',
        genero: 'Masculino',
        nascimento: '1984-09-10',
        cpf: '000.000.000-00',
        rg: '123456-RI',
        idade: '21',
        expeditor: 'SSP',
        naturalidade: 'Florianópolis',
        estadoCivil: 'Solteiro(a)',
        telefone: '(48)99999-0000',
        email: 'aluno@scholargate.com',
        senha: 'aluno123',
        perfil: 'ALUNO',
        endereco: {
          cep: '88040-030',
          cidade: '',
          logradouro: '',
          numero: '',
          complemento: '',
          bairro: '',
          referencia: '',
        },
        turma: [
          'Turma B',
          'Turma D'
        ]
      }
    ]
  }
}
