import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, take, switchMap, catchError, timeout } from 'rxjs/operators';
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
      // On ajoute un timeout de 5s pour éviter de bloquer indéfiniment sur une page blanche
      return authService.getCurrentUser().pipe(
        timeout(5000),
        map(u => !!u),
        catchError((err) => {
          console.error('Auth guard error or timeout:', err);
          router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return of(false);
        })
      );
    })
  );
};
