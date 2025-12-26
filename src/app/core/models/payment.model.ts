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

export interface ReleasedTournamentFunds {
  tournament_id: number;
  tournament_name: string;
  locked_amount: number;
  paid_out: number;
  available_for_withdrawal: number;
  released_at: string;
}

export interface WalletData {
  balance: number;
  blocked_balance: number;
  available_balance: number;
}

export interface WalletStats extends WalletData {
  tournament_stats: TournamentSummaryStats;
  total_credited?: number;
  total_debited?: number;
}

export interface TransactionStats {
  total_credited: number;
  total_debited: number;
  total_count: number;
}

export interface TournamentSummaryStats {
  // Organizer fields
  total_collected?: number;
  total_paid_out?: number;
  total_profit?: number;
  currently_blocked?: number;
  available_for_withdrawal?: number;
  released_funds_by_tournament?: ReleasedTournamentFunds[];

  // Player fields
  total_prizes_won?: number;
  tournaments_won?: number;
  podium_finishes?: number;

  // Common fields
  active_tournaments: number;
  completed_tournaments: number;
}

export interface WalletStatisticsResponse {
  wallet: WalletData;
  transactions: TransactionStats;
  tournaments: TournamentSummaryStats;
}

export interface TournamentWallet {
  tournament_id: number;
  collected_funds: number;
  status: 'active' | 'payout_pending' | 'payouts_completed';
}
