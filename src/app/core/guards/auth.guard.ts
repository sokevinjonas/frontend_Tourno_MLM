import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, take, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    take(1),
    switchMap(user => {
      // Si l'utilisateur est déjà chargé en mémoire
      if (user) {
        return of(true);
      }
      // Sinon, on tente de le récupérer (cas du refresh page)
      return authService.getCurrentUser().pipe(
        map(u => !!u),
        catchError(() => {
          router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return of(false);
        })
      );
    })
  );
};
