import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TournamentService, Tournament } from '../../../core/services/tournament.service';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  tournaments: Tournament[] = [];
  loading = true;
  summary = {
    totalRevenue: 0,
    totalParticipants: 0,
    completionRate: 0,
    avgParticipants: 0
  };

  constructor(private tournamentService: TournamentService) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.loading = true;
    this.tournamentService.getMyTournaments().subscribe({
      next: (tournaments) => {
        this.tournaments = tournaments || [];
        this.calculateDetailedStats();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching stats', err);
        this.loading = false;
      }
    });
  }

  calculateDetailedStats() {
    if (this.tournaments.length === 0) return;

    const total = this.tournaments.length;
    const completed = this.tournaments.filter(t => t.status === 'completed').length;
    
    this.summary.totalParticipants = this.tournaments.reduce((acc, t) => acc + (t.current_participants || 0), 0);
    this.summary.avgParticipants = Math.round(this.summary.totalParticipants / total);
    this.summary.completionRate = Math.round((completed / total) * 100);
    
    this.summary.totalRevenue = this.tournaments.reduce((acc, t) => {
      const fee = parseFloat(t.entry_fee) || 0;
      return acc + (fee * (t.current_participants || 0));
    }, 0);
  }

  getGameDistribution() {
    const dist: { [key: string]: number } = {};
    this.tournaments.forEach(t => {
      dist[t.game_type] = (dist[t.game_type] || 0) + 1;
    });
    return Object.entries(dist).map(([game_type, count]) => ({
      game: game_type,
      count,
      percentage: Math.round((count / this.tournaments.length) * 100)
    }));
  }
}
