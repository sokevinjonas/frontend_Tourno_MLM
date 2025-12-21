import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { OrganizerService } from '../../../core/services/organizer.service';
import { ToastService } from '../../../core/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-certification',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.css']
})
export class CertificationComponent implements OnInit {
  verificationForm: FormGroup;
  loading = false;
  currentStatus: string | null = null;

  constructor(
    private fb: FormBuilder,
    private organizerService: OrganizerService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.verificationForm = this.fb.group({
      full_name: ['', [Validators.required]],
      id_number: ['', [Validators.required]],
      bio: ['', [Validators.required]],
      whatsapp: ['', [Validators.required]],
      id_file: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.checkStatus();
  }

  checkStatus() {
    this.organizerService.checkIfOrganizer().subscribe(res => {
      this.currentStatus = res.status;
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.verificationForm.patchValue({
        id_file: file
      });
    }
  }

  onSubmit() {
    if (this.verificationForm.invalid) {
      this.toastService.error('Veuillez remplir tous les champs et joindre une pièce d\'identité.');
      return;
    }

    const formData = new FormData();
    Object.keys(this.verificationForm.value).forEach(key => {
        formData.append(key, this.verificationForm.value[key]);
    });

    this.loading = true;
    this.organizerService.submitVerification(formData).subscribe({
      next: () => {
        this.toastService.success('Votre demande a été soumise avec succès.');
        this.currentStatus = 'pending';
        this.loading = false;
      },
      error: (err) => {
        this.toastService.error(err.error?.message || 'Une erreur est survenue.');
        this.loading = false;
      }
    });
  }
}
