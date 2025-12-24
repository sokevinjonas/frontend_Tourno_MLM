import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { UserProfile, OrganizerVerification } from '../models/user.model';
import { Match } from './match.service';

@Injectable({
  providedIn: 'root'
})
export class ModeratorService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * profiles
   */
  getPendingProfiles(): Observable<UserProfile[]> {
    return this.http.get<{ profiles: UserProfile[] }>(`${this.apiUrl}/profiles/pending`).pipe(
      map(res => res.profiles)
    );
  }

  validateProfile(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/profiles/${id}/validate`, {});
  }

  rejectProfile(id: number, reason: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/profiles/${id}/reject`, { rejection_reason: reason });
  }

  /**
   * matchs
   */
  getDisputedMatches(): Observable<Match[]> {
    return this.http.get<{ matches: Match[] }>(`${this.apiUrl}/matches/disputed/all`).pipe(
      map(res => res.matches)
    );
  }

  validateMatchResult(id: number, data: { winner_id: number, player1_score: number, player2_score: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/matches/${id}/validate`, data);
  }

  /**
   * organisateurs
   */
  getPendingVerifications(): Observable<OrganizerVerification[]> {
    return this.http.get<{ verifications: OrganizerVerification[] }>(`${this.apiUrl}/organizers/verification/pending`).pipe(
      map(res => res.verifications)
    );
  }

  validateOrganizerVerification(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/organizers/verification/${id}/validate`, {});
  }

  rejectOrganizerVerification(id: number, reason: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/organizers/verification/${id}/reject`, { rejection_reason: reason });
  }
}
