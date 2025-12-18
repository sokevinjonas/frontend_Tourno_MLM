import { Routes } from '@angular/router';

export const organizerRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'tournaments',
    loadComponent: () => import('./tournaments/tournaments.component').then(m => m.TournamentsComponent)
  },
  {
    path: 'create-tournament',
    loadComponent: () => import('./create-tournament/create-tournament.component').then(m => m.CreateTournamentComponent)
  },
  {
    path: 'tournaments/:id',
    loadComponent: () => import('./tournament-detail/tournament-detail.component').then(m => m.TournamentDetailComponent)
  },
  {
    path: 'stats',
    loadComponent: () => import('./stats/stats.component').then(m => m.StatsComponent)
  },
  {
    path: 'certification',
    loadComponent: () => import('./certification/certification.component').then(m => m.CertificationComponent)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
