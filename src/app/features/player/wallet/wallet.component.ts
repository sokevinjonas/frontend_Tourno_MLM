import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent {
  private authService = inject(AuthService);
  currentUser$ = this.authService.currentUser$;

  // Mock transactions
  transactions = [
    { id: 'TX12345', type: 'credit', amount: 10, description: 'Bonus de bienvenue', date: new Date('2024-12-20T14:23:00') },
    { id: 'TX12346', type: 'debit', amount: 5, description: 'Inscription Tournoi #1', date: new Date('2024-12-25T10:00:00') }
  ];
}
