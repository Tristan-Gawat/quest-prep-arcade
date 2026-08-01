"use client";

import { courses } from "@/data/courses";

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center fade-in">
        <div className="mb-10">
          <h1 className="text-3xl md:text-5xl font-semibold text-text-primary mb-3 tracking-tight">
            CodeLapse
          </h1>
          <p className="text-sm md:text-base text-accent-purple font-medium">
            AI-Powered Learning Platform
          </p>
        </div>

        <div className="card p-8 md:p-10 mb-10">
          <p className="text-base md:text-lg text-accent-blue font-medium mb-8">
            Learn to code, level up your skills
          </p>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-8">
            {courses.slice(0, 9).map((course) => (
              <div key={course.id} className="text-center">
                <span className="text-2xl md:text-3xl block mb-2">{course.icon}</span>
                <span className="text-[10px] md:text-xs text-text-secondary">{course.name}</span>
              </div>
            ))}
          </div>
          <div className="space-y-3 text-sm text-text-secondary text-left max-w-md mx-auto">
            <p>✦ 9 programming languages with 50+ modules</p>
            <p>✦ Adaptive quizzes that level up with you</p>
            <p>✦ Hands-on code challenges with syntax highlighting</p>
            <p>✦ Ranked system: Rookie → Elite → Master → Grandmaster → Champion</p>
            <p>✦ Global & per-language leaderboards</p>
            <p>✦ AI tutor (bring your own key)</p>
          </div>
        </div>

        <button
          onClick={onStart}
          className="btn-primary text-base md:text-lg px-10 py-4 rounded-xl shadow-lg shadow-accent-blue/20 hover:shadow-accent-blue/30 transition-all"
        >
          Get Started
        </button>

        <p className="text-xs text-text-muted mt-8">
          SDG 4: Quality Education for All
        </p>
      </div>
    </div>
  );
}
