interface ExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  executionTime?: number;
}

// Map friendly language names to Piston language identifiers and versions
const LANGUAGE_MAP: Record<string, { language: string; version: string }> = {
  python: { language: "python", version: "3.10.0" },
  javascript: { language: "javascript", version: "18.15.0" },
  typescript: { language: "typescript", version: "5.0.3" },
  java: { language: "java", version: "15.0.2" },
  csharp: { language: "csharp", version: "6.12.0" },
  cpp: { language: "c++", version: "10.2.0" },
  c: { language: "c", version: "10.2.0" },
  ruby: { language: "ruby", version: "3.0.1" },
  go: { language: "go", version: "1.16.2" },
  rust: { language: "rust", version: "1.68.2" },
};

const PISTON_BASE_URL = "https://emkc.org/api/v2/piston";
const EXECUTION_TIMEOUT_MS = 15000;

// Execute code using Piston API
export async function executeCode(
  language: string,
  code: string
): Promise<ExecutionResult> {
  const langConfig = LANGUAGE_MAP[language.toLowerCase()];

  if (!langConfig) {
    return {
      success: false,
      output: "",
      error: `Unsupported language: ${language}. Supported: ${getSupportedLanguages().join(", ")}`,
    };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), EXECUTION_TIMEOUT_MS);

    const startTime = Date.now();

    const response = await fetch(`${PISTON_BASE_URL}/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: langConfig.language,
        version: langConfig.version,
        files: [{ content: code }],
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const executionTime = Date.now() - startTime;

    if (!response.ok) {
      return {
        success: false,
        output: "",
        error: `API error: ${response.status} ${response.statusText}`,
        executionTime,
      };
    }

    const data = await response.json();
    const run = data.run;

    if (!run) {
      return {
        success: false,
        output: "",
        error: "Invalid response from execution API",
        executionTime,
      };
    }

    const exitCode = run.code;
    const stdout = run.stdout || "";
    const stderr = run.stderr || "";

    return {
      success: exitCode === 0,
      output: stdout.trim(),
      error: stderr || undefined,
      executionTime,
    };
  } catch (err: unknown) {
    if (err instanceof Error && err.name === "AbortError") {
      return {
        success: false,
        output: "",
        error: "Execution timed out (15 second limit)",
      };
    }

    return {
      success: false,
      output: "",
      error: err instanceof Error ? err.message : "Unknown execution error",
    };
  }
}

// Get list of supported languages for battles
export function getSupportedLanguages(): string[] {
  return Object.keys(LANGUAGE_MAP);
}

// Get a random language from supported list
export function getRandomLanguage(): string {
  const languages = getSupportedLanguages();
  return languages[Math.floor(Math.random() * languages.length)];
}
