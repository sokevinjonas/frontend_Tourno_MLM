import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ModeratorService } from '../../../core/services/moderator.service';
import { ToastService } from '../../../core/services/toast.service';
import { FormsModule } from '@angular/forms';
import { Match } from '../../../core/services/match.service';

@Component({
  selector: 'app-complaint-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './complaint-detail.component.html'
})
export class ComplaintDetailComponent implements OnInit {
  match: Match | null = null;
  loading = true;
  submitting = false;

  showResolveModal = false;
  showImageModal = false;
  selectedImageUrl = '';
  
  resolveForm = {
    winner_uuid: '',
    player1_score: 0,
    player2_score: 0
  };

  private cd = inject(ChangeDetectorRef);
  constructor(
    private route: ActivatedRoute,
    private moderatorService: ModeratorService,
    private toastService: ToastService
  ) {}

  getScreenshotUrl(path: string): string {
    const baseUrl = 'http://localhost:8000/storage';
    return `${baseUrl}/${path}`;
  }

  openImageModal(url: string) {
    this.selectedImageUrl = url;
    this.showImageModal = true;
  }

  closeImageModal() {
    this.showImageModal = false;
    this.selectedImageUrl = '';
  }

  ngOnInit() {
    const uuid = this.route.snapshot.paramMap.get('id');
    if (uuid) {
      this.loadMatch(uuid);
    }
  }

  loadMatch(uuid: string) {
    this.loading = true;
    this.moderatorService.getMatchByUuid(uuid).subscribe({
      next: (match: Match) => {
        console.log('Match fetched:', match);
        this.match = match;
        this.loading = false;
        this.cd.markForCheck();
      },
      error: (err) => {
        console.error('Error loading match detail', err);
        this.toastService.error('Erreur lors du chargement des détails du match.');
        this.loading = false;
        this.cd.markForCheck();
      }
    });
  }

  openResolveModal() {
    if (!this.match) return;
    this.resolveForm = {
      winner_uuid: this.match.winner_uuid || '',
      player1_score: this.match.player1_score || 0,
      player2_score: this.match.player2_score || 0
    };
    this.showResolveModal = true;
  }

  closeResolveModal() {
    this.showResolveModal = false;
  }

  confirmResolve() {
    if (!this.match) return;
    this.submitting = true;

    this.moderatorService.validateMatchResult(this.match.uuid, this.resolveForm).subscribe({
      next: () => {
        this.toastService.success('Litige résolu avec succès.');
        this.loadMatch(this.match!.uuid);
        this.submitting = false;
        this.closeResolveModal();
      },
      error: (err) => {
        console.error('Error resolving dispute', err);
        this.toastService.error('Erreur lors de la résolution.');
        this.submitting = false;
        this.cd.markForCheck();
      }
    });
  }
}
