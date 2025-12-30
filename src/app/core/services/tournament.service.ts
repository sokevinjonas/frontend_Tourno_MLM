import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BadgeType } from '../models/organizer.model';

export interface Tournament {
  id: number;
  organizer_id: number;
  organizer: {
    id: number;
    name: string;
    email: string;
    badge?: BadgeType;
    verified?: boolean;
    organizer_profile?: {
      badge?: BadgeType;
    };
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
    return this.http.get<any>(`${this.apiUrl}/tournaments/${id}`).pipe(
      map(res => {
        const t = res.tournament || res.data?.tournament || res.data || res;
        // Robust calculation of participants from various possible sources in response
        if (t) {
          t.current_participants = t.registrations?.length || res.statistics?.total_registered || t.current_participants || 0;
        }
        return t;
      })
    );
  }

  /**
   * Créer un nouveau tournoi
   * POST /tournaments
   */
  createTournament(data: any): Observable<Tournament> {
    return this.http.post<any>(`${this.apiUrl}/tournaments`, data).pipe(
      map(res => res.tournament || res.data?.tournament || res.data || res)
    );
  }

  /**
   * Mettre à jour un tournoi existant
   * PUT /tournaments/{id}
   */
  updateTournament(id: number, data: any): Observable<Tournament> {
    return this.http.put<any>(`${this.apiUrl}/tournaments/${id}`, data).pipe(
      map(res => res.tournament || res.data?.tournament || res.data || res)
    );
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
   * Changer le statut d'un tournoi
   * POST /tournaments/{id}/status
   */
  changeStatus(id: number, status: string): Observable<Tournament> {
    return this.http.post<any>(`${this.apiUrl}/tournaments/${id}/status`, { status }).pipe(
      map(res => res.tournament || res.data?.tournament || res.data || res)
    );
  }

  /**
   * Fermer les inscriptions manuellement
   * POST /tournaments/{id}/close-registrations
   */
  closeRegistrations(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/tournaments/${id}/close-registrations`, {});
  }

  /**
   * S'inscrire à un tournoi
   * POST /tournaments/{id}/register
   */
  registerToTournament(tournamentId: number, gameAccountId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/tournaments/${tournamentId}/register`, {
      game_account_id: gameAccountId
    });
  }

  checkRegistration(tournamentId: number): Observable<{ is_registered: boolean, registration: any }> {
    return this.http.get<{ is_registered: boolean, registration: any }>(`${this.apiUrl}/tournaments/${tournamentId}/check-registration`);
  }
  /**
   * Récupère les tournois créés par l'organisateur connecté
   * GET /tournaments/my/tournaments
   */
  getMyTournaments(filters?: any): Observable<Tournament[]> {
    let params = new HttpParams();
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key] !== null && filters[key] !== undefined && filters[key] !== 'Tous') {
          params = params.set(key, filters[key]);
        }
      });
    }

    return this.http.get<any>(`${this.apiUrl}/tournaments/my/tournaments`, { params }).pipe(
      map(response => {
        const tours = response.data?.tournaments || response.tournaments || response.data || response;
        if (Array.isArray(tours)) {
          return tours.map(t => ({
            ...t,
            current_participants: t.registrations?.length || t.registrations_count || t.current_participants || 0
          }));
        }
        return tours;
      })
    );
  }

  /**
   * Récupère les informations détaillées sur les rounds d'un tournoi
   * GET /tournaments/{id}/rounds-info
   */
  getRoundsInfo(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tournaments/${id}/rounds-info`);
  }

  /**
   * Passe au round suivant
   * POST /tournaments/{id}/next-round
   */
  nextRound(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/tournaments/${id}/next-round`, {});
  }

  completeTournament(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/tournaments/${id}/complete`, {});
  }
}
