import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  constructor(private http:HttpClient) { }
  
  getDocentes(): Observable<any> {
    let url = 'http://localhost:8080/docentes';
    let token = sessionStorage.getItem('token');

    let headers = new HttpHeaders({
      'Authorization' : `${token}`
    })

    return this.http.get<any>(url, { headers });
  }

  getCursos(): Observable<any> {
    let url = 'http://localhost:8080/cursos';
    let token = sessionStorage.getItem('token');

    let headers = new HttpHeaders({
      'Authorization' : `${token}`
    })

    return this.http.get<any>(url, { headers });
  }

  cadastrarTurma(turma: any): Observable<any> {
    let url = 'http://localhost:8080/turmas';
    let token = sessionStorage.getItem('token');

    let data = { ...turma }

    let headers = new HttpHeaders({
      'Authorization' : `${token}`
    })

    return this.http.post<any>(url, data, { headers });
  }

  cadastrarUsuarioDocente(docente: any): Observable<any> {
    let url = 'http://localhost:8080/cadastro';
    let token = sessionStorage.getItem('token');

    let data = { ...docente }

    let usuario = {
      login: `${data.email}`,
      senha: `${data.senha}`,
      papel: "PROFESSOR"
    }

    let headers = new HttpHeaders({
      'Authorization' : `${token}`
    });

    return this.http.post<any>(url, usuario, { headers });
  }

  cadastroDocente(docente: any): Observable<any> {
    let url = 'http://localhost:8080/docentes';
    let token = sessionStorage.getItem('token');

    let data = { ...docente }

    let headers = new HttpHeaders({
      'Authorization' : `${token}`
    })

    return this.http.post<any>(url, data, { headers });
  }

  deletarDocente(id: number): Observable<any> {
    let url = 'http://localhost:8080/docentes/' + `${id}`;
    let token = sessionStorage.getItem('token');

    let headers = new HttpHeaders({
      'Authorization' : `${token}`
    })
    return this.http.delete(url, { headers });
  }

}