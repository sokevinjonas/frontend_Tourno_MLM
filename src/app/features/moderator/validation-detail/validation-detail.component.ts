import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';
import { User, UserProfile, OrganizerVerification } from '../../../core/models/user.model';
import { ToastService } from '../../../core/services/toast.service';
import { FormsModule } from '@angular/forms';
import { ModeratorService } from '../../../core/services/moderator.service';

@Component({
  selector: 'app-validation-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './validation-detail.component.html'
})
export class ValidationDetailComponent implements OnInit {
  user: User | null = null;
  organizerVerification: OrganizerVerification | null = null;
  loading = true;
  submitting = false;

  showValidateModal = false;
  showRejectModal = false;
  showImageModal = false;
  selectedImageUrl = '';
  rejection_reason = '';

  private cd = inject(ChangeDetectorRef);
  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private moderatorService: ModeratorService,
    private toastService: ToastService
  ) {}

  getScreenshotUrl(path: string): string {
    if (!path) return '';
    const baseUrl = environment.storageUrl;
    return `${baseUrl}/${path}`;
  }

  openImageModal(url: string) {
    if (!url) return;
    this.selectedImageUrl = url;
    this.showImageModal = true;
  }

  closeImageModal() {
    this.showImageModal = false;
    this.selectedImageUrl = '';
  }

  ngOnInit() {
    const uuid = this.route.snapshot.paramMap.get('id');
    if (uuid) {
      this.loadData(uuid);
    }
  }

  loadData(uuid: string) {
    this.loading = true;
    console.log('Loading detail for UUID:', uuid);
    
    // First try: fetch as a Profile
    this.moderatorService.getUserByUuid(uuid).subscribe({
      next: (user: User) => {
        console.log('Fetched as User:', user);
        if (user) {
          this.user = user; 
          this.loading = false;
          this.cd.markForCheck();
        } else {
          // If no user in profile, maybe try fetching as Organizer Verification
          this.loadAsOrganizer(uuid);
        }
      },
      error: () => {
        // Second try: fetch as Organizer Verification
        this.loadAsOrganizer(uuid);
      }
    });
  }

  private loadAsOrganizer(uuid: string) {
    this.moderatorService.getOrganizerVerificationByUuid(uuid).subscribe({
      next: (verif: OrganizerVerification) => {
        console.log('Fetched as Organizer Verification:', verif);
        if (verif && verif.user) {
          this.organizerVerification = verif;
          this.user = {
            ...verif.user,
            // We map common fields for the UI
            profile: {
                uuid: verif.uuid,
                user_uuid: verif.user_uuid,
                whatsapp_number: verif.whatsapp_number,
                country: verif.country,
                city: verif.city,
                status: verif.status as any,
                created_at: verif.created_at
            }
          };
          this.loading = false;
          this.cd.markForCheck();
        } else {
          // Final try: fetch as plain User
          this.loadAsUser(uuid);
        }
      },
      error: () => {
        this.loadAsUser(uuid);
      }
    });
  }

  private loadAsUser(uuid: string) {
    this.adminService.getUserByUuid(uuid).subscribe({
      next: (user: User) => {
        console.log('Fetched as User:', user);
        this.user = user;
        this.loading = false;
        this.cd.markForCheck();
      },
      error: (err) => {
        console.error('Final fetch failed:', err);
        this.toastService.error('Erreur lors du chargement des détails.');
        this.loading = false;
        this.cd.markForCheck();
      }
    });
  }

  openValidateModal() {
    this.showValidateModal = true;
  }

  closeValidateModal() {
    this.showValidateModal = false;
  }

  confirmValidation() {
    const targetUuid = this.organizerVerification?.uuid || this.user?.profile?.uuid;
    if (!targetUuid) {
        this.toastService.error('Cible de validation introuvable.');
        return;
    }
    
    this.submitting = true;
    const obs = this.organizerVerification 
        ? this.moderatorService.validateOrganizerVerification(targetUuid)
        : this.moderatorService.validateProfile(targetUuid);

    obs.subscribe({
      next: () => {
        this.toastService.success('Validé avec succès.');
        this.loadData(this.route.snapshot.paramMap.get('id')!);
        this.submitting = false;
        this.closeValidateModal();
      },
      error: (err) => {
        console.error('Error validating', err);
        this.toastService.error('Erreur lors de la validation.');
        this.submitting = false;
        this.cd.markForCheck();
      }
    });
  }

  openRejectModal() {
    this.rejection_reason = '';
    this.showRejectModal = true;
  }

  closeRejectModal() {
    this.showRejectModal = false;
  }

  confirmReject() {
    const targetUuid = this.organizerVerification?.uuid || this.user?.profile?.uuid;
    if (!targetUuid) {
        this.toastService.error('Cible de rejet introuvable.');
        return;
    }
    
    this.submitting = true;
    const obs = this.organizerVerification 
        ? this.moderatorService.rejectOrganizerVerification(targetUuid, this.rejection_reason)
        : this.moderatorService.rejectProfile(targetUuid, this.rejection_reason);

    obs.subscribe({
      next: () => {
        this.toastService.success('Refusé avec succès.');
        this.loadData(this.route.snapshot.paramMap.get('id')!);
        this.submitting = false;
        this.closeRejectModal();
      },
      error: (err) => {
        console.error('Error rejecting', err);
        this.toastService.error('Erreur lors du refus.');
        this.submitting = false;
        this.cd.markForCheck();
      }
    });
  }
}
