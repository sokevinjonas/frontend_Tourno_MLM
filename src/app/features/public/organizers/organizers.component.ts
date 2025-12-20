import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService, User } from '../../../core/services/auth.service';

@Component({
  selector: 'app-organizers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './organizers.component.html'
})
export class OrganizersComponent implements OnInit {
  searchTerm = '';
  showCertifiedOnly = false;
  currentPage = 1;
  pageSize = 9;

  showModal = false;
  userBalance = 0;
  readonly REQUIRED_AMOUNT = 50;
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.userBalance = user?.wallet?.balance || 0;
    });
  }

  organizers = [
    { name: 'Tourno Official', badge: 'certified', tournaments: 42, followers: 12500, avatar: 'T' },
    { name: 'Elite Gaming', badge: 'certified', tournaments: 18, followers: 850, avatar: 'E' },
    { name: 'Community Cup', badge: 'regular', tournaments: 3, followers: 200, avatar: 'C' },
    { name: 'Pro League Africa', badge: 'certified', tournaments: 12, followers: 3500, avatar: 'P' },
    { name: 'Sunday Scrims', badge: 'regular', tournaments: 5, followers: 150, avatar: 'S' },
    { name: 'Master Class', badge: 'certified', tournaments: 20, followers: 5000, avatar: 'M' },
    { name: 'Rookie Tournaments', badge: 'regular', tournaments: 1, followers: 45, avatar: 'R' },
    { name: 'FIFA Kings', badge: 'certified', tournaments: 7, followers: 920, avatar: 'F' },
    { name: 'Mobile Legends', badge: 'regular', tournaments: 4, followers: 300, avatar: 'M' },
    { name: 'Abidjan Games', badge: 'certified', tournaments: 10, followers: 2100, avatar: 'A' },
    { name: 'Dakar eSports', badge: 'certified', tournaments: 18, followers: 4200, avatar: 'D' },
    { name: 'Lomé Gaming', badge: 'regular', tournaments: 2, followers: 80, avatar: 'L' },
    { name: 'Bamako Arena', badge: 'certified', tournaments: 6, followers: 750, avatar: 'B' },
    { name: 'Cotonou Clash', badge: 'regular', tournaments: 3, followers: 120, avatar: 'C' },
    { name: 'Yaoundé Fighters', badge: 'certified', tournaments: 9, followers: 1300, avatar: 'Y' }
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

  get filteredOrganizers() {
    return this.organizers.filter(org => {
      const matchesSearch = org.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCertified = this.showCertifiedOnly ? org.badge === 'certified' : true;
      return matchesSearch && matchesCertified;
    });
  }

  get paginatedOrganizers() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredOrganizers.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.filteredOrganizers.length / this.pageSize);
  }

  get pages() {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  toggleCertifiedFilter() {
    this.showCertifiedOnly = !this.showCertifiedOnly;
    this.currentPage = 1;
  }

  handleCertifiedClick() {
    if (!this.currentUser) {
      this.router.navigate(['/register'], { queryParams: { role: 'organizer', type: 'certified' } });
      return;
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  confirmPayment() {
    this.closeModal();
    // In a real app, this would call a service to deduct coins and update role
    console.log('Payment confirmed');
    alert('Félicitations ! Vous avez souscrit au pack Organisateur Certifié.');
  }

  get canAfford(): boolean {
    return this.userBalance >= this.REQUIRED_AMOUNT;
  }
}
