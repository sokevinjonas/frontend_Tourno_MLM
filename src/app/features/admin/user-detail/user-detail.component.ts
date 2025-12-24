import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';
import { User, PaginatedResponse } from '../../../core/models/user.model';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {
  user: User | null = null;
  loading = true;

  private cd = inject(ChangeDetectorRef);
  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
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
    this.adminService.getUsers().subscribe({
      next: (res: PaginatedResponse<User>) => {
        this.user = res.data.find((u: User) => u.id === id) || null;
        console.log(this.user);
        
        if (!this.user) {
          this.toastService.error('Utilisateur non trouvé.');
        }
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
}
