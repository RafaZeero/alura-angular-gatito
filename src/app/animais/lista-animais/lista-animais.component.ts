import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { UsuarioService } from 'src/app/autenticacao/usuario/usuario.service';
import { Animais } from '../animais';
import { AnimaisService } from '../animais.service';

@Component({
  selector: 'app-lista-animais',
  templateUrl: './lista-animais.component.html',
  styleUrls: ['./lista-animais.component.scss'],
})
export class ListaAnimaisComponent implements OnInit {
  animais$!: Observable<Animais>;

  constructor(
    private usuarioService: UsuarioService,
    private animaisService: AnimaisService
  ) {}

  ngOnInit(): void {
    // // subscribe to user
    // this.usuarioService.retornaUsuario().subscribe((usuario) => {
    //   // fetch username
    //   const username = usuario.name ?? '';
    //   // fetch user (username) animal list
    //   this.animaisService.listaDoUsuario(username).subscribe((animais) => {
    //     this.animais = animais;
    //   });
    // });

    // using Rxjs
    this.animais$ = this.usuarioService.retornaUsuario().pipe(
      // switch data flow -> from user to animal list
      switchMap((usuario) => {
        const username = usuario.name ?? '';
        // fetch user (username) animal list
        return this.animaisService.listaDoUsuario(username);
      })
    );
  }
}
