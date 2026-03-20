export interface Profile {
  id: string;
  full_name: string | null;
  role: 'admin' | 'student';
  created_at: string;
}

export interface WebsiteSettings {
  id: string;
  site_name: string;
  tagline: string;
  primary_color: string;
  contact_email: string;
  phone: string;
  updated_at: string;
}

export interface PlacementTest {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  reading_score: number | null;
  grammar_score: number | null;
  listening_score: number | null;
  writing_score: number | null;
  speaking_score: number | null;
  total_score: number | null;
  cefr_level: CefrLevel | null;
  status: TestStatus;
  writing_response?: string | null;
  speaking_url?: string | null;
  reading_responses?: string | null;
  listening_responses?: string | null;
  created_at: string;
}

export type EnglishLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type CefrLevel = EnglishLevel; // alias for compatibility
export type TestStatus = 'pending' | 'contacted' | 'enrolled' | 'rejected';

export interface Registration {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  preferred_schedule: string;
  level: string;
  created_at: string;
}

export interface Testimonial {
  id: string;
  student_name: string;
  content: string;
  is_visible: boolean;
  created_at: string;
}

export interface TestQuestion {
  id: string;
  section: 'reading' | 'grammar' | 'listening';
  type: 'multiple_choice' | 'fill_blank' | 'open_ended';
  question: string;
  options?: string[];
  correct_answer?: string;
  order: number;
}

export interface TestSection {
  id: string;
  type: 'reading' | 'grammar' | 'listening' | 'writing' | 'speaking';
  title: string;
  description: string;
  questions?: TestQuestion[];
  maxScore: number;
}

export interface TestAnswer {
  questionId: string;
  answer: string;
}

export interface TestSubmission {
  full_name: string;
  email: string;
  phone: string;
  grammarAnswers: TestAnswer[];
  readingResponses: Record<string, string>;
  listeningResponses: Record<string, string>;
  writingResponse: string;
}

export interface ScoringResult {
  readingScore: number;
  grammarScore: number;
  listeningScore: number;
  totalObjectiveScore: number;
  cefrLevel: CefrLevel;
}

export interface AdminStats {
  totalTests: number;
  totalRegistrations: number;
  pendingReviews: number;
  recentTests: PlacementTest[];
  recentRegistrations: Registration[];
}
