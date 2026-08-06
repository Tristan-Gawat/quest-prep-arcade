"use client";

import { useState, useEffect } from "react";
import { GameState, Screen } from "@/lib/state";
import { courses } from "@/data/courses";
import { fetchCommunityModules } from "@/lib/curriculum-engine";
import { Module } from "@/data/curriculum";

interface LearnNewScreenProps {
  state: GameState;
  updateState: (updates: Partial<GameState>) => void;
  navigate: (screen: Screen) => void;
  userId: string | null;
}

export default function LearnNewScreen({ state, updateState, navigate, userId }: LearnNewScreenProps) {
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedModule, setGeneratedModule] = useState<Module | null>(null);
  const [recentModules, setRecentModules] = useState<Module[]>([]);
  const [loadingRecent, setLoadingRecent] = useState(true);
  const [mode, setMode] = useState<"request" | "discover">("discover");

  useEffect(() => {
    loadRecentModules();
  }, []);

  async function loadRecentModules() {
    const modules = await fetchCommunityModules();
    setRecentModules(modules);
    setLoadingRecent(false);
  }

  async function handleGenerate() {
    if (!selectedLang) return;
    setGenerating(true);
    setGeneratedModule(null);

    // Use built-in AI (free for all users)
    const { askBuiltinAI } = await import("@/lib/ai-builtin");

    // Discover or use provided topic
    let topicToUse = mode === "request" && topic.trim() ? topic.trim() : null;

    if (!topicToUse) {
      const { builtinDiscoverTopic } = await import("@/lib/ai-builtin");
      topicToUse = await builtinDiscoverTopic(selectedLang);
    }

    if (!topicToUse) {
      topicToUse = "useful programming patterns";
    }

    // Generate the module via built-in AI
    const langName = selectedLang === "htmlcss" ? "HTML/CSS" : selectedLang === "csharp" ? "C#" : selectedLang;
    const codeLang = selectedLang === "htmlcss" ? "html" : selectedLang === "tailwind" ? "css" : selectedLang;

    const result = await askBuiltinAI(
      `Create a programming lesson about "${topicToUse}" for ${langName}. Return ONLY valid JSON (no markdown) with this structure:
{"title":"${topicToUse}","lesson":{"title":"${topicToUse}","concept":"One sentence","explanation":"2-3 sentences","codeExample":"code with \\n for newlines","language":"${codeLang}"},"quiz":[{"question":"q","choices":["a","b","c","d"],"correct":1,"explanation":"why"}],"challenge":{"title":"Practice","description":"task","starterCode":"// start\\n","expectedOutput":"output","hints":["h1","h2","h3"],"solution":"solution code","language":"${codeLang}"}}`,
      1000
    );

    if (result.success) {
      try {
        const data = JSON.parse(result.content);
        const moduleId = `${selectedLang}-ai-${Date.now()}`;
        const newModule = {
          id: moduleId,
          title: data.title || topicToUse,
          tier: "MEDIUM" as const,
          lesson: data.lesson,
          quiz: Array.isArray(data.quiz) ? data.quiz : [data.quiz],
          challenge: data.challenge,
        };
        setGeneratedModule(newModule);

        const existing = state.generatedModules[selectedLang] || [];
        updateState({
          generatedModules: {
            ...state.generatedModules,
            [selectedLang]: [...existing, newModule],
          },
          totalModulesGenerated: state.totalModulesGenerated + 1,
        });
      } catch {
        // JSON parse failed
      }
    }
    setGenerating(false);
  }

  function handleStartModule() {
    if (!generatedModule || !selectedLang) return;
    const course = courses.find(c => c.id === selectedLang);
    if (!course) return;

    const allModules = [...course.modules, ...(state.generatedModules[selectedLang] || [])];
    const moduleIndex = allModules.findIndex(m => m.id === generatedModule.id);

    if (moduleIndex !== -1) {
      updateState({
        currentCourseId: selectedLang,
        currentModuleIndex: moduleIndex,
        currentScreen: "lesson",
      });
    }
  }

  // AI is built-in and free for all users
  const hasAI = true;

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="max-w-3xl mx-auto fade-in">
        <h2 className="text-xl font-semibold text-text-primary mb-2">🧠 AI Learning Engine</h2>
        <p className="text-sm text-text-secondary mb-6">
          The AI discovers new topics, learns them, and creates lessons for you in real-time.
        </p>

        {/* Mode Toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setMode("discover")}
            className={`px-4 py-2 text-sm rounded-lg border transition-all cursor-pointer ${
              mode === "discover"
                ? "bg-accent-purple/10 border-accent-purple text-accent-purple"
                : "bg-bg-card border-border text-text-secondary hover:border-border-focus"
            }`}
          >
            🔮 AI Discovers
          </button>
          <button
            onClick={() => setMode("request")}
            className={`px-4 py-2 text-sm rounded-lg border transition-all cursor-pointer ${
              mode === "request"
                ? "bg-accent-blue/10 border-accent-blue text-accent-blue"
                : "bg-bg-card border-border text-text-secondary hover:border-border-focus"
            }`}
          >
            💬 I Want to Learn...
          </button>
        </div>

        {/* Language Selection */}
        <div className="mb-6">
          <p className="text-xs text-text-secondary mb-3">Pick a language:</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {courses.map((course) => (
              <button
                key={course.id}
                onClick={() => setSelectedLang(course.id)}
                className={`card p-2 text-center transition-all cursor-pointer text-xs ${
                  selectedLang === course.id ? "border-accent-blue bg-accent-blue/5" : ""
                }`}
              >
                <span className="text-lg block">{course.icon}</span>
                <span className="text-[10px] text-text-muted">{course.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Topic Input (for request mode) */}
        {mode === "request" && (
          <div className="mb-6">
            <label className="text-xs text-text-secondary block mb-2">What do you want to learn?</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., React hooks, async generators, WebSocket..."
              className="w-full bg-bg-input border border-border rounded-lg text-sm text-text-primary p-3 outline-none focus:border-border-focus transition-all"
            />
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!selectedLang || generating}
          className="btn-primary text-sm px-6 py-3 mb-6"
        >
          {generating
            ? "🧠 AI is learning & creating..."
            : mode === "discover"
            ? "🔮 Discover & Generate New Lesson"
            : "💬 Generate Lesson on This Topic"}
        </button>

        {/* Generated Module Result */}
        {generatedModule && (
          <div className="card p-5 mb-6 border-l-4 border-l-accent-green fade-in">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-accent-green font-medium mb-1">✅ New Module Created!</p>
                <h3 className="text-sm font-semibold text-text-primary">{generatedModule.title}</h3>
              </div>
              <span className="text-xs bg-bg-elevated text-text-secondary px-2 py-1 rounded">
                {generatedModule.tier}
              </span>
            </div>
            <p className="text-xs text-text-secondary mb-4">{generatedModule.lesson.concept}</p>
            <button onClick={handleStartModule} className="btn-success text-sm px-5 py-2">
              ▶ Start This Lesson
            </button>
          </div>
        )}

        {/* Recently Generated Modules */}
        <div className="mt-8">
          <h3 className="text-sm font-medium text-text-primary mb-3">
            📚 Recently Generated by AI ({recentModules.length})
          </h3>
          {loadingRecent ? (
            <p className="text-xs text-text-muted pulse-soft">Loading...</p>
          ) : recentModules.length === 0 ? (
            <p className="text-xs text-text-muted">No community modules yet. Generate the first one!</p>
          ) : (
            <div className="space-y-2">
              {recentModules.slice(0, 10).map((mod) => (
                <div key={mod.id} className="card p-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-primary">{mod.title}</p>
                    <p className="text-xs text-text-muted">{mod.tier} • {mod.lesson.language}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Back */}
        <div className="mt-6">
          <button onClick={() => navigate("course-select")} className="btn-secondary text-sm">
            ← Back to Courses
          </button>
        </div>
      </div>
    </div>
  );
}
