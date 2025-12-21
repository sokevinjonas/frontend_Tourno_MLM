import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TournamentService } from '../../../core/services/tournament.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-create-tournament',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create-tournament.component.html',
  styleUrls: ['./create-tournament.component.css']
})
export class CreateTournamentComponent implements OnInit {
  tournamentForm: FormGroup;
  loading = false;
  
  games = [
    { value: 'efootball', label: 'E-football (PES)' },
    { value: 'fc_mobile', label: 'FC Mobile (FIFA)' },
    { value: 'dream_league_soccer', label: 'Dream League Soccer' }
  ];

  constructor(
    private fb: FormBuilder,
    private tournamentService: TournamentService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.tournamentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required]],
      game_type: ['efootball', [Validators.required]],
      max_participants: [8, [Validators.required]],
      entry_fee: [0, [Validators.required, Validators.min(0)]],
      prize_pool: [0, [Validators.required, Validators.min(0)]],
      visibility: ['public', [Validators.required]],
      auto_managed: [true],
      registration_start: ['', [Validators.required]],
      registration_end: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      rules: ['', [Validators.required]],
      prize_distribution: this.fb.group({
        '1': [0, [Validators.required]],
        '2': [0],
        '3': [0]
      })
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.tournamentForm.invalid) {
      this.toastService.error('Veuillez remplir correctement tous les champs obligatoires.');
      return;
    }

    // Basic date validation
    const val = this.tournamentForm.value;
    if (new Date(val.registration_end) <= new Date(val.registration_start)) {
      this.toastService.error('La fin des inscriptions doit être après le début.');
      return;
    }
    if (new Date(val.start_date) < new Date(val.registration_end)) {
      this.toastService.error('Le tournoi doit commencer après la fin des inscriptions.');
      return;
    }
    if (val.end_date && new Date(val.end_date) <= new Date(val.start_date)) {
      this.toastService.error('La fin du tournoi doit être après le début.');
      return;
    }

    this.loading = true;
    const formData = {
      ...this.tournamentForm.value,
      format: 'single_elimination',
      prize_distribution: JSON.stringify(this.tournamentForm.value.prize_distribution)
    };

    this.tournamentService.createTournament(formData).subscribe({
      next: () => {
        this.toastService.success('Tournoi créé avec succès !');
        this.router.navigate(['/organizer/dashboard']);
      },
      error: (err) => {
        console.error('Error creating tournament', err);
        const msg = err.error?.message || 'Une erreur est survenue lors de la création.';
        this.toastService.error(msg);
        this.loading = false;
      }
    });
  }
}
