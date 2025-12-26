import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { TournamentService, Tournament } from '../../../core/services/tournament.service';
import { PaymentService } from '../../../core/services/payment.service';
import { WalletStats, WalletStatisticsResponse } from '../../../core/models/payment.model';
import { TournamentStatusPipe } from '../../../shared/pipes/tournament-status.pipe';
import { GameNamePipe } from '../../../shared/pipes/game-name.pipe';
import { TournamentStatusClassPipe } from '../../../shared/pipes/tournament-status-class.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, TournamentStatusPipe, GameNamePipe, TournamentStatusClassPipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName = '';
  tournaments: Tournament[] = [];
  loading = true;
  stats = {
    total: 0,
    active: 0,
    participants: 0,
    prizePool: 0,
    totalProfit: 0,
    totalPaidOut: 0,
    totalCollected: 0,
    totalAvailableForWithdrawal: 0
  };
  walletStats: WalletStats | null = null;

  constructor(
    private authService: AuthService,
    private tournamentService: TournamentService,
    private paymentService: PaymentService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.userName = user?.name || '';
    });
    this.loadDashboardData();
    this.loadWalletStats();
  }

  loadDashboardData() {
    this.loading = true;
    this.tournamentService.getMyTournaments().subscribe({
      next: (res) => {
        // Robust mapping of data from different possible API structures
        const data = res;
        
        this.tournaments = data.map((t: any) => ({
          ...t,
          // Calculate participants from registrations if field is missing
          current_participants: t.registrations ? t.registrations.length : (t.current_participants || 0)
        }));
        
        console.log('Dashboard tournaments mapped:', this.tournaments);
        
        try {
          this.calculateStats();
        } catch (error) {
          console.error('Error calculating dashboard stats:', error);
        }
        
        this.loading = false;
        this.cd.detectChanges(); // Force UI update even on hard refresh
      },
      error: (err) => {
        console.error('Error loading dashboard data', err);
        this.loading = false;
        this.tournaments = [];
        this.cd.detectChanges();
      }
    });
  }

  loadWalletStats() {
    this.paymentService.getWalletStats().subscribe({
      next: (res: WalletStatisticsResponse) => {
        this.walletStats = res.statistics;
        console.log('Wallet stats:', this.walletStats);
        
        // Sync tournament stats provided by backend
        if (this.walletStats.tournament_stats) {
          this.stats.totalProfit = this.walletStats.tournament_stats.total_profit || 0;
          this.stats.totalPaidOut = this.walletStats.tournament_stats.total_paid_out || 0;
          this.stats.totalCollected = this.walletStats.tournament_stats.total_collected || 0;
          this.stats.active = this.walletStats.tournament_stats.active_tournaments || this.stats.active;
          this.stats.totalAvailableForWithdrawal = this.walletStats.tournament_stats.available_for_withdrawal || 0;
          
          // Use more accurate wallet fields if available
          if (this.walletStats.tournament_stats.currently_blocked !== undefined) {
            this.walletStats.blocked_balance = this.walletStats.tournament_stats.currently_blocked;
          }
        }
        
        this.cd.detectChanges();
      },
      error: (err: any) => {
        console.error('Error loading organizer wallet stats', err);
      }
    });
  }

  calculateStats() {
    if (!this.tournaments || !Array.isArray(this.tournaments)) {
      this.resetStats();
      return;
    }

    this.stats.total = this.tournaments.length;
    // Local calculation as fallback or secondary check
    const activeLocal = this.tournaments.filter(t => 
      t && ['open', 'in_progress'].includes(t.status)
    ).length;
    
    if (this.stats.active === 0) this.stats.active = activeLocal;

    this.stats.participants = this.tournaments.reduce((acc, t) => 
      acc + (t.current_participants || 0), 0
    );
    
    this.stats.prizePool = this.tournaments.reduce((acc, t) => {
      const fee = typeof t.entry_fee === 'string' ? parseFloat(t.entry_fee) : (t.entry_fee || 0);
      const participants = t.current_participants || 0;
      return acc + (fee * participants);
    }, 0);
  }

  private resetStats() {
    this.stats = { 
      total: 0, 
      active: 0, 
      participants: 0, 
      prizePool: 0,
      totalProfit: 0,
      totalPaidOut: 0,
      totalCollected: 0,
      totalAvailableForWithdrawal: 0
    };
  }

}
