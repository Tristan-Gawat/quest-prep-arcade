"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { GameState, Screen } from "@/lib/state";
import { subscribeToBattle, submitBattleCode } from "@/lib/battles";
import { executeCode } from "@/lib/code-runner";
import { DBCodeBattle, supabase } from "@/lib/supabase";

interface CodeBattleScreenProps {
  state: GameState;
  navigate: (screen: Screen) => void;
  userId: string | null;
  battleId: string;
}

export default function CodeBattleScreen({ state, navigate, userId, battleId }: CodeBattleScreenProps) {
  const [battle, setBattle] = useState<DBCodeBattle | null>(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [outputMatches, setOutputMatches] = useState(false);
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [opponentStatus, setOpponentStatus] = useState<"coding" | "submitted">("coding");
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const subscriptionRef = useRef<{ unsubscribe: () => void } | null>(null);
  const hasAutoSubmitted = useRef(false);

  const isChallenger = battle?.challenger_id === userId;

  // Fetch the battle on mount
  useEffect(() => {
    async function fetchBattle() {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from("code_battles")
        .select("*")
        .eq("id", battleId)
        .single();

      if (fetchError || !data) {
        setError("Failed to load battle");
        setLoading(false);
        return;
      }

      const battleData = data as DBCodeBattle;
      setBattle(battleData);
      setCode(battleData.starter_code || "");

      // Check if user already submitted
      if (isUserSubmitted(battleData)) {
        setSubmitted(true);
      }

      // Check opponent status
      updateOpponentStatus(battleData);

      // If battle is already completed, show results
      if (battleData.status === "completed") {
        setShowResults(true);
      }

      setLoading(false);
    }

    fetchBattle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [battleId]);

  // Subscribe to real-time updates
  useEffect(() => {
    if (!battleId) return;

    subscriptionRef.current = subscribeToBattle(battleId, (updatedBattle) => {
      setBattle(updatedBattle);
      updateOpponentStatus(updatedBattle);

      if (updatedBattle.status === "completed") {
        setShowResults(true);
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }
    });

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [battleId]);

  // Timer countdown
  useEffect(() => {
    if (!battle?.started_at || !battle.time_limit_seconds) return;
    if (battle.status === "completed") return;

    const calculateRemaining = () => {
      const startedAt = new Date(battle.started_at!).getTime();
      const now = Date.now();
      const elapsed = Math.floor((now - startedAt) / 1000);
      const remaining = Math.max(0, battle.time_limit_seconds - elapsed);
      return remaining;
    };

    setTimeRemaining(calculateRemaining());

    timerRef.current = setInterval(() => {
      const remaining = calculateRemaining();
      setTimeRemaining(remaining);

      if (remaining <= 0 && !hasAutoSubmitted.current) {
        hasAutoSubmitted.current = true;
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        handleAutoSubmit();
      }
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [battle?.started_at, battle?.time_limit_seconds, battle?.status]);

  const isUserSubmitted = (b: DBCodeBattle): boolean => {
    if (!userId) return false;
    if (b.challenger_id === userId) return !!b.challenger_completed_at;
    if (b.opponent_id === userId) return !!b.opponent_completed_at;
    return false;
  };

  const updateOpponentStatus = (b: DBCodeBattle) => {
    if (!userId) return;
    const opponentCompletedAt = b.challenger_id === userId
      ? b.opponent_completed_at
      : b.challenger_completed_at;
    setOpponentStatus(opponentCompletedAt ? "submitted" : "coding");
  };

  const handleRunCode = async () => {
    if (!battle) return;
    setRunning(true);
    setError(null);
    setOutput(null);

    try {
      const result = await executeCode(battle.language, code);
      if (result.success) {
        setOutput(result.output);
        const matches = result.output.trim() === battle.expected_output.trim();
        setOutputMatches(matches);
      } else {
        setOutput(result.error || "Execution failed");
        setOutputMatches(false);
      }
    } catch {
      setOutput("An error occurred while running your code");
      setOutputMatches(false);
    } finally {
      setRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!battle || !userId || !output) return;
    setSubmitting(true);
    setError(null);

    try {
      const result = await submitBattleCode(battleId, userId, code, output);
      if (result.error) {
        setError(result.error);
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Failed to submit code");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAutoSubmit = useCallback(async () => {
    if (!battle || !userId || submitted) return;

    const currentOutput = output || "";
    setSubmitting(true);
    try {
      await submitBattleCode(battleId, userId, code, currentOutput);
      setSubmitted(true);
    } catch {
      // Time's up anyway
    } finally {
      setSubmitting(false);
    }
  }, [battle, userId, submitted, output, battleId, code]);

  const handleLeaveBattle = async () => {
    if (!battle || !userId) return;
    setSubmitting(true);
    try {
      await submitBattleCode(battleId, userId, "", "");
      setSubmitted(true);
      navigate("battle-lobby");
    } catch {
      setError("Failed to leave battle");
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getTimerColor = (): string => {
    if (timeRemaining === null) return "text-text-primary";
    if (timeRemaining <= 30) return "text-accent-red";
    if (timeRemaining <= 60) return "text-accent-yellow";
    return "text-accent-green";
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center fade-in">
          <div className="text-4xl mb-4 animate-pulse">⚔️</div>
          <p className="text-sm text-text-muted">Loading battle...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (!battle) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center fade-in">
          <div className="text-4xl mb-4">❌</div>
          <p className="text-sm text-accent-red mb-4">{error || "Battle not found"}</p>
          <button onClick={() => navigate("battle-lobby")} className="btn-secondary text-sm">
            ← Back to Lobby
          </button>
        </div>
      </div>
    );
  }

  // Results Overlay
  if (showResults && battle.status === "completed") {
    const won = battle.winner_id === userId;
    const isDraw = !battle.winner_id;

    const challengerTime = battle.challenger_completed_at && battle.started_at
      ? Math.round((new Date(battle.challenger_completed_at).getTime() - new Date(battle.started_at).getTime()) / 1000)
      : null;
    const opponentTime = battle.opponent_completed_at && battle.started_at
      ? Math.round((new Date(battle.opponent_completed_at).getTime() - new Date(battle.started_at).getTime()) / 1000)
      : null;

    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center fade-in">
          <div className="card p-8 border-2 border-accent-purple/30">
            <div className="text-5xl mb-4">
              {won ? "🏆" : isDraw ? "🤝" : "💀"}
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              {won ? "Victory!" : isDraw ? "Draw!" : "Defeat!"}
            </h2>
            <p className="text-sm text-text-secondary mb-6">
              {won
                ? "Congratulations! You won the battle!"
                : isDraw
                ? "Neither player solved it correctly."
                : "Better luck next time!"}
            </p>

            {/* XP Earned */}
            <div className="mb-6">
              <span className="text-xs text-text-muted">XP Earned</span>
              <p className="text-lg font-bold text-accent-yellow">
                +{won ? 100 : isDraw ? 25 : 10} XP
              </p>
            </div>

            {/* Times */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-bg-elevated rounded-lg p-3">
                <p className="text-xs text-text-muted mb-1">
                  {isChallenger ? "Your Time" : "Challenger"}
                </p>
                <p className="text-sm font-medium text-text-primary">
                  {challengerTime !== null ? formatTime(challengerTime) : "DNF"}
                </p>
              </div>
              <div className="bg-bg-elevated rounded-lg p-3">
                <p className="text-xs text-text-muted mb-1">
                  {!isChallenger ? "Your Time" : "Opponent"}
                </p>
                <p className="text-sm font-medium text-text-primary">
                  {opponentTime !== null ? formatTime(opponentTime) : "DNF"}
                </p>
              </div>
            </div>

            {/* Problem info */}
            <div className="mb-6 text-left bg-bg-elevated rounded-lg p-3">
              <p className="text-xs text-text-muted">Problem</p>
              <p className="text-sm text-text-primary font-medium">{battle.problem_title}</p>
              <p className="text-xs text-accent-cyan mt-1">{battle.language}</p>
            </div>

            <button
              onClick={() => navigate("battle-lobby")}
              className="btn-primary text-sm px-8 py-2.5 w-full"
            >
              Back to Lobby
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Battle UI
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Top Bar with Timer and Status */}
      <div className="bg-bg-elevated border-b border-border px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Timer */}
          <div className="flex items-center gap-3">
            <span className="text-lg">⏱️</span>
            <span className={`text-2xl font-mono font-bold ${getTimerColor()}`}>
              {timeRemaining !== null ? formatTime(timeRemaining) : "--:--"}
            </span>
            {timeRemaining !== null && timeRemaining <= 30 && (
              <span className="text-xs text-accent-red animate-pulse font-medium">
                HURRY!
              </span>
            )}
          </div>

          {/* Opponent Status */}
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
              opponentStatus === "submitted"
                ? "bg-accent-green/10 text-accent-green"
                : "bg-accent-yellow/10 text-accent-yellow"
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                opponentStatus === "submitted" ? "bg-accent-green" : "bg-accent-yellow animate-pulse"
              }`} />
              {opponentStatus === "submitted" ? "Opponent submitted!" : "Opponent is coding..."}
            </div>

            {/* Leave Battle */}
            <button
              onClick={handleLeaveBattle}
              disabled={submitting || submitted}
              className="text-xs text-accent-red hover:text-accent-red/80 transition-colors px-2 py-1"
            >
              ✕ Leave
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Split Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Panel - Problem */}
        <div className="md:w-1/2 p-4 md:p-6 overflow-y-auto border-b md:border-b-0 md:border-r border-border">
          <div className="max-w-lg">
            {/* Problem Header */}
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-semibold text-text-primary">{battle.problem_title}</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-accent-cyan/10 text-accent-cyan font-medium">
                {battle.language}
              </span>
            </div>

            {/* Problem Description */}
            <div className="card p-4 mb-4 border-l-4 border-l-accent-purple">
              <p className="text-sm text-text-secondary leading-relaxed">
                {battle.problem_description}
              </p>
            </div>

            {/* Expected Output */}
            <div className="mb-4">
              <h4 className="text-xs font-medium text-text-muted mb-2 uppercase tracking-wide">
                Expected Output
              </h4>
              <div className="bg-[#1a1a2e] rounded-lg p-3 border border-border">
                <pre className="text-xs text-accent-green font-mono whitespace-pre-wrap">
                  {battle.expected_output}
                </pre>
              </div>
            </div>

            {/* Submitted status */}
            {submitted && (
              <div className="card p-4 border-l-4 border-l-accent-green">
                <p className="text-sm text-accent-green font-medium">
                  ✅ Code submitted! Waiting for opponent...
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Editor */}
        <div className="md:w-1/2 flex flex-col p-4 md:p-6 overflow-hidden">
          {/* Editor Header */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-accent-cyan font-medium">
              Your Solution ({battle.language})
            </span>
            <span className="text-xs text-text-muted">
              {code.split("\n").length} lines
            </span>
          </div>

          {/* Code Editor */}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={submitted}
            spellCheck={false}
            className="w-full h-64 md:h-80 bg-[#1a1a2e] text-green-400 font-mono text-sm p-4 rounded-lg border border-border resize-none outline-none focus:border-accent-blue"
            placeholder={`// Write your ${battle.language} solution here...`}
          />

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-3">
            <button
              onClick={handleRunCode}
              disabled={running || submitted || !code.trim()}
              className="btn-primary text-xs px-5 py-2"
            >
              {running ? "⏳ Running..." : "▶ Run Code"}
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting || submitted || !outputMatches}
              className="btn-success text-xs px-5 py-2"
            >
              {submitting ? "Submitting..." : submitted ? "✅ Submitted" : "🚀 Submit"}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-3 p-2 rounded-lg bg-accent-red/5 border border-accent-red/20">
              <p className="text-xs text-accent-red">{error}</p>
            </div>
          )}

          {/* Output Panel */}
          {output !== null && (
            <div className={`mt-3 rounded-lg border p-3 flex-shrink-0 ${
              outputMatches
                ? "border-accent-green/40 bg-accent-green/5"
                : "border-accent-red/40 bg-accent-red/5"
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-medium ${
                  outputMatches ? "text-accent-green" : "text-accent-red"
                }`}>
                  {outputMatches ? "✅ Output matches!" : "❌ Output does not match"}
                </span>
              </div>
              <pre className="text-xs font-mono text-text-secondary whitespace-pre-wrap max-h-32 overflow-y-auto">
                {output}
              </pre>
            </div>
          )}

          {/* Time's up message */}
          {timeRemaining === 0 && !submitted && (
            <div className="mt-3 p-3 rounded-lg bg-accent-red/10 border border-accent-red/30">
              <p className="text-sm text-accent-red font-medium">⏰ Time&apos;s up!</p>
              <p className="text-xs text-text-muted mt-1">Your code has been auto-submitted.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
