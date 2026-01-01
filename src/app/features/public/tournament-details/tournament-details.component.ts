import { Component, OnInit, inject, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../../core/services/auth.service';
import { TournamentService, Tournament } from '../../../core/services/tournament.service';
import { ToastService } from '../../../core/services/toast.service';
import { LeaderboardService } from '../../../core/services/leaderboard.service';

interface Tab {
  id: string;
  label: string;
  icon: string;
}

interface ParsedTournament extends Tournament {
  prizeDistributionObj?: any;
  rulesList?: string[];
  roundsList?: any[];
  participants?: {
    current: number;
    max: number;
    list: { name: string; email?: string; avatar?: string; rank?: string }[];
  };
  current_participants?: number; // Helper
}

import { TournamentStatusPipe } from '../../../shared/pipes/tournament-status.pipe';
import { TournamentStatusClassPipe } from '../../../shared/pipes/tournament-status-class.pipe';
import { GameNamePipe } from '../../../shared/pipes/game-name.pipe';
import { GameColorPipe } from '../../../shared/pipes/game-color.pipe';
import { OrganizerBadgeComponent } from '../../../shared/components/organizer-badge/organizer-badge.component';

@Component({
  selector: 'app-tournament-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TournamentStatusPipe, TournamentStatusClassPipe, GameNamePipe, GameColorPipe, OrganizerBadgeComponent],
  templateUrl: './tournament-details.component.html',
  styleUrls: ['./tournament-details.component.css']
})
export class TournamentDetailsComponent implements OnInit, OnDestroy {
  tournament: ParsedTournament | undefined;
  
  private authService = inject(AuthService);
  private tournamentService = inject(TournamentService);
  private cd = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);
  private sanitizer = inject(DomSanitizer);
  private toastService = inject(ToastService);
  
  // Timer properties for deadlines
  private timer: any;
  currentTime = new Date();
  
  currentUser$ = this.authService.currentUser$;
  currentUser: User | null = null;

  showCompleteProfileModal = false;
  showPaymentModal = false;
  isLoading = true;
  isRegistering = false;
  isRegistered = false;
  selectedGameAccountUuid: string | null = null;
  error: string | null = null;
  
  private leaderboardService = inject(LeaderboardService);
  tournamentRankings: any = null;
  loadingRankings = false;

  private _activeTab: string = 'info';
  get activeTab(): string { return this._activeTab; }
  set activeTab(value: string) {
    this._activeTab = value;
    if (value === 'rankings' && !this.tournamentRankings) {
      this.fetchTournamentRankings();
    }
  }

  tabs: Tab[] = [
    { id: 'info', label: 'Informations', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>' },
    { id: 'participants', label: 'Participants', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
    { id: 'bracket', label: 'Arbre', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4"/><polyline points="11 13 15 13 15 7 11 7"/><polyline points="15 7 20 7"/></svg>' },
    { id: 'rankings', label: 'Classement', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>' }
  ];

  icons = {
    back: '<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
    verified: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-blue-400"><path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.491 4.491 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" /></svg>',
    lightning: '<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
    check: '<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    alert: '<svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>',
    bracket: '<svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>'
  };

  get userBalance(): number {
    return Number(this.currentUser?.wallet?.balance) || 0;
  }

  get entryFee(): number {
    return Number(this.tournament?.entry_fee) || 0;
  }

  get remainingBalance(): number {
    return this.userBalance - this.entryFee;
  }

  get isRegistrationExpired(): boolean {
    if (!this.tournament?.start_date) return false;
    return new Date(this.tournament.start_date) < new Date();
  }

  get filteredGameAccounts(): any[] {
    if (!this.currentUser?.game_accounts || !this.tournament) {
      return [];
    }
    const targetGame = this.tournament.game?.toLowerCase().trim();
    return this.currentUser.game_accounts.filter(
      (acc: any) => {
        const accGame = (acc.game || acc.game)?.toLowerCase().trim();
        return accGame === targetGame;
      }
    );
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const uuid = params['uuid'];
      if (uuid) {
        this.loadTournament(uuid);
      }
    });

    this.startTimer();

    // Keep currentUser updated
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.cd.markForCheck();
    });
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private startTimer() {
    this.timer = setInterval(() => {
      this.currentTime = new Date();
      this.cd.markForCheck();
    }, 1000);
  }

  loadTournament(uuid: string) {
      this.isLoading = true;
      this.tournamentService.getTournament(uuid).subscribe({
          next: (data) => {
              this.tournament = data;
              console.log(this.tournament);
              
              if (this.tournament) {
                  const regs = (this.tournament as any).registrations || [];
                  this.tournament.participants = {
                      current: regs.length,
                      max: Number((this.tournament as any).max_participants) || 0,
                      list: regs.map((r: any) => ({
                          name: r.game_account?.game_username || 'Participant',
                          email: r.user?.email,
                      }))
                  };
                  this.tournament.current_participants = regs.length;

                  try {
                      if (typeof this.tournament.prize_distribution === 'string') {
                          this.tournament.prizeDistributionObj = JSON.parse(this.tournament.prize_distribution);
                      } else {
                          this.tournament.prizeDistributionObj = this.tournament.prize_distribution;
                      }
                  } catch (e) {
                      this.tournament.prizeDistributionObj = {};
                  }

                  // Parse real rules from tournament.rules
                  if (this.tournament && typeof this.tournament.rules === 'string') {
                    try {
                      const parsedRules = JSON.parse(this.tournament.rules);
                      if (Array.isArray(parsedRules)) {
                        this.tournament.rulesList = parsedRules;
                      } else {
                        this.tournament.rulesList = [this.tournament.rules];
                      }
                    } catch (e) {
                      this.tournament.rulesList = [this.tournament.rules];
                    }
                  } else if (this.tournament && Array.isArray(this.tournament.rules)) {
                    this.tournament.rulesList = this.tournament.rules;
                  } else {
                    this.tournament.rulesList = [];
                  }

                  // Map rounds and matches for the tree/bracket view
                  if (this.tournament.rounds) {
                      const regs = (this.tournament as any).registrations || [];
                      const playerMap: { [key: string]: string } = {};
                      
                      regs.forEach((r: any) => {
                          const uid = r.user_uuid || r.user?.uuid;
                          const name = r.user?.name;
                          const gameUser = r.game_account?.game_username || r.user?.name || 'Joueur';
                          
                          if (uid) playerMap[uid] = gameUser;
                          // Also map by registration uuid just in case
                          if (r.uuid) playerMap[r.uuid] = gameUser;
                          // Fallback to name-based mapping if IDs are inconsistent
                          if (name) playerMap[name] = gameUser;
                      });

                      this.tournament.rounds = [...this.tournament.rounds].sort((a: any, b: any) => a.round_number - b.round_number).map((r: any) => {
                          const roundMatches = r.matches || [];
                          return {
                              ...r,
                              name: `Ronde ${r.round_number}`,
                              matches: roundMatches.map((m: any) => {
                                  // Link players using various possible fields
                                  const p1id = m.player1_uuid || m.player1?.uuid;
                                  const p1name = m.player1?.name;
                                  const p2id = m.player2_uuid || m.player2?.uuid;
                                  const p2name = m.player2?.name;
                                  
                                  return {
                                      ...m,
                                      // Priority: Map match ID -> Map match Name -> Direct match game_username -> Direct match name
                                      p1: (p1id ? playerMap[p1id] : null) || (p1name ? playerMap[p1name] : null) || m.player1?.game_account?.game_username || m.player1?.name || 'TBD',
                                      p2: (p2id ? playerMap[p2id] : null) || (p2name ? playerMap[p2name] : null) || m.player2?.game_account?.game_username || m.player2?.name || 'TBD',
                                      s1: m.player1_score,
                                      s2: m.player2_score,
                                  };
                              })
                          };
                      });
                  }
              }

              this.isLoading = false;
              this.cd.markForCheck();
              
              // If authenticated, check for registration
              if (this.authService.isAuthenticated()) {
                  this.tournamentService.checkRegistration(uuid).subscribe({
                      next: (res) => {
                          this.isRegistered = res.is_registered;
                          this.cd.markForCheck();
                      }
                  });
              }
          },
          error: (err) => {
              console.error('Error loading tournament details', err);
              this.error = 'Impossible de charger les détails du tournoi.';
              this.isLoading = false;
              this.cd.markForCheck();
          }
      });
  }

  sanitize(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getDeadlineDate(match: any): Date | null {
    if (match.deadline_at) return new Date(match.deadline_at);
    if (match.scheduled_at && this.tournament?.match_deadline_minutes) {
      const date = new Date(match.scheduled_at);
      date.setMinutes(date.getMinutes() + this.tournament.match_deadline_minutes);
      return date;
    }
    return null;
  }

  isExpired(match: any): boolean {
    const deadline = this.getDeadlineDate(match);
    if (!deadline) return false;
    return deadline.getTime() <= this.currentTime.getTime();
  }

  getCountdown(match: any): string {
    const deadline = this.getDeadlineDate(match);
    if (!deadline) return '--:--';
    
    const diff = deadline.getTime() - this.currentTime.getTime();
    if (diff <= 0) return '00:00';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours > 0 ? hours + ':' : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  goBack() {
    this.location.back();
  }

  onParticipate() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/tournaments/' + this.tournament?.uuid } });
      return;
    }

    if (this.isRegistrationExpired) {
      this.toastService.error('Les inscriptions pour ce tournoi sont closes.');
      return;
    }
    
    const isProfileComplete = this.currentUser?.profile?.status === 'validated' || this.currentUser?.profile?.status === 'active';
    
    if (!isProfileComplete) {
      this.showCompleteProfileModal = true;
    } else {
      // Auto-select first matching account if available
      const accounts = this.filteredGameAccounts;
      if (accounts.length > 0) {
        this.selectedGameAccountUuid = accounts[0].uuid;
      } else {
        this.selectedGameAccountUuid = null;
      }
      this.showPaymentModal = true;
    }
  }

  closeModals() {
    this.showCompleteProfileModal = false;
    this.showPaymentModal = false;
  }

  confirmParticipation() {
    if (!this.tournament || !this.selectedGameAccountUuid) {
      if (!this.selectedGameAccountUuid) {
        this.toastService.error(`Vous devez sélectionner un compte pour ce tournoi.`);
      }
      return;
    }

    if (this.remainingBalance < 0) {
      this.toastService.error('Solde insuffisant.');
      return;
    }

    this.isRegistering = true;
    
    this.tournamentService.registerToTournament(this.tournament.uuid, this.selectedGameAccountUuid).subscribe({
      next: (res) => {
        this.toastService.success('Inscription réussie ! Bonne chance.');
        this.isRegistered = true;
        this.closeModals();
        this.loadTournament(this.tournament!.uuid);
        // Refresh user data (for balance)
        this.authService.getCurrentUser().subscribe();
        this.isRegistering = false;
      },
      error: (err) => {
        console.error('Registration API Error:', err);
        const errorMessage = err.error?.message || err.error?.error || 'Erreur lors de l\'inscription.';
        this.toastService.error(errorMessage);
        this.isRegistering = false;
      }
    });
  }

  fetchTournamentRankings() {
    if (!this.tournament) return;
    this.loadingRankings = true;
    this.leaderboardService.getTournamentRankings(this.tournament.uuid).subscribe({
      next: (res) => {
        this.tournamentRankings = res;
        this.loadingRankings = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching rankings', err);
        this.loadingRankings = false;
        this.cd.detectChanges();
      }
    });
  }

  goToProfile() {
    this.router.navigate(['/profile/complete']);
  }

  isArray(val: any): boolean {
    return Array.isArray(val);
  }
}
