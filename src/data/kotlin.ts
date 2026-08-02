import { Module } from "./curriculum";

export const kotlinModules: Module[] = [
  {
    id: "kotlin-null-safety",
    title: "Null Safety",
    tier: "EASY",
    lesson: {
      title: "Null Safety",
      concept: "Kotlin's type system distinguishes nullable (String?) from non-nullable (String) types, eliminating NullPointerExceptions at compile time.",
      explanation:
        "By default, variables cannot be null in Kotlin. Add ? to make them nullable (String?). Safe call (?.) only executes if non-null. Elvis operator (?:) provides defaults for null. Smart casts automatically cast after null checks. The !! operator forces non-null (throws if null). Let scope function ?.let {} executes a block only when non-null.",
      codeExample: `// Non-nullable vs nullable
var name: String = "Arcade Hero"   // Cannot be null
var weapon: String? = null          // Can be null

// Safe call operator
val length = weapon?.length  // null (not a crash!)
println(length) // null

// Elvis operator (default for null)
val displayWeapon = weapon ?: "Bare Fists"
println(displayWeapon) // "Bare Fists"

// Smart cast after null check
fun greet(player: String?) {
  if (player != null) {
    // Compiler knows player is String here (smart cast)
    println("Welcome, \${player.uppercase()}!")
  }
}

// let scope function
weapon?.let { w ->
  println("Equipped: $w")
} ?: println("No weapon equipped")

// Safe calls with chaining
data class Guild(val leader: Player?)
data class Player(val name: String, val guild: Guild?)

val leaderName = player?.guild?.leader?.name ?: "No leader"

// Non-null assertion (dangerous!)
val forced: String = weapon!! // KotlinNullPointerException if null`,
      language: "kotlin",
    },
    quiz: [
      { question: "What is the difference between String and String? in Kotlin?", choices: ["No difference", "String cannot hold null, String? can", "String? is faster", "String is deprecated"], correct: 1, explanation: "The ? suffix makes the type nullable — without it, the compiler guarantees the value is never null." },
      { question: "What does the Elvis operator (?:) do?", choices: ["Checks equality", "Returns the left value if non-null, otherwise the right value", "Throws an exception", "Converts to non-null"], correct: 1, explanation: "The Elvis operator provides a fallback value when the left side is null: value ?: default." },
      { question: "What is a smart cast?", choices: ["Explicit type conversion", "The compiler automatically casts after a type/null check", "Casting with as keyword", "Runtime type checking"], correct: 1, explanation: "After a null check or type check, Kotlin automatically casts the variable to the non-null/specific type." },
    ],
        subLessons: ["What is Null Safety?","How Null Safety works","Null Safety syntax & usage","Practical examples of Null Safety","Null Safety best practices"],
challenge: {
      title: "Null-Safe Inventory",
      description: "Create a nullable String variable 'loot' set to \"Diamond Armor\". Use the safe call with let to print \"Found: Diamond Armor\". Create another nullable variable 'potion' set to null and use the Elvis operator to print \"Item: Empty Slot\".",
      starterCode: "// Create nullable loot\n\n// Safe call with let\n\n// Nullable potion with Elvis operator\n",
      expectedOutput: "Found: Diamond Armor\nItem: Empty Slot",
      hints: ["var loot: String? = \"Diamond Armor\"", "Use loot?.let { println(\"Found: $it\") }", "Use val display = potion ?: \"Empty Slot\" with println"],
      solution: `var loot: String? = "Diamond Armor"\nloot?.let { println("Found: $it") }\n\nvar potion: String? = null\nprintln("Item: \${potion ?: "Empty Slot"}")`,
      language: "kotlin",
    },
  },
  {
    id: "kotlin-data-classes",
    title: "Data Classes",
    tier: "EASY",
    lesson: {
      title: "Data Classes",
      concept: "Data classes automatically generate equals(), hashCode(), toString(), copy(), and destructuring — perfect for holding data.",
      explanation:
        "Prefix a class with 'data' to auto-generate utility functions based on constructor properties. toString() prints a readable format. copy() creates modified clones. Destructuring extracts properties into variables. Data classes must have at least one val/var in the primary constructor. They're ideal for DTOs, models, and state objects.",
      codeExample: `// Data class auto-generates: toString, equals, hashCode, copy, componentN
data class Player(
  val name: String,
  val level: Int,
  val health: Int,
  val guild: String = "None"
)

// Auto-generated toString
val hero = Player("ArcadeKnight", 42, 100, "Phoenix")
println(hero) // Player(name=ArcadeKnight, level=42, health=100, guild=Phoenix)

// Copy with modifications
val leveled = hero.copy(level = 43, health = 110)
println(leveled) // Player(name=ArcadeKnight, level=43, health=110, guild=Phoenix)

// Destructuring declarations
val (name, level, hp, guild) = hero
println("$name is level $level") // ArcadeKnight is level 42

// Equality is structural (not reference)
val player1 = Player("Hero", 1, 100)
val player2 = Player("Hero", 1, 100)
println(player1 == player2) // true (content equality!)

// Data classes in collections
val roster = listOf(
  Player("Mage", 30, 80),
  Player("Tank", 35, 150),
  Player("Rogue", 28, 90)
)
val highLevel = roster.filter { it.level >= 30 }`,
      language: "kotlin",
    },
    quiz: [
      { question: "What methods does a data class auto-generate?", choices: ["Only toString()", "toString, equals, hashCode, copy, componentN", "All possible methods", "Only getters and setters"], correct: 1, explanation: "Data classes generate five categories: toString, equals, hashCode (for maps/sets), copy, and componentN (for destructuring)." },
      { question: "What does copy() do on a data class?", choices: ["Deep clones all references", "Creates a new instance with optionally modified properties", "Copies to clipboard", "Duplicates in memory"], correct: 1, explanation: "copy() creates a new instance where you can override specific properties while keeping the rest." },
      { question: "How does == work on data classes?", choices: ["Reference equality", "Structural equality (compares all properties)", "Always false", "Only compares first property"], correct: 1, explanation: "Data classes override equals() to compare all constructor properties — two objects with the same data are equal." },
    ],
        subLessons: ["What is Data Classes?","How Data Classes works","Data Classes syntax & usage","Practical examples of Data Classes","Data Classes best practices"],
challenge: {
      title: "Item Data Class",
      description: "Create a data class `Item` with val name: String, val damage: Int, and val rarity: String. Create an item \"Storm Blade\" with damage 75 and rarity \"Epic\". Use copy() to create \"Storm Blade+\" with damage 100. Print the upgraded item's toString().",
      starterCode: "// Define Item data class\n\n// Create original and upgraded copy\n\n// Print upgraded item\n",
      expectedOutput: "Item(name=Storm Blade+, damage=100, rarity=Epic)",
      hints: ["data class Item(val name: String, val damage: Int, val rarity: String)", "Use .copy(name = \"Storm Blade+\", damage = 100)", "println() uses the auto-generated toString()"],
      solution: `data class Item(val name: String, val damage: Int, val rarity: String)\n\nval original = Item("Storm Blade", 75, "Epic")\nval upgraded = original.copy(name = "Storm Blade+", damage = 100)\nprintln(upgraded)`,
      language: "kotlin",
    },
  },
  {
    id: "kotlin-coroutines",
    title: "Coroutines",
    tier: "MEDIUM",
    lesson: {
      title: "Coroutines",
      concept: "Coroutines provide lightweight, non-blocking concurrency that makes asynchronous code sequential and readable.",
      explanation:
        "Coroutines are suspendable computations — they can pause and resume without blocking threads. Launch {} starts a fire-and-forget coroutine. async {} returns a Deferred<T> for results. suspend functions can be paused. Dispatchers control which thread runs the code (Main, IO, Default). Structured concurrency via coroutineScope ensures all child coroutines complete or cancel together.",
      codeExample: `import kotlinx.coroutines.*

// Basic coroutine launch
fun main() = runBlocking {
  println("Quest started!")

  // launch: fire-and-forget
  launch {
    delay(1000) // Non-blocking pause
    println("Enemy defeated!")
  }

  // async: returns a result
  val lootDrop = async {
    delay(500)
    "Diamond Sword"
  }

  println("Searching for loot...")
  val item = lootDrop.await() // Wait for result
  println("Found: $item")

  // Structured concurrency
  coroutineScope {
    launch { delay(200); println("Task A done") }
    launch { delay(100); println("Task B done") }
  }
  println("All tasks complete!")
}

// Suspend function
suspend fun fetchPlayerData(id: String): Player {
  delay(1000) // Simulate network call
  return Player(id, "Hero", 42)
}

// Dispatchers
launch(Dispatchers.IO) { /* Network/disk operations */ }
launch(Dispatchers.Default) { /* CPU-intensive work */ }
launch(Dispatchers.Main) { /* UI updates (Android) */ }`,
      language: "kotlin",
    },
    quiz: [
      { question: "What does 'suspend' mean for a function?", choices: ["It stops the program", "It can be paused and resumed without blocking the thread", "It runs on a separate thread", "It delays execution by 1 second"], correct: 1, explanation: "Suspend functions can be paused at suspension points and resumed later, freeing the thread for other work." },
      { question: "What is the difference between launch and async?", choices: ["launch is faster", "launch returns Job (no result), async returns Deferred<T> (with result)", "async blocks the thread", "No difference"], correct: 1, explanation: "launch is fire-and-forget (returns Job), while async produces a result you can await." },
      { question: "What does structured concurrency guarantee?", choices: ["Faster execution", "All child coroutines complete or cancel when the parent scope ends", "Single-threaded execution", "No exceptions"], correct: 1, explanation: "Structured concurrency ensures no coroutine leaks — if a scope is cancelled, all children are cancelled too." },
    ],
        subLessons: ["What is Coroutines?","How Coroutines works","Coroutines syntax & usage","Practical examples of Coroutines","Coroutines best practices"],
challenge: {
      title: "Async Loot Fetch",
      description: "Write a runBlocking block that launches two async operations: one returns \"Gold\" after a delay, another returns \"Gems\" after a delay. Await both results and print \"Loot: Gold, Gems\".",
      starterCode: "import kotlinx.coroutines.*\n\n// Use runBlocking with async\n",
      expectedOutput: "Loot: Gold, Gems",
      hints: ["Use runBlocking { } as the main scope", "val gold = async { delay(100); \"Gold\" }", "Use .await() on both and combine in a print statement"],
      solution: `import kotlinx.coroutines.*\n\nfun main() = runBlocking {\n  val gold = async { delay(100); "Gold" }\n  val gems = async { delay(100); "Gems" }\n  println("Loot: \${gold.await()}, \${gems.await()}")\n}`,
      language: "kotlin",
    },
  },
  {
    id: "kotlin-extensions",
    title: "Extension Functions",
    tier: "MEDIUM",
    lesson: {
      title: "Extension Functions",
      concept: "Extension functions add new methods to existing classes without modifying their source code or using inheritance.",
      explanation:
        "Extensions let you 'add' functions to any type: fun Type.name(). They don't actually modify the class — they're resolved statically. Extension properties add computed properties. Extensions work on nullable types (fun String?.safe()). They're great for utility methods, DSLs, and making third-party APIs more ergonomic. Kotlin stdlib uses extensions extensively (let, apply, run, also, with).",
      codeExample: `// Extension function on String
fun String.toArcadeTitle(): String {
  return "⚔️ \${this.uppercase()} ⚔️"
}

println("quest complete".toArcadeTitle())
// ⚔️ QUEST COMPLETE ⚔️

// Extension function on Int
fun Int.toHealthBar(max: Int = 100): String {
  val filled = (this * 20 / max)
  val empty = 20 - filled
  return "[" + "█".repeat(filled) + "░".repeat(empty) + "] $this/$max"
}

println(75.toHealthBar()) // [███████████████░░░░░] 75/100

// Extension on nullable type
fun String?.orDefault(default: String = "Unknown"): String {
  return this ?: default
}

val name: String? = null
println(name.orDefault("Anonymous")) // Anonymous

// Extension property
val List<Int>.average: Double
  get() = if (isEmpty()) 0.0 else sum().toDouble() / size

val scores = listOf(85, 92, 78, 95)
println(scores.average) // 87.5

// Scope functions (built-in extensions)
data class Player(var name: String, var level: Int, var hp: Int)

val player = Player("Hero", 1, 100).apply {
  level = 5
  hp = 200
  name = "\${name} the Brave"
}
println(player) // Player(name=Hero the Brave, level=5, hp=200)`,
      language: "kotlin",
    },
    quiz: [
      { question: "How are extension functions resolved?", choices: ["Dynamically at runtime", "Statically at compile time", "Through reflection", "By the JVM"], correct: 1, explanation: "Extensions are resolved statically — the declared type determines which extension is called, not the runtime type." },
      { question: "Can extensions access private members of the class?", choices: ["Yes, always", "No, they can only access public/protected members", "Only if in the same file", "Only extension properties can"], correct: 1, explanation: "Extensions don't actually modify the class, so they cannot access private or protected members." },
      { question: "What does the 'apply' scope function do?", choices: ["Applies a transformation and returns result", "Configures an object and returns it (this as context)", "Maps values", "Creates a copy"], correct: 1, explanation: "apply uses 'this' as context, lets you configure the object, and returns the object itself — great for initialization!" },
    ],
        subLessons: ["What is Extension Functions?","How Extension Functions works","Extension Functions syntax & usage","Practical examples of Extension Functions","Extension Functions best practices"],
challenge: {
      title: "Custom String Extensions",
      description: "Create an extension function on Int called `toRank()` that returns \"Rookie\" for 1-10, \"Veteran\" for 11-30, and \"Elite\" for 31+. Call 25.toRank() and print \"Rank: Veteran\".",
      starterCode: "// Define extension function on Int\n\n// Call and print\n",
      expectedOutput: "Rank: Veteran",
      hints: ["fun Int.toRank(): String { return when { ... } }", "Use when with ranges: this in 1..10 -> \"Rookie\"", "Print with string template: println(\"Rank: \${25.toRank()}\")"],
      solution: `fun Int.toRank(): String {\n  return when {\n    this in 1..10 -> "Rookie"\n    this in 11..30 -> "Veteran"\n    else -> "Elite"\n  }\n}\n\nprintln("Rank: \${25.toRank()}")`,
      language: "kotlin",
    },
  },
  {
    id: "kotlin-sealed",
    title: "Sealed Classes",
    tier: "HARD",
    lesson: {
      title: "Sealed Classes",
      concept: "Sealed classes restrict inheritance to a fixed set of subclasses, enabling exhaustive when expressions and type-safe state modeling.",
      explanation:
        "Sealed classes define a closed hierarchy — all subclasses must be in the same package. The compiler knows all possible types, enabling exhaustive 'when' without a default branch. They're ideal for modeling states (Loading, Success, Error), events, and commands. Subclasses can be data classes, objects, or regular classes with their own properties.",
      codeExample: `// Sealed class for game state
sealed class GameState {
  object Loading : GameState()
  data class Playing(val level: Int, val score: Int) : GameState()
  data class Paused(val reason: String) : GameState()
  data class GameOver(val finalScore: Int, val highScore: Boolean) : GameState()
}

// Exhaustive when — compiler ensures all cases handled
fun handleState(state: GameState): String {
  return when (state) {
    is GameState.Loading -> "Loading game..."
    is GameState.Playing -> "Level \${state.level} | Score: \${state.score}"
    is GameState.Paused -> "Paused: \${state.reason}"
    is GameState.GameOver -> {
      val msg = "Game Over! Score: \${state.finalScore}"
      if (state.highScore) "$msg 🏆 NEW HIGH SCORE!" else msg
    }
  }
}

// Sealed interface (Kotlin 1.5+)
sealed interface NetworkResult<out T> {
  data class Success<T>(val data: T) : NetworkResult<T>
  data class Error(val message: String, val code: Int) : NetworkResult<Nothing>
  object Loading : NetworkResult<Nothing>
}

fun <T> handleResult(result: NetworkResult<T>) {
  when (result) {
    is NetworkResult.Success -> println("Data: \${result.data}")
    is NetworkResult.Error -> println("Error \${result.code}: \${result.message}")
    is NetworkResult.Loading -> println("Loading...")
  }
}

val state = GameState.Playing(level = 5, score = 2500)
println(handleState(state))`,
      language: "kotlin",
    },
    quiz: [
      { question: "Why use sealed classes over enums?", choices: ["Sealed classes are faster", "Sealed subclasses can hold different data per type", "Enums are deprecated", "No advantage"], correct: 1, explanation: "Unlike enums (fixed constants), sealed class subtypes can each have different properties and be data classes." },
      { question: "What does the compiler guarantee with sealed when expressions?", choices: ["No runtime errors", "All possible subtypes are handled (exhaustive check)", "Null safety", "Thread safety"], correct: 1, explanation: "The compiler warns/errors if you miss a sealed subclass in when — no 'else' branch needed when exhaustive." },
      { question: "Where must sealed class subclasses be defined?", choices: ["In any file", "In the same package (module for sealed interfaces)", "In the same function", "In a companion object"], correct: 1, explanation: "Sealed class subtypes must be in the same package, allowing the compiler to know all possible types at compile time." },
    ],
        subLessons: ["What is Sealed Classes?","How Sealed Classes works","Sealed Classes syntax & usage","Practical examples of Sealed Classes","Sealed Classes best practices"],
challenge: {
      title: "Quest Event System",
      description: "Create a sealed class `QuestEvent` with subclasses: Started(questName: String), ItemFound(itemName: String, value: Int), and Completed(reward: String). Write a when expression that handles all cases. Call it with Completed(\"Golden Trophy\") and print \"Quest Complete! Reward: Golden Trophy\".",
      starterCode: "// Define sealed class QuestEvent\n\n// Function to handle events\n\n// Call with Completed\n",
      expectedOutput: "Quest Complete! Reward: Golden Trophy",
      hints: ["sealed class QuestEvent with data class subclasses", "Use 'is' keyword in when: is QuestEvent.Completed -> ...", "Access properties via smart cast: state.reward"],
      solution: `sealed class QuestEvent {\n  data class Started(val questName: String) : QuestEvent()\n  data class ItemFound(val itemName: String, val value: Int) : QuestEvent()\n  data class Completed(val reward: String) : QuestEvent()\n}\n\nfun handleEvent(event: QuestEvent) {\n  when (event) {\n    is QuestEvent.Started -> println("Quest Started: \${event.questName}")\n    is QuestEvent.ItemFound -> println("Found \${event.itemName} (worth \${event.value})")\n    is QuestEvent.Completed -> println("Quest Complete! Reward: \${event.reward}")\n  }\n}\n\nhandleEvent(QuestEvent.Completed("Golden Trophy"))`,
      language: "kotlin",
    },
  },
  {
    id: "kotlin-higher-order",
    title: "Higher-Order Functions",
    tier: "HARD",
    lesson: {
      title: "Higher-Order Functions",
      concept: "Higher-order functions take functions as parameters or return them, enabling powerful abstractions and DSL-style code.",
      explanation:
        "Functions are first-class in Kotlin — store them in variables, pass as arguments, return from functions. Lambda syntax: { params -> body }. Use 'it' for single-parameter lambdas. Inline functions avoid lambda object overhead. Function types like (Int) -> String declare the signature. Receiver lambdas (T.() -> Unit) enable DSL builders. Kotlin stdlib is built on higher-order functions (map, filter, fold, let, run, apply).",
      codeExample: `// Higher-order function
fun applyBuff(
  value: Int,
  times: Int = 1,
  transform: (Int) -> Int
): Int {
  var result = value
  repeat(times) { result = transform(result) }
  return result
}

val boosted = applyBuff(10, 3) { it * 2 }
println(boosted) // 80 (10 -> 20 -> 40 -> 80)

// Returning a function
fun createMultiplier(factor: Int): (Int) -> Int {
  return { value -> value * factor }
}

val triple = createMultiplier(3)
println(triple(15)) // 45

// Inline function (avoids lambda allocation)
inline fun measure(action: () -> Unit): Long {
  val start = System.currentTimeMillis()
  action()
  return System.currentTimeMillis() - start
}

// Lambda with receiver (DSL style)
class QuestBuilder {
  var name = ""
  var reward = ""
  var difficulty = 1
}

fun quest(init: QuestBuilder.() -> Unit): QuestBuilder {
  val builder = QuestBuilder()
  builder.init()
  return builder
}

val myQuest = quest {
  name = "Dragon Slayer"
  reward = "Legendary Sword"
  difficulty = 5
}
println("\${myQuest.name} (Difficulty: \${myQuest.difficulty})")

// Chaining higher-order functions
val topScores = listOf(45, 82, 91, 67, 55, 98, 73)
  .filter { it >= 70 }
  .sortedDescending()
  .take(3)
  .mapIndexed { i, score -> "#\${i+1}: $score" }
println(topScores) // [#1: 98, #2: 91, #3: 82]`,
      language: "kotlin",
    },
    quiz: [
      { question: "What is a higher-order function?", choices: ["A function in a superclass", "A function that takes or returns other functions", "A recursive function", "A function with many parameters"], correct: 1, explanation: "Higher-order functions treat functions as values — they accept functions as parameters or return them." },
      { question: "What does 'inline' do for higher-order functions?", choices: ["Makes them faster by caching", "Copies the function body and lambda at the call site, avoiding object allocation", "Makes them recursive", "Runs them at compile time"], correct: 1, explanation: "Inline replaces the function call with its body and inlines the lambda, eliminating the overhead of creating a function object." },
      { question: "What is a lambda with receiver (T.() -> Unit)?", choices: ["A lambda that receives T as parameter", "A lambda where 'this' refers to T, enabling DSL-style syntax", "A lambda that returns T", "A generic lambda"], correct: 1, explanation: "Receiver lambdas let you call methods on 'this' (the receiver) inside the lambda body — the foundation of Kotlin DSLs." },
    ],
        subLessons: ["What is Higher-Order Functions?","How Higher-Order Functions works","Higher-Order Functions syntax & usage","Practical examples of Higher-Order Functions","Higher-Order Functions best practices"],
challenge: {
      title: "Custom Transform Pipeline",
      description: "Create a higher-order function `transform(value: Int, vararg operations: (Int) -> Int): Int` that applies each operation sequentially. Call it with value 5 and operations that double, then add 10. Print the result: 20.",
      starterCode: "// Define transform function\n\n// Call with operations\n",
      expectedOutput: "20",
      hints: ["Use fold or a for loop to apply each operation in sequence", "vararg creates an Array<(Int) -> Int> — iterate over it", "transform(5, { it * 2 }, { it + 10 }) applies double first (10) then add 10 (20)"],
      solution: `fun transform(value: Int, vararg operations: (Int) -> Int): Int {\n  var result = value\n  for (op in operations) {\n    result = op(result)\n  }\n  return result\n}\n\nval result = transform(5, { it * 2 }, { it + 10 })\nprintln(result)`,
      language: "kotlin",
    },
  },
];
