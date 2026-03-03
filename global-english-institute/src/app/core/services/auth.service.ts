import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from './supabase.service';
import { Profile } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = signal<Profile | null>(null);
  private _loading = signal<boolean>(true);

  readonly user = this._user.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly isAdmin = computed(() => this._user()?.role === 'admin');
  readonly isAuthenticated = computed(() => !!this._user());

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {
    this.init();
  }

  private async init() {
    if (!this.supabaseService.configured) {
      this._loading.set(false);
      return;
    }

    try {
      const session = await this.supabaseService.getSession();
      if (session?.user) {
        await this.loadProfile(session.user.id);
      }
    } catch {
      // Auth init failure should not crash the app
    } finally {
      this._loading.set(false);
    }

    this.supabaseService.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        await this.loadProfile(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        this._user.set(null);
      }
    });
  }

  private async loadProfile(userId: string) {
    const { data } = await this.supabaseService.supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (data) {
      this._user.set(data as Profile);
    }
  }

  async signIn(email: string, password: string): Promise<{ error: string | null }> {
    const { error } = await this.supabaseService.signIn(email, password);
    if (error) return { error: error.message };
    return { error: null };
  }

  async signOut() {
    await this.supabaseService.signOut();
    this._user.set(null);
    this.router.navigate(['/']);
  }
}
