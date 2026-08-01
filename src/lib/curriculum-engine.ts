import { Module, Tier } from "@/data/curriculum";
import { askAI } from "./ai";
import { supabase } from "./supabase";

// The self-learning curriculum engine
// Discovers, learns, and teaches new coding concepts automatically

export interface GeneratedModule {
  id: string;
  language_id: string;
  title: string;
  tier: Tier;
  topic: string;
  module_data: Module;
  source: "auto" | "admin" | "user-request";
  requested_by: string | null;
  created_at: string;
  published: boolean;
}

// Topic discovery - AI finds interesting/trending topics to teach
const DISCOVERY_PROMPTS: Record<string, string> = {
  python: "What's a useful Python concept, library, or technique that intermediate developers should know in 2024-2025? Pick something practical and modern. Give just the topic name (2-5 words).",
  javascript: "What's a modern JavaScript/ES2024+ feature, pattern, or Web API that developers should learn? Pick something useful and current. Give just the topic name (2-5 words).",
  typescript: "What's a useful TypeScript technique, utility type pattern, or type-level trick that devs should know? Give just the topic name (2-5 words).",
  htmlcss: "What's a modern CSS feature or HTML technique that web developers should learn in 2024-2025? Give just the topic name (2-5 words).",
  tailwind: "What's a useful Tailwind CSS pattern, plugin, or technique that frontend devs should know? Give just the topic name (2-5 words).",
  java: "What's a modern Java feature (17+), framework pattern, or best practice worth learning? Give just the topic name (2-5 words).",
  csharp: "What's a modern C# 12+ feature, .NET pattern, or technique worth learning? Give just the topic name (2-5 words).",
  c: "What's an important C programming technique, optimization, or systems concept to learn? Give just the topic name (2-5 words).",
  cpp: "What's a modern C++20/23 feature or best practice worth learning? Give just the topic name (2-5 words).",
  rust: "What's a useful Rust pattern, crate, or systems programming concept to learn? Give just the topic name (2-5 words).",
  go: "What's a useful Go pattern, standard library feature, or concurrency technique to learn? Give just the topic name (2-5 words).",
  kotlin: "What's a modern Kotlin feature, coroutine pattern, or Android/multiplatform technique to learn? Give just the topic name (2-5 words).",
  swift: "What's a modern Swift/SwiftUI feature or iOS development pattern to learn? Give just the topic name (2-5 words).",
  php: "What's a modern PHP 8.3+ feature, Laravel pattern, or best practice to learn? Give just the topic name (2-5 words).",
  ruby: "What's a useful Ruby/Rails pattern, metaprogramming technique, or modern Ruby feature to learn? Give just the topic name (2-5 words).",
  perl: "What's a useful Perl technique, CPAN module, or text processing pattern to learn? Give just the topic name (2-5 words).",
  sql: "What's an important SQL technique, optimization strategy, or database concept to learn? Give just the topic name (2-5 words).",
};

// Discover a new topic for a language
export async function discoverTopic(
  languageId: string,
  apiKey: string,
  provider: "openai" | "anthropic"
): Promise<string | null> {
  const prompt = DISCOVERY_PROMPTS[languageId] || `What's an interesting ${languageId} programming concept to learn? Give just the topic name (2-5 words).`;
  const result = await askAI(prompt, apiKey, provider);
  if (result.success) {
    return result.content.replace(/['"]/g, "").trim().slice(0, 60);
  }
  return null;
}

// Generate a full module from a topic
export async function generateModuleFromTopic(
  languageId: string,
  topic: string,
  tier: Tier,
  apiKey: string,
  provider: "openai" | "anthropic"
): Promise<Module | null> {
  const langName = languageId === "htmlcss" ? "HTML/CSS" : languageId === "csharp" ? "C#" : languageId;
  const codeLang = languageId === "htmlcss" ? "html" : languageId === "tailwind" ? "css" : languageId;

  const prompt = `Create a complete programming lesson about "${topic}" for ${langName} at ${tier} difficulty.

Return ONLY valid JSON (no markdown, no backticks) with this exact structure:
{
  "title": "${topic}",
  "lesson": {
    "title": "${topic}",
    "concept": "One clear sentence describing what this concept is",
    "explanation": "2-3 sentences explaining how it works and why it matters",
    "codeExample": "A working code example (15-25 lines) demonstrating the concept. Use \\n for newlines.",
    "language": "${codeLang}"
  },
  "quiz": [
    {"question": "Question about the concept", "choices": ["wrong", "correct", "wrong", "wrong"], "correct": 1, "explanation": "Why this is correct"},
    {"question": "Second question", "choices": ["wrong", "wrong", "correct", "wrong"], "correct": 2, "explanation": "Why"},
    {"question": "Third question", "choices": ["correct", "wrong", "wrong", "wrong"], "correct": 0, "explanation": "Why"}
  ],
  "challenge": {
    "title": "Practice: ${topic}",
    "description": "A clear coding task (2-3 sentences) that tests understanding of ${topic}",
    "starterCode": "// Starter code with hints\\n",
    "expectedOutput": "expected console output",
    "hints": ["First helpful hint", "Second hint", "Third hint"],
    "solution": "Complete working solution code with \\n for newlines",
    "language": "${codeLang}"
  }
}`;

  const result = await askAI(prompt, apiKey, provider);
  if (!result.success) return null;

  try {
    const data = JSON.parse(result.content);
    const moduleId = `${languageId}-ai-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    return {
      id: moduleId,
      title: data.title || topic,
      tier,
      lesson: data.lesson,
      quiz: data.quiz,
      challenge: data.challenge,
    };
  } catch {
    return null;
  }
}

// Full pipeline: discover + generate + save to database
export async function autoGenerateModule(
  languageId: string,
  apiKey: string,
  provider: "openai" | "anthropic",
  source: "auto" | "admin" | "user-request" = "auto",
  requestedBy: string | null = null,
  specificTopic?: string
): Promise<GeneratedModule | null> {
  // Step 1: Discover topic (or use provided one)
  const topic = specificTopic || await discoverTopic(languageId, apiKey, provider);
  if (!topic) return null;

  // Step 2: Determine difficulty tier based on topic complexity
  const tierResult = await askAI(
    `For the programming topic "${topic}" in ${languageId}, what difficulty level is it? Reply with ONLY one word: EASY, MEDIUM, HARD, or EXPERT`,
    apiKey,
    provider
  );
  let tier: Tier = "MEDIUM";
  if (tierResult.success) {
    const t = tierResult.content.trim().toUpperCase();
    if (["EASY", "MEDIUM", "HARD", "EXPERT"].includes(t)) {
      tier = t as Tier;
    }
  }

  // Step 3: Generate the full module
  const moduleData = await generateModuleFromTopic(languageId, topic, tier, apiKey, provider);
  if (!moduleData) return null;

  // Step 4: Save to Supabase
  const generated: GeneratedModule = {
    id: moduleData.id,
    language_id: languageId,
    title: moduleData.title,
    tier,
    topic,
    module_data: moduleData,
    source,
    requested_by: requestedBy,
    created_at: new Date().toISOString(),
    published: true,
  };

  const { error } = await supabase
    .from("community_modules")
    .insert({
      id: generated.id,
      language_id: generated.language_id,
      title: generated.title,
      tier: generated.tier,
      topic: generated.topic,
      module_data: generated.module_data,
      source: generated.source,
      requested_by: generated.requested_by,
      published: generated.published,
    });

  if (error) {
    console.error("Failed to save module:", error);
    // Still return the module even if DB save fails (works locally)
  }

  return generated;
}

// Fetch community modules from the database
export async function fetchCommunityModules(languageId?: string): Promise<Module[]> {
  let query = supabase
    .from("community_modules")
    .select("module_data")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(50);

  if (languageId) {
    query = query.eq("language_id", languageId);
  }

  const { data } = await query;
  if (!data) return [];

  return data.map((row: { module_data: Module }) => row.module_data);
}

// User requests a specific topic
export async function requestTopicModule(
  languageId: string,
  topic: string,
  userId: string | null,
  apiKey: string,
  provider: "openai" | "anthropic"
): Promise<Module | null> {
  const result = await autoGenerateModule(
    languageId,
    apiKey,
    provider,
    "user-request",
    userId,
    topic
  );
  return result?.module_data || null;
}
