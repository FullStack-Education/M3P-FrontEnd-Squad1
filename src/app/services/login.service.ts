import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }


  login(login: string, senha: string) {

    let url = 'http://localhost:8080/login';

    const body = {
      login: `${login}`,
      senha: `${senha}`
    }

    return this.http.post(url, body).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMsg = 'Usuário com login ou senha errados.'

    if (error.error instanceof ErrorEvent) {
      errorMsg = `Error: ${error.error.message}`;
    } else {
      errorMsg = `Error código: ${error.status}\nMessage: 'Usuário com login ou senha errados.`
    }

    alert(errorMsg);
    return throwError(errorMsg);
  }




  getCursos() {

    let url = 'http://localhost:8080/cursos';
    let token = sessionStorage.getItem('token');

    console.log(token)

    let headers = new HttpHeaders({
      'Authorization' : `${token}`
    })

    return this.http.get(url, { headers });
  }
}
