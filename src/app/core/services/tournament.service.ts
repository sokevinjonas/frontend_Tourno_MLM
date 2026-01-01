import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BadgeType } from '../models/organizer.model';

export interface Tournament {
  uuid: string;
  organizer: {
    uuid: string;
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
  rules?: string | any[];
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
      map(response => {
        const data = response.data?.tournaments || response.tournaments || response.data || response;
        if (Array.isArray(data)) {
          return data.map(t => this.mapTournamentData(t));
        }
        return data;
      })
    );
  }

  private mapTournamentData(t: any): Tournament {
    if (t && t.organizer) {
      t.organizer.badge = t.organizer.badge || t.organizer.organizer_profile?.badge || (t.organizer.verified ? 'verified' : null);
    }
    return t;
  }

  /**
   * Récupère un tournoi par son UUID
   * GET /tournaments/{uuid}
   */
  getTournament(uuid: string): Observable<Tournament> {
    return this.http.get<any>(`${this.apiUrl}/tournaments/${uuid}`).pipe(
      map(res => {
        let t = res.tournament || res.data?.tournament || res.data || res;
        // Robust calculation of participants from various possible sources in response
        if (t) {
          t = this.mapTournamentData(t);
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
      map(res => {
        const t = res.tournament || res.data?.tournament || res.data || res;
        return this.mapTournamentData(t);
      })
    );
  }

  /**
   * Mettre à jour un tournoi existant
   * PUT /tournaments/{uuid}
   */
  updateTournament(uuid: string, data: any): Observable<Tournament> {
    return this.http.put<any>(`${this.apiUrl}/tournaments/${uuid}`, data).pipe(
      map(res => {
        const t = res.tournament || res.data?.tournament || res.data || res;
        return this.mapTournamentData(t);
      })
    );
  }

  /**
   * Démarrer le tournoi (générer les rounds)
   * POST /tournaments/{uuid}/start
   */
  startTournament(uuid: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/tournaments/${uuid}/start`, {});
  }

  previewSchedule(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tournaments/preview-schedule`, data);
  }

  /**
   * Changer le statut d'un tournoi
   * POST /tournaments/{uuid}/status
   */
  changeStatus(uuid: string, status: string): Observable<Tournament> {
    return this.http.post<any>(`${this.apiUrl}/tournaments/${uuid}/status`, { status }).pipe(
      map(res => {
        const t = res.tournament || res.data?.tournament || res.data || res;
        return this.mapTournamentData(t);
      })
    );
  }

  /**
   * Fermer les inscriptions manuellement
   * POST /tournaments/{uuid}/close-registrations
   */
  closeRegistrations(uuid: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/tournaments/${uuid}/close-registrations`, {});
  }

  /**
   * S'inscrire à un tournoi
   * POST /tournaments/{uuid}/register
   */
  registerToTournament(tournamentUuid: string, gameAccountUuid: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/tournaments/${tournamentUuid}/register`, {
      game_account_uuid: gameAccountUuid
    });
  }

  checkRegistration(tournamentUuid: string): Observable<{ is_registered: boolean, registration: any }> {
    return this.http.get<{ is_registered: boolean, registration: any }>(`${this.apiUrl}/tournaments/${tournamentUuid}/check-registration`);
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
        let tours = response.data?.tournaments || response.tournaments || response.data || response;
        if (Array.isArray(tours)) {
          return tours.map(t => {
            const mapped = this.mapTournamentData(t);
            return {
              ...mapped,
              current_participants: mapped.registrations?.length || mapped.registrations_count || mapped.current_participants || 0
            };
          });
        }
        return tours;
      })
    );
  }

  /**
   * Récupère les informations détaillées sur les rounds d'un tournoi
   * GET /tournaments/{uuid}/rounds-info
   */
  getRoundsInfo(uuid: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tournaments/${uuid}/rounds-info`);
  }

  /**
   * Passe au round suivant
   * POST /tournaments/{uuid}/next-round
   */
  nextRound(uuid: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/tournaments/${uuid}/next-round`, {});
  }

  completeTournament(uuid: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/tournaments/${uuid}/complete`, {});
  }
}
