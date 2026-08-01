import { Module, Tier, QuizQuestion, CodeChallenge, Lesson } from "@/data/curriculum";
import { askAI } from "./ai";

// Topic pools for procedural generation when AI is unavailable
const topicPools: Record<string, Record<Tier, string[]>> = {
  python: {
    EASY: ["string methods", "dictionaries basics", "tuples", "type casting", "math operations", "boolean logic", "string formatting", "list slicing"],
    "MEDIUM": ["file handling", "error handling", "list comprehensions", "dictionary comprehensions", "lambda functions", "map/filter/reduce", "sets", "string methods advanced"],
    HARD: ["decorators", "generators", "context managers", "OOP inheritance", "metaclasses", "async/await", "type hints", "dataclasses"],
    EXPERT: ["design patterns", "concurrency", "memory optimization", "CPython internals", "C extensions", "descriptor protocol", "abstract syntax trees", "bytecode"],
  },
  javascript: {
    EASY: ["string methods", "number methods", "if/else", "switch", "loops", "template literals", "comparison operators", "type coercion"],
    "MEDIUM": ["closures", "prototypes", "classes", "error handling", "regex", "modules (import/export)", "iterators", "generators"],
    HARD: ["proxy/reflect", "symbols", "WeakMap/WeakSet", "event loop", "web workers", "service workers", "design patterns", "TypedArrays"],
    EXPERT: ["V8 internals", "memory leaks", "compiler optimization", "custom iterables", "SharedArrayBuffer", "WebAssembly", "meta-programming", "garbage collection"],
  },
  htmlcss: {
    EASY: ["semantic HTML", "lists & tables", "links & images", "colors & units", "box model", "text styling", "backgrounds", "borders"],
    "MEDIUM": ["responsive design", "media queries", "CSS variables", "pseudo-classes", "pseudo-elements", "position property", "z-index", "overflow"],
    HARD: ["CSS container queries", "CSS nesting", "CSS layers", "view transitions", "scroll snap", "aspect-ratio", "clamp()", "has() selector"],
    EXPERT: ["CSS Houdini", "paint worklets", "custom properties API", "typed OM", "CSS-in-JS patterns", "rendering performance", "layout thrashing", "composite layers"],
  },
  typescript: {
    EASY: ["type assertions", "union types", "literal types", "type narrowing", "arrays & tuples", "function types", "optional chaining", "nullish coalescing"],
    "MEDIUM": ["discriminated unions", "type predicates", "indexed access types", "template literal types", "recursive types", "module augmentation", "declaration merging", "overloads"],
    HARD: ["infer keyword", "distributive conditional types", "variadic tuple types", "satisfies operator", "const assertions", "branded types", "builder pattern types", "HKTs workarounds"],
    EXPERT: ["type-level programming", "phantom types", "nominal typing", "covariance/contravariance", "module augmentation patterns", "compiler plugins", "AST transformations", "performance types"],
  },
  java: {
    EASY: ["arrays", "string handling", "control flow", "methods", "packages", "type casting", "scanner input", "formatting output"],
    "MEDIUM": ["interfaces", "abstract classes", "enums", "annotations", "inner classes", "comparable/comparator", "iterators", "optional"],
    HARD: ["multithreading", "concurrent collections", "reflection", "design patterns", "functional interfaces", "records", "sealed classes", "modules (JPMS)"],
    EXPERT: ["JVM internals", "bytecode manipulation", "custom classloaders", "GC tuning", "JIT compilation", "Project Loom", "native interfaces (JNI)", "annotation processing"],
  },
  cpp: {
    EASY: ["arrays", "strings (std::string)", "control flow", "functions", "enums", "typedef/using", "auto keyword", "range-based for"],
    "MEDIUM": ["inheritance", "operator overloading", "friend functions", "namespaces", "file I/O", "exception handling", "functors", "iterators"],
    HARD: ["concepts (C++20)", "coroutines", "constexpr", "type traits", "perfect forwarding", "CRTP", "fold expressions", "modules (C++20)"],
    EXPERT: ["memory models", "lock-free programming", "template metaprogramming", "SFINAE", "compile-time computation", "custom allocators", "ABI compatibility", "undefined behavior"],
  },
  rust: {
    EASY: ["variables & mutability", "data types", "functions", "control flow", "string vs &str", "vectors", "option & result", "error handling basics"],
    "MEDIUM": ["iterators & closures", "smart pointers", "collections", "modules & crates", "testing", "error handling advanced", "type aliases", "associated types"],
    HARD: ["unsafe code", "macros", "async runtime", "pin & unpin", "PhantomData", "trait objects vs generics", "interior mutability", "zero-cost abstractions"],
    EXPERT: ["proc macros", "FFI", "embedded Rust", "custom allocators", "SIMD", "no_std programming", "compiler internals", "formal verification"],
  },
  go: {
    EASY: ["variables & types", "functions", "control flow", "arrays vs slices", "strings & runes", "packages", "pointers", "defer"],
    "MEDIUM": ["methods & receivers", "composition", "testing", "init functions", "context package", "io.Reader/Writer", "encoding/json", "http package"],
    HARD: ["generics (Go 1.18+)", "reflection", "unsafe package", "cgo", "profiling & pprof", "race detector", "sync primitives", "plugin system"],
    EXPERT: ["compiler directives", "assembly integration", "custom runtime", "scheduler internals", "memory model", "escape analysis", "link-time optimization", "cross-compilation"],
  },
  sql: {
    EASY: ["INSERT/UPDATE/DELETE", "data types", "constraints", "primary keys", "foreign keys", "NULL handling", "aliases", "CASE expressions"],
    "MEDIUM": ["window functions", "views", "stored procedures", "transactions", "ACID properties", "normalization", "denormalization", "triggers"],
    HARD: ["query optimization", "execution plans", "partitioning", "materialized views", "recursive CTEs", "pivot/unpivot", "JSON operations", "full-text search"],
    EXPERT: ["database internals", "B-tree implementation", "WAL mechanisms", "MVCC", "query planners", "distributed SQL", "sharding strategies", "consensus protocols"],
  },
};

function getRandomTopic(courseId: string, tier: Tier, usedTopics: string[]): string {
  const pool = topicPools[courseId]?.[tier] || ["general concepts"];
  const available = pool.filter((t) => !usedTopics.includes(t));
  if (available.length === 0) return pool[Math.floor(Math.random() * pool.length)];
  return available[Math.floor(Math.random() * available.length)];
}

// Generate a module using AI
export async function generateModuleWithAI(
  courseId: string,
  courseName: string,
  tier: Tier,
  completedModules: string[],
  apiKey: string,
  provider: "openai" | "anthropic"
): Promise<Module | null> {
  const topic = getRandomTopic(courseId, tier, []);

  const prompt = `Generate a programming lesson module about "${topic}" for ${courseName} at ${tier} difficulty level. 
Return ONLY valid JSON (no markdown, no backticks) with this exact structure:
{
  "title": "short title",
  "lesson": {
    "title": "full title",
    "concept": "one sentence concept",
    "explanation": "2-3 sentence explanation",
    "codeExample": "working code example (use \\n for newlines)",
    "language": "${courseId === 'htmlcss' ? 'html' : courseId}"
  },
  "quiz": [
    {"question": "q1", "choices": ["a","b","c","d"], "correct": 0, "explanation": "why"},
    {"question": "q2", "choices": ["a","b","c","d"], "correct": 1, "explanation": "why"},
    {"question": "q3", "choices": ["a","b","c","d"], "correct": 2, "explanation": "why"}
  ],
  "challenge": {
    "title": "challenge title",
    "description": "what to build",
    "starterCode": "starter code with \\n",
    "expectedOutput": "expected output",
    "hints": ["hint1", "hint2", "hint3"],
    "solution": "full solution with \\n",
    "language": "${courseId === 'htmlcss' ? 'html' : courseId}"
  }
}`;

  const result = await askAI(prompt, apiKey, provider);
  if (!result.success) return null;

  try {
    const data = JSON.parse(result.content);
    const moduleId = `${courseId}-gen-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    return {
      id: moduleId,
      title: data.title || topic,
      tier,
      lesson: data.lesson as Lesson,
      quiz: data.quiz as QuizQuestion[],
      challenge: data.challenge as CodeChallenge,
    };
  } catch {
    return null;
  }
}

// Generate a module procedurally (no AI needed)
export function generateModuleProcedural(
  courseId: string,
  tier: Tier,
  completedModules: string[]
): Module {
  const topic = getRandomTopic(courseId, tier, completedModules.map(id => id.replace(`${courseId}-`, '')));
  const moduleId = `${courseId}-gen-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

  const langName = courseId === 'htmlcss' ? 'HTML/CSS' : courseId.charAt(0).toUpperCase() + courseId.slice(1);
  const lang = courseId === 'htmlcss' ? 'html' : courseId;

  return {
    id: moduleId,
    title: topic.charAt(0).toUpperCase() + topic.slice(1),
    tier,
    lesson: {
      title: topic.charAt(0).toUpperCase() + topic.slice(1),
      concept: `This module covers ${topic} in ${langName} at the ${tier} level.`,
      explanation: `${topic} is an important concept in ${langName} programming. At the ${tier} level, you'll explore how it works and practice applying it. This is a dynamically generated module — add your AI API key in Settings to unlock richer, AI-generated lessons with full code examples and explanations!`,
      codeExample: `// ${langName} - ${topic}\n// Add your AI API key in Settings\n// to generate full code examples!\n\n// Topic: ${topic}\n// Tier: ${tier}`,
      language: lang,
    },
    quiz: generateProceduralQuiz(topic, langName, tier),
    challenge: generateProceduralChallenge(topic, langName, lang, tier),
  };
}

function generateProceduralQuiz(topic: string, langName: string, tier: Tier): QuizQuestion[] {
  return [
    {
      question: `Which of the following best describes "${topic}" in ${langName}?`,
      choices: [
        `A core language feature for data handling`,
        `A pattern for organizing code structure`,
        `A built-in utility for common operations`,
        `An advanced optimization technique`,
      ],
      correct: Math.floor(Math.random() * 4),
      explanation: `This is a generated placeholder. Enable AI in Settings for real questions about ${topic}!`,
    },
    {
      question: `At the ${tier} level, ${topic} is primarily used for:`,
      choices: [
        `Basic program structure`,
        `Data transformation`,
        `Error handling and safety`,
        `Performance optimization`,
      ],
      correct: tier === 'EASY' ? 0 : tier === 'MEDIUM' ? 1 : 3,
      explanation: `Enable AI in Settings for detailed explanations!`,
    },
    {
      question: `What is a key benefit of understanding ${topic}?`,
      choices: [
        `Writing cleaner, more readable code`,
        `Improving application performance`,
        `Better error handling and debugging`,
        `All of the above`,
      ],
      correct: 3,
      explanation: `Understanding ${topic} provides multiple benefits to your ${langName} development skills.`,
    },
  ];
}

function generateProceduralChallenge(topic: string, langName: string, lang: string, tier: Tier): CodeChallenge {
  return {
    title: `Practice: ${topic}`,
    description: `Write code demonstrating your understanding of ${topic} in ${langName}. This is a free-form practice challenge. Enable AI in Settings for structured challenges with automated validation!`,
    starterCode: `// Practice: ${topic}\n// Write your ${langName} code here\n// Tier: ${tier}\n\n`,
    expectedOutput: "practice",
    hints: [
      `Think about the core concept behind ${topic}`,
      `Try writing a small example that demonstrates the key idea`,
      `Enable AI in Settings for targeted hints!`,
    ],
    solution: `// This is a practice module.\n// Enable AI in Settings for full solutions!\n// Topic: ${topic} (${tier})`,
    language: lang,
  };
}

export function shouldGenerateNewModule(
  courseModules: Module[],
  completedModules: string[],
  currentTier: Tier
): boolean {
  const tierModules = courseModules.filter(m => m.tier === currentTier);
  const completedTierModules = tierModules.filter(m => completedModules.includes(m.id));
  // Generate new content when user has completed 75%+ of current tier modules
  return completedTierModules.length >= tierModules.length * 0.75 && tierModules.length > 0;
}
