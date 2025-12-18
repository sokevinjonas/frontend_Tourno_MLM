import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-finances',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">FinancesComponent</h1>
      <p class="text-gray-600">This feature is under construction.</p>
    </div>
  `
})
export class FinancesComponent {}
