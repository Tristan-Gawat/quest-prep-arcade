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
import { getSpecLessonContent, hasSpecLessons } from "@/data/lessons/specs";

interface SpecLessonScreenProps {
  state: GameState;
  updateState: (updates: Partial<GameState>) => void;
  navigate: (screen: Screen) => void;
}

const ALL_SPEC_MODULES = [...cybersecModules, ...gamedevModules, ...compsciModules, ...multimediaModules];

export default function SpecLessonScreen({ state, updateState, navigate }: SpecLessonScreenProps) {
  const [currentSubLesson, setCurrentSubLesson] = useState<number>(-1);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const moduleId = state.currentSpecModuleId;
  const languageId = state.currentSpecLanguage;

  const specModule = ALL_SPEC_MODULES.find((m) => m.id === moduleId);
  const course = courses.find((c) => c.id === languageId);
  const langName = course?.name || languageId || "Python";
  const codeLang = languageId === "htmlcss" ? "html" : languageId === "csharp" ? "csharp" : languageId || "python";

  // If no module found
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

  // If no language selected — show picker
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

  const subLessons = specModule.subLessons || specModule.concepts.map(c => "Learn: " + c);

  const askAboutLesson = async () => {
    if (!aiQuestion.trim()) return;
    setAiLoading(true);
    const topic = currentSubLesson >= 0 ? subLessons[currentSubLesson] : specModule.title;
    const result = await askBuiltinAI(
      `A student is learning "${topic}" (part of ${specModule.title}) in ${langName}. Their question: "${aiQuestion}" Answer clearly and briefly.`,
      500
    );
    setAiAnswer(result.success ? result.content : "AI unavailable — try again.");
    setAiLoading(false);
  };

  // Show sub-lesson list
  if (currentSubLesson === -1) {
    return (
      <div className="flex-1 p-4 md:p-8 overflow-y-auto relative z-10">
        <div className="max-w-4xl mx-auto fade-in">
          <button onClick={() => navigate("spec-modules")} className="inline-flex items-center gap-1 text-xs font-medium text-accent-blue hover:text-accent-blue/80 mb-4 cursor-pointer bg-bg-card border border-border rounded-lg px-3 py-1.5 hover:bg-bg-elevated transition-all">
            ← Back to modules
          </button>

          <div className="flex items-center gap-3 mb-2">
            <span className="text-xl">{course.icon}</span>
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-text-primary">{specModule.title}</h2>
              <p className="text-xs text-text-muted">Learning in {langName}</p>
            </div>
          </div>
          <p className="text-sm text-text-secondary mb-6">{specModule.description}</p>

          <div className="space-y-2">
            {subLessons.map((sub, i) => (
              <button
                key={i}
                onClick={() => { setCurrentSubLesson(i); setAiAnswer(""); setAiQuestion(""); }}
                className="w-full card p-4 text-left flex items-center gap-4 hover:border-accent-blue/40 transition-all cursor-pointer group"
              >
                <span className="w-7 h-7 flex items-center justify-center rounded-full bg-bg-elevated text-xs text-text-muted group-hover:bg-accent-blue/10 group-hover:text-accent-blue transition-colors">
                  {i + 1}
                </span>
                <span className="text-sm text-text-primary group-hover:text-accent-blue transition-colors">{sub}</span>
                <span className="ml-auto text-text-muted group-hover:text-accent-blue text-sm">→</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show lesson content (STATIC — no AI generation)
  const currentTopic = subLessons[currentSubLesson];
  const specContent = moduleId ? getSpecLessonContent(moduleId, currentSubLesson) : null;

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto relative z-10">
      <div className="max-w-4xl mx-auto slide-up">
        <button
          onClick={() => { setCurrentSubLesson(-1); setAiAnswer(""); }}
          className="inline-flex items-center gap-1 text-xs font-medium text-accent-blue hover:text-accent-blue/80 mb-4 cursor-pointer bg-bg-card border border-border rounded-lg px-3 py-1.5 hover:bg-bg-elevated transition-all"
        >
          ← Back to sub-lessons
        </button>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl">{course.icon}</span>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">{currentTopic}</h2>
            <p className="text-xs text-text-muted">{specModule.title} • {langName}</p>
          </div>
        </div>

        {state.currentSpecId === "uphsl-cybersec" && (
          <div className="card p-3 mb-4 border-l-4 border-l-accent-yellow bg-accent-yellow/5">
            <p className="text-[10px] text-accent-yellow">⚠️ Educational purposes only. Always obtain proper authorization before testing security on any system.</p>
          </div>
        )}

        {specContent ? (
          <>
            {/* Definition Card */}
            <div className="card p-5 md:p-6 mb-6 border-l-4 border-l-accent-cyan">
              <p className="text-xs font-medium text-accent-cyan mb-3">📖 Definition</p>
              <p className="text-sm text-text-primary leading-relaxed font-medium">{specContent.definition}</p>
            </div>

            {/* Explanation */}
            <div className="card p-5 md:p-6 mb-6">
              <p className="text-xs font-medium text-accent-purple mb-3">💡 Explanation</p>
              {specContent.explanation.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-sm text-text-secondary leading-relaxed mb-3 last:mb-0">{paragraph}</p>
              ))}
            </div>

            {/* Code Example */}
            {specContent.code && (
              <div className="mb-6">
                <p className="text-xs font-medium text-accent-green mb-3">💻 Code Example</p>
                <CodeBlock code={specContent.code} language={codeLang} />
              </div>
            )}

            {/* Breakdown */}
            <div className="card p-5 md:p-6 mb-6 border-l-4 border-l-accent-yellow">
              <p className="text-xs font-medium text-accent-yellow mb-3">🔍 Breakdown</p>
              {specContent.breakdown.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-sm text-text-secondary leading-relaxed mb-3 last:mb-0">{paragraph}</p>
              ))}
            </div>

            {/* Summary */}
            <div className="card p-5 md:p-6 mb-6 bg-accent-green/5 border-l-4 border-l-accent-green">
              <p className="text-xs font-medium text-accent-green mb-3">✅ Summary</p>
              <p className="text-sm text-text-primary leading-relaxed">{specContent.summary}</p>
            </div>
          </>
        ) : (
          <>
            {/* Overview (fallback when no spec content) */}
            <div className="card p-5 md:p-6 mb-6">
              <p className="text-xs font-medium text-accent-cyan mb-3">About this topic</p>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">{specModule.description}</p>
              <p className="text-xs font-medium text-text-primary mb-2">What you'll learn:</p>
              <ul className="space-y-1">
                {specModule.concepts.map((c, i) => (
                  <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                    <span className="text-accent-green mt-0.5">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key concept detail for current sub-lesson */}
            <div className="card p-5 md:p-6 mb-6 border-l-4 border-l-accent-purple">
              <p className="text-xs font-medium text-accent-purple mb-3">Lesson: {currentTopic}</p>
              <p className="text-sm text-text-secondary leading-relaxed">
                This lesson focuses on <strong>{currentTopic}</strong> as part of {specModule.title}. 
                Understanding this concept is essential for {specModule.category === "offense" ? "ethical hacking and penetration testing" : specModule.category === "defense" ? "building secure systems and defending against attacks" : specModule.category === "forensics" ? "digital forensics and incident investigation" : specModule.category === "fundamentals" ? "building a strong foundation in cybersecurity" : specModule.category === "programming" ? "game programming and development" : specModule.category === "design" ? "game design and player experience" : specModule.category === "algorithms" ? "computational thinking and problem solving" : specModule.category === "ml" ? "machine learning and artificial intelligence" : specModule.category === "data" ? "data analysis and management" : specModule.category === "animation" ? "digital animation and motion" : specModule.category === "video" ? "video production and post-production" : specModule.category === "audio" ? "audio engineering and sound design" : "creative technology and interactive media"}.
              </p>
              <p className="text-sm text-text-secondary leading-relaxed mt-3">
                In {langName}, you would implement this using the language's libraries and tools. Use the "Ask AI" section below to get specific code examples, explanations, or to ask any questions about how to implement {currentTopic} in {langName}.
              </p>
            </div>

            {/* Ask AI about this lesson */}
            <div className="card p-4 mb-6">
              <p className="text-xs font-medium text-accent-purple mb-2">🤖 Ask AI about this lesson</p>
              <p className="text-[10px] text-text-muted mb-2">Ask for code examples, explanations, or how to implement this in {langName}</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && askAboutLesson()}
                  placeholder="e.g., Show me a code example, How does this work in practice?"
                  className="flex-1 bg-bg-input border border-border rounded-lg text-xs text-text-primary p-2.5 outline-none focus:border-border-focus"
                />
                <button
                  onClick={askAboutLesson}
                  disabled={!aiQuestion.trim() || aiLoading}
                  className="btn-primary text-xs px-3 shrink-0"
                >
                  {aiLoading ? "..." : "Ask"}
                </button>
              </div>
              {aiAnswer && (
                <div className="mt-3 p-3 bg-bg-elevated rounded-lg">
                  <p className="text-xs text-text-secondary whitespace-pre-wrap">{aiAnswer}</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Navigation */}
        <div className="flex gap-3">
          {currentSubLesson > 0 && (
            <button onClick={() => { setCurrentSubLesson(currentSubLesson - 1); setAiAnswer(""); }} className="btn-secondary text-sm">← Previous</button>
          )}
          {currentSubLesson < subLessons.length - 1 && (
            <button onClick={() => { setCurrentSubLesson(currentSubLesson + 1); setAiAnswer(""); }} className="btn-primary text-sm">Next Lesson →</button>
          )}
          {currentSubLesson === subLessons.length - 1 && (
            <button onClick={() => { updateState({ score: state.score + 50 }); navigate("spec-modules"); }} className="btn-success text-sm">
              ✓ Complete Module (+50 XP)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
