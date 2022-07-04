import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from '../token.service';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  // emits and receives data
  private usuarioSubject = new BehaviorSubject<Usuario>({});

  constructor(private tokenService: TokenService) {
    // emits users
    if (this.tokenService.possuiToken()) this.decodificaJWT();
  }

  private decodificaJWT() {
    const token = this.tokenService.retornaToken();
    const usuario = jwtDecode(token) as Usuario;

    this.usuarioSubject.next(usuario);
  }

  retornaUsuario() {
    // avoid external data manipulation
    return this.usuarioSubject.asObservable();
  }

  salvaToken(token: string) {
    this.tokenService.salvaToken(token);
    this.decodificaJWT();
  }

  logout() {
    this.tokenService.deletaToken();
    this.usuarioSubject.next({});
  }

  estaLogado() {
    return this.tokenService.possuiToken();
  }
}
