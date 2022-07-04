import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/autenticacao/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  usuario: string = '';
  senha: string = '';

  constructor(
    private autenticacaoService: AutenticacaoService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    // authenticate user and pwd
    this.autenticacaoService.autenticar(this.usuario, this.senha).subscribe(
      () => {
        // redirect user to page 'animais'
        this.router.navigate(['animais']);
      },
      (err) => console.log(err)
    );
  }
}
