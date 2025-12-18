import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  features = [
    {
      title: 'Rapide & Simple',
      description: "Inscription en 30 secondes. Connectez-vous et jouez immédiatement.",
      icon: '⚡'
    },
    {
      title: 'Automatisé',
      description: "Appariements et scores gérés automatiquement. Zéro prise de tête.",
      icon: '🤖'
    },
    {
      title: 'Sécurisé',
      description: "Vos données et transactions sont protégées. Jouez en toute sérénité.",
      icon: '🛡️'
    },
    {
      title: 'Multi-Jeux',
      description: "Support pour E-Football, FC Mobile et plus encore.",
      icon: '🎮'
    }
  ];

  formats = [
    {
      title: 'Format Suisse',
      description: "Système équitable où vous jouez tous les matchs. Pas d'élimination directe. Affrontez des adversaires de votre niveau à chaque ronde.",
      icon: '🇨🇭',
      color: 'text-red-400',
      bg: 'bg-red-500/10'
    },
    {
      title: 'Ligue (Championnat)',
      description: "Le format classique. Affrontez tous les joueurs de votre poule en match aller (ou aller-retour). La régularité est la clé du succès.",
      icon: '📅',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10'
    },
    {
      title: 'Coupe (Bracket)',
      description: "Adrénaline pure. Arbre à élimination directe (1/8, 1/4, 1/2). Une seule défaite et c'est fini. Pour les joueurs qui aiment la pression.",
      icon: '🏆',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10'
    }
  ];

  games = [
    { name: 'E-Football', players: '125', color: 'from-blue-600 to-blue-900', icon: '🎮' },
    { name: 'FC Mobile', players: '89', color: 'from-red-600 to-red-900', icon: '⚽' },
    { name: 'Dream League', players: '67', color: 'from-green-600 to-green-900', icon: '🏟️' }
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
