import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TournamentService, Tournament } from '../../../core/services/tournament.service';
import { TournamentStatusPipe } from '../../../shared/pipes/tournament-status.pipe';

@Component({
  selector: 'app-tournaments',
  standalone: true,
  imports: [CommonModule, RouterLink, TournamentStatusPipe],
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
  tournaments: Tournament[] = [];
  filteredTournaments: Tournament[] = [];
  loading = true;
  activeFilter: 'all' | 'open' | 'in_progress' | 'completed' = 'all';

  constructor(private tournamentService: TournamentService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadTournaments();
  }

  loadTournaments() {
    this.loading = true;
    this.tournamentService.getMyTournaments().subscribe({
      next: (tournaments) => {
        this.tournaments = tournaments;
        console.log(this.tournaments);
        this.applyFilter('all');
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching tournaments', err);
        this.loading = false;
        this.cd.detectChanges();
      }
    });
  }

  applyFilter(filter: 'all' | 'open' | 'in_progress' | 'completed') {
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
      case 'in_progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'completed': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      default: return 'bg-slate-700/50 text-slate-500 border-slate-700';
    }
  }
}
