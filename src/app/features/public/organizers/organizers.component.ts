import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-organizers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './organizers.component.html'
})
export class OrganizersComponent {
  // Mock data for now, or fetch from API
  organizers = [
    { name: 'Tourno Official', badge: 'certified', tournaments: 15, followers: 1200, avatar: 'T' },
    { name: 'Elite Gaming', badge: 'certified', tournaments: 8, followers: 850, avatar: 'E' },
    { name: 'Community Cup', badge: 'regular', tournaments: 3, followers: 200, avatar: 'C' }
  ];

  plans = [
    {
      name: 'Organisateur Standard',
      price: 'Gratuit',
      priceDetail: '0 🪙 / mois',
      features: [
        'Création de tournois illimitée',
        'Tournois gratuits uniquement',
        'Gestion des brackets automatique',
        'Support basique',
        'Pas de badge'
      ],
      cta: 'Commencer Gratuitement',
      isPopular: false,
      color: 'slate',
      badge: false
    },
    {
      name: 'Organisateur Certifié',
      price: '25.000 FCFA',
      priceDetail: '50 🪙 (Frais unique)',
      features: [
        'Tout du plan Standard',
        'Tournois avec Cashprize 💰',
        'Badge "Certifié" ✅',
        'Visibilité accrue',
        'Support prioritaire 24/7'
      ],
      cta: 'Devenir Certifié',
      isPopular: true,
      color: 'blue',
      badge: true
    }
  ];
}
