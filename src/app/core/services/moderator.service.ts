import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User, UserProfile, OrganizerVerification } from '../models/user.model';
import { Match } from './match.service';

@Injectable({
  providedIn: 'root'
})
export class ModeratorService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUserByUuid(uuid: string): Observable<User> {
    return this.http.get<any>(`${this.apiUrl}/users/${uuid}`).pipe(
      map(res => res.user || res.data || res)
    );
  }

  getProfileByUuid(uuid: string): Observable<UserProfile> {
    return this.http.get<any>(`${this.apiUrl}/profiles/${uuid}`).pipe(
      map(res => res.profile || res.data || res)
    );
  }

  getMatchByUuid(uuid: string): Observable<Match> {
    return this.http.get<any>(`${this.apiUrl}/matches/${uuid}`).pipe(
      map(res => res.match || res.data || res)
    );
  }

  /**
   * profiles
   */
  getPendingProfiles(): Observable<UserProfile[]> {
    return this.http.get<{ profiles: UserProfile[] }>(`${this.apiUrl}/profiles/pending`).pipe(
      map(res => res.profiles)
    );
  }

  validateProfile(uuid: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/profiles/${uuid}/validate`, {});
  }

  rejectProfile(uuid: string, reason: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/profiles/${uuid}/reject`, { rejection_reason: reason });
  }

  /**
   * matchs
   */
  getDisputedMatches(): Observable<Match[]> {
    return this.http.get<{ matches: Match[] }>(`${this.apiUrl}/matches/disputed/all`).pipe(
      map(res => res.matches)
    );
  }

  validateMatchResult(uuid: string, data: { winner_uuid: string, player1_score: number, player2_score: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/matches/${uuid}/validate`, data);
  }

  /**
   * organisateurs
   */
  getPendingVerifications(): Observable<OrganizerVerification[]> {
    return this.http.get<{ verifications: OrganizerVerification[] }>(`${this.apiUrl}/organizers/verification/pending`).pipe(
      map(res => res.verifications)
    );
  }

  validateOrganizerVerification(uuid: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/organizers/verification/${uuid}/validate`, {});
  }

  rejectOrganizerVerification(uuid: string, reason: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/organizers/verification/${uuid}/reject`, { rejection_reason: reason });
  }

  getOrganizerVerificationByUuid(uuid: string): Observable<OrganizerVerification> {
    return this.http.get<any>(`${this.apiUrl}/organizers/verification/${uuid}`).pipe(
      map(res => res.verification || res.data || res)
    );
  }
}
