import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AuthService, AuthResponse } from '../../../core/services/auth.service';

@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent implements OnInit, AfterViewInit {
  code: string[] = ['', '', '', '', '', ''];
  email: string = '';
  loading: boolean = false;
  error: string = '';
  success: boolean = false;

  @ViewChild('digit1') digit1!: ElementRef;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Get email from query params or navigation state
    this.email = this.route.snapshot.queryParams['email'] || '';
    if (!this.email) {
      // Potentially redirect back to login if no email
    }
  }

  ngAfterViewInit(): void {
    this.focusInput(0);
  }

  onInput(event: any, index: number): void {
    const value = event.target.value;
    
    // Only allow digits
    if (!/^\d*$/.test(value)) {
      this.code[index] = '';
      return;
    }

    if (value.length > 1) {
      // Handle paste or multi-character input
      const digits = value.split('').slice(0, 6);
      digits.forEach((d: string, i: number) => {
        if (index + i < 6) this.code[index + i] = d;
      });
      this.focusInput(Math.min(index + digits.length, 5));
    } else {
      if (value) {
        if (index < 5) {
          this.focusInput(index + 1);
        }
      }
    }

    this.checkAndSubmit();
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace' && !this.code[index] && index > 0) {
      this.focusInput(index - 1);
    }
  }

  focusInput(index: number): void {
    const inputs = document.querySelectorAll('.code-input');
    if (inputs[index]) {
      (inputs[index] as HTMLInputElement).focus();
    }
  }

  checkAndSubmit(): void {
    const fullCode = this.code.join('');
    if (fullCode.length === 6) {
      this.verify();
    }
  }

  verify(): void {
    if (this.loading) return;
    
    this.loading = true;
    this.error = '';
    const fullCode = this.code.join('');

    this.authService.verifyCode(fullCode).pipe(
      finalize(() => {
        this.loading = false;
        this.cd.detectChanges();
      })
    ).subscribe({
      next: (response: AuthResponse) => {
        this.success = true;
        this.loading = false; // Double check
        this.cd.detectChanges();
        setTimeout(() => {
          if (response.user?.is_new_user) {
            this.router.navigate(['/profile/complete']);
          } else {
            this.router.navigate(['/']);
          }
        }, 1500);
      },
      error: (err) => {
        console.error('Verification Error:', err);
        this.loading = false; // Double check
        
        // Prioritize the 'error' field if present, otherwise use 'message'
        this.error = err.error?.error || err.error?.message || 'Code invalide ou expiré.';
        
        // Clear code on error to allow retry
        this.code = ['', '', '', '', '', ''];
        this.cd.detectChanges();
        this.focusInput(0);
      }
    });
  }

  resendCode(): void {
    if (!this.email || this.loading) return;
    
    this.authService.sendMagicLink(this.email).subscribe({
      next: () => {
        // Show feedback that code was resent
        this.error = '';
        // Maybe a toast?
      },
      error: (err) => {
        this.error = 'Impossible de renvoyer le code. Veuillez réessayer.';
      }
    });
  }
}
