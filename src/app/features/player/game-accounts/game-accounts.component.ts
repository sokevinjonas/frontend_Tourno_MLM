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
  
  // Helper to construct full image URL
  getAccountImageUrl(path: string | null): string {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    // Assuming API is at .../api, storage is at .../storage
    const baseUrl = this.playerService.apiUrl.replace('/api', '');
    return `${baseUrl}/storage/${path}`;
  }

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

  // View Image Modal
  showViewModal = false;
  viewImageUrl: string | null = null;

  openViewModal(imageUrl: string) {
    this.viewImageUrl = imageUrl;
    this.showViewModal = true;
  }

  closeViewModal() {
    this.showViewModal = false;
    this.viewImageUrl = null;
  }

  // Edit Account Modal
  showEditModal = false;
  editingAccountId: number | null = null;
  
  editAccountForm = this.fb.group({
    gameType: ['efootball', Validators.required],
    inGameName: ['', Validators.required]
  });

  openEditModal(account: any) {
    this.editingAccountId = account.id;
    this.editAccountForm.patchValue({
      gameType: account.game || account.game_type,
      inGameName: account.game_username || account.in_game_name
    });
    this.filePreview = account.team_screenshot_path ? this.getAccountImageUrl(account.team_screenshot_path) : null; 
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editingAccountId = null;
    this.editAccountForm.reset();
    this.selectedFile = null;
    this.filePreview = null;
    this.isImageLoading = false;
  }

  submitEditAccount() {
    if (this.editAccountForm.invalid) {
      this.editAccountForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const { gameType, inGameName } = this.editAccountForm.value;

    this.playerService.updateGameAccount(
      this.editingAccountId!, 
      gameType!, 
      inGameName!, 
      this.selectedFile || undefined
    ).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.closeEditModal();
        this.showToast('Compte modifié avec succès !', 'success');
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error updating account', err);
        this.isSubmitting = false;
        this.showToast('Erreur lors de la modification.', 'error');
        this.cdr.detectChanges();
      }
    });
  }
}
