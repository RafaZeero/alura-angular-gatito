import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../autenticacao/token.service';
import { Animais } from './animais';

const apiURL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class AnimaisService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  listaDoUsuario(nomeDoUsuario: string): Observable<Animais> {
    // fetch token from current User
    const token = this.tokenService.retornaToken();
    // send token through headers - Angular Headers
    const headers = new HttpHeaders().append('x-access-token', token);
    return this.http.get<Animais>(`${apiURL}/${nomeDoUsuario}/photos`, {
      headers,
    });
  }
}
