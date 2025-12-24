import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../core/services/admin.service';
import { TournamentService, Tournament } from '../../../core/services/tournament.service';
import { ToastService } from '../../../core/services/toast.service';
import { RouterLink } from '@angular/router';
import { TournamentStatusPipe } from '../../../shared/pipes/tournament-status.pipe';
import { TournamentStatusClassPipe } from '../../../shared/pipes/tournament-status-class.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tournaments',
  standalone: true,
  imports: [CommonModule, RouterLink, TournamentStatusPipe, TournamentStatusClassPipe, FormsModule],
  templateUrl: './tournaments.component.html'
})
export class TournamentsComponent implements OnInit {

  private cd = inject(ChangeDetectorRef);
  tournaments: Tournament[] = [];
  loading = true;
  submitting = false;

  filters = {
    status: '',
    game: ''
  };

  constructor(
    private adminService: AdminService,
    private tournamentService: TournamentService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.loadTournaments();
  }

  loadTournaments() {
    this.loading = true;
    this.adminService.getGlobalTournaments(this.filters).subscribe({
      next: (tournaments) => {
        this.tournaments = tournaments;
        this.loading = false;
        this.cd.markForCheck();
      },
      error: (err) => {
        console.error('Error loading global tournaments', err);
        this.toastService.error('Erreur lors du chargement des tournois.');
        this.loading = false;
        this.cd.markForCheck();
      }
    });
  }

  deleteTournament(id: number) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce tournoi ? Tous les participants seront remboursés.')) return;
    
    this.submitting = true;
    this.adminService.deleteTournament(id).subscribe({
      next: () => {
        this.toastService.success('Tournoi supprimé avec succès.');
        this.tournaments = this.tournaments.filter(t => t.id !== id);
        this.submitting = false;
        this.cd.markForCheck();
      },
      error: (err) => {
        this.toastService.error('Erreur lors de la suppression.');
        this.submitting = false;
        this.cd.markForCheck();
      }
    });
  }

  changeStatus(id: number, status: string) {
    this.submitting = true;
    this.tournamentService.changeStatus(id, status).subscribe({
      next: () => {
        this.toastService.success('Statut mis à jour.');
        this.loadTournaments();
        this.submitting = false;
        this.cd.markForCheck();
      },
      error: (err) => {
        this.toastService.error('Erreur lors de la mise à jour du statut.');
        this.submitting = false;
        this.cd.markForCheck();
      }
    });
  }
}
