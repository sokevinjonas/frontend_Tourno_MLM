import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css']
})
export class HowItWorksComponent {
  steps = [
    {
      title: 'Inscription Gratuite',
      description: 'Créez votre compte en quelques secondes avec Google, Apple, ou Facebook. Pas de mot de passe à retenir.',
      icon: '🔐',
      color: 'blue'
    },
    {
      title: 'Validation du Profil',
      description: 'Ajoutez vos identifiants de jeu et uploadez un screenshot pour valider votre compte. Validation en 24-48h.',
      icon: '✅',
      color: 'emerald'
    },
    {
      title: 'Recharge & Inscription',
      description: 'Prenez vos Pièces GPA et inscrivez-vous au tournoi de votre choix parmi E-football, FC Mobile ou DLS.',
      icon: '🪙',
      color: 'yellow'
    },
    {
      title: 'Compétition & Résultats',
      description: 'Jouez vos matchs selon le Format Suisse. Soumettez vos scores avec preuves (screenshots) après chaque match.',
      icon: '⚽',
      color: 'indigo'
    },
    {
      title: 'Gains & Retraits',
      description: 'Accumulez des Pièces GPA grâce à vos victoires et retirez vos gains directement via Mobile Money.',
      icon: '💰',
      color: 'green'
    }
  ];
}
