import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { minusculoValidator } from './minusculo.validator';
import { NovoUsuario } from './novo-usuario';
import { NovoUsuarioService } from './novo-usuario.service';
import { UsuarioExisteService } from './usuario-existe.service';
import { usuarioSenhaIguaisValidator } from './usuarioSenhaIguais.validator';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.scss'],
})
export class NovoUsuarioComponent implements OnInit {
  novoUsuarioForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private novoUsuarioService: NovoUsuarioService,
    private usuarioExistenteService: UsuarioExisteService
  ) {}

  ngOnInit(): void {
    this.novoUsuarioForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        fullName: ['', [Validators.required, Validators.minLength(4)]],
        userName: [
          '',
          [minusculoValidator],
          // async validation
          [this.usuarioExistenteService.usuarioJaExiste()],
        ],
        password: [''],
      },
      { validators: [usuarioSenhaIguaisValidator] }
    );
  }

  cadastrar() {
    const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;
    console.log(novoUsuario);
  }
}
