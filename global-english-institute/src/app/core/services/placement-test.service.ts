import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { TestScoringService } from './test-scoring.service';
import { TestSubmission, PlacementTest } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PlacementTestService {
  constructor(
    private supabaseService: SupabaseService,
    private testScoringService: TestScoringService
  ) {}

  async submitTest(submission: TestSubmission): Promise<{ data: PlacementTest | null; error: string | null }> {
    // Only grammar is auto-scored; reading/listening/writing are reviewed by admin.
    const grammarScore = this.testScoringService.scoreGrammar(submission.grammarAnswers);

    const testRecord = {
      full_name: submission.full_name,
      email: submission.email,
      phone: submission.phone,
      grammar_score: grammarScore,
      reading_score: null,
      listening_score: null,
      writing_score: null,
      speaking_score: null,
      total_score: grammarScore,
      cefr_level: null,        // set by admin after full review
      status: 'pending',
      writing_response: submission.writingResponse,
      reading_responses: JSON.stringify(submission.readingResponses),
      listening_responses: JSON.stringify(submission.listeningResponses),
    };

    // Use plain insert (no .select()) to avoid RLS SELECT restriction for anon users.
    const { error } = await this.supabaseService.supabase
      .from('placement_tests')
      .insert(testRecord);

    if (error) return { data: null, error: error.message };

    // Trigger confirmation email via Edge Function
    try {
      await this.supabaseService.supabase.functions.invoke('send-test-confirmation', {
        body: {
          email: submission.email,
          full_name: submission.full_name,
          grammar_score: grammarScore,
        }
      });
    } catch {
      console.warn('Failed to send confirmation email');
    }

    // Return a client-constructed result (no DB SELECT needed)
    const result: PlacementTest = {
      id: '',
      full_name: submission.full_name,
      email: submission.email,
      phone: submission.phone ?? '',
      grammar_score: grammarScore,
      reading_score: null,
      listening_score: null,
      writing_score: null,
      speaking_score: null,
      total_score: grammarScore,
      cefr_level: null,
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    return { data: result, error: null };
  }

  async getAllTests(filters?: { cefr_level?: string; status?: string }) {
    let query = this.supabaseService.supabase
      .from('placement_tests')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.cefr_level) {
      query = query.eq('cefr_level', filters.cefr_level);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    return query;
  }

  async updateTestStatus(id: string, status: string) {
    return this.supabaseService.supabase
      .from('placement_tests')
      .update({ status })
      .eq('id', id);
  }

  async updateTestScores(id: string, updates: {
    writing_score?: number;
    speaking_score?: number;
    cefr_level?: string;
  }) {
    return this.supabaseService.supabase
      .from('placement_tests')
      .update(updates)
      .eq('id', id);
  }

  async getTestById(id: string) {
    return this.supabaseService.supabase
      .from('placement_tests')
      .select('*')
      .eq('id', id)
      .maybeSingle();
  }
}
