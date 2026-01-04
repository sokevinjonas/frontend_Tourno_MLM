import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TournamentService, Tournament } from '../../../core/services/tournament.service';
import { MatchService, Match } from '../../../core/services/match.service';
import { PaymentService } from '../../../core/services/payment.service';
import { WalletStats, WalletStatisticsResponse } from '../../../core/models/payment.model';
import { ToastService } from '../../../core/services/toast.service';
import { TournamentStatusPipe } from '../../../shared/pipes/tournament-status.pipe';
import { GameNamePipe } from '../../../shared/pipes/game-name.pipe';
import { TournamentStatusClassPipe } from '../../../shared/pipes/tournament-status-class.pipe';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { MatchResult } from '../../../core/services/match.service';

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
  selectedRoundUuid: string | null = null;
  roundInfo: any = null;
  loading = true;
  submitting = false;
  walletStats: WalletStats | null = null;
  activeTab: 'overview' | 'participants' | 'matches' | 'settings' = 'overview';

   private sanitizer = inject(DomSanitizer);

  // Modal states
  showLaunchModal = false;
  showNextRoundModal = false;
  showCloseRegistrationsModal = false;
  showCompleteModal = false;
  showScoreModal = false;
  showProofsModal = false;
  showImageModal = false;
  selectedMatch: Match | null = null;
  score1: number | null = null;
  score2: number | null = null;
  isUpdatingScore = false;
  previewImageUrl: string | null = null;

   icons = {
    back: '<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
    verified: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-blue-400"><path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.491 4.491 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" /></svg>',
    lightning: '<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
    check: '<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    alert: '<svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>',
    bracket: '<svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>'
  };
  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService,
    private matchService: MatchService,
    private paymentService: PaymentService,
    private toastService: ToastService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const uuid = this.route.snapshot.paramMap.get('uuid');
    if (uuid) {
      this.loadTournament(uuid);
    }
  }

  loadTournament(uuid: string) {
    this.loading = true;
    this.tournamentService.getTournament(uuid).subscribe({
      next: (t) => {
        this.tournament = t;
        
        // Parse rules if it's a JSON string
        if (this.tournament && typeof this.tournament.rules === 'string') {
          try {
            const parsedRules = JSON.parse(this.tournament.rules);
            if (Array.isArray(parsedRules)) {
              this.tournament.rules = parsedRules;
            }
          } catch (e) {
            // Keep as string if not valid JSON
          }
        }

        console.log('Tournament data:', this.tournament);
        
          // Handle rounds
          this.rounds = (t as any).rounds || [];
          if (this.rounds.length > 0) {
            // Select either current_round or the first round
            const currentRoundNum = (t as any).current_round || 1;
            const currentRound = this.rounds.find(r => r.round_number === currentRoundNum) || this.rounds[0];
            this.selectedRoundUuid = currentRound.uuid;
          }

          if (t.status !== 'open') {
            this.loadMatches(uuid);
            this.loadRoundsInfo(uuid);
          }
        this.loadOrganizerStats();
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

  loadRoundsInfo(uuid: string) {
     this.tournamentService.getRoundsInfo(uuid).subscribe({
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
     this.tournamentService.nextRound(this.tournament.uuid).subscribe({
        next: (res) => {
           this.toastService.success('Round suivant généré avec succès !');
           this.loadTournament(this.tournament!.uuid);
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
    if (!this.selectedRoundUuid) return this.matches;
    return this.matches.filter(m => {
      const matchRoundUuid = (m as any).round_uuid || (m as any).round?.uuid;
      return matchRoundUuid === this.selectedRoundUuid;
    });
  }

  selectRound(roundUuid: string) {
    this.selectedRoundUuid = roundUuid;
    this.cd.detectChanges();
  }

  loadMatches(uuid: string) {
    this.matchService.getTournamentMatches(uuid).subscribe({
      next: (matches) => {
        this.matches = matches.data;
        console.log('Matches:', this.matches);
        this.cd.detectChanges();
      }
    });
  }

  loadOrganizerStats() {
    this.paymentService.getWalletStats().subscribe({
      next: (res: WalletStatisticsResponse) => {
        const { wallet, tournaments } = res;
        this.walletStats = {
          balance: wallet.balance,
          blocked_balance: wallet.blocked_balance,
          available_balance: wallet.available_balance,
          tournament_stats: tournaments
        } as any;
        this.cd.detectChanges();
      },
      error: (err) => console.error('Error loading stats', err)
    });
  }

  publishTournament() {
    if (!this.tournament) return;
    this.submitting = true;
    this.tournamentService.changeStatus(this.tournament.uuid, 'open').subscribe({
      next: () => {
        this.toastService.success('Tournoi publié avec succès !');
        this.loadTournament(this.tournament!.uuid);
        this.submitting = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.toastService.error(err.error?.message || 'Erreur lors de la publication.');
        this.submitting = false;
        this.cd.detectChanges();
      }
    });
  }

  launchTournament() {
    this.showLaunchModal = true;
  }

  confirmLaunchTournament() {
    if (!this.tournament) return;
    this.submitting = true;
    this.tournamentService.startTournament(this.tournament.uuid).subscribe({
      next: () => {
        this.toastService.success('Tournoi lancé avec succès !');
        this.loadTournament(this.tournament!.uuid);
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
    this.tournamentService.closeRegistrations(this.tournament.uuid).subscribe({
      next: () => {
        this.toastService.success('Inscriptions fermées.');
        this.loadTournament(this.tournament!.uuid);
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
    this.isUpdatingScore = match.status === 'completed';
    this.showScoreModal = true;
  }

  closeScoreModal() {
    this.showScoreModal = false;
    this.selectedMatch = null;
    this.score1 = null;
    this.score2 = null;
    this.isUpdatingScore = false;
  }

  submitScore() {
    if (!this.selectedMatch || this.score1 === null || this.score2 === null) return;
    
    this.submitting = true;
    const scoreData = {
      player1_score: this.score1,
      player2_score: this.score2
    };

    const action = this.isUpdatingScore 
      ? this.matchService.updateMatchScore(this.selectedMatch.uuid, scoreData)
      : this.matchService.enterScore(this.selectedMatch.uuid, scoreData);

    action.subscribe({
      next: () => {
        this.toastService.success(this.isUpdatingScore ? 'Score mis à jour !' : 'Score enregistré !');
        this.loadMatches(this.tournament!.uuid);
        if (this.isUpdatingScore) {
          this.loadTournament(this.tournament!.uuid); // Refresh tournament/standings on update
        }
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

  completeTournament() {
    this.showCompleteModal = true;
  }

  confirmCompleteTournament() {
    if (!this.tournament) return;
    this.submitting = true;
    this.tournamentService.completeTournament(this.tournament.uuid).subscribe({
      next: () => {
        this.toastService.success('Tournoi finalisé ! Les récompenses ont été distribuées.');
        this.loadTournament(this.tournament!.uuid);
        this.showCompleteModal = false;
        this.submitting = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.toastService.error(err.error?.message || 'Erreur lors de la clôture.');
        this.showCompleteModal = false;
        this.submitting = false;
        this.cd.detectChanges();
      }
    });
  }
   sanitize(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  isArray(val: any): boolean {
    return Array.isArray(val);
  }

  // Proofs Modal Methods
  openProofsModal(match: Match) {
    this.selectedMatch = match;
    this.showProofsModal = true;
    
    // Fetch full match details to get match_results
    this.matchService.getMatch(match.uuid).subscribe({
      next: (fullMatch) => {
        console.log('Full match data loaded:', fullMatch);
        if (this.selectedMatch && this.selectedMatch.uuid === fullMatch.uuid) {
          this.selectedMatch = { ...this.selectedMatch, ...fullMatch };
          this.cd.detectChanges();
        }
      },
      error: (err) => {
        console.error('Error fetching match details:', err);
      }
    });
  }

  closeProofsModal() {
    this.showProofsModal = false;
    this.selectedMatch = null;
  }

  openImagePreview(url: string | null) {
    if (!url) return;
    this.previewImageUrl = url;
    this.showImageModal = true;
  }

  closeImagePreview() {
    this.showImageModal = false;
    this.previewImageUrl = null;
  }

  getImageUrl(path: string | null): string | null {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    if (path.startsWith('data:')) return path;
    
    // Remove 'public/' prefix if present
    let cleanPath = path;
    if (path.startsWith('public/')) {
      cleanPath = path.substring(7);
    }
    
    const baseUrl = environment.storageUrl;
    const finalPath = cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;
    const url = `${baseUrl}/${finalPath}`;
    console.log('Generated Image URL:', url);
    return url;
  }

  getSubmission(match: Match, forPlayerUuid: string | null): MatchResult | null {
    if (!match.match_results || !forPlayerUuid) return null;
    
    // Try primary identifying field
    let sub = match.match_results.find((r: any) => 
      (r.submitted_by_uuid === forPlayerUuid) || 
      (r.user_uuid === forPlayerUuid) || 
      (r.player_uuid === forPlayerUuid)
    );

    // Fallback: If only 2 results and indices match players (standard behavior)
    if (!sub && match.match_results.length === 2) {
      const p1Uuid = match.player1_uuid || match.player1?.uuid;
      const p2Uuid = match.player2_uuid || match.player2?.uuid;
      
      if (forPlayerUuid === p1Uuid) return match.match_results[0];
      if (forPlayerUuid === p2Uuid) return match.match_results[1];
    }

    return sub || null;
  }

  getP1Submission(match: Match): any {
    return this.getSubmission(match, match.player1_uuid || match.player1?.uuid || null);
  }

  getP2Submission(match: Match): any {
    return this.getSubmission(match, match.player2_uuid || match.player2?.uuid || null);
  }
}
