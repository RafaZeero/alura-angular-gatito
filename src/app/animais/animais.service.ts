import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from '../autenticacao/token.service';
import { Animais, Animal } from './animais';

const API = environment.apiURL;
const NOT_MODIFIED = '304';

@Injectable({
  providedIn: 'root',
})
export class AnimaisService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  listaDoUsuario(nomeDoUsuario: string): Observable<Animais> {
    return this.http.get<Animais>(`${API}/${nomeDoUsuario}/photos`);
  }

  buscaPorID(ID: number): Observable<Animal> {
    return this.http.get<Animal>(`${API}/photos/${ID}`);
  }

  excluiAnimal(ID: number): Observable<Animal> {
    return this.http.delete<Animal>(`${API}/photos/${ID}`);
  }

  curtir(ID: number): Observable<boolean> {
    return this.http
      .post(`${API}/photos/${ID}/likes`, {}, { observe: 'response' })
      .pipe(
        map(() => true),
        catchError((error) => {
          return error.status === NOT_MODIFIED
            ? of(false)
            : throwError(() => new Error(error.message));
        })
      );
  }
}
