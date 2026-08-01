import { Module } from "./curriculum";

export const csharpModules: Module[] = [
  {
    id: "csharp-variables",
    title: "Variables & Types",
    tier: "EASY",
    lesson: {
      title: "Variables & Types",
      concept: "C# is strongly typed — every variable has a declared type, like choosing your character class.",
      explanation:
        "C# has value types (int, double, bool, char) and reference types (string, arrays, objects). Use 'var' for type inference. Constants use 'const'. Nullable types (int?) allow null. String interpolation with $ makes formatting easy. C# enforces type safety at compile time.",
      codeExample: `// Value types
int health = 100;
double speed = 3.5;
bool isAlive = true;
char rank = 'A';

// Type inference with var
var playerName = "PixelKnight";  // inferred as string
var level = 42;                   // inferred as int

// String interpolation
Console.WriteLine($"Hero: {playerName}, Level: {level}");
Console.WriteLine($"HP: {health} | Speed: {speed}");

// Nullable types
int? mana = null;
mana = 50;
Console.WriteLine($"Mana: {mana ?? 0}");  // null-coalescing`,
      language: "csharp",
    },
    quiz: [
      {
        question: "What does 'var' do in C#?",
        choices: ["Creates a dynamic variable", "Lets the compiler infer the type", "Makes it mutable", "Creates a variant type"],
        correct: 1,
        explanation: "'var' uses type inference — the compiler determines the type from the assigned value at compile time.",
      },
      {
        question: "What does the ?? operator do?",
        choices: ["Logical OR", "Null-coalescing: returns left if non-null, else right", "Comparison", "Ternary"],
        correct: 1,
        explanation: "?? returns the left operand if non-null, otherwise the right — great for defaults!",
      },
      {
        question: "What prefix enables string interpolation in C#?",
        choices: ["@", "$", "#", "f"],
        correct: 1,
        explanation: "$ before a string enables interpolation: $\"Value: {variable}\" embeds expressions directly.",
      },
    ],
    challenge: {
      title: "Hero Registration",
      description:
        "Declare variables: string name = 'Coder', int hp = 100, double xp = 0.0. Use string interpolation to print 'Coder has 100 HP and 0 XP'.",
      starterCode: "// Declare your hero variables\n\n\n// Print using string interpolation\n",
      expectedOutput: "Coder has 100 HP and 0 XP",
      hints: [
        "Use string name = \"Coder\";",
        "Use $\"...\" for interpolation",
        "Embed variables with {variableName}",
      ],
      solution: `string name = "Coder";\nint hp = 100;\ndouble xp = 0.0;\n\nConsole.WriteLine($"{name} has {hp} HP and {xp} XP");`,
      language: "csharp",
    },
  },

  {
    id: "csharp-console-io",
    title: "Console I/O",
    tier: "EASY",
    lesson: {
      title: "Console I/O",
      concept: "Console I/O is your communication channel with the player — the command terminal of your game.",
      explanation:
        "Console.WriteLine() prints with a newline; Console.Write() prints without. Console.ReadLine() reads user input as a string. Use int.Parse() or Convert.ToInt32() to convert input to numbers. int.TryParse() safely handles invalid input without throwing exceptions.",
      codeExample: `// Output
Console.WriteLine("Welcome to the Arena!");
Console.Write("Enter your name: ");

// Input
string name = Console.ReadLine();
Console.WriteLine($"Greetings, {name}!");

// Converting input to numbers
Console.Write("Choose difficulty (1-10): ");
string input = Console.ReadLine();

if (int.TryParse(input, out int difficulty))
{
    Console.WriteLine($"Difficulty set to {difficulty}");
}
else
{
    Console.WriteLine("Invalid input! Defaulting to 5");
    difficulty = 5;
}

// Formatting output
double score = 1234.5678;
Console.WriteLine($"Score: {score:F2}");  // 1234.57
Console.WriteLine($"Score: {score,10:F1}");  // padded`,
      language: "csharp",
    },
    quiz: [
      {
        question: "What is the difference between Write and WriteLine?",
        choices: [
          "No difference",
          "WriteLine adds a newline at the end",
          "Write is faster",
          "WriteLine accepts only strings",
        ],
        correct: 1,
        explanation: "WriteLine appends \\n after output; Write leaves the cursor on the same line.",
      },
      {
        question: "What does int.TryParse return?",
        choices: ["The parsed integer", "A boolean indicating success", "An exception", "A nullable int"],
        correct: 1,
        explanation: "TryParse returns true/false for success and stores the result in an 'out' parameter — no exceptions!",
      },
      {
        question: "What does {score:F2} do in an interpolated string?",
        choices: ["Rounds to 2 integers", "Formats as fixed-point with 2 decimals", "Multiplies by 2", "Pads with 2 spaces"],
        correct: 1,
        explanation: "F2 is a format specifier: fixed-point with 2 decimal places.",
      },
    ],
    challenge: {
      title: "Score Display",
      description:
        "Create a double variable 'score' with value 99.567. Print it formatted to 1 decimal place using $\"{score:F1}\". Expected output: 'Score: 99.6'.",
      starterCode: "// Create score variable\n\n\n// Print formatted score\n",
      expectedOutput: "Score: 99.6",
      hints: [
        "Use double score = 99.567;",
        "Use :F1 format specifier for 1 decimal place",
        "Embed in $\"Score: {score:F1}\"",
      ],
      solution: `double score = 99.567;\nConsole.WriteLine($"Score: {score:F1}");`,
      language: "csharp",
    },
  },

  {
    id: "csharp-conditionals",
    title: "Conditionals & Logic",
    tier: "EASY",
    lesson: {
      title: "Conditionals & Logic",
      concept: "Conditionals are the decision trees of your code — choosing the path at each fork in the dungeon.",
      explanation:
        "C# has if/else if/else, switch statements, and the ternary operator (?:). Switch supports pattern matching (C# 7+). Logical operators: && (and), || (or), ! (not). Comparison: ==, !=, <, >, <=, >=. Switch expressions (C# 8+) provide concise multi-branch logic.",
      codeExample: `int playerHP = 30;
int maxHP = 100;

// If-else chain
if (playerHP <= 0)
{
    Console.WriteLine("Game Over!");
}
else if (playerHP < maxHP * 0.25)
{
    Console.WriteLine("Critical HP! Find a potion!");
}
else
{
    Console.WriteLine("Status: Healthy");
}

// Ternary operator
string status = playerHP > 50 ? "Strong" : "Weak";

// Switch expression (modern C#)
string rank = playerHP switch
{
    > 80 => "S Rank",
    > 60 => "A Rank",
    > 40 => "B Rank",
    > 20 => "C Rank",
    _    => "D Rank"
};
Console.WriteLine($"Rank: {rank}");`,
      language: "csharp",
    },
    quiz: [
      {
        question: "What does the _ (discard) pattern mean in a switch expression?",
        choices: ["Error case", "The default/catch-all case", "Null check", "Skip"],
        correct: 1,
        explanation: "_ is the discard pattern — it matches anything not caught by previous cases, like 'default'.",
      },
      {
        question: "What does the ternary operator return?",
        choices: ["Always true or false", "One of two values based on a condition", "Three values", "Nothing"],
        correct: 1,
        explanation: "condition ? valueIfTrue : valueIfFalse — a compact way to choose between two values.",
      },
      {
        question: "When should you use switch over if-else?",
        choices: [
          "Always",
          "When comparing one value against multiple specific cases",
          "Only with strings",
          "Never in modern C#",
        ],
        correct: 1,
        explanation: "Switch is ideal when branching on one variable's multiple possible values — cleaner than long if-else chains.",
      },
    ],
    challenge: {
      title: "Rank Calculator",
      description:
        "Given int score = 75, use a switch expression to assign a rank: >90 => 'Legend', >70 => 'Hero', >50 => 'Warrior', _ => 'Novice'. Print the rank.",
      starterCode: "int score = 75;\n\n// Use switch expression for rank\n\n\n// Print the rank\n",
      expectedOutput: "Hero",
      hints: [
        "Use: string rank = score switch { ... };",
        "Pattern: > 90 => \"Legend\"",
        "Don't forget the _ default case",
      ],
      solution: `int score = 75;\n\nstring rank = score switch\n{\n    > 90 => "Legend",\n    > 70 => "Hero",\n    > 50 => "Warrior",\n    _    => "Novice"\n};\n\nConsole.WriteLine(rank);`,
      language: "csharp",
    },
  },

  {
    id: "csharp-loops",
    title: "Loops & Iteration",
    tier: "EASY",
    lesson: {
      title: "Loops & Iteration",
      concept: "Loops are your grind mechanic — repeat actions until the quest objective is met.",
      explanation:
        "C# offers for, foreach, while, and do-while loops. 'foreach' iterates collections elegantly. 'break' exits a loop; 'continue' skips to next iteration. For numeric ranges, use Enumerable.Range(). LINQ's .ForEach() works on lists. Always prefer foreach for collections.",
      codeExample: `// For loop — classic counter
for (int i = 1; i <= 5; i++)
{
    Console.WriteLine($"Wave {i} incoming!");
}

// Foreach — iterate collections
string[] weapons = { "Sword", "Bow", "Staff", "Axe" };
foreach (var weapon in weapons)
{
    Console.WriteLine($"Equipped: {weapon}");
}

// While — condition-based
int bossHP = 100;
while (bossHP > 0)
{
    bossHP -= 30;
    Console.WriteLine($"Boss HP: {Math.Max(bossHP, 0)}");
}

// Break and continue
for (int i = 0; i < 10; i++)
{
    if (i == 3) continue;  // skip 3
    if (i == 7) break;     // stop at 7
    Console.Write($"{i} ");
}`,
      language: "csharp",
    },
    quiz: [
      {
        question: "What is the difference between 'break' and 'continue'?",
        choices: [
          "No difference",
          "break exits the loop entirely; continue skips to the next iteration",
          "break pauses; continue resumes",
          "They only work in while loops",
        ],
        correct: 1,
        explanation: "break terminates the loop; continue jumps to the next iteration — different escape strategies!",
      },
      {
        question: "When should you prefer foreach over for?",
        choices: [
          "When you need the index",
          "When iterating a collection and don't need the index",
          "Never",
          "Only with arrays",
        ],
        correct: 1,
        explanation: "foreach is cleaner when you just need each element — no index management required.",
      },
      {
        question: "What does a do-while loop guarantee?",
        choices: [
          "It runs faster",
          "The body executes at least once",
          "It never infinite-loops",
          "The condition is checked first",
        ],
        correct: 1,
        explanation: "do-while checks the condition AFTER the body, so it always executes at least once.",
      },
    ],
    challenge: {
      title: "Wave Countdown",
      description:
        "Use a for loop to count down from 5 to 1, printing 'Wave X' for each. After the loop, print 'Boss appears!'.",
      starterCode: "// Countdown loop\n\n\n// Boss message\n",
      expectedOutput: "Wave 5\nWave 4\nWave 3\nWave 2\nWave 1\nBoss appears!",
      hints: [
        "Start at i = 5 and decrement with i--",
        "Loop condition: i >= 1",
        "Print the boss message after the loop ends",
      ],
      solution: `for (int i = 5; i >= 1; i--)\n{\n    Console.WriteLine($"Wave {i}");\n}\nConsole.WriteLine("Boss appears!");`,
      language: "csharp",
    },
  },

  {
    id: "csharp-methods",
    title: "Methods & Parameters",
    tier: "MEDIUM",
    lesson: {
      title: "Methods & Parameters",
      concept: "Methods are your skill slots — reusable abilities you can invoke anytime.",
      explanation:
        "Methods have a return type, name, and parameters. Use 'void' for no return. C# supports optional parameters (defaults), named arguments, params arrays, and ref/out parameters. Expression-bodied methods (=>) are concise for one-liners. Method overloading lets you have multiple versions with different parameters.",
      codeExample: `// Basic method
static int CalculateDamage(int baseDmg, int level)
{
    return baseDmg + (level * 2);
}

// Optional parameters with defaults
static string FormatHP(int current, int max = 100)
{
    return $"{current}/{max} HP";
}

// Expression-bodied method
static bool IsAlive(int hp) => hp > 0;

// Params array — variable arguments
static int TotalDamage(params int[] hits)
{
    int total = 0;
    foreach (int hit in hits) total += hit;
    return total;
}

// Usage
Console.WriteLine(CalculateDamage(10, 5));  // 20
Console.WriteLine(FormatHP(75));            // 75/100 HP
Console.WriteLine(IsAlive(1));              // True
Console.WriteLine(TotalDamage(5, 10, 15)); // 30`,
      language: "csharp",
    },
    quiz: [
      {
        question: "What does 'params' allow in a method signature?",
        choices: [
          "Named parameters",
          "A variable number of arguments as an array",
          "Optional parameters",
          "Generic parameters",
        ],
        correct: 1,
        explanation: "'params' lets callers pass any number of arguments which arrive as an array inside the method.",
      },
      {
        question: "What is an expression-bodied method?",
        choices: [
          "A method without a body",
          "A concise method using => for a single expression",
          "A lambda function",
          "An abstract method",
        ],
        correct: 1,
        explanation: "=> replaces { return expr; } for single-expression methods — cleaner and more readable!",
      },
      {
        question: "What is method overloading?",
        choices: [
          "Calling a method too many times",
          "Multiple methods with the same name but different parameters",
          "Overriding a base class method",
          "A memory error",
        ],
        correct: 1,
        explanation: "Overloading: same method name, different parameter lists — the compiler picks the right one.",
      },
    ],
    challenge: {
      title: "Combo Attack",
      description:
        "Write a method 'ComboAttack' that accepts params int[] hits and returns their sum. Call it with (10, 20, 30) and print the result.",
      starterCode: "// Define ComboAttack method\n\n\n// Call and print result\n",
      expectedOutput: "60",
      hints: [
        "Use static int ComboAttack(params int[] hits)",
        "Loop through hits and sum them",
        "Or use System.Linq's hits.Sum()",
      ],
      solution: `static int ComboAttack(params int[] hits)\n{\n    int total = 0;\n    foreach (int hit in hits) total += hit;\n    return total;\n}\n\nConsole.WriteLine(ComboAttack(10, 20, 30));`,
      language: "csharp",
    },
  },

  {
    id: "csharp-classes",
    title: "Classes & OOP",
    tier: "MEDIUM",
    lesson: {
      title: "Classes & OOP",
      concept: "Classes are the blueprints for your game entities — design powerful objects from scratch.",
      explanation:
        "C# classes have fields, properties (with get/set), constructors, and methods. Properties auto-generate backing fields. Use 'public', 'private', 'protected' for access control. 'this' refers to the current instance. Records (C# 9+) provide immutable value-type semantics for data classes.",
      codeExample: `public class Hero
{
    // Auto-property
    public string Name { get; set; }
    public int Level { get; private set; }

    // Property with logic
    private int _hp;
    public int HP
    {
        get => _hp;
        set => _hp = Math.Max(0, value);  // never below 0
    }

    // Constructor
    public Hero(string name, int level, int hp)
    {
        Name = name;
        Level = level;
        HP = hp;
    }

    // Method
    public string GetStatus()
    {
        return $"{Name} [Lvl {Level}] - {HP} HP";
    }
}

var hero = new Hero("ByteKnight", 10, 100);
hero.HP -= 30;
Console.WriteLine(hero.GetStatus());`,
      language: "csharp",
    },
    quiz: [
      {
        question: "What is a property in C#?",
        choices: [
          "Just a public field",
          "A member with get/set accessors controlling field access",
          "A constant",
          "A method alias",
        ],
        correct: 1,
        explanation: "Properties wrap field access with get/set logic — encapsulation with a clean syntax!",
      },
      {
        question: "What does { get; private set; } mean?",
        choices: [
          "Fully public",
          "Readable by anyone, but only writable inside the class",
          "Read-only everywhere",
          "Write-only",
        ],
        correct: 1,
        explanation: "Public get + private set means outsiders can read but only the class itself can write.",
      },
      {
        question: "What keyword refers to the current object instance?",
        choices: ["self", "this", "me", "current"],
        correct: 1,
        explanation: "'this' refers to the current instance — used to disambiguate or pass the object itself.",
      },
    ],
    challenge: {
      title: "Build a Warrior",
      description:
        "Create a class 'Warrior' with properties Name (string, get/set) and Power (int, get/set). Add a constructor taking both values. Add a method Battlecry() that returns \"{Name} attacks with {Power} power!\". Create a Warrior 'Thor' with power 99 and print the battlecry.",
      starterCode: "// Define Warrior class\n\n\n// Create instance and print battlecry\n",
      expectedOutput: "Thor attacks with 99 power!",
      hints: [
        "Use public string Name { get; set; }",
        "Constructor: public Warrior(string name, int power)",
        "Battlecry returns an interpolated string",
      ],
      solution: `public class Warrior\n{\n    public string Name { get; set; }\n    public int Power { get; set; }\n\n    public Warrior(string name, int power)\n    {\n        Name = name;\n        Power = power;\n    }\n\n    public string Battlecry()\n    {\n        return $"{Name} attacks with {Power} power!";\n    }\n}\n\nvar w = new Warrior("Thor", 99);\nConsole.WriteLine(w.Battlecry());`,
      language: "csharp",
    },
  },

  {
    id: "csharp-inheritance",
    title: "Inheritance & Interfaces",
    tier: "MEDIUM",
    lesson: {
      title: "Inheritance & Interfaces",
      concept: "Inheritance creates class hierarchies; interfaces define contracts — build your guild system!",
      explanation:
        "Use ':' for inheritance (single class, multiple interfaces). 'virtual' allows overriding; 'override' replaces behavior; 'abstract' forces implementation. Interfaces define method signatures without implementation. 'sealed' prevents further inheritance. Use interfaces for loose coupling.",
      codeExample: `// Interface
public interface IAttackable
{
    int HP { get; set; }
    void TakeDamage(int amount);
}

// Abstract base class
public abstract class GameEntity : IAttackable
{
    public string Name { get; set; }
    public int HP { get; set; }

    public abstract void TakeDamage(int amount);
    public virtual string Describe() => $"{Name} ({HP} HP)";
}

// Concrete class
public class Dragon : GameEntity
{
    public int FirePower { get; set; }

    public override void TakeDamage(int amount)
    {
        HP -= amount / 2;  // Dragons have armor!
        Console.WriteLine($"{Name} takes {amount/2} damage (halved)");
    }

    public override string Describe()
        => $"{base.Describe()} - Fire: {FirePower}";
}

var dragon = new Dragon { Name = "Smaug", HP = 500, FirePower = 90 };
dragon.TakeDamage(100);  // Takes 50`,
      language: "csharp",
    },
    quiz: [
      {
        question: "What is the difference between abstract and virtual methods?",
        choices: [
          "No difference",
          "Abstract has no body and must be overridden; virtual has a default body",
          "Virtual can't be overridden",
          "Abstract is faster",
        ],
        correct: 1,
        explanation: "Abstract methods force subclasses to implement them; virtual methods provide a default that can be optionally overridden.",
      },
      {
        question: "Can a class inherit multiple classes in C#?",
        choices: ["Yes", "No, but it can implement multiple interfaces", "Only with generics", "Yes with partial classes"],
        correct: 1,
        explanation: "C# has single class inheritance but multiple interface implementation — interfaces for flexibility!",
      },
      {
        question: "What does 'sealed' do on a class?",
        choices: ["Makes it abstract", "Prevents inheritance from this class", "Makes all members private", "Enables serialization"],
        correct: 1,
        explanation: "'sealed' stops other classes from inheriting — useful for security and optimization.",
      },
    ],
    challenge: {
      title: "Enemy Hierarchy",
      description:
        "Create an interface IEnemy with a method string Attack(). Create a class Goblin implementing IEnemy where Attack() returns 'Goblin slashes for 10 damage!'. Create a Goblin and print its Attack().",
      starterCode: "// Define IEnemy interface\n\n\n// Define Goblin class\n\n\n// Create and attack\n",
      expectedOutput: "Goblin slashes for 10 damage!",
      hints: [
        "interface IEnemy { string Attack(); }",
        "class Goblin : IEnemy",
        "Implement Attack() returning the string",
      ],
      solution: `public interface IEnemy\n{\n    string Attack();\n}\n\npublic class Goblin : IEnemy\n{\n    public string Attack()\n    {\n        return "Goblin slashes for 10 damage!";\n    }\n}\n\nvar goblin = new Goblin();\nConsole.WriteLine(goblin.Attack());`,
      language: "csharp",
    },
  },

  {
    id: "csharp-linq",
    title: "LINQ Queries",
    tier: "MEDIUM",
    lesson: {
      title: "LINQ Queries",
      concept: "LINQ is your data-querying superpower — filter, transform, and aggregate collections with elegance.",
      explanation:
        "LINQ (Language Integrated Query) adds SQL-like queries to C#. Method syntax uses chained extension methods: Where, Select, OrderBy, GroupBy, First, Count, Sum, Any, All. Query syntax uses from/where/select keywords. LINQ works on any IEnumerable<T> — arrays, lists, even databases.",
      codeExample: `using System.Linq;

var players = new List<(string Name, int Score, int Level)>
{
    ("Ace", 1500, 10),
    ("Blaze", 2300, 15),
    ("Cipher", 800, 5),
    ("Delta", 3100, 20),
    ("Echo", 1200, 8)
};

// Filter and sort
var topPlayers = players
    .Where(p => p.Score > 1000)
    .OrderByDescending(p => p.Score)
    .Select(p => $"{p.Name}: {p.Score}")
    .ToList();
// ["Delta: 3100", "Blaze: 2300", "Ace: 1500", "Echo: 1200"]

// Aggregation
int totalScore = players.Sum(p => p.Score);
double avgLevel = players.Average(p => p.Level);
var highest = players.Max(p => p.Score);

// Any/All checks
bool anyPro = players.Any(p => p.Level >= 20);  // true
bool allActive = players.All(p => p.Score > 0); // true`,
      language: "csharp",
    },
    quiz: [
      {
        question: "What does .Where() do in LINQ?",
        choices: ["Sorts elements", "Filters elements based on a condition", "Groups elements", "Selects properties"],
        correct: 1,
        explanation: "Where() filters the collection, keeping only elements where the predicate returns true.",
      },
      {
        question: "What does .Select() do?",
        choices: ["Filters items", "Transforms/projects each element into a new form", "Picks the first match", "Counts elements"],
        correct: 1,
        explanation: "Select() transforms each element — like 'map' in other languages.",
      },
      {
        question: "What does .Any(predicate) return?",
        choices: ["The matching element", "True if at least one element matches", "The count of matches", "A filtered list"],
        correct: 1,
        explanation: "Any() returns true if any element satisfies the condition — short-circuits on first match!",
      },
    ],
    challenge: {
      title: "Leaderboard Filter",
      description:
        "Given int[] scores = {45, 92, 78, 100, 33, 88}, use LINQ to filter scores >= 80, sort descending, and print each on a new line.",
      starterCode: "using System.Linq;\n\nint[] scores = {45, 92, 78, 100, 33, 88};\n\n// Filter, sort, and print\n",
      expectedOutput: "100\n92\n88",
      hints: [
        "Use .Where(s => s >= 80)",
        "Chain .OrderByDescending(s => s)",
        "Use foreach to print each score",
      ],
      solution: `using System.Linq;\n\nint[] scores = {45, 92, 78, 100, 33, 88};\n\nvar topScores = scores\n    .Where(s => s >= 80)\n    .OrderByDescending(s => s);\n\nforeach (var s in topScores)\n    Console.WriteLine(s);`,
      language: "csharp",
    },
  },

  {
    id: "csharp-async",
    title: "Async/Await",
    tier: "HARD",
    lesson: {
      title: "Async/Await",
      concept: "Async programming lets your game load resources without freezing — non-blocking power!",
      explanation:
        "async/await enables non-blocking operations. Mark methods 'async' and return Task or Task<T>. 'await' pauses execution until the task completes without blocking the thread. Use for I/O: file reads, HTTP requests, database queries. Task.WhenAll() runs multiple tasks in parallel. Always avoid async void except for event handlers.",
      codeExample: `using System.Threading.Tasks;

// Async method
async Task<string> LoadPlayerDataAsync(string playerId)
{
    // Simulating async I/O
    await Task.Delay(1000);  // 1 second delay
    return $"Data for {playerId} loaded!";
}

// Awaiting results
async Task StartGameAsync()
{
    Console.WriteLine("Loading...");
    string data = await LoadPlayerDataAsync("hero_42");
    Console.WriteLine(data);
}

// Parallel async tasks
async Task LoadAllAsync()
{
    var task1 = LoadPlayerDataAsync("player1");
    var task2 = LoadPlayerDataAsync("player2");
    var task3 = LoadPlayerDataAsync("player3");

    string[] results = await Task.WhenAll(task1, task2, task3);
    foreach (var r in results)
        Console.WriteLine(r);
}

// Exception handling with async
async Task RiskyQuestAsync()
{
    try
    {
        await Task.Delay(500);
        throw new Exception("Boss appeared!");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Caught: {ex.Message}");
    }
}`,
      language: "csharp",
    },
    quiz: [
      {
        question: "What does 'await' do?",
        choices: [
          "Blocks the thread until completion",
          "Asynchronously waits without blocking the thread",
          "Creates a new thread",
          "Cancels the task",
        ],
        correct: 1,
        explanation: "await yields control back to the caller until the task completes — the thread is free to do other work!",
      },
      {
        question: "What should an async method return?",
        choices: ["void always", "Task or Task<T>", "Thread", "Promise"],
        correct: 1,
        explanation: "Async methods return Task (no value) or Task<T> (with value). Avoid async void!",
      },
      {
        question: "What does Task.WhenAll() do?",
        choices: [
          "Runs tasks sequentially",
          "Awaits all tasks to complete in parallel",
          "Cancels all tasks",
          "Creates a task group",
        ],
        correct: 1,
        explanation: "WhenAll runs multiple tasks concurrently and completes when ALL finish — great for parallel loading!",
      },
    ],
    challenge: {
      title: "Parallel Quest Loader",
      description:
        "Write an async method 'FetchQuest' that takes a string name, awaits Task.Delay(100), and returns $\"{name} loaded\". Call it three times with Task.WhenAll for quests 'A', 'B', 'C', then print the count of results.",
      starterCode: "using System.Threading.Tasks;\n\n// Define FetchQuest async method\n\n\n// Call with WhenAll and print count\n",
      expectedOutput: "3",
      hints: [
        "async Task<string> FetchQuest(string name)",
        "Use await Task.WhenAll(task1, task2, task3)",
        "results.Length gives the count",
      ],
      solution: `using System.Threading.Tasks;\n\nasync Task<string> FetchQuest(string name)\n{\n    await Task.Delay(100);\n    return $"{name} loaded";\n}\n\nvar results = await Task.WhenAll(\n    FetchQuest("A"),\n    FetchQuest("B"),\n    FetchQuest("C")\n);\nConsole.WriteLine(results.Length);`,
      language: "csharp",
    },
  },

  {
    id: "csharp-generics",
    title: "Generics",
    tier: "HARD",
    lesson: {
      title: "Generics",
      concept: "Generics let you write type-safe code that works with ANY type — one skill tree, infinite builds.",
      explanation:
        "Generics use type parameters <T> to create reusable classes, methods, and interfaces. Constraints (where T : class, where T : IComparable) limit what types are allowed. Generic collections (List<T>, Dictionary<TKey,TValue>) are the backbone of C#. Covariance/contravariance allow flexible type relationships.",
      codeExample: `// Generic class
public class Inventory<T>
{
    private List<T> items = new();

    public void Add(T item) => items.Add(item);
    public T GetFirst() => items[0];
    public int Count => items.Count;
}

// Generic with constraints
public class ComparableStack<T> where T : IComparable<T>
{
    private List<T> data = new();

    public void Push(T item) => data.Add(item);
    public T Max() => data.Max();
}

// Generic method
public static T ChooseRandom<T>(T[] options)
{
    var rng = new Random();
    return options[rng.Next(options.Length)];
}

// Usage
var weaponBag = new Inventory<string>();
weaponBag.Add("Excalibur");
weaponBag.Add("Mjolnir");
Console.WriteLine(weaponBag.Count);  // 2

string pick = ChooseRandom(new[] { "Fire", "Ice", "Thunder" });`,
      language: "csharp",
    },
    quiz: [
      {
        question: "What does 'where T : IComparable<T>' mean?",
        choices: [
          "T must be a string",
          "T must implement the IComparable interface",
          "T is optional",
          "T must be a value type",
        ],
        correct: 1,
        explanation: "Constraints restrict generic types — here T must implement IComparable, enabling comparison operations.",
      },
      {
        question: "What's the main benefit of generics over using 'object'?",
        choices: [
          "Faster compilation",
          "Type safety without casting, with better performance",
          "Smaller code size",
          "Easier to read",
        ],
        correct: 1,
        explanation: "Generics provide compile-time type checking and avoid boxing/unboxing for value types.",
      },
      {
        question: "Can a generic class have multiple type parameters?",
        choices: ["No, only one", "Yes, like Dictionary<TKey, TValue>", "Only with interfaces", "Maximum of 2"],
        correct: 1,
        explanation: "Multiple type parameters are common — Dictionary<TKey, TValue>, Tuple<T1, T2>, etc.",
      },
    ],
    challenge: {
      title: "Generic Loot Chest",
      description:
        "Create a generic class LootChest<T> with a private List<T>, methods Add(T item) and Count (property). Create a LootChest<string>, add 'Sword' and 'Shield', print the count.",
      starterCode: "// Define generic LootChest<T>\n\n\n// Create, add items, print count\n",
      expectedOutput: "2",
      hints: [
        "Use private List<T> items = new();",
        "public int Count => items.Count;",
        "var chest = new LootChest<string>();",
      ],
      solution: `public class LootChest<T>\n{\n    private List<T> items = new();\n\n    public void Add(T item) => items.Add(item);\n    public int Count => items.Count;\n}\n\nvar chest = new LootChest<string>();\nchest.Add("Sword");\nchest.Add("Shield");\nConsole.WriteLine(chest.Count);`,
      language: "csharp",
    },
  },

  {
    id: "csharp-delegates",
    title: "Delegates & Events",
    tier: "EXPERT",
    lesson: {
      title: "Delegates & Events",
      concept: "Delegates are function pointers; events are the pub/sub system — build reactive game mechanics!",
      explanation:
        "Delegates are type-safe function references. Action<T> (no return) and Func<T,TResult> (with return) are built-in delegates. Events use the publisher-subscriber pattern: objects raise events, listeners respond. EventHandler<T> is the standard pattern. Multicast delegates invoke multiple methods.",
      codeExample: `// Func and Action delegates
Func<int, int, int> calcDamage = (baseDmg, level) => baseDmg * level;
Action<string> announce = msg => Console.WriteLine($"[GAME] {msg}");

Console.WriteLine(calcDamage(10, 5));  // 50
announce("Boss defeated!");

// Events
public class GameEventSystem
{
    public event EventHandler<string> OnEnemyDefeated;
    public event EventHandler<int> OnLevelUp;

    public void DefeatEnemy(string name)
    {
        Console.WriteLine($"Defeated {name}!");
        OnEnemyDefeated?.Invoke(this, name);
    }

    public void GainLevel(int newLevel)
    {
        OnLevelUp?.Invoke(this, newLevel);
    }
}

// Subscribe to events
var game = new GameEventSystem();
game.OnEnemyDefeated += (sender, name) =>
    Console.WriteLine($"  +100 XP for defeating {name}");
game.OnLevelUp += (sender, level) =>
    Console.WriteLine($"  Reached level {level}! Stats increased.");

game.DefeatEnemy("Goblin");
game.GainLevel(5);`,
      language: "csharp",
    },
    quiz: [
      {
        question: "What is the difference between Func and Action?",
        choices: [
          "No difference",
          "Func returns a value; Action returns void",
          "Action is faster",
          "Func is deprecated",
        ],
        correct: 1,
        explanation: "Func<...TResult> has a return value; Action<...> returns void — both are delegate types.",
      },
      {
        question: "What does the ?. operator do before Invoke?",
        choices: [
          "Forces invocation",
          "Null-conditional: only invokes if the event has subscribers",
          "Catches exceptions",
          "Makes it async",
        ],
        correct: 1,
        explanation: "?.Invoke() safely calls the event only if there are subscribers — avoids NullReferenceException!",
      },
      {
        question: "How do you subscribe to an event?",
        choices: ["event.Add(handler)", "event += handler", "event.Subscribe(handler)", "event.Listen(handler)"],
        correct: 1,
        explanation: "+= adds a handler to the event's invocation list; -= removes it.",
      },
    ],
    challenge: {
      title: "Event-Driven Scoring",
      description:
        "Create a Func<int, int> called 'doubler' that doubles a number. Create an Action<string> called 'logger' that prints the string. Use doubler on 25 and log the result as 'Score: 50'.",
      starterCode: "// Define Func doubler\n\n// Define Action logger\n\n// Use them together\n",
      expectedOutput: "Score: 50",
      hints: [
        "Func<int, int> doubler = n => n * 2;",
        "Action<string> logger = msg => Console.WriteLine(msg);",
        "Combine: logger($\"Score: {doubler(25)}\");",
      ],
      solution: `Func<int, int> doubler = n => n * 2;\nAction<string> logger = msg => Console.WriteLine(msg);\n\nlogger($"Score: {doubler(25)}");`,
      language: "csharp",
    },
  },

  {
    id: "csharp-pattern-matching",
    title: "Pattern Matching",
    tier: "EXPERT",
    lesson: {
      title: "Pattern Matching",
      concept: "Pattern matching is C#'s ultimate combo system — match complex shapes and extract data in one move.",
      explanation:
        "C# pattern matching evolved from basic 'is' checks to powerful switch expressions with type, property, positional, relational, and logical patterns. Combine patterns with 'and', 'or', 'not'. Use 'when' guards for additional conditions. Deconstruct objects with positional patterns. List patterns (C# 11) match array shapes.",
      codeExample: `// Type patterns
object entity = new Dragon("Smaug", 500);
if (entity is Dragon d)
{
    Console.WriteLine($"Dragon {d.Name} with {d.HP} HP");
}

// Property patterns
var result = entity switch
{
    Dragon { HP: > 300 } => "Legendary Dragon",
    Dragon { HP: > 100 } => "Elite Dragon",
    Dragon => "Weak Dragon",
    _ => "Unknown Entity"
};

// Relational and logical patterns
string Classify(int score) => score switch
{
    >= 90 and <= 100 => "S Rank",
    >= 70 and < 90   => "A Rank",
    >= 50 and < 70   => "B Rank",
    > 0 and < 50     => "C Rank",
    0                 => "No Score",
    _                 => "Invalid"
};

// List patterns (C# 11)
int[] combo = { 1, 2, 3 };
var description = combo switch
{
    [1, 2, 3]       => "Triple combo!",
    [1, ..]         => "Starts with 1",
    [.., 3]         => "Ends with 3",
    { Length: > 5 } => "Long combo",
    _               => "Basic"
};`,
      language: "csharp",
    },
    quiz: [
      {
        question: "What does 'is Dragon d' do?",
        choices: [
          "Compares equality",
          "Checks if the object is a Dragon and assigns it to variable d",
          "Creates a new Dragon",
          "Casts without checking",
        ],
        correct: 1,
        explanation: "Type pattern with declaration: checks the type and creates a typed variable in one step!",
      },
      {
        question: "What does 'and' do in a pattern?",
        choices: [
          "Logical AND on booleans",
          "Combines two patterns that must both match",
          "Concatenates strings",
          "Adds numbers",
        ],
        correct: 1,
        explanation: "'and' creates a conjunctive pattern — both sub-patterns must match for the overall pattern to match.",
      },
      {
        question: "What does [.., 3] match?",
        choices: [
          "An array starting with 3",
          "An array ending with 3",
          "An array containing only 3",
          "An empty array",
        ],
        correct: 1,
        explanation: "[..] is the slice pattern matching zero or more elements — [.., 3] matches any array ending with 3.",
      },
    ],
    challenge: {
      title: "Pattern Combat Classifier",
      description:
        "Write a method that takes an int 'damage' and uses a switch expression with relational patterns: >= 100 => 'CRITICAL', >= 50 and < 100 => 'HEAVY', >= 1 and < 50 => 'LIGHT', _ => 'MISS'. Call with 75 and print the result.",
      starterCode: "// Define classifier method\n\n\n// Call with 75 and print\n",
      expectedOutput: "HEAVY",
      hints: [
        "Use string Classify(int damage) => damage switch { ... };",
        "Use >= and < for range patterns combined with 'and'",
        "Don't forget the _ default case",
      ],
      solution: `string Classify(int damage) => damage switch\n{\n    >= 100         => "CRITICAL",\n    >= 50 and < 100 => "HEAVY",\n    >= 1 and < 50  => "LIGHT",\n    _              => "MISS"\n};\n\nConsole.WriteLine(Classify(75));`,
      language: "csharp",
    },
  },
];
