import { Component, EventEmitter, Input, Output, inject, NgZone, ChangeDetectorRef, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlayerService } from '../../../core/services/player.service';

@Component({
  selector: 'app-game-account-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
       <div class="bg-slate-800 rounded-3xl p-8 max-w-md w-full border border-slate-700 shadow-2xl relative">
          <button (click)="onClose()" class="absolute top-4 right-4 text-slate-500 hover:text-white">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>

          <h2 class="text-2xl font-bold text-white mb-6">{{ account ? 'Modifier le compte' : 'Ajouter un compte' }}</h2>
          
          <!-- Toast inside modal for immediate feedback -->
          <div *ngIf="toastMessage" class="mb-4 p-3 rounded-lg flex items-center gap-2 text-sm" 
               [ngClass]="toastType === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'">
             <span>{{ toastMessage }}</span>
          </div>

          <form [formGroup]="accountForm" (ngSubmit)="onSubmit()" class="space-y-6">
             <!-- Game Type Select -->
             <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Jeu</label>
                <div class="grid grid-cols-3 gap-2">
                   <label class="cursor-pointer">
                      <input type="radio" formControlName="gameType" value="efootball" class="peer sr-only">
                      <div class="p-2 rounded-xl bg-slate-900 border border-slate-700 text-center peer-checked:bg-blue-600 peer-checked:border-blue-500 peer-checked:text-white transition-all">
                         <div class="font-bold text-xs">E-Foot</div>
                      </div>
                   </label>
                   <label class="cursor-pointer">
                      <input type="radio" formControlName="gameType" value="fc_mobile" class="peer sr-only">
                      <div class="p-2 rounded-xl bg-slate-900 border border-slate-700 text-center peer-checked:bg-green-600 peer-checked:border-green-500 peer-checked:text-white transition-all">
                         <div class="font-bold text-xs">FC Mobile</div>
                      </div>
                   </label>
                   <label class="cursor-pointer">
                      <input type="radio" formControlName="gameType" value="dream_league_soccer" class="peer sr-only">
                      <div class="p-2 rounded-xl bg-slate-900 border border-slate-700 text-center peer-checked:bg-orange-600 peer-checked:border-orange-500 peer-checked:text-white transition-all">
                         <div class="font-bold text-xs">DLS</div>
                      </div>
                   </label>
                </div>
             </div>

             <!-- Pseudo -->
             <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Pseudo en jeu</label>
                <input type="text" formControlName="inGameName" placeholder="Ex: ProGamer237" 
                       class="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all">
                <p *ngIf="accountForm.get('inGameName')?.touched && accountForm.get('inGameName')?.invalid" class="text-red-400 text-xs mt-1">Le pseudo est requis</p>
             </div>

             <!-- Screenshot Upload -->
             <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">{{ account ? 'Modifier le screenshot (optionnel)' : 'Screenshot du profil' }}</label>
                <div class="border-2 border-dashed border-slate-700 rounded-xl p-6 text-center hover:border-slate-500 transition-all relative group">
                   <input type="file" (change)="onFileSelected($event)" accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" [disabled]="isImageLoading">
                   
                   <ng-container *ngIf="isImageLoading; else loadedContent">
                      <div class="flex flex-col items-center justify-center py-2">
                         <div class="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-2"></div>
                         <p class="text-sm text-slate-400">Traitement de l'image...</p>
                      </div>
                   </ng-container>

                   <ng-template #loadedContent>
                      <ng-container *ngIf="!filePreview; else previewTemplate">
                         <div class="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-500 group-hover:bg-slate-700 group-hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                         </div>
                         <p class="text-sm text-slate-400">{{ account ? 'Cliquez pour modifier' : 'Cliquez pour uploader' }}</p>
                         <p *ngIf="!account" class="text-xs text-slate-600 mt-1">Preuve de votre pseudo en jeu</p>
                      </ng-container>

                      <ng-template #previewTemplate>
                         <img [src]="filePreview" class="max-h-32 mx-auto rounded-lg shadow-lg mb-2">
                         <p class="text-xs text-green-400 font-medium">{{ account ? 'Nouvelle image sélectionnée' : 'Image sélectionnée' }}</p>
                      </ng-template>
                   </ng-template>
                </div>
                <p *ngIf="!account && !selectedFile && accountForm.touched" class="text-red-400 text-xs mt-1">La capture d'écran est requise pour validation</p>
             </div>

             <button type="submit" [disabled]="isSubmitting" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                <span *ngIf="isSubmitting" class="animate-spin">⌛</span>
                {{ isSubmitting ? 'Enregistrement...' : (account ? 'Modifier le compte' : 'Enregistrer le compte') }}
             </button>
          </form>
       </div>
    </div>
  `
})
export class GameAccountModalComponent implements OnChanges {
  @Input() account: any = null; // If null, mode = Add
  @Output() close = new EventEmitter<void>();
  @Output() success = new EventEmitter<void>();

  private playerService = inject(PlayerService);
  private fb = inject(FormBuilder);
  private zone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);

  isSubmitting = false;
  isImageLoading = false;
  selectedFile: File | null = null;
  filePreview: string | null = null;
  toastMessage: string | null = null;
  toastType: 'success' | 'error' = 'success';

  accountForm = this.fb.group({
    gameType: ['efootball', Validators.required],
    inGameName: ['', Validators.required]
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['account'] && this.account) {
      // Edit mode init
      this.accountForm.patchValue({
        gameType: this.account.game || this.account.game_type,
        inGameName: this.account.game_username || this.account.in_game_name
      });
      this.filePreview = this.account.team_screenshot_path ? this.getAccountImageUrl(this.account.team_screenshot_path) : null;
    } else if (!this.account) {
      // Add mode reset
      this.accountForm.reset({ gameType: 'efootball' });
      this.filePreview = null;
      this.selectedFile = null;
    }
  }

  getAccountImageUrl(path: string | null): string {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const baseUrl = environment.storageUrl;
    return `${baseUrl}/${path}`;
  }

  onClose() {
    this.close.emit();
  }

  showToast(message: string, type: 'success' | 'error' = 'success') {
    this.toastMessage = message;
    this.toastType = type;
    setTimeout(() => {
      this.toastMessage = null;
    }, 5000);
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
      this.filePreview = null;
      
      const safetyTimeout = setTimeout(() => {
        if (this.isImageLoading) {
            this.zone.run(() => {
                this.isImageLoading = false;
                this.showToast('Le chargement de l\'image prend trop de temps.', 'error');
                this.cdr.detectChanges();
            });
        }
      }, 5000);

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
            this.isImageLoading = false;
            this.showToast('Erreur lors du chargement de l\'image.', 'error');
            this.cdr.detectChanges();
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.accountForm.invalid) {
      this.accountForm.markAllAsTouched();
      return;
    }

    if (!this.account && !this.selectedFile) {
        this.showToast('Le screenshot est obligatoire pour ajouter un compte.', 'error');
        return;
    }

    this.isSubmitting = true;
    const { gameType, inGameName } = this.accountForm.value;

    let request$;
    if (this.account) {
        // Update
        request$ = this.playerService.updateGameAccount(
            this.account.id, 
            gameType!, 
            inGameName!, 
            this.selectedFile || undefined
        );
    } else {
        // Add
        request$ = this.playerService.addGameAccount(
            gameType!, 
            inGameName!, 
            this.selectedFile!
        );
    }

    request$.subscribe({
      next: () => {
        this.isSubmitting = false;
        this.success.emit();
        this.onClose();
      },
      error: (err) => {
        console.error('Error saving account', err);
        this.isSubmitting = false;
        
        let errorMessage = 'Erreur lors de l\'enregistrement.';
        if (err.error) {
          if (typeof err.error === 'string') errorMessage = err.error;
          else if (err.error.error) errorMessage = err.error.error;
          else if (err.error.message) errorMessage = err.error.message;
          
          if (err.error.errors) {
              const firstKey = Object.keys(err.error.errors)[0];
              if (firstKey) errorMessage = err.error.errors[firstKey][0];
          }
        }
        
        this.showToast(errorMessage, 'error');
        this.cdr.detectChanges();
      }
    });
  }
}
