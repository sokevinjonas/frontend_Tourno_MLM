
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-divisions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './divisions.component.html',
  styleUrls: ['./divisions.component.css']
})
export class DivisionsComponent {

  currentSeason = {
    name: 'Saison 3',
    period: 'Janvier - Mars 2025',
    status: 'Inscriptions Ouvertes',
    fee: 8, // in MLM
    totalPrizePool: '5,000,000 F', 
    participants: 450,
    daysLeft: 12
  };

  divisions = [
    {
      id: 'D1',
      name: 'Division 1 : Elite',
      description: 'L\'arène des dieux. Seul le Top 100 de la saison précédente peut y accéder.',
      requirements: 'Top 100 MLM Rank',
      rewards: 'Prize pool exclusif + Badge Légendaire',
      color: 'from-orange-500 to-yellow-600',
      icon: '🏆'
    },
    {
      id: 'D2',
      name: 'Division 2 : Pro',
      description: 'Pour les joueurs confirmés qui visent le sommet.',
      requirements: 'Niveau 20+ ou qualification D3',
      rewards: 'Accès tournois Pro + Multiplicateur x1.5',
      color: 'from-purple-500 to-pink-600',
      icon: '⚔️'
    },
    {
      id: 'D3',
      name: 'Division 3 : Challenger',
      description: 'Le point de départ des futurs champions.',
      requirements: 'Niveau 10+',
      rewards: 'Points de classement standards',
      color: 'from-blue-500 to-cyan-600',
      icon: '🛡️'
    },
    {
      id: 'D4',
      name: 'Division 4 : Rookie',
      description: 'Zone d\'apprentissage. Pas de relégation possible.',
      requirements: 'Ouvert à tous',
      rewards: 'Expérience doublée',
      color: 'from-gray-500 to-gray-700',
      icon: '🌱'
    }
  ];

}
