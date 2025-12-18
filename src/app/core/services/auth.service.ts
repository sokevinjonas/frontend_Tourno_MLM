import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface MagicLinkResponse {
  message: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Sends a magic link to the user's email.
   * POST /auth/magic-link/send
   */
  sendMagicLink(email: string): Observable<MagicLinkResponse> {
    return this.http.post<MagicLinkResponse>(`${this.apiUrl}/auth/magic-link/send`, { email });
  }

  /**
   * Verifies the magic link token.
   * POST /auth/magic-link/verify
   */
  verifyMagicLink(token: string): Observable<{ token: string; user: any }> {
    return this.http.post<{ token: string; user: any }>(`${this.apiUrl}/auth/magic-link/verify`, { token });
  }

  /**
   * Redirects the user to the OAuth provider.
   * GET /auth/oauth/{provider}/redirect
   */
  loginWithOAuth(provider: 'google' | 'facebook' | 'apple'): void {
    window.location.href = `${this.apiUrl}/auth/oauth/${provider}/redirect`;
  }
}
