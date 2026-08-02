"use client";

import { useEffect, useState, useCallback } from "react";
import { GameState, Screen } from "@/lib/state";
import {
  getFriends,
  getPendingRequests,
  getSentRequests,
  searchUsers,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
  isOnline,
} from "@/lib/friends";
import { createBattle } from "@/lib/battles";
import { DBProfile } from "@/lib/supabase";

interface FriendsScreenProps {
  state: GameState;
  navigate: (screen: Screen) => void;
  userId: string | null;
}

type Tab = "friends" | "requests" | "find";

export default function FriendsScreen({ state, navigate, userId }: FriendsScreenProps) {
  const [activeTab, setActiveTab] = useState<Tab>("friends");
  const [friends, setFriends] = useState<(DBProfile & { friendship_id: string })[]>([]);
  const [incomingRequests, setIncomingRequests] = useState<(DBProfile & { friendship_id: string })[]>([]);
  const [sentRequests, setSentRequests] = useState<(DBProfile & { friendship_id: string })[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<DBProfile[]>([]);
  const [loadingFriends, setLoadingFriends] = useState(false);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const loadFriends = useCallback(async () => {
    if (!userId) return;
    setLoadingFriends(true);
    const data = await getFriends(userId);
    setFriends(data);
    setLoadingFriends(false);
  }, [userId]);

  const loadRequests = useCallback(async () => {
    if (!userId) return;
    setLoadingRequests(true);
    const [incoming, sent] = await Promise.all([
      getPendingRequests(userId),
      getSentRequests(userId),
    ]);
    setIncomingRequests(incoming);
    setSentRequests(sent);
    setLoadingRequests(false);
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    if (activeTab === "friends") {
      loadFriends();
    } else if (activeTab === "requests") {
      loadRequests();
    }
  }, [activeTab, userId, loadFriends, loadRequests]);

  // Debounced search
  useEffect(() => {
    if (!userId || activeTab !== "find") return;

    setLoadingSearch(true);
    const timer = setTimeout(async () => {
      const results = await searchUsers(searchQuery, userId);
      setSearchResults(results);
      setLoadingSearch(false);
    }, searchQuery.trim() ? 500 : 0);

    return () => clearTimeout(timer);
  }, [searchQuery, userId, activeTab]);

  const showMessage = (type: "error" | "success", message: string) => {
    if (type === "error") {
      setActionError(message);
      setTimeout(() => setActionError(null), 3000);
    } else {
      setActionSuccess(message);
      setTimeout(() => setActionSuccess(null), 3000);
    }
  };

  const handleChallenge = async (friendId: string) => {
    if (!userId) return;
    const { battle, error } = await createBattle(userId, friendId);
    if (error) {
      showMessage("error", error);
    } else if (battle) {
      showMessage("success", "Battle challenge sent!");
    }
  };

  const handleRemoveFriend = async (friendshipId: string) => {
    const { success, error } = await removeFriend(friendshipId);
    if (success) {
      showMessage("success", "Friend removed");
      loadFriends();
    } else {
      showMessage("error", error || "Failed to remove friend");
    }
  };

  const handleAcceptRequest = async (friendshipId: string) => {
    const { success, error } = await acceptFriendRequest(friendshipId);
    if (success) {
      showMessage("success", "Friend request accepted!");
      loadRequests();
    } else {
      showMessage("error", error || "Failed to accept request");
    }
  };

  const handleRejectRequest = async (friendshipId: string) => {
    const { success, error } = await rejectFriendRequest(friendshipId);
    if (success) {
      showMessage("success", "Friend request rejected");
      loadRequests();
    } else {
      showMessage("error", error || "Failed to reject request");
    }
  };

  const handleSendRequest = async (addresseeId: string) => {
    if (!userId) return;
    const { success, error } = await sendFriendRequest(userId, addresseeId);
    if (success) {
      showMessage("success", "Friend request sent!");
      setSearchResults((prev) => prev.filter((u) => u.id !== addresseeId));
    } else {
      showMessage("error", error || "Failed to send request");
    }
  };

  // Not signed in state
  if (!userId) {
    return (
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-2xl mx-auto fade-in">
          <div className="card p-8 text-center">
            <div className="text-4xl mb-4">👥</div>
            <h2 className="text-lg font-semibold text-text-primary mb-2">Friends</h2>
            <p className="text-sm text-text-muted mb-6">Sign in to add friends</p>
            <button
              onClick={() => navigate("settings")}
              className="btn-primary text-sm"
            >
              Go to Settings
            </button>
          </div>
          <div className="text-center mt-6">
            <button onClick={() => navigate("course-select")} className="btn-secondary text-sm">
              ← Back to Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto">
      <div className="max-w-2xl mx-auto fade-in">
        {/* Header */}
        <h2 className="text-xl md:text-2xl font-semibold text-text-primary text-center mb-2">
          Friends
        </h2>
        <p className="text-sm text-text-secondary text-center mb-6">
          {friends.length} friend{friends.length !== 1 ? "s" : ""}
        </p>

        {/* Status Messages */}
        {actionError && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
            {actionError}
          </div>
        )}
        {actionSuccess && (
          <div className="mb-4 p-3 rounded-lg bg-accent-green/10 border border-accent-green/30 text-accent-green text-sm text-center">
            {actionSuccess}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(["friends", "requests", "find"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-2 text-xs font-medium rounded-full border transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-accent-blue/10 border-accent-blue text-accent-blue"
                  : "bg-bg-card border-border text-text-secondary hover:border-border-focus"
              }`}
            >
              {tab === "friends" && "👥 Friends"}
              {tab === "requests" && "📬 Requests"}
              {tab === "find" && "🔍 Find"}
            </button>
          ))}
        </div>

        {/* Friends Tab */}
        {activeTab === "friends" && (
          <div>
            {loadingFriends ? (
              <div className="text-center py-12">
                <p className="text-sm text-accent-blue pulse-soft">Loading friends...</p>
              </div>
            ) : friends.length === 0 ? (
              <div className="card p-8 text-center">
                <p className="text-sm text-text-muted">No friends yet. Find players to add!</p>
                <button
                  onClick={() => setActiveTab("find")}
                  className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-accent-blue hover:text-accent-blue/80 cursor-pointer bg-bg-card border border-border rounded-lg px-3 py-1.5 hover:bg-bg-elevated transition-all"
                >
                  🔍 Find Friends
                </button>
              </div>
            ) : (
              <div className="card overflow-hidden divide-y divide-border">
                {friends.map((friend) => (
                  <div key={friend.id} className="flex items-center gap-3 px-4 py-3">
                    {/* Avatar */}
                    <div className="relative">
                      {friend.avatar_url ? (
                        <img src={friend.avatar_url} alt="" className="w-10 h-10 rounded-full" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-bg-elevated flex items-center justify-center text-sm text-text-secondary">
                          {friend.username.charAt(0).toUpperCase()}
                        </div>
                      )}
                      {/* Online indicator */}
                      {isOnline(friend.updated_at) && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-bg-card" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate">
                        {friend.username}
                      </p>
                      <p className="text-xs text-text-muted">
                        {isOnline(friend.updated_at) ? "Online" : "Offline"}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleChallenge(friend.id)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-accent-blue hover:text-accent-blue/80 cursor-pointer bg-bg-card border border-border rounded-lg px-3 py-1.5 hover:bg-bg-elevated transition-all"
                      >
                        ⚔️ Challenge
                      </button>
                      <button
                        onClick={() => handleRemoveFriend(friend.friendship_id)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-red-400 hover:text-red-300 cursor-pointer bg-bg-card border border-border rounded-lg px-3 py-1.5 hover:bg-bg-elevated transition-all"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === "requests" && (
          <div className="space-y-6">
            {loadingRequests ? (
              <div className="text-center py-12">
                <p className="text-sm text-accent-blue pulse-soft">Loading requests...</p>
              </div>
            ) : (
              <>
                {/* Incoming Requests */}
                <div>
                  <h3 className="text-sm font-medium text-text-secondary mb-3">
                    Incoming Requests ({incomingRequests.length})
                  </h3>
                  {incomingRequests.length === 0 ? (
                    <div className="card p-6 text-center">
                      <p className="text-sm text-text-muted">No pending requests</p>
                    </div>
                  ) : (
                    <div className="card overflow-hidden divide-y divide-border">
                      {incomingRequests.map((request) => (
                        <div key={request.id} className="flex items-center gap-3 px-4 py-3">
                          {request.avatar_url ? (
                            <img src={request.avatar_url} alt="" className="w-10 h-10 rounded-full" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-bg-elevated flex items-center justify-center text-sm text-text-secondary">
                              {request.username.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-text-primary truncate">
                              {request.username}
                            </p>
                            <p className="text-xs text-text-muted">
                              Wants to be your friend
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleAcceptRequest(request.friendship_id)}
                              className="inline-flex items-center gap-1 text-xs font-medium text-accent-green hover:text-accent-green/80 cursor-pointer bg-bg-card border border-border rounded-lg px-3 py-1.5 hover:bg-bg-elevated transition-all"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleRejectRequest(request.friendship_id)}
                              className="inline-flex items-center gap-1 text-xs font-medium text-red-400 hover:text-red-300 cursor-pointer bg-bg-card border border-border rounded-lg px-3 py-1.5 hover:bg-bg-elevated transition-all"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sent Requests */}
                <div>
                  <h3 className="text-sm font-medium text-text-secondary mb-3">
                    Sent ({sentRequests.length})
                  </h3>
                  {sentRequests.length === 0 ? (
                    <div className="card p-6 text-center">
                      <p className="text-sm text-text-muted">No sent requests</p>
                    </div>
                  ) : (
                    <div className="card overflow-hidden divide-y divide-border">
                      {sentRequests.map((request) => (
                        <div key={request.id} className="flex items-center gap-3 px-4 py-3">
                          {request.avatar_url ? (
                            <img src={request.avatar_url} alt="" className="w-10 h-10 rounded-full" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-bg-elevated flex items-center justify-center text-sm text-text-secondary">
                              {request.username.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-text-primary truncate">
                              {request.username}
                            </p>
                            <p className="text-xs text-text-muted">Pending...</p>
                          </div>
                          <span className="text-xs text-text-muted italic">Awaiting response</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Find Tab */}
        {activeTab === "find" && (
          <div>
            {/* Search Input */}
            <div className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by username..."
                className="w-full bg-bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue transition-colors"
              />
            </div>

            {/* Search Results */}
            {loadingSearch ? (
              <div className="text-center py-12">
                <p className="text-sm text-accent-blue pulse-soft">Searching...</p>
              </div>
            ) : searchQuery.trim() && searchResults.length === 0 ? (
              <div className="card p-8 text-center">
                <p className="text-sm text-text-muted">No users found matching &quot;{searchQuery}&quot;</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="card overflow-hidden divide-y divide-border">
                {searchResults.map((user) => (
                  <div key={user.id} className="flex items-center gap-3 px-4 py-3">
                    {user.avatar_url ? (
                      <img src={user.avatar_url} alt="" className="w-10 h-10 rounded-full" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-bg-elevated flex items-center justify-center text-sm text-text-secondary">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate">
                        {user.username}
                      </p>
                      <p className="text-xs text-text-muted">
                        {user.total_xp.toLocaleString()} XP
                      </p>
                    </div>
                    <button
                      onClick={() => handleSendRequest(user.id)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-accent-green hover:text-accent-green/80 cursor-pointer bg-bg-card border border-border rounded-lg px-3 py-1.5 hover:bg-bg-elevated transition-all"
                    >
                      + Add Friend
                    </button>
                  </div>
                ))}
              </div>
            ) : !searchQuery.trim() && searchResults.length > 0 ? (
              <div>
                <h3 className="text-sm font-medium text-text-secondary mb-3">Suggested Players</h3>
                <div className="card overflow-hidden divide-y divide-border">
                  {searchResults.map((user) => (
                    <div key={user.id} className="flex items-center gap-3 px-4 py-3">
                      {user.avatar_url ? (
                        <img src={user.avatar_url} alt="" className="w-10 h-10 rounded-full" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-bg-elevated flex items-center justify-center text-sm text-text-secondary">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-primary truncate">
                          {user.username}
                        </p>
                        <p className="text-xs text-text-muted">
                          {user.total_xp.toLocaleString()} XP
                        </p>
                      </div>
                      <button
                        onClick={() => handleSendRequest(user.id)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-accent-green hover:text-accent-green/80 cursor-pointer bg-bg-card border border-border rounded-lg px-3 py-1.5 hover:bg-bg-elevated transition-all"
                      >
                        + Add Friend
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : !searchQuery.trim() ? (
              <div className="card p-8 text-center">
                <p className="text-sm text-text-muted pulse-soft">Loading suggested players...</p>
              </div>
            ) : null}
          </div>
        )}

        {/* Back button */}
        <div className="text-center mt-6">
          <button onClick={() => navigate("course-select")} className="btn-secondary text-sm">
            ← Back to Courses
          </button>
        </div>
      </div>
    </div>
  );
}
