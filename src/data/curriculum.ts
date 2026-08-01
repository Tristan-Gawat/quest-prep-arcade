export type Tier = "ROOKIE" | "CHAMPI0N" | "ELITE";

export interface Lesson {
  title: string;
  concept: string;
  explanation: string;
  codeExample: string;
  language: string;
}

export interface QuizQuestion {
  question: string;
  choices: string[];
  correct: number;
  explanation: string;
}

export interface CodeChallenge {
  title: string;
  description: string;
  starterCode: string;
  expectedOutput: string;
  hints: string[];
  solution: string;
  language: string;
}

export interface Module {
  id: string;
  title: string;
  tier: Tier;
  lesson: Lesson;
  quiz: QuizQuestion[];
  challenge: CodeChallenge;
}

export interface Course {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  modules: Module[];
}
