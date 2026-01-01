export type UserRole = 'player' | 'organizer' | 'moderator' | 'admin';

export interface Wallet {
  uuid: string;
  user_uuid: string;
  balance: string;
  blocked_balance: string;
  created_at: string;
  updated_at: string;
}

export interface GameAccount {
  uuid: string;
  user_uuid: string;
  game: string;
  game_username: string;
  team_screenshot_path: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  uuid: string;
  name: string;
  email: string;
  role: UserRole;
  badge?: string;
  avatar_url?: string | null;
  verified?: boolean;
  is_banned: boolean;
  banned_until?: string | null;
  ban_reason?: string | null;
  profile?: UserProfile;
  wallet?: Wallet;
  game_accounts?: GameAccount[];
  created_at: string;
  updated_at?: string;
}

export interface UserProfile {
  uuid: string;
  user_uuid: string;
  user?: User;
  whatsapp_number: string;
  country: string;
  city: string;
  status: 'pending' | 'validated' | 'rejected' | 'active';
  rejection_reason?: string;
  validated_by_uuid?: string;
  validated_at?: string;
  created_at: string;
  updated_at?: string;
}

export interface OrganizerVerification {
  uuid: string;
  user_uuid: string;
  user?: User;
  whatsapp_number: string;
  country: string;
  city: string;
  verification_document?: string;
  status: 'pending' | 'validated' | 'rejected';
  rejection_reason?: string;
  created_at: string;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}
