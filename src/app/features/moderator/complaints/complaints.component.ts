import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-complaints',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">ComplaintsComponent</h1>
      <p class="text-gray-600">This feature is under construction.</p>
    </div>
  `
})
export class ComplaintsComponent {}
