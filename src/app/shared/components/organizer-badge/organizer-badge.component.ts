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
  @Input() badge: 'certified' | 'verified' | 'partner' | string | boolean | null | undefined = null;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  get badgeType(): string | null {
    if (this.badge === 'certified' || this.badge === 'verified' || this.badge === 'partner') {
      return this.badge;
    }
    // Handle booleans (backward compatibility or simple API responses)
    if (this.badge === true || this.badge === 'true') {
      return 'certified'; // Default to certified (blue) as it was the previous look
    }
    return null;
  }

  getBadgeDescription(type: string | null): string {
    switch (type) {
      case 'certified': return 'Organisateur officiel certifié par la plateforme.';
      case 'verified': return "L'identité de cet organisateur a été vérifiée.";
      case 'partner': return 'Partenaire officiel de Tourno.';
      default: return '';
    }
  }
}
