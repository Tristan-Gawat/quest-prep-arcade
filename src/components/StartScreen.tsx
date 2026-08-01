"use client";

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center">
        <div className="mb-8">
          <h1 className="text-2xl md:text-4xl text-arcade-yellow mb-4 leading-relaxed drop-shadow-[4px_4px_0px_#000]">
            QUEST PREP
            <br />
            ARCADE
          </h1>
          <p className="text-[9px] md:text-[10px] text-arcade-purple mb-2">
            AI-POWERED LEARNING PLATFORM
          </p>
        </div>

        <div className="arcade-card bg-arcade-card p-6 md:p-8 mb-8">
          <p className="text-[10px] md:text-xs text-arcade-cyan mb-6">
            LEARN TO CODE LIKE A BOSS
          </p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <span className="text-2xl md:text-3xl block mb-2">🐍</span>
              <span className="text-[8px] text-gray-400">PYTHON</span>
            </div>
            <div className="text-center">
              <span className="text-2xl md:text-3xl block mb-2">⚡</span>
              <span className="text-[8px] text-gray-400">JAVASCRIPT</span>
            </div>
            <div className="text-center">
              <span className="text-2xl md:text-3xl block mb-2">🎨</span>
              <span className="text-[8px] text-gray-400">HTML/CSS</span>
            </div>
          </div>
          <div className="space-y-2 text-[8px] md:text-[9px] text-gray-300 text-left">
            <p>▸ INTERACTIVE LESSONS & CODE EXAMPLES</p>
            <p>▸ ADAPTIVE QUIZZES THAT LEVEL UP WITH YOU</p>
            <p>▸ HANDS-ON CODE CHALLENGES</p>
            <p>▸ AI TUTOR (BRING YOUR OWN KEY)</p>
          </div>
        </div>

        <button
          onClick={onStart}
          className="arcade-card bg-arcade-yellow px-8 py-5 text-sm md:text-base text-black hover:bg-yellow-300 transition-colors cursor-pointer pulse-glow"
        >
          INSERT COIN TO START
        </button>

        <p className="text-[7px] text-gray-500 mt-6">
          SDG 4: QUALITY EDUCATION FOR ALL
        </p>
      </div>
    </div>
  );
}
