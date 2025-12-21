import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  badge?: string;
  is_new_user?: boolean;
  // Add other fields as needed based on API response
  profile?: any;
  wallet?: any;
  organizer?: any;
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
  private readonly TOKEN_KEY = 'auth_token';

  constructor(private http: HttpClient) {
    this.initializeAuth();
  }

  private initializeAuth() {
    const token = this.getToken();
    if (token) {
      this.getCurrentUser().subscribe({
        error: () => this.doLogoutCleanup()
      });
    }
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
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
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/magic-link/verify`, { token }).pipe(
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
    this.currentUserSubject.next(null);
    this.removeToken();
  }

  /**
   * Gère la réponse d'authentification réussie
   */
  private handleAuthSuccess(response: AuthResponse): void {
    if (response.token) {
      this.setToken(response.token);
    }
    if (response.user) {
      this.currentUserSubject.next(response.user);
    }
  }

  /**
   * Vérifie si l'utilisateur est connecté (Vérification locale du user subject)
   */
  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value && !!this.getToken();
  }

  /**
   * Vérifie si la session est toujours active côté serveur
   * GET /is-authenticated
   */
  checkSession(): Observable<boolean> {
    if (!this.getToken()) return of(false);
    return this.http.get<{ authenticated: boolean }>(`${this.apiUrl}/is-authenticated`).pipe(
      map(res => res.authenticated),
      catchError(() => {
        return of(false);
      })
    );
  }
}
