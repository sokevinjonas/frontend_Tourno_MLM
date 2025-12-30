import { Routes } from '@angular/router';

export const publicRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'faq',
    loadComponent: () => import('./faq/faq.component').then(m => m.FaqComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'how-it-works',
    loadComponent: () => import('./how-it-works/how-it-works.component').then(m => m.HowItWorksComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'auth/verify',
    loadComponent: () => import('./auth-verify/auth-verify.component').then(m => m.AuthVerifyComponent)
  },
  {
    path: 'tournaments',
    loadComponent: () => import('./tournaments/tournaments.component').then(m => m.TournamentsComponent)
  },
  {
    path: 'tournaments/:id',
    loadComponent: () => import('./tournament-details/tournament-details.component').then(m => m.TournamentDetailsComponent)
  },
  {
    path: 'divisions',
    loadComponent: () => import('./divisions/divisions.component').then(m => m.DivisionsComponent)
  },
  {
    path: 'rankings',
    loadComponent: () => import('./rankings/rankings.component').then(m => m.RankingsComponent)
  },
  {
    path: 'organizers',
    loadComponent: () => import('./organizers/organizers.component').then(m => m.OrganizersComponent)
  },
  {
    path: 'guides/match-deadlines',
    loadComponent: () => import('./guides/match-deadlines/match-deadlines.component').then(m => m.MatchDeadlinesComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'terms',
    loadComponent: () => import('./legal/terms/terms.component').then(m => m.TermsComponent)
  },
  {
    path: 'privacy',
    loadComponent: () => import('./legal/privacy/privacy.component').then(m => m.PrivacyComponent)
  },
  {
    path: 'mentions',
    loadComponent: () => import('./legal/mentions/mentions.component').then(m => m.MentionsComponent)
  }
];
