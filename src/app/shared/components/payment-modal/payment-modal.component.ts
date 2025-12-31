import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-modal',
  standalone: true,
  imports: [CommonModule],
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

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
