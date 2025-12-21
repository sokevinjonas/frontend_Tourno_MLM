import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface Tournament {
  id: number;
  name: string;
  description?: string;
  game_type: 'efootball' | 'fc_mobile' | 'dream_league_soccer' | 'other';
  organizer: {
    id: number;
    name: string;
    email: string;
    verified?: boolean;
  };
  start_date: string;
  end_date?: string;
  registration_start: string;
  registration_end: string;
  entry_fee: string;
  prize_pool: string;
  prize_distribution: string | any;
  max_participants: number;
  registrations_count?: number;
  current_participants?: number; 
  status: 'draft' | 'open' | 'in_progress' | 'completed' | 'payout_pending' | 'payouts_completed' | 'cancelled';
  visibility: 'public' | 'private';
  unique_url?: string;
  auto_managed: boolean;
  rules?: string;
  image?: string;
  is_featured?: boolean;
  registrations?: any[];
  rounds?: any[];
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

  /**
   * Créer un nouveau tournoi
   * POST /tournaments
   */
  createTournament(data: any): Observable<Tournament> {
    return this.http.post<Tournament>(`${this.apiUrl}/tournaments`, data);
  }

  /**
   * Démarrer le tournoi (générer les rounds)
   * POST /tournaments/{id}/start
   */
  startTournament(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/tournaments/${id}/start`, {});
  }

  /**
   * Fermer les inscriptions manuellement
   * POST /tournaments/{id}/close-registrations
   */
  closeRegistrations(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/tournaments/${id}/close-registrations`, {});
  }

  /**
   * Récupère les tournois créés par l'organisateur connecté
   * GET /tournaments/my/tournaments
   */
  getMyTournaments(): Observable<Tournament[]> {
    return this.http.get<TournamentResponse>(`${this.apiUrl}/tournaments/my/tournaments`).pipe(
      map(response => response.tournaments)
    );
  }
}
