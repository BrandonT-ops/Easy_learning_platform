import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent, CommonModule],
  template: `
    <app-navbar></app-navbar>

    <main>
      <!-- Header -->
      <section class="bg-white pt-16 pb-12 border-b border-neutral-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav class="flex items-center gap-2 text-xs text-neutral-400 mb-4">
            <a routerLink="/" class="hover:text-neutral-600">Home</a>
            <span>/</span>
            <span class="text-neutral-600">Programs</span>
          </nav>
          <h1 class="text-4xl font-bold text-neutral-900">English Programs</h1>
          <p class="mt-4 text-lg text-neutral-500 max-w-2xl">
            CEFR-aligned programs designed to take you from beginner to advanced. Each level builds systematically on the previous.
          </p>
        </div>
      </section>

      <!-- Programs -->
      <section class="py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          @for (program of programs; track program.code) {
            <div class="card overflow-hidden">
              <div class="grid grid-cols-1 lg:grid-cols-4">
                <!-- Level Badge Column -->
                <div class="bg-primary-50 p-8 flex flex-col justify-center items-center text-center border-r border-neutral-200">
                  <div class="text-4xl font-bold text-primary-600">{{ program.code }}</div>
                  <div class="text-lg font-semibold text-neutral-800 mt-1">{{ program.name }}</div>
                  <div class="badge badge-blue mt-3">{{ program.duration }}</div>
                </div>

                <!-- Details -->
                <div class="lg:col-span-3 p-8">
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <!-- Skills Covered -->
                    <div>
                      <h3 class="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">Skills Covered</h3>
                      <ul class="space-y-1.5">
                        @for (skill of program.skills; track skill) {
                          <li class="flex items-center gap-2 text-sm text-neutral-700">
                            <div class="w-1.5 h-1.5 rounded-full bg-primary-400"></div>
                            {{ skill }}
                          </li>
                        }
                      </ul>
                    </div>

                    <!-- Outcomes -->
                    <div>
                      <h3 class="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">Expected Outcomes</h3>
                      <ul class="space-y-1.5">
                        @for (outcome of program.outcomes; track outcome) {
                          <li class="flex items-start gap-2 text-sm text-neutral-700">
                            <svg class="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            {{ outcome }}
                          </li>
                        }
                      </ul>
                    </div>

                    <!-- Overview -->
                    <div>
                      <h3 class="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">Program Overview</h3>
                      <p class="text-sm text-neutral-500 leading-relaxed mb-4">{{ program.description }}</p>
                      <a routerLink="/placement-test" class="btn-primary text-xs px-4 py-2">
                        Check My Level
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </section>

      <!-- CTA -->
      <section class="py-12 bg-neutral-50 border-t border-neutral-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-2xl font-bold text-neutral-900">Not Sure Which Level?</h2>
          <p class="text-neutral-500 mt-2">Take our free CEFR placement test — it takes 30–45 minutes and covers all four skills.</p>
          <div class="mt-6 flex items-center justify-center gap-3">
            <a routerLink="/placement-test" class="btn-primary">Take Free Placement Test</a>
            <a routerLink="/register" class="btn-secondary">Register Now</a>
          </div>
        </div>
      </section>
    </main>

    <app-footer></app-footer>
  `
})
export class ProgramsComponent {
  programs = [
    {
      code: 'A1',
      name: 'Beginner',
      duration: '3 months',
      description: 'An introduction to the English language for complete beginners. You will develop the ability to introduce yourself, ask and answer questions about personal details, and understand familiar words and very basic phrases.',
      skills: ['Basic vocabulary (500+ words)', 'Simple present tense', 'Introductions and greetings', 'Numbers, dates, and time', 'Classroom and everyday objects'],
      outcomes: ['Introduce yourself and others', 'Fill in simple forms', 'Understand basic spoken phrases', 'Write short personal messages'],
    },
    {
      code: 'A2',
      name: 'Elementary',
      duration: '3 months',
      description: 'Build on your beginner foundations to communicate in simple, routine tasks and describe your background and immediate environment. This level focuses on practical, everyday communication.',
      skills: ['Past and present tenses', 'Shopping and service language', 'Describing people and places', 'Travel and transportation', 'Daily routines and habits'],
      outcomes: ['Handle simple transactions', 'Describe your background and environment', 'Communicate in routine situations', 'Read short simple texts'],
    },
    {
      code: 'B1',
      name: 'Intermediate',
      duration: '4 months',
      description: 'Develop the ability to deal with most situations likely to arise while traveling and produce connected text on familiar topics. This level is a major milestone in English language development.',
      skills: ['Complex sentence structures', 'Opinion expression', 'Narrative and description', 'Work and professional contexts', 'Reading authentic texts'],
      outcomes: ['Handle most travel situations', 'Describe experiences and events', 'Express opinions on abstract topics', 'Write personal letters and messages'],
    },
    {
      code: 'B2',
      name: 'Upper-Intermediate',
      duration: '5 months',
      description: 'Interact with a degree of fluency and spontaneity that makes regular interaction with native speakers possible without strain for either party. Strong focus on professional and academic English.',
      skills: ['Advanced grammar structures', 'Academic and professional writing', 'Complex listening comprehension', 'Debate and argumentation', 'Nuanced vocabulary'],
      outcomes: ['Understand complex texts', 'Communicate fluently with native speakers', 'Produce clear, detailed text on a wide range of subjects', 'Participate actively in professional discussions'],
    },
    {
      code: 'C1',
      name: 'Advanced',
      duration: '6 months',
      description: 'Express ideas fluently, spontaneously, and with precision. This advanced level focuses on academic, professional, and specialized language use with emphasis on near-native proficiency.',
      skills: ['Academic discourse and writing', 'Idiomatic expression', 'Critical analysis and argumentation', 'Specialized vocabulary domains', 'Pragmatic competence'],
      outcomes: ['Express ideas fluently without obvious searching for expressions', 'Use language effectively for social, academic, and professional purposes', 'Produce clear, well-structured, detailed text on complex subjects', 'Understand a wide range of demanding, longer texts'],
    },
  ];
}
