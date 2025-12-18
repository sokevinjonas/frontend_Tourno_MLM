import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = signal('');
  showPassword = signal(false);
  rememberMe = signal(false);
  isLoading = signal(false);
  emailSent = signal(false);

  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }

  onSubmitMagicLink() {
    if (!this.email() || !this.isValidEmail(this.email())) {
      return;
    }

    this.isLoading.set(true);

    // Simulate API call
    setTimeout(() => {
      this.isLoading.set(false);
      this.emailSent.set(true);
    }, 1500);
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  onSocialLogin(provider: 'google' | 'facebook' | 'apple') {
    console.log(`Login with ${provider}`);
    // TODO: Implement OAuth login
  }

  resendEmail() {
    this.emailSent.set(false);
    this.email.set('');
  }
}
