import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, switchMap, tap } from 'rxjs';
import { Comentarios } from './comentarios';
import { ComentariosService } from './comentarios.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss'],
})
export class ComentariosComponent implements OnInit {
  @Input() ID!: number;

  comentarios$!: Observable<Comentarios>;
  comentarioForm!: FormGroup;

  constructor(
    private comentarioService: ComentariosService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // initiate comments
    this.comentarios$ = this.comentarioService.buscaComentario(this.ID);

    // create form
    this.comentarioForm = this.formBuilder.group({
      comentario: ['', Validators.maxLength(300)],
    });
  }

  gravar(): void {
    // get comment
    const comentario = this.comentarioForm.get('comentario')?.value ?? '';

    // refresh page for new comment
    this.comentarios$ = this.comentarioService
      .incluiComentario(this.ID, comentario)
      .pipe(
        switchMap(() => this.comentarioService.buscaComentario(this.ID)),
        tap(() => {
          // reset comment form
          this.comentarioForm.reset();
          alert('Comentário enviado!');
        })
      );
  }
}
