import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModeratorService } from '../../../core/services/moderator.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  stats = {
    pendingProfiles: 0,
    disputedMatches: 0,
    pendingVerifications: 0
  };
  loading = true;

  constructor(private moderatorService: ModeratorService) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.loading = true;
    // For now we just fetch the lists and count them. 
    // In a real scenario, the backend might provide a summary endpoint.
    Promise.all([
      this.moderatorService.getPendingProfiles().toPromise(),
      this.moderatorService.getDisputedMatches().toPromise(),
      this.moderatorService.getPendingVerifications().toPromise()
    ]).then(([profiles, matches, verifications]) => {
      this.stats = {
        pendingProfiles: profiles?.length || 0,
        disputedMatches: matches?.length || 0,
        pendingVerifications: verifications?.length || 0
      };
      this.loading = false;
    }).catch(err => {
      console.error('Error loading moderator stats', err);
      this.loading = false;
    });
  }
}
