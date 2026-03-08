import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WebsiteSettingsService } from '../../../core/services/website-settings.service';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="bg-neutral-900 text-neutral-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">

          <!-- Brand -->
          <div class="md:col-span-2">
            <div class="flex items-center gap-2 mb-3">
              <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span class="text-white font-semibold">{{ siteName() }}</span>
            </div>
            <p class="text-sm text-neutral-400 leading-relaxed max-w-xs">
              {{ ls.t().footer.tagline }}
            </p>
            <div class="flex items-center gap-3 mt-4">
              <a href="#" class="text-neutral-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" class="text-neutral-400 hover:text-white transition-colors" aria-label="Facebook">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-white text-sm font-semibold mb-4 uppercase tracking-wider">{{ ls.t().footer.quickLinks }}</h3>
            <ul class="space-y-2">
              <li><a routerLink="/" class="text-sm text-neutral-400 hover:text-white transition-colors">{{ ls.t().footer.links.home }}</a></li>
              <li><a routerLink="/about" class="text-sm text-neutral-400 hover:text-white transition-colors">{{ ls.t().footer.links.about }}</a></li>
              <li><a routerLink="/programs" class="text-sm text-neutral-400 hover:text-white transition-colors">{{ ls.t().footer.links.programs }}</a></li>
              <li><a routerLink="/placement-test" class="text-sm text-neutral-400 hover:text-white transition-colors">{{ ls.t().footer.links.test }}</a></li>
              <li><a routerLink="/contact" class="text-sm text-neutral-400 hover:text-white transition-colors">{{ ls.t().footer.links.contact }}</a></li>
            </ul>
          </div>

          <!-- Legal -->
          <div>
            <h3 class="text-white text-sm font-semibold mb-4 uppercase tracking-wider">{{ ls.t().footer.legal }}</h3>
            <ul class="space-y-2">
              <li><a routerLink="/privacy-policy" class="text-sm text-neutral-400 hover:text-white transition-colors">{{ ls.t().footer.legalLinks.privacy }}</a></li>
              <li><a routerLink="/terms-of-service" class="text-sm text-neutral-400 hover:text-white transition-colors">{{ ls.t().footer.legalLinks.terms }}</a></li>
              <li><a routerLink="/data-usage" class="text-sm text-neutral-400 hover:text-white transition-colors">{{ ls.t().footer.legalLinks.data }}</a></li>
            </ul>
          </div>

        </div>

        <div class="border-t border-neutral-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p class="text-xs text-neutral-500">
            &copy; {{ currentYear }} {{ siteName() }}. {{ ls.t().footer.rights }}
          </p>
          <p class="text-xs text-neutral-500">
            Talkr by Easy Learning — 651 31 60 26
          </p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent implements OnInit {
  siteName = signal('Talkr by Easy Learning');
  currentYear = new Date().getFullYear();
  ls = inject(LanguageService);

  constructor(private settingsService: WebsiteSettingsService) {}

  ngOnInit() {
    const settings = this.settingsService.settings();
    if (settings?.site_name) {
      this.siteName.set(settings.site_name);
    }
  }
}
