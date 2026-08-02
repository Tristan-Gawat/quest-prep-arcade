import { supabase, DBCodeBattle, isSupabaseConfigured } from "./supabase";
import { getSupportedLanguages, getRandomLanguage } from "./code-runner";

// Battle problems - a collection of coding challenges
interface BattleProblem {
  title: string;
  description: string;
  expectedOutput: string;
  starterCode: Record<string, string>; // language -> starter code
  difficulty: "easy" | "medium" | "hard";
}

// Pre-defined battle problems
export const BATTLE_PROBLEMS: BattleProblem[] = [
  {
    title: "FizzBuzz",
    description:
      "Print numbers from 1 to 20. For multiples of 3, print 'Fizz'. For multiples of 5, print 'Buzz'. For multiples of both, print 'FizzBuzz'.",
    expectedOutput:
      "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz",
    starterCode: {
      python: `# Print FizzBuzz for numbers 1 to 20\nfor i in range(1, 21):\n    # Your code here\n    pass`,
      javascript: `// Print FizzBuzz for numbers 1 to 20\nfor (let i = 1; i <= 20; i++) {\n  // Your code here\n}`,
      typescript: `// Print FizzBuzz for numbers 1 to 20\nfor (let i: number = 1; i <= 20; i++) {\n  // Your code here\n}`,
    },
    difficulty: "easy",
  },
  {
    title: "Reverse a String",
    description:
      "Reverse the string 'hello world' and print the result.",
    expectedOutput: "dlrow olleh",
    starterCode: {
      python: `# Reverse the string and print it\ntext = "hello world"\n# Your code here`,
      javascript: `// Reverse the string and print it\nconst text = "hello world";\n// Your code here`,
      typescript: `// Reverse the string and print it\nconst text: string = "hello world";\n// Your code here`,
    },
    difficulty: "easy",
  },
  {
    title: "Sum of Digits",
    description:
      "Calculate and print the sum of all digits in the number 123456789.",
    expectedOutput: "45",
    starterCode: {
      python: `# Calculate the sum of digits in 123456789\nnumber = 123456789\n# Your code here`,
      javascript: `// Calculate the sum of digits in 123456789\nconst number = 123456789;\n// Your code here`,
      typescript: `// Calculate the sum of digits in 123456789\nconst number: number = 123456789;\n// Your code here`,
    },
    difficulty: "easy",
  },
  {
    title: "Factorial",
    description: "Calculate and print the factorial of 10 (10!).",
    expectedOutput: "3628800",
    starterCode: {
      python: `# Calculate the factorial of 10\nn = 10\n# Your code here`,
      javascript: `// Calculate the factorial of 10\nconst n = 10;\n// Your code here`,
      typescript: `// Calculate the factorial of 10\nconst n: number = 10;\n// Your code here`,
    },
    difficulty: "easy",
  },
  {
    title: "Palindrome Check",
    description:
      "Check if each of the following words is a palindrome: 'racecar', 'hello', 'level', 'world', 'madam'. Print 'true' or 'false' for each on a new line.",
    expectedOutput: "true\nfalse\ntrue\nfalse\ntrue",
    starterCode: {
      python: `# Check if each word is a palindrome\nwords = ["racecar", "hello", "level", "world", "madam"]\n# Your code here`,
      javascript: `// Check if each word is a palindrome\nconst words = ["racecar", "hello", "level", "world", "madam"];\n// Your code here`,
      typescript: `// Check if each word is a palindrome\nconst words: string[] = ["racecar", "hello", "level", "world", "madam"];\n// Your code here`,
    },
    difficulty: "medium",
  },
  {
    title: "Fibonacci Sequence",
    description:
      "Print the first 15 Fibonacci numbers, each on a new line. Start with 0 and 1.",
    expectedOutput:
      "0\n1\n1\n2\n3\n5\n8\n13\n21\n34\n55\n89\n144\n233\n377",
    starterCode: {
      python: `# Print the first 15 Fibonacci numbers\n# Your code here`,
      javascript: `// Print the first 15 Fibonacci numbers\n// Your code here`,
      typescript: `// Print the first 15 Fibonacci numbers\n// Your code here`,
    },
    difficulty: "medium",
  },
  {
    title: "Count Vowels",
    description:
      "Count and print the number of vowels (a, e, i, o, u) in the string 'the quick brown fox jumps over the lazy dog'.",
    expectedOutput: "11",
    starterCode: {
      python: `# Count vowels in the string\ntext = "the quick brown fox jumps over the lazy dog"\n# Your code here`,
      javascript: `// Count vowels in the string\nconst text = "the quick brown fox jumps over the lazy dog";\n// Your code here`,
      typescript: `// Count vowels in the string\nconst text: string = "the quick brown fox jumps over the lazy dog";\n// Your code here`,
    },
    difficulty: "easy",
  },
  {
    title: "Find Maximum",
    description:
      "Find and print the maximum value in the array [34, 7, 23, 89, 12, 56, 2, 67, 45, 91].",
    expectedOutput: "91",
    starterCode: {
      python: `# Find the maximum value\nnumbers = [34, 7, 23, 89, 12, 56, 2, 67, 45, 91]\n# Your code here`,
      javascript: `// Find the maximum value\nconst numbers = [34, 7, 23, 89, 12, 56, 2, 67, 45, 91];\n// Your code here`,
      typescript: `// Find the maximum value\nconst numbers: number[] = [34, 7, 23, 89, 12, 56, 2, 67, 45, 91];\n// Your code here`,
    },
    difficulty: "easy",
  },
  {
    title: "Sort Numbers",
    description:
      "Sort the array [64, 34, 25, 12, 22, 11, 90] in ascending order and print each number on a new line.",
    expectedOutput: "11\n12\n22\n25\n34\n64\n90",
    starterCode: {
      python: `# Sort the array in ascending order and print each number\nnumbers = [64, 34, 25, 12, 22, 11, 90]\n# Your code here`,
      javascript: `// Sort the array in ascending order and print each number\nconst numbers = [64, 34, 25, 12, 22, 11, 90];\n// Your code here`,
      typescript: `// Sort the array in ascending order and print each number\nconst numbers: number[] = [64, 34, 25, 12, 22, 11, 90];\n// Your code here`,
    },
    difficulty: "medium",
  },
  {
    title: "Even/Odd Filter",
    description:
      "From the array [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], print only the even numbers, each on a new line.",
    expectedOutput: "2\n4\n6\n8\n10",
    starterCode: {
      python: `# Print only even numbers from the array\nnumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n# Your code here`,
      javascript: `// Print only even numbers from the array\nconst numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n// Your code here`,
      typescript: `// Print only even numbers from the array\nconst numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n// Your code here`,
    },
    difficulty: "easy",
  },
  {
    title: "Prime Numbers",
    description:
      "Print all prime numbers between 1 and 50, each on a new line.",
    expectedOutput:
      "2\n3\n5\n7\n11\n13\n17\n19\n23\n29\n31\n37\n41\n43\n47",
    starterCode: {
      python: `# Print all prime numbers between 1 and 50\n# Your code here`,
      javascript: `// Print all prime numbers between 1 and 50\n// Your code here`,
      typescript: `// Print all prime numbers between 1 and 50\n// Your code here`,
    },
    difficulty: "medium",
  },
  {
    title: "String Compression",
    description:
      "Compress the string 'aaabbbccddddeeee' using run-length encoding and print the result. Format: character followed by count (e.g., 'a3b3c2d4e4').",
    expectedOutput: "a3b3c2d4e4",
    starterCode: {
      python: `# Compress the string using run-length encoding\ntext = "aaabbbccddddeeee"\n# Your code here`,
      javascript: `// Compress the string using run-length encoding\nconst text = "aaabbbccddddeeee";\n// Your code here`,
      typescript: `// Compress the string using run-length encoding\nconst text: string = "aaabbbccddddeeee";\n// Your code here`,
    },
    difficulty: "hard",
  },
];

// Create a new battle challenge (sends to a friend)
export async function createBattle(
  challengerId: string,
  opponentId: string
): Promise<{ battle: DBCodeBattle | null; error?: string }> {
  if (!isSupabaseConfigured) {
    return { battle: null, error: "Supabase is not configured" };
  }

  // Pick a random problem
  const problem =
    BATTLE_PROBLEMS[Math.floor(Math.random() * BATTLE_PROBLEMS.length)];

  // Pick a random language from supported list
  const language = getRandomLanguage();

  // Get starter code for the chosen language, fall back to python or first available
  const starterCode =
    problem.starterCode[language] ||
    problem.starterCode["python"] ||
    Object.values(problem.starterCode)[0] ||
    "";

  const { data, error } = await supabase
    .from("code_battles")
    .insert({
      challenger_id: challengerId,
      opponent_id: opponentId,
      status: "pending",
      language,
      problem_title: problem.title,
      problem_description: problem.description,
      expected_output: problem.expectedOutput,
      starter_code: starterCode,
      time_limit_seconds: 300,
    })
    .select()
    .single();

  if (error) {
    return { battle: null, error: error.message };
  }

  return { battle: data as DBCodeBattle };
}

// Accept a battle challenge (sets status to 'active', sets started_at)
export async function acceptBattle(
  battleId: string
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: false, error: "Supabase is not configured" };
  }

  const { error } = await supabase
    .from("code_battles")
    .update({
      status: "active",
      started_at: new Date().toISOString(),
    })
    .eq("id", battleId)
    .eq("status", "pending");

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

// Decline/cancel a battle
export async function declineBattle(
  battleId: string
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: false, error: "Supabase is not configured" };
  }

  const { error } = await supabase
    .from("code_battles")
    .update({
      status: "cancelled",
    })
    .eq("id", battleId);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

// Submit code for a battle (checks output, determines if correct, sets completed_at)
export async function submitBattleCode(
  battleId: string,
  userId: string,
  code: string,
  output: string
): Promise<{ correct: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { correct: false, error: "Supabase is not configured" };
  }

  // Fetch the current battle state
  const { data: battle, error: fetchError } = await supabase
    .from("code_battles")
    .select("*")
    .eq("id", battleId)
    .single();

  if (fetchError || !battle) {
    return { correct: false, error: fetchError?.message || "Battle not found" };
  }

  const typedBattle = battle as DBCodeBattle;

  // Determine if user is challenger or opponent
  const isChallenger = typedBattle.challenger_id === userId;
  const isOpponent = typedBattle.opponent_id === userId;

  if (!isChallenger && !isOpponent) {
    return { correct: false, error: "User is not a participant in this battle" };
  }

  // Check if output matches expected (trim both, compare)
  const correct =
    output.trim() === typedBattle.expected_output.trim();

  const now = new Date().toISOString();

  // Build the update object based on which player is submitting
  const updateFields: Record<string, unknown> = {};

  if (isChallenger) {
    updateFields.challenger_code = code;
    updateFields.challenger_output = output;
    updateFields.challenger_completed_at = now;
  } else {
    updateFields.opponent_code = code;
    updateFields.opponent_output = output;
    updateFields.opponent_completed_at = now;
  }

  // Determine winner logic
  const otherCompletedAt = isChallenger
    ? typedBattle.opponent_completed_at
    : typedBattle.challenger_completed_at;

  const otherOutput = isChallenger
    ? typedBattle.opponent_output
    : typedBattle.challenger_output;

  if (correct && !otherCompletedAt) {
    // This user finished first and is correct — they win
    updateFields.winner_id = userId;
    updateFields.status = "completed";
    updateFields.ended_at = now;
  } else if (correct && otherCompletedAt) {
    // Both have now completed — compare times or check if other was correct
    const otherCorrect =
      otherOutput?.trim() === typedBattle.expected_output.trim();

    if (!otherCorrect) {
      // Other player got it wrong, this player wins
      updateFields.winner_id = userId;
    } else {
      // Both correct — compare completion times
      const otherTime = new Date(otherCompletedAt).getTime();
      const currentTime = new Date(now).getTime();

      if (otherTime < currentTime) {
        // Other player finished first
        updateFields.winner_id = isChallenger
          ? typedBattle.opponent_id
          : typedBattle.challenger_id;
      } else {
        // Current player finished first (or at the same time)
        updateFields.winner_id = userId;
      }
    }
    updateFields.status = "completed";
    updateFields.ended_at = now;
  } else if (!correct && otherCompletedAt) {
    // This user got it wrong and the other has completed
    const otherCorrect =
      otherOutput?.trim() === typedBattle.expected_output.trim();

    if (otherCorrect) {
      // Other player was correct, they win
      updateFields.winner_id = isChallenger
        ? typedBattle.opponent_id
        : typedBattle.challenger_id;
    }
    // If both wrong, no winner
    updateFields.status = "completed";
    updateFields.ended_at = now;
  }

  const { error: updateError } = await supabase
    .from("code_battles")
    .update(updateFields)
    .eq("id", battleId);

  if (updateError) {
    return { correct: false, error: updateError.message };
  }

  return { correct };
}

// Get active/pending battles for a user
export async function getUserBattles(
  userId: string
): Promise<DBCodeBattle[]> {
  if (!isSupabaseConfigured) {
    return [];
  }

  const { data, error } = await supabase
    .from("code_battles")
    .select("*")
    .or(`challenger_id.eq.${userId},opponent_id.eq.${userId}`)
    .in("status", ["pending", "active"])
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching user battles:", error.message);
    return [];
  }

  return (data as DBCodeBattle[]) || [];
}

// Subscribe to battle changes (real-time)
export function subscribeToBattle(
  battleId: string,
  callback: (battle: DBCodeBattle) => void
): { unsubscribe: () => void } {
  const channel = supabase
    .channel(`battle-${battleId}`)
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "code_battles",
        filter: `id=eq.${battleId}`,
      },
      (payload) => {
        callback(payload.new as DBCodeBattle);
      }
    )
    .subscribe();

  return {
    unsubscribe: () => {
      supabase.removeChannel(channel);
    },
  };
}

// Get battle history
export async function getBattleHistory(
  userId: string,
  limit: number = 20
): Promise<DBCodeBattle[]> {
  if (!isSupabaseConfigured) {
    return [];
  }

  const { data, error } = await supabase
    .from("code_battles")
    .select("*")
    .or(`challenger_id.eq.${userId},opponent_id.eq.${userId}`)
    .eq("status", "completed")
    .order("ended_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching battle history:", error.message);
    return [];
  }

  return (data as DBCodeBattle[]) || [];
}
