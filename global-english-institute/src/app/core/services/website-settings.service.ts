import { Injectable, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { WebsiteSettings } from '../models';

@Injectable({
  providedIn: 'root'
})
export class WebsiteSettingsService {
  private _settings = signal<WebsiteSettings | null>(null);
  readonly settings = this._settings.asReadonly();

  constructor(private supabaseService: SupabaseService) {
    this.loadSettings();
  }

  private readonly defaultSettings: WebsiteSettings = {
    id: '',
    site_name: 'Global English Institute',
    tagline: 'Professional Online English Language Training',
    primary_color: '#2563eb',
    contact_email: 'info@globalenglishinstitute.com',
    phone: '+1 (555) 000-0000',
    updated_at: new Date().toISOString(),
  };

  async loadSettings() {
    if (!this.supabaseService.configured) {
      this._settings.set(this.defaultSettings);
      return;
    }

    try {
      const { data } = await this.supabaseService.supabase
        .from('website_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      this._settings.set(data ? (data as WebsiteSettings) : this.defaultSettings);
    } catch {
      this._settings.set(this.defaultSettings);
    }
  }

  async updateSettings(updates: Partial<WebsiteSettings>): Promise<{ error: string | null }> {
    const current = this._settings();
    if (!current) return { error: 'Settings not loaded' };

    let result;
    if (current.id) {
      result = await this.supabaseService.supabase
        .from('website_settings')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', current.id);
    } else {
      result = await this.supabaseService.supabase
        .from('website_settings')
        .insert({ ...updates, updated_at: new Date().toISOString() });
    }

    if (result.error) return { error: result.error.message };

    this._settings.set({ ...current, ...updates });
    return { error: null };
  }

  getSiteName(): string {
    return this._settings()?.site_name ?? 'Global English Institute';
  }
}
