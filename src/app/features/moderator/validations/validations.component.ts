import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModeratorService } from '../../../core/services/moderator.service';
import { UserProfile, OrganizerVerification } from '../../../core/models/user.model';
import { ToastService } from '../../../core/services/toast.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-validations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './validations.component.html'
})
export class ValidationsComponent implements OnInit {
  
  private cd = inject(ChangeDetectorRef);
  activeTab: 'profiles' | 'organizers' = 'profiles';
  
  pendingProfiles: UserProfile[] = [];
  pendingVerifications: OrganizerVerification[] = [];
  
  loading = true;
  submitting = false;
  
  showRejectModal = false;
  selectedItem: any = null; // Can be UserProfile or OrganizerVerification
  rejectionReason = '';

  constructor(
    private moderatorService: ModeratorService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.refreshData();
  }

  setTab(tab: 'profiles' | 'organizers') {
    this.activeTab = tab;
    this.refreshData();
  }

  refreshData() {
    this.loading = true;
    if (this.activeTab === 'profiles') {
      this.loadPendingProfiles();
    } else {
      this.loadPendingVerifications();
    }
  }

  loadPendingProfiles() {
    this.moderatorService.getPendingProfiles().subscribe({
      next: (profiles) => {
        this.pendingProfiles = profiles;
        this.loading = false;
        this.cd.markForCheck();
      },
      error: (err) => {
        this.toastService.error('Erreur lors du chargement des profils.');
        this.loading = false;
        this.cd.markForCheck();
      }
    });
  }

  loadPendingVerifications() {
    this.moderatorService.getPendingVerifications().subscribe({
      next: (verifs) => {
        this.pendingVerifications = verifs;
        this.loading = false;
        this.cd.markForCheck();
      },
      error: (err) => {
        this.toastService.error('Erreur lors du chargement des vérifications.');
        this.loading = false;
        this.cd.markForCheck();
      }
    });
  }

  // --- Profile Actions ---
  validateProfile(profile: UserProfile) {
    if (this.submitting) return;
    this.submitting = true;
    this.moderatorService.validateProfile(profile.id).subscribe({
      next: () => {
        this.toastService.success(`Profil de ${profile.user?.name} validé.`);
        this.pendingProfiles = this.pendingProfiles.filter(p => p.id !== profile.id);
        this.submitting = false;
        this.cd.markForCheck();
      },
      error: () => {
        this.toastService.error('Erreur lors de la validation.');
        this.submitting = false;
        this.cd.markForCheck();
      }
    });
  }

  // --- Organizer Actions ---
  validateOrganizer(verif: OrganizerVerification) {
    if (this.submitting) return;
    this.submitting = true;
    this.moderatorService.validateOrganizerVerification(verif.id).subscribe({
      next: () => {
        this.toastService.success(`Organisateur ${verif.user?.name} validé.`);
        this.pendingVerifications = this.pendingVerifications.filter(v => v.id !== verif.id);
        this.submitting = false;
        this.cd.markForCheck();
      },
      error: () => {
        this.toastService.error('Erreur lors de la validation.');
        this.submitting = false;
        this.cd.markForCheck();
      }
    });
  }

  // --- Rejection Modal ---
  openRejectModal(item: any) {
    this.selectedItem = item;
    this.rejectionReason = '';
    this.showRejectModal = true;
  }

  closeRejectModal() {
    this.showRejectModal = false;
    this.selectedItem = null;
  }

  confirmReject() {
    if (!this.selectedItem || !this.rejectionReason) return;
    this.submitting = true;

    if (this.activeTab === 'profiles') {
      this.moderatorService.rejectProfile(this.selectedItem.id, this.rejectionReason).subscribe({
        next: () => {
          this.toastService.info(`Profil rejeté.`);
          this.pendingProfiles = this.pendingProfiles.filter(p => p.id !== this.selectedItem.id);
          this.closeRejectModal();
          this.submitting = false;
          this.cd.markForCheck();
        },
        error: () => {
          this.toastService.error('Erreur lors du rejet.');
          this.submitting = false;
          this.cd.markForCheck();
        }
      });
    } else {
      this.moderatorService.rejectOrganizerVerification(this.selectedItem.id, this.rejectionReason).subscribe({
        next: () => {
          this.toastService.info(`Demande d'organisateur rejetée.`);
          this.pendingVerifications = this.pendingVerifications.filter(v => v.id !== this.selectedItem.id);
          this.closeRejectModal();
          this.submitting = false;
          this.cd.markForCheck();
        },
        error: () => {
          this.toastService.error('Erreur lors du rejet.');
          this.submitting = false;
          this.cd.markForCheck();
        }
      });
    }
  }
}
