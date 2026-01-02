import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { PlayerService } from '../../../core/services/player.service';
import { GameAccountModalComponent } from '../../../shared/components/game-account-modal/game-account-modal.component';
import { AFRICAN_COUNTRIES } from '../../../core/constants/countries';

@Component({
  selector: 'app-profile-complete',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, GameAccountModalComponent],
  templateUrl: './profile-complete.component.html',
  styleUrls: ['./profile-complete.component.css']
})
export class ProfileCompleteComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private playerService = inject(PlayerService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  
  public currentUser$ = this.authService.currentUser$;
  public countries = AFRICAN_COUNTRIES;
  public selectedCountry = AFRICAN_COUNTRIES.find(c => c.name === 'Burkina Faso') || AFRICAN_COUNTRIES[0];

  currentStep = 1;
  isLoading = false;
  showAccountModal = false;
  showSuccessModal = false;

  toastMessage: string | null = null;
  toastType: 'success' | 'error' = 'success';

  personalInfoForm = this.fb.group({
    whatsapp_number: ['', [Validators.required]],
    country: ['Burkina Faso', Validators.required],
    city: ['', Validators.required]
  });

  ngOnInit() {
    // Listen for country changes to update placeholder/calling code
    this.personalInfoForm.get('country')?.valueChanges.subscribe(countryName => {
      const country = this.countries.find(c => c.name === countryName);
      if (country) {
        this.selectedCountry = country;
      }
    });

    this.authService.currentUser$.subscribe(user => {
      if (user) {
        const profile = user.profile || {};
        let whatsappNumber = user.profile?.whatsapp_number || profile.whatsapp_number || '';
        
        // Handle existing number with prefix
        if (whatsappNumber.startsWith('+')) {
          // Sort by length descending to match longest prefixes first (e.g. +243 before +24)
          const sortedCountries = [...this.countries].sort((a, b) => b.callingCode.length - a.callingCode.length);
          const matchedCountry = sortedCountries.find(c => whatsappNumber.startsWith(c.callingCode));
          
          if (matchedCountry) {
            this.selectedCountry = matchedCountry;
            whatsappNumber = whatsappNumber.replace(matchedCountry.callingCode, '').trim();
          }
        }

        const data = {
           whatsapp_number: whatsappNumber,
           city: user.profile?.city || profile.city || '',
           country: user.profile?.country || profile.country || (this.selectedCountry?.name || 'Burkina Faso')
        };
        
        if (data.whatsapp_number || data.city) {
            this.personalInfoForm.patchValue(data);
        }
      }
    });
  }

  showToast(message: string, type: 'success' | 'error' = 'success') {
    this.toastMessage = message;
    this.toastType = type;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.toastMessage = null;
      this.cdr.detectChanges();
    }, 5000);
  }

  submitStep1() {
    if (this.personalInfoForm.valid) {
      this.isLoading = true;
      
      const formData = { ...this.personalInfoForm.value };
      // Prepend calling code if not already present (safety check)
      if (formData.whatsapp_number && !formData.whatsapp_number.startsWith('+')) {
        formData.whatsapp_number = `${this.selectedCountry.callingCode}${formData.whatsapp_number}`;
      }
      
      this.playerService.updateProfile(formData).subscribe({
        next: (response) => {
          this.isLoading = false;
          // Use server message if available, else default
          const msg = response?.message || 'Profil mis à jour avec succès !';
          this.showToast(msg, 'success');
          
          setTimeout(() => {
             this.currentStep = 2;
          }, 1000);
        },
        error: (err) => {
          console.error('Error updating profile', err);
          this.isLoading = false;
          
          let errorMessage = 'Erreur lors de la mise à jour.';
          if (err.error) {
            if (typeof err.error === 'string') errorMessage = err.error;
            else if (err.error.message) errorMessage = err.error.message;
            else if (err.error.error) errorMessage = err.error.error;
            
            if (err.error.errors) {
                const firstKey = Object.keys(err.error.errors)[0];
                if (firstKey) errorMessage = err.error.errors[firstKey][0];
            }
          }
          
          this.showToast(errorMessage, 'error');
        }
      });
    } else {
      this.personalInfoForm.markAllAsTouched();
      this.showToast('Veuillez remplir correctement tous les champs requis.', 'error');
    }
  }

  openAddAccountModal() {
    this.showAccountModal = true;
  }

  closeAccountModal() {
    this.showAccountModal = false;
  }

  onAccountAdded() {
    this.showAccountModal = false;
    this.showSuccessModal = true;
  }

  goToDashboard() {
    this.showSuccessModal = false;
    this.finish();
  }

  skipGameAccounts() {
    this.router.navigate(['/profile']);
  }

  finish() {
    this.router.navigate(['/profile']);
  }
}
