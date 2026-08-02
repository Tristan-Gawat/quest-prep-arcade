import {
  supabase,
  DBFriendship,
  DBProfile,
  isSupabaseConfigured,
} from "./supabase";

/**
 * Send a friend request from requester to addressee.
 */
export async function sendFriendRequest(
  requesterId: string,
  addresseeId: string
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: false, error: "Supabase is not configured" };
  }

  if (requesterId === addresseeId) {
    return { success: false, error: "You cannot send a friend request to yourself" };
  }

  // Check if a friendship already exists between these two users
  const { data: existing } = await supabase
    .from("friendships")
    .select("*")
    .or(
      `and(requester_id.eq.${requesterId},addressee_id.eq.${addresseeId}),and(requester_id.eq.${addresseeId},addressee_id.eq.${requesterId})`
    )
    .not("status", "eq", "rejected")
    .limit(1);

  if (existing && existing.length > 0) {
    const friendship = existing[0] as DBFriendship;
    if (friendship.status === "accepted") {
      return { success: false, error: "You are already friends with this user" };
    }
    if (friendship.status === "pending") {
      return { success: false, error: "A friend request already exists between you and this user" };
    }
    if (friendship.status === "blocked") {
      return { success: false, error: "Unable to send friend request" };
    }
  }

  const { error } = await supabase.from("friendships").insert({
    requester_id: requesterId,
    addressee_id: addresseeId,
    status: "pending",
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Accept a pending friend request.
 */
export async function acceptFriendRequest(
  friendshipId: string
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: false, error: "Supabase is not configured" };
  }

  const { error } = await supabase
    .from("friendships")
    .update({ status: "accepted", updated_at: new Date().toISOString() })
    .eq("id", friendshipId)
    .eq("status", "pending");

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Reject a pending friend request.
 */
export async function rejectFriendRequest(
  friendshipId: string
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: false, error: "Supabase is not configured" };
  }

  const { error } = await supabase
    .from("friendships")
    .update({ status: "rejected", updated_at: new Date().toISOString() })
    .eq("id", friendshipId)
    .eq("status", "pending");

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Remove a friend (delete the friendship row entirely).
 */
export async function removeFriend(
  friendshipId: string
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: false, error: "Supabase is not configured" };
  }

  const { error } = await supabase
    .from("friendships")
    .delete()
    .eq("id", friendshipId);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Get all accepted friends with their profile data.
 * Queries friendships where the user is either requester or addressee,
 * then fetches the OTHER person's profile.
 */
export async function getFriends(
  userId: string
): Promise<(DBProfile & { friendship_id: string })[]> {
  if (!isSupabaseConfigured) {
    return [];
  }

  // Get all accepted friendships involving this user
  const { data: friendships, error } = await supabase
    .from("friendships")
    .select("*")
    .eq("status", "accepted")
    .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`);

  if (error || !friendships) {
    return [];
  }

  // Determine the other user's ID for each friendship
  const friendIds = friendships.map((f: DBFriendship) => ({
    friendshipId: f.id,
    friendId: f.requester_id === userId ? f.addressee_id : f.requester_id,
  }));

  if (friendIds.length === 0) {
    return [];
  }

  // Fetch profiles for all friend IDs
  const { data: profiles, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .in(
      "id",
      friendIds.map((f) => f.friendId)
    );

  if (profileError || !profiles) {
    return [];
  }

  // Map profiles with their friendship IDs
  const profileMap = new Map<string, DBProfile>();
  for (const profile of profiles as DBProfile[]) {
    profileMap.set(profile.id, profile);
  }

  return friendIds
    .map(({ friendshipId, friendId }) => {
      const profile = profileMap.get(friendId);
      if (!profile) return null;
      return { ...profile, friendship_id: friendshipId };
    })
    .filter(Boolean) as (DBProfile & { friendship_id: string })[];
}

/**
 * Get pending incoming friend requests with requester profile data.
 */
export async function getPendingRequests(
  userId: string
): Promise<(DBProfile & { friendship_id: string })[]> {
  if (!isSupabaseConfigured) {
    return [];
  }

  // Get pending friendships where this user is the addressee
  const { data: friendships, error } = await supabase
    .from("friendships")
    .select("*")
    .eq("status", "pending")
    .eq("addressee_id", userId);

  if (error || !friendships) {
    return [];
  }

  if (friendships.length === 0) {
    return [];
  }

  const requesterIds = friendships.map((f: DBFriendship) => f.requester_id);

  // Fetch profiles for all requester IDs
  const { data: profiles, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .in("id", requesterIds);

  if (profileError || !profiles) {
    return [];
  }

  const profileMap = new Map<string, DBProfile>();
  for (const profile of profiles as DBProfile[]) {
    profileMap.set(profile.id, profile);
  }

  return friendships
    .map((f: DBFriendship) => {
      const profile = profileMap.get(f.requester_id);
      if (!profile) return null;
      return { ...profile, friendship_id: f.id };
    })
    .filter(Boolean) as (DBProfile & { friendship_id: string })[];
}

/**
 * Get pending outgoing friend requests with addressee profile data.
 */
export async function getSentRequests(
  userId: string
): Promise<(DBProfile & { friendship_id: string })[]> {
  if (!isSupabaseConfigured) {
    return [];
  }

  // Get pending friendships where this user is the requester
  const { data: friendships, error } = await supabase
    .from("friendships")
    .select("*")
    .eq("status", "pending")
    .eq("requester_id", userId);

  if (error || !friendships) {
    return [];
  }

  if (friendships.length === 0) {
    return [];
  }

  const addresseeIds = friendships.map((f: DBFriendship) => f.addressee_id);

  // Fetch profiles for all addressee IDs
  const { data: profiles, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .in("id", addresseeIds);

  if (profileError || !profiles) {
    return [];
  }

  const profileMap = new Map<string, DBProfile>();
  for (const profile of profiles as DBProfile[]) {
    profileMap.set(profile.id, profile);
  }

  return friendships
    .map((f: DBFriendship) => {
      const profile = profileMap.get(f.addressee_id);
      if (!profile) return null;
      return { ...profile, friendship_id: f.id };
    })
    .filter(Boolean) as (DBProfile & { friendship_id: string })[];
}

/**
 * Search users by username (for adding friends).
 * Uses ilike for case-insensitive partial matching.
 * Excludes the current user and limits results to 20.
 */
export async function searchUsers(
  query: string,
  currentUserId: string
): Promise<DBProfile[]> {
  if (!isSupabaseConfigured) {
    return [];
  }

  if (!query || query.trim().length === 0) {
    // Return random suggested users when no query
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .neq("id", currentUserId)
      .order("total_xp", { ascending: false })
      .limit(10);
    if (error || !data) return [];
    return data as DBProfile[];
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .ilike("username", `%${query}%`)
    .neq("id", currentUserId)
    .limit(20);

  if (error || !data) {
    return [];
  }

  return data as DBProfile[];
}

/**
 * Update the last_seen timestamp for a user (call periodically for online status).
 */
export async function updateLastSeen(userId: string): Promise<void> {
  if (!isSupabaseConfigured) {
    return;
  }

  await supabase
    .from("profiles")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", userId);
}

/**
 * Check if a user is "online" based on their last_seen timestamp.
 * A user is considered online if last_seen is within the last 5 minutes.
 */
export function isOnline(lastSeen: string | null): boolean {
  if (!lastSeen) {
    return false;
  }

  const lastSeenDate = new Date(lastSeen);
  const now = new Date();
  const fiveMinutesMs = 5 * 60 * 1000;

  return now.getTime() - lastSeenDate.getTime() < fiveMinutesMs;
}
