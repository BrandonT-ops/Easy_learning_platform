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
  // Grammar answer key: 20 questions, auto-scored.
  // Reading and listening are now open-ended — manually reviewed by admin.
  private readonly answerKeys: Record<string, Record<string, string>> = {
    grammar: {
      'g1': 'b',
      'g2': 'b',
      'g3': 'b',
      'g4': 'b',
      'g5': 'a',
      'g6': 'b',
      'g7': 'c',
      'g8': 'c',
      'g9': 'd',
      'g10': 'b',
      'g11': 'b',
      'g12': 'b',
      'g13': 'b',
      'g14': 'a',
      'g15': 'c',
      'g16': 'c',
      'g17': 'b',
      'g18': 'c',
      'g19': 'b',
      'g20': 'a',
    },
  };

  /**
   * Score a section based on provided answers and answer key.
   * Future: Replace answer key lookup with AI scoring API call.
   */
  // Grammar is the only auto-scored section (20 questions, each worth 5 pts = 100 max).
  // Reading and listening are open-ended and manually scored by admin.
  scoreGrammar(answers: TestAnswer[]): number {
    const key = this.answerKeys['grammar'];
    const totalQuestions = Object.keys(key).length;
    if (totalQuestions === 0) return 0;

    const correct = answers.filter(a => {
      const correctAnswer = key[a.questionId];
      return correctAnswer && a.answer.toLowerCase() === correctAnswer.toLowerCase();
    }).length;

    return Math.round((correct / totalQuestions) * 100);
  }

  /** @deprecated kept for compatibility — only grammar is auto-scored now */
  scoreSection(answers: TestAnswer[], section: string): number {
    if (section === 'grammar') return this.scoreGrammar(answers);
    return 0;
  }

  calculateScore(
    _readingAnswers: TestAnswer[],
    grammarAnswers: TestAnswer[],
    _listeningAnswers: TestAnswer[]
  ): ScoringResult {
    const grammarScore = this.scoreGrammar(grammarAnswers);
    return {
      readingScore: 0,
      grammarScore,
      listeningScore: 0,
      totalObjectiveScore: grammarScore,
      cefrLevel: this.mapScoreToLevel(grammarScore),
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
