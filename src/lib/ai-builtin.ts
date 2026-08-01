// Built-in AI powered by Gemini (free for all users, no API key needed)
// Falls back to user's own key if they have one configured

export interface BuiltinAIResponse {
  content: string;
  success: boolean;
}

export async function askBuiltinAI(prompt: string, maxTokens = 500): Promise<BuiltinAIResponse> {
  try {
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, maxTokens }),
    });

    if (response.status === 429) {
      return { content: "Daily AI limit reached. Try again tomorrow!", success: false };
    }

    if (!response.ok) {
      return { content: "", success: false };
    }

    const data = await response.json();
    return { content: data.content || "", success: data.success || false };
  } catch {
    return { content: "", success: false };
  }
}

// Generate a lesson explanation
export async function builtinExplain(topic: string, language: string): Promise<string> {
  const result = await askBuiltinAI(
    `Explain this programming concept in 2-3 short paragraphs for a student learning ${language}: "${topic}". Include a brief code example.`,
    600
  );
  return result.success ? result.content : "";
}

// Review code from Arena
export async function builtinReviewCode(challenge: string, code: string, language: string): Promise<string> {
  const result = await askBuiltinAI(
    `Review this ${language} code for the challenge: "${challenge}"\n\nCode:\n\`\`\`\n${code}\n\`\`\`\n\nGive brief feedback: does it solve the challenge? Any improvements? Rate it out of 10. Keep response under 100 words.`,
    300
  );
  return result.success ? result.content : "";
}

// Generate a hint
export async function builtinHint(challenge: string, userCode: string): Promise<string> {
  const result = await askBuiltinAI(
    `A student is working on this coding challenge: "${challenge}". Their current code is:\n\`\`\`\n${userCode}\n\`\`\`\nGive them ONE short, helpful hint without giving away the answer. Be encouraging!`,
    150
  );
  return result.success ? result.content : "Try breaking the problem into smaller steps!";
}

// Generate a coding challenge for Arena
export async function builtinGenerateChallenge(): Promise<string> {
  const result = await askBuiltinAI(
    "Generate a short coding challenge for a student. Just give the task description in 1-2 sentences. Make it practical and fun. Don't include any code or solution.",
    100
  );
  return result.success ? result.content : "";
}

// Discover a new topic to teach
export async function builtinDiscoverTopic(language: string): Promise<string> {
  const result = await askBuiltinAI(
    `What's a useful ${language} concept, library, or technique that intermediate developers should know? Pick something practical and modern. Give just the topic name (2-5 words) and nothing else.`,
    50
  );
  return result.success ? result.content.replace(/['"]/g, "").trim().slice(0, 60) : "";
}
