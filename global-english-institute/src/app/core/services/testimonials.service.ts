import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Testimonial } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TestimonialsService {
  constructor(private supabaseService: SupabaseService) {}

  async getVisibleTestimonials() {
    return this.supabaseService.supabase
      .from('testimonials')
      .select('*')
      .eq('is_visible', true)
      .order('created_at', { ascending: false });
  }

  async getAllTestimonials() {
    return this.supabaseService.supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });
  }

  async createTestimonial(data: Omit<Testimonial, 'id' | 'created_at'>) {
    return this.supabaseService.supabase
      .from('testimonials')
      .insert(data)
      .select()
      .single();
  }

  async updateTestimonial(id: string, updates: Partial<Testimonial>) {
    return this.supabaseService.supabase
      .from('testimonials')
      .update(updates)
      .eq('id', id);
  }

  async deleteTestimonial(id: string) {
    return this.supabaseService.supabase
      .from('testimonials')
      .delete()
      .eq('id', id);
  }

  async toggleVisibility(id: string, is_visible: boolean) {
    return this.supabaseService.supabase
      .from('testimonials')
      .update({ is_visible })
      .eq('id', id);
  }
}
