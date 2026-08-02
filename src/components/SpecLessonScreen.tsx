"use client";

import { useState, useEffect } from "react";
import { GameState, Screen } from "@/lib/state";
import { cybersecModules } from "@/data/uphsl-cybersec";
import { courses } from "@/data/courses";
import { askBuiltinAI } from "@/lib/ai-builtin";
import CodeBlock from "@/components/CodeBlock";

interface SpecLessonScreenProps {
  state: GameState;
  updateState: (updates: Partial<GameState>) => void;
  navigate: (screen: Screen) => void;
}

export default function SpecLessonScreen({ state, updateState, navigate }: SpecLessonScreenProps) {
  const [lesson, setLesson] = useState<{ explanation: string; code: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const moduleId = state.currentSpecModuleId;
  const languageId = state.currentSpecLanguage;

  const specModule = cybersecModules.find((m) => m.id === moduleId);
  const course = courses.find((c) => c.id === languageId);
  const langName = course?.name || languageId || "Python";
  const codeLang = languageId === "htmlcss" ? "html" : languageId === "csharp" ? "csharp" : languageId || "python";

  useEffect(() => {
    async function generateLesson() {
      if (!specModule) { setLoading(false); return; }

      const prompt = `Teach me about "${specModule.title}" in the context of cybersecurity/ethical hacking, using ${langName} as the programming language.

Topic: ${specModule.description}
Key concepts: ${specModule.concepts.join(", ")}

Provide:
1. A clear explanation (3-4 paragraphs) of how this works
2. A practical ${langName} code example (15-30 lines) demonstrating the concept

Format your response as:
EXPLANATION:
(your explanation here)

CODE:
(your code here)

Keep it educational and ethical. Mention that these techniques should only be used with proper authorization.`;

      const result = await askBuiltinAI(prompt, 1000);

      if (result.success && result.content) {
        const parts = result.content.split(/CODE:/i);
        const explanation = (parts[0] || "").replace(/^EXPLANATION:/i, "").trim();
        const code = (parts[1] || "// Example code will appear here").trim().replace(/^```[\w]*\n?/, "").replace(/\n?```$/, "");
        setLesson({ explanation, code });
      } else {
        setLesson({
          explanation: `This module covers ${specModule.title}: ${specModule.description}\n\nKey concepts include: ${specModule.concepts.join(", ")}.\n\nThe AI is currently unavailable to generate a full lesson. Please try again in a moment, or check if the Gemini API is configured.`,
          code: `// ${specModule.title} - ${langName}\n// Concepts: ${specModule.concepts.slice(0, 3).join(", ")}\n\n// AI-generated code example will appear here\n// when the service is available.`,
        });
      }
      setLoading(false);
    }

    generateLesson();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!specModule || !course) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="card p-8 text-center">
          <p className="text-text-muted">Module not found</p>
          <button onClick={() => navigate("spec-modules")} className="btn-secondary text-sm mt-4">← Back</button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-accent-blue text-sm pulse-soft mb-2">Generating lesson...</p>
          <p className="text-xs text-text-muted">Teaching {specModule.title} in {langName}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto relative z-10">
      <div className="max-w-4xl mx-auto slide-up">
        <button
          onClick={() => navigate("spec-modules")}
          className="text-xs text-text-muted hover:text-text-primary mb-4 cursor-pointer"
        >
          ← Back to modules
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xl">{course.icon}</span>
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-text-primary">{specModule.title}</h2>
            <p className="text-xs text-text-muted">Learning in {langName}</p>
          </div>
        </div>

        {/* Ethical notice */}
        <div className="card p-3 mb-6 border-l-4 border-l-accent-yellow bg-accent-yellow/5">
          <p className="text-[10px] text-accent-yellow">
            ⚠️ Educational purposes only. Always obtain proper authorization before testing security on any system.
          </p>
        </div>

        {/* Explanation */}
        <div className="card p-5 md:p-6 mb-6">
          <p className="text-xs font-medium text-accent-cyan mb-3">Lesson</p>
          <div className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
            {lesson?.explanation}
          </div>
        </div>

        {/* Code Example */}
        {lesson?.code && (
          <div className="mb-6">
            <CodeBlock code={lesson.code} language={codeLang} label={`${specModule.title} — ${langName}`} />
          </div>
        )}

        {/* Concepts covered */}
        <div className="card p-4 mb-6">
          <p className="text-xs font-medium text-text-primary mb-2">Concepts Covered</p>
          <div className="flex flex-wrap gap-2">
            {specModule.concepts.map((c) => (
              <span key={c} className="text-[10px] bg-bg-elevated text-accent-green px-2 py-1 rounded">
                ✓ {c}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => {
              updateState({ score: state.score + 30 });
              navigate("spec-modules");
            }}
            className="btn-success text-sm"
          >
            ✓ Mark Complete (+30 XP)
          </button>
          <button
            onClick={() => {
              updateState({ currentSpecLanguage: null, currentScreen: "spec-modules" });
            }}
            className="btn-secondary text-sm"
          >
            Try Different Language
          </button>
        </div>
      </div>
    </div>
  );
}
