
import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

interface Tab {
  id: string;
  label: string;
  icon: string;
}

interface User {
  id: number;
  name: string;
  avatar?: string;
  role: 'player' | 'admin' | 'moderator' | 'organizer';
  isProfileComplete: boolean;
  walletBalance: number;
}

interface Tournament {
  id: number;
  name: string;
  description: string;
  gameType: string;
  organizer: {
    name: string;
    verified: boolean;
  };
  startDate: string;
  entryFee: number;
  participants: {
    current: number;
    max: number;
    list: { name: string; avatar?: string; rank?: string }[];
  };
  prizePool: number;
  prizeDistribution: { 1: number; 2: number; 3: number };
  status: 'Inscriptions ouvertes' | 'En cours' | 'Terminé';
  rules: string[];
}

@Component({
  selector: 'app-tournament-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './tournament-details.component.html',
  styleUrls: ['./tournament-details.component.css'] // Optional if we just use Tailwind
})
export class TournamentDetailsComponent implements OnInit {
  tournament: Tournament | undefined;
  activeTab: string = 'info';
  user: User = {
    id: 99,
    name: 'JonasDev',
    role: 'player',
    isProfileComplete: false, // Set to false to test modal 1, true for modal 2
    walletBalance: 12.50
  };

  showCompleteProfileModal = false;
  showPaymentModal = false;

  tabs: Tab[] = [
    { id: 'info', label: 'Informations', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>' },
    { id: 'participants', label: 'Participants', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
    { id: 'bracket', label: 'Arbre', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>' }
  ];

  icons = {
    back: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
    verified: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-blue-400"><path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.491 4.491 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" /></svg>',
    lightning: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
    check: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    alert: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>',
    bracket: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>'
  };

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    // Mock data based on ID, usually fetch from service
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.tournament = {
      id: id,
      name: 'Championnat E-football Cameroun',
      description: 'Le plus grand tournoi E-football du mois. Affrontez les meilleurs joueurs du pays et tentez de remporter le cashprize exceptionnel. Format Suisse pour garantir un maximum de matchs à tous les participants.',
      gameType: 'E-football',
      organizer: { name: 'MLM Official', verified: true },
      startDate: '25 Déc 2024, 14:00',
      entryFee: 5,
      participants: {
        current: 16,
        max: 32,
        list: [
          { name: 'ProGamer237', rank: 'Gold' },
          { name: 'LionIndomptable', rank: 'Silver' },
          { name: 'DoualaKing', rank: 'Bronze' },
          // ... more
        ]
      },
      prizePool: 160,
      prizeDistribution: { 1: 80, 2: 50, 3: 30 },
      status: 'Inscriptions ouvertes',
      rules: [
        'Format Suisse : 5 rondes minimum',
        'Victoire = 3 points, Nul = 1 point',
        'Screenshot du score final obligatoire',
        'Fair-play exigé sous peine de disqualification',
        'Connexion stable requise'
      ]
    };
  }

  sanitize(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  goBack() {
    this.location.back();
  }

  onParticipate() {
    if (!this.user.isProfileComplete) {
      this.showCompleteProfileModal = true;
    } else {
      this.showPaymentModal = true;
    }
  }

  closeModals() {
    this.showCompleteProfileModal = false;
    this.showPaymentModal = false;
  }

  confirmParticipation() {
    // Implement payment logic here
    alert('Participation confirmée ! ' + this.tournament?.entryFee + ' pièces déduites.');
    this.closeModals();
    // Refresh data...
  }

  goToProfile() {
    this.router.navigate(['/profile/complete']);
  }

  
  // Helpers for template logic
  get remainingBalance() {
    if (!this.tournament) return 0;
    return this.user.walletBalance - this.tournament.entryFee;
  }
}
