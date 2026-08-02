// Profanity filter and username sanitization utilities

const PROFANITY_LIST: Set<string> = new Set([
  "ass",
  "asshole",
  "bastard",
  "bitch",
  "bollocks",
  "bullshit",
  "cock",
  "crap",
  "cum",
  "cunt",
  "damn",
  "dick",
  "dildo",
  "douche",
  "fag",
  "faggot",
  "fuck",
  "fucker",
  "fucking",
  "goddamn",
  "handjob",
  "hell",
  "homo",
  "horny",
  "jerkoff",
  "kike",
  "lesbian",
  "milf",
  "motherfucker",
  "nazi",
  "nigga",
  "nigger",
  "nude",
  "orgasm",
  "penis",
  "piss",
  "porn",
  "prick",
  "pussy",
  "rape",
  "rapist",
  "retard",
  "scrotum",
  "sex",
  "shit",
  "slut",
  "spic",
  "tits",
  "twat",
  "vagina",
  "wanker",
  "whore",
]);

/**
 * Normalize leet speak substitutions back to standard characters.
 * Handles: @ -> a, 0 -> o, 1 -> i, 3 -> e, $ -> s
 */
function normalizeLeetSpeak(text: string): string {
  return text
    .replace(/@/g, "a")
    .replace(/0/g, "o")
    .replace(/1/g, "i")
    .replace(/3/g, "e")
    .replace(/\$/g, "s");
}

/**
 * Check if the given text contains any profanity.
 * Case-insensitive and handles basic leet speak substitutions.
 */
export function containsProfanity(text: string): boolean {
  const lower = text.toLowerCase();
  const normalized = normalizeLeetSpeak(lower);

  // Check both the original lowercase and the leet-normalized version
  const variants = [lower, normalized];

  for (const variant of variants) {
    // Extract words by splitting on non-alphanumeric characters
    const words = variant.split(/[^a-z]+/).filter(Boolean);

    for (const word of words) {
      if (PROFANITY_LIST.has(word)) {
        return true;
      }
    }

    // Also check if any profanity appears as a substring in the text
    let found = false;
    PROFANITY_LIST.forEach((badWord) => {
      if (variant.includes(badWord)) {
        found = true;
      }
    });
    if (found) {
      return true;
    }
  }

  return false;
}

/**
 * Validate and sanitize a username.
 * Rules:
 * - Minimum 3 characters
 * - Maximum 20 characters
 * - Only alphanumeric characters and underscores
 * - No profanity
 * - Cannot start with an underscore
 */
export function sanitizeUsername(username: string): {
  valid: boolean;
  error?: string;
} {
  if (username.length < 3) {
    return { valid: false, error: "Username must be at least 3 characters long" };
  }

  if (username.length > 20) {
    return { valid: false, error: "Username must be at most 20 characters long" };
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return {
      valid: false,
      error: "Username can only contain letters, numbers, and underscores",
    };
  }

  if (username.startsWith("_")) {
    return { valid: false, error: "Username cannot start with an underscore" };
  }

  if (containsProfanity(username)) {
    return { valid: false, error: "Username contains inappropriate language" };
  }

  return { valid: true };
}
