import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TransactionsResponse, WalletBalance, WalletStatisticsResponse, TournamentWallet } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTransactions(limit: number = 10, offset: number = 0): Observable<TransactionsResponse> {
    return this.http.get<TransactionsResponse>(`${this.apiUrl}/wallet/transactions`, {
      params: { limit: limit.toString(), offset: offset.toString() }
    });
  }

  getBalance(): Observable<WalletBalance> {
    return this.http.get<WalletBalance>(`${this.apiUrl}/wallet/balance`);
  }

  getWalletStats(): Observable<WalletStatisticsResponse> {
    return this.http.get<WalletStatisticsResponse>(`${this.apiUrl}/wallet/statistics`);
  }

  initiateDeposit(amountMoney: number): Observable<{ success: boolean; data: { transaction: any; payment_url: string; token: string } }> {
    return this.http.post<{ success: boolean; data: { transaction: any; payment_url: string; token: string } }>(`${this.apiUrl}/coin-wallet/deposit/initiate`, { 
      amount_money: amountMoney
    });
  }

  requestWithdrawal(data: { amount: number; phone: string; method?: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/coin-wallet/withdrawal/request`, {
      amount_coins: data.amount,
      payment_phone: data.phone,
      payment_method: data.method || 'orange_money'
    });
  }

  // Admin Methods
  getPendingWithdrawals(): Observable<{ success: boolean, data: any[] }> {
    return this.http.get<{ success: boolean, data: any[] }>(`${environment.apiUrl}/admin/coin-wallet/withdrawals/pending`);
  }

  approveWithdrawal(uuid: string, note?: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/admin/coin-wallet/withdrawals/${uuid}/approve`, { admin_note: note });
  }

  rejectWithdrawal(uuid: string, reason: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/admin/coin-wallet/withdrawals/${uuid}/reject`, { rejection_reason: reason });
  }
}
