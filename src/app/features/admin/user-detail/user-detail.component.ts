import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';
import { User } from '../../../core/models/user.model';
import { ToastService } from '../../../core/services/toast.service';
import { FormsModule } from '@angular/forms';
import { ModeratorService } from '../../../core/services/moderator.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {
  user: User | null = null;
  loading = true;
  submitting = false;

  showValidateModal = false;
  showRejectModal = false;
  showBanModal = false;
  showImageModal = false;
  selectedImageUrl = '';
  rejection_reason = '';
  banReason = '';

  private cd = inject(ChangeDetectorRef);
  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private moderatorService: ModeratorService,
    private toastService: ToastService
  ) {}

  getScreenshotUrl(path: string): string {
    const baseUrl = environment.storageUrl;
    return `${baseUrl}/${path}`;
  }

  openImageModal(url: string) {
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
      this.loadUser(uuid);
    }
  }

  loadUser(uuid: string) {
    this.loading = true;
    this.adminService.getUserByUuid(uuid).subscribe({
      next: (user: User) => {
        this.user = user;
        this.loading = false;
        this.cd.markForCheck();
      },
      error: (err) => {
        console.error('Error loading user detail', err);
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
    if (!this.user?.profile) return;
    
    this.submitting = true;
    this.moderatorService.validateProfile(this.user.profile.uuid).subscribe({
      next: () => {
        this.toastService.success('Profil validé avec succès.');
        this.loadUser(this.user!.uuid);
        this.submitting = false;
        this.closeValidateModal();
      },
      error: (err) => {
        console.error('Error validating profile', err);
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
    if (!this.user?.profile) return;
    
    this.submitting = true;
    this.moderatorService.rejectProfile(this.user.profile.uuid, this.rejection_reason || 'Non spécifiée').subscribe({
      next: () => {
        this.toastService.success('Profil refusé avec succès.');
        this.loadUser(this.user!.uuid);
        this.submitting = false;
        this.closeRejectModal();
      },
      error: (err) => {
        console.error('Error rejecting profile', err);
        this.toastService.error('Erreur lors du refus.');
        this.submitting = false;
        this.cd.markForCheck();
      }
    });
  }

  openBanModal() {
    this.banReason = '';
    this.showBanModal = true;
  }

  closeBanModal() {
    this.showBanModal = false;
  }

  confirmBan() {
    if (!this.user) return;
    
    this.submitting = true;
    this.adminService.banUser(this.user.uuid, this.banReason || 'Non spécifiée').subscribe({
      next: () => {
        this.toastService.success('Utilisateur banni.');
        this.loadUser(this.user!.uuid);
        this.submitting = false;
        this.closeBanModal();
      },
      error: (err) => {
        console.error('Error banning user', err);
        this.toastService.error('Erreur lors du bannissement.');
        this.submitting = false;
        this.cd.markForCheck();
      }
    });
  }

  unbanUser() {
    if (!this.user) return;

    this.submitting = true;
    this.adminService.unbanUser(this.user.uuid).subscribe({
      next: () => {
        this.toastService.success('Utilisateur débanni.');
        this.loadUser(this.user!.uuid);
        this.submitting = false;
      },
      error: (err) => {
        console.error('Error unbanning user', err);
        this.toastService.error('Erreur lors du débannissement.');
        this.submitting = false;
        this.cd.markForCheck();
      }
    });
  }

  openWhatsApp() {
    const number = this.user?.profile?.whatsapp_number;
    if (!number) {
      this.toastService.error('Numéro WhatsApp non renseigné.');
      return;
    }

    // Clean number: remove non-digits but keep + if present at start
    const cleanNumber = number.replace(/[^\d+]/g, '');
    const message = `Bonjour cher joueur ${this.user?.name}, je suis l'agent de la plateforme G4me Pro Africa chargé de vérifier votre numéro whatsapp et valider votre profil. Veuillez me confirmer qu'il s'agit bien de vous`;
    
    const url = `https://wa.me/${cleanNumber.startsWith('+') ? cleanNumber.substring(1) : cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }
}
