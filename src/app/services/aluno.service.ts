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

  getNotasAluno(id: any): Observable<any> {
    let url = 'http://localhost:8080/alunos/' + `${id}` + '/notas';
    let token = sessionStorage.getItem('token');

    let headers = new HttpHeaders({
      'Authorization' : `${token}`
    })

    return this.http.get<any>(url, { headers });
  }


  cadastrarUsuarioAluno(aluno: any): Observable<any> {
    let url = 'http://localhost:8080/cadastro';
    let token = sessionStorage.getItem('token');

    let data = { ...aluno }

    let usuario = {
      login: `${data.email}`,
      senha: `${data.senha}`,
      papel: "ALUNO"
    }

    let headers = new HttpHeaders({
      'Authorization' : `${token}`
    });

    return this.http.post<any>(url, usuario, { headers });
  }

  cadastrarAluno(aluno: any): Observable<any> {
    let url = 'http://localhost:8080/alunos';
    let token = sessionStorage.getItem('token');

    let data = { ...aluno }

    let headers = new HttpHeaders({
      'Authorization' : `${token}`
    })

    return this.http.post<any>(url, data, { headers });
  }
}
