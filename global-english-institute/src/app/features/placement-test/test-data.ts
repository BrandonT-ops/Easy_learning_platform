import { TestQuestion } from '../../core/models';

// ── Reading ──────────────────────────────────────────────────────────────────

export const READING_PASSAGE = `
In many cities around the world, public libraries are changing. In the past, people mainly visited libraries to borrow books or study quietly. Today, although these traditional functions remain important, libraries often serve a much broader purpose. They have become community spaces where people of different ages and backgrounds can learn new skills, attend events, and access technology.

One reason for this change is the rapid growth of digital information. Many people now read news online, store documents in the cloud, and use smartphones instead of printed reference books. As a result, libraries have had to rethink their role. Rather than competing with the internet, many libraries now help people use it effectively. They offer free computer access, internet connections, and training sessions on topics such as online safety, job searching, and digital communication.

Another reason libraries remain valuable is that not everyone has equal access to technology. For some people, especially low-income families, students, and older adults, the library may be the only place where they can use a computer, print a document, or get help with an online form. In this way, libraries help reduce the digital divide, which is the gap between those who have easy access to modern technology and those who do not.
`;

export const READING_QUESTIONS: TestQuestion[] = [
  {
    id: 'r1',
    section: 'reading',
    type: 'open_ended',
    question: 'What was the main traditional purpose of libraries in the past?',
    order: 1,
  },
  {
    id: 'r2',
    section: 'reading',
    type: 'open_ended',
    question: 'According to the passage, why have libraries had to rethink their role?',
    order: 2,
  },
  {
    id: 'r3',
    section: 'reading',
    type: 'open_ended',
    question: 'What do many libraries now offer to help people use digital tools?',
    order: 3,
  },
  {
    id: 'r4',
    section: 'reading',
    type: 'open_ended',
    question: 'Who may especially depend on library technology services? Name at least two groups.',
    order: 4,
  },
  {
    id: 'r5',
    section: 'reading',
    type: 'open_ended',
    question: "What is the 'digital divide'?",
    order: 5,
  },
];

// ── Grammar & Vocabulary ──────────────────────────────────────────────────────

export const GRAMMAR_QUESTIONS: TestQuestion[] = [
  {
    id: 'g1',
    section: 'grammar',
    type: 'multiple_choice',
    question: 'She ___ to the market every Saturday.',
    options: ['A. go', 'B. goes', 'C. going', 'D. gone'],
    correct_answer: 'b',
    order: 1,
  },
  {
    id: 'g2',
    section: 'grammar',
    type: 'multiple_choice',
    question: 'If I ___ enough money, I would buy a new laptop.',
    options: ['A. have', 'B. had', 'C. will have', 'D. having'],
    correct_answer: 'b',
    order: 2,
  },
  {
    id: 'g3',
    section: 'grammar',
    type: 'multiple_choice',
    question: 'They have lived here ___ 2019.',
    options: ['A. for', 'B. since', 'C. from', 'D. during'],
    correct_answer: 'b',
    order: 3,
  },
  {
    id: 'g4',
    section: 'grammar',
    type: 'multiple_choice',
    question: 'I was tired, ___ I finished the work.',
    options: ['A. because', 'B. but', 'C. although', 'D. unless'],
    correct_answer: 'b',
    order: 4,
  },
  {
    id: 'g5',
    section: 'grammar',
    type: 'multiple_choice',
    question: 'The meeting was canceled ___ the manager was ill.',
    options: ['A. because', 'B. despite', 'C. however', 'D. unless'],
    correct_answer: 'a',
    order: 5,
  },
  {
    id: 'g6',
    section: 'grammar',
    type: 'multiple_choice',
    question: 'This book is ___ than the one I read last week.',
    options: ['A. interesting', 'B. more interesting', 'C. most interesting', 'D. the interesting'],
    correct_answer: 'b',
    order: 6,
  },
  {
    id: 'g7',
    section: 'grammar',
    type: 'multiple_choice',
    question: 'He speaks English very ___.',
    options: ['A. good', 'B. better', 'C. well', 'D. best'],
    correct_answer: 'c',
    order: 7,
  },
  {
    id: 'g8',
    section: 'grammar',
    type: 'multiple_choice',
    question: 'We ___ dinner when the phone rang.',
    options: ['A. had', 'B. have', 'C. were having', 'D. are having'],
    correct_answer: 'c',
    order: 8,
  },
  {
    id: 'g9',
    section: 'grammar',
    type: 'multiple_choice',
    question: 'By next year, she ___ her degree.',
    options: ['A. completes', 'B. completed', 'C. will complete', 'D. will have completed'],
    correct_answer: 'd',
    order: 9,
  },
  {
    id: 'g10',
    section: 'grammar',
    type: 'multiple_choice',
    question: "I don't know where ___.",
    options: ['A. is he', 'B. he is', 'C. does he', 'D. he does'],
    correct_answer: 'b',
    order: 10,
  },
  {
    id: 'g11',
    section: 'grammar',
    type: 'multiple_choice',
    question: "The opposite of 'generous' is:",
    options: ['A. kind', 'B. selfish', 'C. polite', 'D. honest'],
    correct_answer: 'b',
    order: 11,
  },
  {
    id: 'g12',
    section: 'grammar',
    type: 'multiple_choice',
    question: 'A person who repairs electrical systems is an ___.',
    options: ['A. architect', 'B. electrician', 'C. accountant', 'D. mechanic'],
    correct_answer: 'b',
    order: 12,
  },
  {
    id: 'g13',
    section: 'grammar',
    type: 'multiple_choice',
    question: 'We need to ___ a decision before noon.',
    options: ['A. do', 'B. make', 'C. take', 'D. get'],
    correct_answer: 'b',
    order: 13,
  },
  {
    id: 'g14',
    section: 'grammar',
    type: 'multiple_choice',
    question: 'Her explanation was very ___, so everyone understood.',
    options: ['A. clear', 'B. weak', 'C. rare', 'D. narrow'],
    correct_answer: 'a',
    order: 14,
  },
  {
    id: 'g15',
    section: 'grammar',
    type: 'multiple_choice',
    question: 'He apologized ___ being late.',
    options: ['A. of', 'B. at', 'C. for', 'D. with'],
    correct_answer: 'c',
    order: 15,
  },
  {
    id: 'g16',
    section: 'grammar',
    type: 'multiple_choice',
    question: "I've never ___ such a beautiful place.",
    options: ['A. see', 'B. saw', 'C. seen', 'D. seeing'],
    correct_answer: 'c',
    order: 16,
  },
  {
    id: 'g17',
    section: 'grammar',
    type: 'multiple_choice',
    question: 'Neither the teacher nor the students ___ ready.',
    options: ['A. was', 'B. were', 'C. is', 'D. be'],
    correct_answer: 'b',
    order: 17,
  },
  {
    id: 'g18',
    section: 'grammar',
    type: 'multiple_choice',
    question: 'She asked me ___ I could help her.',
    options: ['A. what', 'B. that', 'C. if', 'D. which'],
    correct_answer: 'c',
    order: 18,
  },
  {
    id: 'g19',
    section: 'grammar',
    type: 'multiple_choice',
    question: 'The project was completed ___ schedule.',
    options: ['A. in', 'B. on', 'C. at', 'D. by'],
    correct_answer: 'b',
    order: 19,
  },
  {
    id: 'g20',
    section: 'grammar',
    type: 'multiple_choice',
    question: 'You ___ smoke here; it\'s prohibited.',
    options: ["A. mustn't", 'B. don\'t have to', 'C. couldn\'t', 'D. wouldn\'t'],
    correct_answer: 'a',
    order: 20,
  },
];

// ── Writing ───────────────────────────────────────────────────────────────────

export const WRITING_PROMPT = `
You recently attended a wedding or a master's degree thesis defence.

Write a short text (80–120 words) describing:
• What the event was
• Who the event was for
• What happened there
• Why you found it useful or interesting
`;

// ── Listening ─────────────────────────────────────────────────────────────────

export const LISTENING_SCRIPT = `Good morning, everyone. This is a reminder about Saturday's neighborhood clean-up event. We will meet at 8:30 a.m. in front of the community center and divide into small groups. Gloves and trash bags will be provided, but please bring a hat and a bottle of water, since the weather is expected to be hot. After the clean-up, around 11:30, volunteers will return to the center for a short lunch and a discussion about future environmental projects in the area. Students who participate for the full morning will receive a certificate. If you want to join, please send your name to the community office by Friday afternoon.`;

export const LISTENING_QUESTIONS: TestQuestion[] = [
  {
    id: 'l1',
    section: 'listening',
    type: 'open_ended',
    question: 'What is the main purpose of the announcement?',
    order: 1,
  },
  {
    id: 'l2',
    section: 'listening',
    type: 'open_ended',
    question: 'What time does the event begin?',
    order: 2,
  },
  {
    id: 'l3',
    section: 'listening',
    type: 'open_ended',
    question: 'What should participants bring with them?',
    order: 3,
  },
  {
    id: 'l4',
    section: 'listening',
    type: 'open_ended',
    question: 'What will happen after the clean-up?',
    order: 4,
  },
  {
    id: 'l5',
    section: 'listening',
    type: 'open_ended',
    question: 'Why might students be especially interested in participating?',
    order: 5,
  },
];
