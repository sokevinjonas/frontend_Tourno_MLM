import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

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
      icon: '🎮',
      title: 'Participe à des tournois',
      description: 'Inscris-toi à des tournois e-sports mobile gratuits ou payants'
    },
    {
      icon: '🏆',
      title: 'Gagne de l\'argent réel',
      description: 'Prize pools en FCFA directement sur ton Mobile Money'
    },
    {
      icon: '📊',
      title: 'Progresse en division',
      description: 'Grimpe de D4 à D1 et deviens un champion'
    },
    {
      icon: '💰',
      title: 'Organise tes tournois',
      description: 'Crée tes propres tournois et gagne des commissions'
    }
  ];

  games = [
    { name: 'E-football', icon: '⚽', color: 'bg-blue-500' },
    { name: 'FC Mobile', icon: '🎯', color: 'bg-green-500' },
    { name: 'Dream League Soccer', icon: '🏟️', color: 'bg-purple-500' }
  ];

  howItWorks = [
    {
      step: '1',
      title: 'Crée ton compte',
      description: 'Inscription rapide avec Google, Facebook ou Email',
      icon: '👤'
    },
    {
      step: '2',
      title: 'Inscris-toi à un tournoi',
      description: 'Choisis parmi des centaines de tournois disponibles',
      icon: '🎯'
    },
    {
      step: '3',
      title: 'Joue et gagne',
      description: 'Affronte d\'autres joueurs et remporte le prize pool',
      icon: '💎'
    }
  ];

  testimonials = [
    {
      name: 'Karim D.',
      country: 'Sénégal',
      avatar: 'K',
      text: 'J\'ai gagné 50,000 FCFA lors de mon premier tournoi ! MLM a changé ma vie.',
      rating: 5
    },
    {
      name: 'Aminata T.',
      country: 'Côte d\'Ivoire',
      avatar: 'A',
      text: 'Plateforme fiable et paiements rapides. Je recommande à 100%.',
      rating: 5
    },
    {
      name: 'Moussa K.',
      country: 'Mali',
      avatar: 'M',
      text: 'En tant qu\'organisateur, je génère des revenus tout en créant ma communauté.',
      rating: 5
    }
  ];
}
