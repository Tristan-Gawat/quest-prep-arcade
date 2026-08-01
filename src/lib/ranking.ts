// Ranking System
// ROOKIE III → II → I
// ELITE V → IV → III → II → I
// MASTER V → IV → III → II → I
// GRANDMASTER V → IV → III → II → I
// CHAMPION (single tier - the pinnacle)

export type RankTier = "ROOKIE" | "ELITE" | "MASTER" | "GRANDMASTER" | "CHAMPION";

export interface Rank {
  tier: RankTier;
  division: number; // 3,2,1 for ROOKIE; 5,4,3,2,1 for others; 0 for CHAMPION
}

export const RANK_ORDER: RankTier[] = ["ROOKIE", "ELITE", "MASTER", "GRANDMASTER", "CHAMPION"];

// XP thresholds for each rank tier + division
// Each sub-rank requires progressively more XP
const RANK_THRESHOLDS: { tier: RankTier; division: number; xpRequired: number }[] = [
  // ROOKIE (0 - 899 XP)
  { tier: "ROOKIE", division: 3, xpRequired: 0 },
  { tier: "ROOKIE", division: 2, xpRequired: 300 },
  { tier: "ROOKIE", division: 1, xpRequired: 600 },
  // ELITE (900 - 2399 XP)
  { tier: "ELITE", division: 5, xpRequired: 900 },
  { tier: "ELITE", division: 4, xpRequired: 1200 },
  { tier: "ELITE", division: 3, xpRequired: 1500 },
  { tier: "ELITE", division: 2, xpRequired: 1800 },
  { tier: "ELITE", division: 1, xpRequired: 2100 },
  // MASTER (2400 - 4899 XP)
  { tier: "MASTER", division: 5, xpRequired: 2400 },
  { tier: "MASTER", division: 4, xpRequired: 2900 },
  { tier: "MASTER", division: 3, xpRequired: 3400 },
  { tier: "MASTER", division: 2, xpRequired: 3900 },
  { tier: "MASTER", division: 1, xpRequired: 4400 },
  // GRANDMASTER (4900 - 9899 XP)
  { tier: "GRANDMASTER", division: 5, xpRequired: 4900 },
  { tier: "GRANDMASTER", division: 4, xpRequired: 5900 },
  { tier: "GRANDMASTER", division: 3, xpRequired: 6900 },
  { tier: "GRANDMASTER", division: 2, xpRequired: 7900 },
  { tier: "GRANDMASTER", division: 1, xpRequired: 8900 },
  // CHAMPION (9900+ XP)
  { tier: "CHAMPION", division: 0, xpRequired: 9900 },
];

export function getRankFromXP(xp: number): Rank {
  let result: Rank = { tier: "ROOKIE", division: 3 };
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
  const romanNumerals: Record<number, string> = {
    1: "I", 2: "II", 3: "III", 4: "IV", 5: "V",
  };
  return `${rank.tier} ${romanNumerals[rank.division] || rank.division}`;
}

export function getRankColor(tier: RankTier): string {
  switch (tier) {
    case "ROOKIE": return "#9aa0a6";      // gray
    case "ELITE": return "#8ab4f8";       // blue
    case "MASTER": return "#c58af9";      // purple
    case "GRANDMASTER": return "#fdd663"; // gold
    case "CHAMPION": return "#ff7eb3";    // pink/legendary
  }
}

export function getXPForNextRank(xp: number): { current: number; next: number; progress: number } {
  let currentThreshold = 0;
  let nextThreshold = RANK_THRESHOLDS[1]?.xpRequired || 300;

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
    case "ROOKIE": return "🔰";
    case "ELITE": return "⚔️";
    case "MASTER": return "👑";
    case "GRANDMASTER": return "💎";
    case "CHAMPION": return "🏆";
  }
}
