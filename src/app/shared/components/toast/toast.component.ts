import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from '../../../core/services/toast.service';
import { animate, style, transition, trigger, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('300ms cubic-bezier(0.2, 0, 0, 1)', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms cubic-bezier(0.2, 0, 0, 1)', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ],
  template: `
    <div class="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <div *ngFor="let toast of toastService.toasts$ | async; trackBy: trackById" 
           [@toastAnimation]
           class="pointer-events-auto rounded-xl p-4 shadow-lg border backdrop-blur-md flex items-start gap-3 transition-colors"
           [ngClass]="getToastClasses(toast)">
        
        <!-- Icons -->
        <span class="shrink-0 mt-0.5">
          <svg *ngIf="toast.type === 'success'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          <svg *ngIf="toast.type === 'error'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <svg *ngIf="toast.type === 'info'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <svg *ngIf="toast.type === 'warning'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
        </span>

        <p class="text-sm font-medium leading-tight">{{ toast.message }}</p>

        <button (click)="toastService.remove(toast.id)" class="shrink-0 ml-auto opacity-70 hover:opacity-100">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
    </div>
  `
})
export class ToastComponent {
  toastService = inject(ToastService);

  trackById(index: number, toast: Toast) {
    return toast.id;
  }

  getToastClasses(toast: Toast) {
    switch (toast.type) {
      case 'success': return 'bg-slate-900/90 border-green-500/30 text-green-400';
      case 'error': return 'bg-slate-900/90 border-red-500/30 text-red-400';
      case 'warning': return 'bg-slate-900/90 border-yellow-500/30 text-yellow-400';
      case 'info': return 'bg-slate-900/90 border-blue-500/30 text-blue-400';
      default: return 'bg-slate-900/90 border-slate-700 text-slate-300';
    }
  }
}
