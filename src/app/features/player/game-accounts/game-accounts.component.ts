import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-game-accounts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-accounts.component.html',
  styleUrls: ['./game-accounts.component.css']
})
export class GameAccountsComponent {
  private authService = inject(AuthService);
  currentUser$ = this.authService.currentUser$;

  showAddModal = false;

  openAddModal() {
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  // Placeholder for adding account logic
  addAccount(gameType: string) {
    alert(`Ajout de compte ${gameType} implémenté bientôt.`);
    this.closeAddModal();
  }
}
