import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent {
  isMenuOpen = false;
  isProfileMenuOpen = false;
  
  currentUser$;

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.isProfileMenuOpen = false;
      this.isMenuOpen = false;
      this.router.navigate(['/login']);
    });
  }
}
