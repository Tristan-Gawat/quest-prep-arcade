import { askBuiltinAI } from "./ai-builtin";

export interface GeneratedLesson {
  explanation: string;
  code: string;
  breakdown: string;
  together: string;
}

export async function generateFullLesson(
  topic: string,
  moduleName: string,
  langName: string,
  securityNote?: string
): Promise<GeneratedLesson> {
  const note = securityNote || "";

  // CALL 1: Overview (what is it, why it matters)
  const overviewResult = await askBuiltinAI(
    `Explain "${topic}" (part of "${moduleName}") for a beginner learning ${langName}. Write 2-3 clear paragraphs explaining: what it is, why it matters, and where it's used in real-world applications. Be thorough and beginner-friendly.${note}`,
    600
  );
  const explanation = overviewResult.success
    ? overviewResult.content.replace(/^OVERVIEW:\s*/i, "").trim()
    : `This lesson covers ${topic} as part of ${moduleName}.`;

  // CALL 2: Working code example
  const codeResult = await askBuiltinAI(
    `Write a COMPLETE, WORKING ${langName} code example (25-40 lines) that demonstrates "${topic}". Include comments explaining what key lines do. Output ONLY the raw code — no markdown backticks, no explanations before or after the code.`,
    800
  );
  let code = codeResult.success
    ? codeResult.content.trim()
    : `# ${topic}\n# ${langName} example\n# AI unavailable — try again`;
  // Clean any markdown code fences
  code = code.replace(/^```[\w]*\n?/, "").replace(/\n?```$/, "").trim();

  // CALL 3: Line-by-line breakdown of the code
  const breakdownResult = await askBuiltinAI(
    `You are explaining this ${langName} code about "${topic}" to a beginner. Go through it section by section:

${code}

For each section explain:
- What it does and WHY it's needed
- The meaning of each function, variable name, and keyword
- What would happen if you changed or removed it

Be detailed — cover every meaningful part.`,
    800
  );
  const breakdown = breakdownResult.success
    ? breakdownResult.content.replace(/^BREAKDOWN:\s*/i, "").trim()
    : "";

  // CALL 4: How it all works together
  const togetherResult = await askBuiltinAI(
    `Explain how a ${langName} program about "${topic}" works as a whole. Describe the complete execution flow from the first line to the last line. What does the program output and why? How do all the parts connect? Write 2-3 clear paragraphs.`,
    400
  );
  const together = togetherResult.success
    ? togetherResult.content.replace(/^TOGETHER:\s*/i, "").trim()
    : "";

  return { explanation, code, breakdown, together };
}
