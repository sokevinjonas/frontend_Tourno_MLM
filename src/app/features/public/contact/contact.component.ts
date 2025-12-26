import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './contact.component.html',
  // styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  submitting = false;

  onSubmit() {
    this.submitting = true;
    setTimeout(() => {
      alert('Merci pour votre message ! Notre équipe vous contactera sous peu.');
      this.submitting = false;
      this.contactForm = { name: '', email: '', subject: '', message: '' };
    }, 1500);
  }
}
