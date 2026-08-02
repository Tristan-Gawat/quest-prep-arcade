// Pre-written lessons for C# Module: Variables & Types

export const csharpVariablesLessons = [
  {
    title: "What is Variables & Types?",
    definition: "Variables in C# are strongly-typed named storage locations that hold data values. Every variable must have a declared type (int, double, string, bool) or use type inference with 'var'.",
    explanation: `In C#, variables are like labeled containers with strict rules about what they can hold. Unlike dynamically-typed languages like Python, C# enforces type safety at compile time — you must declare what type of data a variable will store before you use it.

C# has two main categories of types: value types and reference types. Value types (int, double, bool, char, struct) store their data directly in memory. Reference types (string, arrays, objects, classes) store a reference (pointer) to the data's location in memory.

The basic value types you'll use most often are: int (whole numbers like 42), double (decimal numbers like 3.14), bool (true/false), and char (single characters like 'A'). For text, you use string, which is technically a reference type but behaves like a value type in many situations.

C# also supports type inference with the 'var' keyword. When you write var x = 10, the compiler figures out that x is an int based on the assigned value. The variable is still strongly typed — you just let the compiler determine the type for you.`,
    code: `// Explicit type declarations
int health = 100;
double speed = 3.5;
bool isAlive = true;
char grade = 'A';
string playerName = "ShadowBlade";

// Type inference with var
var level = 42;              // compiler infers int
var accuracy = 0.85;         // compiler infers double
var message = "Hello!";      // compiler infers string

// Constants — cannot be changed after declaration
const int MAX_HEALTH = 999;
const double GRAVITY = 9.81;

// Nullable value types
int? mana = null;            // can be null or int
mana = 75;
Console.WriteLine(mana ?? 0); // null-coalescing: 75

// String interpolation
Console.WriteLine($"Player: {playerName}");
Console.WriteLine($"HP: {health} | Speed: {speed}");
Console.WriteLine($"Level {level} | Alive: {isAlive}");`,
    breakdown: `• int health = 100 — Declares an integer variable. 'int' is the type, 'health' is the name, 100 is the value. Must be a whole number.

• double speed = 3.5 — Declares a double-precision floating-point variable for decimal numbers. Use double for most decimal calculations.

• bool isAlive = true — Boolean type, can only hold true or false (lowercase in C#, unlike Python's True/False).

• char grade = 'A' — Single character, must use single quotes. Double quotes are for strings only.

• string playerName = "ShadowBlade" — String type for text. Always uses double quotes in C#.

• var level = 42 — Type inference. The compiler sees 42 and knows this is an int. You cannot reassign a different type later.

• const int MAX_HEALTH = 999 — Constant declaration. The value can never change after this line. Attempting to reassign causes a compile error.

• int? mana = null — The ? makes a value type nullable. Normal int cannot be null, but int? can. Useful when a value might not exist.

• mana ?? 0 — Null-coalescing operator. Returns mana if it's not null, otherwise returns 0. Great for providing defaults.

• $"Player: {playerName}" — String interpolation with the $ prefix. Expressions inside {} are evaluated and inserted into the string.`,
    summary: `C# is strongly typed — every variable must have a type declared explicitly or inferred with 'var'. Value types (int, double, bool, char) store data directly; reference types (string, objects) store references. Use 'const' for unchanging values, '?' for nullable types, and '$' for string interpolation.`
  },
  {
    title: "How Variables & Types works",
    definition: "C# variables work through a two-phase process: declaration (reserving typed memory) and assignment (storing a value). The CLR (Common Language Runtime) manages memory allocation, with value types on the stack and reference types on the heap.",
    explanation: `Under the hood, C#'s type system is managed by the .NET Common Language Runtime (CLR). When you declare a variable, the CLR allocates memory based on the type — an int always gets exactly 4 bytes, a double gets 8 bytes, and so on.

Value types (int, double, bool, struct) are stored on the stack — a fast, automatically managed region of memory. When a value type goes out of scope (like exiting a method), its memory is instantly reclaimed. Assignment of value types creates a complete copy of the data.

Reference types (string, arrays, class instances) work differently. The variable itself (stored on the stack) holds only a memory address pointing to the actual data on the heap. When you assign one reference variable to another, both variables point to the same object in memory — no copy is made.

The CLR enforces type safety at compile time through its type system. This means if you declare int x = 10, you can never assign a string to x later. This catches many bugs before your program even runs. The compiler also handles implicit conversions (int to double is safe) but blocks potentially lossy ones (double to int requires explicit casting).`,
    code: `// Value types — stored on the stack, copied on assignment
int a = 10;
int b = a;        // b gets a COPY of a's value
b = 20;           // changing b does NOT affect a
Console.WriteLine($"a={a}, b={b}"); // a=10, b=20

// Reference types — stored on heap, reference copied
int[] arr1 = { 1, 2, 3 };
int[] arr2 = arr1;   // arr2 points to SAME array
arr2[0] = 99;        // modifies the shared array!
Console.WriteLine(arr1[0]); // 99 — arr1 is affected!

// Implicit conversion (widening — safe, no data loss)
int score = 100;
double precise = score;  // int → double automatically
Console.WriteLine(precise); // 100.0

// Explicit conversion (narrowing — potential data loss)
double pi = 3.14159;
int rounded = (int)pi;   // explicit cast, truncates!
Console.WriteLine(rounded); // 3 (decimal lost)

// Convert class for safe conversions
string numStr = "42";
int parsed = Convert.ToInt32(numStr);
double parsed2 = Convert.ToDouble("3.14");

// TryParse for safe parsing (won't throw exceptions)
bool success = int.TryParse("abc", out int result);
Console.WriteLine($"Success: {success}, Value: {result}");
// Success: False, Value: 0`,
    breakdown: `• int b = a — Value type assignment creates a complete, independent copy. Modifying b never affects a. They occupy separate memory locations on the stack.

• int[] arr2 = arr1 — Reference type assignment copies the reference (memory address), not the data. Both variables now point to the same array on the heap.

• arr2[0] = 99 affecting arr1 — Since both point to the same object, changes through either variable are visible through the other.

• double precise = score — Implicit conversion from int to double. This is safe because double can represent all int values without data loss. The compiler allows this automatically.

• (int)pi — Explicit cast with parentheses. Required because double-to-int loses the decimal portion. The compiler forces you to acknowledge this potential data loss.

• Convert.ToInt32(numStr) — The Convert class handles string-to-number conversions. Throws FormatException if the string isn't a valid number.

• int.TryParse("abc", out int result) — Safe parsing that returns true/false instead of throwing exceptions. The 'out' parameter receives the parsed value (or 0 on failure).`,
    summary: `Value types live on the stack and are copied on assignment — changes to one don't affect the other. Reference types store a pointer to heap data — assignment shares the reference. Implicit conversions happen automatically when safe (int→double); explicit casts are required for potentially lossy conversions (double→int). Use TryParse for safe string-to-number conversion.`
  },
  {
    title: "Variables & Types syntax & usage",
    definition: "C# variable declarations follow the pattern: type name = value. Naming conventions use camelCase for local variables, PascalCase for public members, and ALL_CAPS (or PascalCase) for constants. Type modifiers include const, readonly, var, and nullable (?).",
    explanation: `C# has precise syntax rules for declaring and naming variables. The basic pattern is always: type variableName = initialValue. You can also declare without initializing (int x;) but you must assign a value before reading it — the compiler enforces this with "definite assignment" analysis.

C# naming conventions follow Microsoft's official guidelines: local variables and parameters use camelCase (playerHealth, totalScore), public properties and methods use PascalCase (PlayerHealth, GetScore), private fields often use _camelCase with underscore prefix (_playerHealth), and constants use PascalCase (MaxHealth) — though some teams prefer ALL_CAPS.

Beyond basic var and explicit types, C# offers several type modifiers. 'const' creates compile-time constants that are baked directly into the code. 'readonly' creates runtime constants that can be set in constructors but never changed after. Nullable types (int?) allow value types to represent "no value" with null.

Type conversion in C# happens through several mechanisms: implicit conversion (automatic, safe), explicit casting ((int)value), Convert class methods (Convert.ToInt32), Parse/TryParse for strings, and the 'as' operator for reference types. Each has different use cases and safety guarantees.`,
    code: `// Declaration patterns
int x;               // declare without initializing
x = 10;              // must assign before using
int y = 20;          // declare and initialize together
int a = 1, b = 2;   // multiple same-type declarations

// Naming conventions
int playerHealth = 100;      // camelCase for locals
const int MaxLevel = 99;     // PascalCase for constants
string _privateField = "x";  // _prefix for private fields

// Type keywords and their .NET equivalents
int num1 = 10;         // alias for System.Int32
long bigNum = 9999999L; // System.Int64 (L suffix)
float f = 3.14f;       // System.Single (f suffix required!)
decimal money = 19.99m; // System.Decimal (m suffix, precise)

// var rules — must initialize, type is fixed
var name = "Coder";    // OK: inferred as string
// var unknown;         // ERROR: must initialize with var
// name = 42;           // ERROR: can't change type

// Nullable value types
int? optionalScore = null;
bool hasScore = optionalScore.HasValue; // false
int safeScore = optionalScore ?? -1;    // -1 (default)

// Pattern-based null checking (C# 8+)
if (optionalScore is int actualScore)
{
    Console.WriteLine($"Score: {actualScore}");
}

// String types
string normal = "Hello\\nWorld";    // escape sequences
string verbatim = @"C:\\Users\\Path"; // no escaping needed
string raw = $"Value: {num1}";      // interpolated`,
    breakdown: `• int x; then x = 10 — You can split declaration and assignment, but C# won't let you read x until it's assigned. This prevents uninitialized variable bugs.

• int a = 1, b = 2 — Multiple variables of the same type on one line. Each gets its own value.

• long bigNum = 9999999L — The L suffix tells the compiler this is a long literal, not an int. Without it, large numbers might overflow int range.

• float f = 3.14f — Float requires the f suffix! Without it, 3.14 is treated as a double and won't compile when assigned to float.

• decimal money = 19.99m — Decimal type for financial calculations. The m suffix is required. Decimal has more precision than double for base-10 numbers.

• var name = "Coder" — The compiler infers string type. Once set, name is permanently a string — var doesn't mean dynamic.

• optionalScore.HasValue — Nullable types have a HasValue property (bool) and a Value property (the underlying type). Accessing Value when HasValue is false throws an exception.

• optionalScore is int actualScore — Pattern matching null check. If optionalScore has a value, it's extracted into actualScore for use inside the if block.

• @"C:\\Users\\Path" — Verbatim string literal. The @ disables escape sequence processing, so backslashes are treated literally.`,
    summary: `C# declarations follow type name = value syntax. Use camelCase for locals, PascalCase for publics/constants, _camelCase for private fields. Numeric literals need suffixes: L for long, f for float, m for decimal. 'var' infers types but they remain fixed. Nullable types (?) add HasValue/Value properties and support null-coalescing (??) and pattern matching.`
  },
  {
    title: "Practical examples of Variables & Types",
    definition: "In real C# applications, variables manage game state, user data, configuration, and calculations. Proper type selection affects performance, memory usage, and code safety.",
    explanation: `Real C# applications combine different variable types to model complex systems. Game development, web APIs, and desktop apps all require choosing appropriate types for each piece of data.

In game development, you might use int for discrete values (health, score, ammo), float/double for continuous values (position, velocity, rotation), bool for state flags (isJumping, isInvincible), and string for display text (playerName, questTitle). Choosing the right type prevents bugs and improves performance.

A common pattern in C# is using structs for small value collections (like Vector2 with X and Y coordinates) and classes for larger objects with behavior. Understanding when data should be value-type vs reference-type is a key skill in C# development.

String manipulation is extremely common in C# applications. You'll frequently use interpolation ($"..."), concatenation (+), StringBuilder for loops, and format specifiers for numeric display. The choice between these affects both readability and performance.`,
    code: `// === EXAMPLE 1: RPG Character Sheet ===
string heroName = "Arcane Mage";
int level = 25;
int currentHP = 340;
int maxHP = 500;
double critChance = 0.32;
bool hasShield = true;

// Calculate HP percentage
double hpPercent = (double)currentHP / maxHP * 100;
Console.WriteLine($"[{heroName}] Lv.{level}");
Console.WriteLine($"HP: {currentHP}/{maxHP} ({hpPercent:F1}%)");
Console.WriteLine($"Crit: {critChance:P0} | Shield: {hasShield}");

// === EXAMPLE 2: Inventory System ===
const int MAX_SLOTS = 20;
int usedSlots = 13;
int freeSlots = MAX_SLOTS - usedSlots;
decimal goldCoins = 1_250.75m; // underscores for readability

Console.WriteLine($"Inventory: {usedSlots}/{MAX_SLOTS} slots");
Console.WriteLine($"Gold: {goldCoins:C}"); // currency format

// === EXAMPLE 3: Combat Calculator ===
int baseDamage = 45;
float weaponMultiplier = 1.8f;
int enemyArmor = 20;
bool isCritical = critChance > 0.3;

float rawDamage = baseDamage * weaponMultiplier;
int finalDamage = Math.Max(0, (int)rawDamage - enemyArmor);

if (isCritical)
    finalDamage *= 2;

Console.WriteLine($"Damage: {baseDamage} × {weaponMultiplier}");
Console.WriteLine($"After armor: {finalDamage}");
Console.WriteLine(isCritical ? "CRITICAL HIT!" : "Normal hit");`,
    breakdown: `• (double)currentHP / maxHP * 100 — Cast to double BEFORE division. Without the cast, int/int gives truncated int result (0 for 340/500). The cast ensures floating-point division.

• {hpPercent:F1} — Format specifier: F1 means fixed-point with 1 decimal place. Shows "68.0" instead of "68.00000000001".

• {critChance:P0} — P0 formats as percentage with 0 decimal places. 0.32 displays as "32%". C# handles the multiplication by 100.

• 1_250.75m — Numeric separators (underscores) improve readability of large numbers. They're ignored by the compiler. The m suffix makes it a decimal literal.

• {goldCoins:C} — Currency format specifier. Displays according to system culture (e.g., "$1,250.75" in US locale).

• Math.Max(0, ...) — Ensures damage never goes negative. If armor exceeds raw damage, the result is clamped to 0 instead of going negative.

• isCritical ? "CRITICAL HIT!" : "Normal hit" — Ternary operator for inline conditional. condition ? valueIfTrue : valueIfFalse. Cleaner than a full if/else for simple choices.`,
    summary: `Real C# code combines value types (int, float, bool) for game state, decimal for financial precision, and strings with format specifiers for display. Key patterns include casting before division to avoid truncation, using numeric separators for readability, format strings (F, P, C) for professional output, and Math methods for safe calculations.`
  },
  {
    title: "Variables & Types best practices",
    definition: "C# best practices include using the most specific type possible, preferring var for readability when the type is obvious, using const/readonly for immutable data, and following .NET naming conventions consistently.",
    explanation: `Writing professional C# means choosing types deliberately and following established conventions. The .NET ecosystem has well-defined standards that every C# developer should follow.

Use the most appropriate type for your data. Don't use double for money (use decimal). Don't use int for a value that could be null (use int?). Don't use string for a value that should be one of a fixed set (use an enum). Choosing the right type makes your code self-documenting and prevents entire categories of bugs.

The var keyword should be used when the type is obvious from context: var list = new List<string>() is fine because the type is clear from 'new'. But var result = Calculate() is less clear — using the explicit type helps readers understand what Calculate returns.

For immutability, prefer const for compile-time values (like MAX_HEALTH = 100) and readonly for values determined at runtime (like a connection string from config). Making things immutable by default prevents accidental mutation and makes code easier to reason about.`,
    code: `// DO: Use specific types for their purpose
decimal price = 49.99m;          // money = decimal
int quantity = 3;                // counts = int
bool inStock = true;             // flags = bool
DateTime created = DateTime.Now; // dates = DateTime

// DON'T: Wrong type choices
// double money = 49.99;  // BAD: floating point errors!
// string isActive = "true"; // BAD: use bool!

// DO: Use var when type is obvious
var players = new List<string>(); // type clear from 'new'
var timer = new Stopwatch();      // type clear from 'new'
var lookup = new Dictionary<string, int>();

// DON'T: Use var when type isn't obvious
// var result = GetData();  // What type is result??
int result = GetData();     // Much clearer!

// DO: Use const and readonly appropriately
const int MAX_RETRIES = 3;        // compile-time constant
const string API_VERSION = "v2";  // never changes

// readonly for runtime constants
public class GameConfig
{
    public readonly int Seed;     // set once in constructor
    public GameConfig(int seed) => Seed = seed;
}

// DO: Use meaningful names with conventions
int playerHealthPoints = 100;    // descriptive camelCase
bool isGameOver = false;         // bool prefix: is/has/can
string errorMessage = "";        // clear purpose

// DO: Use null-safety patterns
int? optionalValue = GetNullableInt();
int safeValue = optionalValue ?? 0;      // provide default
int safeValue2 = optionalValue.GetValueOrDefault(0);`,
    breakdown: `• decimal price = 49.99m — Decimal type stores base-10 numbers exactly. Double can't represent 0.1 precisely (try 0.1 + 0.2 == 0.3 with doubles — it's false!). Always use decimal for money.

• var players = new List<string>() — Good var usage. The 'new List<string>()' makes the type completely obvious. var reduces redundancy without reducing clarity.

• int result = GetData() — Explicit type when var would be unclear. Readers can immediately see what type GetData() returns without looking up the method signature.

• const int MAX_RETRIES = 3 — Constants are replaced by their values at compile time (inlined). Use for values that are truly fixed and known at compile time.

• readonly int Seed — Can only be set in the constructor or field initializer. After construction, it's immutable. Use for values determined at runtime that shouldn't change.

• bool isGameOver — Naming booleans with is/has/can prefix makes code read like English: if (isGameOver), if (hasPermission), if (canAttack).

• optionalValue ?? 0 — Null-coalescing provides a safe default. This pattern eliminates NullReferenceException for nullable types.

• GetValueOrDefault(0) — Alternative to ?? for nullable types. Does the same thing but is more explicit about intent.`,
    summary: `Use decimal for money, DateTime for dates, and bool (not string) for flags. Use var when the type is obvious from context, explicit types when it's not. Prefer const for compile-time constants and readonly for runtime immutables. Name booleans with is/has/can prefixes. Always handle nullable types safely with ?? or pattern matching.`
  }
];
