import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModeratorService } from '../../../core/services/moderator.service';
import { RouterLink } from '@angular/router';
import { UserProfile, OrganizerVerification } from '../../../core/models/user.model';
import { ToastService } from '../../../core/services/toast.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-validations',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
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
    this.moderatorService.validateProfile(profile.uuid).subscribe({
      next: () => {
        this.toastService.success('Profil du joueur validé.');
        this.pendingProfiles = this.pendingProfiles.filter(p => p.uuid !== profile.uuid);
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
    this.moderatorService.validateOrganizerVerification(verif.uuid).subscribe({
      next: () => {
        this.toastService.success('Vérification organisateur validée.');
        this.pendingVerifications = this.pendingVerifications.filter(v => v.uuid !== verif.uuid);
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
      this.moderatorService.rejectProfile(this.selectedItem.uuid, this.rejectionReason).subscribe({
        next: () => {
          this.toastService.warning('Profil refusé.');
          this.pendingProfiles = this.pendingProfiles.filter(p => p.uuid !== this.selectedItem.uuid);
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
      this.moderatorService.rejectOrganizerVerification(this.selectedItem.uuid, this.rejectionReason).subscribe({
        next: () => {
          this.toastService.warning('Vérification refusée.');
          this.submitting = false;
          this.cd.markForCheck();
        }
      });
    }
  }
}
