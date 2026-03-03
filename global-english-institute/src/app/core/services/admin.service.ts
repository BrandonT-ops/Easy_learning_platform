import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { AdminStats } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private supabaseService: SupabaseService) {}

  async getDashboardStats(): Promise<AdminStats> {
    const [testsResult, registrationsResult, pendingResult, recentTestsResult, recentRegsResult] = await Promise.all([
      this.supabaseService.supabase.from('placement_tests').select('id', { count: 'exact', head: true }),
      this.supabaseService.supabase.from('registrations').select('id', { count: 'exact', head: true }),
      this.supabaseService.supabase
        .from('placement_tests')
        .select('id', { count: 'exact', head: true })
        .is('writing_score', null),
      this.supabaseService.supabase
        .from('placement_tests')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5),
      this.supabaseService.supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5),
    ]);

    return {
      totalTests: testsResult.count ?? 0,
      totalRegistrations: registrationsResult.count ?? 0,
      pendingReviews: pendingResult.count ?? 0,
      recentTests: recentTestsResult.data ?? [],
      recentRegistrations: recentRegsResult.data ?? [],
    };
  }
}
