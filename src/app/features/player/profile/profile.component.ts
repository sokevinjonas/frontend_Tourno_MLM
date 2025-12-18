import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent {
  privateauthService = inject(AuthService);
  currentUser$ = this.privateauthService.currentUser$;
}
