import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { TournamentService, Tournament } from '../../../core/services/tournament.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName = '';
  tournaments: Tournament[] = [];
  loading = true;
  stats = {
    total: 0,
    active: 0,
    participants: 0,
    prizePool: 0
  };

  constructor(
    private authService: AuthService,
    private tournamentService: TournamentService
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.userName = user?.name || '';
    });
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.loading = true;
    this.tournamentService.getMyTournaments().subscribe({
      next: (tournaments) => {
        this.tournaments = tournaments || [];
        this.calculateStats();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading dashboard data', err);
        this.loading = false;
      }
    });
  }

  calculateStats() {
    this.stats.total = this.tournaments.length;
    this.stats.active = this.tournaments.filter(t => ['open', 'in_progress'].includes(t.status)).length;
    this.stats.participants = this.tournaments.reduce((acc, t) => acc + (t.current_participants || 0), 0);
    this.stats.prizePool = this.tournaments.reduce((acc, t) => {
        const fee = parseFloat(t.entry_fee) || 0;
        return acc + (fee * (t.current_participants || 0));
    }, 0);
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'open': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in_progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'completed': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      default: return 'bg-slate-700/50 text-slate-500 border-slate-700';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'open': return 'Inscriptions';
      case 'in_progress': return 'En cours';
      case 'completed': return 'Terminé';
      case 'closed': return 'Fermé';
      default: return status;
    }
  }
}
