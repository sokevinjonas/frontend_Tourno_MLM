import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User, PaginatedResponse } from '../models/user.model';
import { Tournament } from './tournament.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * wallets
   */
  addFunds(userUuid: string, amount: number, description?: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/wallet/add-funds`, {
      user_uuid: userUuid,
      amount,
      description
    });
  }

  /**
   * gestion des utilisateurs
   */
  getUsers(filters?: any): Observable<PaginatedResponse<User>> {
    let params = new HttpParams();
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
          params = params.set(key, filters[key]);
        }
      });
    }
    return this.http.get<PaginatedResponse<User>>(`${this.apiUrl}/users`, { params });
  }

  getUserByUuid(uuid: string): Observable<User> {
    return this.http.get<{ user: User }>(`${this.apiUrl}/users/${uuid}`).pipe(
      map(res => res.user)
    );
  }

  banUser(uuid: string, reason: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${uuid}/ban`, { ban_reason: reason });
  }

  unbanUser(uuid: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${uuid}/unban`, {});
  }

  /**
   * gestion globale des tournois
   */
  getGlobalTournaments(filters?: any): Observable<PaginatedResponse<Tournament>> {
    let params = new HttpParams();
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
          params = params.set(key, filters[key]);
        }
      });
    }
    return this.http.get<any>(`${this.apiUrl}/tournaments`, { params }).pipe(
      map(res => {
        // If the backend returns { data: { tournaments: [], pagination: {} } } 
        // or { data: [], pagination: {} }
        if (res.data?.tournaments) {
          return { data: res.data.tournaments, pagination: res.pagination || res.data.pagination };
        }
        if (Array.isArray(res.data)) {
          return { data: res.data, pagination: res.pagination || res.meta || { current_page: 1, last_page: 1, per_page: 20, total: res.data.length } };
        }
        return res;
      })
    );
  }

  deleteTournament(uuid: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tournaments/${uuid}`);
  }
}
