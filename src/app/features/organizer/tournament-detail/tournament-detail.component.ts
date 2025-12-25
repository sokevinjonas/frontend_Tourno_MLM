import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TournamentService, Tournament } from '../../../core/services/tournament.service';
import { MatchService, Match } from '../../../core/services/match.service';
import { PaymentService } from '../../../core/services/payment.service';
import { OrganizerWalletStats } from '../../../core/models/payment.model';
import { ToastService } from '../../../core/services/toast.service';
import { TournamentStatusPipe } from '../../../shared/pipes/tournament-status.pipe';
import { GameNamePipe } from '../../../shared/pipes/game-name.pipe';
import { TournamentStatusClassPipe } from '../../../shared/pipes/tournament-status-class.pipe';

@Component({
  selector: 'app-tournament-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TournamentStatusPipe, GameNamePipe, TournamentStatusClassPipe],
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.css']
})
export class TournamentDetailComponent implements OnInit {
  parseFloat = parseFloat;
  tournament: Tournament | null = null;
  matches: Match[] = [];
  rounds: any[] = [];
  selectedRoundId: number | null = null;
  roundInfo: any = null;
  loading = true;
  submitting = false;
  walletStats: OrganizerWalletStats | null = null;
  activeTab: 'overview' | 'participants' | 'matches' | 'settings' = 'overview';

  // Modal states
  showLaunchModal = false;
  showNextRoundModal = false;
  showCloseRegistrationsModal = false;
  showScoreModal = false;
  selectedMatch: Match | null = null;
  score1: number | null = null;
  score2: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService,
    private matchService: MatchService,
    private paymentService: PaymentService,
    private toastService: ToastService,
    private cd: ChangeDetectorRef
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
        console.log('Tournament data:', this.tournament);
        
        // Handle rounds
        this.rounds = (t as any).rounds || [];
        if (this.rounds.length > 0) {
          // Select either current_round or the first round
          const currentRoundNum = (t as any).current_round || 1;
          const currentRound = this.rounds.find(r => r.round_number === currentRoundNum) || this.rounds[0];
          this.selectedRoundId = currentRound.id;
        }

        if (t.status !== 'open') {
          this.loadMatches(id);
          this.loadRoundsInfo(id);
        }
        this.loadTournamentWallet();
        this.loading = false; 
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error loading tournament', err);
        this.toastService.error('Impossible de charger le tournoi.');
        this.loading = false;
        this.cd.detectChanges();
      }
    });
  }

  loadRoundsInfo(id: number) {
     this.tournamentService.getRoundsInfo(id).subscribe({
       next: (res) => {
         this.roundInfo = res.data;
         this.cd.detectChanges();
       }
     });
  }

  goToNextRound() {
     if (!this.tournament) return;
     if (this.roundInfo?.current_round?.pending_matches > 0) {
        this.toastService.error(`Il reste ${this.roundInfo.current_round.pending_matches} match(es) à terminer.`);
        return;
     }
     this.showNextRoundModal = true;
  }

  confirmNextRound() {
     if (!this.tournament) return;
     this.submitting = true;
     this.tournamentService.nextRound(this.tournament.id).subscribe({
        next: (res) => {
           this.toastService.success('Round suivant généré avec succès !');
           this.loadTournament(this.tournament!.id);
           this.showNextRoundModal = false;
           this.submitting = false;
        },
        error: (err) => {
           console.error('Error generating next round', err);
           this.toastService.error(err.error?.message || 'Erreur lors du passage au round suivant.');
           this.showNextRoundModal = false;
           this.submitting = false;
           this.cd.detectChanges();
        }
     });
  }

  get filteredMatches(): Match[] {
    if (!this.selectedRoundId) return this.matches;
    return this.matches.filter(m => (m as any).round_id === this.selectedRoundId);
  }

  selectRound(roundId: number) {
    this.selectedRoundId = roundId;
    this.cd.detectChanges();
  }

  loadMatches(id: number) {
    this.matchService.getTournamentMatches(id).subscribe({
      next: (matches) => {
        this.matches = matches.data;
        console.log('Matches:', this.matches);
        this.cd.detectChanges();
      }
    });
  }

  loadTournamentWallet() {
    this.paymentService.getOrganizerWalletStats().subscribe({
      next: (res) => {
        this.walletStats = res.statistics;
        console.log('Wallet stats:', this.walletStats);
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error loading organizer wallet stats', err);
      }
    });
  }

  launchTournament() {
    this.showLaunchModal = true;
  }

  confirmLaunchTournament() {
    if (!this.tournament) return;
    this.submitting = true;
    this.tournamentService.startTournament(this.tournament.id).subscribe({
      next: () => {
        this.toastService.success('Tournoi lancé avec succès !');
        this.loadTournament(this.tournament!.id);
        this.showLaunchModal = false;
        this.submitting = false;
      },
      error: (err: any) => {
        this.toastService.error(err.error?.message || 'Erreur lors du lancement.');
        this.showLaunchModal = false;
        this.submitting = false;
      }
    });
  }

  closeRegistrations() {
    this.showCloseRegistrationsModal = true;
  }

  confirmCloseRegistrations() {
    if (!this.tournament) return;
    this.submitting = true;
    this.tournamentService.closeRegistrations(this.tournament.id).subscribe({
      next: () => {
        this.toastService.success('Inscriptions fermées.');
        this.loadTournament(this.tournament!.id);
        this.showCloseRegistrationsModal = false;
        this.submitting = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.toastService.error(err.error?.message || 'Erreur.');
        this.showCloseRegistrationsModal = false;
        this.submitting = false;
        this.cd.detectChanges();
      }
    });
  }

  openScoreModal(match: Match) {
    this.selectedMatch = match;
    this.score1 = match.player1_score;
    this.score2 = match.player2_score;
    this.showScoreModal = true;
  }

  closeScoreModal() {
    this.showScoreModal = false;
    this.selectedMatch = null;
    this.score1 = null;
    this.score2 = null;
  }

  submitScore() {
    if (!this.selectedMatch || this.score1 === null || this.score2 === null) return;
    
    this.submitting = true;
    this.matchService.enterScore(this.selectedMatch.id, {
      player1_score: this.score1,
      player2_score: this.score2
    }).subscribe({
      next: () => {
        this.toastService.success('Score enregistré !');
        this.loadMatches(this.tournament!.id);
        this.closeScoreModal();
        this.submitting = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error submitting score', err);
        this.toastService.error(err.error?.message || 'Erreur lors de l\'enregistrement.');
        this.submitting = false;
        this.cd.detectChanges();
      }
    });
  }
}
