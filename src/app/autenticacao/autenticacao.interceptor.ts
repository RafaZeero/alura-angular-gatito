import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

// interceptors will intercept every request to http and modify the request as needed
// this one will add the token - using the tokenService - in the headers
@Injectable()
export class AutenticacaoInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.tokenService.possuiToken()) {
      // fetch token from current User
      const token = this.tokenService.retornaToken();
      // send token through headers - Angular Headers
      const headers = new HttpHeaders().append('x-access-token', token);

      // clone the request - original request is immutable, so it is necessary to clone it and send the clone with the headers
      request = request.clone({ headers });
    }
    return next.handle(request);
  }
}
