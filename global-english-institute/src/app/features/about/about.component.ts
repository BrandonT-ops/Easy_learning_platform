import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>

    <main>
      <!-- Hero -->
      <section class="bg-white pt-16 pb-12 border-b border-neutral-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-2xl">
            <nav class="flex items-center gap-2 text-xs text-neutral-400 mb-4">
              <a routerLink="/" class="hover:text-neutral-600">Home</a>
              <span>/</span>
              <span class="text-neutral-600">About</span>
            </nav>
            <h1 class="text-4xl font-bold text-neutral-900">About Global English Institute</h1>
            <p class="mt-4 text-lg text-neutral-500">
              A professional online English language institution dedicated to accessible, high-quality language education.
            </p>
          </div>
        </div>
      </section>

      <!-- Mission & Vision -->
      <section class="py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div class="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-neutral-900 mb-3">Our Mission</h2>
              <p class="text-neutral-500 leading-relaxed">
                To provide accessible, high-quality English language education to learners worldwide through a structured, CEFR-aligned online learning environment. We believe that language education should be measurable, effective, and available to anyone with an internet connection.
              </p>
            </div>
            <div>
              <div class="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-neutral-900 mb-3">Our Vision</h2>
              <p class="text-neutral-500 leading-relaxed">
                To be the leading online platform for English language acquisition, recognized globally for the quality of instruction, accuracy of assessment, and the professional outcomes achieved by our students. We envision a world where language is never a barrier to opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Teaching Methodology -->
      <section class="py-20 bg-neutral-50 border-y border-neutral-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-2xl mb-12">
            <h2 class="section-heading">Our Teaching Methodology</h2>
            <p class="section-subheading mt-4">
              Grounded in research-backed language acquisition principles, our methodology ensures consistent progress.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            @for (method of methodology; track method.title) {
              <div class="card p-6">
                <div class="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                  <svg class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" [attr.d]="method.icon" />
                  </svg>
                </div>
                <h3 class="text-sm font-semibold text-neutral-900 mb-2">{{ method.title }}</h3>
                <p class="text-xs text-neutral-500 leading-relaxed">{{ method.description }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Online Learning Section -->
      <section class="py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 class="section-heading">Built for Online Learning</h2>
              <p class="text-neutral-500 leading-relaxed mt-4">
                Every aspect of our platform has been designed specifically for online learners. We understand that online education requires different structures, tools, and support systems than traditional classroom learning.
              </p>
              <ul class="mt-8 space-y-4">
                @for (point of onlinePoints; track point.title) {
                  <li class="flex items-start gap-3">
                    <div class="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center mt-0.5">
                      <svg class="w-3 h-3 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-neutral-900">{{ point.title }}</p>
                      <p class="text-sm text-neutral-500 mt-0.5">{{ point.description }}</p>
                    </div>
                  </li>
                }
              </ul>
            </div>
            <div class="bg-neutral-50 rounded-2xl border border-neutral-200 p-8">
              <div class="space-y-4">
                @for (stat of onlineStats; track stat.label) {
                  <div class="flex items-center justify-between py-3 border-b border-neutral-200 last:border-0">
                    <span class="text-sm text-neutral-600">{{ stat.label }}</span>
                    <span class="text-sm font-semibold text-primary-600">{{ stat.value }}</span>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="py-12 bg-neutral-50 border-t border-neutral-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-2xl font-bold text-neutral-900">Start Your Learning Journey</h2>
          <p class="text-neutral-500 mt-2">Take our free placement test and find the right program for you.</p>
          <div class="mt-6 flex items-center justify-center gap-3">
            <a routerLink="/placement-test" class="btn-primary">Take Placement Test</a>
            <a routerLink="/contact" class="btn-secondary">Contact Us</a>
          </div>
        </div>
      </section>
    </main>

    <app-footer></app-footer>
  `
})
export class AboutComponent {
  methodology = [
    {
      title: 'Communicative Approach',
      description: 'Focus on practical communication skills through real-world scenarios and meaningful interaction.',
      icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    },
    {
      title: 'Task-Based Learning',
      description: 'Complete authentic tasks that require language use, building real-world competence from day one.',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
    },
    {
      title: 'CEFR Assessment',
      description: 'Regular assessments aligned with CEFR descriptors ensure measurable, internationally recognized progress.',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    },
    {
      title: 'Personalized Feedback',
      description: 'Individual feedback on writing and speaking assessments from qualified English language instructors.',
      icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z',
    },
  ];

  onlinePoints = [
    {
      title: 'Structured Weekly Progress',
      description: 'Clear learning objectives and weekly milestones keep you on track.',
    },
    {
      title: 'Live and Recorded Sessions',
      description: 'Attend live classes or watch recordings at a time that suits you.',
    },
    {
      title: 'Interactive Exercises',
      description: 'Engage with activities designed for digital learning environments.',
    },
    {
      title: 'Dedicated Support',
      description: 'Access instructor support through messaging and scheduled sessions.',
    },
  ];

  onlineStats = [
    { label: 'Average class size', value: '8–12 students' },
    { label: 'Live sessions per week', value: '2–4 per level' },
    { label: 'Support availability', value: 'Mon–Fri, 9am–6pm' },
    { label: 'Platform access', value: '24 / 7' },
    { label: 'Certificate upon completion', value: 'Yes' },
  ];
}
