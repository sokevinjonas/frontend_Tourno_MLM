import { Component, inject, NgZone, ChangeDetectorRef } from '@angular/core';
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
  private zone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);
  
  currentUser$ = this.authService.currentUser$;

  showAddModal = false;
  isSubmitting = false;
  isImageLoading = false;
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
    this.isImageLoading = false;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        this.showToast('Veuillez sélectionner une image valide.', 'error');
        return;
      }

      this.isImageLoading = true;
      this.selectedFile = file;
      this.filePreview = null; // Clear previous preview immediately
      
      // Safety timeout
      const safetyTimeout = setTimeout(() => {
        if (this.isImageLoading) {
            this.zone.run(() => {
                this.isImageLoading = false;
                this.showToast('Le chargement de l\'image prend trop de temps.', 'error');
                this.cdr.detectChanges();
            });
        }
      }, 5000);

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        this.zone.run(() => {
            clearTimeout(safetyTimeout);
            this.filePreview = reader.result as string;
            this.isImageLoading = false;
            this.cdr.detectChanges();
        });
      };
      reader.onerror = () => {
        this.zone.run(() => {
            clearTimeout(safetyTimeout);
            console.error('Error reading file');
            this.isImageLoading = false;
            this.showToast('Erreur lors du chargement de l\'image.', 'error');
            this.cdr.detectChanges();
        });
      };
      reader.readAsDataURL(file);
    }
  }

  toastMessage: string | null = null;
  toastType: 'success' | 'error' = 'success';

  showToast(message: string, type: 'success' | 'error' = 'success') {
    this.toastMessage = message;
    this.toastType = type;
    setTimeout(() => {
      this.toastMessage = null;
    }, 5000);
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
        this.showToast('Compte ajouté avec succès !', 'success');
      },
      error: (err) => {
        console.error('Error adding account', err);
        this.isSubmitting = false;
        
        let errorMessage = 'Erreur lors de l\'ajout du compte.';
        if (err.error) {
          if (typeof err.error === 'string') {
             errorMessage = err.error;
          } else if (err.error.error) {
             errorMessage = err.error.error;
          } else if (err.error.message) {
             errorMessage = err.error.message;
          }
          
          if (err.error.errors) {
              const firstKey = Object.keys(err.error.errors)[0];
              if (firstKey) {
                  errorMessage = err.error.errors[firstKey][0];
              }
          }
        }
        
        this.showToast(errorMessage, 'error');
        this.cdr.detectChanges(); // Force UI update
      }
    });
  }
}
