export interface AIResponse {
  content: string;
  success: boolean;
}

export async function askAI(
  prompt: string,
  apiKey: string,
  provider: "openai" | "anthropic"
): Promise<AIResponse> {
  try {
    if (provider === "openai") {
      return await callOpenAI(prompt, apiKey);
    } else {
      return await callAnthropic(prompt, apiKey);
    }
  } catch {
    return {
      content: "AI unavailable. Using built-in content.",
      success: false,
    };
  }
}

async function callOpenAI(
  prompt: string,
  apiKey: string
): Promise<AIResponse> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a friendly programming tutor in a retro arcade game. Keep explanations short, clear, and encouraging. Use code examples when helpful. Respond in a playful but educational tone.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  if (!res.ok) throw new Error(`OpenAI API error: ${res.status}`);
  const data = await res.json();
  return {
    content: data.choices[0].message.content,
    success: true,
  };
}

async function callAnthropic(
  prompt: string,
  apiKey: string
): Promise<AIResponse> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 500,
      system:
        "You are a friendly programming tutor in a retro arcade game. Keep explanations short, clear, and encouraging. Use code examples when helpful. Respond in a playful but educational tone.",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) throw new Error(`Anthropic API error: ${res.status}`);
  const data = await res.json();
  return {
    content: data.content[0].text,
    success: true,
  };
}

export async function generateExplanation(
  topic: string,
  concept: string,
  apiKey: string,
  provider: "openai" | "anthropic"
): Promise<string> {
  const prompt = `Explain this programming concept in 2-3 short paragraphs for a student learning ${topic}: "${concept}". Include a brief code example if relevant. Keep it arcade/game-themed and fun!`;
  const result = await askAI(prompt, apiKey, provider);
  return result.success ? result.content : "";
}

export async function generateHint(
  challenge: string,
  userCode: string,
  apiKey: string,
  provider: "openai" | "anthropic"
): Promise<string> {
  const prompt = `A student is working on this coding challenge: "${challenge}". Their current code is:\n\`\`\`\n${userCode}\n\`\`\`\nGive them ONE short, helpful hint without giving away the answer. Be encouraging!`;
  const result = await askAI(prompt, apiKey, provider);
  return result.success
    ? result.content
    : "Try breaking the problem into smaller steps!";
}

export async function generateDynamicQuestion(
  topic: string,
  tier: string,
  apiKey: string,
  provider: "openai" | "anthropic"
): Promise<{
  question: string;
  choices: string[];
  correct: number;
  explanation: string;
} | null> {
  const prompt = `Generate a ${tier} difficulty multiple-choice question about ${topic} programming. Format your response as JSON only with these fields: question (string), choices (array of 4 strings), correct (index 0-3 of correct answer), explanation (brief explanation of the answer). Return ONLY valid JSON, no markdown.`;
  const result = await askAI(prompt, apiKey, provider);
  if (!result.success) return null;
  try {
    return JSON.parse(result.content);
  } catch {
    return null;
  }
}
