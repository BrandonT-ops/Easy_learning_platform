import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { SupabaseService } from '../../core/services/supabase.service';

interface ContactForm {
  full_name: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>

    <main>
      <!-- Header -->
      <section class="bg-white pt-16 pb-12 border-b border-neutral-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav class="flex items-center gap-2 text-xs text-neutral-400 mb-4">
            <a routerLink="/" class="hover:text-neutral-600">Home</a>
            <span>/</span>
            <span class="text-neutral-600">Contact</span>
          </nav>
          <h1 class="text-4xl font-bold text-neutral-900">Contact Us</h1>
          <p class="mt-4 text-lg text-neutral-500 max-w-xl">
            Have questions about our programs or the placement test? We'd like to hear from you.
          </p>
        </div>
      </section>

      <section class="py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">

            <!-- Contact Info -->
            <div class="lg:col-span-1 space-y-6">
              <div>
                <h2 class="text-lg font-semibold text-neutral-900 mb-4">Get in Touch</h2>
                <div class="space-y-4">
                  @for (info of contactInfo; track info.label) {
                    <div class="flex items-start gap-3">
                      <div class="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg class="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" [attr.d]="info.icon" />
                        </svg>
                      </div>
                      <div>
                        <p class="text-xs font-medium text-neutral-500">{{ info.label }}</p>
                        <p class="text-sm text-neutral-900">{{ info.value }}</p>
                      </div>
                    </div>
                  }
                </div>
              </div>

              <div class="border-t border-neutral-200 pt-6">
                <h3 class="text-sm font-semibold text-neutral-900 mb-3">Follow Us</h3>
                <div class="flex items-center gap-3">
                  <a href="#" class="text-neutral-400 hover:text-neutral-600 transition-colors" aria-label="LinkedIn">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href="#" class="text-neutral-400 hover:text-neutral-600 transition-colors" aria-label="Twitter">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <!-- Contact Form -->
            <div class="lg:col-span-2">
              @if (submitted()) {
                <div class="card p-8 text-center">
                  <div class="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 class="text-lg font-semibold text-neutral-900">Message Sent</h3>
                  <p class="text-neutral-500 mt-2">Thank you for reaching out. We will respond within 1–2 business days.</p>
                  <button (click)="resetForm()" class="btn-secondary mt-6 text-sm">Send Another Message</button>
                </div>
              } @else {
                <div class="card p-8">
                  <h2 class="text-lg font-semibold text-neutral-900 mb-6">Send a Message</h2>
                  <form (ngSubmit)="onSubmit()" #contactNgForm="ngForm" novalidate>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
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
                        <label for="phone" class="form-label">Phone Number</label>
                        <input id="phone" name="phone" type="tel"
                               [(ngModel)]="form.phone"
                               class="form-input"
                               placeholder="+1 234 567 8900" />
                      </div>
                    </div>

                    <div class="mt-5">
                      <label for="message" class="form-label">Message <span class="text-red-500">*</span></label>
                      <textarea id="message" name="message" rows="5" required
                                [(ngModel)]="form.message"
                                class="form-textarea"
                                placeholder="How can we help you?"
                                #messageInput="ngModel"></textarea>
                      @if (messageInput.invalid && messageInput.touched) {
                        <p class="form-error">Message is required.</p>
                      }
                    </div>

                    <!-- Consent -->
                    <div class="mt-5 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                      <label class="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" name="consent" required
                               [(ngModel)]="form.consent"
                               class="mt-0.5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                               #consentInput="ngModel" />
                        <span class="text-sm text-neutral-600">
                          I consent to Talkr by Easy Learning collecting and processing my personal data to respond to this enquiry.
                          I have read and agree to the
                          <a routerLink="/privacy-policy" class="text-primary-600 hover:underline">Privacy Policy</a>
                          and
                          <a routerLink="/data-usage" class="text-primary-600 hover:underline">Data Usage Policy</a>.
                          <span class="text-red-500">*</span>
                        </span>
                      </label>
                      @if (consentInput.invalid && consentInput.touched) {
                        <p class="form-error mt-2">You must accept to continue.</p>
                      }
                    </div>

                    @if (errorMessage()) {
                      <div class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p class="text-sm text-red-600">{{ errorMessage() }}</p>
                      </div>
                    }

                    <div class="mt-6">
                      <button type="submit"
                              [disabled]="loading() || !contactNgForm.valid"
                              class="btn-primary w-full sm:w-auto">
                        @if (loading()) {
                          <svg class="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                          </svg>
                          Sending...
                        } @else {
                          Send Message
                        }
                      </button>
                    </div>
                  </form>
                </div>
              }
            </div>
          </div>
        </div>
      </section>
    </main>

    <app-footer></app-footer>
  `
})
export class ContactComponent {
  loading = signal(false);
  submitted = signal(false);
  errorMessage = signal<string | null>(null);

  form: ContactForm = {
    full_name: '',
    email: '',
    phone: '',
    message: '',
    consent: false,
  };

  contactInfo = [
    {
      label: 'Email',
      value: 'info@talkrbyeasylearning.com',
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    },
    {
      label: 'WhatsApp / Inscriptions',
      value: '651 31 60 26',
      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    },
    {
      label: 'Courses Starting',
      value: 'April 6, 2026',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    },
  ];

  constructor(private supabaseService: SupabaseService) {}

  async onSubmit() {
    if (!this.form.consent) return;

    this.loading.set(true);
    this.errorMessage.set(null);

    try {
      // Store contact inquiry in Supabase (optional table)
      // For now, we just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 800));
      this.submitted.set(true);
    } catch {
      this.errorMessage.set('Failed to send message. Please try again.');
    } finally {
      this.loading.set(false);
    }
  }

  resetForm() {
    this.form = { full_name: '', email: '', phone: '', message: '', consent: false };
    this.submitted.set(false);
  }
}
