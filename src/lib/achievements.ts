// Achievement Tags System
// Tags are earned based on completed modules, courses, and milestones

import { GameState } from "@/lib/state";
import { courses } from "@/data/courses";

export interface AchievementTag {
  id: string;
  label: string;
  icon: string;
  color: string; // Tailwind-compatible hex color
  description: string;
}

// All possible achievement tags
const ALL_TAGS: AchievementTag[] = [
  // Starter tags
  { id: "coding-beginner", label: "Coding Beginner", icon: "🌱", color: "#4ade80", description: "Completed your first module" },
  { id: "first-steps", label: "First Steps", icon: "👣", color: "#a78bfa", description: "Completed 5 modules" },
  { id: "dedicated-learner", label: "Dedicated Learner", icon: "📚", color: "#60a5fa", description: "Completed 15 modules" },
  { id: "knowledge-seeker", label: "Knowledge Seeker", icon: "🧠", color: "#f472b6", description: "Completed 30 modules" },
  { id: "code-master", label: "Code Master", icon: "👑", color: "#fbbf24", description: "Completed 50 modules" },

  // Language specialization tags
  { id: "pythonista", label: "Pythonista", icon: "🐍", color: "#FFDE4D", description: "Completed 3+ Python modules" },
  { id: "js-ninja", label: "JS Ninja", icon: "⚡", color: "#00E5FF", description: "Completed 3+ JavaScript modules" },
  { id: "ts-guardian", label: "TypeScript Guardian", icon: "🛡️", color: "#3178C6", description: "Completed 3+ TypeScript modules" },
  { id: "web-designer", label: "Web Designer", icon: "🎨", color: "#A259FF", description: "Completed 3+ HTML/CSS modules" },
  { id: "tailwind-crafter", label: "Tailwind Crafter", icon: "💨", color: "#38BDF8", description: "Completed 3+ Tailwind modules" },
  { id: "java-engineer", label: "Java Engineer", icon: "☕", color: "#F89820", description: "Completed 3+ Java modules" },
  { id: "csharp-dev", label: "C# Developer", icon: "🎯", color: "#68217A", description: "Completed 3+ C# modules" },
  { id: "c-hacker", label: "C Hacker", icon: "🔧", color: "#555555", description: "Completed 3+ C modules" },
  { id: "cpp-warrior", label: "C++ Warrior", icon: "⚙️", color: "#659BD3", description: "Completed 3+ C++ modules" },
  { id: "rustacean", label: "Rustacean", icon: "🦀", color: "#FF4A4A", description: "Completed 3+ Rust modules" },
  { id: "gopher", label: "Gopher", icon: "🐹", color: "#00ADD8", description: "Completed 3+ Go modules" },
  { id: "kotlin-knight", label: "Kotlin Knight", icon: "💠", color: "#7F52FF", description: "Completed 3+ Kotlin modules" },
  { id: "swift-bird", label: "Swift Bird", icon: "🐦", color: "#F05138", description: "Completed 3+ Swift modules" },
  { id: "php-elephant", label: "PHP Elephant", icon: "🐘", color: "#777BB4", description: "Completed 3+ PHP modules" },
  { id: "ruby-gem", label: "Ruby Gem", icon: "💎", color: "#CC342D", description: "Completed 3+ Ruby modules" },
  { id: "perl-camel", label: "Perl Camel", icon: "🐪", color: "#39457E", description: "Completed 3+ Perl modules" },
  { id: "sql-analyst", label: "SQL Analyst", icon: "📊", color: "#39FF14", description: "Completed 3+ SQL modules" },

  // Multi-language tags
  { id: "polyglot", label: "Polyglot", icon: "🌐", color: "#f97316", description: "Learned 3 different languages" },
  { id: "language-collector", label: "Language Collector", icon: "🗂️", color: "#ec4899", description: "Learned 5 different languages" },
  { id: "universal-coder", label: "Universal Coder", icon: "🌌", color: "#a855f7", description: "Learned 8+ different languages" },

  // Specialty/Topic tags
  { id: "cyber-forensics", label: "Cybersecurity & Forensics", icon: "🔒", color: "#22d3ee", description: "Completed security-related modules" },
  { id: "web-fullstack", label: "Full Stack", icon: "🏗️", color: "#84cc16", description: "Completed both frontend and backend modules" },
  { id: "systems-programmer", label: "Systems Programmer", icon: "🖥️", color: "#6366f1", description: "Completed C, C++, or Rust modules" },
  { id: "data-wrangler", label: "Data Wrangler", icon: "📈", color: "#14b8a6", description: "Completed SQL and Python data modules" },

  // Arena tags
  { id: "arena-fighter", label: "Arena Fighter", icon: "⚔️", color: "#ef4444", description: "Completed 5 arena challenges" },
  { id: "arena-champion", label: "Arena Champion", icon: "🏆", color: "#eab308", description: "Completed 20 arena challenges" },

  // XP milestone tags
  { id: "xp-1000", label: "1K Club", icon: "⭐", color: "#fbbf24", description: "Reached 1,000 XP" },
  { id: "xp-5000", label: "5K Elite", icon: "🌟", color: "#f59e0b", description: "Reached 5,000 XP" },
  { id: "xp-10000", label: "10K Legend", icon: "💫", color: "#d97706", description: "Reached 10,000 XP" },
];

// Count completed modules per course
function getCompletedPerCourse(completedModules: string[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const course of courses) {
    const count = course.modules.filter(m => completedModules.includes(m.id)).length;
    if (count > 0) counts[course.id] = count;
  }
  return counts;
}

// Check if user completed any security-related modules
function hasSecurityModules(completedModules: string[]): boolean {
  const securityKeywords = ["security", "crypto", "hash", "auth", "xss", "injection", "forensic", "encrypt", "vulnerability", "firewall"];
  for (const course of courses) {
    for (const mod of course.modules) {
      if (completedModules.includes(mod.id)) {
        const title = mod.title.toLowerCase();
        const concept = mod.lesson.concept.toLowerCase();
        if (securityKeywords.some(kw => title.includes(kw) || concept.includes(kw))) {
          return true;
        }
      }
    }
  }
  return false;
}

// Compute earned tags based on game state
export function getEarnedTags(state: GameState): AchievementTag[] {
  const earned: AchievementTag[] = [];
  const completedCount = state.completedModules.length;
  const perCourse = getCompletedPerCourse(state.completedModules);
  const languagesLearned = Object.keys(perCourse).length;

  // Milestone tags
  if (completedCount >= 1) earned.push(ALL_TAGS.find(t => t.id === "coding-beginner")!);
  if (completedCount >= 5) earned.push(ALL_TAGS.find(t => t.id === "first-steps")!);
  if (completedCount >= 15) earned.push(ALL_TAGS.find(t => t.id === "dedicated-learner")!);
  if (completedCount >= 30) earned.push(ALL_TAGS.find(t => t.id === "knowledge-seeker")!);
  if (completedCount >= 50) earned.push(ALL_TAGS.find(t => t.id === "code-master")!);

  // Language specialization (3+ modules in a specific language)
  const langTagMap: Record<string, string> = {
    python: "pythonista", javascript: "js-ninja", typescript: "ts-guardian",
    htmlcss: "web-designer", tailwind: "tailwind-crafter", java: "java-engineer",
    csharp: "csharp-dev", c: "c-hacker", cpp: "cpp-warrior", rust: "rustacean",
    go: "gopher", kotlin: "kotlin-knight", swift: "swift-bird", php: "php-elephant",
    ruby: "ruby-gem", perl: "perl-camel", sql: "sql-analyst",
  };
  for (const [langId, tagId] of Object.entries(langTagMap)) {
    if ((perCourse[langId] || 0) >= 3) {
      const tag = ALL_TAGS.find(t => t.id === tagId);
      if (tag) earned.push(tag);
    }
  }

  // Multi-language tags
  if (languagesLearned >= 3) earned.push(ALL_TAGS.find(t => t.id === "polyglot")!);
  if (languagesLearned >= 5) earned.push(ALL_TAGS.find(t => t.id === "language-collector")!);
  if (languagesLearned >= 8) earned.push(ALL_TAGS.find(t => t.id === "universal-coder")!);

  // Specialty tags
  if (hasSecurityModules(state.completedModules)) {
    earned.push(ALL_TAGS.find(t => t.id === "cyber-forensics")!);
  }

  // Full stack: has both frontend (htmlcss/tailwind) AND backend (python/java/csharp/go/php/ruby)
  const hasFrontend = (perCourse["htmlcss"] || 0) >= 1 || (perCourse["tailwind"] || 0) >= 1;
  const hasBackend = ["python", "java", "csharp", "go", "php", "ruby"].some(l => (perCourse[l] || 0) >= 1);
  if (hasFrontend && hasBackend) earned.push(ALL_TAGS.find(t => t.id === "web-fullstack")!);

  // Systems programmer: C, C++, or Rust modules
  if ((perCourse["c"] || 0) >= 2 || (perCourse["cpp"] || 0) >= 2 || (perCourse["rust"] || 0) >= 2) {
    earned.push(ALL_TAGS.find(t => t.id === "systems-programmer")!);
  }

  // Data wrangler: SQL + Python
  if ((perCourse["sql"] || 0) >= 2 && (perCourse["python"] || 0) >= 2) {
    earned.push(ALL_TAGS.find(t => t.id === "data-wrangler")!);
  }

  // XP milestone tags
  if (state.score >= 1000) earned.push(ALL_TAGS.find(t => t.id === "xp-1000")!);
  if (state.score >= 5000) earned.push(ALL_TAGS.find(t => t.id === "xp-5000")!);
  if (state.score >= 10000) earned.push(ALL_TAGS.find(t => t.id === "xp-10000")!);

  return earned.filter(Boolean);
}

// Get all tags for display (to show locked ones)
export function getAllTags(): AchievementTag[] {
  return ALL_TAGS;
}
