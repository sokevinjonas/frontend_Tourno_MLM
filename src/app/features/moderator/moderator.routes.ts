import { Routes } from '@angular/router';

export const moderatorRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'complaints',
    loadComponent: () => import('./complaints/complaints.component').then(m => m.ComplaintsComponent)
  },
  {
    path: 'complaints/:id',
    loadComponent: () => import('./complaint-detail/complaint-detail.component').then(m => m.ComplaintDetailComponent)
  },
  {
    path: 'validations',
    loadComponent: () => import('./validations/validations.component').then(m => m.ValidationsComponent)
  },
  {
    path: 'validations/:id',
    loadComponent: () => import('./validation-detail/validation-detail.component').then(m => m.ValidationDetailComponent)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
