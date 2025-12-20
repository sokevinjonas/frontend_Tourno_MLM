import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { PaymentService } from '../../../core/services/payment.service';
import { Transaction } from '../../../core/models/payment.model';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  private authService = inject(AuthService);
  private paymentService = inject(PaymentService);
  private cd = inject(ChangeDetectorRef);
  
  currentUser$ = this.authService.currentUser$;
  transactions: Transaction[] = [];
  loading = false;

  ngOnInit() {
    this.loading = true;
    this.paymentService.getTransactions().subscribe({
      next: (res) => {
        this.transactions = res.transactions;
        console.log(this.transactions);
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching transactions', err);
        this.loading = false;
        this.cd.detectChanges();
      }
    });
  }
}
