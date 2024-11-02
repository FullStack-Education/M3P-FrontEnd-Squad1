import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {

  constructor(private http:HttpClient) { }

  cadastroAvaliacao(avaliacao: any): Observable<any> {
    let url = 'http://localhost:8080/notas';
    let token = sessionStorage.getItem('token');

    let data = { ...avaliacao }

    let headers = new HttpHeaders({
      'Authorization' : `${token}`
    })

    return this.http.post<any>(url, data, { headers });
  }
}
