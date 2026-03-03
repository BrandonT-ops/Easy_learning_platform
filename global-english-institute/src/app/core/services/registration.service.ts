import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Registration } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private supabaseService: SupabaseService) {}

  async register(data: Omit<Registration, 'id' | 'created_at'>): Promise<{ data: Registration | null; error: string | null }> {
    const { data: result, error } = await this.supabaseService.supabase
      .from('registrations')
      .insert(data)
      .select()
      .single();

    if (error) return { data: null, error: error.message };

    // Trigger confirmation email via Edge Function
    try {
      await this.supabaseService.supabase.functions.invoke('send-registration-confirmation', {
        body: {
          email: data.email,
          full_name: data.full_name,
          level: data.level,
          preferred_schedule: data.preferred_schedule,
        }
      });
    } catch {
      console.warn('Failed to send registration confirmation email');
    }

    return { data: result as Registration, error: null };
  }

  async getAllRegistrations() {
    return this.supabaseService.supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });
  }

  exportToCsv(registrations: Registration[]): void {
    const headers = ['Name', 'Email', 'Phone', 'Country', 'Schedule', 'Level', 'Date'];
    const rows = registrations.map(r => [
      r.full_name,
      r.email,
      r.phone,
      r.country,
      r.preferred_schedule,
      r.level,
      new Date(r.created_at).toLocaleDateString(),
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `registrations_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
