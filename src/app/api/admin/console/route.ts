import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

const DEVELOPER_EMAILS = [
  "tjgawat0113@gmail.com",
  "tristangawatschool@gmail.com",
  "c1-241-00124@uphsl.edu.ph",
  "giegajames13@gmail.com",
];

async function verifyDeveloper(request: NextRequest): Promise<boolean> {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;

  const token = authHeader.replace("Bearer ", "");
  const supabase = createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "");
  const { data: { user } } = await supabase.auth.getUser(token);

  return !!(user?.email && DEVELOPER_EMAILS.includes(user.email.toLowerCase()));
}

export async function POST(request: NextRequest) {
  const isDev = await verifyDeveloper(request);
  if (!isDev) return NextResponse.json({ error: "Developer access only" }, { status: 403 });

  const { command, type } = await request.json();

  if (!command || typeof command !== "string") {
    return NextResponse.json({ error: "No command provided" }, { status: 400 });
  }

  // TYPE: "ai" — Ask AI to do something (generate modules, explain, etc.)
  if (type === "ai") {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-goog-api-key": GEMINI_API_KEY },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `You are the CodeLapse admin AI assistant. Execute this developer command:\n\n${command}\n\nRespond with what you did or the result.` }] }],
          generationConfig: { maxOutputTokens: 2000, temperature: 0.7 },
        }),
      }
    );

    if (!response.ok) return NextResponse.json({ error: "AI unavailable" }, { status: 502 });
    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    return NextResponse.json({ result: content, type: "ai" });
  }

  // TYPE: "db" — Execute database operations
  if (type === "db") {
    // Validate env vars
    if (!supabaseUrl) {
      return NextResponse.json({ result: "❌ Error: NEXT_PUBLIC_SUPABASE_URL is not configured.", type: "db" });
    }
    if (!serviceRoleKey) {
      return NextResponse.json({ result: "❌ Error: SUPABASE_SERVICE_ROLE_KEY is not configured.\nAdd it in Vercel → Settings → Environment Variables.\nGet it from Supabase Dashboard → Settings → API → service_role (secret).", type: "db" });
    }

    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Parse common commands
    const cmd = command.toLowerCase().trim();

    if (cmd.startsWith("count users")) {
      const { count, error } = await admin.from("profiles").select("*", { count: "exact", head: true });
      if (error) return NextResponse.json({ result: `❌ Error: ${error.message}\nCode: ${error.code}\nHint: ${error.hint || "none"}`, type: "db" });
      return NextResponse.json({ result: `Total users: ${count}`, type: "db" });
    }

    if (cmd.startsWith("top users")) {
      const { data, error } = await admin.from("profiles").select("username, total_xp, rank_tier").order("total_xp", { ascending: false }).limit(10);
      if (error) return NextResponse.json({ result: `❌ Error: ${error.message}`, type: "db" });
      if (!data || data.length === 0) return NextResponse.json({ result: "No users found.", type: "db" });
      const formatted = data.map((u, i) => `${i + 1}. ${u.username} — ${u.total_xp.toLocaleString()} XP (${u.rank_tier})`).join("\n");
      return NextResponse.json({ result: formatted, type: "db" });
    }

    if (cmd.startsWith("stats")) {
      const { count: userCount, error: userError } = await admin.from("profiles").select("*", { count: "exact", head: true });
      const { count: moduleCount, error: modError } = await admin.from("community_modules").select("*", { count: "exact", head: true });
      
      if (userError || modError) {
        return NextResponse.json({
          result: `❌ Database query error:\nUsers: ${userError ? userError.message : userCount}\nModules: ${modError ? modError.message : moduleCount}\n\nCheck that SUPABASE_SERVICE_ROLE_KEY matches the key in Supabase Dashboard → Settings → API.`,
          type: "db",
        });
      }

      return NextResponse.json({
        result: `📊 Site Statistics\n━━━━━━━━━━━━━━━━\nUsers: ${userCount}\nCommunity modules: ${moduleCount}`,
        type: "db",
      });
    }

    if (cmd.startsWith("set role")) {
      // set role <email> <role>
      const parts = command.split(" ");
      const email = parts[2];
      const role = parts[3];
      if (!email || !role) return NextResponse.json({ result: "Usage: set role <email> <role>", type: "db" });

      const { data: { users }, error: listError } = await admin.auth.admin.listUsers();
      if (listError) return NextResponse.json({ result: `❌ Error listing users: ${listError.message}`, type: "db" });
      
      const user = users?.find((u) => u.email === email);
      if (!user) return NextResponse.json({ result: `❌ User ${email} not found.\nMake sure they've signed in at least once.`, type: "db" });

      const { error } = await admin.from("profiles").update({ role }).eq("id", user.id);
      if (error) return NextResponse.json({ result: `❌ Error updating role: ${error.message}`, type: "db" });
      return NextResponse.json({ result: `✅ Set ${email} role to ${role}`, type: "db" });
    }

    if (cmd.startsWith("generate modules")) {
      // generate modules <language> <count>
      const parts = command.split(" ");
      const lang = parts[2] || "python";
      const count = parseInt(parts[3]) || 3;

      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-goog-api-key": GEMINI_API_KEY },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `Generate ${count} new lesson topic titles for ${lang} programming. Return ONLY a JSON array of strings. Example: ["Topic 1", "Topic 2"]` }] }],
            generationConfig: { maxOutputTokens: 500 },
          }),
        }
      );
      const aiData = await response.json();
      const topics = aiData.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
      return NextResponse.json({ result: `Generated topics for ${lang}:\n${topics}`, type: "db" });
    }

    return NextResponse.json({ result: `Unknown command: "${command}"\n\nAvailable commands:\n- count users\n- top users\n- stats\n- set role <email> <role>\n- generate modules <language> <count>`, type: "db" });
  }

  return NextResponse.json({ error: "Specify type: 'ai' or 'db'" }, { status: 400 });
}
