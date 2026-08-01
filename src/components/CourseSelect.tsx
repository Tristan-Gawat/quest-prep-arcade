"use client";

import { GameState, Screen } from "@/lib/state";
import { courses } from "@/data/courses";

interface CourseSelectProps {
  state: GameState;
  updateState: (updates: Partial<GameState>) => void;
  navigate: (screen: Screen) => void;
}

export default function CourseSelect({
  state,
  updateState,
  navigate,
}: CourseSelectProps) {
  const handleSelectCourse = (courseId: string) => {
    updateState({
      currentCourseId: courseId,
      currentModuleIndex: 0,
      currentScreen: "lesson",
    });
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <h2 className="text-lg md:text-xl text-arcade-yellow text-center mb-2">
          SELECT YOUR QUEST
        </h2>
        <p className="text-[9px] text-arcade-cyan text-center mb-8">
          CHOOSE A LANGUAGE TO MASTER
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => {
            const completed = course.modules.filter((m) =>
              state.completedModules.includes(m.id)
            ).length;
            const total = course.modules.length;
            const progress = total > 0 ? (completed / total) * 100 : 0;

            return (
              <button
                key={course.id}
                onClick={() => handleSelectCourse(course.id)}
                className="arcade-card p-6 text-left transition-transform hover:translate-y-[-4px] cursor-pointer"
                style={{ backgroundColor: course.color }}
              >
                <span className="text-3xl md:text-4xl block mb-4">
                  {course.icon}
                </span>
                <h3 className="text-xs md:text-sm text-black mb-2">
                  {course.name}
                </h3>
                <p className="text-[8px] text-black/70 mb-4">
                  {course.description}
                </p>

                {/* Progress bar */}
                <div className="w-full h-3 bg-black/20 border-2 border-black">
                  <div
                    className="h-full bg-black/40 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-[7px] text-black/60 mt-1">
                  {completed}/{total} MODULES
                </p>
              </button>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate("settings")}
            className="text-[9px] text-gray-400 hover:text-arcade-purple transition-colors cursor-pointer"
          >
            ⚙ SETTINGS & AI CONFIG
          </button>
        </div>
      </div>
    </div>
  );
}
