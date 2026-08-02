// Ranking System
// BEGINNER (starting rank - no divisions)
// ROOKIE III → II → I
// ELITE V → IV → III → II → I
// MASTER V → IV → III → II → I
// GRANDMASTER V → IV → III → II → I
// CHAMPION (single tier - the pinnacle)

export type RankTier = "BEGINNER" | "ROOKIE" | "ELITE" | "MASTER" | "GRANDMASTER" | "CHAMPION" | "DEVELOPER";

export interface Rank {
  tier: RankTier;
  division: number; // 0 for BEGINNER/CHAMPION; 3,2,1 for ROOKIE; 5,4,3,2,1 for others
}

export const RANK_ORDER: RankTier[] = ["BEGINNER", "ROOKIE", "ELITE", "MASTER", "GRANDMASTER", "CHAMPION", "DEVELOPER"];

// Developer accounts — always show DEVELOPER rank regardless of XP
const DEVELOPER_EMAILS = [
  "tjgawat0113@gmail.com",
  "tristangawatschool@gmail.com",
  "c1-241-00124@uphsl.edu.ph",
];

// XP thresholds for each rank tier + division
const RANK_THRESHOLDS: { tier: RankTier; division: number; xpRequired: number }[] = [
  // BEGINNER (0 - 999 XP)
  { tier: "BEGINNER", division: 0, xpRequired: 0 },
  // ROOKIE (1000 - 4999 XP)
  { tier: "ROOKIE", division: 3, xpRequired: 1000 },
  { tier: "ROOKIE", division: 2, xpRequired: 2000 },
  { tier: "ROOKIE", division: 1, xpRequired: 3500 },
  // ELITE (5000 - 14999 XP)
  { tier: "ELITE", division: 5, xpRequired: 5000 },
  { tier: "ELITE", division: 4, xpRequired: 7000 },
  { tier: "ELITE", division: 3, xpRequired: 9000 },
  { tier: "ELITE", division: 2, xpRequired: 11500 },
  { tier: "ELITE", division: 1, xpRequired: 13500 },
  // MASTER (15000 - 34999 XP)
  { tier: "MASTER", division: 5, xpRequired: 15000 },
  { tier: "MASTER", division: 4, xpRequired: 19000 },
  { tier: "MASTER", division: 3, xpRequired: 23000 },
  { tier: "MASTER", division: 2, xpRequired: 27500 },
  { tier: "MASTER", division: 1, xpRequired: 32000 },
  // GRANDMASTER (35000 - 74999 XP)
  { tier: "GRANDMASTER", division: 5, xpRequired: 35000 },
  { tier: "GRANDMASTER", division: 4, xpRequired: 43000 },
  { tier: "GRANDMASTER", division: 3, xpRequired: 52000 },
  { tier: "GRANDMASTER", division: 2, xpRequired: 62000 },
  { tier: "GRANDMASTER", division: 1, xpRequired: 72000 },
  // CHAMPION (75000+ XP)
  { tier: "CHAMPION", division: 0, xpRequired: 75000 },
];

export function getRankFromXP(xp: number, email?: string | null): Rank {
  // Developer accounts always get DEVELOPER rank
  if (email && DEVELOPER_EMAILS.includes(email.toLowerCase())) {
    return { tier: "DEVELOPER", division: 0 };
  }

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
  if (rank.tier === "DEVELOPER") return "DEVELOPER";
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
    case "DEVELOPER": return "#00ffaa";   // neon green
  }
}

export function getXPForNextRank(xp: number): { current: number; next: number; progress: number } {
  let currentThreshold = 0;
  let nextThreshold = RANK_THRESHOLDS[1]?.xpRequired || 1000;

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
    case "DEVELOPER": return "⚡";
  }
}
