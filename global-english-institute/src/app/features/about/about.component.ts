import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { LanguageService } from '../../core/services/language.service';

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
              <a routerLink="/" class="hover:text-neutral-600">{{ ls.t().nav.home }}</a>
              <span>/</span>
              <span class="text-neutral-600">{{ ls.t().about.breadcrumb }}</span>
            </nav>
            <h1 class="text-4xl font-bold text-neutral-900">{{ ls.t().about.title }}</h1>
            <p class="mt-4 text-lg text-neutral-500">{{ ls.t().about.description }}</p>
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
              <h2 class="text-2xl font-bold text-neutral-900 mb-3">{{ ls.t().about.missionTitle }}</h2>
              <p class="text-neutral-500 leading-relaxed">{{ ls.t().about.mission }}</p>
            </div>
            <div>
              <div class="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-neutral-900 mb-3">{{ ls.t().about.visionTitle }}</h2>
              <p class="text-neutral-500 leading-relaxed">{{ ls.t().about.vision }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Teaching Methodology -->
      <section class="py-20 bg-neutral-50 border-y border-neutral-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-2xl mb-12">
            <h2 class="section-heading">{{ ls.t().about.methodologyHeading }}</h2>
            <p class="section-subheading mt-4">{{ ls.t().about.methodologySub }}</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            @for (method of ls.t().about.methodology; track method.title) {
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
              <h2 class="section-heading">{{ ls.t().about.onlineHeading }}</h2>
              <p class="text-neutral-500 leading-relaxed mt-4">{{ ls.t().about.onlineDesc }}</p>
              <ul class="mt-8 space-y-4">
                @for (point of ls.t().about.onlinePoints; track point.title) {
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
                @for (stat of ls.t().about.onlineStats; track stat.label) {
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
          <h2 class="text-2xl font-bold text-neutral-900">{{ ls.t().about.ctaTitle }}</h2>
          <p class="text-neutral-500 mt-2">{{ ls.t().about.ctaSub }}</p>
          <div class="mt-6 flex items-center justify-center gap-3">
            <a routerLink="/placement-test" class="btn-primary">{{ ls.t().nav.cta }}</a>
            <a routerLink="/contact" class="btn-secondary">{{ ls.t().nav.contact }}</a>
          </div>
        </div>
      </section>
    </main>

    <app-footer></app-footer>
  `
})
export class AboutComponent {
  ls = inject(LanguageService);
}
