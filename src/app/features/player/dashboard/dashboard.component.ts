import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { PaymentService } from '../../../core/services/payment.service';
import { WalletStats } from '../../../core/models/payment.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private paymentService = inject(PaymentService);
  private cd = inject(ChangeDetectorRef);

  userName = '';
  walletStats: WalletStats | null = null;
  loading = true;

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.userName = user?.name || '';
    });
    this.loadStats();
  }

  loadStats() {
    this.loading = true;
    this.paymentService.getWalletStats().subscribe({
      next: (res) => {
        this.walletStats = res.statistics;
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error loading player stats', err);
        this.loading = false;
        this.cd.detectChanges();
      }
    });
  }
}
