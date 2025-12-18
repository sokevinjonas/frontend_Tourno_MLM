import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'users',
    loadComponent: () => import('./users/users.component').then(m => m.UsersComponent)
  },
  {
    path: 'users/:id',
    loadComponent: () => import('./user-detail/user-detail.component').then(m => m.UserDetailComponent)
  },
  {
    path: 'tournaments',
    loadComponent: () => import('./tournaments/tournaments.component').then(m => m.TournamentsComponent)
  },
  {
    path: 'finances',
    loadComponent: () => import('./finances/finances.component').then(m => m.FinancesComponent)
  },
  {
    path: 'stats',
    loadComponent: () => import('./stats/stats.component').then(m => m.StatsComponent)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
