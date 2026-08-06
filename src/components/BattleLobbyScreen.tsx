"use client";

import { useState, useEffect, useCallback } from "react";
import { GameState, Screen } from "@/lib/state";
import { getUserBattles, acceptBattle, declineBattle, getBattleHistory, createBattle } from "@/lib/battles";
import { DBCodeBattle } from "@/lib/supabase";
import { getFriends } from "@/lib/friends";

interface BattleLobbyScreenProps {
  state: GameState;
  navigate: (screen: Screen) => void;
  userId: string | null;
  setBattleId: (id: string) => void;
}

interface FriendInfo {
  id: string;
  username: string;
  avatar_url: string | null;
  friendship_id: string;
}

export default function BattleLobbyScreen({ state, navigate, userId, setBattleId }: BattleLobbyScreenProps) {
  const [activeBattles, setActiveBattles] = useState<DBCodeBattle[]>([]);
  const [battleHistory, setBattleHistory] = useState<DBCodeBattle[]>([]);
  const [friends, setFriends] = useState<FriendInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [showFriendPicker, setShowFriendPicker] = useState(false);
  const [friendsLoading, setFriendsLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadBattles = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const battles = await getUserBattles(userId);
      setActiveBattles(battles);
    } catch {
      setError("Failed to load battles");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const loadHistory = useCallback(async () => {
    if (!userId) return;
    setHistoryLoading(true);
    try {
      const history = await getBattleHistory(userId);
      setBattleHistory(history);
    } catch {
      setError("Failed to load battle history");
    } finally {
      setHistoryLoading(false);
    }
  }, [userId]);

  const loadFriends = useCallback(async () => {
    if (!userId) return;
    setFriendsLoading(true);
    try {
      const friendList = await getFriends(userId);
      setFriends(friendList.map(f => ({
        id: f.id,
        username: f.username,
        avatar_url: f.avatar_url,
        friendship_id: f.friendship_id,
      })));
    } catch {
      setError("Failed to load friends");
    } finally {
      setFriendsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      loadBattles();
      loadHistory();
    }
  }, [userId, loadBattles, loadHistory]);

  const handleAccept = async (battleId: string) => {
    setActionLoading(battleId);
    setError(null);
    const result = await acceptBattle(battleId);
    if (result.success) {
      setBattleId(battleId);
      navigate("code-battle");
    } else {
      setError(result.error || "Failed to accept battle");
    }
    setActionLoading(null);
  };

  const handleDecline = async (battleId: string) => {
    setActionLoading(battleId);
    setError(null);
    const result = await declineBattle(battleId);
    if (result.success) {
      await loadBattles();
    } else {
      setError(result.error || "Failed to decline battle");
    }
    setActionLoading(null);
  };

  const handleCancel = async (battleId: string) => {
    setActionLoading(battleId);
    setError(null);
    const result = await declineBattle(battleId);
    if (result.success) {
      await loadBattles();
    } else {
      setError(result.error || "Failed to cancel battle");
    }
    setActionLoading(null);
  };

  const handleJoinBattle = (battleId: string) => {
    setBattleId(battleId);
    navigate("code-battle");
  };

  const handleChallengeFriend = async (friendId: string) => {
    if (!userId) return;
    setActionLoading(friendId);
    setError(null);
    const result = await createBattle(userId, friendId);
    if (result.battle) {
      setShowFriendPicker(false);
      await loadBattles();
    } else {
      setError(result.error || "Failed to create battle");
    }
    setActionLoading(null);
  };

  const openFriendPicker = () => {
    setShowFriendPicker(true);
    loadFriends();
  };

  if (!userId) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center fade-in">
          <div className="text-5xl mb-6">⚔️</div>
          <h2 className="text-xl md:text-2xl font-semibold text-text-primary mb-3">
            Battle Lobby
          </h2>
          <p className="text-sm text-text-secondary mb-6">
            Sign in to battle your friends in real-time coding challenges!
          </p>
          <button onClick={() => navigate("start")} className="btn-primary text-sm px-8 py-3">
            Sign In to Battle
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="max-w-4xl mx-auto fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">⚔️</span>
            <h2 className="text-xl md:text-2xl font-semibold text-text-primary">
              Battle Lobby
            </h2>
          </div>
          <button onClick={() => navigate("course-select")} className="btn-secondary text-sm">
            ← Back
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="card p-3 mb-4 border border-accent-red/30 bg-accent-red/5">
            <p className="text-sm text-accent-red">{error}</p>
          </div>
        )}

        {/* Challenge a Friend Button */}
        <div className="mb-6">
          <button onClick={openFriendPicker} className="btn-primary text-sm px-6 py-2.5">
            🎯 Challenge a Friend
          </button>
        </div>

        {/* Friend Picker Dropdown */}
        {showFriendPicker && (
          <div className="card p-4 mb-6 border border-accent-blue/30">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-text-primary">Select a Friend to Challenge</h3>
              <button
                onClick={() => setShowFriendPicker(false)}
                className="text-text-muted hover:text-text-primary text-sm"
              >
                ✕
              </button>
            </div>
            {friendsLoading ? (
              <div className="flex items-center justify-center py-4">
                <span className="text-sm text-text-muted animate-pulse">Loading friends...</span>
              </div>
            ) : friends.length === 0 ? (
              <p className="text-sm text-text-muted py-2">
                No friends yet. Add friends to challenge them!
              </p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {friends.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-bg-elevated hover:bg-bg-input transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent-purple/20 flex items-center justify-center">
                        <span className="text-sm">
                          {friend.avatar_url ? "👤" : friend.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm text-text-primary font-medium">{friend.username}</span>
                    </div>
                    <button
                      onClick={() => handleChallengeFriend(friend.id)}
                      disabled={actionLoading === friend.id}
                      className="btn-primary text-xs px-4 py-1.5"
                    >
                      {actionLoading === friend.id ? "Sending..." : "⚔️ Challenge"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Active Challenges Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <span className="text-accent-yellow">🔥</span> Active Challenges
          </h3>
          {loading ? (
            <div className="card p-6 text-center">
              <span className="text-sm text-text-muted animate-pulse">Loading battles...</span>
            </div>
          ) : activeBattles.length === 0 ? (
            <div className="card p-6 text-center">
              <p className="text-sm text-text-muted">No active challenges. Challenge a friend to start!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeBattles.map((battle) => {
                const isChallenger = battle.challenger_id === userId;
                const isPending = battle.status === "pending";
                const isActive = battle.status === "active";

                return (
                  <div key={battle.id} className="card p-4 border-l-4 border-l-accent-blue">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-text-primary">
                            {battle.problem_title}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-accent-cyan/10 text-accent-cyan">
                            {battle.language}
                          </span>
                        </div>
                        <p className="text-xs text-text-muted">
                          {isPending && isChallenger && "Waiting for opponent..."}
                          {isPending && !isChallenger && "You've been challenged!"}
                          {isActive && "Battle in progress!"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {isPending && isChallenger && (
                          <button
                            onClick={() => handleCancel(battle.id)}
                            disabled={actionLoading === battle.id}
                            className="btn-secondary text-xs px-3 py-1.5"
                          >
                            {actionLoading === battle.id ? "..." : "Cancel"}
                          </button>
                        )}
                        {isPending && !isChallenger && (
                          <>
                            <button
                              onClick={() => handleAccept(battle.id)}
                              disabled={actionLoading === battle.id}
                              className="btn-success text-xs px-3 py-1.5"
                            >
                              {actionLoading === battle.id ? "..." : "Accept"}
                            </button>
                            <button
                              onClick={() => handleDecline(battle.id)}
                              disabled={actionLoading === battle.id}
                              className="btn-secondary text-xs px-3 py-1.5"
                            >
                              Decline
                            </button>
                          </>
                        )}
                        {isActive && (
                          <button
                            onClick={() => handleJoinBattle(battle.id)}
                            className="btn-primary text-xs px-4 py-1.5"
                          >
                            ⚡ Join Battle
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Battle History Section */}
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <span className="text-accent-purple">📜</span> Battle History
          </h3>
          {historyLoading ? (
            <div className="card p-6 text-center">
              <span className="text-sm text-text-muted animate-pulse">Loading history...</span>
            </div>
          ) : battleHistory.length === 0 ? (
            <div className="card p-6 text-center">
              <p className="text-sm text-text-muted">No completed battles yet. Start your first battle!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {battleHistory.map((battle) => {
                const won = battle.winner_id === userId;
                const isDraw = !battle.winner_id;

                return (
                  <div
                    key={battle.id}
                    className={`card p-4 border-l-4 ${
                      won ? "border-l-accent-green" : isDraw ? "border-l-accent-yellow" : "border-l-accent-red"
                    }`}
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-text-primary">
                            {battle.problem_title}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-accent-cyan/10 text-accent-cyan">
                            {battle.language}
                          </span>
                        </div>
                        <p className="text-xs text-text-muted">
                          {formatDate(battle.ended_at)}
                        </p>
                      </div>
                      <div>
                        {won && (
                          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent-green/10 text-accent-green">
                            🏆 Victory
                          </span>
                        )}
                        {isDraw && (
                          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent-yellow/10 text-accent-yellow">
                            🤝 Draw
                          </span>
                        )}
                        {!won && !isDraw && (
                          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent-red/10 text-accent-red">
                            💀 Defeat
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
