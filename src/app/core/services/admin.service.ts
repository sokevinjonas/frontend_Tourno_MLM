import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
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
  addFunds(userId: number, amount: number, description?: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/wallet/add-funds`, {
      user_id: userId,
      amount,
      description
    });
  }

  /**
   * gestion des utilisateurs
   */
  getUsers(filters?: any): Observable<User[]> {
    let params = new HttpParams();
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key]) params = params.set(key, filters[key]);
      });
    }
    return this.http.get<{ data: User[] } | User[]>(`${this.apiUrl}/users`, { params }).pipe(
      map(res => (res as any).data || res)
    );
  }

  /**
   * gestion globale des tournois
   */
  getGlobalTournaments(filters?: any): Observable<Tournament[]> {
    let params = new HttpParams();
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key]) params = params.set(key, filters[key]);
      });
    }
    return this.http.get<any>(`${this.apiUrl}/tournaments`, { params }).pipe(
      map(res => res.data?.tournaments || res.tournaments || res.data || res)
    );
  }

  deleteTournament(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tournaments/${id}`);
  }
}
