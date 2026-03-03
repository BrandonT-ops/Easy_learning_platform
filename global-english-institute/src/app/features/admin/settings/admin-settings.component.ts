import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebsiteSettingsService } from '../../../core/services/website-settings.service';
import { WebsiteSettings } from '../../../core/models';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 max-w-2xl mx-auto">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-neutral-900">Website Settings</h1>
        <p class="text-sm text-neutral-500 mt-1">Manage public-facing site information and branding</p>
      </div>

      @if (loading()) {
        <div class="flex items-center justify-center py-20">
          <svg class="w-6 h-6 animate-spin text-primary-600" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
        </div>
      } @else {
        <div class="card p-6">
          <form (ngSubmit)="saveSettings()" #settingsForm="ngForm">
            <div class="space-y-5">

              <div>
                <label class="form-label" for="site_name">Site Name</label>
                <input id="site_name" name="site_name" type="text" required
                       [(ngModel)]="form.site_name"
                       class="form-input"
                       placeholder="Global English Institute" />
                <p class="text-xs text-neutral-400 mt-1">Displayed in navigation, emails, and browser tab.</p>
              </div>

              <div>
                <label class="form-label" for="tagline">Tagline</label>
                <input id="tagline" name="tagline" type="text"
                       [(ngModel)]="form.tagline"
                       class="form-input"
                       placeholder="Professional Online English Language Training" />
                <p class="text-xs text-neutral-400 mt-1">Shown in the hero section and metadata.</p>
              </div>

              <div>
                <label class="form-label" for="contact_email">Contact Email</label>
                <input id="contact_email" name="contact_email" type="email"
                       [(ngModel)]="form.contact_email"
                       class="form-input"
                       placeholder="info@example.com" />
              </div>

              <div>
                <label class="form-label" for="phone">Phone Number</label>
                <input id="phone" name="phone" type="tel"
                       [(ngModel)]="form.phone"
                       class="form-input"
                       placeholder="+1 (555) 000-0000" />
              </div>

              <div>
                <label class="form-label" for="primary_color">Brand Color</label>
                <div class="flex items-center gap-3">
                  <input id="primary_color" name="primary_color" type="color"
                         [(ngModel)]="form.primary_color"
                         class="w-10 h-10 rounded-lg border border-neutral-300 cursor-pointer" />
                  <input type="text" [value]="form.primary_color"
                         (input)="form.primary_color = $any($event.target).value"
                         class="form-input max-w-32 font-mono text-sm" placeholder="#2563eb" />
                </div>
                <p class="text-xs text-neutral-400 mt-1">Primary brand color (hex code). Applied as CSS variable.</p>
              </div>

            </div>

            @if (successMessage()) {
              <div class="mt-5 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p class="text-sm text-green-700">{{ successMessage() }}</p>
              </div>
            }

            @if (errorMessage()) {
              <div class="mt-5 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p class="text-sm text-red-600">{{ errorMessage() }}</p>
              </div>
            }

            <div class="mt-6 pt-4 border-t border-neutral-100 flex justify-end">
              <button type="submit" [disabled]="saving()" class="btn-primary">
                @if (saving()) { Saving... } @else { Save Settings }
              </button>
            </div>
          </form>
        </div>
      }
    </div>
  `
})
export class AdminSettingsComponent implements OnInit {
  loading = signal(true);
  saving = signal(false);
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  form = {
    site_name: '',
    tagline: '',
    contact_email: '',
    phone: '',
    primary_color: '#2563eb',
  };

  constructor(private settingsService: WebsiteSettingsService) {}

  ngOnInit() {
    const settings = this.settingsService.settings();
    if (settings) {
      this.form = {
        site_name: settings.site_name ?? '',
        tagline: settings.tagline ?? '',
        contact_email: settings.contact_email ?? '',
        phone: settings.phone ?? '',
        primary_color: settings.primary_color ?? '#2563eb',
      };
    }
    this.loading.set(false);
  }

  async saveSettings() {
    this.saving.set(true);
    this.successMessage.set(null);
    this.errorMessage.set(null);

    const { error } = await this.settingsService.updateSettings(this.form);

    if (error) {
      this.errorMessage.set(error);
    } else {
      this.successMessage.set('Settings saved successfully.');
      setTimeout(() => this.successMessage.set(null), 3000);
    }

    this.saving.set(false);
  }
}
