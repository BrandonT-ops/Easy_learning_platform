import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TestimonialsService } from '../../../core/services/testimonials.service';
import { Testimonial } from '../../../core/models';

@Component({
  selector: 'app-admin-testimonials',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 max-w-4xl mx-auto">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-neutral-900">Testimonials</h1>
          <p class="text-sm text-neutral-500 mt-1">Manage student testimonials shown on the website</p>
        </div>
        <button (click)="showForm.set(true)" class="btn-primary text-sm flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Testimonial
        </button>
      </div>

      <!-- Add/Edit Form -->
      @if (showForm()) {
        <div class="card p-6 mb-6">
          <h2 class="text-base font-semibold text-neutral-900 mb-4">
            {{ editingId() ? 'Edit Testimonial' : 'Add New Testimonial' }}
          </h2>
          <div class="space-y-4">
            <div>
              <label class="form-label text-sm">Student Name <span class="text-red-500">*</span></label>
              <input type="text" [(ngModel)]="formName" class="form-input" placeholder="Student's name" />
            </div>
            <div>
              <label class="form-label text-sm">Testimonial <span class="text-red-500">*</span></label>
              <textarea rows="4" [(ngModel)]="formContent" class="form-textarea"
                        placeholder="Student's testimonial..."></textarea>
            </div>
            <div class="flex items-center gap-2">
              <input type="checkbox" id="visible" [(ngModel)]="formVisible"
                     class="rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
              <label for="visible" class="text-sm text-neutral-700">Visible on website</label>
            </div>
          </div>
          <div class="flex items-center gap-3 mt-5 pt-4 border-t border-neutral-100">
            <button (click)="cancelForm()" class="btn-ghost text-sm">Cancel</button>
            <button (click)="saveTestimonial()" [disabled]="saving()" class="btn-primary text-sm">
              @if (saving()) { Saving... } @else { {{ editingId() ? 'Save Changes' : 'Add Testimonial' }} }
            </button>
          </div>
        </div>
      }

      <!-- List -->
      @if (loading()) {
        <div class="flex items-center justify-center py-20">
          <svg class="w-6 h-6 animate-spin text-primary-600" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
        </div>
      } @else {
        <div class="space-y-3">
          @for (t of testimonials(); track t.id) {
            <div class="card p-5 flex items-start justify-between gap-4">
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <p class="text-sm font-semibold text-neutral-900">{{ t.student_name }}</p>
                  @if (t.is_visible) {
                    <span class="badge badge-green text-xs">Visible</span>
                  } @else {
                    <span class="badge badge-neutral text-xs">Hidden</span>
                  }
                </div>
                <p class="text-sm text-neutral-500 leading-relaxed">"{{ t.content }}"</p>
              </div>
              <div class="flex items-center gap-2 flex-shrink-0">
                <button (click)="toggleVisibility(t)" class="btn-ghost text-xs p-1.5" title="Toggle visibility">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    @if (t.is_visible) {
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    } @else {
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    }
                  </svg>
                </button>
                <button (click)="startEdit(t)" class="btn-ghost text-xs p-1.5" title="Edit">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button (click)="deleteTestimonial(t.id)" class="btn-ghost text-xs p-1.5 text-red-500 hover:bg-red-50" title="Delete">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          } @empty {
            <div class="card p-10 text-center">
              <p class="text-sm text-neutral-400">No testimonials yet. Add your first one.</p>
            </div>
          }
        </div>
      }
    </div>
  `
})
export class AdminTestimonialsComponent implements OnInit {
  loading = signal(true);
  testimonials = signal<Testimonial[]>([]);
  showForm = signal(false);
  editingId = signal<string | null>(null);
  saving = signal(false);

  formName = '';
  formContent = '';
  formVisible = true;

  constructor(private testimonialsService: TestimonialsService) {}

  async ngOnInit() {
    await this.loadTestimonials();
  }

  async loadTestimonials() {
    this.loading.set(true);
    const { data } = await this.testimonialsService.getAllTestimonials();
    if (data) this.testimonials.set(data as Testimonial[]);
    this.loading.set(false);
  }

  startEdit(t: Testimonial) {
    this.editingId.set(t.id);
    this.formName = t.student_name;
    this.formContent = t.content;
    this.formVisible = t.is_visible;
    this.showForm.set(true);
  }

  cancelForm() {
    this.showForm.set(false);
    this.editingId.set(null);
    this.formName = '';
    this.formContent = '';
    this.formVisible = true;
  }

  async saveTestimonial() {
    if (!this.formName.trim() || !this.formContent.trim()) return;
    this.saving.set(true);

    if (this.editingId()) {
      await this.testimonialsService.updateTestimonial(this.editingId()!, {
        student_name: this.formName,
        content: this.formContent,
        is_visible: this.formVisible,
      });
    } else {
      await this.testimonialsService.createTestimonial({
        student_name: this.formName,
        content: this.formContent,
        is_visible: this.formVisible,
      });
    }

    await this.loadTestimonials();
    this.saving.set(false);
    this.cancelForm();
  }

  async toggleVisibility(t: Testimonial) {
    await this.testimonialsService.toggleVisibility(t.id, !t.is_visible);
    this.testimonials.update(list => list.map(item =>
      item.id === t.id ? { ...item, is_visible: !item.is_visible } : item
    ));
  }

  async deleteTestimonial(id: string) {
    if (!confirm('Delete this testimonial?')) return;
    await this.testimonialsService.deleteTestimonial(id);
    this.testimonials.update(list => list.filter(t => t.id !== id));
  }
}
