import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UsuarioService } from './usuario/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  apiUrl = 'http://localhost:3000/user/login';
  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) {}

  // authentication from form to connect to api
  autenticar(usuario: string, senha: string): Observable<HttpResponse<any>> {
    return this.http
      .post(
        this.apiUrl,
        {
          // send body to request
          userName: usuario,
          password: senha,
        },
        {
          // get headers from request
          observe: 'response',
        }
      )
      .pipe(
        tap((response) => {
          // get token in header
          const authToken = response.headers.get('x-access-token') ?? '';
          // save token in fn 'salvaToken'
          this.usuarioService.salvaToken(authToken);
        })
      );
  }
}
