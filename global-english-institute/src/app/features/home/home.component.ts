import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { TestimonialsService } from '../../core/services/testimonials.service';
import { Testimonial } from '../../core/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>

    <main>
      <!-- Hero Section -->
      <section class="bg-white pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-3xl">
            <div class="inline-flex items-center gap-2 bg-primary-50 text-primary-700 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              100% Online Learning
            </div>
            <h1 class="text-4xl font-bold text-neutral-900 sm:text-5xl lg:text-6xl leading-tight">
              Master English.<br />
              <span class="text-primary-600">At Your Own Pace.</span>
            </h1>
            <p class="mt-6 text-lg text-neutral-500 max-w-2xl leading-relaxed">
              CEFR-aligned online English language programs designed for professionals and learners worldwide. Start with a free placement test to find your level.
            </p>
            <div class="mt-8 flex flex-col sm:flex-row gap-3">
              <a routerLink="/placement-test" class="btn-primary px-8 py-3.5 text-base">
                Take Free Placement Test
              </a>
              <a routerLink="/programs" class="btn-secondary px-8 py-3.5 text-base">
                View Programs
              </a>
            </div>
            <div class="mt-10 flex items-center gap-6">
              <div class="flex -space-x-2">
                @for (i of [1,2,3,4]; track i) {
                  <div class="w-8 h-8 rounded-full bg-primary-{{ i * 100 + 200 }} border-2 border-white flex items-center justify-center">
                    <svg class="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                    </svg>
                  </div>
                }
              </div>
              <p class="text-sm text-neutral-500">
                <span class="font-semibold text-neutral-900">2,400+</span> students enrolled globally
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="bg-neutral-50 border-y border-neutral-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            @for (stat of stats; track stat.label) {
              <div class="text-center">
                <div class="text-3xl font-bold text-primary-600">{{ stat.value }}</div>
                <div class="text-sm text-neutral-500 mt-1">{{ stat.label }}</div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Value Proposition -->
      <section class="py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-14">
            <h2 class="section-heading">Why Choose Global English Institute?</h2>
            <p class="section-subheading mx-auto mt-4">Everything you need to achieve English fluency, delivered entirely online.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            @for (feature of features; track feature.title) {
              <div class="card p-6">
                <div class="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                  <svg class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" [attr.d]="feature.icon" />
                  </svg>
                </div>
                <h3 class="text-base font-semibold text-neutral-900 mb-2">{{ feature.title }}</h3>
                <p class="text-sm text-neutral-500 leading-relaxed">{{ feature.description }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- How It Works -->
      <section class="py-20 bg-neutral-50 border-y border-neutral-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-14">
            <h2 class="section-heading">How It Works</h2>
            <p class="section-subheading mx-auto mt-4">Start your English learning journey in three simple steps.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            @for (step of steps; track step.number) {
              <div class="relative">
                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {{ step.number }}
                  </div>
                  <div>
                    <h3 class="text-base font-semibold text-neutral-900 mb-2">{{ step.title }}</h3>
                    <p class="text-sm text-neutral-500 leading-relaxed">{{ step.description }}</p>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Programs Preview -->
      <section class="py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-end justify-between mb-10">
            <div>
              <h2 class="section-heading">CEFR-Aligned Programs</h2>
              <p class="text-neutral-500 mt-2 max-w-xl">Programs structured to international language standards for measurable progress.</p>
            </div>
            <a routerLink="/programs" class="btn-secondary hidden md:flex">
              View All Programs
            </a>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            @for (level of cefrLevels; track level.code) {
              <div class="card p-5 hover:border-primary-300 hover:shadow-md transition-all cursor-pointer group">
                <div class="badge badge-blue mb-3">{{ level.code }}</div>
                <h3 class="text-sm font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">{{ level.name }}</h3>
                <p class="text-xs text-neutral-500 mt-1 leading-relaxed">{{ level.description }}</p>
                <div class="mt-3 flex items-center gap-1 text-xs text-neutral-400">
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ level.duration }}
                </div>
              </div>
            }
          </div>
          <div class="mt-6 md:hidden">
            <a routerLink="/programs" class="btn-secondary w-full text-center">
              View All Programs
            </a>
          </div>
        </div>
      </section>

      <!-- Testimonials -->
      @if (testimonials().length > 0) {
        <section class="py-20 bg-neutral-50 border-y border-neutral-200">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-14">
              <h2 class="section-heading">What Our Students Say</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              @for (testimonial of testimonials(); track testimonial.id) {
                <div class="card p-6">
                  <div class="flex gap-1 mb-3">
                    @for (star of [1,2,3,4,5]; track star) {
                      <svg class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    }
                  </div>
                  <p class="text-sm text-neutral-600 leading-relaxed mb-4">"{{ testimonial.content }}"</p>
                  <p class="text-sm font-semibold text-neutral-900">{{ testimonial.student_name }}</p>
                </div>
              }
            </div>
          </div>
        </section>
      }

      <!-- CTA Section -->
      <section class="py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-primary-600 rounded-2xl p-10 md:p-14 text-center">
            <h2 class="text-3xl font-bold text-white sm:text-4xl">Ready to Find Your English Level?</h2>
            <p class="mt-4 text-primary-100 max-w-xl mx-auto text-lg">
              Take our free CEFR-aligned placement test. It takes 30–45 minutes and gives you an accurate assessment of your skills.
            </p>
            <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a routerLink="/placement-test" class="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-white text-primary-600 font-semibold text-base hover:bg-primary-50 transition-colors">
                Start Placement Test
              </a>
              <a routerLink="/register" class="inline-flex items-center justify-center px-8 py-3.5 rounded-lg border border-primary-400 text-white font-medium text-base hover:bg-primary-700 transition-colors">
                Register Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <app-footer></app-footer>
  `
})
export class HomeComponent implements OnInit {
  testimonials = signal<Testimonial[]>([]);

  stats = [
    { value: '2,400+', label: 'Students Enrolled' },
    { value: '5', label: 'CEFR Levels Covered' },
    { value: '98%', label: 'Satisfaction Rate' },
    { value: '40+', label: 'Countries Reached' },
  ];

  features = [
    {
      title: 'CEFR-Aligned Curriculum',
      description: 'All programs follow the Common European Framework of Reference for Languages, ensuring internationally recognized qualifications.',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
      title: 'Expert Instructors',
      description: 'Learn from certified English language teachers with years of experience in online instruction and adult learning.',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    },
    {
      title: 'Flexible Scheduling',
      description: 'Study at your own pace with flexible online sessions designed around your schedule, not the other way around.',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    },
    {
      title: 'Free Placement Testing',
      description: 'Our CEFR-aligned placement test accurately evaluates your reading, grammar, listening, writing, and speaking skills.',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    },
    {
      title: 'All Four Skills',
      description: 'Comprehensive training covering reading, writing, listening, and speaking — the complete English language skillset.',
      icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129',
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor your progress with detailed assessments and receive personalized feedback from your instructor.',
      icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z',
    },
  ];

  steps = [
    {
      number: '1',
      title: 'Take the Placement Test',
      description: 'Complete our free CEFR-aligned placement test to assess your current English level across all four skills.',
    },
    {
      number: '2',
      title: 'Choose Your Program',
      description: 'Based on your results, select the program that matches your level and learning goals.',
    },
    {
      number: '3',
      title: 'Start Learning Online',
      description: 'Access your classes from any device. Study with live sessions, self-paced materials, and expert feedback.',
    },
  ];

  cefrLevels = [
    { code: 'A1', name: 'Beginner', description: 'Learn the basics of everyday communication.', duration: '3 months' },
    { code: 'A2', name: 'Elementary', description: 'Build confidence in simple interactions.', duration: '3 months' },
    { code: 'B1', name: 'Intermediate', description: 'Handle most everyday situations.', duration: '4 months' },
    { code: 'B2', name: 'Upper-Intermediate', description: 'Communicate with fluency and spontaneity.', duration: '5 months' },
    { code: 'C1', name: 'Advanced', description: 'Express ideas with precision and flexibility.', duration: '6 months' },
  ];

  constructor(private testimonialsService: TestimonialsService) {}

  async ngOnInit() {
    const { data } = await this.testimonialsService.getVisibleTestimonials();
    if (data) {
      this.testimonials.set(data.slice(0, 3) as Testimonial[]);
    }
  }
}
