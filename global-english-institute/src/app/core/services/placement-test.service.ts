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
    const readingScore = this.testScoringService.scoreSection(submission.readingAnswers, 'reading');
    const grammarScore = this.testScoringService.scoreSection(submission.grammarAnswers, 'grammar');
    const listeningScore = this.testScoringService.scoreSection(submission.listeningAnswers, 'listening');
    const totalScore = readingScore + grammarScore + listeningScore;
    const cefrLevel = this.testScoringService.mapScoreToCefr(totalScore);

    let speakingUrl: string | null = null;

    if (submission.speakingBlob) {
      const fileName = `speaking_${Date.now()}_${submission.email.replace('@', '_')}.webm`;
      const { data: uploadData, error: uploadError } = await this.supabaseService.uploadFile(
        'speaking-recordings',
        fileName,
        submission.speakingBlob,
        'audio/webm'
      );

      if (!uploadError && uploadData) {
        speakingUrl = this.supabaseService.getPublicUrl('speaking-recordings', fileName);
      }
    }

    const testRecord = {
      full_name: submission.full_name,
      email: submission.email,
      phone: submission.phone,
      reading_score: readingScore,
      grammar_score: grammarScore,
      listening_score: listeningScore,
      writing_score: null,
      speaking_score: null,
      total_score: totalScore,
      cefr_level: cefrLevel,
      status: 'pending',
      writing_response: submission.writingResponse,
      speaking_url: speakingUrl,
    };

    const { data, error } = await this.supabaseService.supabase
      .from('placement_tests')
      .insert(testRecord)
      .select()
      .single();

    if (error) return { data: null, error: error.message };

    // Trigger confirmation email via Edge Function
    try {
      await this.supabaseService.supabase.functions.invoke('send-test-confirmation', {
        body: {
          email: submission.email,
          full_name: submission.full_name,
          reading_score: readingScore,
          grammar_score: grammarScore,
          listening_score: listeningScore,
          total_score: totalScore,
          cefr_level: cefrLevel,
        }
      });
    } catch {
      // Email failure should not block test submission
      console.warn('Failed to send confirmation email');
    }

    return { data: data as PlacementTest, error: null };
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
