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

  getTransactions(): Observable<TransactionsResponse> {
    return this.http.get<TransactionsResponse>(`${this.apiUrl}/wallet/transactions`);
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
}
