import { Routes } from '@angular/router';

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
  {
    path: 'player',
    loadChildren: () => import('./features/player/player.routes').then(m => m.playerRoutes)
  },

  // Organizer routes (organizer role required)
  {
    path: 'organizer',
    loadChildren: () => import('./features/organizer/organizer.routes').then(m => m.organizerRoutes)
  },

  // Moderator routes (moderator role required)
  {
    path: 'moderator',
    loadChildren: () => import('./features/moderator/moderator.routes').then(m => m.moderatorRoutes)
  },

  // Referee routes (referee role required)
  {
    path: 'referee',
    loadChildren: () => import('./features/referee/referee.routes').then(m => m.refereeRoutes)
  },

  // Admin routes (admin role required)
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.adminRoutes)
  },

  // Redirect unknown routes to home
  {
    path: '**',
    redirectTo: ''
  }
];
