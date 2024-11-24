const REVIEW_INTERVALS = [
  1, // Level 0: 1 day
  3, // Level 1: 3 days
  7, // Level 2: 1 week
  14, // Level 3: 2 weeks
  30, // Level 4: 1 month
  90, // Level 5: 3 months
];

export const calculateNextReview = (level: number, correct: boolean): Date => {
  const now = new Date();
  if (!correct) {
    // On incorrect, reset to level 0
    return new Date(now.setDate(now.getDate() + REVIEW_INTERVALS[0]));
  }
  
  const nextLevel = Math.min(level + 1, REVIEW_INTERVALS.length - 1);
  return new Date(now.setDate(now.getDate() + REVIEW_INTERVALS[nextLevel]));
};