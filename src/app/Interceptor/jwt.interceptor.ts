// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor
// } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {

//   constructor() { }

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

//     const token = sessionStorage.getItem('auth_token') ? sessionStorage.getItem('auth_token') : null;

//     const parsedToken = token ? JSON.parse(token) : null;
//     console.log(parsedToken);
//     const auth_token = parsedToken?.authToken;

//     // const token = sessionStorage.getItem('auth_token');

//     if (auth_token) {
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${auth_token}`,
//           'Content-Type': 'application/json',
//           // "Access-Control-Allow-Origin": "*"
//         }
//       });
//       return next.handle(request);
//     }else {
//       // If none of the above conditions are met, pass the request through without modification
//       return next.handle(request);
//     }

//   }
// }


import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenService } from '../services/common/token.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private tokenService: TokenService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenStr = sessionStorage.getItem('auth_token');
    const token = tokenStr ? JSON.parse(tokenStr)?.authToken : null;

    console.log(token)
    if (token) {
      console.log('trueee')
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log(err)
        if (err.status === 403) {
          // Access token expired. Try to refresh
          return this.authService.refreshAccessToken().pipe(
            switchMap(newToken => {
              const updatedRequest = request.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` }
              });
              return next.handle(updatedRequest);
            }),
            catchError(error => {
              console.log(error)
              // this.authService.autoLogout().subscribe({
              //   next: (res) => {
              //     this.tokenService.clear();
                  
              //     this.snackBar.open('Logout successful!', 'Close', {
              //       duration: 3000,
              //       panelClass: ['logout-snackbar']
              //     });
              //   },
              //   error: (err) => {
              //     this.snackBar.open('Logout failed. Please try again.', 'Close', {
              //       duration: 3000,
              //       panelClass: ['error-snackbar']
              //     });
              //     console.error('Logout failed:', err);
              //   }
              // }); // force logout on failure
              return throwError(() => error);
            })
          );
        }
        else  if (err.status === 401) {
          let message = 'Session expired. Logging out...';
          this.snackBar.open(message, 'Close', { duration: 3000 });

          // Clear token and log out
          this.authService.autoLogout().subscribe(() => {
            this.tokenService.clear();
          });
        }
        return throwError(() => err);
      })
    );
  }
}

