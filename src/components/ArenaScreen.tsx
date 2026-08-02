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

export default function ArenaScreen({ state, updateState, navigate }: ArenaScreenProps) {
  const [challenge, setChallenge] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const generateChallenge = async () => {
    setChallenge(null);
    setSelectedLang(null);
    setCode("");
    setAiResponse(null);
    setSubmitted(false);
    setLoading(true);

    // Try built-in AI first (free for all users)
    const { builtinGenerateChallenge } = await import("@/lib/ai-builtin");
    const aiChallenge = await builtinGenerateChallenge();
    if (aiChallenge) {
      setChallenge(aiChallenge);
    } else {
      // Fallback to pre-built challenges
      setChallenge(ARENA_PROMPTS[Math.floor(Math.random() * ARENA_PROMPTS.length)]);
    }
    setLoading(false);
  };

  const handleSubmitCode = async () => {
    setSubmitted(true);

    if (code.trim()) {
      setLoading(true);
      // Use built-in AI (free for all users)
      const { builtinReviewCode } = await import("@/lib/ai-builtin");
      const review = await builtinReviewCode(challenge || "", code, selectedLang || "");
      if (review) {
        setAiResponse(review);
      }
      setLoading(false);
    }

    // Award XP for attempting
    updateState({ score: state.score + 50 });
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
          <p className="text-sm text-text-secondary mb-8">
            Get a coding challenge from the AI, pick your weapon (language), and write the solution!
          </p>
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
          {!state.aiApiKey && (
            <p className="text-xs text-text-muted mt-4">
              Powered by AI — free for all users!
            </p>
          )}
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

        {/* Challenge */}
        <div className="card p-4 mb-5 border-l-4 border-l-accent-purple">
          <p className="text-sm text-text-primary">{challenge}</p>
        </div>

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
          />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-6">
          {!submitted ? (
            <>
              <button
                onClick={handleSubmitCode}
                disabled={!code.trim() || loading}
                className="btn-success text-sm px-6 py-2.5"
              >
                {loading ? "Analyzing..." : "▶ Submit Solution"}
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
