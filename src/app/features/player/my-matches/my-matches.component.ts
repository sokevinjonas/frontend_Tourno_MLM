import { Component, OnInit, ChangeDetectorRef, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatchService, Match } from '../../../core/services/match.service';
import { AuthService } from '../../../core/services/auth.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-matches',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './my-matches.component.html',
  styleUrl: './my-matches.component.css'
})
export class MyMatchesComponent implements OnInit, OnDestroy {
  private matchService = inject(MatchService);
  private authService = inject(AuthService);
  private cd = inject(ChangeDetectorRef);
  private sanitizer = inject(DomSanitizer);

  matches: Match[] = [];
  filteredMatches: Match[] = [];
  loading = true;
  activeTab: 'active' | 'completed' | 'expired' = 'active';

  // Timer properties
  private timer: any;
  currentTime = new Date();

  // Modal State
  selectedMatch: Match | null = null;
  showScoreModal = false;
  showSuccessModal = false;
  submittingScore = false;
  scoreForm = {
    own_score: 0,
    opponent_score: 0,
    comment: ''
  };
  selectedFile: File | null = null;
  filePreview: string | null = null;

  currentUser$ = this.authService.currentUser$;

  icons = {
    calendar: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>',
    clock: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    info: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>',
    trophy: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>'
  };

  ngOnInit() {
    this.loadMatches();
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

  loadMatches() {
    this.loading = true;
    this.matchService.getMyMatches().subscribe({
      next: (res) => {
        this.matches = res;
        this.filterMatches();
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error loading matches', err);
        this.loading = false;
        this.cd.detectChanges();
      }
    });
  }

  setTab(tab: 'active' | 'completed' | 'expired') {
    this.activeTab = tab;
    this.filterMatches();
  }

  filterMatches() {
    if (this.activeTab === 'active') {
      this.filteredMatches = this.matches.filter(m => 
        ['scheduled', 'in_progress', 'pending_validation'].includes(m.status)
      );
    } else if (this.activeTab === 'completed') {
      this.filteredMatches = this.matches.filter(m => m.status === 'completed');
    } else if (this.activeTab === 'expired') {
      this.filteredMatches = this.matches.filter(m => 
        ['expired', 'disputed'].includes(m.status)
      );
    }
  }

  sanitize(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'in_progress':
      case 'scheduled': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'pending_validation': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'completed': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'disputed': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'expired': return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'scheduled': return 'Programmé';
      case 'in_progress': return 'En cours';
      case 'pending_validation': return 'En attente';
      case 'completed': return 'Terminé';
      case 'disputed': return 'Disputé';
      case 'expired': return 'Expiré';
      default: return status;
    }
  }

  openScoreModal(match: Match) {
    this.selectedMatch = match;
    this.showScoreModal = true;
    this.scoreForm = { own_score: 0, opponent_score: 0, comment: '' };
    this.selectedFile = null;
    this.filePreview = null;
  }

  closeScoreModal() {
    this.showScoreModal = false;
    this.selectedMatch = null;
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.filePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  submitScore() {
    if (!this.selectedMatch || (!this.selectedFile && !this.filePreview)) {
      // Maybe add error toast if file is required
      return;
    }

    this.submittingScore = true;
    const formData = new FormData();
    formData.append('own_score', this.scoreForm.own_score.toString());
    formData.append('opponent_score', this.scoreForm.opponent_score.toString());
    if (this.selectedFile) {
      formData.append('screenshot', this.selectedFile);
    }
    if (this.scoreForm.comment) {
      formData.append('comment', this.scoreForm.comment);
    }

    this.matchService.reportResult(this.selectedMatch.id, formData).subscribe({
      next: () => {
        this.submittingScore = false;
        this.closeScoreModal();
        this.showSuccessModal = true;
        this.loadMatches();
        this.cd.markForCheck();
      },
      error: (err) => {
        console.error('Error submitting score', err);
        this.submittingScore = false;
        // Maybe add error toast
      }
    });
  }

  isMyWinner(match: Match): boolean {
    const currentUserId = (this.authService.currentUserValue as any)?.id;
    return match.winner_id === currentUserId;
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
}
