import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-auth-verify',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <div class="bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-slate-800 text-center max-w-md w-full animate-fade-in">
        
        <div *ngIf="verifying">
          <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 class="text-2xl font-bold text-white mb-2">Vérification en cours...</h2>
          <p class="text-slate-400">Nous validons votre lien de connexion.</p>
        </div>

        <div *ngIf="error">
          <div class="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
            ⚠️
          </div>
          <h2 class="text-2xl font-bold text-white mb-2">Lien invalide</h2>
          <p class="text-slate-400 mb-6">{{ error }}</p>
          <a routerLink="/login" class="inline-block px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors font-medium cursor-pointer">
            Retour à la connexion
          </a>
        </div>

        <div *ngIf="success">
           <div class="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
            ✅
          </div>
          <h2 class="text-2xl font-bold text-white mb-2">Connexion réussie !</h2>
          <p class="text-slate-400">Redirection en cours...</p>
        </div>

      </div>
    </div>
  `
})
export class AuthVerifyComponent implements OnInit {
  verifying: boolean = true;
  error: string = '';
  success: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Récupérer le token de l'URL
    this.route.queryParams.subscribe(params => {
      const token = params['token'];

      if (!token) {
        this.error = 'Token manquant';
        this.verifying = false;
        return;
      }

      // Vérifier le token
      this.authService.verifyMagicLink(token).subscribe({
        next: (response) => {
          this.verifying = false;
          this.success = true;

          // Petit délai pour l'UX (afficher le succès)
          setTimeout(() => {
            // Rediriger selon is_new_user (si implémenté) ou vers home
            if (response.is_new_user) {
               // Assuming profile complete route exists or will exist
               this.router.navigate(['/profile/complete']); 
            } else {
              this.router.navigate(['/']);
            }
          }, 1500);
        },
        error: (err) => {
          this.verifying = false;
          this.error = err.error?.message || 'Ce lien est invalide ou a expiré.';
        }
      });
    });
  }
}
