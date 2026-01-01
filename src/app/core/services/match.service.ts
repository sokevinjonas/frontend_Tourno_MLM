import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PaginatedResponse } from '../models/user.model';

export interface Match {
  uuid: string;
  tournament_uuid: string;
  round_number: number;
  player1_uuid: string | null;
  player2_uuid: string | null;
  player1_score: number | null;
  player2_score: number | null;
  winner_uuid: string | null;
  status: 'scheduled' | 'in_progress' | 'pending_validation' | 'completed' | 'disputed' | 'expired';
  scheduled_at: string | null;
  deadline_at: string | null;
  player1?: { uuid: string; name: string };
  player2?: { uuid: string; name: string };
  round?: {
    start_date: string;
    end_date: string | null;
    round_number: number;
    status: string;
  };
  tournament?: {
    name: string;
    match_deadline_minutes: number;
    status: string;
  };
  match_results?: MatchResult[];
}

export interface MatchResult {
  uuid: string;
  match_uuid: string;
  submitted_by_uuid: string;
  own_score: number;
  opponent_score: number;
  screenshot_path: string;
  comment: string | null;
  status: 'pending' | 'validated' | 'rejected';
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private apiUrl = `${environment.apiUrl}/matches`;

  constructor(private http: HttpClient) {}

  getTournamentMatches(tournamentUuid: string): Observable<PaginatedResponse<Match>> {
    return this.http.get<PaginatedResponse<Match>>(`${environment.apiUrl}/tournaments/${tournamentUuid}/matches`);
  }

  enterScore(matchUuid: string, score: { player1_score: number, player2_score: number }): Observable<Match> {
    return this.http.post<Match>(`${this.apiUrl}/${matchUuid}/enter-score`, score);
  }

  reportResult(matchUuid: string, data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/${matchUuid}/submit-result`, data);
  }

  confirmResult(matchUuid: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${matchUuid}/confirm`, {});
  }

  getMyMatches(): Observable<Match[]> {
    return this.http.get<any>(`${this.apiUrl}/my/matches`).pipe(
      map(res => res.matches || res)
    );
  }

  getPendingMatches(): Observable<Match[]> {
    return this.http.get<any>(`${this.apiUrl}/my/pending`).pipe(
      map(res => res.matches || res)
    );
  }
}
