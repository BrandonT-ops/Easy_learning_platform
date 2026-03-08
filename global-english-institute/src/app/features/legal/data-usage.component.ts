import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-data-usage',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>
    <main class="py-16">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="flex items-center gap-2 text-xs text-neutral-400 mb-6">
          <a routerLink="/" class="hover:text-neutral-600">Home</a>
          <span>/</span>
          <span class="text-neutral-600">Data Usage Policy</span>
        </nav>
        <h1 class="text-3xl font-bold text-neutral-900 mb-2">Data Usage Policy</h1>
        <p class="text-sm text-neutral-400 mb-10">Last updated: March 2024</p>

        <div class="space-y-8 text-neutral-700 leading-relaxed text-sm">

          <section>
            <h2 class="text-lg font-semibold text-neutral-900 mb-3">1. Data We Collect and Why</h2>
            <div class="overflow-x-auto">
              <table class="w-full text-sm border border-neutral-200 rounded-lg overflow-hidden">
                <thead class="bg-neutral-50">
                  <tr>
                    <th class="text-left py-3 px-4 font-medium text-neutral-700 border-b border-neutral-200">Data Type</th>
                    <th class="text-left py-3 px-4 font-medium text-neutral-700 border-b border-neutral-200">Purpose</th>
                    <th class="text-left py-3 px-4 font-medium text-neutral-700 border-b border-neutral-200">Retention</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-neutral-100">
                  <tr>
                    <td class="py-3 px-4 text-neutral-700">Name, email, phone</td>
                    <td class="py-3 px-4 text-neutral-500">Registration, communication</td>
                    <td class="py-3 px-4 text-neutral-500">24 months</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 text-neutral-700">Test answers and scores</td>
                    <td class="py-3 px-4 text-neutral-500">Level assessment</td>
                    <td class="py-3 px-4 text-neutral-500">24 months</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 text-neutral-700">Written responses</td>
                    <td class="py-3 px-4 text-neutral-500">Admin review, scoring</td>
                    <td class="py-3 px-4 text-neutral-500">24 months</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 text-neutral-700">Audio recordings</td>
                    <td class="py-3 px-4 text-neutral-500">Speaking assessment</td>
                    <td class="py-3 px-4 text-neutral-500">12 months</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 text-neutral-700">Usage logs</td>
                    <td class="py-3 px-4 text-neutral-500">Security, troubleshooting</td>
                    <td class="py-3 px-4 text-neutral-500">90 days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 class="text-lg font-semibold text-neutral-900 mb-3">2. Audio Recording Data</h2>
            <p>Speaking assessment recordings are stored securely in Supabase Storage with restricted access. Only authorized administrators can access recordings for scoring purposes. Recordings are not shared with third parties and are deleted according to the retention schedule above.</p>
          </section>

          <section>
            <h2 class="text-lg font-semibold text-neutral-900 mb-3">3. Email Communications</h2>
            <p>We use Resend to send transactional emails. These include test confirmation emails, score summaries, and enrollment confirmations. We do not send marketing emails without separate explicit consent.</p>
          </section>

          <section>
            <h2 class="text-lg font-semibold text-neutral-900 mb-3">4. Data Storage Location</h2>
            <p>Your data is stored on Supabase infrastructure hosted on AWS. Our application is deployed on Vercel. Both services comply with GDPR requirements and provide data processing agreements.</p>
          </section>

          <section>
            <h2 class="text-lg font-semibold text-neutral-900 mb-3">5. Data Access Controls</h2>
            <p>Access to personal data is strictly controlled:</p>
            <ul class="list-disc pl-5 mt-2 space-y-1">
              <li>Students can only access their own data</li>
              <li>Admins can access all data for legitimate operational purposes</li>
              <li>Row-Level Security policies enforce access control at the database level</li>
              <li>All access is logged and auditable</li>
            </ul>
          </section>

          <section>
            <h2 class="text-lg font-semibold text-neutral-900 mb-3">6. Data Deletion Requests</h2>
            <p>To request deletion of your personal data, email <strong>privacy&#64;talkrbyeasylearning.com</strong> with the subject "Data Deletion Request." We will process your request within 30 days.</p>
          </section>

        </div>
      </div>
    </main>
    <app-footer></app-footer>
  `
})
export class DataUsageComponent {}
