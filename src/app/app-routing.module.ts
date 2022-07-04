import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacaoGuard } from './autenticacao/autenticacao.guard';
import { LoginGuard } from './autenticacao/login.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    // lazy loading home module
    loadChildren: async () => (await import('./home/home.module')).HomeModule,
    // login guard redirect to: 'animais ~> already logged in
    canLoad: [LoginGuard],
  },
  {
    path: 'animais',
    // lazy loading animais module
    loadChildren: async () =>
      (await import('./animais/animais.module')).AnimaisModule,
    // auth guard redirect to: 'home' ~> must be logged in
    canLoad: [AutenticacaoGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
