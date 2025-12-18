import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

interface Tournament {
  id: number;
  name: string;
  gameType: 'E-football' | 'FC Mobile' | 'Dream League' | 'Autre';
  organizer: {
    name: string;
    verified?: boolean;
  };
  startDate: string;
  entryFee: number;
  participants: {
    current: number;
    max: number;
  };
  prizePool: number;
  status: 'Inscriptions ouvertes' | 'En cours' | 'Terminé';
  image?: string;
  isFeatured?: boolean;
}

@Component({
  selector: 'app-tournaments',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent {
  selectedGame: string = 'Tous';
  selectedStatus: string = 'Tous';

  games = ['Tous', 'E-football', 'FC Mobile', 'Dream League'];
  statuses = ['Tous', 'Inscriptions ouvertes', 'En cours', 'Terminé'];

  tournaments: Tournament[] = [
    {
      id: 1,
      name: 'Championnat E-football Cameroun',
      gameType: 'E-football',
      organizer: { name: 'MLM Official', verified: true },
      startDate: '25 Déc 2024, 14:00',
      entryFee: 5,
      participants: { current: 16, max: 32 },
      prizePool: 160,
      status: 'Inscriptions ouvertes',
      isFeatured: true
    },
    {
      id: 2,
      name: 'Weekend Cup FC Mobile',
      gameType: 'FC Mobile',
      organizer: { name: 'ProGamer237' },
      startDate: '26 Déc 2024, 18:00',
      entryFee: 2,
      participants: { current: 5, max: 16 },
      prizePool: 30,
      status: 'Inscriptions ouvertes'
    },
    {
      id: 3,
      name: 'DLS League Pro',
      gameType: 'Dream League',
      organizer: { name: 'DLS Africa', verified: true },
      startDate: '20 Déc 2024, 20:00',
      entryFee: 10,
      participants: { current: 8, max: 8 },
      prizePool: 80,
      status: 'En cours'
    },
    {
      id: 4,
      name: 'Sunday Clash',
      gameType: 'E-football',
      organizer: { name: 'TournamentKing' },
      startDate: '24 Déc 2024, 15:00',
      entryFee: 3,
      participants: { current: 12, max: 16 },
      prizePool: 45,
      status: 'Inscriptions ouvertes'
    },
    {
      id: 5,
      name: 'Monthly Masters',
      gameType: 'FC Mobile',
      organizer: { name: 'MLM Official', verified: true },
      startDate: '01 Jan 2025, 12:00',
      entryFee: 20,
      participants: { current: 2, max: 64 },
      prizePool: 1200,
      status: 'Inscriptions ouvertes'
    }
  ];

  // Icons SVGs
  icons = {
    search: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    filter: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>',
    calendar: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>',
    users: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    trophy: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
    verified: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-blue-400"><path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.491 4.491 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" /></svg>',
    lightning: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>'
  };

  constructor(private sanitizer: DomSanitizer) {}

  sanitize(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  get filteredTournaments() {
    return this.tournaments.filter(t => {
      const matchGame = this.selectedGame === 'Tous' || t.gameType === this.selectedGame;
      const matchStatus = this.selectedStatus === 'Tous' || t.status === this.selectedStatus;
      return matchGame && matchStatus;
    });
  }

  getGameIcon(game: string): SafeHtml {
    // Return specific icons per game if needed, or generic
    return this.sanitize(this.icons.trophy); // Placeholder
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'Inscriptions ouvertes': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'En cours': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'Terminé': return 'bg-slate-700/50 text-slate-400 border-slate-600/50';
      default: return 'bg-slate-700/50 text-slate-400';
    }
  }

  getGameColor(game: string): string {
    switch(game) {
      case 'E-football': return 'text-blue-400';
      case 'FC Mobile': return 'text-cyan-400';
      case 'Dream League': return 'text-purple-400';
      default: return 'text-slate-400';
    }
  }
}
