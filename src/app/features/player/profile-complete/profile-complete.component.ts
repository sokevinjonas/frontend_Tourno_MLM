import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { PlayerService } from '../../../core/services/player.service';
import { GameAccountModalComponent } from '../../../shared/components/game-account-modal/game-account-modal.component';

@Component({
  selector: 'app-profile-complete',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, GameAccountModalComponent],
  templateUrl: './profile-complete.component.html',
  styleUrls: ['./profile-complete.component.css']
})
export class ProfileCompleteComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private playerService = inject(PlayerService);
  private router = inject(Router);

  currentStep = 1;
  isLoading = false;
  showAccountModal = false;

  personalInfoForm = this.fb.group({
    whatsapp_number: ['', [Validators.required]],
    country: ['Cameroun', Validators.required],
    city: ['', Validators.required]
  });

  submitStep1() {
    if (this.personalInfoForm.valid) {
      this.isLoading = true;
      
      this.playerService.updateProfile(this.personalInfoForm.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.currentStep = 2;
        },
        error: (err) => {
          console.error('Error updating profile', err);
          this.isLoading = false;
          // Ideally show a global toast here if available, or bind error to form
          alert('Erreur lors de la mise à jour du profil. Vérifiez vos données.');
        }
      });
    } else {
      this.personalInfoForm.markAllAsTouched();
    }
  }

  openAddAccountModal() {
    this.showAccountModal = true;
  }

  closeAccountModal() {
    this.showAccountModal = false;
  }

  onAccountAdded() {
    // Account added successfully
    this.showAccountModal = false;
    // Maybe verify if they have at least one account now?
    // For now, let's just allow them to finish or add another.
    // We could auto-navigate to profile?
    if (confirm('Compte ajouté ! Voulez-vous aller au tableau de bord ?')) {
       this.finish();
    }
  }

  skipGameAccounts() {
    this.router.navigate(['/profile']);
  }

  finish() {
    this.router.navigate(['/profile']);
  }
}
