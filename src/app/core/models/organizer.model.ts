export type BadgeType = 'certified' | 'verified' | 'partner' | null;

export interface SocialLinks {
  twitter?: string;
  discord?: string;
  [key: string]: string | undefined;
}

export interface Organizer {
  uuid: string;
  name: string;
  badge: BadgeType;
  tournaments: number;
  followers: number;
  avatar: string;
  is_featured: boolean;
  bio?: string;
  social_links?: SocialLinks;
}

export interface OrganizersResponse {
  organizers: Organizer[];
  total: number;
}

export interface FollowResponse {
  message: string;
  is_following: boolean;
  followers_count: number;
}

export interface FollowingStatus {
  is_following: boolean;
}

export interface MyFollowingResponse {
  following: Organizer[];
  total: number;
}
