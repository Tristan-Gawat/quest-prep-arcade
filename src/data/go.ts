import { Module } from "./curriculum";

export const goModules: Module[] = [
  {
    id: "go-goroutines",
    title: "Goroutines",
    tier: "EASY",
    lesson: {
      title: "Goroutines",
      concept: "Goroutines are lightweight concurrent functions — spawn thousands without heavy threads.",
      explanation:
        "A goroutine is a function that runs concurrently with other goroutines. Launch one with the 'go' keyword. They're multiplexed onto OS threads by the Go runtime, making them extremely cheap (a few KB each). Use sync.WaitGroup to wait for goroutines to finish. The main goroutine must stay alive or all others are killed.",
      codeExample: `package main

import (
    "fmt"
    "sync"
    "time"
)

func attackEnemy(name string, wg *sync.WaitGroup) {
    defer wg.Done()
    time.Sleep(100 * time.Millisecond)
    fmt.Printf("%s defeated!\\n", name)
}

func main() {
    var wg sync.WaitGroup

    enemies := []string{"Goblin", "Orc", "Dragon"}

    for _, enemy := range enemies {
        wg.Add(1)
        go attackEnemy(enemy, &wg)
    }

    wg.Wait()
    fmt.Println("All enemies defeated!")
}`,
      language: "go",
    },
    quiz: [
      { question: "How do you start a goroutine?", choices: ["thread.start()", "go functionName()", "async functionName()", "spawn functionName()"], correct: 1, explanation: "The 'go' keyword launches a function as a goroutine — it's that simple!" },
      { question: "What happens if main() exits while goroutines are running?", choices: ["They finish in background", "They are immediately killed", "They become threads", "They wait"], correct: 1, explanation: "When main() returns, all goroutines are terminated — use WaitGroup or channels to coordinate." },
      { question: "How much memory does a goroutine start with?", choices: ["1 MB", "A few KB (grows as needed)", "Same as OS thread", "No memory"], correct: 1, explanation: "Goroutines start with ~2-8 KB stack that grows dynamically — much lighter than OS threads!" },
    ],
    challenge: {
      title: "Concurrent Quest Log",
      description: "Create a function `logQuest(name string, wg *sync.WaitGroup)` that prints \"Completed: [name]\". Launch 3 goroutines for quests \"Slay\", \"Find\", \"Deliver\" and wait for all to finish. Print \"All quests done!\" at the end.",
      starterCode: "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n)\n\n// Define logQuest function\n\nfunc main() {\n    // Launch goroutines and wait\n\n}",
      expectedOutput: "Completed: Slay\nCompleted: Find\nCompleted: Deliver\nAll quests done!",
      hints: ["Use defer wg.Done() at the start of logQuest", "Call wg.Add(1) before each go statement", "wg.Wait() blocks until all goroutines call Done()"],
      solution: `package main\n\nimport (\n    "fmt"\n    "sync"\n)\n\nfunc logQuest(name string, wg *sync.WaitGroup) {\n    defer wg.Done()\n    fmt.Printf("Completed: %s\\n", name)\n}\n\nfunc main() {\n    var wg sync.WaitGroup\n    quests := []string{"Slay", "Find", "Deliver"}\n\n    for _, q := range quests {\n        wg.Add(1)\n        go logQuest(q, &wg)\n    }\n\n    wg.Wait()\n    fmt.Println("All quests done!")\n}`,
      language: "go",
    },
  },
  {
    id: "go-channels",
    title: "Channels",
    tier: "EASY",
    lesson: {
      title: "Channels",
      concept: "Channels are typed conduits for communication between goroutines — share by communicating.",
      explanation:
        "Channels let goroutines send and receive values safely. Use make(chan Type) to create. Send with ch <- value, receive with value := <-ch. Unbuffered channels block until both sides are ready. Buffered channels (make(chan T, size)) hold values. Use 'range' to iterate and 'select' for multiple channels.",
      codeExample: `package main

import "fmt"

func generateLoot(ch chan string) {
    items := []string{"Sword", "Shield", "Potion"}
    for _, item := range items {
        ch <- item  // send
    }
    close(ch)  // signal no more items
}

func main() {
    lootChannel := make(chan string)

    go generateLoot(lootChannel)

    // Receive until channel closed
    for item := range lootChannel {
        fmt.Println("Found:", item)
    }

    // Buffered channel
    scores := make(chan int, 3)
    scores <- 100
    scores <- 200
    scores <- 300
    close(scores)

    for s := range scores {
        fmt.Println("Score:", s)
    }
}`,
      language: "go",
    },
    quiz: [
      { question: "What does an unbuffered channel do when you send?", choices: ["Returns immediately", "Blocks until a receiver is ready", "Drops the value", "Panics"], correct: 1, explanation: "Unbuffered channels synchronize: the sender blocks until a receiver takes the value." },
      { question: "How do you signal no more values on a channel?", choices: ["ch = nil", "close(ch)", "ch <- nil", "delete(ch)"], correct: 1, explanation: "close(ch) tells receivers no more values will be sent — range loops then exit." },
      { question: "What does 'select' do with channels?", choices: ["Filters values", "Waits on multiple channels, picks first ready", "Sorts channels", "Creates channels"], correct: 1, explanation: "select blocks until one of multiple channel operations is ready — like a switch for channels." },
    ],
    challenge: {
      title: "Score Pipeline",
      description: "Create a buffered channel of int with capacity 3. Send values 10, 20, 30 into it, close it, then range over it and print each value with \"Score:\" prefix.",
      starterCode: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Create buffered channel\n\n    // Send values and close\n\n    // Range and print\n\n}",
      expectedOutput: "Score: 10\nScore: 20\nScore: 30",
      hints: ["make(chan int, 3) creates a buffered channel", "You can send to buffered channels without a receiver (up to capacity)", "close() before ranging to avoid deadlock"],
      solution: `package main\n\nimport "fmt"\n\nfunc main() {\n    ch := make(chan int, 3)\n    ch <- 10\n    ch <- 20\n    ch <- 30\n    close(ch)\n\n    for score := range ch {\n        fmt.Printf("Score: %d\\n", score)\n    }\n}`,
      language: "go",
    },
  },
  {
    id: "go-interfaces",
    title: "Interfaces",
    tier: "MEDIUM",
    lesson: {
      title: "Interfaces",
      concept: "Interfaces define behavior — any type with the right methods automatically implements them.",
      explanation:
        "Go interfaces are implicit: if a type has all the methods an interface requires, it implements it — no 'implements' keyword needed. This enables powerful decoupling. The empty interface (interface{} or 'any') holds any value. Type assertions and type switches recover the concrete type. Small interfaces (1-2 methods) are idiomatic.",
      codeExample: `package main

import "fmt"

// Interface definition
type Attacker interface {
    Attack() string
    Damage() int
}

// Types implement by having the methods
type Warrior struct{ Name string }
func (w Warrior) Attack() string { return w.Name + " swings sword!" }
func (w Warrior) Damage() int    { return 30 }

type Mage struct{ Name string }
func (m Mage) Attack() string { return m.Name + " casts fireball!" }
func (m Mage) Damage() int    { return 50 }

// Function accepts any Attacker
func battle(a Attacker) {
    fmt.Printf("%s [%d dmg]\\n", a.Attack(), a.Damage())
}

func main() {
    battle(Warrior{Name: "Grok"})
    battle(Mage{Name: "Zara"})

    // Type assertion
    var a Attacker = Mage{Name: "Luna"}
    if mage, ok := a.(Mage); ok {
        fmt.Println("It's a mage:", mage.Name)
    }
}`,
      language: "go",
    },
    quiz: [
      { question: "How does a type implement an interface in Go?", choices: ["Use 'implements' keyword", "Just have all the required methods (implicit)", "Register with the runtime", "Extend the interface"], correct: 1, explanation: "Go interfaces are implicit — any type with matching methods automatically satisfies the interface." },
      { question: "What is the empty interface (interface{})?", choices: ["An error", "Can hold any value (like any/Object)", "A nil interface", "An abstract class"], correct: 1, explanation: "interface{} (or 'any' in Go 1.18+) has no methods, so every type satisfies it." },
      { question: "What does a type assertion do?", choices: ["Validates types at compile time", "Extracts the concrete type from an interface value", "Creates a new type", "Casts primitives"], correct: 1, explanation: "Type assertions access the concrete value inside an interface: val, ok := i.(ConcreteType)." },
    ],
    challenge: {
      title: "Shape Interface",
      description: "Define an interface `Shape` with method `Area() float64`. Implement it for `Circle` (radius float64). Create a function `printArea(s Shape)` that prints the area. Create a circle with radius 5 and print its area.",
      starterCode: "package main\n\nimport (\n    \"fmt\"\n    \"math\"\n)\n\n// Define Shape interface\n\n// Define Circle and implement Area\n\n// Define printArea function\n\nfunc main() {\n    // Create circle and print area\n\n}",
      expectedOutput: "78.53981633974483",
      hints: ["type Shape interface { Area() float64 }", "func (c Circle) Area() float64 { return math.Pi * c.radius * c.radius }", "printArea(s Shape) accepts any Shape"],
      solution: `package main\n\nimport (\n    "fmt"\n    "math"\n)\n\ntype Shape interface {\n    Area() float64\n}\n\ntype Circle struct {\n    radius float64\n}\n\nfunc (c Circle) Area() float64 {\n    return math.Pi * c.radius * c.radius\n}\n\nfunc printArea(s Shape) {\n    fmt.Println(s.Area())\n}\n\nfunc main() {\n    c := Circle{radius: 5}\n    printArea(c)\n}`,
      language: "go",
    },
  },
  {
    id: "go-structs",
    title: "Structs & Embedding",
    tier: "MEDIUM",
    lesson: {
      title: "Structs & Embedding",
      concept: "Structs are Go's custom types; embedding provides composition over inheritance.",
      explanation:
        "Structs group fields into named types. Methods are defined with receiver functions. Go doesn't have inheritance — instead, embed one struct in another for composition. Embedded struct methods are promoted and callable directly. Struct tags provide metadata for serialization (JSON, DB).",
      codeExample: `package main

import (
    "encoding/json"
    "fmt"
)

type Position struct {
    X, Y int
}

func (p Position) String() string {
    return fmt.Sprintf("(%d, %d)", p.X, p.Y)
}

// Embedding — Entity "has a" Position
type Entity struct {
    Position  // embedded — promotes fields and methods
    Name string
    HP   int
}

func (e *Entity) Move(dx, dy int) {
    e.X += dx  // access promoted fields directly
    e.Y += dy
}

// Struct tags for JSON
type Item struct {
    Name   string \`json:"name"\`
    Rarity string \`json:"rarity"\`
    Value  int    \`json:"value"\`
}

func main() {
    hero := Entity{Position: Position{0, 0}, Name: "Knight", HP: 100}
    hero.Move(3, 5)
    fmt.Printf("%s at %s\\n", hero.Name, hero.Position)

    item := Item{Name: "Gem", Rarity: "Epic", Value: 999}
    data, _ := json.Marshal(item)
    fmt.Println(string(data))
}`,
      language: "go",
    },
    quiz: [
      { question: "How does Go achieve code reuse without inheritance?", choices: ["Abstract classes", "Struct embedding (composition)", "Mixins", "Generics only"], correct: 1, explanation: "Go uses embedding: include one struct inside another to promote its fields and methods." },
      { question: "What are struct tags used for?", choices: ["Documentation only", "Metadata for serialization/reflection (e.g., JSON field names)", "Type constraints", "Memory alignment"], correct: 1, explanation: "Struct tags (backtick strings) provide metadata — commonly used for JSON, DB, and validation." },
      { question: "What does a pointer receiver (*Type) allow?", choices: ["Nothing special", "Modifying the struct's fields", "Multiple return values", "Concurrency"], correct: 1, explanation: "Pointer receivers (&self) can modify the struct. Value receivers work on a copy." },
    ],
    challenge: {
      title: "Embed and Extend",
      description: "Create a struct `Stats` with fields HP and MP (both int). Create a struct `Character` that embeds Stats and adds a Name field. Add a method `Info()` on Character that returns \"[Name]: HP=[HP] MP=[MP]\". Print it.",
      starterCode: "package main\n\nimport \"fmt\"\n\n// Define Stats struct\n\n// Define Character struct (embed Stats)\n\n// Add Info method\n\nfunc main() {\n    // Create character and print Info\n\n}",
      expectedOutput: "Rogue: HP=80 MP=40",
      hints: ["Embed Stats directly: type Character struct { Stats; Name string }", "Promoted fields: access c.HP directly", "func (c Character) Info() string { ... }"],
      solution: `package main\n\nimport "fmt"\n\ntype Stats struct {\n    HP int\n    MP int\n}\n\ntype Character struct {\n    Stats\n    Name string\n}\n\nfunc (c Character) Info() string {\n    return fmt.Sprintf("%s: HP=%d MP=%d", c.Name, c.HP, c.MP)\n}\n\nfunc main() {\n    hero := Character{\n        Stats: Stats{HP: 80, MP: 40},\n        Name:  "Rogue",\n    }\n    fmt.Println(hero.Info())\n}`,
      language: "go",
    },
  },
  {
    id: "go-slices",
    title: "Slices & Maps",
    tier: "HARD",
    lesson: {
      title: "Slices & Maps",
      concept: "Slices are dynamic views into arrays; maps are hash tables — Go's core collection types.",
      explanation:
        "Slices are references to contiguous array segments with length and capacity. Use append() to grow, copy() to duplicate. Slicing syntax: s[low:high]. Maps are reference types created with make(). Use comma-ok idiom for safe access. Delete with delete(m, key). Both are nil-safe to read but panic on nil writes.",
      codeExample: `package main

import "fmt"

func main() {
    // Slice operations
    inventory := []string{"Sword", "Shield"}
    inventory = append(inventory, "Bow", "Staff")
    fmt.Println(inventory)      // [Sword Shield Bow Staff]
    fmt.Println(len(inventory)) // 4
    fmt.Println(cap(inventory)) // grows automatically

    // Slicing
    weapons := inventory[0:2]  // [Sword Shield]
    fmt.Println(weapons)

    // Map — hash table
    scores := map[string]int{
        "Player1": 1500,
        "Player2": 2300,
    }
    scores["Player3"] = 900

    // Comma-ok idiom
    if score, exists := scores["Player2"]; exists {
        fmt.Println("Found:", score)
    }

    // Delete
    delete(scores, "Player1")
    fmt.Println("Remaining:", len(scores))
}`,
      language: "go",
    },
    quiz: [
      { question: "What is the difference between a slice and an array in Go?", choices: ["No difference", "Arrays are fixed-size, slices are dynamic views", "Slices are slower", "Arrays are references"], correct: 1, explanation: "Arrays have fixed size [5]int; slices []int are dynamic references into arrays." },
      { question: "What does the comma-ok idiom do with maps?", choices: ["Catches panics", "Checks if a key exists without panic", "Validates types", "Creates entries"], correct: 1, explanation: "val, ok := m[key] — ok is true if key exists, false otherwise. Avoids confusion with zero values." },
      { question: "What does append() return?", choices: ["Nothing, modifies in place", "A new slice (possibly with new backing array)", "An error", "The old slice"], correct: 1, explanation: "append() may allocate a new backing array if capacity is exceeded — always reassign: s = append(s, val)." },
    ],
    challenge: {
      title: "Inventory Manager",
      description: "Create a map[string]int for item quantities. Add \"Potion\" -> 5, \"Arrow\" -> 20, \"Bomb\" -> 3. Use a range loop to find and print the item with the highest quantity.",
      starterCode: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Create map\n\n    // Find max item\n\n    // Print result\n\n}",
      expectedOutput: "Arrow: 20",
      hints: ["Use range to iterate: for item, qty := range inventory", "Track maxItem and maxQty as you iterate", "Compare each qty with current max"],
      solution: `package main\n\nimport "fmt"\n\nfunc main() {\n    inventory := map[string]int{\n        "Potion": 5,\n        "Arrow":  20,\n        "Bomb":   3,\n    }\n\n    maxItem := ""\n    maxQty := 0\n    for item, qty := range inventory {\n        if qty > maxQty {\n            maxItem = item\n            maxQty = qty\n        }\n    }\n\n    fmt.Printf("%s: %d\\n", maxItem, maxQty)\n}`,
      language: "go",
    },
  },
  {
    id: "go-errors",
    title: "Error Handling",
    tier: "HARD",
    lesson: {
      title: "Error Handling",
      concept: "Go handles errors explicitly with return values — no exceptions, no hidden control flow.",
      explanation:
        "Functions return errors as the last return value. Check err != nil after every call. Use errors.New() or fmt.Errorf() to create errors. Custom error types implement the error interface. errors.Is() and errors.As() check wrapped errors. Wrapping with %w preserves the error chain. defer/panic/recover handle truly exceptional cases.",
      codeExample: `package main

import (
    "errors"
    "fmt"
)

// Custom error type
type InsufficientGoldError struct {
    Required int
    Current  int
}

func (e *InsufficientGoldError) Error() string {
    return fmt.Sprintf("need %d gold, have %d", e.Required, e.Current)
}

func buyItem(price, gold int) (string, error) {
    if gold < price {
        return "", &InsufficientGoldError{Required: price, Current: gold}
    }
    return "Item purchased!", nil
}

func main() {
    msg, err := buyItem(100, 50)
    if err != nil {
        var goldErr *InsufficientGoldError
        if errors.As(err, &goldErr) {
            fmt.Printf("Shop: %s\\n", goldErr)
            fmt.Printf("You need %d more gold!\\n", goldErr.Required-goldErr.Current)
        }
        return
    }
    fmt.Println(msg)
}`,
      language: "go",
    },
    quiz: [
      { question: "How does Go signal errors?", choices: ["Throws exceptions", "Returns error as last return value", "Uses panic always", "Global error state"], correct: 1, explanation: "Go returns errors explicitly — the caller decides how to handle them." },
      { question: "What does fmt.Errorf with %w do?", choices: ["Formats and prints", "Wraps an error preserving the chain", "Creates a warning", "Logs the error"], correct: 1, explanation: "The %w verb wraps errors so errors.Is() and errors.As() can traverse the chain." },
      { question: "When should you use panic?", choices: ["For all errors", "Only for truly unrecoverable situations (programmer bugs)", "For user errors", "Never"], correct: 1, explanation: "panic is for unrecoverable bugs (nil deref, impossible state) — not for expected errors like file-not-found." },
    ],
    challenge: {
      title: "Safe Division",
      description: "Write a function `divide(a, b float64) (float64, error)` that returns an error if b is 0. Call it with 10 and 0, handle the error and print it. Then call with 10 and 2 and print the result.",
      starterCode: "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n)\n\n// Define divide function\n\nfunc main() {\n    // Try division by zero\n\n    // Try valid division\n\n}",
      expectedOutput: "Error: cannot divide by zero\nResult: 5",
      hints: ["Return errors.New(\"cannot divide by zero\") when b == 0", "Check if err != nil after calling divide", "Use fmt.Printf for formatted output"],
      solution: `package main\n\nimport (\n    "errors"\n    "fmt"\n)\n\nfunc divide(a, b float64) (float64, error) {\n    if b == 0 {\n        return 0, errors.New("cannot divide by zero")\n    }\n    return a / b, nil\n}\n\nfunc main() {\n    _, err := divide(10, 0)\n    if err != nil {\n        fmt.Printf("Error: %s\\n", err)\n    }\n\n    result, err := divide(10, 2)\n    if err == nil {\n        fmt.Printf("Result: %g\\n", result)\n    }\n}`,
      language: "go",
    },
  },
];
