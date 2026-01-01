import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService, User } from '../../../core/services/auth.service';
import { OrganizerService } from '../../../core/services/organizer.service';
import { Organizer } from '../../../core/models/organizer.model';
import { ToastService } from '../../../core/services/toast.service';
import { OrganizerBadgeComponent } from '../../../shared/components/organizer-badge/organizer-badge.component';

@Component({
  selector: 'app-organizers',
  standalone: true,
  imports: [CommonModule, RouterLink, OrganizerBadgeComponent],
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
  followedOrganizerUuids = new Set<string>();
  loading = false;

  // New properties
  isOrganizer = false;
  userBadge: string | null = null;
  selectedPlan: any = null;

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
            this.userBadge = res.badge;
            this.cd.detectChanges();
          },
          error: (err) => {
            this.isOrganizer = false;
            this.userBadge = null;
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
        this.followedOrganizerUuids = new Set(res.following.map(o => o.uuid));
     });
  }
  toggleFollow(org: Organizer) {
    if (!this.currentUser) {
       this.router.navigate(['/login']);
       return;
    }
    
    const isFollowing = this.followedOrganizerUuids.has(org.uuid);
    // Optimistic update
    if (isFollowing) {
       this.followedOrganizerUuids.delete(org.uuid);
       org.followers--;
    } else {
       this.followedOrganizerUuids.add(org.uuid);
       org.followers++;
    }

    this.organizerService.followOrganizer(org.uuid).subscribe({
      next: (res) => {
        if (res.is_following) {
           this.followedOrganizerUuids.add(org.uuid);
        } else {
           this.followedOrganizerUuids.delete(org.uuid);
        }
        org.followers = res.followers_count;
      },
      error: (err) => {
        // Revert
        if (isFollowing) {
           this.followedOrganizerUuids.add(org.uuid);
           org.followers++;
        } else {
           this.followedOrganizerUuids.delete(org.uuid);
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
     return this.followedOrganizerUuids.has(org.uuid);
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
      type: 'standard',
      cost: 0
    },
    {
      name: 'Organisateur Certifié',
      price: '50 🪙',
      priceDetail: '25.000 FCFA',
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
      type: 'certified',
      cost: 50
    },
    {
      name: 'Organisateur Vérifié',
      price: '200 🪙',
      priceDetail: '100.000 FCFA',
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
      type: 'verified',
      cost: 200
    }
  ];

  handlePlanClick(plan: any) {
    // Check standard plan
    if (plan.type === 'standard') {
      this.router.navigate(['/register']);
      return;
    }

    if (!this.authService.isAuthenticated()) {
      this.toastService.info('Veuillez vous connecter pour choisir un plan.');
      this.router.navigate(['/login']);
      return;
    }

    // Logic for paid plans
    if (plan.type === 'certified' || plan.type === 'verified') {
        if (this.isOrganizer && plan.type === 'certified' && this.userBadge === 'certified') {
            this.toastService.info('Vous êtes déjà Organisateur Certifié.');
            return;
        }
        // Open payment modal
        this.selectedPlan = plan;
        this.showModal = true;
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

  getPlanCta(plan: any): string {
    if (this.userBadge === 'certified' && plan.type === 'certified') {
      return 'Déjà Certifié';
    }
    if (this.userBadge === 'verified' && plan.type === 'verified') {
      return 'Déjà Vérifié';
    }
    return plan.cta;
  }

  closeModal() {
    this.showModal = false;
    this.selectedPlan = null;
  }

  showSuccessModal = false;

  confirmPayment() {
    const planType = this.selectedPlan.type;

    this.organizerService.subscribeToPlan(planType).subscribe({
      next: (res) => {
        this.closeModal(); 
        
        if (planType === 'verified') {
             this.toastService.success('Paiement réussi ! Vous devez maintenant compléter votre vérification.');
             this.authService.getCurrentUser().subscribe(() => {
                 this.router.navigate(['/profile']);
             });
        } else {
             this.showSuccessModal = true;
             this.loadOrganizers();
             this.authService.getCurrentUser().subscribe(() => {
                 this.router.navigate(['/organizers/dashboard']);
             });
             this.toastService.success("Paiement réussi ! Vous pouvez maintenant créer des tournois.");
        }
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

  get requiredAmount(): number {
      return this.selectedPlan?.cost || 0;
  }

  get canAfford(): boolean {
    return this.userBalance >= this.requiredAmount;
  }
}

