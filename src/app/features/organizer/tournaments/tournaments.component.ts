import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TournamentService, Tournament } from '../../../core/services/tournament.service';

@Component({
  selector: 'app-tournaments',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
  tournaments: Tournament[] = [];
  filteredTournaments: Tournament[] = [];
  loading = true;
  activeFilter: 'all' | 'open' | 'ongoing' | 'completed' = 'all';

  constructor(private tournamentService: TournamentService) {}

  ngOnInit() {
    this.loadTournaments();
  }

  loadTournaments() {
    this.loading = true;
    this.tournamentService.getMyTournaments().subscribe({
      next: (tournaments) => {
        this.tournaments = tournaments || [];
        this.applyFilter('all');
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching tournaments', err);
        this.loading = false;
      }
    });
  }

  applyFilter(filter: 'all' | 'open' | 'ongoing' | 'completed') {
    this.activeFilter = filter;
    if (filter === 'all') {
      this.filteredTournaments = [...this.tournaments];
    } else {
      this.filteredTournaments = this.tournaments.filter(t => t.status === filter);
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'open': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'ongoing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'completed': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      default: return 'bg-slate-700/50 text-slate-500 border-slate-700';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'open': return 'Inscriptions';
      case 'ongoing': return 'En cours';
      case 'completed': return 'Terminé';
      case 'closed': return 'Fermé';
      default: return status;
    }
  }
}
