import { Component, OnInit, ChangeDetectorRef, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatchService, Match, MatchResult } from '../../../core/services/match.service';
import { AuthService } from '../../../core/services/auth.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';

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
  showImageModal = false;
  showProofsModal = false;
  previewImageUrl: string | null = null;
  submittingScore = false;
  isUpdating = false;
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
    trophy: 'assets/icons/logo.png'
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

  loadMatches(statuses?: string[]) {
    this.loading = true;
    this.matchService.getPendingMatches(statuses).subscribe({
      next: (res) => {
        this.matches = res;
        this.filteredMatches = res; // No further local filtering needed
        this.loading = false;
        this.cd.markForCheck();
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
    let statuses: string[] = [];
    
    if (tab === 'active') {
      statuses = ['scheduled', 'in_progress', 'pending_validation'];
    } else if (tab === 'completed') {
      statuses = ['completed'];
    } else if (tab === 'expired') {
      statuses = ['expired', 'disputed'];
    }
    
    this.loadMatches(statuses);
  }

  filterMatches() {
    // This method is now replaced by backend filtering in setTab/loadMatches
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
    
    const ownSub = this.getOwnSubmission(match);
    this.isUpdating = !!ownSub;
    
    if (ownSub) {
      this.scoreForm = { 
        own_score: ownSub.own_score, 
        opponent_score: ownSub.opponent_score, 
        comment: ownSub.comment || '' 
      };
      // We don't prepopulate the file for security reasons, user can upload a new one if they want to change
    } else {
      this.scoreForm = { own_score: 0, opponent_score: 0, comment: '' };
    }
    
    this.selectedFile = null;
    this.filePreview = null;
  }

  getImageUrl(path: string | null): string | null {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    if (path.startsWith('data:')) return path;
    return `${environment.storageUrl}/${path}`;
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

  closeScoreModal() {
    this.showScoreModal = false;
    this.selectedMatch = null;
  }

  openProofsModal(match: Match) {
    this.selectedMatch = match;
    this.showProofsModal = true;
  }

  closeProofsModal() {
    this.showProofsModal = false;
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
    // Screenshot is mandatory for initial submission, but optional for updates
    if (!this.selectedMatch || (!this.isUpdating && !this.selectedFile)) {
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

    this.matchService.reportResult(this.selectedMatch.uuid, formData).subscribe({
      next: (res) => {
        this.submittingScore = false;
        
        // Manually update the local match object's results for instant feedback
        if (this.selectedMatch) {
          if (!this.selectedMatch.match_results) this.selectedMatch.match_results = [];
          
          const userUuid = this.authService.currentUserValue?.uuid;
          const oldSub = this.getOwnSubmission(this.selectedMatch);
          
          if (userUuid) {
             const newResult: MatchResult = {
                uuid: res?.uuid || oldSub?.uuid || 'temp-' + Date.now(),
                match_uuid: this.selectedMatch.uuid,
                submitted_by_uuid: userUuid,
                own_score: this.scoreForm.own_score,
                opponent_score: this.scoreForm.opponent_score,
                screenshot_path: this.filePreview || oldSub?.screenshot_path || '',
                comment: this.scoreForm.comment || null,
                status: 'pending',
                created_at: oldSub?.created_at || new Date().toISOString(),
                updated_at: new Date().toISOString()
             };
             
             // Update match status to pending_validation locally
             this.selectedMatch.status = 'pending_validation';
             
             // Remove existing own submission if any
             this.selectedMatch.match_results = [
                ...this.selectedMatch.match_results.filter((r: MatchResult) => r.submitted_by_uuid !== userUuid),
                newResult
             ];
          }
        }

        this.closeScoreModal();
        this.showSuccessModal = true;
        
        // Refresh full list after a tiny delay to ensure backend consistency
        setTimeout(() => {
          this.loadMatches();
        }, 500);
        
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

  getSubmission(match: Match, forPlayerUuid: string | null): MatchResult | null {
    if (!match.match_results || !forPlayerUuid) return null;
    
    // Try primary identifying field
    let sub = match.match_results.find((r: any) => 
      (r.submitted_by_uuid === forPlayerUuid) || 
      (r.user_uuid === forPlayerUuid) || 
      (r.player_uuid === forPlayerUuid) ||
      (r.submitter?.uuid === forPlayerUuid)
    );

    // Fallback: If only 2 results and indices match players (standard behavior)
    if (!sub && match.match_results.length === 2) {
      const isPlayer1 = match.player1_uuid === forPlayerUuid || match.player1?.uuid === forPlayerUuid;
      const isPlayer2 = match.player2_uuid === forPlayerUuid || match.player2?.uuid === forPlayerUuid;
      
      if (isPlayer1) return match.match_results[0];
      if (isPlayer2) return match.match_results[1];
    }

    return sub || null;
  }

  getOwnSubmission(match: Match): any {
    const userUuid = this.authService.currentUserValue?.uuid;
    return this.getSubmission(match, userUuid || null);
  }

  getOpponentSubmission(match: Match): any {
    const userUuid = this.authService.currentUserValue?.uuid;
    const opponent = this.getOpponent(match);
    return this.getSubmission(match, opponent?.uuid || null);
  }

  getMeScore(match: Match): number | null {
    const userUuid = this.authService.currentUserValue?.uuid;
    const p1Uuid = (match as any).player1_uuid || match.player1?.uuid;
    const p2Uuid = (match as any).player2_uuid || match.player2?.uuid;
    
    if (p1Uuid === userUuid) return match.player1_score;
    if (p2Uuid === userUuid) return match.player2_score;
    return null;
  }

  getOpponentScore(match: Match): number | null {
    const userUuid = this.authService.currentUserValue?.uuid;
    const p1Uuid = (match as any).player1_uuid || match.player1?.uuid;
    const p2Uuid = (match as any).player2_uuid || match.player2?.uuid;
    
    if (p1Uuid === userUuid) return match.player2_score;
    if (p2Uuid === userUuid) return match.player1_score;
    return null;
  }

  getOpponent(match: Match): any {
    const userUuid = this.authService.currentUserValue?.uuid;
    const p1Uuid = (match as any).player1_uuid || match.player1?.uuid;
    const p2Uuid = (match as any).player2_uuid || match.player2?.uuid;
    
    if (p1Uuid === userUuid) return match.player2;
    if (p2Uuid === userUuid) return match.player1;
    
    // Safety fallback
    return match.player2;
  }

  getMe(match: Match): any {
    const userUuid = this.authService.currentUserValue?.uuid;
    const p1Uuid = (match as any).player1_uuid || match.player1?.uuid;
    const p2Uuid = (match as any).player2_uuid || match.player2?.uuid;
    
    if (p1Uuid === userUuid) return match.player1;
    if (p2Uuid === userUuid) return match.player2;
    
    // Safety fallback
    return match.player1;
  }

  getWhatsAppLink(player: any): string | null {
    const phone = player?.profile?.whatsapp_number || player?.whatsapp_number;
    if (!phone) return null;
    // Remove non-numeric characters
    const cleanPhone = phone.replace(/\D/g, '');
    return `https://wa.me/${cleanPhone}`;
  }
}
