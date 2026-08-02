// Pre-written lessons for C# Module: Methods & Parameters

export const csharpMethodsLessons = [
  {
    title: "What is Methods & Parameters?",
    definition: "Methods are reusable blocks of code that perform specific tasks. Parameters are the inputs a method accepts, and the return value is its output. Methods enable code organization, reuse, and abstraction.",
    explanation: `Methods (also called functions in other languages) are the building blocks of organized code. Instead of writing the same logic repeatedly, you define it once in a method and call it whenever needed.

A method has four key parts: a return type (what it gives back), a name (how you call it), parameters (what it needs), and a body (what it does). For example, int CalculateDamage(int base, float mult) takes two inputs and returns an integer.

C# methods live inside classes or structs — they cannot exist at the top level like in Python or JavaScript. They can be static (belonging to the class itself) or instance (belonging to an object). The Main method that starts every C# program is static.

Parameters pass data into methods. C# supports several parameter modes: regular (pass by value), ref (pass by reference), out (output only), in (read-only reference), and params (variable-length argument lists). Each serves different needs for how data flows between caller and method.`,
    code: `// Basic method with return value
static int CalculateDamage(int baseDmg, double multiplier)
{
    return (int)(baseDmg * multiplier);
}

// Expression-bodied method (one-liner)
static double GetCritChance(int luck) => luck / 100.0;

// Void method — performs action, returns nothing
static void PrintBattleResult(string hero, int damage)
{
    Console.WriteLine($"{hero} dealt {damage} damage!");
}

// Method with default parameters
static int Heal(int currentHP, int maxHP, int amount = 50)
{
    return Math.Min(currentHP + amount, maxHP);
}

// Using the methods
int dmg = CalculateDamage(50, 1.8);
PrintBattleResult("Warrior", dmg);

int hp = 60;
hp = Heal(hp, 100);       // uses default: 50
hp = Heal(hp, 100, 30);   // explicit: 30
Console.WriteLine($"HP after heals: {hp}");

// Named parameters for clarity
int result = CalculateDamage(
    baseDmg: 75,
    multiplier: 2.5
);`,
    breakdown: `• static int CalculateDamage(...) — 'static' means it belongs to the class, not an instance. 'int' is the return type. Parameters are typed with their names.

• return (int)(baseDmg * multiplier) — Casts the double result to int (truncating decimals) and returns it to the caller.

• static double GetCritChance(int luck) => luck / 100.0 — Expression-bodied syntax. The => replaces { return ...; } for single-expression methods. Cleaner for simple calculations.

• static void PrintBattleResult(...) — 'void' means this method returns nothing. It performs an action (printing) but doesn't produce a value for the caller to use.

• int amount = 50 — Default parameter value. If the caller doesn't provide 'amount', it uses 50. Default parameters must be the last ones in the list.

• Heal(hp, 100) — Calling without the optional parameter. The compiler fills in the default value (50) automatically.

• baseDmg: 75, multiplier: 2.5 — Named arguments. Makes calls with many parameters more readable. Order doesn't matter when using names.`,
    summary: `Methods encapsulate reusable logic with a return type, name, and parameters. Use void for no return value, expression-bodied (=>) for one-liners. Default parameters provide optional values. Named arguments improve readability at call sites. Methods must live inside classes/structs in C#.`
  },
  {
    title: "How Methods & Parameters works",
    definition: "When a method is called, the CLR creates a stack frame containing parameters and local variables. Value types are copied; reference types pass their pointer. The method executes, then its stack frame is popped and control returns to the caller.",
    explanation: `Every method call creates a new stack frame — a section of the call stack that holds the method's parameters, local variables, and return address. When the method finishes, its frame is destroyed and execution returns to where it was called.

For value type parameters (int, double, struct), C# copies the value into the method's stack frame. Changes inside the method don't affect the original variable. This is "pass by value" — the default behavior in C#.

For reference type parameters (string, arrays, objects), C# copies the reference (memory address), not the object. The method can modify the object's properties through this reference. However, reassigning the parameter to a new object only changes the local copy of the reference.

The ref, out, and in keywords change parameter passing behavior. ref passes the variable itself (not a copy) — changes inside the method modify the original. out is like ref but the method must assign a value before returning. in passes by reference but read-only — for efficiency without risk of modification.`,
    code: `// Pass by value — original unchanged
static void DoubleValue(int x)
{
    x *= 2; // only modifies local copy
}
int num = 10;
DoubleValue(num);
Console.WriteLine(num); // still 10!

// ref parameter — modifies original
static void DoubleRef(ref int x)
{
    x *= 2; // modifies the caller's variable
}
DoubleRef(ref num);
Console.WriteLine(num); // now 20!

// out parameter — must assign, returns extra values
static bool TryDivide(int a, int b, out int result)
{
    if (b == 0) { result = 0; return false; }
    result = a / b;
    return true;
}
if (TryDivide(10, 3, out int quotient))
    Console.WriteLine($"Result: {quotient}");

// in parameter — read-only reference (performance)
static double Distance(in Vector3 a, in Vector3 b)
{
    // 'in' prevents copying large structs
    // but a and b cannot be modified here
    double dx = b.X - a.X;
    double dy = b.Y - a.Y;
    return Math.Sqrt(dx * dx + dy * dy);
}

// params — variable number of arguments
static int Sum(params int[] numbers)
{
    int total = 0;
    foreach (int n in numbers)
        total += n;
    return total;
}
Console.WriteLine(Sum(1, 2, 3));      // 6
Console.WriteLine(Sum(5, 10, 15, 20)); // 50`,
    breakdown: `• DoubleValue(num) — num is copied into x. Changing x inside the method has no effect on num. This is the default behavior for value types.

• DoubleRef(ref num) — The 'ref' keyword passes the variable itself. x IS num — they refer to the same memory location. Changes to x directly change num.

• out int result — out parameters are write-only from the caller's perspective. The method MUST assign a value before returning. Used for methods that need to return multiple values.

• TryDivide(10, 3, out int quotient) — Inline declaration of the out variable (C# 7+). The variable is declared right at the call site.

• in Vector3 a — Passes by reference (no copy) but read-only. Used for large structs where copying is expensive but modification isn't needed.

• params int[] numbers — Allows any number of arguments. The compiler packages them into an array. Must be the last parameter.`,
    summary: `Value types are copied when passed to methods (changes don't affect originals). ref passes the variable itself for modification. out requires assignment and enables multiple return values. in passes by reference read-only for performance. params allows variable argument counts packed into an array.`
  },
  {
    title: "Methods & Parameters syntax & usage",
    definition: "C# method syntax includes access modifiers, static/instance distinction, overloading, local functions, extension methods, and expression-bodied members. Methods can return tuples, use generic type parameters, and be async.",
    explanation: `C# offers rich method declaration syntax. Access modifiers (public, private, protected, internal) control visibility. Static methods belong to the class; instance methods require an object. Overloading lets you define multiple methods with the same name but different parameters.

Method overloading is when multiple methods share a name but differ in their parameter list. The compiler chooses the correct overload based on the arguments you pass. This enables intuitive APIs — like Console.WriteLine accepting string, int, double, etc.

Local functions (C# 7+) are methods defined inside other methods. They can access the enclosing method's variables (closure) and are invisible outside. Use them for helper logic that's only relevant to one specific method.

Extension methods add new methods to existing types without modifying their source code. They're static methods in static classes, with 'this' before the first parameter. This is how LINQ methods (Where, Select) are added to IEnumerable.`,
    code: `// Method overloading — same name, different params
static int Attack(int baseDmg)
    => baseDmg;
static int Attack(int baseDmg, double crit)
    => (int)(baseDmg * crit);
static int Attack(int baseDmg, int bonus, bool isSuper)
    => isSuper ? (baseDmg + bonus) * 3 : baseDmg + bonus;

// Tuple return — multiple values
static (int damage, bool isCrit) RollAttack(int power)
{
    bool crit = new Random().Next(5) == 0;
    int dmg = crit ? power * 2 : power;
    return (dmg, crit);
}
var (damage, wasCrit) = RollAttack(50);

// Local function — helper inside a method
static void RunBattle(int rounds)
{
    int score = 0;
    for (int i = 0; i < rounds; i++)
        score += RoundScore(i);
    Console.WriteLine($"Total: {score}");

    // Local function (closure over 'rounds')
    int RoundScore(int round)
        => (round + 1) * 10 * rounds;
}

// Extension method
static class StringExtensions
{
    public static string Shout(this string s)
        => s.ToUpper() + "!!!";

    public static string Repeat(this string s, int count)
        => string.Concat(Enumerable.Repeat(s, count));
}
// Usage: called as if it's a method on string
Console.WriteLine("attack".Shout());    // ATTACK!!!
Console.WriteLine("ha".Repeat(3));      // hahaha`,
    breakdown: `• Three Attack overloads — The compiler picks which one to call based on the arguments. Attack(50) calls the first. Attack(50, 2.0) calls the second. Clear, intuitive API.

• (int damage, bool isCrit) — Tuple return type. Methods can return multiple values packaged in a tuple. Named tuple elements act like documentation.

• var (damage, wasCrit) = RollAttack(50) — Tuple deconstruction. Extracts both returned values into separate variables in one line.

• int RoundScore(int round) => ... — Local function defined inside RunBattle. Can access 'rounds' from the enclosing scope. Not visible outside RunBattle.

• public static string Shout(this string s) — Extension method. The 'this' before the first parameter makes it callable as s.Shout() on any string. Must be in a static class.

• "attack".Shout() — Calling the extension method as if it were a built-in method on string. The compiler rewrites this to StringExtensions.Shout("attack").`,
    summary: `Overloading provides multiple methods with the same name but different parameters. Tuple returns enable multiple return values with named elements. Local functions encapsulate helpers within methods and can access enclosing variables. Extension methods add functionality to existing types using 'this' keyword on the first parameter.`
  },
  {
    title: "Practical examples of Methods & Parameters",
    definition: "In real applications, methods encapsulate game mechanics, data transformations, validation logic, and API operations. Well-designed methods are small, focused, and testable.",
    explanation: `Professional code is built from well-designed methods that each do one thing clearly. A combat system might have methods like CalculateDamage, ApplyArmor, CheckDodge, and ApplyCritical — each handling one aspect of the calculation.

Good method design follows the Single Responsibility Principle: each method should have one reason to change. If a method does input validation AND calculation AND output formatting, it has three responsibilities and should be split into three methods.

Return values make methods composable — you can chain results from one method into another. This creates a pipeline where each step is independently testable and reusable. Methods that modify global state are harder to test and reason about.

Parameter design matters too. Methods with too many parameters (more than 3-4) are hard to use correctly. Consider grouping related parameters into objects, using builder patterns, or splitting the method into smaller ones.`,
    code: `// === EXAMPLE 1: Combat Calculation Pipeline ===
static int CalculateBaseDamage(int str, int weaponDmg)
    => str / 2 + weaponDmg;

static int ApplyElement(int dmg, string atkElement, string defElement)
{
    if (atkElement == defElement) return dmg / 2;  // resist
    var weaknesses = new Dictionary<string, string>
    {
        ["fire"] = "ice", ["ice"] = "lightning",
        ["lightning"] = "fire"
    };
    return weaknesses.GetValueOrDefault(atkElement) == defElement
        ? dmg * 2 : dmg;
}

static (int finalDmg, string msg) ApplyCritical(int dmg, double critRate)
{
    if (new Random().NextDouble() < critRate)
        return (dmg * 2, "CRITICAL HIT!");
    return (dmg, "Hit!");
}

// Pipeline usage
int base_ = CalculateBaseDamage(str: 30, weaponDmg: 45);
int elemental = ApplyElement(base_, "fire", "ice");
var (final, message) = ApplyCritical(elemental, 0.25);
Console.WriteLine($"{message} {final} damage!");

// === EXAMPLE 2: Stat Builder with Fluent API ===
class CharacterBuilder
{
    private int _hp = 100, _atk = 10, _def = 10;
    private string _name = "Hero";

    public CharacterBuilder WithName(string n)
    { _name = n; return this; }
    public CharacterBuilder WithHP(int hp)
    { _hp = hp; return this; }
    public CharacterBuilder WithAtk(int atk)
    { _atk = atk; return this; }

    public void Print() =>
        Console.WriteLine($"{_name}: HP={_hp} ATK={_atk} DEF={_def}");
}

new CharacterBuilder()
    .WithName("Dark Knight")
    .WithHP(500)
    .WithAtk(85)
    .Print();`,
    breakdown: `• Each method does ONE thing — CalculateBaseDamage handles raw damage, ApplyElement handles elemental modifiers, ApplyCritical handles crit chance. Each is independently testable.

• Dictionary for element lookup — Instead of a long if/else chain, the weakness table is data-driven. Easy to extend by adding entries.

• GetValueOrDefault(atkElement) == defElement — Safe dictionary lookup. Returns null/default if key doesn't exist, preventing KeyNotFoundException.

• Pipeline: base → elemental → final — Each method takes input and returns output. Results flow through the pipeline. Any step can be replaced or modified independently.

• return this in builder methods — The fluent API pattern. Each method returns the object itself, enabling .Method1().Method2().Method3() chaining.

• new CharacterBuilder().WithName("Dark Knight").WithHP(500) — Builder pattern in action. Readable, flexible, and you only set the properties you need.`,
    summary: `Design methods to do one thing (Single Responsibility). Use pipelines where output of one method feeds into the next. Dictionaries replace long conditional chains for lookup-based logic. Builder patterns with fluent APIs (return this) create readable, flexible object construction. Each method in a pipeline is independently testable and replaceable.`
  },
  {
    title: "Methods & Parameters best practices",
    definition: "Method best practices include keeping methods short and focused, using meaningful names, limiting parameters, preferring pure functions, and documenting with XML comments.",
    explanation: `The best methods are short (under 20 lines), focused (one purpose), and predictable (same inputs always give same outputs). These properties make code easier to read, test, maintain, and debug.

Method naming should describe WHAT the method does, not HOW it does it. CalculateDamage is good. LoopThroughArrayAndMultiply is bad. Use verbs for actions (Get, Calculate, Create, Validate) and question words for booleans (Is, Has, Can).

Pure functions — methods that depend only on their parameters and produce no side effects — are the easiest to test and reason about. They always return the same result for the same inputs and don't modify external state. Prefer them whenever possible.

Use XML documentation comments (///) on public methods. They provide IntelliSense tooltips in IDEs, can generate documentation websites, and serve as always-up-to-date documentation right next to the code.`,
    code: `// DO: Short, focused methods with clear names
/// <summary>Calculates final damage after all modifiers.</summary>
/// <param name="baseDmg">Raw damage before modifiers</param>
/// <param name="armor">Target's armor value</param>
/// <returns>Final damage dealt (minimum 1)</returns>
static int CalculateFinalDamage(int baseDmg, int armor)
    => Math.Max(1, baseDmg - armor);

// DO: Pure functions — no side effects
static double CalculateXPMultiplier(int streak, bool isWeekend)
    => (1.0 + streak * 0.1) * (isWeekend ? 1.5 : 1.0);

// DO: Use guard clauses for validation
static string GetRank(int score)
{
    if (score < 0)
        throw new ArgumentException("Score cannot be negative");
    if (score >= 1000) return "Legend";
    if (score >= 500) return "Master";
    if (score >= 100) return "Veteran";
    return "Rookie";
}

// DO: Limit parameters (max 3-4)
// BAD: Too many parameters
// void Create(string n, int hp, int mp, int str, int def, int spd)

// GOOD: Group into a class/struct
record CharStats(int HP, int MP, int STR, int DEF, int SPD);
static void CreateCharacter(string name, CharStats stats)
{
    Console.WriteLine($"{name}: HP={stats.HP} STR={stats.STR}");
}

// DO: Return results instead of modifying parameters
// BAD: modifies external state
// static void AddBonus(ref int hp) { hp += 50; }

// GOOD: returns new value
static int AddBonus(int hp, int bonus = 50) => hp + bonus;

// DO: Use descriptive bool-returning method names
static bool IsAlive(int hp) => hp > 0;
static bool CanAttack(int mp, int cost) => mp >= cost;
static bool HasItem(List<string> inv, string item)
    => inv.Contains(item);`,
    breakdown: `• /// XML comments — Triple-slash comments generate IntelliSense documentation. <summary> describes what, <param> describes inputs, <returns> describes output.

• Pure function CalculateXPMultiplier — Depends only on its inputs, no Console.WriteLine or state modification. Easy to test: same inputs always produce same output.

• Guard clauses in GetRank — Validate input first, throw on invalid data. Then the main logic flows top-to-bottom without nesting. Each return exits immediately.

• record CharStats(...) — Records group related data with minimal syntax. Automatically generates equality, ToString, and deconstruction. Perfect for parameter objects.

• Return results instead of ref modification — AddBonus(hp, 50) is clearer and doesn't mutate. The caller decides what to do with the result.

• IsAlive, CanAttack, HasItem — Boolean methods named as questions. Reading 'if (IsAlive(hp))' is like reading English. The Is/Can/Has prefix signals a boolean return.`,
    summary: `Keep methods short, focused, and pure. Use XML comments for public APIs. Limit parameters to 3-4; group excess into records/classes. Return values instead of modifying parameters with ref. Name boolean methods as questions (Is/Can/Has). Guard clauses validate inputs early and keep logic flat.`
  }
];
