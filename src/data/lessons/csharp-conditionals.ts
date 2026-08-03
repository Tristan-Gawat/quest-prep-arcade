// Pre-written lessons for C# Module: Conditionals & Logic

export const csharpConditionalsLessons = [
  {
    title: "What is Conditionals & Logic?",
    definition: "Conditionals in C# control program flow based on boolean expressions using if/else if/else statements, switch expressions, and logical operators (&&, ||, !).",
    explanation: `Conditionals let your program make decisions. Instead of executing every line from top to bottom, conditional statements let you choose which code to run based on whether conditions are true or false.

The most basic conditional is the if statement. You provide a boolean expression (something that evaluates to true or false), and the code inside only executes if that expression is true. You can chain multiple conditions with else if, and provide a fallback with else.

C# also has the switch statement (and modern switch expressions) for choosing between multiple specific values. Instead of writing many if/else if chains comparing the same variable, switch provides cleaner syntax and better performance for value matching.

Logical operators combine multiple conditions: && (AND — both must be true), || (OR — at least one must be true), and ! (NOT — inverts true/false). These let you build complex decision logic from simple comparisons.`,
    code: `// Basic if/else
int health = 35;
if (health > 75)
{
    Console.WriteLine("Healthy — full combat ready");
}
else if (health > 25)
{
    Console.WriteLine("Wounded — proceed with caution");
}
else
{
    Console.WriteLine("Critical — seek healing immediately!");
}

// Comparison operators: ==, !=, <, >, <=, >=
int level = 10;
bool canEnterDungeon = level >= 5 && health > 25;
Console.WriteLine($"Can enter: {canEnterDungeon}");

// Switch statement
string rank = "Gold";
switch (rank)
{
    case "Bronze": Console.WriteLine("Tier 1"); break;
    case "Silver": Console.WriteLine("Tier 2"); break;
    case "Gold":   Console.WriteLine("Tier 3"); break;
    default:       Console.WriteLine("Unknown"); break;
}

// Ternary operator for simple conditions
string status = health > 0 ? "Alive" : "Dead";
Console.WriteLine($"Status: {status}");

// Null-conditional and null-coalescing
string? playerName = null;
string display = playerName ?? "Anonymous";
int nameLength = playerName?.Length ?? 0;`,
    breakdown: `• if (health > 75) — Evaluates the boolean expression. If true, executes the block. The parentheses around the condition are required in C#.

• else if (health > 25) — Checked only if the first condition was false. You can chain as many else-if blocks as needed.

• else — Catches everything that didn't match previous conditions. Only one else block allowed, and it must be last.

• level >= 5 && health > 25 — Logical AND. Both conditions must be true. C# uses short-circuit evaluation: if the left side is false, it doesn't even check the right side.

• switch with cases — Matches rank against specific values. The break statement prevents fall-through to the next case. default handles unmatched values.

• health > 0 ? "Alive" : "Dead" — Ternary operator: condition ? valueIfTrue : valueIfFalse. A one-line if/else for simple value selection.

• playerName ?? "Anonymous" — Null-coalescing: if left side is null, use right side. Eliminates verbose null checks.

• playerName?.Length ?? 0 — Null-conditional (?.) returns null instead of throwing if playerName is null. Combined with ?? provides a safe default.`,
    summary: `C# conditionals use if/else if/else for branching, switch for multi-value matching, and ternary (? :) for inline choices. Logical operators (&&, ||, !) combine conditions with short-circuit evaluation. Null-conditional (?.) and null-coalescing (??) operators handle null values safely and concisely.`
  },
  {
    title: "How Conditionals & Logic works",
    definition: "Conditionals work by evaluating boolean expressions at runtime. The CLR executes comparison operations, combines results with logical operators, and uses the final boolean value to determine which branch of code to execute.",
    explanation: `At the CPU level, conditionals translate to comparison instructions followed by conditional jumps. When C# evaluates 'if (x > 5)', it compares x to 5, sets processor flags based on the result, then either jumps over the if-block or continues into it.

Short-circuit evaluation is a critical optimization. With && (AND), if the left operand is false, the right operand is never evaluated — the overall result must be false regardless. With || (OR), if the left is true, the right is skipped. This matters when the right side has side effects or could throw exceptions.

Switch statements compile differently than if/else chains. For dense integer switches, the compiler generates a jump table — an array of addresses indexed by the switch value. This gives O(1) lookup regardless of how many cases exist, versus O(n) for sequential if/else comparisons.

Pattern matching in modern C# (7.0+) extends conditionals beyond simple equality. You can match on type, properties, ranges, and combinations — making complex conditional logic more readable and less error-prone than chains of type checks and casts.`,
    code: `// Short-circuit evaluation in action
int[] scores = null!;
// Safe: && short-circuits if scores is null
if (scores != null && scores.Length > 0)
{
    Console.WriteLine($"First: {scores[0]}");
}

// Without short-circuit, this would throw:
// if (scores.Length > 0 && scores != null) // CRASH!

// Switch expression (C# 8+) — returns a value
int score = 85;
string grade = score switch
{
    >= 90 => "A",
    >= 80 => "B",
    >= 70 => "C",
    >= 60 => "D",
    _     => "F"  // _ is the discard (default)
};
Console.WriteLine($"Score {score} = Grade {grade}");

// Pattern matching with 'is' and 'when'
object data = 42;
if (data is int number && number > 0)
{
    Console.WriteLine($"Positive int: {number}");
}

// Type pattern in switch
object item = "Excalibur";
string desc = item switch
{
    int n when n > 100 => $"Big number: {n}",
    int n              => $"Small number: {n}",
    string s           => $"Text: {s}",
    null               => "Nothing",
    _                  => "Unknown type"
};
Console.WriteLine(desc);

// Logical patterns (C# 9+)
int temp = 25;
string weather = temp switch
{
    < 0          => "Freezing",
    >= 0 and < 15 => "Cold",
    >= 15 and < 30 => "Pleasant",
    >= 30        => "Hot"
};`,
    breakdown: `• scores != null && scores.Length > 0 — Short-circuit saves the day. If scores is null, the && stops immediately. The Length check never runs, preventing a NullReferenceException.

• score switch { >= 90 => "A", ... } — Switch expression (C# 8+). More concise than switch statement. Returns a value directly. Each arm uses => to map a pattern to a result.

• _ => "F" — The discard pattern matches anything. Acts as the default/fallback case. Required when the compiler can't prove all cases are covered.

• data is int number && number > 0 — Pattern matching with 'is'. Tests the type AND extracts the value into 'number' in one step. The && adds an additional condition.

• int n when n > 100 => ... — The 'when' clause adds a guard condition to a pattern. The pattern matches int, and the guard further restricts to values > 100.

• >= 0 and < 15 — Logical pattern combining two range checks. 'and' requires both to match. 'or' requires either. 'not' inverts. These read more naturally than && in patterns.`,
    summary: `Short-circuit evaluation (&&, ||) prevents errors by stopping early when the result is determined. Switch expressions return values directly with concise => syntax. Pattern matching combines type checking, value extraction, and conditions in one step. Logical patterns (and, or, not) make range checks readable.`
  },
  {
    title: "Conditionals & Logic syntax & usage",
    definition: "C# conditional syntax includes if/else blocks, switch statements and expressions, ternary operators, null-conditional chains, and pattern matching with type/property/positional patterns.",
    explanation: `C# has evolved to offer increasingly powerful conditional syntax. From basic if/else to advanced pattern matching, each tool has its ideal use case.

The if statement is your workhorse for simple boolean checks. Use it when you have 1-3 conditions to test. For more conditions on the same value, switch is cleaner. For simple value selection, the ternary operator (?:) keeps code concise.

Modern C# pattern matching (introduced in C# 7, expanded in 8 and 9) is incredibly powerful. You can match on types, check property values, deconstruct tuples, and combine patterns with logical operators — all in a single, readable expression.

Null handling in C# has its own conditional operators: ?. (null-conditional access), ?? (null-coalescing), and ??= (null-coalescing assignment). These eliminate verbose null checks and make code both safer and shorter.`,
    code: `// If with multiple conditions
int age = 20;
bool hasID = true;
bool isVIP = false;

if (age >= 21 && hasID)
    Console.WriteLine("Full access");
else if (age >= 18 && hasID)
    Console.WriteLine("Limited access");
else
    Console.WriteLine("No access");

// Switch with multiple case labels
char command = 'w';
switch (command)
{
    case 'w': case 'W':
        Console.WriteLine("Move forward");
        break;
    case 'a': case 'A':
        Console.WriteLine("Move left");
        break;
    case 's': case 'S':
        Console.WriteLine("Move back");
        break;
    default:
        Console.WriteLine("Unknown command");
        break;
}

// Property pattern matching (C# 8+)
var player = new { Name = "Zara", Level = 30, HP = 0 };
string state = player switch
{
    { HP: 0 }                 => "Dead",
    { HP: > 0, Level: >= 20 } => "Elite",
    { HP: > 0 }              => "Active",
};

// Null-coalescing assignment (??=)
List<string>? inventory = null;
inventory ??= new List<string>(); // create if null
inventory.Add("Sword");

// Conditional access chain
string? first = inventory?.FirstOrDefault()?.ToUpper();
Console.WriteLine(first ?? "Empty inventory");`,
    breakdown: `• if (age >= 21 && hasID) — Compound condition. Both must be true. Parentheses group the overall expression; operator precedence handles && before comparisons.

• case 'w': case 'W': — Multiple case labels sharing one action. When either 'w' or 'W' matches, the same code runs. Equivalent to || in an if statement.

• { HP: 0 } — Property pattern. Matches any object where the HP property equals 0. No need to declare a variable if you just want to check the value.

• { HP: > 0, Level: >= 20 } — Multiple property checks in one pattern. Both must match. Equivalent to player.HP > 0 && player.Level >= 20 but more declarative.

• inventory ??= new List<string>() — Null-coalescing assignment. If inventory is null, assign the new list to it. If it already has a value, do nothing. Extremely concise initialization.

• inventory?.FirstOrDefault()?.ToUpper() — Conditional access chain. Each ?. returns null if the left side is null, preventing NullReferenceException from propagating through the chain.`,
    summary: `Use if/else for boolean logic, switch for value matching, and ternary for simple inline choices. Multiple case labels share actions with fall-through. Property patterns match object state declaratively. Null-coalescing assignment (??=) initializes only when null. Conditional access chains (?.) safely navigate potentially-null object graphs.`
  },
  {
    title: "Practical examples of Conditionals & Logic",
    definition: "Conditionals in real applications control game mechanics, validate user input, implement state machines, route requests, and enforce business rules.",
    explanation: `Conditionals form the backbone of all interactive programs. Every game mechanic, every form validation, every access control check relies on conditional logic to make the right decision at the right time.

In games, conditionals determine combat outcomes, trigger events, manage inventory rules, and control NPC behavior. A typical game loop checks dozens of conditions per frame: is the player alive? Are they colliding with anything? Is their input valid? Has a cooldown expired?

State machines — a pattern where an entity can be in exactly one state at a time and transitions between states based on events — are naturally expressed with switch statements. A door can be Locked, Closed, Open, or Broken, and each state responds differently to player actions.

Input validation uses conditionals to reject bad data before it can cause problems. Real applications validate types, ranges, formats, business rules, and relationships between fields — building layers of conditional checks that ensure data integrity.`,
    code: `// === EXAMPLE 1: Combat System ===
int playerAtk = 45;
int enemyDef = 20;
double roll = new Random().NextDouble(); // 0.0 to 1.0
bool isCritical = roll > 0.85;
bool isDodged = roll < 0.1;

string result;
int damage;

if (isDodged)
{
    result = "MISS!";
    damage = 0;
}
else if (isCritical)
{
    damage = (playerAtk - enemyDef) * 2;
    result = $"CRITICAL! {damage} damage!";
}
else
{
    damage = Math.Max(1, playerAtk - enemyDef);
    result = $"Hit for {damage} damage";
}
Console.WriteLine(result);

// === EXAMPLE 2: Quest Eligibility ===
int level = 15;
bool hasKey = true;
int reputation = 750;

bool eligible = level switch
{
    < 10  => false,
    < 20  => hasKey && reputation > 500,
    >= 20 => true
};
Console.WriteLine($"Quest eligible: {eligible}");

// === EXAMPLE 3: Loot Rarity System ===
double lootRoll = new Random().NextDouble();
(string name, ConsoleColor color) = lootRoll switch
{
    > 0.99 => ("Legendary", ConsoleColor.Yellow),
    > 0.90 => ("Epic", ConsoleColor.Magenta),
    > 0.70 => ("Rare", ConsoleColor.Blue),
    > 0.40 => ("Uncommon", ConsoleColor.Green),
    _      => ("Common", ConsoleColor.Gray)
};
Console.ForegroundColor = color;
Console.WriteLine($"Dropped: {name} item!");
Console.ResetColor();`,
    breakdown: `• new Random().NextDouble() — Generates a random double between 0.0 and 1.0. Used to simulate probability-based game mechanics like critical hits and dodges.

• isDodged vs isCritical ordering — The if checks dodge first (most impactful), then critical, then normal. Order matters: once a branch matches, the rest are skipped.

• Math.Max(1, playerAtk - enemyDef) — Ensures minimum 1 damage on a hit. Even if defense exceeds attack, you always deal at least 1. Prevents zero-damage attacks.

• level switch { < 10 => false, ... } — Switch expression for multi-criteria eligibility. Each range has its own rule. Level 10-19 requires key AND reputation; 20+ auto-qualifies.

• (string name, ConsoleColor color) = lootRoll switch — Tuple deconstruction from switch expression. Each arm returns a tuple with both the name and color, assigned to separate variables.

• Ranges in switch (> 0.99, > 0.90, etc.) — Checked top to bottom, first match wins. Since 0.995 matches > 0.99, it gets "Legendary" and never checks the other arms.`,
    summary: `Real conditional logic combines random rolls with thresholds for game mechanics, uses switch expressions for multi-criteria decisions, and returns tuples for multi-value results. Order conditions from most-specific to least-specific. Use Math.Max/Min to clamp values within valid ranges. Pattern-based switches make complex eligibility rules readable.`
  },
  {
    title: "Conditionals & Logic best practices",
    definition: "Best practices include preferring early returns over deep nesting, using switch expressions for multi-value logic, avoiding complex boolean expressions, and leveraging pattern matching for type-safe conditionals.",
    explanation: `Clean conditional code is easy to read, easy to modify, and hard to break. The main enemies of clean conditionals are: deep nesting (if inside if inside if), long boolean expressions, and repeated condition checking.

Early returns (guard clauses) flatten nested code. Instead of wrapping your main logic in multiple levels of if-checks, validate preconditions at the top and return immediately if they fail. This keeps the "happy path" at the lowest indentation level.

Prefer switch expressions over long if/else chains when comparing one value against multiple options. Switch expressions are more concise, the compiler can check exhaustiveness, and they're faster for many cases due to jump table optimization.

Extract complex conditions into named boolean variables or methods. Instead of if (age >= 18 && hasId && !isBanned && membership != "expired"), create bool canEnter = IsEligible(user). This documents intent and makes debugging easier.`,
    code: `// DO: Guard clauses (early return) instead of nesting
void ProcessAttack(Player? player, Enemy? enemy)
{
    if (player is null) return;
    if (enemy is null) return;
    if (player.HP <= 0) return;
    if (!player.CanAttack) return;

    // Main logic at low indentation
    int damage = CalculateDamage(player, enemy);
    enemy.TakeDamage(damage);
}

// DON'T: Deep nesting
// void ProcessAttack(Player? p, Enemy? e) {
//     if (p != null) {
//         if (e != null) {
//             if (p.HP > 0) {
//                 if (p.CanAttack) {
//                     // buried logic
//                 }}}}

// DO: Named conditions for clarity
bool isEligible = level >= 10;
bool hasRequirements = hasKey && gold >= 500;
bool questAvailable = !questCompleted;

if (isEligible && hasRequirements && questAvailable)
    StartQuest();

// DO: Use switch expressions for mapping
string GetDamageType(int element) => element switch
{
    0 => "Physical",
    1 => "Fire",
    2 => "Ice",
    3 => "Lightning",
    _ => throw new ArgumentException($"Unknown: {element}")
};

// DO: Prefer pattern matching over type casting
void HandleItem(object item)
{
    switch (item)
    {
        case Weapon w when w.Damage > 50:
            Console.WriteLine($"Power weapon: {w.Name}");
            break;
        case Potion { HealAmount: > 100 } p:
            Console.WriteLine($"Strong potion: {p.Name}");
            break;
        case null:
            Console.WriteLine("No item");
            break;
    }
}`,
    breakdown: `• Guard clauses (if ... return) — Each precondition is checked and rejected immediately. The main logic isn't nested inside multiple conditions. Much easier to read and modify.

• Named boolean variables — isEligible, hasRequirements, questAvailable give meaning to complex conditions. Reading 'if (isEligible && hasRequirements)' is clear; the raw expression would be opaque.

• Switch expression with => — Maps input values to output values concisely. One line per case. The compiler warns if you miss cases (when using enums).

• _ => throw new ArgumentException — The discard pattern as a default that throws. Makes it impossible to silently handle unknown values — you'll get an explicit error.

• case Weapon w when w.Damage > 50 — Pattern matching with type check, variable binding, and guard condition in one case label. Replaces verbose 'if (item is Weapon) { var w = (Weapon)item; if (w.Damage > 50)...' chains.

• case Potion { HealAmount: > 100 } p — Property pattern in a case label. Checks type, checks property value, and binds to variable p all at once.`,
    summary: `Use guard clauses (early returns) to avoid deep nesting. Extract complex conditions into named booleans or methods for clarity. Prefer switch expressions for value mapping — they're concise and compiler-checked. Use pattern matching instead of manual type-checking and casting. Throw in default cases to catch unexpected values explicitly.`
  }
];
