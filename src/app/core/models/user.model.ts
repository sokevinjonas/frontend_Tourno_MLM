export type UserRole = 'player' | 'organizer' | 'moderator' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  badge?: string;
  verified?: boolean;
  profile?: UserProfile;
  wallet?: any;
  created_at?: string;
}

export interface UserProfile {
  id: number;
  user_id: number;
  user?: User;
  whatsapp_number: string;
  country: string;
  city: string;
  status: 'pending' | 'validated' | 'rejected' | 'active';
  rejection_reason?: string;
  validated_by?: number;
  validated_at?: string;
  created_at: string;
  updated_at?: string;
}

export interface OrganizerVerification {
  id: number;
  user_id: number;
  user?: User;
  verification_document: string;
  status: 'pending' | 'validated' | 'rejected';
  rejection_reason?: string;
  created_at: string;
}
