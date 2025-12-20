import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService, User } from '../../../core/services/auth.service';
import { OrganizerService } from '../../../core/services/organizer.service';
import { Organizer } from '../../../core/models/organizer.model';

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
  
  organizers: Organizer[] = [];
  followedOrganizerIds = new Set<number>();
  loading = false;

  constructor(
    private authService: AuthService,
    private organizerService: OrganizerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.userBalance = user?.wallet?.balance || 0;
      if (user) {
        this.checkMyFollowing();
      }
    });
    this.loadOrganizers();
  }

  loadOrganizers() {
    this.loading = true;
    const params: any = {};
    if (this.showCertifiedOnly) {
      params.badge = 'certified';
    }
    
    this.organizerService.getOrganizers(params).subscribe({
      next: (res) => {
        this.organizers = res.organizers;
        console.log(this.organizers);
        
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading organizers', err);
        this.loading = false;
      }
    });
  }

  checkMyFollowing() {
     this.organizerService.getMyFollowing().subscribe(res => {
        this.followedOrganizerIds = new Set(res.following.map(o => o.id));
     });
  }

  toggleFollow(org: Organizer) {
    if (!this.currentUser) {
       this.router.navigate(['/login']);
       return;
    }
    
    const isFollowing = this.followedOrganizerIds.has(org.id);
    // Optimistic update
    if (isFollowing) {
       this.followedOrganizerIds.delete(org.id);
       org.followers--;
    } else {
       this.followedOrganizerIds.add(org.id);
       org.followers++;
    }

    this.organizerService.followOrganizer(org.id).subscribe({
      next: (res) => {
        if (res.is_following) {
           this.followedOrganizerIds.add(org.id);
        } else {
           this.followedOrganizerIds.delete(org.id);
        }
        org.followers = res.followers_count;
      },
      error: (err) => {
        // Revert
        if (isFollowing) {
           this.followedOrganizerIds.add(org.id);
           org.followers++;
        } else {
           this.followedOrganizerIds.delete(org.id);
           org.followers--;
        }
      }
    });
  }
  
  isFollowing(org: Organizer): boolean {
     return this.followedOrganizerIds.has(org.id);
  }

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
      return matchesSearch;
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
    this.loadOrganizers();
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
