// Pre-written lessons for Swift Module: Optionals

export const swiftOptionalsLessons = [
  {
    title: "What is Optionals?",
    definition: "Optionals in Swift represent values that might be absent (nil). Swift’s type system distinguishes between Type (guaranteed value) and Type? (might be nil), preventing null reference crashes at compile time.",
    explanation: `Optionals is a core concept in Swift that every developer needs to master. It provides the foundation for writing efficient, safe, and maintainable code.

Understanding this concept deeply enables you to leverage the language's strengths and avoid common pitfalls that plague beginners.

Swift's approach to optionals is unique among programming languages, offering specific guarantees and trade-offs that shape how you design your programs.

By mastering optionals, you unlock powerful patterns and idioms that are standard in professional Swift development.`,
    code: `// Optionals in Swift - Basics
import Foundation

// Optional declaration
var playerName: String? = "Shadow Knight"
var mana: Int? = nil

// Safe unwrapping with if-let
if let name = playerName {
    print("Hero: \(name)")
}

// Guard let for early exit
func greet(name: String?) {
    guard let name = name else {
        print("No name provided")
        return
    }
    print("Hello, \(name)!")
}

// Nil-coalescing
let displayName = playerName ?? "Anonymous"
let currentMana = mana ?? 0

// Optional chaining
let nameLength = playerName?.count // Int?
let uppercased = playerName?.uppercased() // String?

// Struct (value type)
struct Player {
    var name: String
    var hp: Int
    var maxHp: Int

    var hpPercent: Double {
        Double(hp) / Double(maxHp) * 100
    }

    mutating func takeDamage(_ amount: Int) {
        hp = max(0, hp - amount)
    }
}

var hero = Player(name: "Kai", hp: 100, maxHp: 100)
hero.takeDamage(30)
print("\(hero.name): \(hero.hp)/\(hero.maxHp)")`,
    breakdown: `\u2022 The basic declaration shows how to define and use optionals in Swift.\n\n\u2022 Type safety ensures the compiler catches errors before runtime.\n\n\u2022 Standard library integration makes common operations concise.\n\n\u2022 Comments explain each line's purpose for learners.\n\n\u2022 The example demonstrates the most common usage pattern.`,
    summary: "Optionals in Swift provides represent values that might be absent (nil). Swift’s type system distinguishes between Type (guaranteed value) and Type? (might be nil), preventing null reference crashes at compile time.. It's fundamental to writing correct, efficient Swift code."
  },
  {
    title: "How Optionals works",
    definition: "Optionals works by wrapping values in an Optional enum with .some(value) or .none cases. Unwrapping extracts the value safely through if-let, guard-let, optional chaining, or force-unwrapping (!).",
    explanation: `Under the hood, optionals in Swift involves specific compile-time and runtime mechanisms. The interpreter enforces rules that ensure correctness.

The implementation details affect performance characteristics and memory usage patterns that matter in production systems.

Understanding how optionals works internally helps you predict behavior, debug issues, and write more efficient code.

This knowledge separates intermediate developers from advanced ones and is the difference between using a feature and truly understanding it.`,
    code: `// Optionals - How it works

// Value vs Reference semantics
struct Point {
    var x: Double
    var y: Double
}

var p1 = Point(x: 1, y: 2)
var p2 = p1  // COPY (value type)
p2.x = 99
print(p1.x)  // still 1! (independent copy)

class Enemy {
    var name: String
    var hp: Int
    init(name: String, hp: Int) {
        self.name = name
        self.hp = hp
    }
}

let e1 = Enemy(name: "Goblin", hp: 50)
let e2 = e1  // SHARED reference
e2.hp = 0
print(e1.hp)  // 0! (same object)

// Protocol (interface)
protocol Attackable {
    var damage: Int { get }
    func attack(target: inout Player)
}

// Protocol extension with default implementation
extension Attackable {
    func attack(target: inout Player) {
        target.takeDamage(damage)
        print("Dealt \(damage) damage!")
    }
}

// Enum with associated values
enum GameState {
    case menu
    case playing(level: Int)
    case paused
    case gameOver(score: Int)
}`,
    breakdown: `\u2022 Internal mechanics show how the runtime handles this concept.\n\n\u2022 Performance characteristics depend on implementation choices.\n\n\u2022 The compiler/runtime enforces safety rules automatically.\n\n\u2022 Understanding internals helps predict behavior and debug issues.`,
    summary: "Optionals works through wrapping values in an Optional enum with .some(value) or .none cases. Unwrapping extracts the value safely through if-let, guard-let, optional chaining, or force-unwrapping (!).. Understanding internals helps you write better code and debug effectively."
  },
  {
    title: "Optionals syntax & usage",
    definition: "Swift optionals syntax includes Type? declaration, if let binding, guard let early exit, ?? nil-coalescing, ?. optional chaining, and ! force unwrap (use sparingly).",
    explanation: `Swift provides clear syntax for optionals with several variations depending on your needs. The standard library builds extensively on these foundations.

Basic syntax is straightforward. Advanced usage involves combining multiple features for powerful abstractions.

Naming conventions and code style matter. Following the community established patterns makes your code readable to other Swift developers.

Modern Swift continues to evolve, adding syntactic improvements while maintaining backwards compatibility with existing code.`,
    code: `// Optionals - Syntax patterns

// Generic function
func findMax<T: Comparable>(_ items: [T]) -> T? {
    items.max()
}

let maxScore = findMax([85, 92, 78, 95]) // 95
let maxName = findMax(["Alice", "Bob", "Zara"]) // "Zara"

// Closure syntax
let scores = [85, 92, 78, 95, 88]
let high = scores.filter { $0 >= 90 } // [92, 95]
let doubled = scores.map { $0 * 2 }
let total = scores.reduce(0, +) // 438

// Trailing closure
UIView.animate(withDuration: 0.3) {
    view.alpha = 1.0
}

// Result type for error handling
enum GameError: Error {
    case invalidMove
    case outOfMana(required: Int)
}

func castSpell(mana: Int, cost: Int) -> Result<Int, GameError> {
    if mana < cost {
        return .failure(.outOfMana(required: cost))
    }
    return .success(mana - cost)
}

switch castSpell(mana: 30, cost: 50) {
case .success(let remaining):
    print("Mana left: \(remaining)")
case .failure(.outOfMana(let required)):
    print("Need \(required) mana!")
case .failure(let error):
    print("Error: \(error)")
}`,
    breakdown: `\u2022 Multiple syntax forms serve different use cases \u2014 choose based on context.\n\n\u2022 The standard library provides ready-made implementations for common patterns.\n\n\u2022 Naming conventions follow Swift community standards.\n\n\u2022 Modern Swift features reduce boilerplate while maintaining clarity.\n\n\u2022 Each syntax variant has specific trade-offs in readability vs power.`,
    summary: "Swift syntax for optionals is expressive and type-safe. Multiple forms serve different needs from simple to complex use cases."
  },
  {
    title: "Practical examples of Optionals",
    definition: "In real applications, optionals handles missing data from APIs, user input that may be empty, dictionary lookups, array bounds checks, and any situation where absence is valid.",
    explanation: `Real-world Swift applications use optionals for data processing, system design, and performance-critical code paths. These patterns appear in production codebases everywhere.

Game development, web services, and system programming all leverage these concepts extensively.

Open-source Swift projects provide excellent examples of optionals in action. Studying them accelerates your learning.

The patterns you learn here transfer to related problems. Once you understand the principles, applying them to new situations becomes natural.`,
    code: `// Optionals - Practical game system

protocol GameEntity {
    var id: UUID { get }
    var name: String { get }
    var position: Point { get set }
}

protocol Damageable: GameEntity {
    var hp: Int { get set }
    var maxHp: Int { get }
    var isAlive: Bool { get }
    mutating func takeDamage(_ amount: Int)
}

extension Damageable {
    var isAlive: Bool { hp > 0 }
    mutating func takeDamage(_ amount: Int) {
        hp = max(0, hp - amount)
    }
}

struct Warrior: Damageable {
    let id = UUID()
    var name: String
    var position: Point
    var hp: Int
    let maxHp: Int
    var armor: Int

    mutating func takeDamage(_ amount: Int) {
        let reduced = max(0, amount - armor)
        hp = max(0, hp - reduced)
    }
}

// Type-safe event system
enum GameEvent {
    case damage(target: String, amount: Int)
    case heal(target: String, amount: Int)
    case levelUp(player: String, newLevel: Int)
}

func handle(_ event: GameEvent) {
    switch event {
    case .damage(let target, let amount):
        print("\(target) took \(amount) damage")
    case .heal(let target, let amount):
        print("\(target) healed \(amount)")
    case .levelUp(let player, let level):
        print("\(player) reached level \(level)!")
    }
}`,
    breakdown: `\u2022 Real applications combine multiple features for practical solutions.\n\n\u2022 Game and system examples show performance-conscious usage.\n\n\u2022 The pipeline/composition approach keeps code modular and testable.\n\n\u2022 Error handling is integrated throughout \u2014 not an afterthought.\n\n\u2022 These patterns scale from small scripts to large applications.`,
    summary: "Real applications demonstrate optionals in game systems, data processing, and service design. The patterns are universal across Swift projects."
  },
  {
    title: "Optionals best practices",
    definition: "Best practices for optionals include preferring if-let/guard-let over force unwrapping, using ?? for defaults, optional chaining for nested access, and never force-unwrapping unless you’ve proven non-nil.",
    explanation: `Professional Swift code follows established conventions for optionals that emerge from years of community experience and real-world usage.

Code review standards emphasize proper usage of these patterns. Following best practices signals professional competence.

Testing is easier when optionals is used correctly as well-structured code is inherently more testable.

Performance and safety are balanced through careful application of these principles. Knowing when to optimize and when readability matters more is a key skill.`,
    code: `// Optionals - Best practices

// DO: Prefer structs over classes
struct GameConfig {
    let maxPlayers: Int
    let difficulty: Difficulty
    let mapSize: Size
}

// DO: Use guard-let for early exit
func processInput(_ input: String?) -> String {
    guard let input = input, !input.isEmpty else {
        return "default"
    }
    return input.trimmingCharacters(in: .whitespaces)
}

// DO: Use enums for fixed state sets
enum LoadingState<T> {
    case idle
    case loading
    case success(T)
    case failure(Error)
}

// DO: Protocol-oriented design
protocol Serializable {
    func serialize() -> Data
    static func deserialize(from data: Data) -> Self?
}

// DO: Use computed properties over methods for simple getters
extension Player {
    var isFullHealth: Bool { hp == maxHp }
    var healthBar: String {
        let filled = Int(hpPercent / 10)
        return String(repeating: "\u2588", count: filled) +
               String(repeating: "\u2591", count: 10 - filled)
    }
}

// DON'T: Force unwrap without checking
// let name = playerName! // CRASH if nil!
// DO: Use if-let or guard-let instead`,
    breakdown: `\u2022 Following community conventions makes code readable to other developers.\n\n\u2022 Proper error handling prevents crashes and data corruption.\n\n\u2022 Performance considerations guide implementation choices.\n\n\u2022 Testing is easier with well-structured code.\n\n\u2022 Avoid common anti-patterns that lead to bugs or performance issues.`,
    summary: "Best practices ensure code quality: preferring if-let/guard-let over force unwrapping, using ?? for defaults, optional chaining for nested access, and never force-unwrapping unless you’ve proven non-nil.. Following conventions makes code maintainable and professional."
  }
];
