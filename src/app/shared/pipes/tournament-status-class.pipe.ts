import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tournamentStatusClass',
  standalone: true
})
export class TournamentStatusClassPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return 'bg-slate-700/50 text-slate-400';
    
    switch (value.toLowerCase()) {
      case 'open':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in_progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'completed':
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'draft':
        return 'bg-slate-700/50 text-slate-400 border-slate-600';
      default:
        return 'bg-slate-700/50 text-slate-500 border-slate-700';
    }
  }
}
