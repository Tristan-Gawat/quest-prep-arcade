// Pre-written lessons for C# Module: LINQ

export const csharpLinqLessons = [
  {
    title: "What is LINQ?",
    definition: "LINQ (Language Integrated Query) is a set of C# features that enables writing queries directly in the language to filter, transform, sort, and aggregate data from any collection, database, or data source.",
    explanation: `LINQ brings database-like query capabilities into C# itself. Instead of writing loops to filter and transform data, you write declarative queries that describe WHAT you want, not HOW to get it.

LINQ works on anything implementing IEnumerable<T> — arrays, lists, dictionaries, database tables, XML documents, and custom collections. The same query syntax works regardless of the data source.

There are two LINQ syntaxes: method syntax (fluent) using extension methods like .Where().Select(), and query syntax using from/where/select keywords. Both compile to the same code — choose whichever reads better for your use case.

LINQ is lazy by default. When you write items.Where(x => x > 5), no filtering happens yet. The query is only executed when you iterate the results (foreach) or force evaluation (.ToList(), .Count(), .First()). This deferred execution enables efficient chaining.`,
    code: `// Sample data
var heroes = new[]
{
    new { Name = "Warrior", Level = 25, HP = 500, Class = "Tank" },
    new { Name = "Mage", Level = 30, HP = 200, Class = "DPS" },
    new { Name = "Rogue", Level = 22, HP = 300, Class = "DPS" },
    new { Name = "Cleric", Level = 28, HP = 350, Class = "Healer" },
    new { Name = "Ranger", Level = 18, HP = 280, Class = "DPS" }
};

// Method syntax (fluent)
var highLevel = heroes
    .Where(h => h.Level >= 25)
    .OrderByDescending(h => h.Level)
    .Select(h => $"{h.Name} (Lv.{h.Level})");

foreach (var h in highLevel)
    Console.WriteLine(h);

// Query syntax (SQL-like)
var dpsHeroes = from h in heroes
                where h.Class == "DPS"
                orderby h.HP descending
                select new { h.Name, h.HP };

// Aggregation
int totalHP = heroes.Sum(h => h.HP);
double avgLevel = heroes.Average(h => h.Level);
var strongest = heroes.MaxBy(h => h.HP);
Console.WriteLine($"Total HP: {totalHP}");
Console.WriteLine($"Avg Level: {avgLevel:F1}");
Console.WriteLine($"Strongest: {strongest?.Name}");`,
    breakdown: `• new[] { new { Name = "Warrior", ... } } — Array of anonymous objects. Quick way to create structured test data without defining a class.

• .Where(h => h.Level >= 25) — Filters elements. The lambda h => h.Level >= 25 is the predicate — only elements returning true are included.

• .OrderByDescending(h => h.Level) — Sorts by Level from highest to lowest. .OrderBy() for ascending.

• .Select(h => $"{h.Name} (Lv.{h.Level})") — Transforms each element. Maps Hero objects to formatted strings. Like map() in other languages.

• from h in heroes where ... select ... — Query syntax. Reads like SQL. Compiles to the same method calls as fluent syntax.

• .Sum(h => h.HP) — Aggregation method. Extracts HP from each hero and sums them. Also: .Average(), .Min(), .Max(), .Count().

• .MaxBy(h => h.HP) — Returns the element with the maximum HP value (not just the max value itself). Returns null if collection is empty.`,
    summary: `LINQ provides declarative data querying in C#. Where() filters, Select() transforms, OrderBy() sorts, and Sum/Average/Count aggregate. Method syntax chains extensions; query syntax reads like SQL. LINQ is lazy — queries execute only when results are consumed. Works on any IEnumerable<T> collection.`
  },
  {
    title: "How LINQ works",
    definition: "LINQ uses deferred execution through iterators and expression trees. Method syntax chains extension methods that return IEnumerable<T>. Each method builds on the previous, creating a query pipeline that executes only when enumerated.",
    explanation: `LINQ's deferred execution means queries aren't executed when defined — they're executed when consumed. Writing .Where().Select() builds a query plan. Only when you foreach, ToList(), or call a terminal operation does the data actually flow through the pipeline.

This is implemented through C# iterators (yield return). Each LINQ method returns an IEnumerable that, when iterated, pulls data through the chain one element at a time. Elements flow through Where, then Select, then to the consumer — no intermediate collections are created.

This streaming execution model is memory-efficient. If you have a million items and call .Where(x => x > 5).First(), LINQ stops as soon as it finds the first match. It doesn't filter all million items first.

For database queries (LINQ to SQL, Entity Framework), LINQ uses expression trees instead of delegates. Expression trees represent the query as data that can be translated to SQL. This is why EF can translate C# lambda expressions into efficient database queries.`,
    code: `// Deferred execution demonstration
var numbers = new List<int> { 1, 2, 3, 4, 5 };
var query = numbers.Where(n => n > 2); // NOT executed yet!

numbers.Add(6); // modify source AFTER query definition

// Query executes NOW — includes 6!
foreach (var n in query)
    Console.Write($"{n} "); // 3 4 5 6

// Immediate execution with ToList/ToArray
var snapshot = numbers.Where(n => n > 2).ToList(); // executes NOW
numbers.Add(7);
// snapshot doesn't include 7 — it's a fixed copy

// Chaining demonstrates streaming
var result = Enumerable.Range(1, 1000000)
    .Where(n => n % 2 == 0)      // only passes evens
    .Select(n => n * n)           // squares them
    .TakeWhile(n => n < 1000)    // stops when >= 1000
    .ToList();
// Only processes ~15 elements, not 1 million!

// Custom LINQ-compatible method
static IEnumerable<T> TakeEvery<T>(IEnumerable<T> source, int n)
{
    int count = 0;
    foreach (T item in source)
    {
        if (count % n == 0)
            yield return item;
        count++;
    }
}
var everyThird = TakeEvery(numbers, 3).ToList();`,
    breakdown: `• var query = numbers.Where(n => n > 2) — Query is DEFINED but not executed. It stores the predicate and source reference.

• numbers.Add(6) affecting query results — Since the query is deferred, it sees the current state of the source when finally executed.

• .ToList() — Forces immediate execution. Creates a fixed snapshot. Changes to the source after this don't affect the list.

• Enumerable.Range(1, 1000000) — Generates numbers lazily. Combined with TakeWhile, only ~15 numbers are actually generated and processed.

• .TakeWhile(n => n < 1000) — Short-circuit operator. Stops pulling from the pipeline as soon as the condition fails. Enables early termination.

• yield return item — Creates a lazy iterator. TakeEvery produces items one at a time as requested, without building an intermediate collection.`,
    summary: `LINQ uses deferred execution — queries are defined once but executed each time they're consumed. Source modifications after query definition are reflected in results. ToList()/ToArray() force immediate execution into snapshots. Streaming execution means only needed elements are processed. Short-circuit operators (First, Take, TakeWhile) enable early termination.`
  },
  {
    title: "LINQ syntax & usage",
    definition: "LINQ syntax includes filtering (Where), projection (Select), ordering (OrderBy), grouping (GroupBy), joining (Join), aggregation (Sum, Count, Average), element access (First, Single, ElementAt), and set operations (Distinct, Union, Intersect).",
    explanation: `LINQ provides a rich vocabulary of operations for data manipulation. The most commonly used are Where (filter), Select (transform), OrderBy (sort), GroupBy (categorize), and the aggregation methods (Sum, Count, Average, Min, Max).

For accessing specific elements: First() gets the first element (throws if empty), FirstOrDefault() returns default if empty, Single() gets the only element (throws if multiple), and Last() gets the last element.

GroupBy creates groups of elements sharing a key. It returns IGrouping<TKey, TElement> objects that you can iterate over. Each group has a Key property and contains the matching elements.

Join combines two sequences based on matching keys — like a SQL JOIN. SelectMany flattens nested collections (like flatMap in other languages). Zip combines two sequences element by element into pairs.`,
    code: `// Complex query with multiple operations
var inventory = new[]
{
    new { Name = "Iron Sword", Type = "Weapon", Value = 100, Qty = 1 },
    new { Name = "Health Potion", Type = "Consumable", Value = 25, Qty = 5 },
    new { Name = "Mana Potion", Type = "Consumable", Value = 30, Qty = 3 },
    new { Name = "Steel Shield", Type = "Armor", Value = 150, Qty = 1 },
    new { Name = "Fire Scroll", Type = "Consumable", Value = 75, Qty = 2 },
};

// GroupBy — categorize items
var grouped = inventory.GroupBy(i => i.Type);
foreach (var group in grouped)
{
    Console.WriteLine($"\\n[{group.Key}] ({group.Count()} types)");
    foreach (var item in group)
        Console.WriteLine($"  {item.Name} x{item.Qty}");
}

// Aggregate per group
var summary = inventory
    .GroupBy(i => i.Type)
    .Select(g => new
    {
        Type = g.Key,
        TotalValue = g.Sum(i => i.Value * i.Qty),
        ItemCount = g.Sum(i => i.Qty)
    });

// SelectMany — flatten nested collections
var teams = new[]
{
    new { Team = "Alpha", Members = new[] { "Kai", "Zara" } },
    new { Team = "Beta", Members = new[] { "Rex", "Nova", "Ash" } }
};
var allMembers = teams.SelectMany(t => t.Members);
// Result: Kai, Zara, Rex, Nova, Ash

// Zip — combine two sequences
var names = new[] { "Warrior", "Mage", "Rogue" };
var levels = new[] { 25, 30, 22 };
var paired = names.Zip(levels, (n, l) => $"{n} Lv.{l}");

// Set operations
var teamA = new[] { 1, 2, 3, 4, 5 };
var teamB = new[] { 4, 5, 6, 7, 8 };
var both = teamA.Intersect(teamB);   // 4, 5
var either = teamA.Union(teamB);     // 1-8
var onlyA = teamA.Except(teamB);     // 1, 2, 3`,
    breakdown: `• .GroupBy(i => i.Type) — Groups items by their Type property. Returns groups where each has a Key (the type) and contains matching items.

• g.Sum(i => i.Value * i.Qty) — Aggregate within a group. Calculates total value for each type by multiplying value × quantity and summing.

• .SelectMany(t => t.Members) — Flattens nested arrays into one sequence. Each team's Members array is unpacked into a single flat list.

• .Zip(levels, (n, l) => ...) — Pairs elements by position. First name with first level, second with second, etc. Stops at the shorter sequence.

• .Intersect(teamB) — Set intersection: elements in BOTH sequences. Union: elements in either. Except: elements in first but not second.`,
    summary: `GroupBy categorizes elements by key and enables per-group aggregation. SelectMany flattens nested collections into single sequences. Zip combines parallel sequences element-by-element. Set operations (Intersect, Union, Except) work like mathematical set theory. These operations compose freely for complex data transformations.`
  },
  {
    title: "Practical examples of LINQ",
    definition: "LINQ is used in real applications for data filtering in games (finding nearby enemies), report generation, API response shaping, search functionality, and business rule evaluation.",
    explanation: `LINQ shines in real-world scenarios where you need to query, transform, and aggregate data. Game development uses it for finding targets, filtering inventory, and processing game events. Web apps use it for API response shaping and database queries.

A common game pattern is spatial queries — finding all enemies within range, sorting them by distance, and picking the closest one. LINQ makes this a single, readable expression that would otherwise be a complex nested loop.

Report generation often involves grouping data by categories, calculating statistics per group, and formatting results. LINQ's GroupBy with aggregate methods handles this elegantly without temporary variables or manual accumulation.

Search and filtering UIs map naturally to LINQ. Each filter the user enables adds another .Where() clause to the query. Since LINQ is lazy, unused filters cost nothing. This builds dynamic, composable query pipelines.`,
    code: `// === EXAMPLE 1: Enemy Targeting System ===
var enemies = new[]
{
    new { Name = "Goblin", HP = 30, X = 5.0, Y = 3.0 },
    new { Name = "Orc", HP = 80, X = 12.0, Y = 8.0 },
    new { Name = "Skeleton", HP = 0, X = 2.0, Y = 1.0 },
    new { Name = "Slime", HP = 20, X = 4.0, Y = 2.0 },
    new { Name = "Dragon", HP = 500, X = 50.0, Y = 40.0 },
};

double playerX = 3.0, playerY = 2.0, range = 10.0;

var nearbyTargets = enemies
    .Where(e => e.HP > 0) // alive only
    .Select(e => new
    {
        e.Name, e.HP,
        Distance = Math.Sqrt(Math.Pow(e.X - playerX, 2) + Math.Pow(e.Y - playerY, 2))
    })
    .Where(e => e.Distance <= range)
    .OrderBy(e => e.Distance)
    .ToList();

Console.WriteLine("=== Nearby Targets ===");
nearbyTargets.ForEach(t =>
    Console.WriteLine($"  {t.Name} ({t.HP}HP) - {t.Distance:F1}m"));

// === EXAMPLE 2: Leaderboard System ===
var scores = new[]
{
    new { Player = "Alice", Score = 1500, Region = "NA" },
    new { Player = "Bob", Score = 2200, Region = "EU" },
    new { Player = "Charlie", Score = 1800, Region = "NA" },
    new { Player = "Diana", Score = 2500, Region = "EU" },
    new { Player = "Eve", Score = 1900, Region = "NA" },
};

var leaderboard = scores
    .OrderByDescending(s => s.Score)
    .Select((s, i) => $"#{i + 1} {s.Player} ({s.Region}): {s.Score:N0}");

Console.WriteLine("\\n=== Global Leaderboard ===");
foreach (var entry in leaderboard)
    Console.WriteLine($"  {entry}");

// Regional stats
var regional = scores
    .GroupBy(s => s.Region)
    .Select(g => new
    {
        Region = g.Key,
        TopPlayer = g.MaxBy(s => s.Score)!.Player,
        AvgScore = g.Average(s => s.Score)
    });

Console.WriteLine("\\n=== Regional Stats ===");
foreach (var r in regional)
    Console.WriteLine($"  {r.Region}: Top={r.TopPlayer}, Avg={r.AvgScore:F0}");`,
    breakdown: `• .Where(e => e.HP > 0) — First filter: remove dead enemies. Simple predicate eliminates invalid targets early.

• .Select(e => new { ..., Distance = ... }) — Project into new shape with calculated distance. Anonymous type holds original data plus computed field.

• .Where(e => e.Distance <= range) — Second filter using the calculated distance. Chaining Where after Select uses the computed values.

• .OrderBy(e => e.Distance) — Sort by closest first. The targeting system picks the nearest valid target.

• .Select((s, i) => ...) — Select overload with index parameter. 'i' is the 0-based position in the sequence. Used for ranking numbers.

• .GroupBy(s => s.Region) then .Select(g => new {...}) — Group scores by region, then compute stats per group (top player, average).

• g.MaxBy(s => s.Score)!.Player — Find the highest scorer in each group. The ! asserts non-null (safe here because groups always have elements).`,
    summary: `LINQ enables complex game queries (spatial targeting, filtering dead entities, sorting by distance) in readable pipelines. Leaderboards use OrderByDescending with indexed Select for rankings. GroupBy with aggregate projections produces regional statistics. Each LINQ operation adds one clear transformation step.`
  },
  {
    title: "LINQ best practices",
    definition: "LINQ best practices include using method syntax for simple chains, avoiding multiple enumerations, materializing when needed (ToList), keeping queries readable, and being aware of deferred execution side effects.",
    explanation: `LINQ is powerful but has pitfalls. The most common mistake is multiple enumeration — iterating a deferred query multiple times causes it to re-execute from scratch each time. If the source is a database query, this means multiple round trips.

Materialize queries with ToList() or ToArray() when you need to iterate multiple times, when the source might change, or when you need Count/indexing. But don't materialize too early — keep queries deferred until you need the final results for maximum efficiency.

Keep LINQ chains readable. If a chain has more than 5-6 operations, consider breaking it into named intermediate variables or extracting parts into methods. Each line should be understandable in isolation.

Avoid side effects in LINQ predicates and projections. Methods passed to Where and Select should be pure functions — no Console.WriteLine, no variable modification, no state changes. Side effects in lazy queries cause confusing, order-dependent bugs.`,
    code: `// DO: Materialize to avoid multiple enumeration
var query = enemies.Where(e => e.HP > 0);
// BAD: enumerates twice (query runs twice!)
// int count = query.Count();
// var first = query.First();

// GOOD: materialize once, use the list
var alive = enemies.Where(e => e.HP > 0).ToList();
int count = alive.Count;  // uses cached list
var first = alive[0];     // uses cached list

// DO: Use Any() instead of Count() > 0
if (enemies.Any(e => e.HP <= 0))  // stops at first match
    Console.WriteLine("Some enemies are dead");
// DON'T: Count() iterates entire collection
// if (enemies.Count(e => e.HP <= 0) > 0)

// DO: Break complex queries into named steps
var livingEnemies = enemies.Where(e => e.HP > 0);
var inRange = livingEnemies.Where(e => GetDistance(e) < 10);
var byThreat = inRange.OrderByDescending(e => e.HP);
var target = byThreat.FirstOrDefault();

// DO: Keep predicates pure (no side effects)
// BAD: side effect in Where
// int counter = 0;
// query.Where(x => { counter++; return x > 5; });

// GOOD: pure predicate
var filtered = numbers.Where(x => x > 5).ToList();
int counter = filtered.Count;

// DO: Use specific methods for common patterns
var first2 = heroes.FirstOrDefault(h => h.Level > 20);
bool hasHealer = heroes.Any(h => h.Class == "Healer");
bool allAlive = heroes.All(h => h.HP > 0);
var highest = heroes.MaxBy(h => h.Level);

// DO: Prefer Where + First over Single for nullable searches
// Single throws if 0 or 2+ results — use when expecting exactly 1
var unique = heroes.SingleOrDefault(h => h.Name == "Kai");`,
    breakdown: `• .ToList() to avoid multiple enumeration — If you need .Count AND .First from the same query, materialize first. Otherwise the query runs twice (or hits the database twice).

• .Any() vs .Count() > 0 — Any() stops at the first match. Count() processes the entire collection. For existence checks, Any() is always more efficient.

• Named intermediate variables — livingEnemies, inRange, byThreat are still lazy (deferred). But names document each step's purpose. Makes debugging easier too.

• Pure predicates — LINQ may re-execute queries, execute them lazily, or execute in parallel. Side effects in predicates lead to unpredictable behavior.

• .FirstOrDefault() — Returns first match or default (null for reference types, 0 for int). Safer than .First() which throws on empty sequences.

• .Single() vs .First() — Single asserts exactly one result exists. Use when duplicates indicate a bug. First just grabs the first match.`,
    summary: `Materialize with ToList() when you'll access results multiple times. Use Any() instead of Count() > 0 for existence checks. Break complex chains into named steps for readability. Keep predicates pure — no side effects. Use FirstOrDefault for safe element access, Single when exactly one result is expected. Deferred execution is powerful but requires awareness of when queries actually run.`
  }
];
