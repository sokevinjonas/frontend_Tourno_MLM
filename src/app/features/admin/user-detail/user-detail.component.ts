import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
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
  showBanModal = false;
  banReason = '';

  private cd = inject(ChangeDetectorRef);
  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private moderatorService: ModeratorService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadUser(Number(id));
    }
  }

  loadUser(id: number) {
    this.loading = true;
    this.adminService.getUserById(id).subscribe({
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
    this.moderatorService.validateProfile(this.user.profile.id).subscribe({
      next: () => {
        this.toastService.success('Profil validé avec succès.');
        this.loadUser(this.user!.id);
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

  openBanModal() {
    this.banReason = '';
    this.showBanModal = true;
  }

  closeBanModal() {
    this.showBanModal = false;
  }

  confirmBan() {
    if (!this.user?.profile) return;
    
    this.submitting = true;
    this.moderatorService.rejectProfile(this.user.profile.id, this.banReason || 'Non spécifiée').subscribe({
      next: () => {
        this.toastService.success('Profil refusé avec succès.');
        this.loadUser(this.user!.id);
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
    this.adminService.unbanUser(this.user.id).subscribe({
      next: () => {
        this.toastService.success('Utilisateur débanni.');
        this.loadUser(this.user!.id);
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
}
