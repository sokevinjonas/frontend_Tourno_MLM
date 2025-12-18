
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PlayerRank {
  rank: number;
  username: string;
  game: string;
  points: number;
  wins: number;
  trend: 'up' | 'down' | 'stable';
  avatar?: string;
}

interface HallOfFameEntry {
  season: string;
  division: string;
  winner: string;
  game: string;
}

@Component({
  selector: 'app-rankings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css']
})
export class RankingsComponent {

  topPlayers: PlayerRank[] = [
    { rank: 1, username: 'KingSlayer_99', game: 'E-football', points: 2450, wins: 142, trend: 'stable' },
    { rank: 2, username: 'AbdouPro', game: 'FC Mobile', points: 2310, wins: 128, trend: 'up' },
    { rank: 3, username: 'SniperElite', game: 'DLS', points: 2150, wins: 98, trend: 'down' },
    { rank: 4, username: 'GhostRider', game: 'E-football', points: 1980, wins: 85, trend: 'up' },
    { rank: 5, username: 'MomoGaming', game: 'FC Mobile', points: 1850, wins: 72, trend: 'stable' },
    { rank: 6, username: 'DriftKing', game: 'DLS', points: 1720, wins: 65, trend: 'up' },
    { rank: 7, username: 'ShadowNinja', game: 'E-football', points: 1650, wins: 58, trend: 'down' },
    { rank: 8, username: 'CaptainAfrica', game: 'FC Mobile', points: 1590, wins: 52, trend: 'stable' },
    { rank: 9, username: 'GoalMachine', game: 'DLS', points: 1540, wins: 48, trend: 'up' },
    { rank: 10, username: 'LuckyStrike', game: 'E-football', points: 1480, wins: 45, trend: 'down' }
  ];

  hallOfFame: HallOfFameEntry[] = [
    { season: 'Saison 2 (Oct-Déc 2024)', division: 'Division 1', winner: 'KingSlayer_99', game: 'E-football' },
    { season: 'Saison 2 (Oct-Déc 2024)', division: 'Division 1', winner: 'AbdouPro', game: 'FC Mobile' },
    { season: 'Saison 1 (Juil-Sept 2024)', division: 'Division 1', winner: 'OldSchool', game: 'E-football' },
    { season: 'Saison 1 (Juil-Sept 2024)', division: 'Division 1', winner: 'SpeedRacer', game: 'FC Mobile' }
  ];

  getGameIcon(game: string): string {
     if (game.includes('football')) return '⚽';
     if (game.includes('Mobile')) return '📱';
     if (game.includes('DLS')) return '🥅';
     return '🎮';
  }

  getRankStyle(rank: number): string {
    switch (rank) {
      case 1: return 'from-yellow-400 to-yellow-600 text-black';
      case 2: return 'from-gray-300 to-gray-500 text-black';
      case 3: return 'from-amber-600 to-amber-800 text-white';
      default: return 'bg-white/5 text-gray-300';
    }
  }
}
