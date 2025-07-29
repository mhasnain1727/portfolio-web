import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/common/token.service';

export const adminGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);
  const router = inject(Router);

  // console.log(tokenService.isAccessTokenExpired())
  if (!tokenService.isAccessTokenExpired()) {
    const user = JSON.parse(sessionStorage.getItem('auth_token') || 'null');

    if (!user) {
      router.navigate(['/signin']);
      return of(false);
    }

    const expectedRoles = route.data?.['roles'] as string[] | undefined;
    if (expectedRoles && !expectedRoles.includes(user?.claim?.userType)) {
      router.navigate(['/unauthorized']);
      return of(false);
    }


    return of(true);
  }

  // If token expired, try refreshing it
  return authService.refreshAccessToken().pipe(
    switchMap(() => {
      const user = JSON.parse(sessionStorage.getItem('auth_token') || 'null');

      if (!user) {
        router.navigate(['/signin']);
        return of(false);
      }

      const expectedRoles = route.data?.['roles'] as string[] | undefined;
      if (expectedRoles && !expectedRoles.includes(user?.claim?.userType)) {
        router.navigate(['/unauthorized']);
        return of(false);
      }

      return of(true);
    }),
    catchError(() => {
      tokenService.clear();
      router.navigate(['/admin']);
      return of(false);
    })
  );
};
