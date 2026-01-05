import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Transaction, TransactionsResponse, WalletBalance, WalletStats, WalletStatisticsResponse, TournamentWallet } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/coin-wallet`;

  constructor(private http: HttpClient) {}

  getTransactions(limit: number = 10, offset: number = 0): Observable<TransactionsResponse> {
    return this.http.get<{ success: boolean, data: Transaction[] }>(`${this.apiUrl}/transactions`, {
      params: { limit: limit.toString(), offset: offset.toString() }
    }).pipe(
      map(res => ({
        transactions: res.data,
        pagination: { limit, offset, total: res.data.length } // API doesn't seem to provide total in this specific snippet, but keeping structure
      }))
    );
  }

  getBalance(): Observable<WalletBalance> {
    return this.http.get<{ success: boolean; balance: number }>(`${this.apiUrl}/balance`).pipe(
      map(res => ({ balance: res.balance, currency: 'XOF' }))
    );
  }

  initiateDeposit(amountMoney: number): Observable<{ success: boolean; data: { transaction: any; payment_url: string; token: string } }> {
    return this.http.post<{ success: boolean; data: { transaction: any; payment_url: string; token: string } }>(`${this.apiUrl}/deposit/initiate`, { 
      amount_money: amountMoney
    });
  }

  requestWithdrawal(data: { amount: number; phone: string; method?: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/withdrawal/request`, {
      amount_coins: data.amount,
      payment_phone: data.phone,
      payment_method: data.method || 'orange_money'
    });
  }
}
