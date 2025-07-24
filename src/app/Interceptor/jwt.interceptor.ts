import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null;

    const parsedToken = token ? JSON.parse(token) : null;
    const auth_token = parsedToken?.authToken;

    // const token = sessionStorage.getItem('auth_token');

    if (auth_token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${auth_token}`,
          'Content-Type': 'application/json',
          // "Access-Control-Allow-Origin": "*"
        }
      });
      return next.handle(request);
    }else {
      // If none of the above conditions are met, pass the request through without modification
      return next.handle(request);
    }

  }
}
