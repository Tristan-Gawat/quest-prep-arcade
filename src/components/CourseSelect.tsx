"use client";

import { GameState, Screen } from "@/lib/state";
import { courses } from "@/data/courses";

interface CourseSelectProps {
  state: GameState;
  updateState: (updates: Partial<GameState>) => void;
  navigate: (screen: Screen) => void;
  userEmail?: string | null;
}

const UPHSL_PROGRAMS = [
  {
    id: "uphsl-gamedev",
    name: "Game Development",
    icon: "🎮",
    color: "#ff6eaa",
    description: "BITCF - Game Design, Unity, Unreal Engine",
  },
  {
    id: "uphsl-cybersec",
    name: "Cybersecurity & Forensics",
    icon: "🛡️",
    color: "#6ea8fe",
    description: "BITCF - Network Security, Ethical Hacking, Digital Forensics",
  },
  {
    id: "uphsl-compsci",
    name: "Computer Science (Data Science)",
    icon: "🧬",
    color: "#7dd3a0",
    description: "BSCS - Algorithms, ML, Data Analytics",
  },
  {
    id: "uphsl-multimedia",
    name: "Entertainment & Multimedia",
    icon: "🎬",
    color: "#ffd56b",
    description: "BSEMC - Animation, VFX, Digital Media Production",
  },
];

export default function CourseSelect({
  state,
  updateState,
  navigate,
  userEmail,
}: CourseSelectProps) {
  const isUPHSL = userEmail?.endsWith("@uphsl.edu.ph") || false;
  const handleSelectCourse = (courseId: string) => {
    updateState({
      currentCourseId: courseId,
      currentModuleIndex: 0,
      currentScreen: "lesson",
    });
  };

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto relative z-10">
      <div className="max-w-6xl mx-auto fade-in">

        {/* UPHSL Exclusive Section */}
        {isUPHSL && (
          <>
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-lg">🏫</span>
                <h2 className="text-lg md:text-xl font-bold text-text-primary" style={{ fontFamily: 'var(--font-display)' }}>
                  UPHSL College of Computer Studies
                </h2>
              </div>
              <p className="text-xs text-accent-purple">
                Exclusive content for @uphsl.edu.ph students
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
              {UPHSL_PROGRAMS.map((program) => (
                <button
                  key={program.id}
                  onClick={() => navigate("course-select")}
                  className="relative overflow-hidden rounded-xl p-5 text-left transition-all hover:translate-y-[-2px] cursor-pointer group border-2"
                  style={{ borderColor: program.color + "40", background: program.color + "08" }}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10" style={{ background: program.color, transform: "translate(30%, -30%)" }} />
                  <span className="text-2xl md:text-3xl block mb-3 group-hover:scale-110 transition-transform">
                    {program.icon}
                  </span>
                  <h3 className="text-xs md:text-sm font-semibold text-text-primary mb-1">
                    {program.name}
                  </h3>
                  <p className="text-[10px] text-text-muted line-clamp-2">
                    {program.description}
                  </p>
                  <span className="inline-block mt-3 text-[9px] font-medium px-2 py-0.5 rounded-full" style={{ color: program.color, background: program.color + "15" }}>
                    Coming Soon
                  </span>
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-text-muted">All Courses</span>
              <div className="flex-1 h-px bg-border" />
            </div>
          </>
        )}

        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            {isUPHSL ? "Programming Languages" : "Your Courses"}
          </h2>
          <p className="text-sm text-text-secondary">
            Choose a language to master — or let the AI teach you something new
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {courses.map((course) => {
            const dynamicModules = state.generatedModules[course.id] || [];
            const allModules = [...course.modules, ...dynamicModules];
            const completed = allModules.filter((m) =>
              state.completedModules.includes(m.id)
            ).length;
            const total = allModules.length;
            const progress = total > 0 ? Math.min((completed / total) * 100, 100) : 0;

            return (
              <button
                key={course.id}
                onClick={() => handleSelectCourse(course.id)}
                className="card p-4 text-left transition-all hover:translate-y-[-2px] hover:border-accent-blue/50 cursor-pointer group"
              >
                <span className="text-2xl md:text-3xl block mb-3 group-hover:scale-110 transition-transform">
                  {course.icon}
                </span>
                <h3 className="text-xs md:text-sm font-semibold text-text-primary mb-0.5">
                  {course.name}
                </h3>
                <p className="text-[10px] text-text-muted mb-3 line-clamp-1">
                  {course.description}
                </p>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-bg-elevated rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent-green rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1.5">
                  <p className="text-[10px] text-text-muted">
                    {completed}/{total}
                  </p>
                  {completed >= course.modules.length && completed > 0 && (
                    <p className="text-[10px] text-accent-purple font-medium">
                      ∞
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8">
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => navigate("learn-new")}
              className="btn-primary text-sm"
            >
              🧠 Learn Something New
            </button>
            <button
              onClick={() => navigate("arena")}
              className="btn-secondary text-sm"
            >
              ⚔️ Code Arena
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
