"use client";

import { useState } from "react";
import { GameState, Screen } from "@/lib/state";
import { courses } from "@/data/courses";
import { generateHint } from "@/lib/ai";
import CodeEditor from "@/components/CodeEditor";
import CodeBlock from "@/components/CodeBlock";

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
      <div className="max-w-3xl mx-auto slide-up">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="bg-bg-elevated text-accent-green text-xs font-medium px-3 py-1 rounded-full border border-border">
            {currentModule.tier}
          </span>
          <span className="text-xs text-text-muted">Code Challenge</span>
        </div>

        <h2 className="text-lg md:text-xl font-semibold text-text-primary mb-4">
          🎮 {challenge.title}
        </h2>

        {/* Challenge Description */}
        <div className="card p-5 mb-6">
          <p className="text-sm text-text-secondary leading-relaxed">
            {challenge.description}
          </p>
        </div>

        {/* Code Editor */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-accent-cyan font-medium">
              Your Code ({challenge.language.toUpperCase()})
            </span>
            <span className="text-xs text-text-muted">
              {code.split("\n").length} lines
            </span>
          </div>
          <CodeEditor
            value={code}
            onChange={setCode}
            language={challenge.language}
            placeholder={challenge.starterCode.replace(/\\n/g, "\n")}
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
                className="btn-success text-sm px-5 py-2.5"
              >
                ▶ Run & Check
              </button>
              <button
                onClick={handleGetHint}
                className="btn-secondary text-sm px-5 py-2.5"
              >
                💡 Hint ({hintIndex + 1}/{challenge.hints.length})
              </button>
              {state.aiApiKey && (
                <button
                  onClick={handleAIHint}
                  disabled={aiLoading}
                  className="btn-secondary text-sm px-5 py-2.5"
                >
                  {aiLoading ? "🤖 Thinking..." : "🤖 AI Hint"}
                </button>
              )}
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="btn-secondary text-sm px-5 py-2.5"
              >
                👁 {showSolution ? "Hide" : "Show"} Solution
              </button>
            </>
          ) : (
            <button
              onClick={handleNextModule}
              className="btn-primary text-sm px-8 py-3"
            >
              Next Module →
            </button>
          )}
        </div>

        {/* Hints */}
        {showHint && (
          <div className="card p-4 mb-4 border-l-4 border-l-accent-yellow fade-in">
            <p className="text-xs font-medium text-accent-yellow mb-1">💡 Hint</p>
            <p className="text-sm text-text-secondary">
              {challenge.hints[hintIndex]}
            </p>
          </div>
        )}

        {/* AI Hint */}
        {aiHint && (
          <div className="card p-4 mb-4 border-l-4 border-l-accent-purple fade-in">
            <p className="text-xs font-medium text-accent-purple mb-1">
              🤖 AI Suggests
            </p>
            <p className="text-sm text-text-secondary whitespace-pre-wrap">
              {aiHint}
            </p>
          </div>
        )}

        {/* Result Feedback */}
        {submitted && (
          <div
            className={`card p-5 mb-4 fade-in ${
              passed
                ? "border-l-4 border-l-accent-green bg-accent-green/5"
                : "border-l-4 border-l-accent-red bg-accent-red/5"
            }`}
          >
            <p className={`text-sm font-medium mb-1 ${passed ? "text-accent-green" : "text-accent-red"}`}>
              {passed ? "✅ Challenge Passed! +250 XP" : "❌ Not quite right"}
            </p>
            <p className="text-xs text-text-secondary">
              {passed
                ? "Great job! You've mastered this concept!"
                : "Check your code and try again. Use hints if stuck!"}
            </p>
          </div>
        )}

        {/* Solution */}
        {showSolution && (
          <div className="mb-4 fade-in">
            <CodeBlock
              code={challenge.solution.replace(/\\n/g, "\n")}
              language={challenge.language}
              label="Solution"
            />
          </div>
        )}
      </div>
    </div>
  );
}
