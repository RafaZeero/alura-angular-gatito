import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  apiUrl = 'http://localhost:3000/user/login';
  constructor(private http: HttpClient) {}

  // authentication from form to connect to api
  autenticar(usuario: string, senha: string): Observable<any> {
    return this.http.post(this.apiUrl, {
      userName: usuario,
      password: senha,
    });
  }
}
