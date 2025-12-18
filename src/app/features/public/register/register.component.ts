import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email = signal('');
  password = signal('');
  showPassword = signal(false);
  acceptedPrivacy = signal(false);
  savePassword = signal(false);
  isLoading = signal(false);

  benefits = [
    {
      icon: '✉️',
      title: 'Inscris-toi aux tournois',
      description: 'Accède à des centaines de tournois e-sports mobile'
    },
    {
      icon: '⚙️',
      title: 'Gère tes matchs',
      description: 'Suis tous tes matchs et soumets tes résultats'
    },
    {
      icon: '🎁',
      title: 'Gagne des récompenses',
      description: 'Prize pools en FCFA sur ton Mobile Money'
    },
    {
      icon: '💸',
      title: 'Deviens organisateur',
      description: 'Crée tes tournois et génère des revenus'
    }
  ];

  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPassword(password: string): boolean {
    return password.length >= 8;
  }

  onSubmit() {
    if (!this.isValidEmail(this.email()) || !this.isValidPassword(this.password()) || !this.acceptedPrivacy()) {
      return;
    }

    this.isLoading.set(true);

    // Simulate API call
    setTimeout(() => {
      this.isLoading.set(false);
      console.log('Account created');
      // TODO: Navigate to complete-profile or home
    }, 1500);
  }

  onSocialRegister(provider: 'google' | 'facebook' | 'apple') {
    console.log(`Register with ${provider}`);
    // TODO: Implement OAuth registration
  }
}
