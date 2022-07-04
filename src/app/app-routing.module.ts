import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  },
  {
    path: 'animais',
    // lazy loading animais module
    loadChildren: async () =>
      (await import('./animais/animais.module')).AnimaisModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
