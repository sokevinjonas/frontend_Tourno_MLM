import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { interval, Subscription, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-auth-verify',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './auth-verify.component.html'
})
export class AuthVerifyComponent implements OnInit, OnDestroy {
  verifying: boolean = true;
  error: string = '';
  success: boolean = false;
  sent: boolean = false;
  email: string = '';
  private pollingSub: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Récupérer le token de l'URL
    this.route.queryParams.subscribe(params => {
      // Cas : "Vérifiez vos emails" (redirection après register)
      if (params['sent']) {
        this.sent = true;
        this.verifying = false;
        this.email = params['email'] || '';

        // Polling chaque 3 secondes pour vérifier si l'utilisateur est connecté
        this.pollingSub = interval(3000).pipe(
          switchMap(() => this.authService.getCurrentUser().pipe(
            catchError(() => of(null)) // Ignore les erreurs (401) en attendant le succès
          ))
        ).subscribe(user => {
          if (user) {
            this.handleSuccess({ user, is_new_user: user.is_new_user || false });
          }
        });

        return;
      }

      const token = params['token'];

      if (!token) {
        this.error = 'Token manquant';
        this.verifying = false;
        return;
      }

      // Vérifier le token
      this.authService.verifyMagicLink(token).subscribe({
        next: (response) => this.handleSuccess(response),
        error: (err) => {
          this.verifying = false;
          this.error = err.error?.message || 'Ce lien est invalide ou a expiré.';
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.pollingSub) {
      this.pollingSub.unsubscribe();
    }
  }

  private handleSuccess(response: any) {
    if (this.pollingSub) this.pollingSub.unsubscribe();
    
    this.sent = false;
    this.verifying = false;
    this.success = true;

    // Petit délai pour l'UX (afficher le succès)
    setTimeout(() => {
      // Rediriger selon is_new_user (si implémenté) ou vers home
      if (response.is_new_user) {
          // Assuming profile complete route exists or will exist
          this.router.navigate(['/profile/complete']); 
      } else {
        this.router.navigate(['/']);
      }
    }, 1500);
  }
}
