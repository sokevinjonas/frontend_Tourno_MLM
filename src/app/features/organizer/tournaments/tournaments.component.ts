import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TournamentService, Tournament } from '../../../core/services/tournament.service';
import { ToastService } from '../../../core/services/toast.service';
import { TournamentStatusPipe } from '../../../shared/pipes/tournament-status.pipe';
import { GameNamePipe } from '../../../shared/pipes/game-name.pipe';
import { GameColorPipe } from '../../../shared/pipes/game-color.pipe';
import { TournamentStatusClassPipe } from '../../../shared/pipes/tournament-status-class.pipe';

@Component({
  selector: 'app-tournaments',
  standalone: true,
  imports: [CommonModule, RouterLink, TournamentStatusPipe, GameNamePipe, GameColorPipe, TournamentStatusClassPipe],
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
  tournaments: Tournament[] = [];
  filteredTournaments: Tournament[] = [];
  loading = true;
  activeFilter: 'all' | 'open' | 'in_progress' | 'completed' = 'all';
  
  // Modal State
  showActionModal = false;
  selectedTournament: Tournament | null = null;
  processingAction = false;

  constructor(
    private tournamentService: TournamentService,
    private cd: ChangeDetectorRef,
    private toastService: ToastService
  ) {}

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

  openActionModal(t: Tournament, event: Event) {
    event.stopPropagation();
    this.selectedTournament = t;
    this.showActionModal = true;
    this.cd.detectChanges();
  }

  closeActionModal() {
    this.showActionModal = false;
    this.selectedTournament = null;
    this.cd.detectChanges();
  }

  publishTournament() {
    if (!this.selectedTournament) return;
    this.processingAction = true;
    this.tournamentService.changeStatus(this.selectedTournament.id, 'open').subscribe({
      next: () => {
        this.toastService.success('Inscriptions ouvertes !');
        this.loadTournaments();
        this.closeActionModal();
        this.processingAction = false;
      },
      error: (err) => {
        this.toastService.error(err.error?.message || 'Erreur lors de la publication.');
        this.processingAction = false;
      }
    });
  }

  launchTournament() {
    if (!this.selectedTournament) return;
    this.processingAction = true;
    this.tournamentService.startTournament(this.selectedTournament.id).subscribe({
      next: () => {
        this.toastService.success('Le tournoi a été lancé avec succès !');
        this.loadTournaments();
        this.closeActionModal();
        this.processingAction = false;
      },
      error: (err) => {
        this.toastService.error(err.error?.message || 'Erreur lors du lancement.');
        this.processingAction = false;
      }
    });
  }

}
