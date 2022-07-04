import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of, switchMap, take } from 'rxjs';
import { UsuarioService } from 'src/app/autenticacao/usuario/usuario.service';
import { Animais } from '../animais';
import { AnimaisService } from '../animais.service';

@Injectable({
  providedIn: 'root',
})
export class ListaAnimaisResolver implements Resolve<Animais> {
  // load animal list before initialization
  constructor(
    private animaisService: AnimaisService,
    private usuarioService: UsuarioService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Animais> {
    // fetch animal list from specific user
    return this.usuarioService.retornaUsuario().pipe(
      switchMap((usuario) => {
        const username = usuario.name ?? '';
        return this.animaisService.listaDoUsuario(username);
      }),
      take(1) // complete the subject subscription
    );
  }
}
