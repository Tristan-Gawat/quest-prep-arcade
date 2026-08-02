import { supabase, isSupabaseConfigured, DBProfile } from "./supabase";
import { RealtimeChannel } from "@supabase/supabase-js";

export interface DBMessage {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface ChatMessage extends DBMessage {
  sender_username: string;
  sender_avatar: string | null;
}

/**
 * Send a message from one user to another.
 */
export async function sendMessage(
  senderId: string,
  receiverId: string,
  content: string
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: false, error: "Supabase is not configured" };
  }

  if (!content.trim()) {
    return { success: false, error: "Message cannot be empty" };
  }

  const { error } = await supabase.from("messages").insert({
    sender_id: senderId,
    receiver_id: receiverId,
    content: content.trim(),
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Get conversation messages between two users, ordered by creation time.
 */
export async function getConversation(
  userId: string,
  friendId: string,
  limit: number = 50,
  offset: number = 0
): Promise<ChatMessage[]> {
  if (!isSupabaseConfigured) return [];

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .or(
      `and(sender_id.eq.${userId},receiver_id.eq.${friendId}),and(sender_id.eq.${friendId},receiver_id.eq.${userId})`
    )
    .order("created_at", { ascending: true })
    .range(offset, offset + limit - 1);

  if (error || !data) return [];

  // Fetch profiles for sender info
  const senderIds = [...new Set(data.map((m: DBMessage) => m.sender_id))];
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, username, avatar_url")
    .in("id", senderIds);

  const profileMap = new Map<string, { username: string; avatar_url: string | null }>();
  if (profiles) {
    for (const p of profiles) {
      profileMap.set(p.id, { username: p.username, avatar_url: p.avatar_url });
    }
  }

  return data.map((msg: DBMessage) => {
    const sender = profileMap.get(msg.sender_id);
    return {
      ...msg,
      sender_username: sender?.username || "Unknown",
      sender_avatar: sender?.avatar_url || null,
    };
  });
}

/**
 * Mark all messages from a sender to a receiver as read.
 */
export async function markMessagesAsRead(
  receiverId: string,
  senderId: string
): Promise<void> {
  if (!isSupabaseConfigured) return;

  await supabase
    .from("messages")
    .update({ is_read: true })
    .eq("receiver_id", receiverId)
    .eq("sender_id", senderId)
    .eq("is_read", false);
}

/**
 * Get unread message counts grouped by sender.
 */
export async function getUnreadCounts(
  userId: string
): Promise<Record<string, number>> {
  if (!isSupabaseConfigured) return {};

  const { data, error } = await supabase
    .from("messages")
    .select("sender_id")
    .eq("receiver_id", userId)
    .eq("is_read", false);

  if (error || !data) return {};

  const counts: Record<string, number> = {};
  for (const msg of data) {
    counts[msg.sender_id] = (counts[msg.sender_id] || 0) + 1;
  }
  return counts;
}

/**
 * Get conversation previews for all friends (last message + unread count).
 */
export async function getConversationPreviews(
  userId: string,
  friends: (DBProfile & { friendship_id: string })[]
): Promise<
  {
    friendId: string;
    username: string;
    avatar_url: string | null;
    lastMessage: string | null;
    lastMessageTime: string | null;
    unreadCount: number;
  }[]
> {
  if (!isSupabaseConfigured || friends.length === 0) return [];

  const unreadCounts = await getUnreadCounts(userId);
  const previews = [];

  for (const friend of friends) {
    // Get the last message between these two users
    const { data } = await supabase
      .from("messages")
      .select("content, created_at")
      .or(
        `and(sender_id.eq.${userId},receiver_id.eq.${friend.id}),and(sender_id.eq.${friend.id},receiver_id.eq.${userId})`
      )
      .order("created_at", { ascending: false })
      .limit(1);

    const lastMsg = data && data.length > 0 ? data[0] : null;

    previews.push({
      friendId: friend.id,
      username: friend.username,
      avatar_url: friend.avatar_url,
      lastMessage: lastMsg?.content || null,
      lastMessageTime: lastMsg?.created_at || null,
      unreadCount: unreadCounts[friend.id] || 0,
    });
  }

  // Sort by last message time (most recent first)
  previews.sort((a, b) => {
    if (!a.lastMessageTime && !b.lastMessageTime) return 0;
    if (!a.lastMessageTime) return 1;
    if (!b.lastMessageTime) return -1;
    return new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime();
  });

  return previews;
}

/**
 * Subscribe to real-time messages in a conversation.
 */
export function subscribeToMessages(
  userId: string,
  friendId: string,
  onNewMessage: (message: DBMessage) => void
): RealtimeChannel {
  const channel = supabase
    .channel(`chat:${userId}:${friendId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `sender_id=eq.${friendId}`,
      },
      (payload) => {
        const msg = payload.new as DBMessage;
        // Only process messages meant for this conversation
        if (msg.receiver_id === userId) {
          onNewMessage(msg);
        }
      }
    )
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `sender_id=eq.${userId}`,
      },
      (payload) => {
        const msg = payload.new as DBMessage;
        // Only process messages meant for this conversation
        if (msg.receiver_id === friendId) {
          onNewMessage(msg);
        }
      }
    )
    .subscribe();

  return channel;
}

/**
 * Unsubscribe from a real-time channel.
 */
export function unsubscribeFromMessages(channel: RealtimeChannel): void {
  supabase.removeChannel(channel);
}

/**
 * Format a timestamp for display in chat.
 */
export function formatMessageTime(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}
