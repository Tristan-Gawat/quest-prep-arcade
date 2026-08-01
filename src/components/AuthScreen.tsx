"use client";

import { signInWithGoogle } from "@/lib/auth";

function AboutCreator() {
  // Auto-updates year level: started 1st year in 2026
  const startYear = 2026;
  const currentYear = new Date().getFullYear();
  const yearLevel = Math.min(Math.max(currentYear - startYear + 1, 1), 4);
  const suffix = yearLevel === 1 ? "1st" : yearLevel === 2 ? "2nd" : yearLevel === 3 ? "3rd" : "4th";

  return (
    <>
      <p className="text-[10px] text-text-muted leading-relaxed mb-2">
        Built by <span className="text-text-secondary font-medium">Tristan Gawat</span> — a {suffix} year BITCF student at <span className="text-text-secondary font-medium">UPHSL Philippines</span>.
      </p>
      <p className="text-[10px] text-text-muted leading-relaxed">
        Made with the help of <span className="text-text-secondary font-medium">Claude AI</span> (Anthropic) via <span className="text-text-secondary font-medium">Kiro</span> — an AI-powered development assistant. The entire codebase, curriculum, ranking system, and AI integration were designed and engineered collaboratively between human creativity and AI capability.
      </p>
    </>
  );
}

interface AuthScreenProps {
  onSkip: () => void;
}

export default function AuthScreen({ onSkip }: AuthScreenProps) {
  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center fade-in">
        <img src="/logo.svg" alt="CodeLapse" className="w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2" style={{ fontFamily: 'var(--font-display)' }}>
          CodeLapse
        </h1>
        <p className="text-sm text-accent-purple font-medium mb-10">
          AI-Powered Learning Platform
        </p>

        <div className="card p-8 mb-6">
          <p className="text-sm text-text-secondary mb-6">
            Sign in to save progress, earn ranks, and compete on leaderboards
          </p>

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-medium py-3 px-6 rounded-lg hover:bg-gray-100 transition-all cursor-pointer mb-4"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="border-t border-border mt-4 pt-4">
            <button
              onClick={onSkip}
              className="text-xs text-text-muted hover:text-text-secondary transition-colors cursor-pointer"
            >
              Skip for now (progress won&apos;t be saved online)
            </button>
          </div>
        </div>

        <p className="text-xs text-text-muted">
          Your rank is visible to other players on the leaderboard
        </p>

        <div className="card p-5 mt-6 text-left max-w-md mx-auto">
          <p className="text-xs font-medium text-accent-purple mb-2">Why CodeLapse?</p>
          <p className="text-xs text-text-muted leading-relaxed mb-4">
            I built CodeLapse because I believe everyone deserves access to quality coding education — for free. Whether you&apos;re a complete beginner or an experienced dev picking up a new language, this platform adapts to your level and grows with you. The AI learns new topics and teaches them back, so the curriculum never stops expanding. Learn at your own pace, compete on leaderboards, and join a community of coders leveling up together.
          </p>
          <div className="border-t border-border pt-3">
            <AboutCreator />
          </div>
        </div>
      </div>
    </div>
  );
}
