import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationService } from '../../../core/services/registration.service';
import { Registration } from '../../../core/models';

@Component({
  selector: 'app-admin-registrations',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 max-w-6xl mx-auto">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-neutral-900">Registrations</h1>
          <p class="text-sm text-neutral-500 mt-1">{{ registrations().length }} total registrations</p>
        </div>
        <button (click)="exportCsv()" class="btn-secondary text-sm flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export CSV
        </button>
      </div>

      @if (loading()) {
        <div class="flex items-center justify-center py-20">
          <svg class="w-6 h-6 animate-spin text-primary-600" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
        </div>
      } @else {
        <div class="card overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th class="text-left py-3 px-4 font-medium text-neutral-600 text-xs uppercase tracking-wider">Name</th>
                  <th class="text-left py-3 px-4 font-medium text-neutral-600 text-xs uppercase tracking-wider">Contact</th>
                  <th class="text-left py-3 px-4 font-medium text-neutral-600 text-xs uppercase tracking-wider">Country</th>
                  <th class="text-left py-3 px-4 font-medium text-neutral-600 text-xs uppercase tracking-wider">Level</th>
                  <th class="text-left py-3 px-4 font-medium text-neutral-600 text-xs uppercase tracking-wider">Schedule</th>
                  <th class="text-left py-3 px-4 font-medium text-neutral-600 text-xs uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-neutral-100">
                @for (reg of registrations(); track reg.id) {
                  <tr class="hover:bg-neutral-50 transition-colors">
                    <td class="py-3 px-4 font-medium text-neutral-900">{{ reg.full_name }}</td>
                    <td class="py-3 px-4">
                      <p class="text-neutral-700">{{ reg.email }}</p>
                      <p class="text-xs text-neutral-400">{{ reg.phone }}</p>
                    </td>
                    <td class="py-3 px-4 text-neutral-600">{{ reg.country }}</td>
                    <td class="py-3 px-4">
                      @if (reg.level) {
                        <span class="badge badge-blue">{{ reg.level }}</span>
                      } @else {
                        <span class="text-xs text-neutral-400">Not specified</span>
                      }
                    </td>
                    <td class="py-3 px-4 text-xs text-neutral-500">{{ formatSchedule(reg.preferred_schedule) }}</td>
                    <td class="py-3 px-4 text-xs text-neutral-400">{{ reg.created_at | date:'MMM d, y' }}</td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="6" class="py-10 text-center text-sm text-neutral-400">No registrations yet</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  `
})
export class AdminRegistrationsComponent implements OnInit {
  loading = signal(true);
  registrations = signal<Registration[]>([]);

  constructor(private registrationService: RegistrationService) {}

  async ngOnInit() {
    const { data } = await this.registrationService.getAllRegistrations();
    if (data) this.registrations.set(data as Registration[]);
    this.loading.set(false);
  }

  exportCsv() {
    this.registrationService.exportToCsv(this.registrations());
  }

  formatSchedule(schedule: string): string {
    const labels: Record<string, string> = {
      weekday_morning: 'Weekday mornings',
      weekday_afternoon: 'Weekday afternoons',
      weekday_evening: 'Weekday evenings',
      weekend: 'Weekends',
      flexible: 'Flexible',
    };
    return labels[schedule] ?? schedule ?? '-';
  }
}
