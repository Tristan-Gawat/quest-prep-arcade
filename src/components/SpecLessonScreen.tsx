"use client";

import { useState, useEffect } from "react";
import { GameState, Screen } from "@/lib/state";
import { cybersecModules } from "@/data/uphsl-cybersec";
import { gamedevModules } from "@/data/uphsl-gamedev";
import { compsciModules } from "@/data/uphsl-compsci";
import { multimediaModules } from "@/data/uphsl-multimedia";
import { courses } from "@/data/courses";
import { generateFullLesson } from "@/lib/lesson-generator";
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
          <button onClick={() => navigate("spec-modules")} className="inline-flex items-center gap-1 text-xs font-medium text-accent-blue hover:text-accent-blue/80 mb-4 cursor-pointer bg-bg-card border border-border rounded-lg px-3 py-1.5 hover:bg-bg-elevated transition-all">
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
    const secNote = state.currentSpecId === "uphsl-cybersec" ? " (Educational only — get proper authorization.)" : undefined;

    const result = await generateFullLesson(subTopic, specModule!.title, langName, secNote);
    setLesson(result);
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
          <button onClick={() => navigate("spec-modules")} className="inline-flex items-center gap-1 text-xs font-medium text-accent-blue hover:text-accent-blue/80 mb-4 cursor-pointer bg-bg-card border border-border rounded-lg px-3 py-1.5 hover:bg-bg-elevated transition-all">
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
          className="inline-flex items-center gap-1 text-xs font-medium text-accent-blue hover:text-accent-blue/80 mb-4 cursor-pointer bg-bg-card border border-border rounded-lg px-3 py-1.5 hover:bg-bg-elevated transition-all"
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
