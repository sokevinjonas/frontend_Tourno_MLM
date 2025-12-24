import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-organizer-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './organizer-badge.component.html',
  styleUrls: ['./organizer-badge.component.css']
})
export class OrganizerBadgeComponent {
  @Input() badge: 'certified' | 'verified' | 'partner' | string | null | undefined = null;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  getBadgeDescription(type: string | null): string {
    switch (type) {
      case 'certified': return 'Organisateur officiel certifié par la plateforme.';
      case 'verified': return "L'identité de cet organisateur a été vérifiée.";
      case 'partner': return 'Partenaire officiel de Tourno.';
      default: return '';
    }
  }
}
