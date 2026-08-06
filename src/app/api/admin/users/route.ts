import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const DEVELOPER_EMAILS = [
  "tjgawat0113@gmail.com",
  "tristangawatschool@gmail.com",
  "c1-241-00124@uphsl.edu.ph",
  "giegajames13@gmail.com",
];

function getAdminClient() {
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

// Verify the caller is a developer or mod
async function verifyAdmin(request: NextRequest): Promise<{ authorized: boolean; role: string; email: string }> {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return { authorized: false, role: "", email: "" };

  const token = authHeader.replace("Bearer ", "");
  const supabase = createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "");
  const { data: { user } } = await supabase.auth.getUser(token);

  if (!user?.email) return { authorized: false, role: "", email: "" };

  const email = user.email.toLowerCase();
  const isDev = DEVELOPER_EMAILS.includes(email);

  if (isDev) return { authorized: true, role: "developer", email };

  // Check if mod in database
  const admin = getAdminClient();
  const { data: profile } = await admin.from("profiles").select("role").eq("id", user.id).single();

  if (profile?.role === "mod" || profile?.role === "developer") {
    return { authorized: true, role: profile.role, email };
  }

  return { authorized: false, role: "player", email };
}

// GET: List all users
export async function GET(request: NextRequest) {
  const { authorized } = await verifyAdmin(request);
  if (!authorized) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const admin = getAdminClient();
  const { data: profiles } = await admin
    .from("profiles")
    .select("id, username, avatar_url, role, rank_tier, rank_division, total_xp, modules_completed, created_at")
    .order("created_at", { ascending: false });

  // Get emails from auth.users
  const { data: { users } } = await admin.auth.admin.listUsers();
  const emailMap: Record<string, string> = {};
  users?.forEach((u) => { if (u.email) emailMap[u.id] = u.email; });

  const usersWithEmail = (profiles || []).map((p) => ({
    ...p,
    email: emailMap[p.id] || "unknown",
  }));

  return NextResponse.json({ users: usersWithEmail });
}

// POST: Manage users (change role, delete)
export async function POST(request: NextRequest) {
  const { authorized, role: callerRole } = await verifyAdmin(request);
  if (!authorized) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const { action, userId, newRole } = await request.json();
  const admin = getAdminClient();

  if (action === "change-role") {
    // Only developers can assign developer role
    if (newRole === "developer" && callerRole !== "developer") {
      return NextResponse.json({ error: "Only developers can assign developer role" }, { status: 403 });
    }
    if (!["player", "mod", "developer"].includes(newRole)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const { error } = await admin.from("profiles").update({ role: newRole }).eq("id", userId);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true, message: `Role changed to ${newRole}` });
  }

  if (action === "delete-user") {
    // Delete from auth (cascades to profiles via FK)
    const { error } = await admin.auth.admin.deleteUser(userId);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true, message: "User deleted and reset" });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
