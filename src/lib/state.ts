import { Tier } from "@/data/curriculum";

export interface GameState {
  score: number;
  streak: number;
  consecutiveCorrect: number;
  tier: Tier;
  currentCourseId: string | null;
  currentModuleIndex: number;
  currentScreen: Screen;
  completedModules: string[];
  totalQuestionsAnswered: number;
  totalCorrect: number;
  aiApiKey: string | null;
  aiProvider: "openai" | "anthropic";
  generatedModules: Record<string, import("@/data/curriculum").Module[]>;
  totalModulesGenerated: number;
}

export type Screen =
  | "start"
  | "course-select"
  | "lesson"
  | "quiz"
  | "challenge"
  | "settings"
  | "results";

const STORAGE_KEY = "quest-prep-arcade-state";

export const TIERS: Tier[] = ["ROOKIE", "CHAMPI0N", "ELITE"];

export function getInitialState(): GameState {
  return {
    score: 0,
    streak: 0,
    consecutiveCorrect: 0,
    tier: "ROOKIE",
    currentCourseId: null,
    currentModuleIndex: 0,
    currentScreen: "start",
    completedModules: [],
    totalQuestionsAnswered: 0,
    totalCorrect: 0,
    aiApiKey: null,
    aiProvider: "openai",
    generatedModules: {},
    totalModulesGenerated: 0,
  };
}

export function loadState(): GameState {
  if (typeof window === "undefined") return getInitialState();
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...getInitialState(), ...JSON.parse(saved) };
    }
  } catch {}
  return getInitialState();
}

export function saveState(state: GameState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export function getTierIndex(tier: Tier): number {
  return TIERS.indexOf(tier);
}

export function promoteRank(tier: Tier): Tier {
  const idx = getTierIndex(tier);
  return idx < TIERS.length - 1 ? TIERS[idx + 1] : tier;
}

export function demoteRank(tier: Tier): Tier {
  const idx = getTierIndex(tier);
  return idx > 0 ? TIERS[idx - 1] : tier;
}
