// Pre-written lessons for C# Module: Loops & Iteration

export const csharpLoopsLessons = [
  {
    title: "What is Loops & Iteration?",
    definition: "Loops in C# repeat a block of code multiple times. The main loop types are for (counted iteration), while (condition-based), do-while (execute-first), and foreach (collection iteration).",
    explanation: `Loops are fundamental control structures that let you execute code repeatedly without writing it multiple times. Instead of writing Console.WriteLine() ten times, you write a loop that runs it ten times.

The for loop is ideal when you know how many iterations you need. It has three parts: initialization (int i = 0), condition (i < 10), and increment (i++). The loop runs as long as the condition is true.

The while loop repeats as long as a condition remains true. Use it when you don't know in advance how many iterations are needed — like reading user input until they type "quit" or searching until you find what you need.

The foreach loop is designed specifically for iterating over collections (arrays, lists, dictionaries). It automatically handles the iteration variable and bounds — you can't go out of bounds with foreach.`,
    code: `// For loop — when you know the count
for (int i = 0; i < 5; i++)
{
    Console.WriteLine($"Attack #{i + 1}!");
}

// While loop — condition-based repetition
int enemyHP = 100;
int attackPower = 35;
int turns = 0;
while (enemyHP > 0)
{
    enemyHP -= attackPower;
    turns++;
    Console.WriteLine($"Turn {turns}: Enemy HP = {Math.Max(0, enemyHP)}");
}
Console.WriteLine($"Victory in {turns} turns!");

// Do-while — always executes at least once
string input;
do
{
    Console.Write("Enter command (quit to exit): ");
    input = Console.ReadLine() ?? "";
} while (input != "quit");

// Foreach — iterate collections
string[] inventory = { "Sword", "Shield", "Potion", "Bow" };
foreach (string item in inventory)
{
    Console.WriteLine($"  • {item}");
}

// Foreach with index (using LINQ)
foreach (var (item, index) in inventory.Select((v, i) => (v, i)))
{
    Console.WriteLine($"  [{index}] {item}");
}`,
    breakdown: `• for (int i = 0; i < 5; i++) — Three parts: declare counter, set limit, define increment. i++ means add 1 after each iteration. Loop runs for i = 0, 1, 2, 3, 4.

• enemyHP -= attackPower — Subtract attack from HP each iteration. The while loop continues until HP drops to 0 or below.

• Math.Max(0, enemyHP) — Clamps display to 0 minimum. The actual variable might go negative, but we show 0 to the user.

• do { ... } while (input != "quit") — The do-while guarantees at least one execution. The condition is checked AFTER the block runs. Perfect for "ask at least once" patterns.

• foreach (string item in inventory) — Iterates every element without needing an index variable. Cleaner and safer than for loops for collection traversal.

• inventory.Select((v, i) => (v, i)) — LINQ trick to get both value and index in foreach. Creates tuples of (value, index) that you can deconstruct.`,
    summary: `Use for when you know the iteration count, while when you have a condition, do-while when you need at least one execution, and foreach for collections. For loops have init/condition/increment parts. While checks before executing; do-while checks after. Foreach handles bounds automatically and is the safest way to iterate collections.`
  },
  {
    title: "How Loops & Iteration works",
    definition: "Loops work by repeatedly evaluating a condition and executing a code block. The CLR translates loops into conditional jump instructions — compare, then jump back to the start or forward past the loop body.",
    explanation: `At the machine level, all loops become the same thing: a comparison followed by a conditional jump. A for loop compiles to almost identical code as an equivalent while loop — the structural difference is purely for programmer convenience.

The foreach loop has special behavior. For arrays, the compiler converts it to an indexed for loop (fastest). For other collections implementing IEnumerable<T>, it calls GetEnumerator() and uses MoveNext()/Current to traverse elements. This abstraction lets foreach work with any iterable type.

Loop performance matters in hot paths (code that runs thousands of times per frame). For loops with array indexing are the fastest because the JIT compiler can eliminate bounds checks. Foreach on arrays is equally fast. But foreach on non-array collections involves enumerator allocation (though the JIT often optimizes this away).

Break and continue alter loop flow. Break immediately exits the entire loop. Continue skips the rest of the current iteration and jumps to the next one. These give you fine-grained control over which iterations execute and when to stop.`,
    code: `// Break — exit loop entirely
int[] damage = { 15, 22, 8, 45, 12, 30 };
int totalDmg = 0;
foreach (int d in damage)
{
    if (totalDmg + d > 80)
    {
        Console.WriteLine("Damage cap reached!");
        break; // stop processing
    }
    totalDmg += d;
}
Console.WriteLine($"Total: {totalDmg}");

// Continue — skip current iteration
for (int i = 0; i < 10; i++)
{
    if (i % 2 == 0) continue; // skip even numbers
    Console.Write($"{i} "); // prints: 1 3 5 7 9
}

// Nested loops with labeled break (using flag)
bool found = false;
int[,] grid = { {1,2,3}, {4,5,6}, {7,8,9} };
for (int row = 0; row < 3 && !found; row++)
{
    for (int col = 0; col < 3 && !found; col++)
    {
        if (grid[row, col] == 5)
        {
            Console.WriteLine($"Found at [{row},{col}]");
            found = true;
        }
    }
}

// Performance: for vs foreach on arrays
int[] numbers = Enumerable.Range(0, 1000).ToArray();

// Both compile to essentially the same IL for arrays
for (int i = 0; i < numbers.Length; i++)
    numbers[i] *= 2;

foreach (ref int n in numbers.AsSpan())
    n *= 2; // modify in-place with Span`,
    breakdown: `• if (totalDmg + d > 80) break — Break exits the foreach entirely. Remaining elements are not processed. Use when you've found what you need or hit a limit.

• if (i % 2 == 0) continue — Continue skips to the next iteration immediately. The increment (i++) still executes. Code below continue in the loop body is skipped for this iteration.

• !found in loop conditions — C# doesn't have labeled breaks for nested loops. Using a boolean flag in both loop conditions is the standard pattern for breaking out of nested loops.

• int[,] grid — 2D array (multidimensional). Accessed with grid[row, col]. Nested loops iterate rows and columns.

• numbers.AsSpan() — Span<T> enables high-performance array access. ref int n in the foreach lets you modify elements in place without indexing.

• Enumerable.Range(0, 1000).ToArray() — Creates an array of 0-999. Useful for generating test data or sequential collections.`,
    summary: `Break exits a loop entirely; continue skips to the next iteration. For nested loop breaking, use boolean flags in conditions. Arrays get optimized foreach (converted to indexed loop by JIT). Span<T> with ref foreach enables in-place modification. All loop types compile to similar jump instructions — choose based on readability.`
  },
  {
    title: "Loops & Iteration syntax & usage",
    definition: "C# loop syntax includes for, foreach, while, do-while, and LINQ query expressions. Modern C# adds async iteration (await foreach), Span-based loops, and parallel loop constructs.",
    explanation: `Each loop type in C# has its syntax pattern and ideal use case. The for loop is most flexible with its three-part header. Foreach is cleanest for collections. While handles indefinite iteration. Do-while guarantees first execution.

Modern C# adds powerful iteration patterns. LINQ methods (Where, Select, ForEach) provide functional-style iteration. Parallel.For and Parallel.ForEach distribute work across CPU cores. await foreach handles asynchronous streams.

Loop variable scope is important. Variables declared in a for loop's initializer (int i = 0) exist only inside the loop. Foreach variables are read-only by default — you can't modify the iteration variable. These rules prevent common bugs.

The yield keyword creates lazy iterators. A method with yield return produces elements one at a time as they're requested by a foreach loop, rather than computing all results upfront. This enables infinite sequences and memory-efficient processing.`,
    code: `// Standard for loop variations
for (int i = 10; i >= 0; i--)   // countdown
    Console.Write($"{i} ");

for (int i = 0; i < 100; i += 5)  // step by 5
    Console.Write($"{i} ");

// Infinite loop with break condition
int attempts = 0;
while (true)
{
    attempts++;
    if (new Random().Next(6) + 1 == 6) // roll a 6
    {
        Console.WriteLine($"Rolled 6 after {attempts} tries!");
        break;
    }
}

// LINQ-style iteration (functional)
var items = new[] { "Sword", "Bow", "Staff", "Axe" };
items.Where(i => i.Length <= 3)
     .Select(i => i.ToUpper())
     .ToList()
     .ForEach(i => Console.WriteLine(i));

// Yield return — lazy iteration
IEnumerable<int> FibSequence(int count)
{
    int a = 0, b = 1;
    for (int i = 0; i < count; i++)
    {
        yield return a;
        (a, b) = (b, a + b);
    }
}
foreach (int fib in FibSequence(10))
    Console.Write($"{fib} "); // 0 1 1 2 3 5 8 13 21 34

// Parallel loop for CPU-intensive work
Parallel.For(0, 1000, i =>
{
    // runs on multiple threads simultaneously
    double result = Math.Sqrt(i) * Math.PI;
});`,
    breakdown: `• for (int i = 10; i >= 0; i--) — Countdown loop. Starts at 10, decrements each iteration, stops when i goes below 0.

• for (int i = 0; i < 100; i += 5) — Custom step size. Instead of i++, we add 5 each time. Loop visits 0, 5, 10, 15, ... 95.

• while (true) with break — Infinite loop pattern. Runs forever until the break condition is met. Common for event loops and retry patterns.

• items.Where(i => i.Length <= 3) — LINQ filter. Returns only items matching the predicate. Like a foreach with an if condition built in.

• .Select(i => i.ToUpper()) — LINQ transform. Applies a function to each element. Returns a new sequence of transformed values.

• yield return a — Produces one value at a time. The method pauses here and resumes when the next value is requested. No array is created in memory.

• (a, b) = (b, a + b) — Tuple swap and update in one line. Both assignments happen simultaneously (the right side is evaluated before assignment).

• Parallel.For(0, 1000, ...) — Distributes iterations across CPU cores. Each iteration runs independently on different threads. Great for CPU-bound work.`,
    summary: `For loops support custom start/end/step. while(true) with break handles indefinite loops. LINQ methods (Where, Select) provide declarative filtering and transformation. yield return creates lazy sequences that produce values on demand. Parallel.For distributes CPU-intensive iterations across multiple cores.`
  },
  {
    title: "Practical examples of Loops & Iteration",
    definition: "Loops in real applications process data collections, implement game mechanics (spawn waves, animations), handle retry logic, and build complex output like tables and reports.",
    explanation: `Every real application uses loops extensively. Games use them for update cycles, enemy spawning, and particle systems. Web apps use them to process request batches, render lists, and aggregate data. CLI tools use them for file processing and data transformation.

A common game pattern is the wave spawner — a loop that creates enemies in groups with increasing difficulty. Another is the animation loop that updates positions frame by frame until a destination is reached.

Data processing often involves nested loops: iterate rows, and for each row iterate columns. Or iterate a collection and accumulate results into a summary. These patterns appear in reporting, analytics, and batch operations.

Retry loops handle transient failures gracefully. Instead of crashing on the first network timeout or file lock, a retry loop attempts the operation multiple times with increasing delays before giving up.`,
    code: `// === EXAMPLE 1: Wave Spawner ===
int totalEnemies = 0;
for (int wave = 1; wave <= 5; wave++)
{
    int enemyCount = wave * 3; // more enemies each wave
    int enemyHP = 50 + wave * 25;
    Console.WriteLine($"--- Wave {wave} ---");
    for (int e = 1; e <= enemyCount; e++)
    {
        Console.WriteLine($"  Spawned enemy {e} (HP: {enemyHP})");
        totalEnemies++;
    }
}
Console.WriteLine($"Total spawned: {totalEnemies}");

// === EXAMPLE 2: Inventory Search ===
var inventory = new (string Name, int Qty, string Type)[]
{
    ("Health Potion", 5, "consumable"),
    ("Iron Sword", 1, "weapon"),
    ("Mana Potion", 3, "consumable"),
    ("Steel Shield", 1, "armor"),
    ("Fire Scroll", 2, "consumable"),
};

Console.WriteLine("=== Consumables ===");
int consumableCount = 0;
foreach (var item in inventory)
{
    if (item.Type != "consumable") continue;
    Console.WriteLine($"  {item.Name} x{item.Qty}");
    consumableCount += item.Qty;
}
Console.WriteLine($"  Total: {consumableCount} items");

// === EXAMPLE 3: Retry with Exponential Backoff ===
int maxRetries = 5;
for (int attempt = 1; attempt <= maxRetries; attempt++)
{
    bool success = new Random().Next(3) == 0; // 33% chance
    if (success)
    {
        Console.WriteLine($"Connected on attempt {attempt}!");
        break;
    }
    int delay = (int)Math.Pow(2, attempt) * 100;
    Console.WriteLine($"Attempt {attempt} failed. Retry in {delay}ms");
    Thread.Sleep(delay);
    if (attempt == maxRetries)
        Console.WriteLine("All retries exhausted!");
}`,
    breakdown: `• wave * 3 — Enemy count scales with wave number. Wave 1 has 3 enemies, wave 5 has 15. Simple linear difficulty scaling.

• 50 + wave * 25 — Enemy HP also scales. Creates progressively harder waves without complex algorithms.

• new (string Name, int Qty, string Type)[] — Array of value tuples. Lightweight way to store structured data without defining a class. Good for small, local collections.

• if (item.Type != "consumable") continue — Filters within a foreach using continue. Only consumables are printed; others skip to the next iteration.

• consumableCount += item.Qty — Accumulator pattern. Builds up a total across iterations. Common for summing, counting, or concatenating.

• Math.Pow(2, attempt) * 100 — Exponential backoff: delays double each retry (200ms, 400ms, 800ms, 1600ms, 3200ms). Prevents overwhelming a failed server.

• if (attempt == maxRetries) — After-loop detection within the loop. Since break exits on success, reaching the max attempt means all retries failed.`,
    summary: `Nested loops with scaling parameters create wave-based spawning systems. Continue filters elements within foreach for selective processing. Accumulator patterns (sum += value) aggregate results across iterations. Exponential backoff (delay doubles each retry) is the standard pattern for handling transient failures in network operations.`
  },
  {
    title: "Loops & Iteration best practices",
    definition: "Loop best practices include minimizing work inside loops, avoiding allocation in hot loops, preferring foreach over manual indexing, using LINQ for declarative operations, and being careful with async in loops.",
    explanation: `Efficient and correct loops require attention to performance, readability, and common pitfalls. The most important rule: keep loop bodies simple and fast, especially in code that runs frequently.

Avoid allocating objects inside tight loops. Each allocation creates garbage that the GC must eventually collect, causing pauses. Pre-allocate outside the loop, reuse objects, or use value types (struct, Span<T>) that live on the stack.

Prefer foreach over manual for loops for collections. Foreach is self-documenting (you're processing each element), prevents off-by-one errors, and the JIT optimizes it to the same performance as indexed access for arrays.

Use LINQ for simple filtering, transformation, and aggregation. But avoid LINQ in performance-critical loops — it creates enumerator objects and delegate allocations. For hot paths, manual loops with pre-allocated buffers are faster.`,
    code: `// DO: Cache collection length outside the loop
var enemies = GetEnemies(); // expensive call
int count = enemies.Count;  // cache once
for (int i = 0; i < count; i++)
    Process(enemies[i]);

// DON'T: Call Count/Length in condition (recalculated)
// for (int i = 0; i < GetEnemies().Count; i++) // BAD!

// DO: Pre-allocate outside loops
var sb = new StringBuilder(1024); // pre-sized
foreach (var item in inventory)
    sb.AppendLine(item.Name);

// DON'T: Allocate inside loops
// foreach (var item in inventory)
//     results.Add(new string(item.Name.ToCharArray())); // BAD

// DO: Use LINQ for readability (non-hot paths)
var highDamage = weapons
    .Where(w => w.Damage > 50)
    .OrderByDescending(w => w.Damage)
    .Take(5)
    .ToList();

// DO: Prefer foreach — clearer intent
foreach (var player in activePlayers)
    player.Update(deltaTime);

// DON'T: Use for when foreach works
// for (int i = 0; i < activePlayers.Count; i++)
//     activePlayers[i].Update(deltaTime);

// DO: Avoid modifying collections while iterating
var toRemove = enemies.Where(e => e.HP <= 0).ToList();
foreach (var dead in toRemove)
    enemies.Remove(dead);

// DON'T: Remove while iterating (throws exception)
// foreach (var e in enemies)
//     if (e.HP <= 0) enemies.Remove(e); // CRASH!

// DO: Use cancellation for long loops
async Task ProcessAsync(CancellationToken ct)
{
    foreach (var item in largeCollection)
    {
        ct.ThrowIfCancellationRequested();
        await ProcessItemAsync(item);
    }
}`,
    breakdown: `• int count = enemies.Count — Caching the count prevents re-evaluating it every iteration. Critical when .Count involves a computation (like LINQ queries).

• new StringBuilder(1024) — Pre-allocating with expected capacity prevents internal resizing during the loop. StringBuilder doubles its buffer when full, causing copies.

• .Where().OrderByDescending().Take(5) — LINQ chain is declarative and readable. Fine for code that doesn't run 60 times per second. The intent is immediately clear.

• foreach over for — Unless you need the index, foreach is cleaner and communicates "I'm processing each element." It also prevents off-by-one bugs.

• enemies.Where(e => e.HP <= 0).ToList() — Collect items to remove FIRST (materializing with ToList()), then remove them in a separate loop. Modifying a collection while iterating it throws InvalidOperationException.

• ct.ThrowIfCancellationRequested() — Checks if cancellation was requested and throws OperationCanceledException. Allows long-running loops to be interrupted gracefully.`,
    summary: `Cache collection counts outside loop conditions. Pre-allocate buffers before loops to avoid GC pressure. Use foreach for clarity unless you specifically need indices. Never modify a collection while iterating it — collect changes first, apply second. Use CancellationToken to make long loops interruptible. Reserve LINQ for readability-first code, manual loops for performance-critical paths.`
  }
];
