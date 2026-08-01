import { Module } from "./curriculum";

export const swiftModules: Module[] = [
  {
    id: "swift-optionals",
    title: "Optionals",
    tier: "EASY",
    lesson: {
      title: "Optionals",
      concept: "Optionals represent values that might be absent — Swift's way of handling nil safely at compile time.",
      explanation:
        "An Optional wraps a type to indicate it may or may not contain a value. Declare with ? (String?). Unwrap safely with if-let, guard-let, or nil coalescing (??). Force unwrapping (!) crashes if nil. Optional chaining (?.) calls methods on optionals without unwrapping. Optionals eliminate null pointer crashes by making absence explicit in the type system.",
      codeExample: `// Declaring optionals
var playerName: String? = "Arcade Hero"
var bossName: String? = nil

// Safe unwrapping with if-let
if let name = playerName {
  print("Player: \\(name)")
} else {
  print("No player found")
}

// Guard-let for early exit
func greetPlayer(name: String?) {
  guard let unwrapped = name else {
    print("No name provided")
    return
  }
  print("Hello, \\(unwrapped)!")
}

// Nil coalescing operator
let displayName = bossName ?? "Unknown Boss"
print(displayName) // "Unknown Boss"

// Optional chaining
let nameLength = playerName?.count // Optional<Int>
print(nameLength ?? 0) // 10

// Force unwrap (dangerous — only when certain)
let definite: String = playerName! // Crashes if nil`,
      language: "swift",
    },
    quiz: [
      { question: "What does String? mean in Swift?", choices: ["A required string", "A string that might be nil", "A string with a question", "An invalid type"], correct: 1, explanation: "The ? makes it an Optional<String> — it can hold a String value or nil." },
      { question: "What does the ?? operator do?", choices: ["Checks equality", "Provides a default value if the optional is nil", "Force unwraps", "Throws an error"], correct: 1, explanation: "The nil coalescing operator (??) returns the left value if non-nil, otherwise returns the right default value." },
      { question: "When does force unwrapping (!) crash?", choices: ["Always", "When the optional contains a value", "When the optional is nil", "Never in release builds"], correct: 2, explanation: "Force unwrapping with ! causes a runtime crash if the optional is nil — use only when you're 100% sure it has a value." },
    ],
    challenge: {
      title: "Safe Loot Box",
      description: "Create an optional String variable 'weapon' set to \"Dragon Blade\". Use if-let to safely unwrap it and print \"Equipped: Dragon Blade\". Then create a nil optional 'shield' and use ?? to print \"Shield: None\".",
      starterCode: "// Create optional weapon\n\n// Safely unwrap and print\n\n// Create nil shield and use nil coalescing\n",
      expectedOutput: "Equipped: Dragon Blade\nShield: None",
      hints: ["var weapon: String? = \"Dragon Blade\"", "Use if let w = weapon { print(\"Equipped: \\(w)\") }", "Use let display = shield ?? \"None\""],
      solution: `var weapon: String? = "Dragon Blade"\n\nif let w = weapon {\n  print("Equipped: \\(w)")\n}\n\nvar shield: String? = nil\nprint("Shield: \\(shield ?? "None")")`,
      language: "swift",
    },
  },
  {
    id: "swift-structs-classes",
    title: "Structs & Classes",
    tier: "EASY",
    lesson: {
      title: "Structs & Classes",
      concept: "Structs are value types (copied on assignment) while classes are reference types (shared). Swift favors structs for most data.",
      explanation:
        "Structs get a free memberwise initializer, are copied when assigned or passed, and are preferred for models. Classes support inheritance, reference counting (ARC), and identity comparison (===). Use structs by default — use classes only when you need inheritance or reference semantics. Both support properties, methods, initializers, and protocol conformance.",
      codeExample: `// Struct (value type)
struct Weapon {
  var name: String
  var damage: Int
  var durability: Int

  mutating func use() {
    durability -= 1
    print("\\(name) used! Durability: \\(durability)")
  }
}

var sword = Weapon(name: "Iron Sword", damage: 25, durability: 100)
var backup = sword // Copy!
backup.name = "Backup Sword"
print(sword.name)  // "Iron Sword" (unchanged)

// Class (reference type)
class Player {
  var name: String
  var health: Int
  var weapon: Weapon?

  init(name: String, health: Int) {
    self.name = name
    self.health = health
  }

  func takeDamage(_ amount: Int) {
    health -= amount
    print("\\(name) took \\(amount) damage! HP: \\(health)")
  }
}

let player1 = Player(name: "Hero", health: 100)
let player2 = player1 // Same reference!
player2.name = "Changed"
print(player1.name) // "Changed" (shared!)`,
      language: "swift",
    },
    quiz: [
      { question: "What happens when you assign a struct to a new variable?", choices: ["They share the same data", "A copy is made", "It creates a reference", "It throws an error"], correct: 1, explanation: "Structs are value types — assigning creates an independent copy. Changes to one don't affect the other." },
      { question: "Why must struct methods that modify properties use 'mutating'?", choices: ["It's optional style", "Structs are immutable by default, mutating allows modification", "It prevents copies", "It makes them thread-safe"], correct: 1, explanation: "Struct instances assigned to 'let' are fully immutable. 'mutating' marks methods that modify self and requires a 'var' instance." },
      { question: "When should you use a class instead of a struct?", choices: ["Always for performance", "When you need inheritance or shared references", "When you have more than 3 properties", "Classes are deprecated in Swift"], correct: 1, explanation: "Use classes when you need inheritance, reference semantics, or identity comparison (===)." },
    ],
    challenge: {
      title: "Game Character Struct",
      description: "Create a struct `GameCharacter` with properties name (String), level (Int), and xp (Int). Add a mutating method `gainXP(_ amount: Int)` that adds XP and prints \"{name} gained {amount} XP! Total: {xp}\". Create a character \"Hero\" at level 1 with 0 xp, call gainXP(500).",
      starterCode: "// Define GameCharacter struct\n\n// Create instance and gain XP\n",
      expectedOutput: "Hero gained 500 XP! Total: 500",
      hints: ["Use struct GameCharacter { var name: String; var level: Int; var xp: Int }", "Mark the method as 'mutating' since it modifies xp", "Use the memberwise initializer: GameCharacter(name: \"Hero\", level: 1, xp: 0)"],
      solution: `struct GameCharacter {\n  var name: String\n  var level: Int\n  var xp: Int\n\n  mutating func gainXP(_ amount: Int) {\n    xp += amount\n    print("\\(name) gained \\(amount) XP! Total: \\(xp)")\n  }\n}\n\nvar hero = GameCharacter(name: "Hero", level: 1, xp: 0)\nhero.gainXP(500)`,
      language: "swift",
    },
  },
  {
    id: "swift-protocols",
    title: "Protocols",
    tier: "MEDIUM",
    lesson: {
      title: "Protocols",
      concept: "Protocols define a contract of properties and methods that conforming types must implement — Swift's approach to polymorphism.",
      explanation:
        "Protocols declare requirements without implementation. Types conform with ':'. Protocol extensions provide default implementations. Protocols support associated types for generics, and protocol composition (Protocol1 & Protocol2) for combining requirements. They enable dependency injection and testability. Swift's standard library uses protocols extensively (Equatable, Hashable, Codable).",
      codeExample: `// Define protocols
protocol Damageable {
  var health: Int { get set }
  func takeDamage(_ amount: Int)
}

protocol Attackable {
  var attackPower: Int { get }
  func attack(_ target: inout any Damageable)
}

// Protocol extension with default implementation
extension Damageable {
  func isAlive() -> Bool {
    return health > 0
  }
}

// Conforming types
struct Monster: Damageable, Attackable {
  var name: String
  var health: Int
  var attackPower: Int

  func takeDamage(_ amount: Int) {
    // Structs need mutating, simplified here
    print("\\(name) takes \\(amount) damage!")
  }

  func attack(_ target: inout any Damageable) {
    target.takeDamage(attackPower)
  }
}

// Protocol as type
func heal(_ entity: inout any Damageable, amount: Int) {
  entity.health += amount
  print("Healed for \\(amount)! HP: \\(entity.health)")
}

// Protocol composition
func battleReady(_ entity: any Damageable & Attackable) -> Bool {
  return entity.health > 0 && entity.attackPower > 0
}`,
      language: "swift",
    },
    quiz: [
      { question: "What is a protocol in Swift?", choices: ["A class base type", "A contract that defines required properties and methods", "A design pattern", "A module import"], correct: 1, explanation: "Protocols define what properties and methods a conforming type must have — without dictating how." },
      { question: "What do protocol extensions provide?", choices: ["Storage for properties", "Default implementations of protocol methods", "Inheritance from classes", "Generic constraints"], correct: 1, explanation: "Protocol extensions let you provide default behavior — conforming types get it for free or can override." },
      { question: "What does Protocol1 & Protocol2 mean?", choices: ["Inheritance chain", "Protocol composition — type must conform to both", "Logical AND of protocols", "Protocol intersection type"], correct: 1, explanation: "Protocol composition requires a type to conform to multiple protocols simultaneously." },
    ],
    challenge: {
      title: "Describable Protocol",
      description: "Create a protocol `Describable` with a method `describe() -> String`. Create a struct `Potion` with name (String) and power (Int) that conforms to Describable, returning \"{name} (Power: {power})\". Create a potion \"Elixir\" with power 50 and print its description.",
      starterCode: "// Define Describable protocol\n\n// Define Potion struct conforming to it\n\n// Create and print\n",
      expectedOutput: "Elixir (Power: 50)",
      hints: ["protocol Describable { func describe() -> String }", "struct Potion: Describable { ... }", "Return \"\\(name) (Power: \\(power))\" from describe()"],
      solution: `protocol Describable {\n  func describe() -> String\n}\n\nstruct Potion: Describable {\n  var name: String\n  var power: Int\n\n  func describe() -> String {\n    return "\\(name) (Power: \\(power))"\n  }\n}\n\nlet potion = Potion(name: "Elixir", power: 50)\nprint(potion.describe())`,
      language: "swift",
    },
  },
  {
    id: "swift-closures",
    title: "Closures",
    tier: "MEDIUM",
    lesson: {
      title: "Closures",
      concept: "Closures are self-contained blocks of code that capture and store references to variables from their surrounding context.",
      explanation:
        "Closures are anonymous functions: { (params) -> ReturnType in body }. They can be stored in variables, passed as arguments, and returned from functions. Swift offers trailing closure syntax for cleaner code. Closures capture values from their enclosing scope. Shorthand argument names ($0, $1) reduce boilerplate. Use @escaping for closures that outlive the function call.",
      codeExample: `// Full closure syntax
let multiply: (Int, Int) -> Int = { (a: Int, b: Int) -> Int in
  return a * b
}
print(multiply(5, 3)) // 15

// Shortened forms
let add: (Int, Int) -> Int = { $0 + $1 }
print(add(10, 5)) // 15

// Closure as function parameter
func applyBuff(to value: Int, using buff: (Int) -> Int) -> Int {
  return buff(value)
}

let doubled = applyBuff(to: 50) { $0 * 2 }
print(doubled) // 100

// Trailing closure syntax
let scores = [85, 42, 97, 63, 55]
let highScores = scores.filter { $0 >= 70 }.sorted { $0 > $1 }
print(highScores) // [97, 85]

// Capturing values
func makeCounter() -> () -> Int {
  var count = 0
  return {
    count += 1
    return count
  }
}

let counter = makeCounter()
print(counter()) // 1
print(counter()) // 2
print(counter()) // 3`,
      language: "swift",
    },
    quiz: [
      { question: "What are $0, $1 in closures?", choices: ["Global variables", "Shorthand for the first and second arguments", "Array indices", "Error codes"], correct: 1, explanation: "Swift provides shorthand argument names ($0, $1, $2...) so you don't need to name closure parameters." },
      { question: "What does 'capturing values' mean for closures?", choices: ["Copying all global variables", "The closure retains references to variables from its enclosing scope", "Storing return values", "Preventing garbage collection"], correct: 1, explanation: "Closures capture and store references to variables from the surrounding context, keeping them alive." },
      { question: "When is trailing closure syntax used?", choices: ["When a closure returns void", "When the last parameter of a function is a closure", "When using map/filter", "Only with sorted()"], correct: 1, explanation: "Trailing closure syntax lets you write the closure after the function's parentheses when it's the last argument." },
    ],
    challenge: {
      title: "Score Transformer",
      description: "Create an array of scores [10, 25, 50, 75, 100]. Use the map closure to double each score, then use filter to keep only scores above 50. Print the result array.",
      starterCode: "// Create scores array\n\n// Map to double, then filter > 50\n\n// Print result\n",
      expectedOutput: "[100, 150, 200]",
      hints: ["Use .map { $0 * 2 } to double each element", "Chain .filter { $0 > 50 } after map", "The result of [10,25,50,75,100] doubled then filtered > 50 is [100, 150, 200]"],
      solution: `let scores = [10, 25, 50, 75, 100]\nlet result = scores.map { $0 * 2 }.filter { $0 > 50 }\nprint(result)`,
      language: "swift",
    },
  },
  {
    id: "swift-enums",
    title: "Enums with Associated Values",
    tier: "HARD",
    lesson: {
      title: "Enums with Associated Values",
      concept: "Swift enums are powerful algebraic data types that can hold associated values, conform to protocols, and contain methods.",
      explanation:
        "Swift enums go far beyond simple constants. They can have raw values (String, Int), associated values of different types per case, computed properties, methods, and conform to protocols. Use switch with pattern matching to extract associated values. Enums with associated values model states elegantly (Result, Optional are enums!). Indirect cases enable recursive enums.",
      codeExample: `// Enum with associated values
enum GameEvent {
  case damage(amount: Int, source: String)
  case heal(amount: Int)
  case levelUp(newLevel: Int, skillUnlocked: String)
  case gameOver(score: Int, reason: String)
}

func handleEvent(_ event: GameEvent) {
  switch event {
  case .damage(let amount, let source):
    print("Took \\(amount) damage from \\(source)!")
  case .heal(let amount):
    print("Healed \\(amount) HP!")
  case .levelUp(let level, let skill):
    print("Level \\(level)! Unlocked: \\(skill)")
  case .gameOver(let score, let reason):
    print("Game Over! Score: \\(score) (\\(reason))")
  }
}

handleEvent(.damage(amount: 30, source: "Dragon"))
handleEvent(.levelUp(newLevel: 5, skillUnlocked: "Fireball"))

// Enum with raw values and methods
enum Element: String, CaseIterable {
  case fire = "🔥"
  case water = "💧"
  case earth = "🌍"

  var weakness: Element {
    switch self {
    case .fire: return .water
    case .water: return .earth
    case .earth: return .fire
    }
  }
}

let elem = Element.fire
print("\\(elem.rawValue) weak to \\(elem.weakness.rawValue)")

// Iterate all cases
for e in Element.allCases {
  print(e.rawValue)
}`,
      language: "swift",
    },
    quiz: [
      { question: "What are associated values in Swift enums?", choices: ["Default values for all cases", "Data attached to specific enum cases with different types", "Raw values", "Protocol requirements"], correct: 1, explanation: "Associated values let each enum case carry different types of data — making enums incredibly expressive." },
      { question: "How do you extract associated values?", choices: ["With dot notation", "Pattern matching in switch/if-case with let bindings", "Calling .value", "Using rawValue"], correct: 1, explanation: "Use 'case .name(let value)' in switch or 'if case' to destructure and bind associated values." },
      { question: "What does CaseIterable provide?", choices: ["A count property", "An allCases array of every enum case", "Equality checking", "String conversion"], correct: 1, explanation: "CaseIterable auto-generates an allCases property containing every case in the enum." },
    ],
    challenge: {
      title: "Quest Result Enum",
      description: "Create an enum `QuestResult` with cases: success(reward: String, xp: Int) and failure(reason: String). Create a function `announce` that switches on a QuestResult and prints the appropriate message. Call it with .success(reward: \"Gold Sword\", xp: 500) printing \"Quest Complete! Reward: Gold Sword (+500 XP)\".",
      starterCode: "// Define QuestResult enum\n\n// Define announce function\n\n// Call with success case\n",
      expectedOutput: "Quest Complete! Reward: Gold Sword (+500 XP)",
      hints: ["enum QuestResult { case success(reward: String, xp: Int); case failure(reason: String) }", "Use switch with pattern matching: case .success(let reward, let xp)", "Print the formatted string with interpolation"],
      solution: `enum QuestResult {\n  case success(reward: String, xp: Int)\n  case failure(reason: String)\n}\n\nfunc announce(_ result: QuestResult) {\n  switch result {\n  case .success(let reward, let xp):\n    print("Quest Complete! Reward: \\(reward) (+\\(xp) XP)")\n  case .failure(let reason):\n    print("Quest Failed: \\(reason)")\n  }\n}\n\nannounce(.success(reward: "Gold Sword", xp: 500))`,
      language: "swift",
    },
  },
  {
    id: "swift-generics",
    title: "Generics",
    tier: "HARD",
    lesson: {
      title: "Generics",
      concept: "Generics let you write flexible, reusable code that works with any type while maintaining full type safety.",
      explanation:
        "Generic functions and types use placeholder types (<T>). Constrain generics with protocol requirements (T: Equatable) to access specific functionality. Generic types like Array, Dictionary, and Optional are built with generics. Use 'where' clauses for complex constraints. Associated types in protocols serve as generic placeholders. Type erasure (any Protocol) handles heterogeneous collections.",
      codeExample: `// Generic function
func swapValues<T>(_ a: inout T, _ b: inout T) {
  let temp = a
  a = b
  b = temp
}

var x = 10, y = 20
swapValues(&x, &y)
print("x: \\(x), y: \\(y)") // x: 20, y: 10

// Generic type with constraint
struct Inventory<Item: CustomStringConvertible> {
  private var items: [Item] = []

  mutating func add(_ item: Item) {
    items.append(item)
    print("Added: \\(item.description)")
  }

  func list() -> [Item] {
    return items
  }

  var count: Int { items.count }
}

// Generic with where clause
func findBest<T: Comparable>(in array: [T]) -> T? where T: CustomStringConvertible {
  guard let best = array.max() else { return nil }
  print("Best: \\(best.description)")
  return best
}

// Protocol with associated type
protocol Container {
  associatedtype Element
  mutating func add(_ item: Element)
  var count: Int { get }
  subscript(i: Int) -> Element { get }
}

// Generic extension
extension Array where Element: Numeric {
  func total() -> Element {
    return reduce(0, +)
  }
}

let scores = [100, 250, 75, 300]
print(scores.total()) // 725`,
      language: "swift",
    },
    quiz: [
      { question: "What does <T: Equatable> mean?", choices: ["T can be any type", "T must conform to the Equatable protocol", "T is equal to something", "T is a type alias"], correct: 1, explanation: "The constraint requires T to implement Equatable, letting you use == inside the function." },
      { question: "What is an associated type in a protocol?", choices: ["A type alias", "A placeholder type defined by conforming types", "A generic parameter", "A nested class"], correct: 1, explanation: "Associated types are protocol-level generics — each conforming type decides what concrete type to use." },
      { question: "What does the 'where' clause add to generics?", choices: ["Runtime checks", "Additional type constraints beyond the basic declaration", "Error handling", "Memory management rules"], correct: 1, explanation: "Where clauses let you express complex constraints like requiring conformance to multiple protocols or matching associated types." },
    ],
    challenge: {
      title: "Generic Stack",
      description: "Create a generic struct `Stack<Element>` with methods push(_ item: Element), pop() -> Element?, and a computed property isEmpty -> Bool. Use an internal array. Create a Stack<String>, push \"Fireball\" and \"Ice Blast\", pop one and print it.",
      starterCode: "// Define generic Stack\n\n// Create and use Stack<String>\n",
      expectedOutput: "Ice Blast",
      hints: ["struct Stack<Element> { private var items: [Element] = [] }", "pop() should removeLast() and return it, or return nil if empty", "Use a computed property: var isEmpty: Bool { items.isEmpty }"],
      solution: `struct Stack<Element> {\n  private var items: [Element] = []\n\n  mutating func push(_ item: Element) {\n    items.append(item)\n  }\n\n  mutating func pop() -> Element? {\n    return items.isEmpty ? nil : items.removeLast()\n  }\n\n  var isEmpty: Bool {\n    return items.isEmpty\n  }\n}\n\nvar spells = Stack<String>()\nspells.push("Fireball")\nspells.push("Ice Blast")\nif let spell = spells.pop() {\n  print(spell)\n}`,
      language: "swift",
    },
  },
];
