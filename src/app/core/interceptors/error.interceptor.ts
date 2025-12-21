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
      // 419 = CSRF Token Mismatch (Session expired)
      if (error.status === 419) {
        // Prevent infinite loops if logout endpoint itself causes 401
        if (!req.url.includes('/auth/logout')) {
            authService.doLogoutCleanup();
            toastService.error('Votre session a expiré. Veuillez vous reconnecter.');
            router.navigate(['/login']);
        }
      }
      return throwError(() => error);
    })
  );
};
