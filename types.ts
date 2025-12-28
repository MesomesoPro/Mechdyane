
export enum Domain {
  COMPUTER_STUDIES = 'Computer Studies',
  MARKETING = 'Marketing',
  HEALTHCARE = 'Healthcare',
  FINANCE = 'Finance',
  DESIGN = 'Design'
}

export interface UserProgress {
  level: number;
  points: number;
  badges: Badge[];
  currentCourseId?: string;
  currentCourseTitle?: string;
  totalLessonsInCourse?: number;
  completedLessons: string[];
  streak: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  quiz: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Course {
  id: string;
  title: string;
  domain: Domain;
  description: string;
  lessons: Lesson[];
  thumbnail: string;
}
