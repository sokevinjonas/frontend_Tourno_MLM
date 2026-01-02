import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent {
  email: string = '';
  loading: boolean = false;
  emailSent: boolean = false;
  error: string | null = null;
  acceptedTerms: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.email || !this.acceptedTerms) return;

    this.loading = true;
    this.error = null;

    this.authService.sendMagicLink(this.email).subscribe({
      next: () => {
        this.router.navigate(['/auth/verify-code'], { queryParams: { email: this.email } });
      },
      error: (err) => {
        console.error('Magic Link Error:', err);
        this.error = 'Une erreur est survenue. Veuillez réessayer.';
        this.loading = false;
      }
    });
  }

  loginWithOAuth(provider: 'google' | 'facebook' | 'apple') {
    this.authService.getOAuthRedirectUrl(provider).subscribe({
      next: (response) => {
        window.location.href = response.url;
      },
      error: (err) => {
        console.error('OAuth Error:', err);
        this.error = 'Erreur de connexion avec ' + provider;
      }
    });
  }
}
