// Ranking System
// BEGINNER (starting rank - no divisions)
// ROOKIE III → II → I
// ELITE V → IV → III → II → I
// MASTER V → IV → III → II → I
// GRANDMASTER V → IV → III → II → I
// CHAMPION (single tier - the pinnacle)

export type RankTier = "BEGINNER" | "ROOKIE" | "ELITE" | "MASTER" | "GRANDMASTER" | "CHAMPION";

export interface Rank {
  tier: RankTier;
  division: number; // 0 for BEGINNER/CHAMPION; 3,2,1 for ROOKIE; 5,4,3,2,1 for others
}

export const RANK_ORDER: RankTier[] = ["BEGINNER", "ROOKIE", "ELITE", "MASTER", "GRANDMASTER", "CHAMPION"];

// XP thresholds for each rank tier + division
const RANK_THRESHOLDS: { tier: RankTier; division: number; xpRequired: number }[] = [
  // BEGINNER (0 - 499 XP)
  { tier: "BEGINNER", division: 0, xpRequired: 0 },
  // ROOKIE (500 - 2499 XP)
  { tier: "ROOKIE", division: 3, xpRequired: 500 },
  { tier: "ROOKIE", division: 2, xpRequired: 1000 },
  { tier: "ROOKIE", division: 1, xpRequired: 1750 },
  // ELITE (2500 - 6499 XP)
  { tier: "ELITE", division: 5, xpRequired: 2500 },
  { tier: "ELITE", division: 4, xpRequired: 3300 },
  { tier: "ELITE", division: 3, xpRequired: 4100 },
  { tier: "ELITE", division: 2, xpRequired: 5000 },
  { tier: "ELITE", division: 1, xpRequired: 5900 },
  // MASTER (6500 - 14999 XP)
  { tier: "MASTER", division: 5, xpRequired: 6500 },
  { tier: "MASTER", division: 4, xpRequired: 8000 },
  { tier: "MASTER", division: 3, xpRequired: 9700 },
  { tier: "MASTER", division: 2, xpRequired: 11500 },
  { tier: "MASTER", division: 1, xpRequired: 13500 },
  // GRANDMASTER (15000 - 29999 XP)
  { tier: "GRANDMASTER", division: 5, xpRequired: 15000 },
  { tier: "GRANDMASTER", division: 4, xpRequired: 18000 },
  { tier: "GRANDMASTER", division: 3, xpRequired: 21500 },
  { tier: "GRANDMASTER", division: 2, xpRequired: 25000 },
  { tier: "GRANDMASTER", division: 1, xpRequired: 28500 },
  // CHAMPION (30000+ XP)
  { tier: "CHAMPION", division: 0, xpRequired: 30000 },
];

export function getRankFromXP(xp: number): Rank {
  let result: Rank = { tier: "BEGINNER", division: 0 };
  for (const threshold of RANK_THRESHOLDS) {
    if (xp >= threshold.xpRequired) {
      result = { tier: threshold.tier, division: threshold.division };
    } else {
      break;
    }
  }
  return result;
}

export function getRankDisplay(rank: Rank): string {
  if (rank.tier === "CHAMPION") return "CHAMPION";
  if (rank.tier === "BEGINNER") return "BEGINNER";
  const romanNumerals: Record<number, string> = {
    1: "I", 2: "II", 3: "III", 4: "IV", 5: "V",
  };
  return `${rank.tier} ${romanNumerals[rank.division] || rank.division}`;
}

export function getRankColor(tier: RankTier): string {
  switch (tier) {
    case "BEGINNER": return "#6b7280";    // darker gray
    case "ROOKIE": return "#9aa0a6";      // gray
    case "ELITE": return "#8ab4f8";       // blue
    case "MASTER": return "#c58af9";      // purple
    case "GRANDMASTER": return "#fdd663"; // gold
    case "CHAMPION": return "#ff7eb3";    // pink/legendary
  }
}

export function getXPForNextRank(xp: number): { current: number; next: number; progress: number } {
  let currentThreshold = 0;
  let nextThreshold = RANK_THRESHOLDS[1]?.xpRequired || 500;

  for (let i = 0; i < RANK_THRESHOLDS.length; i++) {
    if (xp >= RANK_THRESHOLDS[i].xpRequired) {
      currentThreshold = RANK_THRESHOLDS[i].xpRequired;
      nextThreshold = RANK_THRESHOLDS[i + 1]?.xpRequired || currentThreshold + 1000;
    } else {
      break;
    }
  }

  const rangeSize = nextThreshold - currentThreshold;
  const progress = rangeSize > 0 ? ((xp - currentThreshold) / rangeSize) * 100 : 100;

  return {
    current: currentThreshold,
    next: nextThreshold,
    progress: Math.min(progress, 100),
  };
}

export function getRankBadgeEmoji(tier: RankTier): string {
  switch (tier) {
    case "BEGINNER": return "🌱";
    case "ROOKIE": return "🔰";
    case "ELITE": return "⚔️";
    case "MASTER": return "👑";
    case "GRANDMASTER": return "💎";
    case "CHAMPION": return "🏆";
  }
}
