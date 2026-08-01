import { Tier } from "@/data/curriculum";

// XP rewards based on question/module difficulty tier
// Each tier has a range — the exact value is randomized for variety

interface XPRange {
  min: number;
  max: number;
}

const QUIZ_XP: Record<Tier, XPRange> = {
  EASY: { min: 10, max: 15 },
  MEDIUM: { min: 25, max: 40 },
  HARD: { min: 50, max: 75 },
  EXPERT: { min: 80, max: 120 },
};

const CHALLENGE_XP: Record<Tier, XPRange> = {
  EASY: { min: 30, max: 50 },
  MEDIUM: { min: 75, max: 120 },
  HARD: { min: 150, max: 250 },
  EXPERT: { min: 250, max: 400 },
};

// Streak bonus: extra XP for consecutive correct answers
function getStreakMultiplier(streak: number): number {
  if (streak >= 10) return 2.0;   // Double XP at 10+ streak
  if (streak >= 7) return 1.75;
  if (streak >= 5) return 1.5;    // 50% bonus at 5+ streak
  if (streak >= 3) return 1.25;   // 25% bonus at 3+ streak
  return 1.0;
}

function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getQuizXP(tier: Tier, streak: number): { base: number; bonus: number; total: number } {
  const range = QUIZ_XP[tier];
  const base = randomInRange(range.min, range.max);
  const multiplier = getStreakMultiplier(streak);
  const bonus = Math.floor(base * (multiplier - 1));
  const total = base + bonus;

  return { base, bonus, total };
}

export function getChallengeXP(tier: Tier): { base: number; total: number } {
  const range = CHALLENGE_XP[tier];
  const base = randomInRange(range.min, range.max);
  return { base, total: base };
}

export function formatXPGain(total: number, bonus: number): string {
  if (bonus > 0) {
    return `+${total} XP (${bonus} streak bonus!)`;
  }
  return `+${total} XP`;
}
