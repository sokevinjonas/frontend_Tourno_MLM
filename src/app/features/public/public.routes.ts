import { Routes } from '@angular/router';

export const publicRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    data: { seo: { title: 'L\'Elite du Gaming Africain', description: 'Rejoignez la plus grande communauté de gamers en Afrique. Participez à des tournois, suivez vos classements et gagnez des prix.' } }
  },
  {
    path: 'faq',
    loadComponent: () => import('./faq/faq.component').then(m => m.FaqComponent),
    data: { seo: { title: 'Questions Fréquentes (FAQ)', description: 'Tout ce qu\'il faut savoir sur le fonctionnement de GPA, les tournois, les prix et la sécurité.' } }
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.component').then(m => m.AboutComponent),
    data: { seo: { title: 'À Propos de Nous', description: 'Découvrez la vision et l\'équipe derrière G4MEPRO AFRICA, moteur de l\'e-sport sur le continent.' } }
  },
  {
    path: 'how-it-works',
    loadComponent: () => import('./how-it-works/how-it-works.component').then(m => m.HowItWorksComponent),
    data: { seo: { title: 'Comment ça marche ?', description: 'Apprenez à vous inscrire, participer à des tournois et retirer vos gains sur GPA.' } }
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    data: { seo: { title: 'Connexion', description: 'Connectez-vous à votre compte G4MEPRO AFRICA pour accéder aux tournois.' } }
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent),
    data: { seo: { title: 'Inscription', description: 'Créez votre compte GPA et commencez votre aventure e-sport dès aujourd\'hui.' } }
  },
  {
    path: 'tournaments',
    loadComponent: () => import('./tournaments/tournaments.component').then(m => m.TournamentsComponent),
    data: { seo: { title: 'Tournois en Cours', description: 'Parcourez la liste des tournois actifs et inscrivez-vous pour prouver votre talent.' } }
  },
  {
    path: 'tournaments/:uuid',
    loadComponent: () => import('./tournament-details/tournament-details.component').then(m => m.TournamentDetailsComponent)
  },
  {
    path: 'divisions',
    loadComponent: () => import('./divisions/divisions.component').then(m => m.DivisionsComponent),
    data: { seo: { title: 'Divisions & Grades', description: 'Découvrez le système de progression et les différents niveaux de compétition sur GPA.' } }
  },
  {
    path: 'rankings',
    loadComponent: () => import('./rankings/rankings.component').then(m => m.RankingsComponent),
    data: { seo: { title: 'Classements Généraux', description: 'Consultez les meilleurs joueurs et équipes du continent africain.' } }
  },
  {
    path: 'organizers',
    loadComponent: () => import('./organizers/organizers.component').then(m => m.OrganizersComponent),
    data: { seo: { title: 'Organisateurs Certifiés', description: 'Découvrez les organisateurs de tournois de confiance sur notre plateforme.' } }
  },
  {
    path: 'guides/match-deadlines',
    loadComponent: () => import('./guides/match-deadlines/match-deadlines.component').then(m => m.MatchDeadlinesComponent),
    data: { seo: { title: 'Guide des Deadlines de Matchs', description: 'Tout comprendre sur les délais de validation et les règles de ponctualité.' } }
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent),
    data: { seo: { title: 'Contactez-nous', description: 'Une question ou un problème ? Notre équipe de support est là pour vous aider.' } }
  },
  {
    path: 'terms',
    loadComponent: () => import('./legal/terms/terms.component').then(m => m.TermsComponent),
    data: { seo: { title: 'Conditions Générales d\'Utilisation', description: 'Consultez les règles et obligations régissant l\'utilisation de GPA.' } }
  },
  {
    path: 'privacy',
    loadComponent: () => import('./legal/privacy/privacy.component').then(m => m.PrivacyComponent),
    data: { seo: { title: 'Politique de Confidentialité', description: 'Comment nous protégeons vos données personnelles sur G4MEPRO AFRICA.' } }
  },
  {
    path: 'mentions',
    loadComponent: () => import('./legal/mentions/mentions.component').then(m => m.MentionsComponent),
    data: { seo: { title: 'Mentions Légales', description: 'Informations juridiques concernant l\'éditeur de la plateforme GPA.' } }
  }
];
