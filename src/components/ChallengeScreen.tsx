"use client";

import { useState } from "react";
import { GameState, Screen } from "@/lib/state";
import { courses } from "@/data/courses";
import { generateHint } from "@/lib/ai";

interface ChallengeScreenProps {
  state: GameState;
  updateState: (updates: Partial<GameState>) => void;
  navigate: (screen: Screen) => void;
}

export default function ChallengeScreen({
  state,
  updateState,
  navigate,
}: ChallengeScreenProps) {
  const [code, setCode] = useState("");
  const [hintIndex, setHintIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [aiHint, setAiHint] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [passed, setPassed] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const course = courses.find((c) => c.id === state.currentCourseId);
  const dynamicModules = state.generatedModules[course?.id || ""] || [];
  const allModules = course ? [...course.modules, ...dynamicModules] : [];
  const currentModule = allModules[state.currentModuleIndex];

  if (!course || !currentModule) return null;
  const { challenge } = currentModule;

  const handleSubmit = () => {
    setSubmitted(true);
    // Simple validation: check if key patterns exist in code
    const normalized = code.replace(/\s+/g, " ").trim().toLowerCase();
    const expected = challenge.expectedOutput.toLowerCase();

    // For code challenges, we check if the code contains key elements
    // This is a simplified check - in production you'd use a sandbox
    let isPassing = false;

    if (challenge.language === "python") {
      isPassing =
        normalized.includes("print") &&
        (normalized.includes(expected) ||
          checkKeyPatterns(normalized, expected));
    } else if (challenge.language === "javascript") {
      isPassing =
        normalized.includes("console.log") &&
        (normalized.includes(expected) ||
          checkKeyPatterns(normalized, expected));
    } else {
      // HTML/CSS - check for key tags/properties
      isPassing = checkKeyPatterns(normalized, expected);
    }

    setPassed(isPassing);

    if (isPassing) {
      const newCompleted = [...state.completedModules, currentModule.id];
      updateState({
        score: state.score + 250,
        completedModules: newCompleted,
      });
    }
  };

  const checkKeyPatterns = (code: string, expected: string): boolean => {
    // Split expected into key tokens and check if most are present
    const tokens = expected
      .split(/[,\s{}()[\]]+/)
      .filter((t) => t.length > 2);
    const matches = tokens.filter((t) => code.includes(t));
    return matches.length >= tokens.length * 0.5;
  };

  const handleGetHint = () => {
    setShowHint(true);
    if (hintIndex < challenge.hints.length - 1) {
      setHintIndex((prev) => prev + 1);
    }
  };

  const handleAIHint = async () => {
    if (!state.aiApiKey) return;
    setAiLoading(true);
    const hint = await generateHint(
      challenge.description,
      code,
      state.aiApiKey,
      state.aiProvider
    );
    setAiHint(hint);
    setAiLoading(false);
  };

  const handleNextModule = async () => {
    const nextIndex = state.currentModuleIndex + 1;
    if (nextIndex < allModules.length) {
      updateState({
        currentModuleIndex: nextIndex,
        currentScreen: "lesson",
      });
    } else {
      // All modules completed — generate a new one!
      if (state.aiApiKey) {
        // Try AI generation
        const { generateModuleWithAI } = await import("@/lib/generator");
        const newModule = await generateModuleWithAI(
          course.id,
          course.name,
          state.tier,
          state.completedModules,
          state.aiApiKey,
          state.aiProvider
        );
        if (newModule) {
          const existing = state.generatedModules[course.id] || [];
          updateState({
            generatedModules: {
              ...state.generatedModules,
              [course.id]: [...existing, newModule],
            },
            currentModuleIndex: nextIndex,
            currentScreen: "lesson",
            totalModulesGenerated: state.totalModulesGenerated + 1,
          });
          return;
        }
      }
      // Fallback: procedural generation
      const { generateModuleProcedural } = await import("@/lib/generator");
      const newModule = generateModuleProcedural(
        course.id,
        state.tier,
        state.completedModules
      );
      const existing = state.generatedModules[course.id] || [];
      updateState({
        generatedModules: {
          ...state.generatedModules,
          [course.id]: [...existing, newModule],
        },
        currentModuleIndex: nextIndex,
        currentScreen: "lesson",
        totalModulesGenerated: state.totalModulesGenerated + 1,
      });
    }
  };

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="arcade-card bg-arcade-card text-arcade-green text-[8px] px-3 py-1">
            {currentModule.tier}
          </span>
          <span className="text-[8px] text-gray-400">CODE CHALLENGE</span>
        </div>

        <h2 className="text-xs md:text-sm text-arcade-yellow mb-4">
          🎮 {challenge.title}
        </h2>

        {/* Challenge Description */}
        <div className="arcade-card bg-arcade-card p-5 mb-6">
          <p className="text-[9px] md:text-[10px] text-gray-200 leading-relaxed">
            {challenge.description}
          </p>
        </div>

        {/* Code Editor */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[8px] text-arcade-cyan">
              ✏️ YOUR CODE ({challenge.language.toUpperCase()})
            </span>
            <span className="text-[8px] text-gray-500">
              {code.split("\n").length} LINES
            </span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={challenge.starterCode.replace(/\\n/g, "\n")}
            className="code-editor w-full min-h-[180px] md:min-h-[220px]"
            spellCheck={false}
            disabled={passed}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          {!submitted || !passed ? (
            <>
              <button
                onClick={handleSubmit}
                disabled={!code.trim()}
                className="arcade-card bg-arcade-green px-5 py-3 text-[9px] text-black hover:bg-green-300 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ▶ RUN & CHECK
              </button>
              <button
                onClick={handleGetHint}
                className="arcade-card bg-arcade-yellow px-5 py-3 text-[9px] text-black hover:bg-yellow-300 transition-colors cursor-pointer"
              >
                💡 HINT ({hintIndex + 1}/{challenge.hints.length})
              </button>
              {state.aiApiKey && (
                <button
                  onClick={handleAIHint}
                  disabled={aiLoading}
                  className="arcade-card bg-arcade-purple px-5 py-3 text-[9px] text-white hover:bg-purple-400 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {aiLoading ? "🤖 THINKING..." : "🤖 AI HINT"}
                </button>
              )}
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="arcade-card bg-arcade-card px-5 py-3 text-[9px] text-gray-300 hover:bg-gray-600 transition-colors cursor-pointer"
              >
                👁 {showSolution ? "HIDE" : "SHOW"} SOLUTION
              </button>
            </>
          ) : (
            <button
              onClick={handleNextModule}
              className="arcade-card bg-arcade-cyan px-6 py-4 text-[10px] text-black hover:bg-cyan-300 transition-colors cursor-pointer"
            >
              NEXT MODULE →
            </button>
          )}
        </div>

        {/* Hints */}
        {showHint && (
          <div className="arcade-card bg-arcade-yellow/20 p-4 mb-4">
            <p className="text-[8px] text-arcade-yellow mb-2">💡 HINT:</p>
            <p className="text-[9px] text-gray-200">
              {challenge.hints[hintIndex]}
            </p>
          </div>
        )}

        {/* AI Hint */}
        {aiHint && (
          <div className="arcade-card bg-arcade-purple/20 p-4 mb-4">
            <p className="text-[8px] text-arcade-purple mb-2">
              🤖 AI SAYS:
            </p>
            <p className="text-[9px] text-gray-200 whitespace-pre-wrap">
              {aiHint}
            </p>
          </div>
        )}

        {/* Result Feedback */}
        {submitted && (
          <div
            className={`arcade-card p-5 mb-4 ${
              passed ? "bg-arcade-green" : "bg-arcade-red"
            }`}
          >
            <p className="text-[10px] text-black font-bold mb-1">
              {passed ? "✅ CHALLENGE PASSED! +250 XP" : "❌ NOT QUITE RIGHT"}
            </p>
            <p className="text-[8px] text-black/70">
              {passed
                ? "Great job! You've mastered this concept!"
                : "Check your code and try again. Use hints if stuck!"}
            </p>
          </div>
        )}

        {/* Solution */}
        {showSolution && (
          <div className="arcade-card bg-[#0d1117] p-5">
            <p className="text-[8px] text-arcade-green mb-3">
              📋 SOLUTION:
            </p>
            <pre className="text-[9px] text-arcade-green leading-relaxed font-mono whitespace-pre-wrap">
              {challenge.solution.replace(/\\n/g, "\n")}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
