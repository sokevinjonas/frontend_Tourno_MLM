import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../core/services/admin.service';
import { User } from '../../../core/models/user.model';
import { ToastService } from '../../../core/services/toast.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  
  private cd = inject(ChangeDetectorRef);
  users: User[] = [];
  loading = true;
  submitting = false;

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
  }

  loadUsers() {
    this.loading = true;
    this.adminService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
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
