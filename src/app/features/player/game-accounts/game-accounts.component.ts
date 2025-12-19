import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { PlayerService } from '../../../core/services/player.service';

@Component({
  selector: 'app-game-accounts',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './game-accounts.component.html',
  styleUrls: ['./game-accounts.component.css']
})
export class GameAccountsComponent {
  private authService = inject(AuthService);
  private playerService = inject(PlayerService);
  private fb = inject(FormBuilder);
  
  currentUser$ = this.authService.currentUser$;

  showAddModal = false;
  isSubmitting = false;
  selectedFile: File | null = null;
  filePreview: string | null = null;

  addAccountForm = this.fb.group({
    gameType: ['efootball', Validators.required],
    inGameName: ['', Validators.required]
  });

  openAddModal(type: string | null = null) {
    if (type) {
      this.addAccountForm.patchValue({ gameType: type });
    }
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
    this.addAccountForm.reset({ gameType: 'efootball' });
    this.selectedFile = null;
    this.filePreview = null;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        this.filePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  submitAddAccount() {
    if (this.addAccountForm.invalid || !this.selectedFile) {
      this.addAccountForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const { gameType, inGameName } = this.addAccountForm.value;

    this.playerService.addGameAccount(gameType!, inGameName!, this.selectedFile).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.closeAddModal();
        // Optional: Show success toast
      },
      error: (err) => {
        console.error('Error adding account', err);
        this.isSubmitting = false;
        alert('Erreur lors de l\'ajout du compte. Veuillez réessayer.');
      }
    });
  }
}
