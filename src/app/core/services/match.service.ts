import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PaginatedResponse } from '../models/user.model';

export interface Match {
  id: number;
  tournament_id: number;
  round_number: number;
  player1_id: number | null;
  player2_id: number | null;
  player1_score: number | null;
  player2_score: number | null;
  winner_id: number | null;
  status: 'scheduled' | 'in_progress' | 'pending_validation' | 'completed' | 'disputed' | 'expired';
  scheduled_at: string;
  deadline_at: string;
  player1?: { id: number; name: string };
  player2?: { id: number; name: string };
}

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private apiUrl = `${environment.apiUrl}/matches`;

  constructor(private http: HttpClient) {}

  getTournamentMatches(tournamentId: number): Observable<PaginatedResponse<Match>> {
    return this.http.get<PaginatedResponse<Match>>(`${environment.apiUrl}/tournaments/${tournamentId}/matches`);
  }

  enterScore(matchId: number, score: { player1_score: number, player2_score: number }): Observable<Match> {
    return this.http.post<Match>(`${this.apiUrl}/${matchId}/enter-score`, score);
  }

  reportResult(matchId: number, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${matchId}/report`, data);
  }

  confirmResult(matchId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${matchId}/confirm`, {});
  }

  getMyMatches(): Observable<Match[]> {
    return this.http.get<any>(`${this.apiUrl}/my/matches`).pipe(
      map(res => res.matches || res)
    );
  }
}
