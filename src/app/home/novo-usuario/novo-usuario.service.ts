import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NovoUsuario } from './novo-usuario';

@Injectable({
  providedIn: 'root',
})
export class NovoUsuarioService {
  apiURL = 'http://localhost:3000/user/signup';
  constructor(private http: HttpClient) {}

  cadastraNovoUsuario(novoUsuario: NovoUsuario): Observable<any> {
    return this.http.post(this.apiURL, novoUsuario);
  }
}
