import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface Tournament {
  id: number;
  name: string;
  description?: string; // Content for "A propos"
  game: 'efootball' | 'fc_mobile' | 'dream_league_soccer' | 'other';
  organizer: {
    id: number;
    name: string;
    email: string;
    verified?: boolean; // Keep if we want to support it later, backend might not send it yet
  };
  start_date: string;
  entry_fee: string; // Backend sends string "4.00"
  max_participants: number;
  // current_participants might be missing, assume logic in component or add optional
  current_participants?: number; 
  status: 'open' | 'ongoing' | 'completed' | 'closed'; // backend sends 'open'
  prize_distribution: string; // JSON string
  image?: string;
  is_featured?: boolean;
  registrations?: any[]; // Added to support participant count calculation
  rounds?: any[]; // Added for bracket display
}

interface TournamentResponse {
  tournaments: Tournament[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Récupère la liste de tous les tournois
   * GET /tournaments
   */
  getTournaments(): Observable<Tournament[]> {
    return this.http.get<TournamentResponse>(`${this.apiUrl}/tournaments`).pipe(
      map(response => response.tournaments)
    );
  }

  /**
   * Récupère un tournoi par son ID
   * GET /tournaments/{id}
   */
  getTournament(id: number): Observable<Tournament> {
    return this.http.get<Tournament>(`${this.apiUrl}/tournaments/${id}`);
  }
}
