export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'teacher';
  avatar?: string;
  grade?: number;
  createdAt: Date;
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  totalChapters: number;
  completedChapters: number;
}

export interface Chapter {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: number;
  isCompleted: boolean;
  order: number;
}

export interface Quiz {
  id: string;
  subjectId: string;
  chapterId?: string;
  title: string;
  description: string;
  questions: Question[];
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  hint?: string;
}

export interface Progress {
  userId: string;
  subjectId: string;
  completedChapters: string[];
  quizScores: { [quizId: string]: number };
  streak: number;
  badges: Badge[];
  totalPoints: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earnedAt: Date;
}

export interface Doubt {
  id: string;
  userId: string;
  userName: string;
  subject: string;
  title: string;
  description: string;
  imageUrl?: string;
  isResolved: boolean;
  replies: Reply[];
  createdAt: Date;
}

export interface Reply {
  id: string;
  userId: string;
  userName: string;
  userRole: 'student' | 'teacher';
  content: string;
  isHelpful?: boolean;
  createdAt: Date;
}