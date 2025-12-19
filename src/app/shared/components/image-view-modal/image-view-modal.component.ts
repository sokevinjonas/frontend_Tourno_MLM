import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-view-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="imageUrl" class="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in" (click)="onClose()">
       <div class="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
          <button (click)="onClose()" class="absolute -top-12 right-0 text-white hover:text-slate-300 transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <img [src]="imageUrl" class="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain border border-slate-700" (click)="$event.stopPropagation()">
       </div>
    </div>
  `
})
export class ImageViewModalComponent {
  @Input() imageUrl: string | null = null;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
