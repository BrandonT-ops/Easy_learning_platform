import { Injectable } from '@angular/core';
import { CefrLevel, TestAnswer, ScoringResult } from '../models';

/**
 * TestScoringService
 *
 * Handles all scoring logic for the CEFR placement test.
 * Architecture is prepared for future integration with AI-generated questions:
 * - Questions are decoupled from scoring logic
 * - Answer keys are stored separately and can be fetched from a database
 * - Scoring algorithms are abstracted for easy replacement or augmentation
 */
@Injectable({
  providedIn: 'root'
})
export class TestScoringService {

  /**
   * Static answer keys for MVP.
   * Future: Fetch from database table `test_questions` with correct_answer column.
   */
  private readonly answerKeys: Record<string, Record<string, string>> = {
    reading: {
      'r1': 'b',
      'r2': 'c',
      'r3': 'a',
      'r4': 'b',
      'r5': 'd',
      'r6': 'a',
      'r7': 'c',
    },
    grammar: {
      'g1': 'b',
      'g2': 'a',
      'g3': 'c',
      'g4': 'b',
      'g5': 'd',
      'g6': 'a',
      'g7': 'b',
      'g8': 'c',
      'g9': 'a',
      'g10': 'd',
    },
    listening: {
      'l1': 'b',
      'l2': 'a',
      'l3': 'c',
      'l4': 'b',
      'l5': 'a',
    },
  };

  /**
   * Score a section based on provided answers and answer key.
   * Future: Replace answer key lookup with AI scoring API call.
   */
  scoreSection(answers: TestAnswer[], section: 'reading' | 'grammar' | 'listening'): number {
    const key = this.answerKeys[section];
    if (!key) return 0;

    const totalQuestions = Object.keys(key).length;
    if (totalQuestions === 0) return 0;

    const correct = answers.filter(a => {
      const correctAnswer = key[a.questionId];
      return correctAnswer && a.answer.toLowerCase() === correctAnswer.toLowerCase();
    }).length;

    // Normalize to section's max contribution toward 100-point total
    const sectionWeights: Record<string, number> = {
      reading: 35,
      grammar: 40,
      listening: 25,
    };

    const weight = sectionWeights[section] ?? 33;
    return Math.round((correct / totalQuestions) * weight);
  }

  /**
   * Calculate full scoring result.
   */
  calculateScore(
    readingAnswers: TestAnswer[],
    grammarAnswers: TestAnswer[],
    listeningAnswers: TestAnswer[]
  ): ScoringResult {
    const readingScore = this.scoreSection(readingAnswers, 'reading');
    const grammarScore = this.scoreSection(grammarAnswers, 'grammar');
    const listeningScore = this.scoreSection(listeningAnswers, 'listening');
    const totalObjectiveScore = readingScore + grammarScore + listeningScore;

    return {
      readingScore,
      grammarScore,
      listeningScore,
      totalObjectiveScore,
      cefrLevel: this.mapScoreToCefr(totalObjectiveScore),
    };
  }

  /**
   * Map numeric score to CEFR level.
   * Scoring bands:
   * 0–20   → A1
   * 21–40  → A2
   * 41–60  → B1
   * 61–80  → B2
   * 81–100 → C1
   */
  mapScoreToCefr(score: number): CefrLevel {
    if (score <= 20) return 'A1';
    if (score <= 40) return 'A2';
    if (score <= 60) return 'B1';
    if (score <= 80) return 'B2';
    return 'C1';
  }

  getCefrDescription(level: CefrLevel): string {
    const descriptions: Record<CefrLevel, string> = {
      A1: 'Beginner - You can understand and use familiar everyday expressions.',
      A2: 'Elementary - You can communicate in simple and routine tasks.',
      B1: 'Intermediate - You can deal with most situations likely to arise whilst travelling.',
      B2: 'Upper Intermediate - You can interact with a degree of fluency with native speakers.',
      C1: 'Advanced - You can express ideas fluently and spontaneously.',
    };
    return descriptions[level];
  }
}
