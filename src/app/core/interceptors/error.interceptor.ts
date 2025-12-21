import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const injector = inject(Injector);
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // 419 = CSRF Token Mismatch (Session expired)
      if (error.status === 419 || error.status === 401) {
        const authService = injector.get(AuthService);
        
        // Prevent infinite loops if logout endpoint or initial check itself causes 401
        if (!req.url.includes('/auth/logout') && !req.url.includes('/user')) {
            authService.doLogoutCleanup();
            if (error.status === 419) {
                toastService.error('Votre session a expiré. Veuillez vous reconnecter.');
            }
            router.navigate(['/login']);
        }
      }
      return throwError(() => error);
    })
  );
};
