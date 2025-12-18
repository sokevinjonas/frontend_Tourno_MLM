import { Routes } from '@angular/router';

export const publicRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  // {
  //   path: 'register',
  //   loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)
  // },
  // {
  //   path: 'tournaments',
  //   loadComponent: () => import('./tournaments/tournaments.component').then(m => m.TournamentsComponent)
  // },
  // {
  //   path: 'divisions',
  //   loadComponent: () => import('./divisions/divisions.component').then(m => m.DivisionsComponent)
  // },
  // {
  //   path: 'rankings',
  //   loadComponent: () => import('./rankings/rankings.component').then(m => m.RankingsComponent)
  // }
];
