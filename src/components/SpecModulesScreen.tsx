"use client";

import { useState } from "react";
import { GameState, Screen } from "@/lib/state";
import { cybersecModules, SpecModule } from "@/data/uphsl-cybersec";
import { gamedevModules } from "@/data/uphsl-gamedev";
import { compsciModules } from "@/data/uphsl-compsci";
import { multimediaModules } from "@/data/uphsl-multimedia";
import { courses } from "@/data/courses";
import { askBuiltinAI } from "@/lib/ai-builtin";
import CodeEditor from "@/components/CodeEditor";

interface SpecModulesScreenProps {
  state: GameState;
  updateState: (updates: Partial<GameState>) => void;
  navigate: (screen: Screen) => void;
}

const SPEC_DATA: Record<string, { title: string; icon: string; modules: SpecModule[] }> = {
  "uphsl-cybersec": { title: "Cybersecurity & Forensics", icon: "🛡️", modules: cybersecModules },
  "uphsl-gamedev": { title: "Game Development", icon: "🎮", modules: gamedevModules },
  "uphsl-compsci": { title: "Computer Science (Data Science)", icon: "🧬", modules: compsciModules },
  "uphsl-multimedia": { title: "Entertainment & Multimedia", icon: "🎬", modules: multimediaModules },
};

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  // Cybersecurity
  fundamentals: { label: "Fundamentals", color: "#7dd3a0" },
  offense: { label: "Ethical Hacking", color: "#ff6b6b" },
  defense: { label: "Defense", color: "#6ea8fe" },
  forensics: { label: "Forensics", color: "#b387ff" },
  // Game Development
  design: { label: "Design", color: "#ff6eaa" },
  programming: { label: "Programming", color: "#6ea8fe" },
  art: { label: "Art & Audio", color: "#ffd56b" },
  production: { label: "Production", color: "#7dd3a0" },
  // Computer Science
  algorithms: { label: "Algorithms", color: "#ff6b6b" },
  data: { label: "Data", color: "#6ea8fe" },
  ml: { label: "Machine Learning", color: "#b387ff" },
  systems: { label: "Systems", color: "#7dd3a0" },
  // Multimedia
  animation: { label: "Animation", color: "#ff6eaa" },
  video: { label: "Video", color: "#6ea8fe" },
  audio: { label: "Audio", color: "#ffd56b" },
  interactive: { label: "Interactive", color: "#b387ff" },
};

type QuizMode = "none" | "quiz" | "code-challenge";

interface QuizQuestion {
  question: string;
  choices: string[];
  correct: number;
}

export default function SpecModulesScreen({ state, updateState, navigate }: SpecModulesScreenProps) {
  const [selectedModule, setSelectedModule] = useState<SpecModule | null>(null);
  const [filter, setFilter] = useState<string>("all");

  // Quiz state
  const [quizMode, setQuizMode] = useState<QuizMode>("none");
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizLoading, setQuizLoading] = useState(false);

  // Code challenge state
  const [codeLang, setCodeLang] = useState<string | null>(null);
  const [codeChallenge, setCodeChallenge] = useState("");
  const [codeValue, setCodeValue] = useState("");
  const [codeSubmitted, setCodeSubmitted] = useState(false);

  const specId = state.currentSpecId;
  const spec = specId ? SPEC_DATA[specId] : null;

  if (!spec) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="card p-8 text-center">
          <p className="text-text-muted">Specialization not found</p>
          <button onClick={() => navigate("course-select")} className="btn-secondary text-sm mt-4">← Back</button>
        </div>
      </div>
    );
  }

  // Start quiz for a module
  const startQuiz = async (mod: SpecModule) => {
    setSelectedModule(mod);
    setQuizMode("quiz");
    setQuizIndex(0);
    setQuizAnswer(null);
    setQuizScore(0);
    setQuizLoading(true);

    const result = await askBuiltinAI(
      `Generate 5 multiple-choice quiz questions about "${mod.title}" in cybersecurity. Topics: ${mod.concepts.join(", ")}.
Return ONLY valid JSON array (no markdown): [{"question":"q","choices":["a","b","c","d"],"correct":0},...]
Each question has 4 choices and "correct" is the index (0-3) of the right answer.`,
      800
    );

    if (result.success) {
      try {
        const parsed = JSON.parse(result.content);
        setQuizQuestions(Array.isArray(parsed) ? parsed.slice(0, 5) : []);
      } catch {
        // Fallback questions from concepts
        setQuizQuestions(mod.concepts.slice(0, 5).map((c, i) => ({
          question: `Which best describes "${c}" in ${mod.title}?`,
          choices: ["A security technique", "A type of attack", "A defensive measure", "A forensic tool"],
          correct: i % 4,
        })));
      }
    } else {
      setQuizQuestions(mod.concepts.slice(0, 5).map((c, i) => ({
        question: `Which best describes "${c}" in ${mod.title}?`,
        choices: ["A security technique", "A type of attack", "A defensive measure", "A forensic tool"],
        correct: i % 4,
      })));
    }
    setQuizLoading(false);
  };

  // Start code challenge for a module
  const startCodeChallenge = async (mod: SpecModule) => {
    setSelectedModule(mod);
    setQuizMode("code-challenge");
    setCodeLang(null);
    setCodeValue("");
    setCodeSubmitted(false);
    setQuizLoading(true);

    const result = await askBuiltinAI(
      `Give a short coding challenge (2-3 sentences) about "${mod.title}" in cybersecurity. The student will write code to solve it. Just describe what to build, don't give the solution.`,
      150
    );
    setCodeChallenge(result.success ? result.content : `Write a script that demonstrates a concept from ${mod.title}.`);
    setQuizLoading(false);
  };

  const handleQuizAnswer = (idx: number) => {
    if (quizAnswer !== null) return;
    setQuizAnswer(idx);
    if (idx === quizQuestions[quizIndex]?.correct) {
      setQuizScore((s) => s + 1);
    }
  };

  const nextQuestion = () => {
    setQuizAnswer(null);
    if (quizIndex + 1 < quizQuestions.length) {
      setQuizIndex((i) => i + 1);
    } else {
      // Quiz done — award XP
      const xp = quizScore * 15;
      updateState({ score: state.score + xp });
      setQuizMode("none");
      setSelectedModule(null);
    }
  };

  // === QUIZ MODE ===
  if (quizMode === "quiz" && selectedModule) {
    if (quizLoading) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-accent-blue text-sm pulse-soft">Generating quiz for {selectedModule.title}...</p>
        </div>
      );
    }

    if (quizIndex >= quizQuestions.length) {
      return (
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="card p-8 text-center max-w-md fade-in">
            <div className="text-4xl mb-4">🎉</div>
            <p className="text-lg font-semibold text-text-primary mb-2">Quiz Complete!</p>
            <p className="text-sm text-text-secondary mb-2">{quizScore}/{quizQuestions.length} correct</p>
            <p className="text-xs text-accent-yellow mb-6">+{quizScore * 15} XP earned</p>
            <button onClick={() => { setQuizMode("none"); setSelectedModule(null); }} className="btn-primary text-sm">
              Back to Modules
            </button>
          </div>
        </div>
      );
    }

    const q = quizQuestions[quizIndex];
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl fade-in">
          <div className="card p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs text-accent-purple font-medium">{selectedModule.title}</span>
              <span className="text-xs text-text-muted">{quizIndex + 1}/{quizQuestions.length}</span>
            </div>
            <p className="text-sm md:text-base text-text-primary mb-6 font-medium">{q.question}</p>
            <div className="space-y-2">
              {q.choices.map((choice, i) => {
                let cls = "w-full p-3 text-sm text-left rounded-lg border transition-all cursor-pointer ";
                if (quizAnswer !== null) {
                  if (i === q.correct) cls += "bg-accent-green/10 border-accent-green text-accent-green";
                  else if (i === quizAnswer) cls += "bg-accent-red/10 border-accent-red text-accent-red";
                  else cls += "bg-bg-card border-border text-text-muted opacity-50";
                } else {
                  cls += "bg-bg-card border-border hover:border-border-focus text-text-primary";
                }
                const labels = ["A", "B", "C", "D"];
                return (
                  <button key={i} onClick={() => handleQuizAnswer(i)} className={cls} disabled={quizAnswer !== null}>
                    <span className="text-text-muted mr-2">{labels[i]}.</span>{choice}
                  </button>
                );
              })}
            </div>
            {quizAnswer !== null && (
              <button onClick={nextQuestion} className="btn-primary text-sm mt-4">
                {quizIndex + 1 < quizQuestions.length ? "Next →" : "See Results"}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // === CODE CHALLENGE MODE ===
  if (quizMode === "code-challenge" && selectedModule) {
    if (quizLoading) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-accent-blue text-sm pulse-soft">Generating challenge...</p>
        </div>
      );
    }

    // Step 1: Pick language
    if (!codeLang) {
      return (
        <div className="flex-1 p-4 md:p-8 overflow-y-auto relative z-10">
          <div className="max-w-4xl mx-auto fade-in">
            <button onClick={() => { setQuizMode("none"); setSelectedModule(null); }} className="inline-flex items-center gap-1 text-xs font-medium text-accent-blue hover:text-accent-blue/80 mb-4 cursor-pointer bg-bg-card border border-border rounded-lg px-3 py-1.5 hover:bg-bg-elevated transition-all">
              ← Back
            </button>
            <h2 className="text-lg font-semibold text-text-primary mb-2">🖥️ Code Challenge: {selectedModule.title}</h2>
            <div className="card p-4 mb-6">
              <p className="text-sm text-text-secondary">{codeChallenge}</p>
            </div>
            <p className="text-xs text-text-muted mb-3">Pick a language to code in:</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {courses.map((c) => (
                <button key={c.id} onClick={() => setCodeLang(c.id)} className="card p-3 text-center hover:border-accent-blue/50 cursor-pointer group">
                  <span className="text-xl block mb-1 group-hover:scale-110 transition-transform">{c.icon}</span>
                  <span className="text-[10px] text-text-muted">{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Step 2: Write code
    const selectedCourse = courses.find((c) => c.id === codeLang);
    const editorLang = codeLang === "htmlcss" ? "html" : codeLang === "tailwind" ? "css" : codeLang;

    return (
      <div className="flex-1 p-4 md:p-8 overflow-y-auto relative z-10">
        <div className="max-w-4xl mx-auto fade-in">
          <button onClick={() => setCodeLang(null)} className="inline-flex items-center gap-1 text-xs font-medium text-accent-blue hover:text-accent-blue/80 mb-4 cursor-pointer bg-bg-card border border-border rounded-lg px-3 py-1.5 hover:bg-bg-elevated transition-all">
            ← Change language
          </button>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">{selectedCourse?.icon}</span>
            <h2 className="text-lg font-semibold text-text-primary">{selectedModule.title} — {selectedCourse?.name}</h2>
          </div>
          <div className="card p-4 mb-4">
            <p className="text-sm text-text-secondary">{codeChallenge}</p>
          </div>
          <CodeEditor value={codeValue} onChange={setCodeValue} language={editorLang} disabled={codeSubmitted} placeholder={`// Write your ${selectedCourse?.name} solution...`} />
          <div className="mt-4 flex gap-3">
            {!codeSubmitted ? (
              <button onClick={() => { setCodeSubmitted(true); updateState({ score: state.score + 40 }); }} disabled={!codeValue.trim()} className="btn-success text-sm">
                ▶ Submit (+40 XP)
              </button>
            ) : (
              <button onClick={() => { setQuizMode("none"); setSelectedModule(null); }} className="btn-primary text-sm">
                ✓ Done — Back to Modules
              </button>
            )}
          </div>
          {codeSubmitted && (
            <div className="card p-4 mt-4 border-l-4 border-l-accent-green fade-in">
              <p className="text-sm text-accent-green font-medium">✅ Submitted! +40 XP</p>
              <p className="text-xs text-text-muted mt-1">Great attempt! Keep practicing to strengthen your skills.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // === LANGUAGE PICKER (for lesson) ===
  if (selectedModule && quizMode === "none") {
    return (
      <div className="flex-1 p-4 md:p-8 overflow-y-auto relative z-10">
        <div className="max-w-4xl mx-auto fade-in">
          <button onClick={() => setSelectedModule(null)} className="inline-flex items-center gap-1 text-xs font-medium text-accent-blue hover:text-accent-blue/80 mb-4 cursor-pointer bg-bg-card border border-border rounded-lg px-3 py-1.5 hover:bg-bg-elevated transition-all">
            ← Back to modules
          </button>
          <div className="card p-6 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ color: CATEGORY_LABELS[selectedModule.category]?.color, background: CATEGORY_LABELS[selectedModule.category]?.color + "15" }}>
                {CATEGORY_LABELS[selectedModule.category]?.label}
              </span>
              <span className="text-[10px] text-text-muted">{selectedModule.difficulty}</span>
            </div>
            <h2 className="text-lg font-semibold text-text-primary mb-2">{selectedModule.title}</h2>
            <p className="text-sm text-text-secondary">{selectedModule.description}</p>
          </div>

          <h3 className="text-sm font-medium text-text-primary mb-3">What do you want to do?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <button onClick={() => { updateState({ currentSpecModuleId: selectedModule.id, currentSpecLanguage: null, currentScreen: "spec-lesson" }); }} className="card p-4 text-center hover:border-accent-cyan/50 cursor-pointer group">
              <span className="text-2xl block mb-2">📖</span>
              <span className="text-xs font-medium text-text-primary">Learn (pick language)</span>
            </button>
            <button onClick={() => startQuiz(selectedModule)} className="card p-4 text-center hover:border-accent-purple/50 cursor-pointer group">
              <span className="text-2xl block mb-2">📝</span>
              <span className="text-xs font-medium text-text-primary">Quiz (A/B/C/D)</span>
            </button>
            <button onClick={() => startCodeChallenge(selectedModule)} className="card p-4 text-center hover:border-accent-green/50 cursor-pointer group">
              <span className="text-2xl block mb-2">🖥️</span>
              <span className="text-xs font-medium text-text-primary">Code Challenge</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // === MODULE GRID ===
  const filteredModules = filter === "all" ? spec.modules : spec.modules.filter((m) => m.category === filter);
  const categories = [...new Set(spec.modules.map((m) => m.category))];

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto relative z-10">
      <div className="max-w-6xl mx-auto fade-in">
        <button onClick={() => navigate("course-select")} className="inline-flex items-center gap-1 text-xs font-medium text-accent-blue hover:text-accent-blue/80 mb-4 cursor-pointer bg-bg-card border border-border rounded-lg px-3 py-1.5 hover:bg-bg-elevated transition-all">
          ← Back to courses
        </button>

        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{spec.icon}</span>
          <h2 className="text-xl md:text-2xl font-bold text-text-primary" style={{ fontFamily: "var(--font-display)" }}>
            {spec.title}
          </h2>
        </div>
        <p className="text-sm text-text-secondary mb-6">Click a topic → Learn, Quiz, or Code Challenge</p>

        {/* Category filters */}
        <div className="flex gap-2 flex-wrap mb-6">
          <button onClick={() => setFilter("all")} className={`px-3 py-1.5 text-xs rounded-lg border transition-all cursor-pointer ${filter === "all" ? "bg-accent-blue/10 border-accent-blue text-accent-blue" : "bg-bg-card border-border text-text-secondary hover:border-border-focus"}`}>
            All ({spec.modules.length})
          </button>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-3 py-1.5 text-xs rounded-lg border transition-all cursor-pointer ${filter === cat ? "bg-accent-blue/10 border-accent-blue text-accent-blue" : "bg-bg-card border-border text-text-secondary hover:border-border-focus"}`}>
              <span style={{ color: CATEGORY_LABELS[cat]?.color }}>●</span> {CATEGORY_LABELS[cat]?.label}
            </button>
          ))}
        </div>

        {/* Compact grid */}
        {spec.modules.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-text-muted text-sm">Modules coming soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredModules.map((mod) => (
              <button
                key={mod.id}
                onClick={() => setSelectedModule(mod)}
                className="card p-4 text-left transition-all hover:translate-y-[-2px] hover:border-accent-blue/40 cursor-pointer group"
              >
                <span className="text-[9px] font-medium px-1.5 py-0.5 rounded" style={{ color: CATEGORY_LABELS[mod.category]?.color, background: CATEGORY_LABELS[mod.category]?.color + "15" }}>
                  {CATEGORY_LABELS[mod.category]?.label}
                </span>
                <h3 className="text-xs font-medium text-text-primary mt-2 mb-1 group-hover:text-accent-blue transition-colors line-clamp-2">
                  {mod.title}
                </h3>
                <p className="text-[9px] text-text-muted line-clamp-2">{mod.description}</p>
                <span className="text-[9px] text-text-muted mt-2 block">{mod.difficulty}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
