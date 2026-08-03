"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { GameState, Screen } from "@/lib/state";
import { getFriends } from "@/lib/friends";
import { DBProfile } from "@/lib/supabase";
import {
  sendMessage,
  getConversation,
  markMessagesAsRead,
  getUnreadCounts,
  subscribeToMessages,
  unsubscribeFromMessages,
  formatMessageTime,
  ChatMessage,
  DBMessage,
} from "@/lib/chat";
import { RealtimeChannel } from "@supabase/supabase-js";

interface ChatScreenProps {
  state: GameState;
  navigate: (screen: Screen) => void;
  userId: string | null;
}

export default function ChatScreen({ state, navigate, userId }: ChatScreenProps) {
  const [friends, setFriends] = useState<(DBProfile & { friendship_id: string })[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<(DBProfile & { friendship_id: string }) | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
  const [showFriendList, setShowFriendList] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);

  // Load friends list
  const loadFriends = useCallback(async () => {
    if (!userId) return;
    const data = await getFriends(userId);
    setFriends(data);
  }, [userId]);

  // Load unread counts
  const loadUnreadCounts = useCallback(async () => {
    if (!userId) return;
    const counts = await getUnreadCounts(userId);
    setUnreadCounts(counts);
  }, [userId]);

  useEffect(() => {
    loadFriends();
    loadUnreadCounts();
  }, [loadFriends, loadUnreadCounts]);

  // Load conversation when friend is selected
  const loadConversation = useCallback(async () => {
    if (!userId || !selectedFriend) return;
    setLoading(true);
    const msgs = await getConversation(userId, selectedFriend.id);
    setMessages(msgs);
    setLoading(false);

    // Mark messages as read
    await markMessagesAsRead(userId, selectedFriend.id);
    setUnreadCounts((prev) => ({ ...prev, [selectedFriend.id]: 0 }));
  }, [userId, selectedFriend]);

  useEffect(() => {
    loadConversation();
  }, [loadConversation]);

  // Subscribe to real-time messages
  useEffect(() => {
    if (!userId || !selectedFriend) return;

    // Unsubscribe from previous channel
    if (channelRef.current) {
      unsubscribeFromMessages(channelRef.current);
    }

    const channel = subscribeToMessages(userId, selectedFriend.id, (newMsg: DBMessage) => {
      const chatMsg: ChatMessage = {
        ...newMsg,
        sender_username: newMsg.sender_id === userId ? "You" : selectedFriend.username,
        sender_avatar: newMsg.sender_id === userId ? null : selectedFriend.avatar_url,
      };
      setMessages((prev) => [...prev, chatMsg]);

      // Mark as read if we received it
      if (newMsg.sender_id === selectedFriend.id) {
        markMessagesAsRead(userId, selectedFriend.id);
      }
    });

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        unsubscribeFromMessages(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [userId, selectedFriend]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!userId || !selectedFriend || !messageInput.trim() || sendingMessage) return;

    setSendingMessage(true);
    const { success } = await sendMessage(userId, selectedFriend.id, messageInput);
    if (success) {
      setMessageInput("");
    }
    setSendingMessage(false);
  };

  const handleSelectFriend = (friend: (DBProfile & { friendship_id: string })) => {
    setSelectedFriend(friend);
    setShowFriendList(false);
  };

  // Not signed in
  if (!userId) {
    return (
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-2xl mx-auto fade-in">
          <div className="card p-8 text-center">
            <div className="text-4xl mb-4">💬</div>
            <h2 className="text-lg font-semibold text-text-primary mb-2">Chat</h2>
            <p className="text-sm text-text-muted mb-6">Sign in to chat with friends</p>
            <button onClick={() => navigate("settings")} className="btn-primary text-sm">
              Go to Settings
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Friend list sidebar */}
      <div
        className={`${
          showFriendList ? "flex" : "hidden"
        } md:flex flex-col w-full md:w-72 lg:w-80 border-r border-border bg-bg-secondary/30 shrink-0`}
      >
        {/* Chat header */}
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">💬 Chat</h2>
          <p className="text-xs text-text-muted">{friends.length} friend{friends.length !== 1 ? "s" : ""}</p>
        </div>

        {/* Friend list */}
        <div className="flex-1 overflow-y-auto">
          {friends.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-sm text-text-muted mb-3">No friends yet</p>
              <button
                onClick={() => navigate("friends")}
                className="text-xs text-accent-blue hover:text-accent-blue/80 cursor-pointer"
              >
                Find friends →
              </button>
            </div>
          ) : (
            friends.map((friend) => (
              <button
                key={friend.id}
                onClick={() => handleSelectFriend(friend)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-all cursor-pointer border-b border-border/50 ${
                  selectedFriend?.id === friend.id
                    ? "bg-accent-blue/10 border-l-2 border-l-accent-blue"
                    : "hover:bg-bg-elevated"
                }`}
              >
                {/* Avatar */}
                {friend.avatar_url ? (
                  <img src={friend.avatar_url} alt="" className="w-10 h-10 rounded-full shrink-0" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-bg-elevated flex items-center justify-center text-sm text-text-secondary shrink-0">
                    {friend.username.charAt(0).toUpperCase()}
                  </div>
                )}

                {/* Info */}
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium text-text-primary truncate">{friend.username}</p>
                  <p className="text-xs text-text-muted truncate">Tap to chat</p>
                </div>

                {/* Unread badge */}
                {unreadCounts[friend.id] > 0 && (
                  <span className="w-5 h-5 rounded-full bg-accent-blue text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    {unreadCounts[friend.id] > 9 ? "9+" : unreadCounts[friend.id]}
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat area */}
      <div
        className={`${
          showFriendList ? "hidden" : "flex"
        } md:flex flex-col flex-1 min-w-0`}
      >
        {selectedFriend ? (
          <>
            {/* Chat header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-bg-secondary/30 shrink-0">
              {/* Back button (mobile) */}
              <button
                onClick={() => setShowFriendList(true)}
                className="md:hidden text-accent-blue text-sm cursor-pointer"
              >
                ← 
              </button>

              {selectedFriend.avatar_url ? (
                <img src={selectedFriend.avatar_url} alt="" className="w-8 h-8 rounded-full" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-bg-elevated flex items-center justify-center text-xs text-text-secondary">
                  {selectedFriend.username.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-text-primary">{selectedFriend.username}</p>
                <p className="text-[10px] text-text-muted">{selectedFriend.rank_tier} • {selectedFriend.total_xp.toLocaleString()} XP</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-sm text-accent-blue pulse-soft">Loading messages...</p>
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-3xl mb-2">👋</p>
                  <p className="text-sm text-text-muted">No messages yet. Say hello!</p>
                </div>
              ) : (
                messages.map((msg) => {
                  const isMine = msg.sender_id === userId;
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                          isMine
                            ? "bg-accent-blue text-white rounded-br-md"
                            : "bg-bg-elevated text-text-primary rounded-bl-md border border-border"
                        }`}
                      >
                        <p className="text-sm break-words">{msg.content}</p>
                        <div className={`flex items-center gap-1 mt-1 ${isMine ? "justify-end" : "justify-start"}`}>
                          <span className={`text-[10px] ${isMine ? "text-white/60" : "text-text-muted"}`}>
                            {formatMessageTime(msg.created_at)}
                          </span>
                          {isMine && (
                            <span className="text-[10px] text-white/60">
                              {msg.is_read ? "✓✓" : "✓"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message input */}
            <div className="shrink-0 border-t border-border bg-bg-secondary/30 p-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 bg-bg-input border border-border rounded-full px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!messageInput.trim() || sendingMessage}
                  className="btn-primary rounded-full w-10 h-10 flex items-center justify-center shrink-0 disabled:opacity-50"
                >
                  {sendingMessage ? "..." : "→"}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-4xl mb-3">💬</p>
              <p className="text-sm text-text-muted">Select a friend to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
