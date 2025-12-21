import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
    private tournamentService: TournamentService,
    private cd: ChangeDetectorRef
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
      next: (res) => {
        // Robust mapping of data from different possible API structures
        const data = res;
        
        this.tournaments = data.map((t: any) => ({
          ...t,
          // Calculate participants from registrations if field is missing
          current_participants: t.registrations ? t.registrations.length : (t.current_participants || 0)
        }));
        
        console.log('Dashboard tournaments mapped:', this.tournaments);
        
        try {
          this.calculateStats();
        } catch (error) {
          console.error('Error calculating dashboard stats:', error);
        }
        
        this.loading = false;
        this.cd.detectChanges(); // Force UI update even on hard refresh
      },
      error: (err) => {
        console.error('Error loading dashboard data', err);
        this.loading = false;
        this.tournaments = [];
        this.cd.detectChanges();
      }
    });
  }

  calculateStats() {
    if (!this.tournaments || !Array.isArray(this.tournaments)) {
      this.resetStats();
      return;
    }

    this.stats.total = this.tournaments.length;
    this.stats.active = this.tournaments.filter(t => 
      t && ['open', 'in_progress'].includes(t.status)
    ).length;
    
    this.stats.participants = this.tournaments.reduce((acc, t) => 
      acc + (t.current_participants || 0), 0
    );
    
    this.stats.prizePool = this.tournaments.reduce((acc, t) => {
      const fee = typeof t.entry_fee === 'string' ? parseFloat(t.entry_fee) : (t.entry_fee || 0);
      const participants = t.current_participants || 0;
      return acc + (fee * participants);
    }, 0);
  }

  private resetStats() {
    this.stats = { total: 0, active: 0, participants: 0, prizePool: 0 };
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
