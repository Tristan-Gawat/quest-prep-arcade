"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface UserEntry {
  id: string;
  username: string;
  email: string;
  avatar_url: string | null;
  role: string;
  rank_tier: string;
  rank_division: number;
  total_xp: number;
  modules_completed: number;
  created_at: string;
}

export default function AdminUsers({ callerRole }: { callerRole?: string }) {
  const [users, setUsers] = useState<UserEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    const response = await fetch("/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const data = await response.json();
      setUsers(data.users || []);
    }
    setLoading(false);
  };

  const changeRole = async (userId: string, newRole: string) => {
    setActionLoading(userId);
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ action: "change-role", userId, newRole }),
    });

    await loadUsers();
    setActionLoading(null);
  };

  const deleteUser = async (userId: string) => {
    setActionLoading(userId);
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ action: "delete-user", userId }),
    });

    setConfirmDelete(null);
    await loadUsers();
    setActionLoading(null);
  };

  const ROLE_COLORS: Record<string, string> = {
    developer: "#00ffaa",
    mod: "#ffd56b",
    player: "#9aa0a6",
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-accent-blue text-sm pulse-soft">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto relative z-10">
      <div className="max-w-5xl mx-auto fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-text-primary" style={{ fontFamily: "var(--font-display)" }}>
              👥 User Management
            </h2>
            <p className="text-xs text-text-muted">{users.length} registered users</p>
          </div>
          <button onClick={loadUsers} className="btn-secondary text-xs">🔄 Refresh</button>
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users by name or email..."
            className="w-full bg-bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue transition-colors"
          />
        </div>

        {/* User table */}
        <div className="space-y-2">
          {users
            .filter(u => 
              !searchQuery.trim() || 
              u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
              u.email.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((user) => (
            <div key={user.id} className="card p-4 flex items-center gap-4 flex-wrap">
              {/* Avatar + info */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt="" className="w-9 h-9 rounded-full shrink-0" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-bg-elevated flex items-center justify-center text-xs text-text-muted shrink-0">
                    {user.username?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{user.username}</p>
                  <p className="text-[10px] text-text-muted truncate">{user.email}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-xs text-text-muted shrink-0">
                <span>{user.total_xp.toLocaleString()} XP</span>
                <span>{user.modules_completed} modules</span>
              </div>

              {/* Role badge */}
              <span
                className="text-[10px] font-medium px-2 py-1 rounded-full shrink-0"
                style={{ color: ROLE_COLORS[user.role] || "#9aa0a6", background: (ROLE_COLORS[user.role] || "#9aa0a6") + "15" }}
              >
                {user.role.toUpperCase()}
              </span>

              {/* Actions */}
              <div className="flex gap-2 shrink-0">
                <select
                  value={user.role}
                  onChange={(e) => changeRole(user.id, e.target.value)}
                  disabled={actionLoading === user.id}
                  className="bg-bg-input border border-border rounded text-[10px] text-text-primary p-1 cursor-pointer"
                >
                  <option value="player">Player</option>
                  <option value="mod">Mod</option>
                  {callerRole === "developer" && <option value="developer">Developer</option>}
                </select>

                {confirmDelete === user.id ? (
                  <div className="flex gap-1">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="px-2 py-1 text-[10px] rounded bg-accent-red text-white cursor-pointer"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setConfirmDelete(null)}
                      className="px-2 py-1 text-[10px] rounded bg-bg-elevated text-text-muted cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDelete(user.id)}
                    disabled={actionLoading === user.id}
                    className="px-2 py-1 text-[10px] rounded bg-accent-red/10 text-accent-red hover:bg-accent-red/20 cursor-pointer transition-all"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
