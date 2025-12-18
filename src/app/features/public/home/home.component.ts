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
  stats = [
    { value: '1,234', label: 'Joueurs Actifs', icon: '👥' },
    { value: '87', label: 'Tournois', icon: '🏆' },
    { value: '456', label: 'Matchs Joués', icon: '⚽' },
    { value: '15k', label: 'Pièces Gagnées', icon: '⚡' }
  ];

  games = [
    { name: 'E-Football', players: '125', color: 'from-blue-500 to-blue-700', icon: '🎮' },
    { name: 'FC Mobile', players: '89', color: 'from-red-500 to-red-700', icon: '⚽' },
    { name: 'Dream League', players: '67', color: 'from-green-500 to-green-700', icon: '🏟️' }
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
