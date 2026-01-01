import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModeratorService } from '../../../core/services/moderator.service';
import { MatchService, Match } from '../../../core/services/match.service';
import { ToastService } from '../../../core/services/toast.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-complaints',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './complaints.component.html'
})
export class ComplaintsComponent implements OnInit {
  disputedMatches: Match[] = [];
  loading = true;
  submitting = false;

  showResolveModal = false;
  selectedMatch: Match | null = null;
  
  resolveForm = {
    winner_uuid: '',
    player1_score: 0,
    player2_score: 0
  };

  constructor(
    private moderatorService: ModeratorService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.loadDisputedMatches();
  }

  loadDisputedMatches() {
    this.loading = true;
    this.moderatorService.getDisputedMatches().subscribe({
      next: (matches) => {
        this.disputedMatches = matches;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading disputed matches', err);
        this.toastService.error('Erreur lors du chargement des litiges.');
        this.loading = false;
      }
    });
  }

  openResolveModal(match: Match) {
    this.selectedMatch = match;
    this.resolveForm = {
      winner_uuid: match.winner_uuid || '',
      player1_score: match.player1_score || 0,
      player2_score: match.player2_score || 0
    };
    this.showResolveModal = true;
  }

  closeResolveModal() {
    this.showResolveModal = false;
    this.selectedMatch = null;
  }

  confirmResolve() {
    if (!this.selectedMatch) return;
    this.submitting = true;

    this.moderatorService.validateMatchResult(this.selectedMatch.uuid, this.resolveForm).subscribe({
      next: () => {
        this.toastService.success('Litige résolu avec succès.');
        this.disputedMatches = this.disputedMatches.filter(m => m.uuid !== this.selectedMatch?.uuid);
        this.closeResolveModal();
        this.submitting = false;
      },
      error: (err) => {
        this.toastService.error('Erreur lors de la résolution du litige.');
        this.submitting = false;
      }
    });
  }
}
