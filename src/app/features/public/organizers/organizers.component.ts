import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService, User } from '../../../core/services/auth.service';
import { OrganizerService } from '../../../core/services/organizer.service';
import { Organizer } from '../../../core/models/organizer.model';
import { ToastService } from '../../../core/services/toast.service';

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

  // New properties
  isOrganizer = false;
  userBadge: string | null = null;

  constructor(
    private authService: AuthService,
    private organizerService: OrganizerService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.loadOrganizers();
    
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user; 
      this.userBalance = user?.wallet?.balance || 0; 

      if (user) {
        this.checkMyFollowing(); 
        
        this.organizerService.checkIfOrganizer().subscribe({
          next: (res) => {
            this.isOrganizer = res.is_organizer;
            this.cd.detectChanges();
          },
          error: (err) => {
            this.isOrganizer = false;
          }
        });
      } else {
        this.isOrganizer = false;
      }
    });
  }

  loadOrganizers() {
    this.loading = true;
    const params: any = {};
    if (this.showCertifiedOnly) {
      params.badge = 'certified';
    }
    
    this.organizerService.getOrganizers(params).subscribe({
      next: (res) => {
        if (Array.isArray(res)) {
          this.organizers = res;
        } else if (res && Array.isArray(res.organizers)) {
          this.organizers = res.organizers;
        } else {
          this.organizers = [];
        }
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error loading organizers', err);
        this.loading = false;
        this.cd.detectChanges();
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

        // Display error message via Toast
        if (err.error && err.error.message) {
          this.toastService.error(err.error.message);
        } else {
          this.toastService.error("Une erreur est survenue.");
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
      price: '0 🪙',
      priceDetail: '0 FCFA',
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
      badge: false,
      type: 'standard'
    },
    {
      name: 'Organisateur Vérifié',
      price: '50 🪙',
      priceDetail: '25.000 FCFA',
      features: [
        'Tout du plan Standard',
        'Badge "Vérifié"',
        'Validation d\'identité',
        'Plus de confiance',
        'Support standard'
      ],
      cta: 'Devenir Vérifié',
      isPopular: false,
      color: 'emerald',
      badge: true,
      type: 'verified'
    },
    {
      name: 'Organisateur Certifié',
      price: '200 🪙',
      priceDetail: '1000.000 FCFA',
      features: [
        'Tout du plan Standard',
        'Tournois avec Cashprize',
        'Badge "Certifié"',
        'Visibilité accrue',
        'Support prioritaire 24/7'
      ],
      cta: 'Devenir Certifié',
      isPopular: true,
      color: 'blue',
      badge: true,
      type: 'certified'
    }
  ];

  handlePlanClick(plan: any) {
    if (plan.type === 'standard') {
      this.router.navigate(['/register']);
      return;
    }

    if (plan.type === 'verified') {
       this.toastService.info('La certification "Vérifié" sera bientôt disponible !');
       return;
    }

    if (plan.type === 'certified') {
       this.handleCertifiedClick();
    }
  }

  get filteredOrganizers() {
    if (!this.organizers) return [];
    return this.organizers.filter(org => {
      const name = org.name || '';
      return name.toLowerCase().includes(this.searchTerm.toLowerCase());
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

  getBadgeDescription(type: string | null): string {
    switch (type) {
      case 'certified': return 'Organisateur officiel certifié par la plateforme.';
      case 'verified': return "L'identité de cet organisateur a été vérifiée.";
      case 'partner': return 'Partenaire officiel de Tourno.';
      default: return '';
    }
  }

  get isAlreadyCertified(): boolean {
    return this.isOrganizer;
  }

  handleCertifiedClick() {
    if (this.isAlreadyCertified) {
      return;
    }

    if (!this.authService.isAuthenticated()) {
      this.toastService.info('Veuillez vous connecter pour devenir un organisateur certifié.');
      return;
    }
    
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  showSuccessModal = false;

  confirmPayment() {
    this.organizerService.subscribeToCertified().subscribe({
      next: (res) => {
        this.closeModal(); 
        this.showSuccessModal = true;
        
        this.authService.getCurrentUser().subscribe();
        this.loadOrganizers();
      },
      error: (err) => {
        console.error('Subscription error', err);
        this.closeModal();
        const msg = err.error?.message || 'Une erreur est survenue lors de la souscription. Veuillez réessayer.';
        this.toastService.error(msg);
      }
    });
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
  }

  get canAfford(): boolean {
    return this.userBalance >= this.REQUIRED_AMOUNT;
  }
}
