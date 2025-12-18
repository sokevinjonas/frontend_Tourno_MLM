
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Tournament {
  id: string;
  name: string;
  game: 'E-football' | 'FC Mobile' | 'Dream League Soccer';
  organizer: string;
  organizerBadge?: 'certified' | 'premium';
  date: Date;
  fee: number; // in MLM
  participants: number;
  maxParticipants: number;
  prizePool: number; // in MLM
  status: 'Open' | 'Live' | 'Finished';
  image?: string;
}

@Component({
  selector: 'app-tournaments',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
  
  games = ['Tous', 'E-football', 'FC Mobile', 'Dream League Soccer'];
  statuses = ['Tous', 'Open', 'Live', 'Finished'];
  
  filters = {
    game: 'Tous',
    status: 'Tous',
    type: 'all' // all, free, paid
  };

  tournaments: Tournament[] = [
    {
      id: '1',
      name: 'Champions League Africa',
      game: 'E-football',
      organizer: 'TournoOfficial',
      organizerBadge: 'premium',
      date: new Date(new Date().getTime() + 86400000 * 2), // +2 days
      fee: 10,
      participants: 24,
      maxParticipants: 32,
      prizePool: 250,
      status: 'Open'
    },
    {
      id: '2',
      name: 'Sunday Clash',
      game: 'FC Mobile',
      organizer: 'KarimPro',
      organizerBadge: 'certified',
      date: new Date(new Date().getTime() + 3600000), // +1 hour
      fee: 5,
      participants: 16,
      maxParticipants: 16,
      prizePool: 70,
      status: 'Open'
    },
    {
      id: '3',
      name: 'DLS Rookie Cup',
      game: 'Dream League Soccer',
      organizer: 'NewbieGuild',
      date: new Date(new Date().getTime() - 86400000), // -1 day
      fee: 0,
      participants: 64,
      maxParticipants: 64,
      prizePool: 50,
      status: 'Live'
    },
    {
      id: '4',
      name: 'Elite Scrims #45',
      game: 'E-football',
      organizer: 'Eliteesport',
      organizerBadge: 'premium',
      date: new Date(new Date().getTime() - 86400000 * 5),
      fee: 20,
      participants: 128,
      maxParticipants: 128,
      prizePool: 2000,
      status: 'Finished'
    },
     {
      id: '5',
      name: 'Midnight Rumble',
      game: 'FC Mobile',
      organizer: 'NightOwl',
      date: new Date(new Date().getTime() + 86400000 * 1),
      fee: 2,
      participants: 8,
      maxParticipants: 16,
      prizePool: 30,
      status: 'Open'
    },
     {
      id: '6',
      name: 'Weekend Warrior',
      game: 'Dream League Soccer',
      organizer: 'TournoOfficial',
      organizerBadge: 'premium',
      date: new Date(new Date().getTime() + 86400000 * 7),
      fee: 0,
      participants: 145,
      maxParticipants: 200,
      prizePool: 100,
      status: 'Open'
    }
  ];

  filteredTournaments = signal<Tournament[]>([]);

  ngOnInit() {
    this.applyFilters();
  }

  applyFilters() {
    const result = this.tournaments.filter(t => {
      const matchGame = this.filters.game === 'Tous' || t.game === this.filters.game;
      const matchStatus = this.filters.status === 'Tous' || t.status === this.filters.status;
      
      let matchType = true;
      if (this.filters.type === 'free') matchType = t.fee === 0;
      if (this.filters.type === 'paid') matchType = t.fee > 0;

      return matchGame && matchStatus && matchType;
    });

    this.filteredTournaments.set(result);
  }

  getGameIcon(game: string): string {
    switch (game) {
      case 'E-football': return '⚽';
      case 'FC Mobile': return '📱';
      case 'Dream League Soccer': return '🥅';
      default: return '🎮';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Open': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'Live': return 'bg-red-500/20 text-red-400 border-red-500/50 animate-pulse';
      case 'Finished': return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
      default: return 'bg-blue-500/20 text-blue-400';
    }
  }

  getPercentage(current: number, max: number): number {
    return Math.min(100, (current / max) * 100);
  }
}
