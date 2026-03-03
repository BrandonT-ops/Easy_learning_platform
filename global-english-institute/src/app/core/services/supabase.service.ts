import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private client!: SupabaseClient;
  readonly configured: boolean;

  constructor() {
    const url = environment.supabaseUrl;
    const key = environment.supabaseAnonKey;

    const isPlaceholder = !url || url.includes('YOUR_SUPABASE') || !url.startsWith('http');

    if (isPlaceholder) {
      console.warn(
        '[SupabaseService] Supabase credentials are not configured. ' +
        'Set SUPABASE_URL and SUPABASE_ANON_KEY as environment variables ' +
        'and redeploy. Database features will not work until configured.'
      );
      this.configured = false;
    } else {
      this.client = createClient(url, key);
      this.configured = true;
    }
  }

  get supabase(): SupabaseClient {
    if (!this.configured) {
      throw new Error('Supabase is not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.');
    }
    return this.client;
  }

  async getUser(): Promise<User | null> {
    const { data } = await this.client.auth.getUser();
    return data.user;
  }

  async getSession(): Promise<Session | null> {
    const { data } = await this.client.auth.getSession();
    return data.session;
  }

  async signIn(email: string, password: string) {
    return this.client.auth.signInWithPassword({ email, password });
  }

  async signOut() {
    return this.client.auth.signOut();
  }

  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return this.client.auth.onAuthStateChange(callback);
  }

  async uploadFile(bucket: string, path: string, file: File | Blob, contentType?: string) {
    return this.client.storage.from(bucket).upload(path, file, {
      contentType,
      upsert: true
    });
  }

  getPublicUrl(bucket: string, path: string): string {
    const { data } = this.client.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }
}
