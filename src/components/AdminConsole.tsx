"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminConsole() {
  const [command, setCommand] = useState("");
  const [mode, setMode] = useState<"ai" | "db">("db");
  const [history, setHistory] = useState<{ cmd: string; result: string; type: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const executeCommand = async () => {
    if (!command.trim()) return;
    setLoading(true);

    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    try {
      const response = await fetch("/api/admin/console", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ command: command.trim(), type: mode }),
      });

      const data = await response.json();
      setHistory((prev) => [
        { cmd: command, result: data.result || data.error || "No response", type: mode },
        ...prev,
      ]);
    } catch (err) {
      setHistory((prev) => [
        { cmd: command, result: "Error: Failed to execute command", type: "error" },
        ...prev,
      ]);
    }

    setCommand("");
    setLoading(false);
  };

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto relative z-10">
      <div className="max-w-4xl mx-auto fade-in">
        <h2 className="text-xl font-bold text-text-primary mb-2" style={{ fontFamily: "var(--font-display)" }}>
          🖥️ Developer Console
        </h2>
        <p className="text-xs text-text-muted mb-6">Execute commands to manage CodeLapse</p>

        {/* Mode toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setMode("db")}
            className={`px-3 py-1.5 text-xs rounded-lg border cursor-pointer transition-all ${mode === "db" ? "bg-accent-green/10 border-accent-green text-accent-green" : "bg-bg-card border-border text-text-secondary"}`}
          >
            🗄️ Database Commands
          </button>
          <button
            onClick={() => setMode("ai")}
            className={`px-3 py-1.5 text-xs rounded-lg border cursor-pointer transition-all ${mode === "ai" ? "bg-accent-purple/10 border-accent-purple text-accent-purple" : "bg-bg-card border-border text-text-secondary"}`}
          >
            🤖 AI Assistant
          </button>
        </div>

        {/* Command input */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && executeCommand()}
            placeholder={mode === "db" ? "count users, top users, stats, set role <email> <role>..." : "Ask the AI to do anything..."}
            className="flex-1 bg-bg-input border border-border rounded-lg text-sm text-text-primary p-3 outline-none focus:border-border-focus font-mono"
          />
          <button
            onClick={executeCommand}
            disabled={loading || !command.trim()}
            className="btn-primary text-sm px-4 shrink-0"
          >
            {loading ? "..." : "Run"}
          </button>
        </div>

        {/* Help */}
        {mode === "db" && (
          <div className="card p-4 mb-6 text-xs text-text-muted">
            <p className="font-medium text-text-secondary mb-2">Available commands:</p>
            <ul className="space-y-1">
              <li><code className="text-accent-green">count users</code> — total registered users</li>
              <li><code className="text-accent-green">top users</code> — top 10 by XP</li>
              <li><code className="text-accent-green">stats</code> — site statistics</li>
              <li><code className="text-accent-green">set role &lt;email&gt; &lt;role&gt;</code> — change user role (player/mod/developer)</li>
              <li><code className="text-accent-green">generate modules &lt;language&gt; &lt;count&gt;</code> — AI generates new topic ideas</li>
            </ul>
          </div>
        )}

        {/* History */}
        <div className="space-y-3">
          {history.map((entry, i) => (
            <div key={i} className="card p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] text-accent-cyan font-mono">&gt;</span>
                <span className="text-xs text-text-primary font-mono">{entry.cmd}</span>
                <span className="text-[9px] text-text-muted ml-auto">{entry.type}</span>
              </div>
              <pre className="text-xs text-text-secondary whitespace-pre-wrap font-mono leading-relaxed">
                {entry.result}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
