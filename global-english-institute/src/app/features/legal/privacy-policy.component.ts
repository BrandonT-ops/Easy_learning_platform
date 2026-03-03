import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>
    <main class="py-16">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="flex items-center gap-2 text-xs text-neutral-400 mb-6">
          <a routerLink="/" class="hover:text-neutral-600">Home</a>
          <span>/</span>
          <span class="text-neutral-600">Privacy Policy</span>
        </nav>
        <h1 class="text-3xl font-bold text-neutral-900 mb-2">Privacy Policy</h1>
        <p class="text-sm text-neutral-400 mb-10">Last updated: March 2024</p>

        <div class="prose prose-sm max-w-none space-y-8 text-neutral-700 leading-relaxed">

          <section>
            <h2 class="text-lg font-semibold text-neutral-900 mb-3">1. Introduction</h2>
            <p>Global English Institute ("we," "our," or "us") is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and protect information about you when you use our website and services.</p>
          </section>

          <section>
            <h2 class="text-lg font-semibold text-neutral-900 mb-3">2. Data We Collect</h2>
            <p>We collect the following categories of personal data:</p>
            <ul class="list-disc pl-5 mt-2 space-y-1">
              <li>Identity data: full name</li>
              <li>Contact data: email address, phone number, country of residence</li>
              <li>Assessment data: placement test responses, scores, and recordings</li>
              <li>Preference data: schedule preferences and program interest</li>
              <li>Technical data: browser type, device information, and usage logs</li>
            </ul>
          </section>

          <section>
            <h2 class="text-lg font-semibold text-neutral-900 mb-3">3. How We Use Your Data</h2>
            <p>We process your personal data for the following purposes:</p>
            <ul class="list-disc pl-5 mt-2 space-y-1">
              <li>To administer placement tests and assess your English level</li>
              <li>To provide enrollment and registration services</li>
              <li>To send transactional communications (confirmations, results)</li>
              <li>To manage the student-instructor relationship</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 class="text-lg font-semibold text-neutral-900 mb-3">4. Legal Basis for Processing</h2>
            <p>We process your data on the following legal bases:</p>
            <ul class="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Consent:</strong> Where you have given explicit consent (e.g., contact forms)</li>
              <li><strong>Contract:</strong> Where processing is necessary to perform a contract with you</li>
              <li><strong>Legitimate interests:</strong> Where processing is necessary for our legitimate business interests</li>
            </ul>
          </section>

          <section>
            <h2 class="text-lg font-semibold text-neutral-900 mb-3">5. Data Retention</h2>
            <p>We retain your personal data for as long as necessary to fulfill the purposes described in this policy. Placement test data is retained for 24 months. You may request deletion at any time by contacting us.</p>
          </section>

          <section>
            <h2 class="text-lg font-semibold text-neutral-900 mb-3">6. Your Rights (GDPR)</h2>
            <p>If you are located in the European Economic Area, you have the following rights:</p>
            <ul class="list-disc pl-5 mt-2 space-y-1">
              <li>Right of access to your personal data</li>
              <li>Right to rectification of inaccurate data</li>
              <li>Right to erasure ("right to be forgotten")</li>
              <li>Right to restriction of processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
            </ul>
          </section>

          <section>
            <h2 class="text-lg font-semibold text-neutral-900 mb-3">7. Data Security</h2>
            <p>We use Supabase (hosted on AWS infrastructure) to store your data securely. All data is encrypted in transit (TLS) and at rest. Row-Level Security policies restrict data access to authorized users only.</p>
          </section>

          <section>
            <h2 class="text-lg font-semibold text-neutral-900 mb-3">8. Third-Party Services</h2>
            <p>We use the following third-party services that may process your data:</p>
            <ul class="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Supabase:</strong> Database and file storage</li>
              <li><strong>Resend:</strong> Transactional email delivery</li>
              <li><strong>Vercel:</strong> Application hosting</li>
            </ul>
          </section>

          <section>
            <h2 class="text-lg font-semibold text-neutral-900 mb-3">9. Contact</h2>
            <p>To exercise your rights or for any privacy-related enquiry, contact us at:</p>
            <p class="mt-2"><strong>Email:</strong> privacy&#64;globalenglishinstitute.com</p>
          </section>

        </div>
      </div>
    </main>
    <app-footer></app-footer>
  `
})
export class PrivacyPolicyComponent {}
