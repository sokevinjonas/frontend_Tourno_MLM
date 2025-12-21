import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Match {
  id: number;
  tournament_id: number;
  player1_id: number;
  player2_id: number;
  player1_score?: number;
  player2_score?: number;
  status: 'pending' | 'ongoing' | 'completed' | 'reported' | 'disputed';
  round: number;
  table_number?: number;
  player1?: any;
  player2?: any;
}

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private apiUrl = `${environment.apiUrl}/matches`;

  constructor(private http: HttpClient) {}

  getTournamentMatches(tournamentId: number): Observable<Match[]> {
    return this.http.get<Match[]>(`${environment.apiUrl}/tournaments/${tournamentId}/matches`);
  }

  updateScore(matchId: number, score: { player1_score: number, player2_score: number }): Observable<Match> {
    return this.http.patch<Match>(`${this.apiUrl}/${matchId}/score`, score);
  }

  reportResult(matchId: number, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${matchId}/report`, data);
  }

  confirmResult(matchId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${matchId}/confirm`, {});
  }
}
