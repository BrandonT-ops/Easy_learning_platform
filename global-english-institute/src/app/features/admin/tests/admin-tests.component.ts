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
                          <span class="text-neutral-400 w-16">Grammar</span>
                          <span class="font-semibold text-primary-700">{{ test.grammar_score ?? '-' }}/100</span>
                        </div>
                        <div class="flex items-center gap-2 text-xs">
                          <span class="text-neutral-400 w-16">Reading</span>
                          @if (test.reading_score != null) {
                            <span class="font-medium">{{ test.reading_score }}</span>
                          } @else {
                            <span class="badge badge-yellow text-xs">Pending</span>
                          }
                        </div>
                        <div class="flex items-center gap-2 text-xs">
                          <span class="text-neutral-400 w-16">Writing</span>
                          @if (test.writing_score != null) {
                            <span class="font-medium">{{ test.writing_score }}</span>
                          } @else {
                            <span class="badge badge-yellow text-xs">Pending</span>
                          }
                        </div>
                        <div class="flex items-center gap-2 text-xs">
                          <span class="text-neutral-400 w-16">Listening</span>
                          @if (test.listening_score != null) {
                            <span class="font-medium">{{ test.listening_score }}</span>
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
            <!-- Grammar auto-score info -->
            <div class="bg-primary-50 border border-primary-200 rounded-lg p-3">
              <p class="text-xs font-semibold text-primary-700 mb-0.5">Grammar Auto-Score</p>
              <p class="text-2xl font-bold text-primary-700">{{ selectedTest()!.grammar_score ?? '-' }}<span class="text-sm font-normal text-primary-400">/100</span></p>
            </div>

            <!-- Reading Responses -->
            @if (selectedTest()!.reading_responses) {
              <div>
                <h3 class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Reading Responses</h3>
                <div class="space-y-2">
                  @for (entry of parseResponses(selectedTest()!.reading_responses!); track entry.q) {
                    <div class="bg-neutral-50 rounded-lg border border-neutral-200 p-3">
                      <p class="text-xs font-medium text-neutral-500 mb-1">{{ entry.q }}</p>
                      <p class="text-sm text-neutral-800">{{ entry.a || '(no answer)' }}</p>
                    </div>
                  }
                </div>
              </div>
            }

            <!-- Writing Response -->
            @if (selectedTest()!.writing_response) {
              <div>
                <h3 class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Writing Response</h3>
                <div class="bg-neutral-50 rounded-lg border border-neutral-200 p-4 text-sm text-neutral-700 leading-relaxed max-h-48 overflow-y-auto">
                  {{ selectedTest()!.writing_response }}
                </div>
              </div>
            }

            <!-- Listening Responses -->
            @if (selectedTest()!.listening_responses) {
              <div>
                <h3 class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Listening Responses</h3>
                <div class="space-y-2">
                  @for (entry of parseResponses(selectedTest()!.listening_responses!); track entry.q) {
                    <div class="bg-neutral-50 rounded-lg border border-neutral-200 p-3">
                      <p class="text-xs font-medium text-neutral-500 mb-1">{{ entry.q }}</p>
                      <p class="text-sm text-neutral-800">{{ entry.a || '(no answer)' }}</p>
                    </div>
                  }
                </div>
              </div>
            }

            <!-- Score Entry + Level Assignment -->
            <div>
              <h3 class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Assign Scores & Level</h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="form-label text-xs">Reading Score</label>
                  <input type="number" min="0" max="100"
                         [(ngModel)]="editReadingScore"
                         class="form-input text-sm" placeholder="0–100" />
                </div>
                <div>
                  <label class="form-label text-xs">Writing Score</label>
                  <input type="number" min="0" max="100"
                         [(ngModel)]="editWritingScore"
                         class="form-input text-sm" placeholder="0–100" />
                </div>
                <div>
                  <label class="form-label text-xs">Listening Score</label>
                  <input type="number" min="0" max="100"
                         [(ngModel)]="editListeningScore"
                         class="form-input text-sm" placeholder="0–100" />
                </div>
                <div>
                  <label class="form-label text-xs">Assign Level</label>
                  <select [(ngModel)]="editCefrLevel" class="form-select text-sm">
                    <option value="">{{ selectedTest()!.cefr_level ? 'Keep: ' + selectedTest()!.cefr_level : 'Not assigned yet' }}</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
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
  editReadingScore: number | null = null;
  editWritingScore: number | null = null;
  editListeningScore: number | null = null;
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
    this.editReadingScore = test.reading_score;
    this.editWritingScore = test.writing_score;
    this.editListeningScore = test.listening_score;
    this.editCefrLevel = '';
  }

  // Parse JSON-stored open-ended responses into { q, a } pairs for display
  parseResponses(json: string): { q: string; a: string }[] {
    try {
      const obj = JSON.parse(json) as Record<string, string>;
      const questionLabels: Record<string, string> = {
        r1: 'Q1: Traditional purpose of libraries?',
        r2: 'Q2: Why rethink their role?',
        r3: 'Q3: What do libraries offer for digital tools?',
        r4: 'Q4: Who especially depends on library technology?',
        r5: 'Q5: What is the digital divide?',
        l1: 'Q1: Main purpose of the announcement?',
        l2: 'Q2: What time does the event begin?',
        l3: 'Q3: What should participants bring?',
        l4: 'Q4: What happens after the clean-up?',
        l5: 'Q5: Why might students be interested?',
      };
      return Object.entries(obj).map(([k, v]) => ({ q: questionLabels[k] ?? k, a: v }));
    } catch {
      return [];
    }
  }

  async saveScores() {
    if (!this.selectedTest()) return;
    this.savingScores.set(true);

    const updates: any = {};
    if (this.editReadingScore != null) updates.reading_score = this.editReadingScore;
    if (this.editWritingScore != null) updates.writing_score = this.editWritingScore;
    if (this.editListeningScore != null) updates.listening_score = this.editListeningScore;
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
