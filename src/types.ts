export interface Flashcard {
  id: string;
  front: string;
  back: string;
  lastReviewed: Date | null;
  nextReview: Date | null;
  level: number; // 0-5, representing mastery level
}

export interface Deck {
  id: string;
  name: string;
  description: string;
  cards: Flashcard[];
  created: Date;
  lastStudied: Date | null;
}

export interface StudyStats {
  correct: number;
  incorrect: number;
  streak: number;
}