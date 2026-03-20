import { Component, signal, computed, inject, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { PlacementTestService } from '../../core/services/placement-test.service';
import { TestScoringService } from '../../core/services/test-scoring.service';
import { LanguageService } from '../../core/services/language.service';
import { TestAnswer, PlacementTest } from '../../core/models';
import {
  READING_PASSAGE,
  READING_QUESTIONS,
  GRAMMAR_QUESTIONS,
  LISTENING_SCRIPT,
  LISTENING_QUESTIONS,
  WRITING_PROMPT,
} from './test-data';

type TestStep = 'intro' | 'personal-info' | 'grammar' | 'reading' | 'writing' | 'listening' | 'results';

@Component({
  selector: 'app-placement-test',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, NavbarComponent, FooterComponent],
  templateUrl: './placement-test.component.html',
})
export class PlacementTestComponent implements OnDestroy {
  ls = inject(LanguageService);

  // Step management
  currentStep = signal<TestStep>('intro');
  steps: TestStep[] = ['intro', 'personal-info', 'grammar', 'reading', 'writing', 'listening', 'results'];

  // Personal info
  personalInfo = { full_name: '', email: '', phone: '', consent: false };

  // Test data
  readingPassage = READING_PASSAGE;
  readingQuestions = READING_QUESTIONS;
  grammarQuestions = GRAMMAR_QUESTIONS;
  listeningScript = LISTENING_SCRIPT;
  listeningQuestions = LISTENING_QUESTIONS;
  writingPrompt = WRITING_PROMPT;

  // Answers
  grammarAnswers: Record<string, string> = {};
  readingResponses: Record<string, string> = {};
  listeningResponses: Record<string, string> = {};
  writingResponse = '';

  // ── Duolingo-style grammar ─────────────────────────────────────
  currentGrammarIndex = signal(0);
  /** briefly false during slide transition (200 ms) */
  questionVisible = signal(true);
  private advanceTimer: ReturnType<typeof setTimeout> | null = null;

  currentGrammarQuestion = computed(() => this.grammarQuestions[this.currentGrammarIndex()]);
  isLastGrammarQuestion = computed(() => this.currentGrammarIndex() === this.grammarQuestions.length - 1);
  currentGrammarAnswer = computed(() => this.grammarAnswers[this.currentGrammarQuestion().id] ?? null);

  /** Called when the user taps an option card */
  selectGrammarAnswer(answer: string): void {
    const id = this.currentGrammarQuestion().id;
    this.grammarAnswers[id] = answer;
    // Auto-advance after a short delay so the selection highlight is visible
    if (this.advanceTimer) clearTimeout(this.advanceTimer);
    this.advanceTimer = setTimeout(() => this.advanceGrammar(), 500);
  }

  advanceGrammar(): void {
    if (this.isLastGrammarQuestion()) {
      this.goToStep('reading');
      return;
    }
    this.slideToNextGrammarQuestion();
  }

  slideToNextGrammarQuestion(): void {
    this.questionVisible.set(false);
    setTimeout(() => {
      this.currentGrammarIndex.update(i => i + 1);
      this.questionVisible.set(true);
    }, 200);
  }

  slideToPrevGrammarQuestion(): void {
    if (this.currentGrammarIndex() === 0) { this.prevStep(); return; }
    this.questionVisible.set(false);
    setTimeout(() => {
      this.currentGrammarIndex.update(i => i - 1);
      this.questionVisible.set(true);
    }, 200);
  }

  // ── Text-to-Speech ─────────────────────────────────────────────
  isSpeaking = signal(false);
  showTranscript = signal(false);
  private utterance: SpeechSynthesisUtterance | null = null;

  // ── Intro section cards ────────────────────────────────────────
  testSectionIcons = [
    'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
    'M15.536 8.464a5 5 0 010 7.072M12 9.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5zm0 0v2.25M12 12l-3 3m0 0l3 3m-3-3h9m-9 0H3',
  ];

  // ── Submission state ───────────────────────────────────────────
  loading = signal(false);
  testResult = signal<PlacementTest | null>(null);
  submitError = signal<string | null>(null);

  // ── Progress ───────────────────────────────────────────────────
  currentStepIndex = computed(() => this.steps.indexOf(this.currentStep()));
  progressPercent = computed(() => {
    const idx = this.currentStepIndex();
    const total = this.steps.length - 1;
    return Math.round((idx / total) * 100);
  });

  // Grammar progress as array for dot rendering
  grammarDots = computed(() =>
    this.grammarQuestions.map((q, i) => ({
      answered: !!this.grammarAnswers[q.id],
      current: i === this.currentGrammarIndex(),
    }))
  );

  // ── Word count ─────────────────────────────────────────────────
  get wordCount(): number {
    return this.writingResponse.trim().split(/\s+/).filter(w => w.length > 0).length;
  }

  // ── Answer counts ──────────────────────────────────────────────
  grammarAnsweredCount = computed(() => Object.keys(this.grammarAnswers).length);
  readingAnsweredCount = computed(() =>
    Object.values(this.readingResponses).filter(v => v.trim().length > 0).length
  );
  listeningAnsweredCount = computed(() =>
    Object.values(this.listeningResponses).filter(v => v.trim().length > 0).length
  );

  constructor(
    private placementTestService: PlacementTestService,
    private testScoringService: TestScoringService
  ) {}

  // ── Navigation ─────────────────────────────────────────────────
  goToStep(step: TestStep): void {
    this.stopListening();
    if (this.advanceTimer) { clearTimeout(this.advanceTimer); this.advanceTimer = null; }
    this.currentStep.set(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  nextStep(): void {
    const idx = this.currentStepIndex();
    if (idx < this.steps.length - 1) this.goToStep(this.steps[idx + 1]);
  }

  prevStep(): void {
    const idx = this.currentStepIndex();
    if (idx > 0) this.goToStep(this.steps[idx - 1]);
  }

  isPersonalInfoValid(): boolean {
    return !!(this.personalInfo.full_name.trim() &&
      this.personalInfo.email.trim() &&
      this.personalInfo.phone.trim() &&
      this.personalInfo.consent);
  }

  // ── TTS ────────────────────────────────────────────────────────
  playListening(): void {
    if (!('speechSynthesis' in window)) return;
    this.stopListening();
    this.utterance = new SpeechSynthesisUtterance(this.listeningScript);
    this.utterance.lang = 'en-US';
    this.utterance.rate = 0.9;
    this.utterance.onend = () => this.isSpeaking.set(false);
    this.utterance.onerror = () => this.isSpeaking.set(false);
    window.speechSynthesis.speak(this.utterance);
    this.isSpeaking.set(true);
  }

  stopListening(): void {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    this.isSpeaking.set(false);
  }

  toggleTranscript(): void {
    this.showTranscript.update(v => !v);
  }

  // ── Submit ─────────────────────────────────────────────────────
  async submitTest(): Promise<void> {
    this.loading.set(true);
    this.submitError.set(null);

    const grammarAnswersList: TestAnswer[] = Object.entries(this.grammarAnswers)
      .map(([questionId, answer]) => ({ questionId, answer }));

    const { data, error } = await this.placementTestService.submitTest({
      full_name: this.personalInfo.full_name,
      email: this.personalInfo.email,
      phone: this.personalInfo.phone,
      grammarAnswers: grammarAnswersList,
      readingResponses: this.readingResponses,
      listeningResponses: this.listeningResponses,
      writingResponse: this.writingResponse,
    });

    if (error) {
      this.submitError.set(error);
      this.loading.set(false);
      return;
    }

    this.testResult.set(data);
    this.loading.set(false);
    this.goToStep('results');
  }

  ngOnDestroy(): void {
    this.stopListening();
    if (this.advanceTimer) clearTimeout(this.advanceTimer);
  }
}
