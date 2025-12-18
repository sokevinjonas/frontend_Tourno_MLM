import { Routes } from '@angular/router';

export const refereeRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'disputes',
    loadComponent: () => import('./disputes/disputes.component').then(m => m.DisputesComponent)
  },
  {
    path: 'disputes/:id',
    loadComponent: () => import('./dispute-detail/dispute-detail.component').then(m => m.DisputeDetailComponent)
  },
  {
    path: 'history',
    loadComponent: () => import('./history/history.component').then(m => m.HistoryComponent)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
