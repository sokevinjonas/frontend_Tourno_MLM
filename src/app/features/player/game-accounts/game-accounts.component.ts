import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { PlayerService } from '../../../core/services/player.service';
import { ImageViewModalComponent } from '../../../shared/components/image-view-modal/image-view-modal.component';
import { GameAccountModalComponent } from '../../../shared/components/game-account-modal/game-account-modal.component';

@Component({
  selector: 'app-game-accounts',
  standalone: true,
  imports: [CommonModule, ImageViewModalComponent, GameAccountModalComponent],
  templateUrl: './game-accounts.component.html',
  styleUrls: ['./game-accounts.component.css']
})
export class GameAccountsComponent {
  private authService = inject(AuthService);
  private playerService = inject(PlayerService);
  
  currentUser$ = this.authService.currentUser$;

  // Account Modal (Add/Edit)
  showAccountModal = false;
  selectedAccount: any = null;

  openAddModal(type: string | null = null) {
    this.selectedAccount = null;
    this.showAccountModal = true;
  }

  openEditModal(account: any) {
    this.selectedAccount = account;
    this.showAccountModal = true;
  }

  closeAccountModal() {
    this.showAccountModal = false;
    this.selectedAccount = null;
  }

  onAccountSaved() {
    this.closeAccountModal();
    // Optional: Show global toast here if desired, or rely on modal's feedback
  }

  // View Image Modal
  showViewModal = false;
  viewImageUrl: string | null = null;

  openViewModal(imageUrl: string) {
    this.viewImageUrl = imageUrl;
    this.showViewModal = true;
  }

  closeViewModal() {
    this.showViewModal = false;
    this.viewImageUrl = null;
  }

  // Helper
  getAccountImageUrl(path: string | null): string {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const baseUrl = this.playerService.apiUrl.replace('/api', '');
    return `${baseUrl}/storage/${path}`;
  }
}
