import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'verify',
    loadComponent: () => import('./verify/verify.component').then(m => m.VerifyComponent)
  },
  {
    path: 'verify-code',
    loadComponent: () => import('./verify-code/verify-code.component').then(m => m.VerifyCodeComponent)
  },
  {
    path: 'complete-profile',
    loadComponent: () => import('./complete-profile/complete-profile.component').then(m => m.CompleteProfileComponent)
  }
];
