import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../core/services/admin.service';
import { AdminStats, PlacementTest, Registration } from '../../../core/models';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="p-6 max-w-6xl mx-auto">
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-neutral-900">Dashboard</h1>
        <p class="text-sm text-neutral-500 mt-1">Overview of platform activity</p>
      </div>

      @if (loading()) {
        <div class="flex items-center justify-center py-20">
          <svg class="w-6 h-6 animate-spin text-primary-600" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
        </div>
      } @else if (stats()) {
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div class="card p-5">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs text-neutral-500 font-medium uppercase tracking-wider">Total Tests</p>
                <p class="text-3xl font-bold text-neutral-900 mt-1">{{ stats()!.totalTests }}</p>
              </div>
              <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <a routerLink="/admin/tests" class="text-xs text-primary-600 hover:underline mt-3 block">View all tests</a>
          </div>

          <div class="card p-5">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs text-neutral-500 font-medium uppercase tracking-wider">Total Registrations</p>
                <p class="text-3xl font-bold text-neutral-900 mt-1">{{ stats()!.totalRegistrations }}</p>
              </div>
              <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <a routerLink="/admin/registrations" class="text-xs text-primary-600 hover:underline mt-3 block">View registrations</a>
          </div>

          <div class="card p-5">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs text-neutral-500 font-medium uppercase tracking-wider">Pending Reviews</p>
                <p class="text-3xl font-bold text-neutral-900 mt-1">{{ stats()!.pendingReviews }}</p>
              </div>
              <div class="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <a routerLink="/admin/tests" class="text-xs text-primary-600 hover:underline mt-3 block">Review now</a>
          </div>
        </div>

        <!-- Recent Tests -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="card">
            <div class="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
              <h2 class="text-sm font-semibold text-neutral-900">Recent Placement Tests</h2>
              <a routerLink="/admin/tests" class="text-xs text-primary-600 hover:underline">View all</a>
            </div>
            <div class="divide-y divide-neutral-100">
              @for (test of stats()!.recentTests; track test.id) {
                <div class="px-5 py-3 flex items-center justify-between">
                  <div class="min-w-0">
                    <p class="text-sm font-medium text-neutral-900 truncate">{{ test.full_name }}</p>
                    <p class="text-xs text-neutral-400">{{ test.email }}</p>
                  </div>
                  <div class="flex items-center gap-2 flex-shrink-0 ml-3">
                    @if (test.cefr_level) {
                      <span class="badge badge-blue">{{ test.cefr_level }}</span>
                    }
                    <span [ngClass]="getStatusClass(test.status)" class="badge">{{ test.status }}</span>
                  </div>
                </div>
              } @empty {
                <div class="px-5 py-6 text-center text-sm text-neutral-400">No tests yet</div>
              }
            </div>
          </div>

          <!-- Recent Registrations -->
          <div class="card">
            <div class="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
              <h2 class="text-sm font-semibold text-neutral-900">Recent Registrations</h2>
              <a routerLink="/admin/registrations" class="text-xs text-primary-600 hover:underline">View all</a>
            </div>
            <div class="divide-y divide-neutral-100">
              @for (reg of stats()!.recentRegistrations; track reg.id) {
                <div class="px-5 py-3">
                  <div class="flex items-center justify-between">
                    <div class="min-w-0">
                      <p class="text-sm font-medium text-neutral-900 truncate">{{ reg.full_name }}</p>
                      <p class="text-xs text-neutral-400">{{ reg.country }} &bull; {{ reg.level || 'No level' }}</p>
                    </div>
                    <p class="text-xs text-neutral-400 flex-shrink-0 ml-3">{{ reg.created_at | date:'MMM d' }}</p>
                  </div>
                </div>
              } @empty {
                <div class="px-5 py-6 text-center text-sm text-neutral-400">No registrations yet</div>
              }
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class AdminDashboardComponent implements OnInit {
  loading = signal(true);
  stats = signal<AdminStats | null>(null);

  constructor(private adminService: AdminService) {}

  async ngOnInit() {
    try {
      const stats = await this.adminService.getDashboardStats();
      this.stats.set(stats);
    } finally {
      this.loading.set(false);
    }
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      pending: 'badge-yellow',
      contacted: 'badge-blue',
      enrolled: 'badge-green',
      rejected: 'badge-red',
    };
    return classes[status] ?? 'badge-neutral';
  }
}
