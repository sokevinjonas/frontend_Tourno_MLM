import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  is_new_user?: boolean;
  // Add other fields as needed based on API response
  profile?: any;
  wallet?: any;
  game_accounts?: any[];
}

export interface AuthResponse {
  user: User;
  token: string;
  is_new_user: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Charger l'utilisateur depuis localStorage au démarrage
    const token = this.getToken();
    
    // Check if token is expired immediately
    if (token && this.isTokenExpired(token)) {
      this.doLogoutCleanup();
    } else {
      // If token is valid (or null), try to load user
      const user = localStorage.getItem('user');
      if (user) {
        try {
          this.currentUserSubject.next(JSON.parse(user));
        } catch (e) {
          console.error('Error parsing user from localStorage', e);
          this.doLogoutCleanup();
        }
      }
    }
  }

  /**
   * Récupère l'URL de redirection OAuth
   * GET /auth/oauth/{provider}/redirect
   */
  getOAuthRedirectUrl(provider: 'google' | 'apple' | 'facebook'): Observable<{ url: string }> {
    return this.http.get<{ url: string }>(`${this.apiUrl}/auth/oauth/${provider}/redirect`);
  }

  /**
   * Envoie un Magic Link par email
   * POST /auth/magic-link/send
   */
  sendMagicLink(email: string, redirectUrl?: string): Observable<any> {
    const defaultRedirect = window.location.origin + '/auth/verify';
    return this.http.post(`${this.apiUrl}/auth/magic-link/send`, {
      email,
      redirect_url: redirectUrl || defaultRedirect
    });
  }

  /**
   * Vérifie le token Magic Link
   * POST /auth/magic-link/verify
   */
  verifyMagicLink(token: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/magic-link/verify`, { token })
      .pipe(
        tap(response => this.handleAuthSuccess(response))
      );
  }

  /**
   * Récupère l'utilisateur connecté
   * GET /user
   */
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user`).pipe(
      tap(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  /**
   * Déconnexion
   * POST /auth/logout
   */
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/logout`, {})
      .pipe(
        tap(() => {
          this.doLogoutCleanup();
        }),
        catchError((err) => {
          console.error('Logout API failed', err);
          this.doLogoutCleanup();
          return of(true);
        })
      );
  }

  doLogoutCleanup() {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      this.currentUserSubject.next(null);
  }

  /**
   * Gère la réponse d'authentification réussie
   */
  private handleAuthSuccess(response: AuthResponse): void {
    if (response.token) {
      localStorage.setItem('auth_token', response.token);
    }
    if (response.user) {
      localStorage.setItem('user', JSON.stringify(response.user));
      this.currentUserSubject.next(response.user);
    }
  }

  /**
   * Retourne le token stocké
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Vérifie si l'utilisateur est connecté
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    if (this.isTokenExpired(token)) {
      this.doLogoutCleanup();
      return false;
    }
    return true;
  }

  /**
   * Vérifie si le token est expiré
   */
  private isTokenExpired(token: string): boolean {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = atob(base64);
      const payload = JSON.parse(jsonPayload);
      
      if (!payload.exp) return true; // Invalid if no expiration claim
      
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch (e) {
      return true; // Treat invalid tokens as expired
    }
  }
}
