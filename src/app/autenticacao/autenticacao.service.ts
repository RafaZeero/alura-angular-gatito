import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UsuarioService } from './usuario/usuario.service';
import { environment } from 'src/environments/environment';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) {}

  // authentication from form to connect to api
  autenticar(usuario: string, senha: string): Observable<HttpResponse<any>> {
    return this.http
      .post(
        `${API}/user/login`,
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
