"use client";

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center fade-in">
        <div className="mb-10">
          <h1 className="text-3xl md:text-5xl font-semibold text-text-primary mb-3 tracking-tight">
            Quest Prep
          </h1>
          <p className="text-sm md:text-base text-accent-purple font-medium">
            AI-Powered Learning Platform
          </p>
        </div>

        <div className="card p-8 md:p-10 mb-10">
          <p className="text-base md:text-lg text-accent-blue font-medium mb-8">
            Learn to code, level up your skills
          </p>
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <span className="text-3xl md:text-4xl block mb-3">🐍</span>
              <span className="text-xs text-text-secondary">Python</span>
            </div>
            <div className="text-center">
              <span className="text-3xl md:text-4xl block mb-3">⚡</span>
              <span className="text-xs text-text-secondary">JavaScript</span>
            </div>
            <div className="text-center">
              <span className="text-3xl md:text-4xl block mb-3">🎨</span>
              <span className="text-xs text-text-secondary">HTML/CSS</span>
            </div>
          </div>
          <div className="space-y-3 text-sm text-text-secondary text-left max-w-md mx-auto">
            <p>✦ Interactive lessons & code examples</p>
            <p>✦ Adaptive quizzes that level up with you</p>
            <p>✦ Hands-on code challenges</p>
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
