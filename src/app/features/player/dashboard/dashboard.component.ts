import { Component, OnInit, ChangeDetectorRef, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { PaymentService } from '../../../core/services/payment.service';
import { MatchService, Match } from '../../../core/services/match.service';
import { WalletStats, WalletStatisticsResponse } from '../../../core/models/payment.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private paymentService = inject(PaymentService);
  private matchService = inject(MatchService);
  private cd = inject(ChangeDetectorRef);

  userName = '';
  walletStats: WalletStats | null = null;
  recentMatches: Match[] = [];
  loading = true;
  loadingMatches = true;

  // Timer properties
  private timer: any;
  currentTime = new Date();

  isMyWinner(match: Match): boolean {
    const currentUserUuid = (this.authService.currentUserValue as any)?.uuid;
    return match.winner_uuid === currentUserUuid;
  }

  getScheduledDate(match: Match): string | null {
    return match.scheduled_at || match.round?.start_date || null;
  }

  getDeadlineDate(match: Match): Date | null {
    if (match.deadline_at) return new Date(match.deadline_at);
    if (match.round?.start_date && match.tournament?.match_deadline_minutes) {
      const date = new Date(match.round.start_date);
      date.setMinutes(date.getMinutes() + match.tournament.match_deadline_minutes);
      return date;
    }
    return null;
  }

  getCountdown(match: Match): string {
    const deadline = this.getDeadlineDate(match);
    if (!deadline) return '--:--';
    
    const diff = deadline.getTime() - this.currentTime.getTime();
    if (diff <= 0) return '00:00';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours > 0 ? hours + ':' : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  isExpired(match: Match): boolean {
    const deadline = this.getDeadlineDate(match);
    if (!deadline) return false;
    return deadline.getTime() <= this.currentTime.getTime();
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.userName = user?.name || '';
    });
    this.loadStats();
    this.loadRecentMatches();
    this.startTimer();
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

  loadStats() {
    this.loading = true;
    this.paymentService.getWalletStats().subscribe({
      next: (res: WalletStatisticsResponse) => {
        // Map the new nested response
        const { wallet, transactions, tournaments } = res;
        
        // Map to compatibility object for HTML
        this.walletStats = {
          balance: wallet.balance,
          blocked_balance: wallet.blocked_balance,
          available_balance: wallet.available_balance,
          tournament_stats: tournaments
        } as any;
        
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error loading player stats', err);
        this.loading = false;
        this.cd.detectChanges();
      }
    });
  }

  loadRecentMatches() {
    this.loadingMatches = true;
    this.matchService.getMyMatches().subscribe({
      next: (matches) => {
        // Get active matches first, sorted by deadline
        this.recentMatches = matches
          .filter(m => ['scheduled', 'in_progress', 'pending_validation'].includes(m.status))
          .sort((a, b) => {
            const dateA = new Date(a.deadline_at || a.round?.start_date || 0).getTime();
            const dateB = new Date(b.deadline_at || b.round?.start_date || 0).getTime();
            return dateA - dateB;
          })
          .slice(0, 3);
        
        this.loadingMatches = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error loading recent matches', err);
        this.loadingMatches = false;
        this.cd.detectChanges();
      }
    });
  }
}
