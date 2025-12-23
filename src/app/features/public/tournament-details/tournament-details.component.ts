import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../../core/services/auth.service';
import { TournamentService, Tournament } from '../../../core/services/tournament.service';
import { ToastService } from '../../../core/services/toast.service';

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

@Component({
  selector: 'app-tournament-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TournamentStatusPipe, TournamentStatusClassPipe, GameNamePipe, GameColorPipe],
  templateUrl: './tournament-details.component.html',
  styleUrls: ['./tournament-details.component.css']
})
export class TournamentDetailsComponent implements OnInit {
  tournament: ParsedTournament | undefined;
  activeTab: string = 'info';
  
  private authService = inject(AuthService);
  private tournamentService = inject(TournamentService);
  private cd = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);
  private sanitizer = inject(DomSanitizer);
  private toastService = inject(ToastService);
  
  currentUser$ = this.authService.currentUser$;
  currentUser: User | null = null;

  showCompleteProfileModal = false;
  showPaymentModal = false;
  isLoading = true;
  isRegistering = false;
  isRegistered = false;
  selectedGameAccountId: number | null = null;
  error: string | null = null;

  tabs: Tab[] = [
    { id: 'info', label: 'Informations', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>' },
    { id: 'participants', label: 'Participants', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
    { id: 'bracket', label: 'Arbre', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>' }
  ];

  icons = {
    back: '<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
    verified: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-blue-400"><path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.491 4.491 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" /></svg>',
    lightning: '<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
    check: '<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    alert: '<svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>',
    bracket: '<svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>'
  };

  get remainingBalance(): number {
    if (!this.currentUser?.wallet || !this.tournament) return 0;
    const balance = Number(this.currentUser.wallet.balance) || 0;
    const fee = Number(this.tournament.entry_fee) || 0;
    return balance - fee;
  }

  get filteredGameAccounts(): any[] {
    if (!this.currentUser?.game_accounts || !this.tournament) {
      return [];
    }
    const targetGame = this.tournament.game?.toLowerCase().trim();
    return this.currentUser.game_accounts.filter(
      (acc: any) => {
        const accGame = (acc.game || acc.game_type)?.toLowerCase().trim();
        return accGame === targetGame;
      }
    );
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
       this.loadTournament(id);
    }

    // Keep currentUser updated
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.cd.markForCheck();
    });
  }

  loadTournament(id: number) {
      this.isLoading = true;
      this.tournamentService.getTournament(id).subscribe({
          next: (data) => {
              this.tournament = data;
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

                  this.tournament.rulesList = [
                      'Format Suisse : 5 rondes minimum',
                      'Victoire = 3 points, Nul = 1 point',
                      'Screenshot du score final obligatoire', 
                      'Fair-play exigé'
                  ];
                  this.tournament.roundsList = []; 
              }

              this.isLoading = false;
              this.cd.markForCheck();
              
              // If authenticated, check for registration
              if (this.authService.isAuthenticated()) {
                  this.tournamentService.checkRegistration(id).subscribe({
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

  goBack() {
    this.location.back();
  }

  onParticipate() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/tournaments/' + this.tournament?.id } });
      return;
    }
    
    const isProfileComplete = this.currentUser?.profile?.status === 'validated' || this.currentUser?.profile?.status === 'active';
    
    if (!isProfileComplete) {
      this.showCompleteProfileModal = true;
    } else {
      // Auto-select first matching account if available
      const accounts = this.filteredGameAccounts;
      if (accounts.length > 0) {
        this.selectedGameAccountId = accounts[0].id;
      } else {
        this.selectedGameAccountId = null;
      }
      this.showPaymentModal = true;
    }
  }

  closeModals() {
    this.showCompleteProfileModal = false;
    this.showPaymentModal = false;
  }

  confirmParticipation() {
    if (!this.tournament || !this.selectedGameAccountId) {
      if (!this.selectedGameAccountId) {
        this.toastService.error(`Vous devez sélectionner un compte pour ce tournoi.`);
      }
      return;
    }

    if (this.remainingBalance < 0) {
      this.toastService.error('Solde insuffisant.');
      return;
    }

    this.isRegistering = true;
    
    this.tournamentService.registerToTournament(this.tournament.id, this.selectedGameAccountId).subscribe({
      next: (res) => {
        this.toastService.success('Inscription réussie ! Bonne chance.');
        this.isRegistered = true;
        this.closeModals();
        this.loadTournament(this.tournament!.id);
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

  goToProfile() {
    this.router.navigate(['/profile/complete']);
  }
  

}
