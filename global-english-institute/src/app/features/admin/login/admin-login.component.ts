import { Component, signal } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div class="w-full max-w-sm">
        <div class="text-center mb-8">
          <div class="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 class="text-xl font-bold text-neutral-900">Admin Access</h1>
          <p class="text-sm text-neutral-400 mt-1">Global English Institute</p>
        </div>

        <div class="card p-6">
          <form (ngSubmit)="onSubmit()" #loginForm="ngForm" novalidate>
            <div class="space-y-4">
              <div>
                <label for="email" class="form-label">Email Address</label>
                <input id="email" name="email" type="email" required
                       [(ngModel)]="email"
                       class="form-input"
                       placeholder="admin@example.com"
                       autocomplete="username"
                       #emailInput="ngModel" />
              </div>
              <div>
                <label for="password" class="form-label">Password</label>
                <div class="relative">
                  <input id="password" name="password" [type]="showPassword() ? 'text' : 'password'" required
                         [(ngModel)]="password"
                         class="form-input pr-10"
                         placeholder="••••••••"
                         autocomplete="current-password"
                         #passInput="ngModel" />
                  <button type="button" (click)="toggleShowPassword()"
                          class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      @if (showPassword()) {
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      } @else {
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      }
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            @if (errorMessage()) {
              <div class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p class="text-xs text-red-600">{{ errorMessage() }}</p>
              </div>
            }

            <button type="submit"
                    [disabled]="loading() || !loginForm.valid"
                    class="btn-primary w-full mt-5">
              @if (loading()) {
                <svg class="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Signing in...
              } @else {
                Sign In
              }
            </button>
          </form>
        </div>

        <div class="mt-6 text-center">
          <a routerLink="/" class="text-xs text-neutral-400 hover:text-neutral-600 transition-colors">
            Return to website
          </a>
        </div>
      </div>
    </div>
  `
})
export class AdminLoginComponent {
  email = '';
  password = '';
  loading = signal(false);
  errorMessage = signal<string | null>(null);
  showPassword = signal(false);

  toggleShowPassword() {
    this.showPassword.set(!this.showPassword());
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  async onSubmit() {
    this.loading.set(true);
    this.errorMessage.set(null);

    const { error } = await this.authService.signIn(this.email, this.password);

    if (error) {
      this.errorMessage.set('Invalid email or password. Please try again.');
      this.loading.set(false);
      return;
    }

    // Wait for profile to load before navigating so the guard doesn't bounce back
    await this.authService.waitForProfile();
    this.loading.set(false);
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';
    this.router.navigate([returnUrl]);
  }
}
