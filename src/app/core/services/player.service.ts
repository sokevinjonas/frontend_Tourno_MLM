import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = environment.apiUrl;

  
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
}
