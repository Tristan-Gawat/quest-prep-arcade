// Pre-written lessons for C# Module: Console I/O

export const csharpConsoleIOLessons = [
  {
    title: "What is Console I/O?",
    definition: "Console I/O (Input/Output) in C# refers to reading text from and writing text to the terminal using Console.ReadLine() for input and Console.WriteLine() for output.",
    explanation: `Console I/O is how your C# program communicates with the user through the terminal window. Output displays information to the screen, while input captures what the user types.

Console.WriteLine() prints a line of text followed by a newline character. Console.Write() does the same but without the newline — the cursor stays on the same line. These are your primary tools for displaying information to users.

Console.ReadLine() pauses the program and waits for the user to type something and press Enter. It always returns a string, so you need to convert it to other types (int, double) if you need numeric data.

String interpolation with the $ prefix is the modern way to build output strings in C#. It lets you embed variables and expressions directly inside strings using curly braces {}, making output formatting clean and readable.`,
    code: `// Basic output
Console.WriteLine("Welcome to the Arena!");
Console.Write("Loading");    // no newline
Console.Write("...");        // stays on same line
Console.WriteLine(" Done!"); // now adds newline

// String interpolation for formatted output
string hero = "Mage";
int hp = 250;
double mana = 88.5;
Console.WriteLine($"Class: {hero} | HP: {hp} | Mana: {mana:F1}");

// Reading user input
Console.Write("Enter your name: ");
string name = Console.ReadLine()!; // ! = null-forgiving
Console.WriteLine($"Welcome, {name}!");

// Reading numeric input (with conversion)
Console.Write("Enter your level: ");
int level = int.Parse(Console.ReadLine()!);
Console.WriteLine($"{name} is level {level}");

// Safe parsing with TryParse
Console.Write("Enter damage dealt: ");
if (int.TryParse(Console.ReadLine(), out int damage))
{
    Console.WriteLine($"You dealt {damage} damage!");
}
else
{
    Console.WriteLine("Invalid number!");
}`,
    breakdown: `• Console.WriteLine("...") — Prints text and moves to the next line. The "Ln" in WriteLINE adds a newline character at the end.

• Console.Write("Loading") — Prints without a newline. The next Write or WriteLine continues on the same line. Useful for building output piece by piece.

• $"Class: {hero}" — String interpolation. The $ before the string enables {} expression embedding. Any valid C# expression can go inside the braces.

• {mana:F1} — Format specifier inside interpolation. F1 = fixed-point with 1 decimal. Other options: F2 (2 decimals), N0 (number with commas), C (currency).

• Console.ReadLine()! — Reads one line of input as a string. The ! is the null-forgiving operator (C# 8+) — it tells the compiler you're sure this won't be null.

• int.Parse(Console.ReadLine()!) — Converts the string input to an integer. Throws FormatException if the user doesn't type a valid number.

• int.TryParse(..., out int damage) — Safe parsing. Returns true/false instead of throwing exceptions. The 'out' parameter receives the parsed value (or 0 on failure).`,
    summary: `Console.WriteLine() outputs with a newline; Console.Write() outputs without one. Console.ReadLine() captures user input as a string. Use int.Parse() for simple conversion or int.TryParse() for safe conversion that won't crash on invalid input. String interpolation ($"...{var}...") is the cleanest way to build formatted output.`
  },
  {
    title: "How Console I/O works",
    definition: "Console I/O works through standard streams (stdin, stdout, stderr) managed by the operating system. C# wraps these in the Console class, which handles character encoding, buffering, and stream management automatically.",
    explanation: `Every console application has three standard streams provided by the operating system: stdin (standard input — the keyboard), stdout (standard output — the screen), and stderr (standard error — also the screen, but separate for error messages).

When you call Console.WriteLine(), C# writes characters to the stdout stream buffer. The OS then displays those characters in the terminal. Similarly, Console.ReadLine() reads from the stdin stream, blocking your program until the user presses Enter.

The Console class handles text encoding (converting characters to bytes) automatically. By default it uses UTF-8, which supports virtually all characters including emoji and international text. You can change encoding with Console.OutputEncoding if needed.

Console output is buffered for performance. Characters aren't necessarily sent to the screen immediately — they accumulate in a buffer and get flushed together. Console.WriteLine() triggers a flush, but Console.Write() might not until the buffer fills up or you explicitly call Console.Out.Flush().`,
    code: `// Standard streams
Console.Out.WriteLine("This goes to stdout");
Console.Error.WriteLine("This goes to stderr");

// Redirecting output (useful for logging)
var originalOut = Console.Out;
using var writer = new System.IO.StringWriter();
Console.SetOut(writer);
Console.WriteLine("Captured!");
Console.SetOut(originalOut);
string captured = writer.ToString();
Console.WriteLine($"Got: {captured.Trim()}");

// Reading single characters and keys
Console.Write("Press any key: ");
ConsoleKeyInfo key = Console.ReadKey();
Console.WriteLine($"\\nYou pressed: {key.KeyChar}");
Console.WriteLine($"Key: {key.Key}, Modifiers: {key.Modifiers}");

// Console colors for visual feedback
Console.ForegroundColor = ConsoleColor.Green;
Console.WriteLine("SUCCESS: Quest completed!");
Console.ForegroundColor = ConsoleColor.Red;
Console.WriteLine("ERROR: Not enough mana!");
Console.ResetColor(); // restore defaults

// Cursor manipulation
Console.Clear(); // clear the entire console
Console.SetCursorPosition(10, 5); // x=10, y=5
Console.Write("Text at position (10,5)");

// Reading with timeout (non-blocking check)
Console.Write("Quick! Press a key within 3 seconds: ");
bool pressed = SpinWait.SpinUntil(
    () => Console.KeyAvailable, 3000);
if (pressed) Console.ReadKey();`,
    breakdown: `• Console.Out.WriteLine() — Explicitly writes to stdout. Console.WriteLine() does the same thing. Console.Out is a TextWriter object.

• Console.Error.WriteLine() — Writes to stderr. In terminals, this appears the same as stdout, but they can be redirected separately (useful for separating errors from normal output).

• Console.SetOut(writer) — Redirects Console.WriteLine output to a StringWriter. Everything written goes to the string instead of the screen. Useful for capturing output in tests.

• Console.ReadKey() — Reads a single keypress without waiting for Enter. Returns ConsoleKeyInfo with the character, key enum, and modifier keys (Shift, Ctrl, Alt).

• Console.ForegroundColor = ConsoleColor.Green — Changes text color for subsequent output. 16 colors available. Always call ResetColor() when done to restore defaults.

• Console.SetCursorPosition(10, 5) — Moves the cursor to column 10, row 5. Allows building text-based UIs, progress bars, and animations by writing at specific positions.

• Console.KeyAvailable — Non-blocking check if a key has been pressed. Returns true/false without waiting. Useful for game loops that need to check for input without pausing.`,
    summary: `Console I/O operates on three OS streams: stdin, stdout, and stderr. Console.ReadKey() captures single keypresses without Enter. Console colors (ForegroundColor, BackgroundColor) add visual feedback. Cursor positioning enables text-based UIs. Output can be redirected for testing or logging.`
  },
  {
    title: "Console I/O syntax & usage",
    definition: "C# Console I/O syntax includes various output methods (Write, WriteLine), format specifiers ({value:format}), escape sequences (\\n, \\t), composite formatting, and input methods (ReadLine, ReadKey) with type conversion patterns.",
    explanation: `C# provides rich formatting capabilities for console output. String interpolation ($"...") is the most modern and readable approach, but you should also know composite formatting (String.Format) and the various format specifiers available.

Format specifiers control how values are displayed. Numeric formats include: F (fixed decimal), N (number with separators), C (currency), P (percentage), D (integer with padding), X (hexadecimal), and E (scientific notation). Each can include a precision number.

Escape sequences let you embed special characters in strings: \\n (newline), \\t (tab), \\\\ (backslash), \\" (quote). Verbatim strings (@"...") disable escape processing. Raw string literals (C# 11) use triple quotes for multi-line text.

Input handling patterns in C# include reading strings directly, parsing to numbers with error handling, reading passwords without echo, and building input loops that validate data before accepting it.`,
    code: `// Format specifiers in interpolation
int gold = 15750;
double winRate = 0.7234;
int hexColor = 0xFF5500;

Console.WriteLine($"Gold: {gold:N0}");       // 15,750
Console.WriteLine($"Gold: {gold:C}");        // $15,750.00
Console.WriteLine($"Rate: {winRate:P1}");    // 72.3%
Console.WriteLine($"Color: #{hexColor:X6}"); // #FF5500

// Alignment and padding
string[] items = { "Sword", "Shield", "Potion" };
int[] prices = { 500, 350, 50 };
Console.WriteLine($"{"Item",-12}{"Price",8}");
Console.WriteLine(new string('-', 20));
for (int i = 0; i < items.Length; i++)
{
    Console.WriteLine($"{items[i],-12}{prices[i],8:C0}");
}

// Escape sequences
Console.WriteLine("Line1\\nLine2");   // newline
Console.WriteLine("Col1\\tCol2");     // tab
Console.WriteLine("She said \\"hi\\""); // quotes

// Verbatim strings (@ prefix)
Console.WriteLine(@"Path: C:\\Users\\Game");
Console.WriteLine(@"Multi
line string");

// Input validation loop
int age;
do
{
    Console.Write("Enter age (1-150): ");
} while (!int.TryParse(Console.ReadLine(), out age)
         || age < 1 || age > 150);
Console.WriteLine($"Age set to {age}");`,
    breakdown: `• {gold:N0} — Number format with 0 decimal places and thousand separators. 15750 becomes "15,750". N2 would give "15,750.00".

• {gold:C} — Currency format using system locale. In US: "$15,750.00". Automatically adds currency symbol and proper formatting.

• {winRate:P1} — Percentage format. Multiplies by 100 and adds %. P1 = 1 decimal place. 0.7234 becomes "72.3%".

• {hexColor:X6} — Hexadecimal format, minimum 6 digits. Useful for color codes, memory addresses, and bit flags.

• {"Item",-12} — Left-aligned in a 12-character wide column. Negative number = left align. Positive = right align. Creates neat table columns.

• {prices[i],8:C0} — Right-aligned in 8 chars, formatted as currency with 0 decimals. Combines alignment with format specifier.

• @"Path: C:\\Users\\Game" — Verbatim string. Backslashes are literal — no escape processing. Perfect for file paths on Windows.

• do/while with TryParse — Input validation pattern. Keeps asking until the user enters a valid integer within range. The compound condition checks parsing AND range.`,
    summary: `C# format specifiers (N, C, P, X, F) control numeric display. Alignment ({value,width}) creates table layouts — negative width = left-align, positive = right-align. Verbatim strings (@) disable escaping for paths. Input validation loops using do/while with TryParse ensure valid data before proceeding.`
  },
  {
    title: "Practical examples of Console I/O",
    definition: "Real console applications use I/O for interactive menus, progress displays, data tables, formatted reports, and user prompts with validation.",
    explanation: `Console I/O patterns appear in command-line tools, game interfaces, setup wizards, and diagnostic utilities. Professional console apps go beyond simple print statements — they use colors, tables, progress indicators, and structured prompts.

A common pattern is the menu loop: display options, read user choice, execute the chosen action, repeat. This forms the basis of many command-line tools and text-based games. Good menus include input validation and clear feedback.

Another important pattern is the formatted data table. Using alignment specifiers and repeated characters for borders, you can create professional-looking output without any GUI library.

Progress indicators and loading animations are also common in console apps. By using Console.SetCursorPosition() or \\r (carriage return), you can update text in place to show progress without scrolling the screen.`,
    code: `// === EXAMPLE 1: Character Creation Menu ===
Console.WriteLine("╔══════════════════════════╗");
Console.WriteLine("║   CHARACTER CREATION     ║");
Console.WriteLine("╠══════════════════════════╣");
Console.WriteLine("║ 1. Warrior (STR+5)       ║");
Console.WriteLine("║ 2. Mage    (INT+5)       ║");
Console.WriteLine("║ 3. Rogue   (DEX+5)       ║");
Console.WriteLine("╚══════════════════════════╝");

Console.Write("Choose class (1-3): ");
int choice;
while (!int.TryParse(Console.ReadLine(), out choice)
       || choice < 1 || choice > 3)
{
    Console.Write("Invalid! Choose 1-3: ");
}
string[] classes = { "Warrior", "Mage", "Rogue" };
Console.WriteLine($"\\nYou chose: {classes[choice - 1]}!");

// === EXAMPLE 2: Stats Display ===
void ShowStats(string name, int hp, int mp, int xp)
{
    int barWidth = 20;
    int hpFill = (int)(hp / 100.0 * barWidth);
    string hpBar = new string('█', hpFill)
                 + new string('░', barWidth - hpFill);

    Console.ForegroundColor = ConsoleColor.Cyan;
    Console.WriteLine($"┌─ {name} ─────────────┐");
    Console.ForegroundColor = ConsoleColor.Red;
    Console.WriteLine($"  HP [{hpBar}] {hp}%");
    Console.ForegroundColor = ConsoleColor.Blue;
    Console.WriteLine($"  MP: {mp,4} | XP: {xp,6:N0}");
    Console.ResetColor();
}
ShowStats("DarkKnight", 73, 45, 12500);

// === EXAMPLE 3: Simple Progress Bar ===
Console.Write("Downloading: [");
for (int i = 0; i <= 20; i++)
{
    Console.Write("█");
    Thread.Sleep(100);
}
Console.WriteLine("] 100% Complete!");`,
    breakdown: `• Box-drawing characters (╔═╗║╚╝╠╣) — Unicode characters that create clean borders. Available on all modern terminals. Make menus look professional.

• while (!int.TryParse(...) || choice < 1 || choice > 3) — Input validation loop. Repeats until the user enters a valid number in range. Prevents crashes from bad input.

• classes[choice - 1] — Array is 0-indexed but user enters 1-3. Subtract 1 to convert user-friendly numbering to array index.

• new string('█', hpFill) — String constructor that repeats a character. Creates a visual bar proportional to the HP percentage.

• new string('░', barWidth - hpFill) — Fills the remaining bar with a lighter character. Together with █, creates a progress bar like [████████░░░░].

• Console.ForegroundColor — Different colors for different stats (red for HP, blue for MP, cyan for name) makes information scannable at a glance.

• Thread.Sleep(100) — Pauses 100ms between each bar character, creating an animation effect. In real apps, you'd update based on actual download progress.`,
    summary: `Professional console apps use box-drawing characters for borders, colored output for visual hierarchy, and input validation loops for robustness. Progress bars combine string repetition (new string(char, count)) with cursor control. Menu patterns pair numbered options with while-loop validation to ensure valid user choices.`
  },
  {
    title: "Console I/O best practices",
    definition: "Best practices for Console I/O include always validating input, using TryParse over Parse, providing clear prompts, handling edge cases (empty input, Ctrl+C), and separating I/O logic from business logic.",
    explanation: `Professional console applications are robust, user-friendly, and maintainable. This means anticipating what can go wrong with user input and handling it gracefully rather than crashing.

The number one rule: never trust user input. Always use TryParse instead of Parse for numeric conversion. Always check for null/empty strings before processing. Always validate ranges. A single unhandled exception from bad input can crash your entire application.

Separate your I/O logic from your business logic. Instead of mixing Console.ReadLine() calls throughout your calculations, create dedicated input methods that handle prompting, reading, and validation — then pass the clean data to your logic methods. This makes code testable and reusable.

Good UX in console apps means clear prompts (tell users what format you expect), immediate error feedback (explain what went wrong), and graceful exit handling (respond to Ctrl+C without corrupting data). These details distinguish amateur scripts from professional tools.`,
    code: `// DO: Create reusable input helpers
static int ReadInt(string prompt, int min, int max)
{
    int value;
    do
    {
        Console.Write($"{prompt} ({min}-{max}): ");
        string? input = Console.ReadLine();
        if (int.TryParse(input, out value)
            && value >= min && value <= max)
            return value;
        Console.WriteLine($"  Please enter {min}-{max}.");
    } while (true);
}

static string ReadNonEmpty(string prompt)
{
    string? input;
    do
    {
        Console.Write($"{prompt}: ");
        input = Console.ReadLine()?.Trim();
        if (!string.IsNullOrEmpty(input))
            return input;
        Console.WriteLine("  Input cannot be empty.");
    } while (true);
}

// Usage — clean and safe
string name = ReadNonEmpty("Enter hero name");
int level = ReadInt("Enter level", 1, 99);

// DO: Handle Ctrl+C gracefully
Console.CancelKeyPress += (sender, e) =>
{
    e.Cancel = true; // prevent immediate termination
    Console.WriteLine("\\nSaving progress...");
    // Save game state here
    Environment.Exit(0);
};

// DO: Use StringBuilder for heavy string building
var sb = new System.Text.StringBuilder();
for (int i = 0; i < 100; i++)
    sb.AppendLine($"Entry {i}: {i * i}");
Console.Write(sb.ToString()); // one write, not 100

// DON'T: Concatenate in loops (creates many objects)
// string result = "";
// for (int i = 0; i < 100; i++)
//     result += $"Entry {i}\\n"; // BAD: O(n²)`,
    breakdown: `• ReadInt helper method — Encapsulates all input validation logic. Callers just say ReadInt("Enter level", 1, 99) and get back a guaranteed-valid integer. No validation code scattered everywhere.

• ReadNonEmpty helper — Ensures non-null, non-whitespace input. The ?.Trim() safely handles null (ReadLine can return null if stream is closed) and removes whitespace.

• string? input — The ? indicates this variable might be null. C# nullable reference types (C# 8+) help catch null reference bugs at compile time.

• Console.CancelKeyPress — Event handler for Ctrl+C. Without this, pressing Ctrl+C abruptly terminates the program without cleanup. Setting e.Cancel = true prevents immediate termination.

• StringBuilder for loops — String concatenation in loops creates a new string object each iteration (O(n²) memory). StringBuilder modifies one buffer (O(n)). For 100+ concatenations, always use StringBuilder.

• sb.ToString() with one Console.Write — Batching output into one write call is faster than many small writes, because each Console.Write involves a system call and potential buffer flush.`,
    summary: `Always validate input with TryParse and range checks. Create reusable helper methods (ReadInt, ReadNonEmpty) to encapsulate validation patterns. Handle Ctrl+C with Console.CancelKeyPress for graceful shutdown. Use StringBuilder instead of string concatenation in loops. Separate I/O from logic for testability.`
  }
];
