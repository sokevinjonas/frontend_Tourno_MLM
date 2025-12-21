import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { RouterLink } from '@angular/router';
import { OrganizerService } from '../../../core/services/organizer.service';
import { ToastService } from '../../../core/services/toast.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  authService = inject(AuthService);
  organizerService = inject(OrganizerService);
  toastService = inject(ToastService);
  cd = inject(ChangeDetectorRef);
  
  currentUser$ = this.authService.currentUser$;
  
  // Organizer specific logic
  organizerStatus: any = null;
  loadingOrganizerStatus = false;

  verificationForm: any = {
    badge_type: 'verified',
    nature_document: 'cnib',
    doc_recto: null,
    doc_verso: null,
    contrat_signer: null
  };

  submitting = false;

  ngOnInit() {
    this.currentUser$.subscribe(user => {
      if (user && user.role === 'organizer') {
         this.fetchOrganizerStatus();
      }
    });
  }

  fetchOrganizerStatus() {
    this.loadingOrganizerStatus = true;
    this.organizerService.checkIfOrganizer().subscribe({
      next: (res) => {
        this.organizerStatus = res;
        this.loadingOrganizerStatus = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching organizer status', err);
        this.loadingOrganizerStatus = false;
      }
    });
  }

  onFileChange(event: any, field: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.verificationForm[field] = file;
    }
  }

  submitVerification() {
    if (!this.verificationForm.doc_recto || !this.verificationForm.doc_verso || !this.verificationForm.contrat_signer) {
       this.toastService.warning('Veuillez fournir tous les documents requis (fichiers).');
       return;
    }

    this.submitting = true;

    const formData = new FormData();
    formData.append('badge_type', this.verificationForm.badge_type);
    formData.append('nature_document', this.verificationForm.nature_document);
    formData.append('doc_recto', this.verificationForm.doc_recto);
    formData.append('doc_verso', this.verificationForm.doc_verso);
    formData.append('contrat_signer', this.verificationForm.contrat_signer);

    this.organizerService.submitVerification(formData).subscribe({
      next: (res) => {
        this.toastService.success('Demande de vérification envoyée avec succès !');
        this.submitting = false;
        this.fetchOrganizerStatus(); // Refresh status
      },
      error: (err) => {
        console.error('Submit verification error', err);
        const msg = err.error?.message || 'Erreur lors de l\'envoi de la demande.';
        this.toastService.error(msg);
        this.submitting = false;
      }
    });
  }
}
