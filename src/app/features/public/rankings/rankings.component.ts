
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LeaderboardService, LeaderboardEntry, PaginationInfo } from '../../../core/services/leaderboard.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-rankings',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css']
})
export class RankingsComponent implements OnInit {
  private leaderboardService = inject(LeaderboardService);
  private cd = inject(ChangeDetectorRef);
  private location = inject(Location);
  private sanitizer = inject(DomSanitizer);

  activeTab: string = 'global';
  leaderboard: LeaderboardEntry[] = [];
  pagination: PaginationInfo | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  tabs = [
    { id: 'global', label: 'Global', icon: '🌍' },
    { id: 'efootball', label: 'eFootball', icon: '⚽' },
    { id: 'fc_mobile', label: 'FC Mobile', icon: '🎮' },
    { id: 'dream_league_soccer', label: 'Dream League Soccer', icon: '�️' },
  ];

  icons = {
    back: '<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
    trophy: 'assets/icons/logo.png',
    search: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>'
  };

  ngOnInit() {
    this.fetchLeaderboard();
  }

  fetchLeaderboard(page: number = 1) {
    this.isLoading = true;
    this.error = null;
    this.cd.detectChanges();

    const request = this.activeTab === 'global'
      ? this.leaderboardService.getGlobalLeaderboard(page)
      : this.leaderboardService.getGameLeaderboard(this.activeTab, page);

    request.subscribe({
      next: (res) => {
        this.leaderboard = res.leaderboard;
        this.pagination = res.pagination;
        this.isLoading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching leaderboard', err);
        this.error = "Impossible de charger le classement. Veuillez réessayer.";
        this.isLoading = false;
        this.cd.detectChanges();
      }
    });
  }

  changeTab(tabId: string) {
    this.activeTab = tabId;
    this.fetchLeaderboard(1);
  }

  onPageChange(page: number) {
    if (this.pagination && page >= 1 && page <= this.pagination.last_page) {
      this.fetchLeaderboard(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  goBack() {
    this.location.back();
  }

  sanitize(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getRankClass(rank: number): string {
    if (rank === 1) return 'rank-gold';
    if (rank === 2) return 'rank-silver';
    if (rank === 3) return 'rank-bronze';
    return '';
  }

  getWinRateClass(rate: number): string {
    if (rate >= 70) return 'text-emerald-400';
    if (rate >= 50) return 'text-amber-400';
    return 'text-rose-400';
  }
}
