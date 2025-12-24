import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  imports: [CommonModule, RouterLink, TournamentStatusPipe, GameNamePipe, TournamentStatusClassPipe],
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.css']
})
export class TournamentDetailComponent implements OnInit {
  parseFloat = parseFloat;
  tournament: Tournament | null = null;
  matches: Match[] = [];
  loading = true;
  walletStats: OrganizerWalletStats | null = null;
  activeTab: 'overview' | 'participants' | 'matches' | 'settings' = 'overview';

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
        console.log(this.tournament);
        
        if (t.status !== 'open') {
          this.loadMatches(id);
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

  loadMatches(id: number) {
    this.matchService.getTournamentMatches(id).subscribe({
      next: (matches) => {
        this.matches = matches.data;
        console.log(this.matches);
        
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
    if (!this.tournament) return;
    if (confirm('Êtes-vous sûr de vouloir lancer le tournoi ? Cela générera les matches du Round 1.')) {
      this.tournamentService.startTournament(this.tournament.id).subscribe({
        next: () => {
          this.toastService.success('Tournoi lancé avec succès !');
          this.loadTournament(this.tournament!.id);
        },
        error: (err: any) => this.toastService.error(err.error?.message || 'Erreur lors du lancement.')
      });
    }
  }

  closeRegistrations() {
    if (!this.tournament) return;
    this.tournamentService.closeRegistrations(this.tournament.id).subscribe({
      next: () => {
        this.toastService.success('Inscriptions fermées.');
        this.loadTournament(this.tournament!.id);
        this.cd.detectChanges();
      },
      error: (err) => this.toastService.error(err.error?.message || 'Erreur.')
    });
  }

}
