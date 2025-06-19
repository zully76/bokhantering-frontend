// src/app/auth-interceptor/auth.interceptor.ts

import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('jwtToken'); // Hämtar JWT-token

  let clonedRequest = req;
  if (token) {
    clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      // Hantera 401 (Unauthorized) eller 403 (Forbidden) från API:et
      if (error.status === 401 || error.status === 403) {
        if (router.url !== '/login') { // Undvik loop om redan på inloggningssidan
          localStorage.removeItem('jwtToken');
          localStorage.removeItem('loggedInUsername');
          router.navigate(['/login']);
        }
      }
      return throwError(() => error);
    })
  );
};
