import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private sanitizer = inject(DomSanitizer);
  private authService = inject(AuthService);
  
  currentUser$ = this.authService.currentUser$;

  sanitize(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  features = [
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
      title: 'Rapidité & Simplicité',
      description: 'Créez vos tournois en moins de 2 minutes. Notre interface intuitive s\'occupe de toute la complexité administrative pour vous.'
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/><path d="M13.5 16.5v.01"/><path d="M13.5 7.5v.01"/></svg>',
      title: 'Automatisation',
      description: 'Génération automatique des arbres, classements et plannings. Fini les fichiers Excel et les calculs manuels interminables.'
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
      title: '100% Sécurisé',
      description: 'Vos données et celles de vos joueurs sont protégées. Système de validation des scores pour éviter les tricheries.'
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4"/><path d="M16 12h2"/><path d="M8 8v8"/><path d="M18 8v8"/></svg>',
      title: 'Multi-Jeux',
      description: 'Compatible avec tous vos jeux compétitifs favoris : FIFA, Call of Duty, League of Legends, et bien d\'autres.'
    }
  ];

  formats = [
    {
      title: 'Format Suisse',
      description: "Système équitable où vous jouez tous les matchs. Pas d'élimination directe. Affrontez des adversaires de votre niveau à chaque ronde.",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>',
      color: 'text-red-400',
      bg: 'bg-red-500/10'
    },
    {
      title: 'Ligue (Championnat)',
      description: "Le format classique. Affrontez tous les joueurs de votre poule en match aller (ou aller-retour). La régularité est la clé du succès.",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10'
    },
    {
      title: 'Coupe (Bracket)',
      description: "Adrénaline pure. Arbre à élimination directe (1/8, 1/4, 1/2). Une seule défaite et c'est fini. Pour les joueurs qui aiment la pression.",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10'
    }
  ];

  games = [
    { 
      name: 'E-Football', 
      players: '125', 
      color: 'from-blue-600 to-blue-900', 
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4"/><path d="M16 12h2"/><path d="M8 8v8"/><path d="M18 8v8"/></svg>' 
    },
    { 
      name: 'FC Mobile', 
      players: '89', 
      color: 'from-red-600 to-red-900', 
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>' 
    },
    { 
      name: 'Call of Duty', 
      players: '450', 
      color: 'from-green-600 to-green-900', 
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>' 
    },
    { 
      name: 'Clash Royale', 
      players: '210', 
      color: 'from-purple-600 to-purple-900', 
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l-8 4v6c0 5.5 8 10 8 10s8-4.5 8-10V6l-8-4z"/><path d="M12 22V6"/></svg>' 
    }
  ];

  featuredTournaments = [
    {
      name: "Coupe d'Afrique",
      game: "E-football",
      price: 5,
      players: "24/32",
      date: "Dans 2 jours",
      isFull: false
    },
    {
      name: "Champions League",
      game: "FC Mobile",
      price: 10,
      players: "16/16",
      date: "Demain 14h",
      isFull: true
    },
    {
      name: "Weekend Cup",
      game: "DLS",
      price: 3,
      players: "8/16",
      date: "Dans 5h",
      isFull: false
    }
  ];
}
