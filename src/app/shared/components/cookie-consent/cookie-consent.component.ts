import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  acceptedAt?: string;
}

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.css']
})
export class CookieConsentComponent implements OnInit {
  isVisible = false;
  showSettings = false;
  
  preferences: CookiePreferences = {
    essential: true,
    analytics: false,
    marketing: false
  };

  private readonly STORAGE_KEY = 'gap_cookie_preferences';

  ngOnInit() {
    this.checkConsent();
  }

  checkConsent() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) {
      setTimeout(() => {
        this.isVisible = true;
      }, 1500);
    } else {
      try {
        this.preferences = JSON.parse(stored);
      } catch (e) {
        this.isVisible = true;
      }
    }
  }

  acceptAll() {
    this.preferences = {
      essential: true,
      analytics: true,
      marketing: true,
      acceptedAt: new Date().toISOString()
    };
    this.save();
  }

  savePreferences() {
    this.preferences.essential = true; // Always true
    this.preferences.acceptedAt = new Date().toISOString();
    this.save();
  }

  toggleSettings() {
    this.showSettings = !this.showSettings;
  }

  private save() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.preferences));
    this.isVisible = false;
    this.showSettings = false;
    
    // Logic to initialize or disable tracking could go here
    if (this.preferences.analytics) {
      console.log('[GAP] Analytics enabled - Tracking page visits...');
    }
  }

  close() {
    this.isVisible = false;
  }
}
