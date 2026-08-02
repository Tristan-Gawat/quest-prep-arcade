"use client";

import { useState } from "react";
import { GameState, Screen } from "@/lib/state";
import { courses } from "@/data/courses";
import CodeEditor from "@/components/CodeEditor";

interface ArenaScreenProps {
  state: GameState;
  updateState: (updates: Partial<GameState>) => void;
  navigate: (screen: Screen) => void;
}

const ARENA_PROMPTS = [
  "Write a function that reverses a string without using built-in reverse methods.",
  "Write a function that checks if a number is prime.",
  "Write a function that finds the factorial of a number.",
  "Write a function that counts the number of vowels in a string.",
  "Write a function that returns the Fibonacci sequence up to n numbers.",
  "Write a function that flattens a nested array into a single array.",
  "Write a function that finds the most frequent element in an array.",
  "Write a function that checks if two strings are anagrams.",
  "Write a function that converts Celsius to Fahrenheit and vice versa.",
  "Write a function that removes duplicate values from an array.",
  "Write a function that finds the longest word in a sentence.",
  "Write a function that capitalizes the first letter of each word in a string.",
  "Write a function that calculates the sum of all digits in a number.",
  "Write a function that checks if a string is a palindrome.",
  "Write a function that sorts an array without using built-in sort methods.",
  "Write a function that generates a random password of given length.",
  "Write a function that finds the intersection of two arrays.",
  "Write a function that converts a decimal number to binary.",
  "Write a program that prints FizzBuzz for numbers 1-30.",
  "Write a function that compresses a string (e.g., 'aabccc' becomes 'a2b1c3').",
];

// Build context from completed modules to generate relevant challenges
function getLearnedContext(state: GameState): string {
  const completedIds = state.completedModules;
  if (completedIds.length === 0) return "";

  const learnedTopics: string[] = [];
  for (const course of courses) {
    const completedInCourse = course.modules.filter(m => completedIds.includes(m.id));
    if (completedInCourse.length > 0) {
      const topics = completedInCourse.map(m => m.title).slice(0, 5);
      learnedTopics.push(`${course.name}: ${topics.join(", ")}`);
    }
  }

  if (learnedTopics.length === 0) return "";
  return `The student has completed these lessons:\n${learnedTopics.join("\n")}\n\nGenerate a challenge that tests concepts from what they've already learned.`;
}

export default function ArenaScreen({ state, updateState, navigate }: ArenaScreenProps) {
  const [challenge, setChallenge] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [executionError, setExecutionError] = useState<string | null>(null);
  const [executionOutput, setExecutionOutput] = useState<string | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [hintLoading, setHintLoading] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);

  const generateChallenge = async () => {
    setChallenge(null);
    setSelectedLang(null);
    setCode("");
    setAiResponse(null);
    setSubmitted(false);
    setExecutionError(null);
    setExecutionOutput(null);
    setHint(null);
    setHintsUsed(0);
    setLoading(true);

    const context = getLearnedContext(state);

    // Try built-in AI with context from completed lessons
    const { askBuiltinAI } = await import("@/lib/ai-builtin");
    const prompt = context
      ? `${context}\n\nGenerate a short coding challenge (1-2 sentences) that tests the concepts the student already learned. Make it practical. Don't include code or solution.`
      : "Generate a short coding challenge for a student. Just give the task description in 1-2 sentences. Make it practical and fun. Don't include any code or solution.";

    const result = await askBuiltinAI(prompt, 120);
    if (result.success && result.content) {
      setChallenge(result.content);
    } else {
      // Fallback to pre-built challenges
      setChallenge(ARENA_PROMPTS[Math.floor(Math.random() * ARENA_PROMPTS.length)]);
    }
    setLoading(false);
  };

  const handleRunCode = async () => {
    if (!code.trim() || !selectedLang) return;
    setLoading(true);
    setExecutionError(null);
    setExecutionOutput(null);

    try {
      const { executeCode } = await import("@/lib/code-runner");
      const result = await executeCode(selectedLang, code);

      if (result.success) {
        setExecutionOutput(result.output || "(no output)");
        setExecutionError(null);
      } else {
        setExecutionError(result.error || "Unknown error occurred");
        setExecutionOutput(result.output || null);
      }
    } catch {
      setExecutionError("Failed to run code. The execution service may be unavailable.");
    }

    setLoading(false);
  };

  const handleSubmitCode = async () => {
    setSubmitted(true);
    setLoading(true);

    // First run the code to check for errors
    try {
      const { executeCode } = await import("@/lib/code-runner");
      const result = await executeCode(selectedLang || "", code);

      if (!result.success) {
        setExecutionError(result.error || "Code has errors");
        setExecutionOutput(result.output || null);
      } else {
        setExecutionOutput(result.output || "(no output)");
        setExecutionError(null);
      }
    } catch {
      // If Piston is unavailable, just proceed with AI review
    }

    // Get AI review
    if (code.trim()) {
      const { builtinReviewCode } = await import("@/lib/ai-builtin");
      const review = await builtinReviewCode(challenge || "", code, selectedLang || "");
      if (review) {
        setAiResponse(review);
      }
    }

    setLoading(false);
    // Award XP for attempting
    updateState({ score: state.score + 50 });
  };

  const handleGetHint = async () => {
    if (hintsUsed >= 3) return;
    setHintLoading(true);

    const { builtinHint } = await import("@/lib/ai-builtin");
    const hintText = await builtinHint(challenge || "", code);
    setHint(hintText);
    setHintsUsed(hintsUsed + 1);
    setHintLoading(false);
  };

  const handleNewChallenge = () => {
    generateChallenge();
  };

  // Step 1: No challenge yet — show generate button
  if (!challenge) {
    return (
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-lg w-full mx-auto text-center fade-in pt-8">
          <div className="text-5xl mb-6">⚔️</div>
          <h2 className="text-xl md:text-2xl font-semibold text-text-primary mb-3">
            Code Arena
          </h2>
          <p className="text-sm text-text-secondary mb-2">
            Get a coding challenge from the AI, pick your weapon (language), and write the solution!
          </p>
          {state.completedModules.length > 0 && (
            <p className="text-xs text-accent-cyan mb-6">
              Challenges are based on your completed lessons ({state.completedModules.length} modules learned)
            </p>
          )}
          {state.completedModules.length === 0 && (
            <p className="text-xs text-text-muted mb-6">
              Complete some lessons first to get personalized challenges!
            </p>
          )}
          <button
            onClick={generateChallenge}
            disabled={loading}
            className="btn-primary text-sm px-8 py-3"
          >
            {loading ? "Generating..." : "Generate Challenge"}
          </button>
          <div className="mt-6">
            <button onClick={() => navigate("course-select")} className="btn-secondary text-sm">
              ← Back to Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Challenge shown, pick a language
  if (!selectedLang) {
    return (
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto fade-in">
          <h2 className="text-lg font-semibold text-text-primary mb-2">⚔️ Arena Challenge</h2>

          <div className="card p-5 mb-6 border-l-4 border-l-accent-purple">
            <p className="text-sm text-text-primary leading-relaxed">{challenge}</p>
          </div>

          <h3 className="text-sm font-medium text-text-secondary mb-4">
            Choose your language:
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
            {courses.map((course) => (
              <button
                key={course.id}
                onClick={() => setSelectedLang(course.id)}
                className="card p-3 text-center hover:border-accent-blue transition-all cursor-pointer"
              >
                <span className="text-xl block mb-1">{course.icon}</span>
                <span className="text-xs text-text-secondary">{course.name}</span>
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button onClick={handleNewChallenge} className="btn-secondary text-sm">
              🔄 New Challenge
            </button>
            <button onClick={() => navigate("course-select")} className="btn-secondary text-sm">
              ← Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Write code
  const selectedCourse = courses.find(c => c.id === selectedLang);
  const langForEditor = selectedLang === "htmlcss" ? "html" : selectedLang === "tailwind" ? "css" : selectedLang;

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto slide-up">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-lg">{selectedCourse?.icon}</span>
          <h2 className="text-lg font-semibold text-text-primary">
            Arena: {selectedCourse?.name}
          </h2>
        </div>

        {/* Challenge - non-interactive display */}
        <div className="card p-4 mb-5 border-l-4 border-l-accent-purple select-text">
          <p className="text-xs font-medium text-accent-purple mb-1">Challenge</p>
          <p className="text-sm text-text-primary leading-relaxed">{challenge}</p>
        </div>

        {/* Hint Section */}
        {hint && (
          <div className="card p-4 mb-4 border-l-4 border-l-accent-yellow fade-in">
            <p className="text-xs font-medium text-accent-yellow mb-1">💡 Hint ({hintsUsed}/3)</p>
            <p className="text-sm text-text-secondary">{hint}</p>
          </div>
        )}

        {/* Code Editor */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-accent-cyan font-medium">
              Your Solution ({selectedCourse?.name})
            </span>
            <span className="text-xs text-text-muted">{code.split("\n").length} lines</span>
          </div>
          <CodeEditor
            value={code}
            onChange={setCode}
            language={langForEditor}
            placeholder={`// Write your ${selectedCourse?.name} solution here...`}
            disabled={submitted && !!aiResponse}
            showLineNumbers
          />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-4">
          {!submitted ? (
            <>
              <button
                onClick={handleRunCode}
                disabled={!code.trim() || loading}
                className="btn-secondary text-sm px-4 py-2.5"
              >
                {loading ? "Running..." : "▶ Run Code"}
              </button>
              <button
                onClick={handleSubmitCode}
                disabled={!code.trim() || loading}
                className="btn-success text-sm px-6 py-2.5"
              >
                {loading ? "Analyzing..." : "✓ Submit Solution"}
              </button>
              <button
                onClick={handleGetHint}
                disabled={hintLoading || hintsUsed >= 3}
                className="btn-secondary text-sm px-4 py-2.5"
                title={hintsUsed >= 3 ? "No more hints available" : "Get a hint from AI"}
              >
                {hintLoading ? "..." : `💡 Hint (${3 - hintsUsed} left)`}
              </button>
              <button
                onClick={() => setSelectedLang(null)}
                className="btn-secondary text-sm"
              >
                ← Change Language
              </button>
            </>
          ) : (
            <>
              <button onClick={handleNewChallenge} className="btn-primary text-sm px-6 py-2.5">
                🔄 Next Challenge
              </button>
              <button onClick={() => navigate("course-select")} className="btn-secondary text-sm">
                ← Back to Courses
              </button>
            </>
          )}
        </div>

        {/* Execution Output */}
        {executionOutput && !executionError && (
          <div className="card p-4 mb-4 border-l-4 border-l-accent-green fade-in">
            <p className="text-xs font-medium text-accent-green mb-2">✅ Output</p>
            <pre className="text-xs text-text-secondary font-mono whitespace-pre-wrap bg-bg-elevated rounded-lg p-3 overflow-x-auto">
              {executionOutput}
            </pre>
          </div>
        )}

        {/* Execution Error */}
        {executionError && (
          <div className="card p-4 mb-4 border-l-4 border-l-red-500 fade-in">
            <p className="text-xs font-medium text-red-400 mb-2">❌ Error</p>
            <pre className="text-xs text-red-300 font-mono whitespace-pre-wrap bg-red-950/30 rounded-lg p-3 overflow-x-auto">
              {executionError}
            </pre>
            {executionOutput && (
              <>
                <p className="text-xs font-medium text-text-muted mt-3 mb-1">Partial Output:</p>
                <pre className="text-xs text-text-secondary font-mono whitespace-pre-wrap bg-bg-elevated rounded-lg p-3 overflow-x-auto">
                  {executionOutput}
                </pre>
              </>
            )}
            {!submitted && (
              <p className="text-xs text-text-muted mt-2 italic">Fix the error and try again!</p>
            )}
          </div>
        )}

        {/* AI Feedback */}
        {submitted && aiResponse && (
          <div className="card p-5 border-l-4 border-l-accent-green fade-in">
            <p className="text-xs font-medium text-accent-green mb-2">🤖 AI Review</p>
            <p className="text-sm text-text-secondary whitespace-pre-wrap">{aiResponse}</p>
          </div>
        )}

        {submitted && !aiResponse && !loading && (
          <div className="card p-5 border-l-4 border-l-accent-yellow fade-in">
            <p className="text-xs font-medium text-accent-yellow mb-2">✅ Submitted! +50 XP</p>
            <p className="text-sm text-text-secondary">
              Great attempt! Keep practicing to improve your skills.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
