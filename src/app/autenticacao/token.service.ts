import { Injectable } from '@angular/core';

const KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  retornaToken() {
    return localStorage.getItem(KEY) ?? '';
  }

  salvaToken(token: string) {
    return localStorage.setItem(KEY, token);
  }

  deletaToken() {
    return localStorage.removeItem(KEY);
  }

  possuiToken() {
    // becomes truthy or falsy the returned value from 'retornaToken()'
    return !!this.retornaToken();
  }
}
