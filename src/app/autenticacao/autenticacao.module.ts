import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AutenticacaoInterceptor } from './autenticacao.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      // register service as http interceptor
      provide: HTTP_INTERCEPTORS,
      // using the 'autenticacaoInterceptor' class
      useClass: AutenticacaoInterceptor,
      // chain of interceptors
      multi: true,
    },
  ],
})
export class AutenticacaoModule {}
