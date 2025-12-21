import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Catch global 401 Unauthorized errors
      // This eliminates the need to check session before every request
      if (error.status === 401) {
        authService.doLogoutCleanup();
        toastService.error('Votre session a expiré. Veuillez vous reconnecter.');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
