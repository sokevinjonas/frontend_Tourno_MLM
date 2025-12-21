import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tournamentStatus',
  standalone: true
})
export class TournamentStatusPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    
    switch (value.toLowerCase()) {
      case 'draft':
        return 'Brouillon';
      case 'open':
        return 'Inscriptions';
      case 'in_progress':
        return 'En cours';
      case 'completed':
        return 'Terminé';
      case 'cancelled':
        return 'Annulé';
      case 'payout_pending':
        return 'Paiements en cours';
      case 'payouts_completed':
        return 'Paiements terminés';
      case 'closed':
        return 'Fermé';
      default:
        return value.charAt(0).toUpperCase() + value.slice(1).replace('_', ' ');
    }
  }
}
