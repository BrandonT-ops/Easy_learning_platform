import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlacementTestService } from '../../../core/services/placement-test.service';
import { PlacementTest, EnglishLevel } from '../../../core/models';

@Component({
  selector: 'app-admin-tests',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 max-w-6xl mx-auto">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-neutral-900">Placement Tests</h1>
          <p class="text-sm text-neutral-500 mt-1">Review and manage all test submissions</p>
        </div>
      </div>

      <!-- Filters -->
      <div class="card p-4 mb-6 flex flex-col sm:flex-row gap-3">
        <select [(ngModel)]="filterLevel" (ngModelChange)="applyFilters()"
                class="form-select max-w-xs text-sm">
          <option value="">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <select [(ngModel)]="filterStatus" (ngModelChange)="applyFilters()"
                class="form-select max-w-xs text-sm">
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="contacted">Contacted</option>
          <option value="enrolled">Enrolled</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      @if (loading()) {
        <div class="flex items-center justify-center py-20">
          <svg class="w-6 h-6 animate-spin text-primary-600" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
        </div>
      } @else {
        <!-- Table -->
        <div class="card overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th class="text-left py-3 px-4 font-medium text-neutral-600 text-xs uppercase tracking-wider">Name</th>
                  <th class="text-left py-3 px-4 font-medium text-neutral-600 text-xs uppercase tracking-wider">Scores</th>
                  <th class="text-left py-3 px-4 font-medium text-neutral-600 text-xs uppercase tracking-wider">Level</th>
                  <th class="text-left py-3 px-4 font-medium text-neutral-600 text-xs uppercase tracking-wider">Status</th>
                  <th class="text-left py-3 px-4 font-medium text-neutral-600 text-xs uppercase tracking-wider">Date</th>
                  <th class="text-left py-3 px-4 font-medium text-neutral-600 text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-neutral-100">
                @for (test of filteredTests(); track test.id) {
                  <tr class="hover:bg-neutral-50 transition-colors">
                    <td class="py-3 px-4">
                      <p class="font-medium text-neutral-900">{{ test.full_name }}</p>
                      <p class="text-xs text-neutral-400">{{ test.email }}</p>
                    </td>
                    <td class="py-3 px-4">
                      <div class="space-y-0.5">
                        <div class="flex items-center gap-2 text-xs">
                          <span class="text-neutral-400 w-14">Reading</span>
                          <span class="font-medium">{{ test.reading_score ?? '-' }}/35</span>
                        </div>
                        <div class="flex items-center gap-2 text-xs">
                          <span class="text-neutral-400 w-14">Grammar</span>
                          <span class="font-medium">{{ test.grammar_score ?? '-' }}/40</span>
                        </div>
                        <div class="flex items-center gap-2 text-xs">
                          <span class="text-neutral-400 w-14">Listening</span>
                          <span class="font-medium">{{ test.listening_score ?? '-' }}/25</span>
                        </div>
                        <div class="flex items-center gap-2 text-xs">
                          <span class="text-neutral-400 w-14">Writing</span>
                          @if (test.writing_score != null) {
                            <span class="font-medium">{{ test.writing_score }}</span>
                          } @else {
                            <span class="badge badge-yellow text-xs">Pending</span>
                          }
                        </div>
                        <div class="flex items-center gap-2 text-xs">
                          <span class="text-neutral-400 w-14">Speaking</span>
                          @if (test.speaking_score != null) {
                            <span class="font-medium">{{ test.speaking_score }}</span>
                          } @else {
                            <span class="badge badge-yellow text-xs">Pending</span>
                          }
                        </div>
                      </div>
                    </td>
                    <td class="py-3 px-4">
                      @if (test.cefr_level) {
                        <span class="badge badge-blue">{{ test.cefr_level }}</span>
                      } @else {
                        <span class="text-neutral-400 text-xs">-</span>
                      }
                    </td>
                    <td class="py-3 px-4">
                      <select [value]="test.status" (change)="updateStatus(test.id, $any($event.target).value)"
                              class="text-xs border border-neutral-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary-500">
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="enrolled">Enrolled</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td class="py-3 px-4 text-xs text-neutral-400">
                      {{ test.created_at | date:'MMM d, y' }}
                    </td>
                    <td class="py-3 px-4">
                      <button (click)="openDetail(test)"
                              class="text-xs text-primary-600 hover:underline font-medium">
                        Review
                      </button>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="6" class="py-10 text-center text-sm text-neutral-400">No tests found</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>

    <!-- Detail Modal -->
    @if (selectedTest()) {
      <div class="fixed inset-0 bg-black/30 z-50 flex items-start justify-center p-4 overflow-y-auto">
        <div class="bg-white rounded-xl shadow-xl w-full max-w-2xl my-8">
          <div class="flex items-center justify-between p-5 border-b border-neutral-200">
            <div>
              <h2 class="text-base font-semibold text-neutral-900">{{ selectedTest()!.full_name }}</h2>
              <p class="text-xs text-neutral-400">{{ selectedTest()!.email }} &bull; {{ selectedTest()!.phone }}</p>
            </div>
            <button (click)="selectedTest.set(null)" class="text-neutral-400 hover:text-neutral-600">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="p-5 space-y-5">
            <!-- Writing Response -->
            @if (selectedTest()!.writing_response) {
              <div>
                <h3 class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Writing Response</h3>
                <div class="bg-neutral-50 rounded-lg border border-neutral-200 p-4 text-sm text-neutral-700 leading-relaxed max-h-40 overflow-y-auto">
                  {{ selectedTest()!.writing_response }}
                </div>
              </div>
            }

            <!-- Speaking Recording -->
            @if (selectedTest()!.speaking_url) {
              <div>
                <h3 class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Speaking Recording</h3>
                <audio controls class="w-full" [src]="selectedTest()!.speaking_url!">
                  Your browser does not support audio.
                </audio>
              </div>
            }

            <!-- Score Override -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="form-label text-xs">Writing Score</label>
                <input type="number" min="0" max="100"
                       [(ngModel)]="editWritingScore"
                       class="form-input text-sm" placeholder="0–100" />
              </div>
              <div>
                <label class="form-label text-xs">Speaking Score</label>
                <input type="number" min="0" max="100"
                       [(ngModel)]="editSpeakingScore"
                       class="form-input text-sm" placeholder="0–100" />
              </div>
              <div>
                <label class="form-label text-xs">Override Level</label>
                <select [(ngModel)]="editCefrLevel" class="form-select text-sm">
                  <option value="">Keep current ({{ selectedTest()!.cefr_level }})</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div class="flex items-center justify-end gap-3 pt-2 border-t border-neutral-100">
              <button (click)="selectedTest.set(null)" class="btn-ghost text-sm">Cancel</button>
              <button (click)="saveScores()" [disabled]="savingScores()" class="btn-primary text-sm">
                @if (savingScores()) { Saving... } @else { Save Scores }
              </button>
            </div>
          </div>
        </div>
      </div>
    }
  `
})
export class AdminTestsComponent implements OnInit {
  loading = signal(true);
  tests = signal<PlacementTest[]>([]);
  filteredTests = signal<PlacementTest[]>([]);
  filterLevel = '';
  filterStatus = '';
  selectedTest = signal<PlacementTest | null>(null);
  editWritingScore: number | null = null;
  editSpeakingScore: number | null = null;
  editCefrLevel = '';
  savingScores = signal(false);

  constructor(private placementTestService: PlacementTestService) {}

  async ngOnInit() {
    await this.loadTests();
  }

  async loadTests() {
    this.loading.set(true);
    const { data } = await this.placementTestService.getAllTests();
    if (data) {
      this.tests.set(data as PlacementTest[]);
      this.filteredTests.set(data as PlacementTest[]);
    }
    this.loading.set(false);
  }

  applyFilters() {
    let filtered = this.tests();
    if (this.filterLevel) filtered = filtered.filter(t => t.cefr_level === this.filterLevel);
    if (this.filterStatus) filtered = filtered.filter(t => t.status === this.filterStatus);
    this.filteredTests.set(filtered);
  }

  async updateStatus(id: string, status: string) {
    await this.placementTestService.updateTestStatus(id, status);
    this.tests.update(tests => tests.map(t => t.id === id ? { ...t, status: status as any } : t));
    this.applyFilters();
  }

  openDetail(test: PlacementTest) {
    this.selectedTest.set(test);
    this.editWritingScore = test.writing_score;
    this.editSpeakingScore = test.speaking_score;
    this.editCefrLevel = '';
  }

  async saveScores() {
    if (!this.selectedTest()) return;
    this.savingScores.set(true);

    const updates: any = {};
    if (this.editWritingScore != null) updates.writing_score = this.editWritingScore;
    if (this.editSpeakingScore != null) updates.speaking_score = this.editSpeakingScore;
    if (this.editCefrLevel) updates.cefr_level = this.editCefrLevel;

    await this.placementTestService.updateTestScores(this.selectedTest()!.id, updates);

    // Update local state
    this.tests.update(tests => tests.map(t =>
      t.id === this.selectedTest()!.id ? { ...t, ...updates } : t
    ));
    this.applyFilters();
    this.savingScores.set(false);
    this.selectedTest.set(null);
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
