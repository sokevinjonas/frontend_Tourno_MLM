export type TransactionType = 'credit' | 'debit';
export type TransactionStatus = 'pending' | 'completed' | 'failed';

export interface Transaction {
  id: number;
  wallet_id: number;
  user_id: number;
  type: TransactionType;
  amount: string;
  balance_before: string;
  balance_after: string;
  reason: string;
  description: string;
  tournament_id: number | null;
  created_at: string;
  updated_at: string;
  tournament: any | null;
  status?: TransactionStatus; // Optional as not in sample but might exist
}

export interface TransactionsResponse {
  transactions: Transaction[];
  pagination: {
    limit: number;
    offset: number;
    total: number;
  };
}

export interface WalletBalance {
  balance: number;
  currency: string;
}
