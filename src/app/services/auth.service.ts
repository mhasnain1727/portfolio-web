import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './common/token.service';
import { environment } from 'src/environment/environment';
import { map, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) { }

  // refreshAccessToken() {
  //   return this.http.get<any>(`${environment.apiUrl}refresh-token`, {
  //     withCredentials: true
  //   });
  // }

  refreshAccessToken() {
    return this.http.post<any>(`${environment.apiUrl}refreshToken`, {}, {
      withCredentials: true // important for HttpOnly cookie
    }).pipe(
      tap(response => {
        this.tokenService.authenticate(response);
        if (this.router.url === '/signin') {
          this.router.navigate(['/user/dashboard']);
        }
      }),
      map(res => res.accessToken)
    );
  }


  autoLogout() {
    return this.http.post(`${environment.apiUrl}logout`, {}, {
      withCredentials: true // required to send the HttpOnly cookie
    });
  }

  registerUser(reqBody: any) {
    return this.http.post<any>(`${environment.apiUrl}registerUser`, reqBody);
  }

  loginUser(reqBody: any) {
    return this.http.post<any>(`${environment.apiUrl}login`, reqBody, {
      withCredentials: true
    });
  }

  updateUser(reqBody: any) {
    return this.http.post<any>(`${environment.apiUrl}updateUser`, reqBody);
  }

  allActiveSessions(reqBody: any) {
    return this.http.post<any>(`${environment.apiUrl}allActiveSessions`, reqBody);
  }

  revokeSession(sessionId: number) {
    return this.http.post(`${environment.apiUrl}revokeSession`, { sessionId }, {
      withCredentials: true
    });
  }

  getStudentUsers() {
    return this.http.get<any>(`${environment.apiUrl}getAllUsers`);
  }

}
