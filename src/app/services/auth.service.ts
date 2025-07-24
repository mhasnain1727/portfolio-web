import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './common/base.service';
import { TokenService } from './common/token.service';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  protected http: HttpClient;

  constructor(
    http: HttpClient, 
    tokenService: TokenService
  ) {
    super(tokenService);
    this.http = http;
   }

  registerUser(reqBody:any){
    return this.http.post<any>(`${environment.apiUrl}registerUser`, reqBody);
  }

  loginUser(reqBody:any){
    return this.http.post<any>(`${environment.apiUrl}login`, reqBody);
  }
}
