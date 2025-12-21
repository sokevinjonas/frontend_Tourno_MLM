import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gameColor',
  standalone: true
})
export class GameColorPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return 'text-slate-400';
    
    switch (value.toLowerCase()) {
      case 'efootball':
        return 'text-blue-400';
      case 'fc_mobile':
        return 'text-cyan-400';
      case 'dream_league_soccer':
        return 'text-purple-400';
      default:
        return 'text-slate-400';
    }
  }
}
