import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/common/token.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        let message = 'Something went wrong. Please try again.';

        if (error.error instanceof ErrorEvent) {
          message = `Client Error: ${error.error.message}`;
        } else {
          switch (error.status) {
            case 401:
              // // Clear token and log out
              // this.authService.autoLogout().subscribe(() => {
              //   this.tokenService.clear();
              // });
              // break;

            case 403:
              // message = 'Session expired. Logging out...';
              // this.snackBar.open(message, 'Close', { duration: 3000 });

              // Clear token and log out
              // this.authService.autoLogout().subscribe(() => {
              //   this.tokenService.clear();
              // });
              break;

            case 404:
              message = 'Resource not found.';
              break;

            case 500:
              message = 'Internal server error.';
              break;

            default:
              message = error.error?.msg || error.message || message;
          }
        }

        // Show toast for other cases
        if (error.status !== 401 && error.status !== 403) {
          this.snackBar.open(message, 'Close', { duration: 3000 });
        }

        return throwError(() => error);
      })
    );
  }
}

