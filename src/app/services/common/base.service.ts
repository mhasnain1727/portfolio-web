import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  protected tokenService: TokenService;

  constructor(
    tokenService: TokenService
  ) {
    this.tokenService = tokenService;
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    //return throwError(errorMessage);
    return errorMessage;
  }


  protected buildHeaders(): HttpHeaders {
    const token = this.tokenService.retrieve();
    const headers = new HttpHeaders();

    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');

    if (token.isAuthenticated) {
      headers.set('Authorization', `Bearer ${token.authToken}`);
    }

    headers.set('Access-Control-Allow-Origin', document.location.origin);

    return headers;
  }
}
