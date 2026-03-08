import { Component, OnInit, signal, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WebsiteSettingsService } from '../../../core/services/website-settings.service';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <header class="sticky top-0 z-50 bg-white border-b border-neutral-200" [class.shadow-sm]="scrolled()">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">

          <!-- Logo -->
          <a routerLink="/" class="flex items-center gap-2 flex-shrink-0">
            <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span class="text-sm font-semibold text-neutral-900 hidden sm:block">{{ siteName() }}</span>
          </a>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center gap-1">
            <a routerLink="/" routerLinkActive="text-primary-600" [routerLinkActiveOptions]="{ exact: true }"
               class="px-3 py-2 text-sm font-medium text-neutral-600 rounded-md hover:text-neutral-900 hover:bg-neutral-50 transition-colors">
              {{ ls.t().nav.home }}
            </a>
            <a routerLink="/about" routerLinkActive="text-primary-600"
               class="px-3 py-2 text-sm font-medium text-neutral-600 rounded-md hover:text-neutral-900 hover:bg-neutral-50 transition-colors">
              {{ ls.t().nav.about }}
            </a>
            <a routerLink="/programs" routerLinkActive="text-primary-600"
               class="px-3 py-2 text-sm font-medium text-neutral-600 rounded-md hover:text-neutral-900 hover:bg-neutral-50 transition-colors">
              {{ ls.t().nav.programs }}
            </a>
            <a routerLink="/contact" routerLinkActive="text-primary-600"
               class="px-3 py-2 text-sm font-medium text-neutral-600 rounded-md hover:text-neutral-900 hover:bg-neutral-50 transition-colors">
              {{ ls.t().nav.contact }}
            </a>
          </div>

          <!-- CTA + Language Toggle -->
          <div class="hidden md:flex items-center gap-2">
            <button (click)="ls.toggle()"
                    class="px-3 py-1.5 text-xs font-semibold border border-neutral-300 rounded-md text-neutral-600 hover:border-primary-400 hover:text-primary-600 transition-colors">
              {{ ls.t().langSwitch }}
            </button>
            <a routerLink="/placement-test" class="btn-primary text-xs px-4 py-2">
              {{ ls.t().nav.cta }}
            </a>
          </div>

          <!-- Mobile menu button -->
          <button (click)="toggleMenu()" class="md:hidden p-2 rounded-md text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors" aria-label="Toggle menu">
            @if (menuOpen()) {
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            } @else {
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            }
          </button>
        </div>

        <!-- Mobile Menu -->
        @if (menuOpen()) {
          <div class="md:hidden border-t border-neutral-100 py-3 space-y-1">
            <a routerLink="/" (click)="closeMenu()" class="block px-3 py-2 text-sm font-medium text-neutral-600 rounded-md hover:bg-neutral-50">{{ ls.t().nav.home }}</a>
            <a routerLink="/about" (click)="closeMenu()" class="block px-3 py-2 text-sm font-medium text-neutral-600 rounded-md hover:bg-neutral-50">{{ ls.t().nav.about }}</a>
            <a routerLink="/programs" (click)="closeMenu()" class="block px-3 py-2 text-sm font-medium text-neutral-600 rounded-md hover:bg-neutral-50">{{ ls.t().nav.programs }}</a>
            <a routerLink="/contact" (click)="closeMenu()" class="block px-3 py-2 text-sm font-medium text-neutral-600 rounded-md hover:bg-neutral-50">{{ ls.t().nav.contact }}</a>
            <div class="pt-2 pb-1 flex gap-2">
              <button (click)="ls.toggle()" class="px-3 py-2 text-xs font-semibold border border-neutral-300 rounded-md text-neutral-600">
                {{ ls.t().langSwitch }}
              </button>
              <a routerLink="/placement-test" (click)="closeMenu()" class="btn-primary flex-1 text-center text-xs">
                {{ ls.t().nav.cta }}
              </a>
            </div>
          </div>
        }
      </nav>
    </header>
  `
})
export class NavbarComponent implements OnInit {
  scrolled = signal(false);
  menuOpen = signal(false);
  siteName = signal('Talkr by Easy Learning');

  ls = inject(LanguageService);

  constructor(private settingsService: WebsiteSettingsService) {}

  ngOnInit() {
    const settings = this.settingsService.settings();
    if (settings?.site_name) {
      this.siteName.set(settings.site_name);
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 10);
  }

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }
}
