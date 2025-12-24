import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';
import { User, PaginatedResponse } from '../../../core/models/user.model';
import { ToastService } from '../../../core/services/toast.service';
import { ModeratorService } from '../../../core/services/moderator.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {
  user: User | null = null;
  loading = true;
  submitting = false;

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

  validateProfile() {
    if (!this.user?.profile) return;
    
    this.submitting = true;
    this.moderatorService.validateProfile(this.user.profile.id).subscribe({
      next: () => {
        this.toastService.success('Profil validé avec succès.');
        this.loadUser(this.user!.id);
        this.submitting = false;
      },
      error: (err) => {
        console.error('Error validating profile', err);
        this.toastService.error('Erreur lors de la validation.');
        this.submitting = false;
        this.cd.markForCheck();
      }
    });
  }

  banUser() {
    if (!this.user) return;
    
    const reason = prompt('Raison du bannissement :');
    if (reason === null) return; // Cancelled

    this.submitting = true;
    this.adminService.banUser(this.user.id, reason || 'Non spécifiée').subscribe({
      next: () => {
        this.toastService.success('Utilisateur banni.');
        this.loadUser(this.user!.id);
        this.submitting = false;
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
