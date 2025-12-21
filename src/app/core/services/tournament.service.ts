import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface Tournament {
  id: number;
  organizer_id: number;
  organizer: {
    id: number;
    name: string;
    email: string;
    verified?: boolean;
  };
  name: string;
  description?: string;
  game: string; // Reverted from game_type
  format: 'single_elimination' | 'swiss' | 'champions_league';
  max_participants: number;
  entry_fee: string;
  prize_distribution: string | any;
  status: 'draft' | 'open' | 'in_progress' | 'completed' | 'payout_pending' | 'payouts_completed' | 'cancelled';
  visibility: 'public' | 'private';
  unique_url?: string;
  auto_managed: boolean;
  start_date: string;
  tournament_duration_days?: number;
  time_slot?: 'morning' | 'afternoon' | 'evening';
  match_deadline_minutes?: number;
  total_rounds?: number;
  current_round?: number;
  registrations_count?: number;
  current_participants?: number;
  rules?: string;
  image?: string;
  is_featured?: boolean;
  registrations?: any[];
  rounds?: any[];
  created_at?: string;
  updated_at?: string;
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
   * Récupère la liste de tous les tournois avec filtres optionnels
   * GET /tournaments
   */
  getTournaments(filters?: any): Observable<Tournament[]> {
    let params = new HttpParams();
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key] !== null && filters[key] !== undefined && filters[key] !== 'Tous') {
          params = params.set(key, filters[key]);
        }
      });
    }

    return this.http.get<any>(`${this.apiUrl}/tournaments`, { params }).pipe(
      map(response => response.data?.tournaments || response.tournaments || response.data || response)
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

  previewSchedule(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tournaments/preview-schedule`, data);
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
    return this.http.get<any>(`${this.apiUrl}/tournaments/my/tournaments`).pipe(
      map(response => response.data?.tournaments || response.tournaments || response.data || response)
    );
  }
}
