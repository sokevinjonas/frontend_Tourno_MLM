import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  private cd = inject(ChangeDetectorRef);
  stats = {
    totalUsers: 0,
    activeTournaments: 0,
    totalTransactions: 0,
    activeOrganizers: 0
  };
  loading = true;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadGlobalStats();
  }

  loadGlobalStats() {
    this.loading = true;
    Promise.all([
      this.adminService.getUsers().toPromise(),
      this.adminService.getGlobalTournaments().toPromise()
    ]).then(([users, tournaments]) => {
      this.stats = {
        totalUsers: users?.length || 0,
        activeTournaments: tournaments?.filter(t => t.status === 'in_progress' || t.status === 'open').length || 0,
        totalTransactions: 0, // Placeholder
        activeOrganizers: users?.filter(u => u.role === 'organizer').length || 0
      };
      this.loading = false;
      this.cd.markForCheck();
    }).catch(err => {
      console.error('Error loading admin global stats', err);
      this.loading = false;
      this.cd.markForCheck();
    });
  }
}
