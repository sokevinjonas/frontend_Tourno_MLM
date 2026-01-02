import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface LeaderboardUser {
  uuid: string;
  name: string;
  avatar_url: string;
}

export interface LeaderboardStats {
  global_rating?: number;
  rating_points?: number;
  tournaments_played: number;
  tournaments_won: number;
  win_rate: number;
  total_matches_played: number;
  total_matches_won: number;
  total_matches_lost?: number;
  total_matches_draw?: number;
  total_prize_money: number;
}

export interface LeaderboardEntry {
  rank: number;
  user: LeaderboardUser;
  stats: LeaderboardStats;
}

export interface PaginationInfo {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface LeaderboardResponse {
  game?: string;
  leaderboard: LeaderboardEntry[];
  pagination: PaginationInfo;
}

export interface UserStatsResponse {
  user: LeaderboardUser;
  global_stats: LeaderboardStats & { global_rank: number };
  stats_by_game: { [game: string]: LeaderboardStats & { rank: number } };
  recent_tournaments: any[];
}

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getGlobalLeaderboard(page: number = 1, perPage: number = 5): Observable<LeaderboardResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());
    
    return this.http.get<LeaderboardResponse>(`${this.apiUrl}/leaderboard/global`, { params });
  }

  getGameLeaderboard(game: string, page: number = 1, perPage: number = 5): Observable<LeaderboardResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());
    
    return this.http.get<LeaderboardResponse>(`${this.apiUrl}/leaderboard/by-game/${game}`, { params });
  }

  getUserStats(userUuid: string): Observable<UserStatsResponse> {
    return this.http.get<UserStatsResponse>(`${this.apiUrl}/users/${userUuid}/stats`);
  }

  getTournamentRankings(tournamentUuid: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tournaments/${tournamentUuid}/rankings`);
  }
}
