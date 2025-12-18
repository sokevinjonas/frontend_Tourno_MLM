import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile-complete',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-complete.component.html',
  styleUrls: ['./profile-complete.component.css']
})
export class ProfileCompleteComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  currentStep = 1;
  isLoading = false;

  personalInfoForm = this.fb.group({
    whatsapp_number: ['', [Validators.required]],
    country: ['Cameroun', Validators.required],
    city: ['', Validators.required],
    date_of_birth: ['', Validators.required],
    bio: ['']
  });

  submitStep1() {
    if (this.personalInfoForm.valid) {
      this.isLoading = true;
      console.log('Submitting profile:', this.personalInfoForm.value);
      setTimeout(() => {
        this.isLoading = false;
        // Mock success, ideally redirect to game accounts or dashboard
        // For MVP simplified flow, assume step 1 is enough for "Profile Complete" regarding personal info
        // Then maybe prompt for Game Accounts in a separate step or page.
        // Let's go to step 2 (Game Accounts) in the same wizard? 
        // Spec says: Step 2 - Game Accounts.
        
        this.currentStep = 2;
      }, 800);
    } else {
      this.personalInfoForm.markAllAsTouched();
    }
  }

  skipGameAccounts() {
    this.router.navigate(['/profile']);
  }

  finish() {
    this.router.navigate(['/profile']);
  }
}
