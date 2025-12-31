import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { PaymentService } from '../../../core/services/payment.service';
import { Transaction, WalletStats, WalletStatisticsResponse } from '../../../core/models/payment.model';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  private authService = inject(AuthService);
  private paymentService = inject(PaymentService);
  private toastService = inject(ToastService);
  private cd = inject(ChangeDetectorRef);
  
  currentUser$ = this.authService.currentUser$;
  transactions: Transaction[] = [];
  walletStats: WalletStats | null = null;
  loading = false;

  // Tabs & Pagination
  activeTab: 'history' | 'recharge' | 'withdraw' = 'history';
  currentPage = 1;
  pageSize = 10;
  totalTransactions = 0;

  // Withdrawal Form
  withdrawalAmount: number = 5;
  withdrawalPhone: string = '';
  confirmPhone: string = '';
  submittingWithdrawal = false;

  rechargePacks = [
    { id: 'starter', coins: 5, price: 2500, label: 'Pack Débutant', description: 'Idéal pour tester la plateforme', isPopular: false },
    { id: 'gamer', coins: 10, price: 5000, label: 'Pack Gamer', description: 'Le choix préféré des joueurs', isPopular: true },
    { id: 'pro', coins: 25, price: 12000, label: 'Pack Pro', description: 'Bonus inclus +2% de réduction', isPopular: false },
    { id: 'elite', coins: 50, price: 23000, label: 'Pack Élite', description: 'Meilleure valeur pour les pros', isPopular: false }
  ];

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.loading = true;
    this.loadTransactions();
    this.loadStats();
  }

  loadTransactions() {
    const offset = (this.currentPage - 1) * this.pageSize;
    this.paymentService.getTransactions(this.pageSize, offset).subscribe({
      next: (res) => {
        this.transactions = res.transactions;
        this.totalTransactions = res.pagination.total;
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

  loadStats() {
    this.paymentService.getWalletStats().subscribe({
      next: (res: WalletStatisticsResponse) => {
        const { wallet, transactions, tournaments } = res;
        this.walletStats = {
          balance: wallet.balance,
          blocked_balance: wallet.blocked_balance,
          available_balance: wallet.available_balance,
          total_credited: transactions.total_credited,
          total_debited: transactions.total_debited,
          tournament_stats: tournaments
        } as any;
        this.cd.detectChanges();
      },
      error: (err) => console.error('Error fetching stats', err)
    });
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadTransactions();
  }

  get totalPages(): number {
    return Math.ceil(this.totalTransactions / this.pageSize);
  }

  setActiveTab(tab: 'history' | 'recharge' | 'withdraw') {
    this.activeTab = tab;
    
    // Smooth scroll to the tab section on mobile
    if (window.innerWidth < 768) {
      setTimeout(() => {
        const element = document.getElementById('wallet-tabs-container');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  }

  selectPack(pack: any) {
    this.toastService.info(`Ouverture du paiement pour ${pack.label}...`);
    // Logic for recharge will go here
  }

  confirmWithdrawal() {
    if (this.withdrawalAmount < 5) {
      this.toastService.error('Le montant minimum de retrait est de 5 pièces.');
      return;
    }

    if (this.withdrawalPhone !== this.confirmPhone) {
      this.toastService.error('Les numéros de téléphone ne correspondent pas.');
      return;
    }

    if (!this.withdrawalPhone) {
      this.toastService.error('Veuillez entrer un numéro de téléphone.');
      return;
    }

    this.submittingWithdrawal = true;
    this.paymentService.withdraw({
      amount: this.withdrawalAmount,
      phone: this.withdrawalPhone
    }).subscribe({
      next: () => {
        this.toastService.success('Demande de retrait envoyée avec succès. Traitement sous 48h.');
        this.submittingWithdrawal = false;
        this.activeTab = 'history';
        this.refreshData();
      },
      error: (err) => {
        this.toastService.error('Erreur lors de la demande de retrait.');
        this.submittingWithdrawal = false;
      }
    });
  }
}
