import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-match-deadlines',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './match-deadlines.component.html',
  styleUrl: './match-deadlines.component.css'
})
export class MatchDeadlinesComponent {}
