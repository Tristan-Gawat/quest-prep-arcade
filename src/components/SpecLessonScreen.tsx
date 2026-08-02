"use client";

import { useState, useEffect } from "react";
import { GameState, Screen } from "@/lib/state";
import { cybersecModules } from "@/data/uphsl-cybersec";
import { gamedevModules } from "@/data/uphsl-gamedev";
import { compsciModules } from "@/data/uphsl-compsci";
import { multimediaModules } from "@/data/uphsl-multimedia";
import { courses } from "@/data/courses";
import { askBuiltinAI } from "@/lib/ai-builtin";
import CodeBlock from "@/components/CodeBlock";

interface SpecLessonScreenProps {
  state: GameState;
  updateState: (updates: Partial<GameState>) => void;
  navigate: (screen: Screen) => void;
}

const ALL_SPEC_MODULES = [...cybersecModules, ...gamedevModules, ...compsciModules, ...multimediaModules];

export default function SpecLessonScreen({ state, updateState, navigate }: SpecLessonScreenProps) {
  const [lesson, setLesson] = useState<{ explanation: string; code: string; breakdown?: string; together?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [pickingLang, setPickingLang] = useState(false);
  const [subLessons, setSubLessons] = useState<string[]>([]);
  const [currentSubLesson, setCurrentSubLesson] = useState<number>(-1); // -1 = showing sub-lesson list

  const moduleId = state.currentSpecModuleId;
  const languageId = state.currentSpecLanguage;

  const specModule = ALL_SPEC_MODULES.find((m) => m.id === moduleId);
  const course = courses.find((c) => c.id === languageId);
  const langName = course?.name || languageId || "Python";
  const codeLang = languageId === "htmlcss" ? "html" : languageId === "csharp" ? "csharp" : languageId || "python";

  useEffect(() => {
    if (!specModule) { setLoading(false); return; }
    // Use pre-built sub-lessons from the data
    if (specModule.subLessons && specModule.subLessons.length > 0) {
      setSubLessons(specModule.subLessons);
    } else {
      // Fallback to concepts if no subLessons defined
      setSubLessons(specModule.concepts.map((c) => `Learn: ${c}`));
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!specModule) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="card p-8 text-center">
          <p className="text-text-muted">Module not found</p>
          <button onClick={() => navigate("spec-modules")} className="btn-secondary text-sm mt-4">← Back</button>
        </div>
      </div>
    );
  }

  // Show language picker if no language selected
  if (!languageId || !course) {
    return (
      <div className="flex-1 p-4 md:p-8 overflow-y-auto relative z-10">
        <div className="max-w-4xl mx-auto fade-in">
          <button onClick={() => navigate("spec-modules")} className="text-xs text-text-muted hover:text-text-primary mb-4 cursor-pointer">
            ← Back to modules
          </button>
          <h2 className="text-lg font-semibold text-text-primary mb-2">{specModule.title}</h2>
          <p className="text-sm text-text-secondary mb-6">Choose a programming language to learn this in:</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
            {courses.map((c) => (
              <button
                key={c.id}
                onClick={() => updateState({ currentSpecLanguage: c.id })}
                className="card p-3 text-center hover:border-accent-blue/50 cursor-pointer group"
              >
                <span className="text-xl block mb-1 group-hover:scale-110 transition-transform">{c.icon}</span>
                <span className="text-[10px] text-text-muted">{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
  const loadSubLesson = async (index: number) => {
    setCurrentSubLesson(index);
    setLesson(null);

    const subTopic = subLessons[index];
    const secNote = state.currentSpecId === "uphsl-cybersec" ? " This is for educational purposes only — always get proper authorization." : "";
    const prompt = `You are teaching a student about "${subTopic}" (part of "${specModule!.title}") using ${langName}.

Write a COMPLETE, DETAILED lesson. You MUST include ALL 4 sections exactly as labeled below:

OVERVIEW:
Write 2-3 paragraphs explaining what ${subTopic} is, why it matters, and where it is used in real applications. Be thorough and beginner-friendly.

CODE:
Write a COMPLETE, WORKING ${langName} code example (25-40 lines) that demonstrates ${subTopic}. Include comments explaining key lines. Do NOT use markdown backticks around the code.

BREAKDOWN:
Explain the code section by section:
- Line 1-3: what these imports/setup do
- Line 4-8: what this function/block does
- Continue for every meaningful section
- Explain what each variable name means
- Explain what would happen if you changed a value
- Explain any keywords or built-in functions used

TOGETHER:
Write 1-2 paragraphs explaining how all the pieces connect. Describe the full execution flow from start to finish. Explain what the program outputs and why.${secNote}

IMPORTANT: You MUST write the exact labels "OVERVIEW:", "CODE:", "BREAKDOWN:", and "TOGETHER:" on their own lines to separate each section.`;

    const result = await askBuiltinAI(prompt, 2000);

    if (result.success && result.content) {
      // Try structured parsing first
      const overviewMatch = result.content.match(/OVERVIEW:\s*([\s\S]*?)(?=\nCODE:)/i);
      const codeMatch = result.content.match(/CODE:\s*([\s\S]*?)(?=\nBREAKDOWN:)/i);
      const breakdownMatch = result.content.match(/BREAKDOWN:\s*([\s\S]*?)(?=\nTOGETHER:)/i);
      const togetherMatch = result.content.match(/TOGETHER:\s*([\s\S]*?)$/i);

      let overview = (overviewMatch?.[1] || "").trim();
      let code = (codeMatch?.[1] || "").trim();
      let breakdown = (breakdownMatch?.[1] || "").trim();
      let together = (togetherMatch?.[1] || "").trim();

      // Clean code block markers
      code = code.replace(/^```[\w]*\n?/, "").replace(/\n?```$/, "").trim();

      // If structured parsing failed (no sections found), try to split intelligently
      if (!overview && !code) {
        const content = result.content;
        // Look for any code block
        const codeBlockMatch = content.match(/```[\w]*\n([\s\S]*?)\n```/);
        if (codeBlockMatch) {
          code = codeBlockMatch[1];
          const beforeCode = content.slice(0, content.indexOf("```")).trim();
          const afterCode = content.slice(content.lastIndexOf("```") + 3).trim();
          overview = beforeCode;
          breakdown = afterCode;
        } else {
          // No code block found — treat entire response as overview
          overview = content;
          code = `# ${subTopic} - ${langName}\n# The AI response did not include a separate code block.\n# Try regenerating this lesson.`;
        }
      }

      // Ensure we have meaningful content
      if (!overview) overview = `This lesson covers ${subTopic} as part of ${specModule!.title}.`;
      if (!code) code = `# ${subTopic}\n# ${langName} example`;

      setLesson({ explanation: overview, code, breakdown, together });
    } else {
      setLesson({
        explanation: `This sub-lesson covers: ${subTopic}\n\nThe AI is currently unavailable — try again in a moment.`,
        code: `// ${subTopic}\n// ${langName} example\n// AI will generate code when available`,
        breakdown: "",
        together: "",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-accent-blue text-sm pulse-soft">Loading module...</p>
      </div>
    );
  }

  // Show sub-lesson list (no sub-lesson selected yet)
  if (currentSubLesson === -1) {
    return (
      <div className="flex-1 p-4 md:p-8 overflow-y-auto relative z-10">
        <div className="max-w-4xl mx-auto fade-in">
          <button onClick={() => navigate("spec-modules")} className="text-xs text-text-muted hover:text-text-primary mb-4 cursor-pointer">
            ← Back to modules
          </button>

          <div className="flex items-center gap-3 mb-2">
            {course && <span className="text-xl">{course.icon}</span>}
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-text-primary">{specModule!.title}</h2>
              <p className="text-xs text-text-muted">{course ? `Learning in ${langName}` : "Select a lesson below"}</p>
            </div>
          </div>

          <p className="text-sm text-text-secondary mb-6">{specModule!.description}</p>

          {/* Sub-lesson list */}
          <div className="space-y-2">
            {subLessons.map((sub, i) => (
              <button
                key={i}
                onClick={() => loadSubLesson(i)}
                className="w-full card p-4 text-left flex items-center gap-4 hover:border-accent-blue/40 transition-all cursor-pointer group"
              >
                <span className="w-7 h-7 flex items-center justify-center rounded-full bg-bg-elevated text-xs text-text-muted group-hover:bg-accent-blue/10 group-hover:text-accent-blue transition-colors">
                  {i + 1}
                </span>
                <span className="text-sm text-text-primary group-hover:text-accent-blue transition-colors">
                  {sub}
                </span>
                <span className="ml-auto text-text-muted group-hover:text-accent-blue text-sm">→</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show lesson content for selected sub-lesson
  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto relative z-10">
      <div className="max-w-4xl mx-auto slide-up">
        <button
          onClick={() => { setCurrentSubLesson(-1); setLesson(null); }}
          className="text-xs text-text-muted hover:text-text-primary mb-4 cursor-pointer"
        >
          ← Back to sub-lessons
        </button>

        <div className="flex items-center gap-3 mb-4">
          {course && <span className="text-xl">{course.icon}</span>}
          <div>
            <h2 className="text-lg font-semibold text-text-primary">{subLessons[currentSubLesson]}</h2>
            <p className="text-xs text-text-muted">{specModule!.title} • {langName}</p>
          </div>
        </div>

        {/* Ethical notice for security topics */}
        {(state.currentSpecId === "uphsl-cybersec") && (
          <div className="card p-3 mb-4 border-l-4 border-l-accent-yellow bg-accent-yellow/5">
            <p className="text-[10px] text-accent-yellow">
              ⚠️ Educational purposes only. Always obtain proper authorization before testing security on any system.
            </p>
          </div>
        )}

        {!lesson ? (
          <div className="card p-8 text-center">
            <p className="text-accent-blue text-sm pulse-soft">AI is generating your lesson...</p>
            <p className="text-xs text-text-muted mt-2">Teaching: {subLessons[currentSubLesson]} in {langName}</p>
          </div>
        ) : (
          <>
            <div className="card p-5 md:p-6 mb-6">
              <p className="text-xs font-medium text-accent-cyan mb-3">Overview</p>
              <div className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                {lesson.explanation}
              </div>
            </div>

            {lesson.code && (
              <div className="mb-6">
                <CodeBlock code={lesson.code} language={codeLang} label={`${subLessons[currentSubLesson]} — ${langName}`} />
              </div>
            )}

            {lesson.breakdown && (
              <div className="card p-5 md:p-6 mb-6 border-l-4 border-l-accent-purple">
                <p className="text-xs font-medium text-accent-purple mb-3">Code Breakdown — Line by Line</p>
                <div className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                  {lesson.breakdown}
                </div>
              </div>
            )}

            {lesson.together && (
              <div className="card p-5 md:p-6 mb-6 border-l-4 border-l-accent-green">
                <p className="text-xs font-medium text-accent-green mb-3">How It All Works Together</p>
                <div className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                  {lesson.together}
                </div>
              </div>
            )}

            {/* Navigation between sub-lessons */}
            <div className="flex gap-3">
              {currentSubLesson > 0 && (
                <button onClick={() => loadSubLesson(currentSubLesson - 1)} className="btn-secondary text-sm">
                  ← Previous
                </button>
              )}
              {currentSubLesson < subLessons.length - 1 && (
                <button onClick={() => loadSubLesson(currentSubLesson + 1)} className="btn-primary text-sm">
                  Next Lesson →
                </button>
              )}
              {currentSubLesson === subLessons.length - 1 && (
                <button
                  onClick={() => { updateState({ score: state.score + 50 }); navigate("spec-modules"); }}
                  className="btn-success text-sm"
                >
                  ✓ Complete Module (+50 XP)
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
