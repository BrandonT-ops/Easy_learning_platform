import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-terms-of-service',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>
    <main class="py-16">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="flex items-center gap-2 text-xs text-neutral-400 mb-6">
          <a routerLink="/" class="hover:text-neutral-600">Home</a>
          <span>/</span>
          <span class="text-neutral-600">Terms of Service</span>
        </nav>
        <h1 class="text-3xl font-bold text-neutral-900 mb-2">Terms of Service</h1>
        <p class="text-sm text-neutral-400 mb-10">Last updated: March 2024</p>

        <div class="space-y-8 text-neutral-700 leading-relaxed text-sm">

          <section>
            <h2 class="text-lg font-semibold text-neutral-900 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using the Talkr by Easy Learning website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our services.</p>
          </section>

          <section>
            <h2 class="text-lg font-semibold text-neutral-900 mb-3">2. Services Description</h2>
            <p>Talkr by Easy Learning provides online English language education services including placement testing, enrollment in online programs, and access to educational materials. All services are delivered online.</p>
          </section>

          <section>
            <h2 class="text-lg font-semibold text-neutral-900 mb-3">3. Placement Testing</h2>
            <p>The placement test is provided free of charge. Test results are for informational purposes and are used to recommend appropriate program levels. Results do not constitute an academic qualification.</p>
          </section>

          <section>
            <h2 class="text-lg font-semibold text-neutral-900 mb-3">4. Enrollment</h2>
            <p>Registration does not constitute enrollment. A member of our team will contact you to confirm availability, discuss scheduling, and complete the enrollment process.</p>
          </section>

          <section>
            <h2 class="text-lg font-semibold text-neutral-900 mb-3">5. User Obligations</h2>
            <p>You agree to:</p>
            <ul class="list-disc pl-5 mt-2 space-y-1">
              <li>Provide accurate and truthful information</li>
              <li>Not share your account credentials</li>
              <li>Respect intellectual property rights of all course materials</li>
              <li>Not record or distribute sessions without prior written permission</li>
              <li>Maintain respectful communication with instructors and staff</li>
            </ul>
          </section>

          <section>
            <h2 class="text-lg font-semibold text-neutral-900 mb-3">6. Intellectual Property</h2>
            <p>All content on this website, including course materials, test questions, and instructional content, is the intellectual property of Talkr by Easy Learning and is protected by copyright law. Unauthorized reproduction or distribution is prohibited.</p>
          </section>

          <section>
            <h2 class="text-lg font-semibold text-neutral-900 mb-3">7. Limitation of Liability</h2>
            <p>Talkr by Easy Learning shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of, or inability to use, our services. Our liability is limited to the amount paid for services in the preceding 3 months.</p>
          </section>

          <section>
            <h2 class="text-lg font-semibold text-neutral-900 mb-3">8. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Changes will be posted on this page. Continued use of our services after changes constitutes acceptance of the updated terms.</p>
          </section>

          <section>
            <h2 class="text-lg font-semibold text-neutral-900 mb-3">9. Governing Law</h2>
            <p>These terms are governed by applicable law. Any disputes shall be resolved through good-faith negotiation before resorting to legal proceedings.</p>
          </section>

          <section>
            <h2 class="text-lg font-semibold text-neutral-900 mb-3">10. Contact</h2>
            <p>For questions about these Terms of Service, contact us at: <strong>legal&#64;talkrbyeasylearning.com</strong></p>
          </section>

        </div>
      </div>
    </main>
    <app-footer></app-footer>
  `
})
export class TermsOfServiceComponent {}
