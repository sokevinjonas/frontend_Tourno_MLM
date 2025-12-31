import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-payment-modal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css']
})
export class PaymentModalComponent {
  @Input() isVisible = false;
  @Input() title = 'Confirmation de Paiement';
  @Input() message = 'Voulez-vous confirmer cette transaction ?';
  @Input() cost = 0;
  @Input() isLoading = false;

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  private authService = inject(AuthService);

  get userBalance(): number {
    return Number(this.authService.currentUserValue?.wallet?.balance) || 0;
  }

  get canAfford(): boolean {
    return this.userBalance >= this.cost;
  }

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
