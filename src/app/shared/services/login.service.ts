import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(login: string, senha: string): Observable<any> {
    let url = 'http://localhost:8080/login';

    const body = {
      login: `${login}`,
      senha: `${senha}`
    }

    return this.http.post<any>(url, body).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg = 'Usuário com login ou senha errados.'

    if (error.error instanceof ErrorEvent) {
      errorMsg = `Error: ${error.error.message}`;
    } else {
      errorMsg = `Error código: ${error.status}\nMessage: 'Usuário com login ou senha errados.`
    }

    alert(errorMsg);
    return throwError(() => new Error(errorMsg));
  }
}
