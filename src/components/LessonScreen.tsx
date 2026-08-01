"use client";

import { useState } from "react";
import { GameState, Screen } from "@/lib/state";
import { courses } from "@/data/courses";
import { generateExplanation } from "@/lib/ai";
import CodeBlock from "@/components/CodeBlock";

interface LessonScreenProps {
  state: GameState;
  navigate: (screen: Screen) => void;
}

export default function LessonScreen({ state, navigate }: LessonScreenProps) {
  const [aiExplanation, setAiExplanation] = useState<string>("");
  const [aiLoading, setAiLoading] = useState(false);

  const course = courses.find((c) => c.id === state.currentCourseId);
  if (!course) return null;

  const dynamicModules = state.generatedModules[course.id] || [];
  const allModules = [...course.modules, ...dynamicModules];
  const currentModule = allModules[state.currentModuleIndex];
  if (!currentModule) return null;

  const { lesson } = currentModule;

  const handleAskAI = async () => {
    if (!state.aiApiKey) return;
    setAiLoading(true);
    const explanation = await generateExplanation(
      course.name,
      lesson.concept,
      state.aiApiKey,
      state.aiProvider
    );
    setAiExplanation(explanation);
    setAiLoading(false);
  };

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto slide-up">
        {/* Module header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="bg-bg-elevated text-accent-green text-xs font-medium px-3 py-1 rounded-full border border-border">
            {currentModule.tier}
          </span>
          <span className="text-xs text-text-muted">
            Module {state.currentModuleIndex + 1}/{allModules.length}
          </span>
        </div>

        {/* Lesson Title */}
        <h2 className="text-xl md:text-2xl font-semibold text-text-primary mb-6">
          📖 {lesson.title}
        </h2>

        {/* Concept Card */}
        <div className="card p-5 md:p-6 mb-6 border-l-4 border-l-accent-yellow">
          <p className="text-xs font-medium text-accent-yellow mb-2">
            Key Concept
          </p>
          <p className="text-sm text-text-primary leading-relaxed">
            {lesson.concept}
          </p>
        </div>

        {/* Explanation */}
        <div className="card p-5 md:p-6 mb-6">
          <p className="text-xs font-medium text-accent-cyan mb-3">
            Explanation
          </p>
          <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
            {lesson.explanation}
          </p>
        </div>

        {/* Code Example */}
        <div className="mb-6">
          <CodeBlock
            code={lesson.codeExample}
            language={lesson.language}
            label="Code Example"
          />
        </div>

        {/* AI Explanation (optional) */}
        {state.aiApiKey && (
          <div className="mb-6">
            {!aiExplanation ? (
              <button
                onClick={handleAskAI}
                disabled={aiLoading}
                className="btn-secondary w-full text-sm"
              >
                {aiLoading
                  ? "🤖 AI is thinking..."
                  : "🤖 Ask AI for more explanation"}
              </button>
            ) : (
              <div className="card p-5 border-l-4 border-l-accent-purple">
                <p className="text-xs font-medium text-accent-purple mb-3">
                  🤖 AI Tutor
                </p>
                <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                  {aiExplanation}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-4 justify-center pt-4">
          <button
            onClick={() => navigate("quiz")}
            className="btn-primary text-sm px-8 py-3"
          >
            Take the Quiz →
          </button>
        </div>
      </div>
    </div>
  );
}
