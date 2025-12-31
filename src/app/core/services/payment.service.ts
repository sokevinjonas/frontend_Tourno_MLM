import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Transaction, TransactionsResponse, WalletBalance, WalletStats, WalletStatisticsResponse, TournamentWallet } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = `${environment.apiUrl}`;

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

  getTournamentWallet(tournamentId: number): Observable<TournamentWallet> {
    return this.http.get<TournamentWallet>(`${this.apiUrl}/tournaments/${tournamentId}/wallet`);
  }

  // Placeholder for future recharge and withdrawal endpoints
  recharge(packId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/wallet/recharge`, { pack_id: packId });
  }

  withdraw(data: { amount: number; phone: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/wallet/withdraw`, data);
  }
}
