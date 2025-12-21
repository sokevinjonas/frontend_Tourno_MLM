import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Public routes (no authentication required)
  {
    path: '',
    loadChildren: () => import('./features/public/public.routes').then(m => m.publicRoutes)
  },

  // Auth routes
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
  },

  // Player routes (authentication required)
  // Player routes (authentication required)
  {
    path: 'profile/complete',
    loadComponent: () => import('./features/player/profile-complete/profile-complete.component').then(m => m.ProfileCompleteComponent),
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/player/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },
  {
    path: 'game-accounts',
    loadComponent: () => import('./features/player/game-accounts/game-accounts.component').then(m => m.GameAccountsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'wallet',
    loadComponent: () => import('./features/player/wallet/wallet.component').then(m => m.WalletComponent),
    canActivate: [authGuard]
  },
  {
    path: 'my-matches',
    loadComponent: () => import('./features/player/my-matches/my-matches.component').then(m => m.MyMatchesComponent),
    canActivate: [authGuard]
  },
  {
    path: 'my-registrations',
    loadComponent: () => import('./features/player/tournaments/tournaments.component').then(m => m.TournamentsComponent), // Reusing/Aliasing relevant component
    canActivate: [authGuard]
  },
  {
    path: 'player', // Keep legacy/dashboard route if needed, or redirect
    redirectTo: 'profile',
    pathMatch: 'full'
  },

  // Organizer routes (organizer role required)
  {
    path: 'organizer',
    loadChildren: () => import('./features/organizer/organizer.routes').then(m => m.organizerRoutes),
    canActivate: [authGuard]
  },

  // Moderator routes (moderator role required)
  {
    path: 'moderator',
    loadChildren: () => import('./features/moderator/moderator.routes').then(m => m.moderatorRoutes),
    canActivate: [authGuard]
  },

  // Referee routes (referee role required)
  {
    path: 'referee',
    loadChildren: () => import('./features/referee/referee.routes').then(m => m.refereeRoutes),
    canActivate: [authGuard]
  },

  // Admin routes (admin role required)
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.adminRoutes),
    canActivate: [authGuard]
  },

  // Redirect unknown routes to home
  {
    path: '**',
    redirectTo: ''
  }
];
