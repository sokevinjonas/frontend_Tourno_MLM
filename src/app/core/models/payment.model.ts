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
  blocked_balance?: number; // Added for organizer blocked funds
  currency: string;
}

export interface OrganizerWalletStats {
  total_credited: number;
  total_debited: number;
  total_transactions: number;
  current_balance: number;
  blocked_balance?: number; // Keep as optional if not in log but needed
}

export interface WalletStatisticsResponse {
  statistics: OrganizerWalletStats;
}

export interface TournamentWallet {
  tournament_id: number;
  collected_funds: number;
  status: 'active' | 'payout_pending' | 'payouts_completed';
}
