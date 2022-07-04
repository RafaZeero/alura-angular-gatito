import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalheAnimalComponent } from './detalhe-animal/detalhe-animal.component';
import { ListaAnimaisComponent } from './lista-animais/lista-animais.component';
import { ListaAnimaisResolver } from './lista-animais/lista-animais.resolver';

const routes: Routes = [
  {
    path: '',
    component: ListaAnimaisComponent,
    resolve: {
      // fetch from backend and assign the resolver to the key 'animais'
      animais: ListaAnimaisResolver,
    },
  },
  {
    path: ':id',
    component: DetalheAnimalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimaisRoutingModule {}
