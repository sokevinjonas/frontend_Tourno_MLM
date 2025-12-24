import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../core/services/admin.service';
import { User, PaginatedResponse, PaginationMeta } from '../../../core/models/user.model';
import { ToastService } from '../../../core/services/toast.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  
  private cd = inject(ChangeDetectorRef);
  users: User[] = [];
  pagination: PaginationMeta | null = null;
  loading = true;
  submitting = false;

  filters = {
    search: '',
    role: '',
    profile_status: '',
    page: 1
  };

  private searchSubject = new Subject<string>();

  showAddFundsModal = false;
  selectedUser: User | null = null;
  fundForm = {
    amount: 0,
    description: ''
  };

  constructor(
    private adminService: AdminService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.loadUsers();

    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(value => {
      this.filters.search = value;
      this.filters.page = 1;
      this.loadUsers();
    });
  }

  onSearchChange(event: any) {
    this.searchSubject.next(event.target.value);
  }

  onRoleChange() {
    this.filters.page = 1;
    this.loadUsers();
  }

  onStatusChange() {
    this.filters.page = 1;
    this.loadUsers();
  }

  onPageChange(page: number) {
    this.filters.page = page;
    this.loadUsers();
  }

  getPages(): number[] {
    if (!this.pagination) return [];
    return Array.from({ length: this.pagination.last_page }, (_, i) => i + 1);
  }

  mathMin(a: number, b: number): number {
    return Math.min(a, b);
  }

  loadUsers() {
    this.loading = true;
    this.adminService.getUsers(this.filters).subscribe({
      next: (res: PaginatedResponse<User>) => {
        this.users = res.data;
        this.pagination = res.pagination;
        this.loading = false;
        this.cd.markForCheck();
      },
      error: (err) => {
        console.error('Error loading users', err);
        this.toastService.error('Erreur lors du chargement des utilisateurs.');
        this.loading = false;
        this.cd.markForCheck();
      }
    });
  }

  openAddFundsModal(user: User) {
    this.selectedUser = user;
    this.fundForm = {
      amount: 0,
      description: ''
    };
    this.showAddFundsModal = true;
  }

  closeAddFundsModal() {
    this.showAddFundsModal = false;
    this.selectedUser = null;
  }

  confirmAddFunds() {
    if (!this.selectedUser || this.fundForm.amount <= 0) return;
    this.submitting = true;

    this.adminService.addFunds(
      this.selectedUser.id, 
      this.fundForm.amount, 
      this.fundForm.description
    ).subscribe({
      next: (res) => {
        this.toastService.success(`Fonds ajoutés avec succès à ${this.selectedUser?.name}.`);
        this.closeAddFundsModal();
        this.submitting = false;
        this.loadUsers(); // Refresh to see updated balance if available
      },
      error: (err) => {
        this.toastService.error('Erreur lors de l\'ajout des fonds.');
        this.submitting = false;
      }
    });
  }
}
