import { TestQuestion } from '../../core/models';

export const READING_PASSAGE = `
The Rise of Remote Work

Over the past decade, remote work has transformed from a rare privilege to a common arrangement for millions of employees worldwide. While technology has long made remote work possible, the global events of recent years accelerated its adoption dramatically.

Studies show that remote workers often report higher levels of job satisfaction, citing flexibility and improved work-life balance as key benefits. A survey conducted in 2023 found that 68% of remote employees felt more productive at home than in a traditional office environment.

However, remote work is not without its challenges. Many workers struggle with feelings of isolation, and some report difficulty separating professional responsibilities from personal life. Companies, too, face obstacles in maintaining team cohesion and organizational culture when employees are dispersed across different locations.

Despite these challenges, most industry experts agree that flexible working arrangements are here to stay. Organizations are increasingly adopting hybrid models that combine remote work with periodic in-office collaboration, aiming to balance the benefits of flexibility with the advantages of face-to-face interaction.
`;

export const READING_QUESTIONS: TestQuestion[] = [
  {
    id: 'r1',
    section: 'reading',
    type: 'multiple_choice',
    question: 'According to the passage, what primarily accelerated the adoption of remote work?',
    options: [
      'a) Advances in communication technology',
      'b) Global events in recent years',
      'c) Employee pressure on companies',
      'd) Government policy changes',
    ],
    correct_answer: 'b',
    order: 1,
  },
  {
    id: 'r2',
    section: 'reading',
    type: 'multiple_choice',
    question: 'What percentage of remote employees in the 2023 survey felt more productive at home?',
    options: [
      'a) 58%',
      'b) 75%',
      'c) 68%',
      'd) 82%',
    ],
    correct_answer: 'c',
    order: 2,
  },
  {
    id: 'r3',
    section: 'reading',
    type: 'multiple_choice',
    question: 'Which of the following is listed as a benefit of remote work?',
    options: [
      'a) Improved work-life balance',
      'b) Easier team communication',
      'c) Stronger organizational culture',
      'd) Reduced living costs',
    ],
    correct_answer: 'a',
    order: 3,
  },
  {
    id: 'r4',
    section: 'reading',
    type: 'multiple_choice',
    question: 'What does the word "dispersed" mean as used in the passage?',
    options: [
      'a) Connected',
      'b) Spread across different places',
      'c) Concentrated in one area',
      'd) Organized systematically',
    ],
    correct_answer: 'b',
    order: 4,
  },
  {
    id: 'r5',
    section: 'reading',
    type: 'multiple_choice',
    question: 'What solution do most organizations appear to be moving toward?',
    options: [
      'a) Full-time remote work for all employees',
      'b) Returning completely to office-based work',
      'c) Eliminating remote work policies',
      'd) Hybrid models combining remote and in-office work',
    ],
    correct_answer: 'd',
    order: 5,
  },
  {
    id: 'r6',
    section: 'reading',
    type: 'multiple_choice',
    question: 'Which of the following is NOT mentioned as a challenge of remote work?',
    options: [
      'a) Feelings of isolation',
      'b) Difficulty with work-life separation',
      'c) Reduced salary expectations',
      'd) Maintaining team cohesion',
    ],
    correct_answer: 'a',
    order: 6,
  },
  {
    id: 'r7',
    section: 'reading',
    type: 'multiple_choice',
    question: 'What is the main idea of the final paragraph?',
    options: [
      'a) Remote work has many unsolved problems',
      'b) Technology will replace in-person work completely',
      'c) Flexible work arrangements are likely to continue with hybrid models',
      'd) Employees prefer traditional offices',
    ],
    correct_answer: 'c',
    order: 7,
  },
];

export const GRAMMAR_QUESTIONS: TestQuestion[] = [
  {
    id: 'g1',
    section: 'grammar',
    type: 'multiple_choice',
    question: 'She _____ to the conference every year since 2018.',
    options: ['a) goes', 'b) has been going', 'c) is going', 'd) went'],
    correct_answer: 'b',
    order: 1,
  },
  {
    id: 'g2',
    section: 'grammar',
    type: 'multiple_choice',
    question: 'If I _____ enough money, I would travel more often.',
    options: ['a) had', 'b) have', 'c) would have', 'd) will have'],
    correct_answer: 'a',
    order: 2,
  },
  {
    id: 'g3',
    section: 'grammar',
    type: 'multiple_choice',
    question: 'The report _____ by the team before the deadline.',
    options: ['a) completed', 'b) was completing', 'c) was completed', 'd) has completed'],
    correct_answer: 'c',
    order: 3,
  },
  {
    id: 'g4',
    section: 'grammar',
    type: 'multiple_choice',
    question: 'Despite _____ tired, she continued working.',
    options: ['a) feel', 'b) feeling', 'c) to feel', 'd) felt'],
    correct_answer: 'b',
    order: 4,
  },
  {
    id: 'g5',
    section: 'grammar',
    type: 'multiple_choice',
    question: 'Neither the manager nor the employees _____ aware of the change.',
    options: ['a) is', 'b) was', 'c) were', 'd) be'],
    correct_answer: 'd',
    order: 5,
  },
  {
    id: 'g6',
    section: 'grammar',
    type: 'multiple_choice',
    question: 'Choose the sentence with the correct use of articles:',
    options: [
      'a) She is a honest person with a good reputation.',
      'b) She is an honest person with a good reputation.',
      'c) She is an honest person with an good reputation.',
      'd) She is a honest person with an good reputation.',
    ],
    correct_answer: 'a',
    order: 6,
  },
  {
    id: 'g7',
    section: 'grammar',
    type: 'multiple_choice',
    question: 'He suggested _____ an earlier flight.',
    options: ['a) to book', 'b) booking', 'c) booked', 'd) book'],
    correct_answer: 'b',
    order: 7,
  },
  {
    id: 'g8',
    section: 'grammar',
    type: 'multiple_choice',
    question: 'The data _____ inconclusive, so further research is needed.',
    options: ['a) is', 'b) are', 'c) were being', 'd) has'],
    correct_answer: 'c',
    order: 8,
  },
  {
    id: 'g9',
    section: 'grammar',
    type: 'multiple_choice',
    question: 'By the time we arrived, the meeting _____ already.',
    options: ['a) had finished', 'b) finished', 'c) has finished', 'd) was finishing'],
    correct_answer: 'a',
    order: 9,
  },
  {
    id: 'g10',
    section: 'grammar',
    type: 'multiple_choice',
    question: 'Which sentence is grammatically correct?',
    options: [
      'a) Hardly I had sat down when the phone rang.',
      'b) Hardly had I sat down when the phone rang.',
      'c) Hardly I sat down when the phone rang.',
      'd) Hardly had I sat when rang the phone.',
    ],
    correct_answer: 'd',
    order: 10,
  },
];

export const LISTENING_QUESTIONS: TestQuestion[] = [
  {
    id: 'l1',
    section: 'listening',
    type: 'multiple_choice',
    question: 'What is the main topic of the audio?',
    options: [
      'a) Office relocation plans',
      'b) Changes to the company meeting schedule',
      'c) A new product launch event',
      'd) Staff training requirements',
    ],
    correct_answer: 'b',
    order: 1,
  },
  {
    id: 'l2',
    section: 'listening',
    type: 'multiple_choice',
    question: 'According to the audio, when will the new schedule take effect?',
    options: [
      'a) Next Monday',
      'b) The following month',
      'c) Immediately',
      'd) After the review period',
    ],
    correct_answer: 'a',
    order: 2,
  },
  {
    id: 'l3',
    section: 'listening',
    type: 'multiple_choice',
    question: 'What does the speaker ask employees to do?',
    options: [
      'a) Submit a written complaint',
      'b) Attend a mandatory briefing',
      'c) Check the updated calendar and confirm attendance',
      'd) Contact HR directly',
    ],
    correct_answer: 'c',
    order: 3,
  },
  {
    id: 'l4',
    section: 'listening',
    type: 'multiple_choice',
    question: 'How does the speaker describe the new schedule?',
    options: [
      'a) Temporary and experimental',
      'b) More efficient and better structured',
      'c) Complex and difficult to follow',
      'd) Similar to the previous arrangement',
    ],
    correct_answer: 'b',
    order: 4,
  },
  {
    id: 'l5',
    section: 'listening',
    type: 'multiple_choice',
    question: 'What tone does the speaker use throughout the audio?',
    options: [
      'a) Concerned and uncertain',
      'b) Professional and informative',
      'c) Frustrated and demanding',
      'd) Casual and informal',
    ],
    correct_answer: 'a',
    order: 5,
  },
];

export const WRITING_PROMPT = `
Write about a time when you had to adapt to a significant change in your work, study, or personal life.

Describe:
- What the change was and why it happened
- How you felt about it initially
- The steps you took to adapt
- What you learned from the experience

Write 150–250 words. Focus on clarity, organisation, and appropriate use of vocabulary and grammar.
`;

export const SPEAKING_PROMPT = `
Describe your experience learning a foreign language or a new skill.

In your response, explain:
- What you were learning and why you chose it
- The biggest challenges you faced
- What strategies helped you improve
- How the experience changed you

Speak for 1.5 to 2 minutes. Aim for clear pronunciation, natural fluency, and organised ideas.
`;
