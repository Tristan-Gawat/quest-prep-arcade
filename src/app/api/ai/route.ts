import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent";

// Rate limiting: simple in-memory store (resets on redeploy)
const rateLimits = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS_PER_DAY = 30;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimits.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimits.set(ip, { count: 1, resetAt: now + 86400000 }); // 24 hours
    return true;
  }

  if (entry.count >= MAX_REQUESTS_PER_DAY) {
    return false;
  }

  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "AI not configured", content: "" },
      { status: 503 }
    );
  }

  // Rate limit by IP
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Try again tomorrow!", content: "" },
      { status: 429 }
    );
  }

  try {
    const { prompt, maxTokens } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Invalid prompt", content: "" }, { status: 400 });
    }

    // Call Gemini API
    const response = await fetch(`${GEMINI_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are a friendly programming tutor in a coding learning app called CodeLapse. Keep explanations clear, concise, and encouraging. Use code examples when helpful. Respond in a helpful but brief tone.\n\nUser request: ${prompt}`,
              },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: maxTokens || 500,
          temperature: 0.7,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini API error:", errorData);
      return NextResponse.json(
        { error: "AI service error", content: "" },
        { status: 502 }
      );
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return NextResponse.json({ content, success: true });
  } catch (error) {
    console.error("AI route error:", error);
    return NextResponse.json(
      { error: "Internal error", content: "" },
      { status: 500 }
    );
  }
}
