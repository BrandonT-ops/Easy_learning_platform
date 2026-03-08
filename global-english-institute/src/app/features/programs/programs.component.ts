import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';

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
            <a routerLink="/" class="hover:text-neutral-600">{{ ls.t().nav.home }}</a>
            <span>/</span>
            <span class="text-neutral-600">{{ ls.t().programsPage.breadcrumb }}</span>
          </nav>
          <h1 class="text-4xl font-bold text-neutral-900">{{ ls.t().programsPage.title }}</h1>
          <p class="mt-4 text-lg text-neutral-500 max-w-2xl">{{ ls.t().programsPage.description }}</p>
        </div>
      </section>

      <!-- Programs -->
      <section class="py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          @for (program of ls.t().programsPage.programs; track program.code) {
            <div class="card overflow-hidden">
              <div class="grid grid-cols-1 lg:grid-cols-4">
                <!-- Level Badge Column -->
                <div class="bg-primary-50 p-8 flex flex-col justify-center items-center text-center border-r border-neutral-200">
                  <div class="w-14 h-14 bg-primary-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-3">
                    {{ program.code }}
                  </div>
                  <div class="text-lg font-semibold text-neutral-800 mt-1">{{ program.name }}</div>
                  <div class="badge badge-blue mt-3">{{ program.duration }}</div>
                </div>

                <!-- Details -->
                <div class="lg:col-span-3 p-8">
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <h3 class="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">{{ ls.t().programsPage.skillsHeading }}</h3>
                      <ul class="space-y-1.5">
                        @for (skill of program.skills; track skill) {
                          <li class="flex items-center gap-2 text-sm text-neutral-700">
                            <div class="w-1.5 h-1.5 rounded-full bg-primary-400"></div>
                            {{ skill }}
                          </li>
                        }
                      </ul>
                    </div>
                    <div>
                      <h3 class="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">{{ ls.t().programsPage.outcomesHeading }}</h3>
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
                    <div>
                      <h3 class="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">{{ ls.t().programsPage.overviewHeading }}</h3>
                      <p class="text-sm text-neutral-500 leading-relaxed mb-4">{{ program.description }}</p>
                      <a routerLink="/placement-test" class="btn-primary text-xs px-4 py-2">
                        {{ ls.t().programsPage.checkLevel }}
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
          <h2 class="text-2xl font-bold text-neutral-900">{{ ls.t().programsPage.ctaHeading }}</h2>
          <p class="text-neutral-500 mt-2">{{ ls.t().programsPage.ctaSub }}</p>
          <div class="mt-6 flex items-center justify-center gap-3">
            <a routerLink="/placement-test" class="btn-primary">{{ ls.t().programsPage.ctaPrimary }}</a>
            <a routerLink="/register" class="btn-secondary">{{ ls.t().programsPage.ctaSecondary }}</a>
          </div>
        </div>
      </section>
    </main>

    <app-footer></app-footer>
  `
})
export class ProgramsComponent {
  ls = inject(LanguageService);
}
