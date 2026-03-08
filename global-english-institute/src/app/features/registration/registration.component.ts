import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RegistrationService } from '../../core/services/registration.service';

interface RegistrationForm {
  full_name: string;
  email: string;
  phone: string;
  country: string;
  preferred_schedule: string;
  level: string;
  consent: boolean;
}

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>

    <main class="min-h-screen bg-neutral-50 py-16">
      <div class="max-w-2xl mx-auto px-4 sm:px-6">

        @if (submitted()) {
          <!-- Success State -->
          <div class="card p-10 text-center">
            <div class="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg class="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-neutral-900 mb-2">Registration Received</h2>
            <p class="text-neutral-500 leading-relaxed max-w-sm mx-auto">
              Thank you, {{ form.full_name }}. We have received your registration request. A member of our team will contact you at <strong>{{ form.email }}</strong> within 1–2 business days.
            </p>
            <div class="mt-8 flex items-center justify-center gap-3">
              <a routerLink="/" class="btn-secondary">Back to Home</a>
              <a routerLink="/placement-test" class="btn-primary">Take Placement Test</a>
            </div>
          </div>
        } @else {
          <!-- Registration Form -->
          <div>
            <div class="mb-8">
              <nav class="flex items-center gap-2 text-xs text-neutral-400 mb-4">
                <a routerLink="/" class="hover:text-neutral-600">Home</a>
                <span>/</span>
                <span class="text-neutral-600">Register</span>
              </nav>
              <h1 class="text-3xl font-bold text-neutral-900">Register for a Program</h1>
              <p class="text-neutral-500 mt-2">
                Complete the form below and our team will get in touch to discuss the best program for you.
              </p>
            </div>

            <div class="card p-8">
              <form (ngSubmit)="onSubmit()" #regForm="ngForm" novalidate>
                <div class="space-y-5">

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div class="sm:col-span-2">
                      <label for="full_name" class="form-label">Full Name <span class="text-red-500">*</span></label>
                      <input id="full_name" name="full_name" type="text" required
                             [(ngModel)]="form.full_name"
                             class="form-input"
                             placeholder="Your full name"
                             #nameInput="ngModel" />
                      @if (nameInput.invalid && nameInput.touched) {
                        <p class="form-error">Full name is required.</p>
                      }
                    </div>

                    <div>
                      <label for="email" class="form-label">Email Address <span class="text-red-500">*</span></label>
                      <input id="email" name="email" type="email" required
                             [(ngModel)]="form.email"
                             class="form-input"
                             placeholder="your@email.com"
                             #emailInput="ngModel" />
                      @if (emailInput.invalid && emailInput.touched) {
                        <p class="form-error">A valid email is required.</p>
                      }
                    </div>

                    <div>
                      <label for="phone" class="form-label">Phone Number <span class="text-red-500">*</span></label>
                      <input id="phone" name="phone" type="tel" required
                             [(ngModel)]="form.phone"
                             class="form-input"
                             placeholder="+1 234 567 8900"
                             #phoneInput="ngModel" />
                      @if (phoneInput.invalid && phoneInput.touched) {
                        <p class="form-error">Phone number is required.</p>
                      }
                    </div>

                    <div>
                      <label for="country" class="form-label">Country <span class="text-red-500">*</span></label>
                      <input id="country" name="country" type="text" required
                             [(ngModel)]="form.country"
                             class="form-input"
                             placeholder="Your country"
                             #countryInput="ngModel" />
                      @if (countryInput.invalid && countryInput.touched) {
                        <p class="form-error">Country is required.</p>
                      }
                    </div>

                    <div>
                      <label for="level" class="form-label">English Level</label>
                      <select id="level" name="level"
                              [(ngModel)]="form.level"
                              class="form-select">
                        <option value="">Not sure (take placement test)</option>
                        <option value="A1">A1 - Beginner</option>
                        <option value="A2">A2 - Elementary</option>
                        <option value="B1">B1 - Intermediate</option>
                        <option value="B2">B2 - Upper-Intermediate</option>
                        <option value="C1">C1 - Advanced</option>
                      </select>
                    </div>

                    <div class="sm:col-span-2">
                      <label for="schedule" class="form-label">Preferred Schedule</label>
                      <select id="schedule" name="preferred_schedule"
                              [(ngModel)]="form.preferred_schedule"
                              class="form-select">
                        <option value="">Select preference</option>
                        <option value="weekday_morning">Weekday mornings (9am–12pm)</option>
                        <option value="weekday_afternoon">Weekday afternoons (1pm–5pm)</option>
                        <option value="weekday_evening">Weekday evenings (6pm–9pm)</option>
                        <option value="weekend">Weekends</option>
                        <option value="flexible">Flexible / Self-paced</option>
                      </select>
                    </div>
                  </div>

                  <!-- Consent -->
                  <div class="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
                    <label class="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" name="consent" required
                             [(ngModel)]="form.consent"
                             class="mt-0.5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                             #consentInput="ngModel" />
                      <span class="text-sm text-neutral-600">
                        I consent to Talkr by Easy Learning collecting and processing my personal data to process this registration request and contact me regarding programs and availability.
                        I have read and agree to the
                        <a routerLink="/privacy-policy" class="text-primary-600 hover:underline" target="_blank">Privacy Policy</a>,
                        <a routerLink="/terms-of-service" class="text-primary-600 hover:underline" target="_blank">Terms of Service</a>, and
                        <a routerLink="/data-usage" class="text-primary-600 hover:underline" target="_blank">Data Usage Policy</a>.
                        <span class="text-red-500">*</span>
                      </span>
                    </label>
                    @if (consentInput.invalid && consentInput.touched) {
                      <p class="form-error mt-2">You must accept to proceed.</p>
                    }
                  </div>

                  @if (errorMessage()) {
                    <div class="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p class="text-sm text-red-600">{{ errorMessage() }}</p>
                    </div>
                  }

                  <div class="pt-2">
                    <button type="submit"
                            [disabled]="loading() || !regForm.valid"
                            class="btn-primary w-full py-3.5 text-base">
                      @if (loading()) {
                        <svg class="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                        Submitting...
                      } @else {
                        Submit Registration
                      }
                    </button>
                  </div>

                </div>
              </form>
            </div>

            <p class="text-center text-sm text-neutral-400 mt-5">
              Not sure of your level?
              <a routerLink="/placement-test" class="text-primary-600 hover:underline">Take the free placement test first.</a>
            </p>
          </div>
        }

      </div>
    </main>

    <app-footer></app-footer>
  `
})
export class RegistrationComponent {
  loading = signal(false);
  submitted = signal(false);
  errorMessage = signal<string | null>(null);

  form: RegistrationForm = {
    full_name: '',
    email: '',
    phone: '',
    country: '',
    preferred_schedule: '',
    level: '',
    consent: false,
  };

  constructor(private registrationService: RegistrationService) {}

  async onSubmit() {
    if (!this.form.consent) return;

    this.loading.set(true);
    this.errorMessage.set(null);

    const { error } = await this.registrationService.register({
      full_name: this.form.full_name,
      email: this.form.email,
      phone: this.form.phone,
      country: this.form.country,
      preferred_schedule: this.form.preferred_schedule,
      level: this.form.level,
    });

    if (error) {
      this.errorMessage.set(error);
      this.loading.set(false);
      return;
    }

    this.submitted.set(true);
    this.loading.set(false);
  }
}
