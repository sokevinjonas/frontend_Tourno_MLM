import { Routes } from '@angular/router';

export const playerRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'tournaments',
    loadComponent: () => import('./tournaments/tournaments.component').then(m => m.TournamentsComponent)
  },
  {
    path: 'tournaments/:id',
    loadComponent: () => import('./tournament-detail/tournament-detail.component').then(m => m.TournamentDetailComponent)
  },
  {
    path: 'my-matches',
    loadComponent: () => import('./my-matches/my-matches.component').then(m => m.MyMatchesComponent)
  },
  {
    path: 'matches/:id/submit',
    loadComponent: () => import('./match-submit/match-submit.component').then(m => m.MatchSubmitComponent)
  },
  {
    path: 'my-teams',
    loadComponent: () => import('./my-teams/my-teams.component').then(m => m.MyTeamsComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: 'history',
    loadComponent: () => import('./history/history.component').then(m => m.HistoryComponent)
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent)
  },
  {
    path: 'become-organizer',
    loadComponent: () => import('./become-organizer/become-organizer.component').then(m => m.BecomeOrganizerComponent)
  },
  // Redirect to dashboard by default
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
