import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {
  email: string = '';
  loading: boolean = false;
  emailSent: boolean = false;
  error: string | null = null;

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (!this.email) return;

    this.loading = true;
    this.error = null;

    this.authService.sendMagicLink(this.email).subscribe({
      next: () => {
        this.emailSent = true;
        this.loading = false;
      },
      error: (err) => {
        console.error('Magic Link Error:', err);
        this.error = 'Une erreur est survenue. Veuillez réessayer.';
        this.loading = false;
      }
    });
  }

  loginWithOAuth(provider: 'google' | 'facebook' | 'apple') {
    this.authService.loginWithOAuth(provider);
  }
}
