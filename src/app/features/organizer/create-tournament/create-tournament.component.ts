import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  formats = [
    { value: 'single_elimination', label: 'Coupe (Élimination directe)' },
    { value: 'swiss', label: 'Rondes Suisses' },
    { value: 'champions_league', label: 'Ligue des Champions' }
  ];

  constructor(
    private fb: FormBuilder,
    private tournamentService: TournamentService,
    private toastService: ToastService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.tournamentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required]],
      game: ['efootball', [Validators.required]],
      format: ['single_elimination', [Validators.required]],
      max_participants: [16, [Validators.required]],
      entry_fee: [5, [Validators.required, Validators.min(0)]],
      visibility: ['public', [Validators.required]],
      auto_managed: [true],
      start_date: ['', [Validators.required]],
      tournament_duration_days: [4, [Validators.required, Validators.min(1)]],
      time_slot: ['evening', [Validators.required]],
      match_deadline_minutes: [60, [Validators.required, Validators.min(15)]],
      rules: ['', [Validators.required]],
      prize_distribution: this.fb.group({
        '1': [0, [Validators.required]],
        '2': [0],
        '3': [0]
      })
    });
  }

  schedulePreview: any = null;
  loadingPreview = false;

  ngOnInit() {}

  onPreviewSchedule() {
    if (this.tournamentForm.invalid) {
      this.toastService.error('Veuillez remplir les informations de base pour la prévisualisation.');
      return;
    }

    this.loadingPreview = true;
    this.schedulePreview = null;
    const previewData = {
      format: this.tournamentForm.value.format,
      max_participants: this.tournamentForm.value.max_participants,
      start_date: this.tournamentForm.value.start_date,
      tournament_duration_days: this.tournamentForm.value.tournament_duration_days,
      time_slot: this.tournamentForm.value.time_slot,
      match_deadline_minutes: this.tournamentForm.value.match_deadline_minutes
    };

    this.tournamentService.previewSchedule(previewData).subscribe({
      next: (res) => {
        this.schedulePreview = res.data || res;
        this.loadingPreview = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error previewing schedule', err);
        this.toastService.error('Échec de la prévisualisation du calendrier.');
        this.loadingPreview = false;
        this.cd.detectChanges();
      }
    });
  }

  onSubmit() {
    if (this.tournamentForm.invalid) {
      this.toastService.error('Veuillez remplir correctement tous les champs obligatoires.');
      return;
    }

    // Basic date validation
    const val = this.tournamentForm.value;
    if (new Date(val.start_date) < new Date()) {
      this.toastService.error('La date de début ne peut pas être dans le passé.');
      return;
    }

    this.loading = true;
    const formData = {
      ...this.tournamentForm.value,
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
        this.cd.detectChanges();
      }
    });
  }
}
