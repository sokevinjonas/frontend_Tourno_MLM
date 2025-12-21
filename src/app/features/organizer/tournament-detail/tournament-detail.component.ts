import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TournamentService, Tournament } from '../../../core/services/tournament.service';
import { MatchService, Match } from '../../../core/services/match.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-tournament-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.css']
})
export class TournamentDetailComponent implements OnInit {
  parseFloat = parseFloat;
  tournament: Tournament | null = null;
  matches: Match[] = [];
  loading = true;
  activeTab: 'overview' | 'participants' | 'matches' | 'settings' = 'overview';

  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService,
    private matchService: MatchService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadTournament(parseInt(id));
    }
  }

  loadTournament(id: number) {
    this.loading = true;
    this.tournamentService.getTournament(id).subscribe({
      next: (t) => {
        this.tournament = t;
        if (t.status !== 'open') {
          this.loadMatches(id);
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading tournament', err);
        this.toastService.error('Impossible de charger le tournoi.');
        this.loading = false;
      }
    });
  }

  loadMatches(id: number) {
    this.matchService.getTournamentMatches(id).subscribe({
      next: (matches) => {
        this.matches = matches;
      }
    });
  }

  launchTournament() {
    if (!this.tournament) return;
    if (confirm('Êtes-vous sûr de vouloir lancer le tournoi ? Cela générera les matches du Round 1.')) {
      this.tournamentService.launchTournament(this.tournament.id).subscribe({
        next: () => {
          this.toastService.success('Tournoi lancé avec succès !');
          this.loadTournament(this.tournament!.id);
        },
        error: (err) => this.toastService.error(err.error?.message || 'Erreur lors du lancement.')
      });
    }
  }

  closeRegistrations() {
    if (!this.tournament) return;
    this.tournamentService.closeRegistrations(this.tournament.id).subscribe({
      next: () => {
        this.toastService.success('Inscriptions fermées.');
        this.loadTournament(this.tournament!.id);
      },
      error: (err) => this.toastService.error(err.error?.message || 'Erreur.')
    });
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'open': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'ongoing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'completed': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      default: return 'bg-slate-700/50 text-slate-500 border-slate-700';
    }
  }
}
