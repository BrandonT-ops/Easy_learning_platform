import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { TestimonialsService } from '../../core/services/testimonials.service';
import { LanguageService } from '../../core/services/language.service';
import { Testimonial } from '../../core/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>

    <main>
      <!-- Hero Section -->
      <section class="bg-white pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            <!-- Left: Text Content -->
            <div>
              <div class="inline-flex items-center gap-2 bg-primary-50 text-primary-700 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ ls.t().hero.badge }}
              </div>
              <h1 class="text-4xl font-bold text-neutral-900 sm:text-5xl lg:text-5xl xl:text-6xl leading-tight">
                {{ ls.t().hero.title }}<br />
                <span class="text-primary-600">{{ ls.t().hero.titleHighlight }}</span>
              </h1>
              <p class="mt-6 text-lg text-neutral-500 leading-relaxed">
                {{ ls.t().hero.description }}
              </p>
              <div class="mt-8 flex flex-col sm:flex-row gap-3">
                <a routerLink="/placement-test" class="btn-primary px-7 py-3.5 text-base">
                  {{ ls.t().hero.ctaPrimary }}
                </a>
                <a routerLink="/programs" class="btn-secondary px-7 py-3.5 text-base">
                  {{ ls.t().hero.ctaSecondary }}
                </a>
              </div>
              <div class="mt-10 flex items-center gap-4">
                <div class="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <p class="text-sm text-neutral-500">
                  <span class="font-semibold text-neutral-900">{{ ls.t().hero.socialProof }}</span>
                  — {{ ls.t().hero.socialProofSub }}
                </p>
              </div>
            </div>

            <!-- Right: Offer Card (desktop only) -->
            <div class="hidden lg:flex flex-col gap-4">

              <!-- Offer Card -->
              <div class="card p-6 shadow-sm border-2 border-primary-100">
                <div class="flex items-center justify-between mb-4">
                  <p class="text-xs font-semibold text-neutral-400 uppercase tracking-wider">{{ ls.t().offerCard.title }}</p>
                  <span class="badge badge-blue text-xs">Talkr</span>
                </div>
                <div class="flex items-baseline gap-1 mb-4">
                  <span class="text-3xl font-bold text-primary-600">{{ ls.t().offerCard.price }}</span>
                  <span class="text-sm text-neutral-400">{{ ls.t().offerCard.pricePer }}</span>
                </div>
                <div class="space-y-2.5 mb-5">
                  <div class="flex items-center gap-2 text-sm text-neutral-700">
                    <svg class="w-4 h-4 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <span class="font-medium">{{ ls.t().offerCard.freeSessions }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm text-neutral-700">
                    <svg class="w-4 h-4 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                    </svg>
                    {{ ls.t().offerCard.startDate }}
                  </div>
                  <div class="flex items-center gap-2 text-sm text-neutral-700">
                    <svg class="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {{ ls.t().offerCard.whatsapp }}: 651 31 60 26
                  </div>
                </div>
                <div class="border-t border-neutral-100 pt-4">
                  <p class="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">{{ ls.t().offerCard.levelsTitle }}</p>
                  <div class="space-y-2">
                    @for (level of ls.t().offerCard.levels; track level.name) {
                      <div class="flex items-center justify-between p-2.5 rounded-lg"
                           [class.bg-primary-50]="level.highlight"
                           [class.border]="level.highlight"
                           [class.border-primary-200]="level.highlight">
                        <span class="text-sm font-medium text-neutral-900">{{ level.name }}</span>
                        <span class="text-xs text-neutral-400">{{ level.duration }}</span>
                      </div>
                    }
                  </div>
                </div>
              </div>

              <!-- Placement test note -->
              <div class="card p-4 flex items-center gap-3">
                <div class="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p class="text-xs text-neutral-500">{{ ls.t().offerCard.placement }}</p>
              </div>

            </div>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="bg-neutral-50 border-y border-neutral-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            @for (stat of ls.t().stats; track stat.label) {
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
            <h2 class="section-heading">{{ ls.t().whyChoose.heading }}</h2>
            <p class="section-subheading mx-auto mt-4">{{ ls.t().whyChoose.sub }}</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            @for (feature of ls.t().features; track feature.title) {
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
            <h2 class="section-heading">{{ ls.t().howItWorks.heading }}</h2>
            <p class="section-subheading mx-auto mt-4">{{ ls.t().howItWorks.sub }}</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            @for (step of ls.t().howItWorks.steps; track step.number) {
              <div class="flex items-start gap-4">
                <div class="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {{ step.number }}
                </div>
                <div>
                  <h3 class="text-base font-semibold text-neutral-900 mb-2">{{ step.title }}</h3>
                  <p class="text-sm text-neutral-500 leading-relaxed">{{ step.description }}</p>
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
              <h2 class="section-heading">{{ ls.t().programs.heading }}</h2>
              <p class="text-neutral-500 mt-2 max-w-xl">{{ ls.t().programs.sub }}</p>
            </div>
            <a routerLink="/programs" class="btn-secondary hidden md:flex">
              {{ ls.t().programs.viewAll }}
            </a>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            @for (level of ls.t().programs.levels; track level.code) {
              <div class="card p-6 hover:border-primary-300 hover:shadow-md transition-all cursor-pointer group">
                <div class="w-10 h-10 bg-primary-600 text-white rounded-xl flex items-center justify-center text-lg font-bold mb-4">
                  {{ level.code }}
                </div>
                <h3 class="text-base font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">{{ level.name }}</h3>
                <p class="text-sm text-neutral-500 mt-1 leading-relaxed">{{ level.description }}</p>
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
              {{ ls.t().programs.viewAll }}
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
            <h2 class="text-3xl font-bold text-white sm:text-4xl">{{ ls.t().cta.title }}</h2>
            <p class="mt-2 text-xl font-semibold text-primary-100">{{ ls.t().cta.subtitle }}</p>
            <p class="mt-4 text-primary-100 max-w-xl mx-auto text-lg">{{ ls.t().cta.description }}</p>
            <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a routerLink="/placement-test" class="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-white text-primary-600 font-semibold text-base hover:bg-primary-50 transition-colors">
                {{ ls.t().cta.primary }}
              </a>
              <a routerLink="/register" class="inline-flex items-center justify-center px-8 py-3.5 rounded-lg border border-primary-400 text-white font-medium text-base hover:bg-primary-700 transition-colors">
                {{ ls.t().cta.secondary }}
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
  ls = inject(LanguageService);

  constructor(private testimonialsService: TestimonialsService) {}

  async ngOnInit() {
    const { data } = await this.testimonialsService.getVisibleTestimonials();
    if (data) {
      this.testimonials.set(data.slice(0, 3) as Testimonial[]);
    }
  }
}
