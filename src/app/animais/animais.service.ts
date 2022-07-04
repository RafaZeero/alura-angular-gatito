import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from '../autenticacao/token.service';
import { Animais, Animal } from './animais';

const API = environment.apiURL;

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
    return this.http.get<Animais>(`${API}/${nomeDoUsuario}/photos`, {
      headers,
    });
  }

  buscaPorID(ID: number): Observable<Animal> {
    // fetch token
    const token = this.tokenService.retornaToken();

    // send headers
    const headers = new HttpHeaders().append('x-access-token', token);

    return this.http.get<Animal>(`${API}/photos/${ID}`, { headers });
  }
}
