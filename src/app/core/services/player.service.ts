import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  public http = inject(HttpClient);
  private authService = inject(AuthService);
  public apiUrl = environment.apiUrl;

  
  /**
   * Ajoute un compte de jeu
   * POST /game-accounts
  **/
   
  addGameAccount(gameType: string, inGameName: string, screenshot: File): Observable<any> {
    const formData = new FormData();
    formData.append('game', gameType);
    formData.append('game_username', inGameName);
    formData.append('team_screenshot_path', screenshot);

    return this.http.post<any>(`${this.apiUrl}/game-accounts`, formData).pipe(
      tap(() => {
        // Refresh local user data to show new account
        this.authService.getCurrentUser().subscribe();
      })
    );
  }
  /**
   * Modifie un compte de jeu
   * POST /game-accounts/{id} (using POST with _method=PUT or straight PUT if FormData supported correctly by backend, usually POST for files)
   * Laravels handle PUT files better with POST + _method=PUT
   **/
  updateGameAccount(id: number, gameType: string, inGameName: string, screenshot?: File): Observable<any> {
    const formData = new FormData();
    formData.append('game', gameType);
    formData.append('game_username', inGameName);
    if (screenshot) {
      formData.append('team_screenshot_path', screenshot);
    }

    return this.http.post<any>(`${this.apiUrl}/game-accounts/${id}`, formData).pipe(
      tap(() => {
        this.authService.getCurrentUser().subscribe();
      })
    );
  }
  
}
