// Pre-written lessons for Kotlin Module: Data Classes

export const kotlinDataClassesLessons = [
  {
    title: "What is Data Classes?",
    definition: "Data Classes in Kotlin automatically generate equals(), hashCode(), toString(), copy(), and componentN() functions from primary constructor properties, eliminating boilerplate for value/data objects.",
    explanation: `Data Classes is a core concept in Kotlin that every developer needs to master. It provides the foundation for writing efficient, safe, and maintainable code.

Understanding this concept deeply enables you to leverage the language's strengths and avoid common pitfalls that plague beginners.

Kotlin's approach to data classes is unique among programming languages, offering specific guarantees and trade-offs that shape how you design your programs.

By mastering data classes, you unlock powerful patterns and idioms that are standard in professional Kotlin development.`,
    code: `// Data Classes in Kotlin - Basics
fun main() {
    println("Data Classes in Kotlin")

    // Null safety
    var name: String = "Hero"     // non-nullable
    var nickname: String? = null  // nullable

    // Safe call
    println(nickname?.length)     // null (no crash!)
    println(name.length)          // 4

    // Elvis operator
    val displayName = nickname ?: "Anonymous"
    println("Name: $displayName")

    // Data class
    data class Player(val name: String, val hp: Int, val level: Int)
    val hero = Player("Kai", 100, 25)
    println(hero) // Player(name=Kai, hp=100, level=25)

    // Copy with modifications
    val damaged = hero.copy(hp = 60)
    println(damaged)

    // Destructuring
    val (playerName, hp, level) = hero
    println("\$playerName is level $level")

    // Higher-order functions
    val scores = listOf(85, 92, 78, 95, 88)
    val high = scores.filter { it >= 90 }
    val total = scores.sum()
    println("High scores: $high, Total: $total")
}`,
    breakdown: `\u2022 The basic declaration shows how to define and use data classes in Kotlin.\n\n\u2022 Type safety ensures the compiler catches errors before runtime.\n\n\u2022 Standard library integration makes common operations concise.\n\n\u2022 Comments explain each line's purpose for learners.\n\n\u2022 The example demonstrates the most common usage pattern.`,
    summary: "Data Classes in Kotlin provides automatically generate equals(), hashCode(), toString(), copy(), and componentN() functions from primary constructor properties, eliminating boilerplate for value/data objects.. It's fundamental to writing correct, efficient Kotlin code."
  },
  {
    title: "How Data Classes works",
    definition: "Data Classes works by the compiler generating implementations based on properties declared in the primary constructor. Only primary constructor properties participate in generated functions.",
    explanation: `Under the hood, data classes in Kotlin involves specific compile-time and runtime mechanisms. The interpreter enforces rules that ensure correctness.

The implementation details affect performance characteristics and memory usage patterns that matter in production systems.

Understanding how data classes works internally helps you predict behavior, debug issues, and write more efficient code.

This knowledge separates intermediate developers from advanced ones and is the difference between using a feature and truly understanding it.`,
    code: `// Data Classes - How it works

// Sealed class for exhaustive matching
sealed class GameState {
    object Loading : GameState()
    data class Playing(val level: Int, val score: Int) : GameState()
    data class Paused(val reason: String) : GameState()
    data class GameOver(val finalScore: Int) : GameState()
}

fun handleState(state: GameState): String = when (state) {
    is GameState.Loading -> "Loading..."
    is GameState.Playing -> "Level ${state.level} - Score: ${state.score}"
    is GameState.Paused -> "Paused: ${state.reason}"
    is GameState.GameOver -> "Game Over! Score: ${state.finalScore}"
    // No else needed - compiler knows all cases!
}

// Coroutines (suspension)
suspend fun fetchPlayer(id: Int): Player {
    delay(1000) // non-blocking wait
    return Player("Player_$id", 100, 1)
}

// Extension functions
fun String.toTitleCase(): String =
    split(" ").joinToString(" ") {
        it.replaceFirstChar { c -> c.uppercase() }
    }

fun Int.clamp(min: Int, max: Int): Int =
    coerceIn(min, max)

// Usage
val title = "dark knight rises".toTitleCase() // "Dark Knight Rises"
val hp = 150.clamp(0, 100) // 100`,
    breakdown: `\u2022 Internal mechanics show how the runtime handles this concept.\n\n\u2022 Performance characteristics depend on implementation choices.\n\n\u2022 The compiler/runtime enforces safety rules automatically.\n\n\u2022 Understanding internals helps predict behavior and debug issues.`,
    summary: "Data Classes works through the compiler generating implementations based on properties declared in the primary constructor. Only primary constructor properties participate in generated functions.. Understanding internals helps you write better code and debug effectively."
  },
  {
    title: "Data Classes syntax & usage",
    definition: "Kotlin data classes syntax includes data class Name(val prop: Type), copy() with named parameters, destructuring declarations, component functions, and equals/hashCode based on properties.",
    explanation: `Kotlin provides clear syntax for data classes with several variations depending on your needs. The standard library builds extensively on these foundations.

Basic syntax is straightforward. Advanced usage involves combining multiple features for powerful abstractions.

Naming conventions and code style matter. Following the community established patterns makes your code readable to other Kotlin developers.

Modern Kotlin continues to evolve, adding syntactic improvements while maintaining backwards compatibility with existing code.`,
    code: `// Data Classes - Syntax patterns

// Function types and lambdas
val calculate: (Int, Int) -> Int = { a, b -> a + b }

// Higher-order function
fun <T> List<T>.customFilter(predicate: (T) -> Boolean): List<T> {
    val result = mutableListOf<T>()
    for (item in this) {
        if (predicate(item)) result.add(item)
    }
    return result
}

// Scope functions
data class Player(var name: String, var hp: Int, var level: Int)

val hero = Player("", 0, 0).apply {
    name = "Shadow Blade"
    hp = 100
    level = 1
}

// let for nullable processing
val input: String? = "42"
val score = input?.let { it.toIntOrNull() } ?: 0

// when expression (pattern matching)
fun describe(obj: Any): String = when (obj) {
    is Int -> "Integer: $obj"
    is String -> "String of length ${obj.length}"
    is List<*> -> "List of ${obj.size} items"
    else -> "Unknown"
}

// Inline classes (value classes)
@JvmInline
value class PlayerId(val value: String)

@JvmInline
value class Gold(val amount: Int) {
    operator fun plus(other: Gold) = Gold(amount + other.amount)
}`,
    breakdown: `\u2022 Multiple syntax forms serve different use cases \u2014 choose based on context.\n\n\u2022 The standard library provides ready-made implementations for common patterns.\n\n\u2022 Naming conventions follow Kotlin community standards.\n\n\u2022 Modern Kotlin features reduce boilerplate while maintaining clarity.\n\n\u2022 Each syntax variant has specific trade-offs in readability vs power.`,
    summary: "Kotlin syntax for data classes is expressive and type-safe. Multiple forms serve different needs from simple to complex use cases."
  },
  {
    title: "Practical examples of Data Classes",
    definition: "In real applications, data classes models DTOs, API responses, database entities, configuration, and any value object where identity is based on content rather than reference.",
    explanation: `Real-world Kotlin applications use data classes for data processing, system design, and performance-critical code paths. These patterns appear in production codebases everywhere.

Game development, web services, and system programming all leverage these concepts extensively.

Open-source Kotlin projects provide excellent examples of data classes in action. Studying them accelerates your learning.

The patterns you learn here transfer to related problems. Once you understand the principles, applying them to new situations becomes natural.`,
    code: `// Data Classes - Practical game example

import kotlinx.coroutines.*

// Type-safe builder (DSL)
class InventoryBuilder {
    private val items = mutableListOf<Item>()

    fun weapon(name: String, damage: Int) {
        items.add(Item(name, damage, ItemType.WEAPON))
    }

    fun potion(name: String, heal: Int) {
        items.add(Item(name, heal, ItemType.CONSUMABLE))
    }

    fun build() = Inventory(items.toList())
}

fun inventory(block: InventoryBuilder.() -> Unit): Inventory {
    return InventoryBuilder().apply(block).build()
}

// Usage - reads like a DSL
val playerInventory = inventory {
    weapon("Iron Sword", 45)
    weapon("Fire Staff", 60)
    potion("Health Potion", 50)
    potion("Mana Potion", 30)
}

// Coroutine-based game loop
fun CoroutineScope.gameLoop() = launch {
    var score = 0
    val events = Channel<GameEvent>()

    // Event processor
    launch {
        for (event in events) {
            when (event) {
                is GameEvent.Score -> score += event.points
                is GameEvent.PowerUp -> println("Power up: ${event.type}")
            }
        }
    }

    // Game simulation
    repeat(10) { tick ->
        delay(100)
        events.send(GameEvent.Score(tick * 10))
    }
    events.close()
    println("Final score: $score")
}`,
    breakdown: `\u2022 Real applications combine multiple features for practical solutions.\n\n\u2022 Game and system examples show performance-conscious usage.\n\n\u2022 The pipeline/composition approach keeps code modular and testable.\n\n\u2022 Error handling is integrated throughout \u2014 not an afterthought.\n\n\u2022 These patterns scale from small scripts to large applications.`,
    summary: "Real applications demonstrate data classes in game systems, data processing, and service design. The patterns are universal across Kotlin projects."
  },
  {
    title: "Data Classes best practices",
    definition: "Best practices for data classes include using val (immutable) properties in data classes, keeping data classes focused on data, using copy() for immutable updates, and combining with sealed classes for state modeling.",
    explanation: `Professional Kotlin code follows established conventions for data classes that emerge from years of community experience and real-world usage.

Code review standards emphasize proper usage of these patterns. Following best practices signals professional competence.

Testing is easier when data classes is used correctly as well-structured code is inherently more testable.

Performance and safety are balanced through careful application of these principles. Knowing when to optimize and when readability matters more is a key skill.`,
    code: `// Data Classes - Best practices

// DO: Use non-nullable types by default
fun createPlayer(name: String, hp: Int): Player {
    require(name.isNotBlank()) { "Name required" }
    require(hp > 0) { "HP must be positive" }
    return Player(name, hp, 1)
}

// DO: Use sealed classes for state
sealed interface UiState<out T> {
    object Loading : UiState<Nothing>
    data class Success<T>(val data: T) : UiState<T>
    data class Error(val message: String) : UiState<Nothing>
}

// DO: Use extension functions for utilities
fun <T> List<T>.secondOrNull(): T? = if (size >= 2) this[1] else null
fun Int.toGoldString(): String = "$this gold"

// DO: Use data classes for immutable state
data class GameConfig(
    val maxPlayers: Int = 4,
    val difficulty: Difficulty = Difficulty.NORMAL,
    val mapSize: Int = 100
)

// DO: Use scope functions appropriately
// let: transform nullable
// apply: configure object
// run: compute with receiver
// also: side effects
// with: group operations on object

// DO: Use inline for performance-critical lambdas
inline fun <T> measureTime(block: () -> T): Pair<T, Long> {
    val start = System.currentTimeMillis()
    val result = block()
    return result to (System.currentTimeMillis() - start)
}`,
    breakdown: `\u2022 Following community conventions makes code readable to other developers.\n\n\u2022 Proper error handling prevents crashes and data corruption.\n\n\u2022 Performance considerations guide implementation choices.\n\n\u2022 Testing is easier with well-structured code.\n\n\u2022 Avoid common anti-patterns that lead to bugs or performance issues.`,
    summary: "Best practices ensure code quality: using val (immutable) properties in data classes, keeping data classes focused on data, using copy() for immutable updates, and combining with sealed classes for state modeling.. Following conventions makes code maintainable and professional."
  }
];
