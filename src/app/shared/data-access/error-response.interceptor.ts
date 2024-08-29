import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { removeToken } from '../../user/data-access/local-storage';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const ErrorResponseInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => handleErrorResponse(error, router))
  );
};

function handleErrorResponse(error: HttpErrorResponse, router: Router) {
  if (error.error.type == 'EXPIRED_TOKEN') {
    removeToken();

    router.navigate(['/']);
  }

  return throwError(() => 'Expired Session');
}
