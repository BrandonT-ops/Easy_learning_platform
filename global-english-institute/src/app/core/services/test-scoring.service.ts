import { Injectable } from '@angular/core';
import { EnglishLevel, TestAnswer, ScoringResult } from '../models';

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
      cefrLevel: this.mapScoreToLevel(totalObjectiveScore),
    };
  }

  /**
   * Map numeric score to English level.
   * Scoring bands:
   * 0–33   → Beginner
   * 34–66  → Intermediate
   * 67–100 → Advanced
   */
  mapScoreToLevel(score: number): EnglishLevel {
    if (score <= 33) return 'Beginner';
    if (score <= 66) return 'Intermediate';
    return 'Advanced';
  }

  /** @deprecated use mapScoreToLevel */
  mapScoreToCefr(score: number): EnglishLevel {
    return this.mapScoreToLevel(score);
  }

  getLevelDescription(level: EnglishLevel): string {
    const descriptions: Record<EnglishLevel, string> = {
      Beginner: 'Beginner — you can understand and use familiar everyday expressions.',
      Intermediate: 'Intermediate — you can handle most everyday situations with confidence.',
      Advanced: 'Advanced — you can express ideas fluently and spontaneously.',
    };
    return descriptions[level];
  }

  /** @deprecated use getLevelDescription */
  getCefrDescription(level: EnglishLevel): string {
    return this.getLevelDescription(level);
  }
}
