import { Component, signal, computed, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { PlacementTestService } from '../../core/services/placement-test.service';
import { TestScoringService } from '../../core/services/test-scoring.service';
import { TestAnswer, PlacementTest } from '../../core/models';
import {
  READING_PASSAGE,
  READING_QUESTIONS,
  GRAMMAR_QUESTIONS,
  LISTENING_QUESTIONS,
  WRITING_PROMPT,
  SPEAKING_PROMPT,
} from './test-data';

type TestStep = 'intro' | 'personal-info' | 'reading' | 'grammar' | 'listening' | 'writing' | 'speaking' | 'results';

@Component({
  selector: 'app-placement-test',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, NavbarComponent, FooterComponent],
  templateUrl: './placement-test.component.html',
})
export class PlacementTestComponent implements OnDestroy {
  // Step management
  currentStep = signal<TestStep>('intro');
  steps: TestStep[] = ['intro', 'personal-info', 'reading', 'grammar', 'listening', 'writing', 'speaking', 'results'];
  stepLabels: Record<string, string> = {
    'intro': 'Introduction',
    'personal-info': 'Your Details',
    'reading': 'Reading',
    'grammar': 'Grammar & Vocabulary',
    'listening': 'Listening',
    'writing': 'Writing',
    'speaking': 'Speaking',
    'results': 'Results',
  };

  // Personal info
  personalInfo = {
    full_name: '',
    email: '',
    phone: '',
    consent: false,
  };

  // Test data
  readingPassage = READING_PASSAGE;
  readingQuestions = READING_QUESTIONS;
  grammarQuestions = GRAMMAR_QUESTIONS;
  listeningQuestions = LISTENING_QUESTIONS;
  writingPrompt = WRITING_PROMPT;
  speakingPrompt = SPEAKING_PROMPT;

  // Answers
  readingAnswers: Record<string, string> = {};
  grammarAnswers: Record<string, string> = {};
  listeningAnswers: Record<string, string> = {};
  writingResponse = '';

  // Speaking recording
  mediaRecorder: MediaRecorder | null = null;
  audioChunks: Blob[] = [];
  recordedBlob = signal<Blob | null>(null);
  recordedUrl = signal<string | null>(null);
  isRecording = signal(false);
  recordingTime = signal(0);
  recordingInterval: ReturnType<typeof setInterval> | null = null;
  speakingError = signal<string | null>(null);

  // Audio playback URL for listening section
  listeningAudioUrl = '/assets/audio/listening-sample.mp3';

  // Intro section data
  testSections = [
    { name: 'Reading', detail: '7 questions', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { name: 'Grammar & Vocabulary', detail: '10 questions', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { name: 'Listening', detail: '5 questions', icon: 'M15.536 8.464a5 5 0 010 7.072M12 9l-3 3m0 0l3 3m-3-3h9m-9 0H3' },
    { name: 'Writing', detail: '150–250 words', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
    { name: 'Speaking', detail: '1.5–2 minutes', icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z' },
  ];

  // Submission state
  loading = signal(false);
  testResult = signal<PlacementTest | null>(null);
  submitError = signal<string | null>(null);

  // Computed step index for progress
  currentStepIndex = computed(() => this.steps.indexOf(this.currentStep()));
  progressPercent = computed(() => {
    const idx = this.currentStepIndex();
    const total = this.steps.length - 1;
    return Math.round((idx / total) * 100);
  });

  // Word count getter for writing section
  get wordCount(): number {
    return this.writingResponse.trim().split(' ').filter(w => w.length > 0).length;
  }

  constructor(
    private placementTestService: PlacementTestService,
    private testScoringService: TestScoringService
  ) {}

  // Navigation
  goToStep(step: TestStep) {
    this.currentStep.set(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  nextStep() {
    const idx = this.currentStepIndex();
    if (idx < this.steps.length - 1) {
      this.goToStep(this.steps[idx + 1]);
    }
  }

  prevStep() {
    const idx = this.currentStepIndex();
    if (idx > 0) {
      this.goToStep(this.steps[idx - 1]);
    }
  }

  // Answer handlers
  setReadingAnswer(questionId: string, answer: string) {
    this.readingAnswers[questionId] = answer;
  }

  setGrammarAnswer(questionId: string, answer: string) {
    this.grammarAnswers[questionId] = answer;
  }

  setListeningAnswer(questionId: string, answer: string) {
    this.listeningAnswers[questionId] = answer;
  }

  // Validation helpers
  isPersonalInfoValid(): boolean {
    return !!(this.personalInfo.full_name.trim() &&
      this.personalInfo.email.trim() &&
      this.personalInfo.phone.trim() &&
      this.personalInfo.consent);
  }

  readingAnsweredCount = computed(() => Object.keys(this.readingAnswers).length);
  grammarAnsweredCount = computed(() => Object.keys(this.grammarAnswers).length);
  listeningAnsweredCount = computed(() => Object.keys(this.listeningAnswers).length);

  // Recording
  async startRecording() {
    this.speakingError.set(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioChunks = [];
      this.mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.audioChunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        this.recordedBlob.set(blob);
        this.recordedUrl.set(url);
        stream.getTracks().forEach(track => track.stop());
      };

      this.mediaRecorder.start(1000);
      this.isRecording.set(true);
      this.recordingTime.set(0);
      this.recordingInterval = setInterval(() => {
        this.recordingTime.update(t => t + 1);
      }, 1000);
    } catch (err) {
      this.speakingError.set('Microphone access denied. Please allow microphone access and try again.');
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.isRecording()) {
      this.mediaRecorder.stop();
      this.isRecording.set(false);
      if (this.recordingInterval) {
        clearInterval(this.recordingInterval);
        this.recordingInterval = null;
      }
    }
  }

  clearRecording() {
    if (this.recordedUrl()) {
      URL.revokeObjectURL(this.recordedUrl()!);
    }
    this.recordedBlob.set(null);
    this.recordedUrl.set(null);
    this.recordingTime.set(0);
  }

  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  // Submit
  async submitTest() {
    this.loading.set(true);
    this.submitError.set(null);

    const readingAnswersList: TestAnswer[] = Object.entries(this.readingAnswers).map(([questionId, answer]) => ({ questionId, answer }));
    const grammarAnswersList: TestAnswer[] = Object.entries(this.grammarAnswers).map(([questionId, answer]) => ({ questionId, answer }));
    const listeningAnswersList: TestAnswer[] = Object.entries(this.listeningAnswers).map(([questionId, answer]) => ({ questionId, answer }));

    const { data, error } = await this.placementTestService.submitTest({
      full_name: this.personalInfo.full_name,
      email: this.personalInfo.email,
      phone: this.personalInfo.phone,
      readingAnswers: readingAnswersList,
      grammarAnswers: grammarAnswersList,
      listeningAnswers: listeningAnswersList,
      writingResponse: this.writingResponse,
      speakingBlob: this.recordedBlob() ?? undefined,
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

  getCefrDescription(level: string): string {
    return this.testScoringService.getCefrDescription(level as any);
  }

  ngOnDestroy() {
    if (this.recordingInterval) clearInterval(this.recordingInterval);
    if (this.recordedUrl()) URL.revokeObjectURL(this.recordedUrl()!);
  }
}
