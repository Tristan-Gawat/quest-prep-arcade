// Pre-written lessons for Go Module: Slices

export const goSlicesLessons = [
  {
    title: "What is Slices?",
    definition: "Slices in Go are dynamic-length, flexible views into arrays. They provide the primary collection type in Go with built-in append, copy, and slicing operations.",
    explanation: `Slices is a core concept in Go that every developer needs to master. It provides the foundation for writing efficient, safe, and maintainable code.

Understanding this concept deeply enables you to leverage the language's strengths and avoid common pitfalls that plague beginners.

Go's approach to slices is unique among programming languages, offering specific guarantees and trade-offs that shape how you design your programs.

By mastering slices, you unlock powerful patterns and idioms that are standard in professional Go development.`,
    code: `// Slices in Go - Basics
package main

import (
    "fmt"
    "sync"
    "time"
)

func main() {
    fmt.Println("Slices demonstration")

    // Basic goroutine
    go func() {
        fmt.Println("Running concurrently!")
    }()

    // Channel communication
    ch := make(chan string)
    go func() {
        ch <- "Hello from goroutine"
    }()
    msg := <-ch
    fmt.Println(msg)

    // WaitGroup for synchronization
    var wg sync.WaitGroup
    for i := 0; i < 3; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            fmt.Printf("Worker %d done\n", id)
        }(i)
    }
    wg.Wait()
    fmt.Println("All workers complete")
}`,
    breakdown: `\u2022 The basic declaration shows how to define and use slices in Go.\n\n\u2022 Type safety ensures the compiler catches errors before runtime.\n\n\u2022 Standard library integration makes common operations concise.\n\n\u2022 Comments explain each line's purpose for learners.\n\n\u2022 The example demonstrates the most common usage pattern.`,
    summary: "Slices in Go provides are dynamic-length, flexible views into arrays. They provide the primary collection type in Go with built-in append, copy, and slicing operations.. It's fundamental to writing correct, efficient Go code."
  },
  {
    title: "How Slices works",
    definition: "Slices works by referencing an underlying array with a pointer, length, and capacity. Multiple slices can share the same backing array. Append may allocate a new array when capacity is exceeded.",
    explanation: `Under the hood, slices in Go involves specific compile-time and runtime mechanisms. The runtime scheduler enforces rules that ensure correctness.

The implementation details affect performance characteristics and memory usage patterns that matter in production systems.

Understanding how slices works internally helps you predict behavior, debug issues, and write more efficient code.

This knowledge separates intermediate developers from advanced ones and is the difference between using a feature and truly understanding it.`,
    code: `// Slices - How it works
package main

import (
    "fmt"
    "runtime"
    "time"
)

// Go uses M:N scheduling
// M goroutines scheduled on N OS threads
// Context switching happens in user space (fast!)

func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        time.Sleep(100 * time.Millisecond)
        results <- j * 2
    }
}

func main() {
    fmt.Printf("CPUs: %d\n", runtime.NumCPU())
    fmt.Printf("Goroutines: %d\n", runtime.NumGoroutine())

    // Worker pool pattern
    jobs := make(chan int, 100)
    results := make(chan int, 100)

    // Start 3 workers
    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }

    // Send 9 jobs
    for j := 1; j <= 9; j++ {
        jobs <- j
    }
    close(jobs)

    // Collect results
    for r := 1; r <= 9; r++ {
        fmt.Printf("Result: %d\n", <-results)
    }
}`,
    breakdown: `\u2022 Internal mechanics show how the goroutine scheduler handles this concept.\n\n\u2022 Performance characteristics depend on implementation choices.\n\n\u2022 The compiler/runtime enforces safety rules automatically.\n\n\u2022 Understanding internals helps predict behavior and debug issues.`,
    summary: "Slices works through referencing an underlying array with a pointer, length, and capacity. Multiple slices can share the same backing array. Append may allocate a new array when capacity is exceeded.. Understanding internals helps you write better code and debug effectively."
  },
  {
    title: "Slices syntax & usage",
    definition: "Go slices syntax includes make([]T, len, cap) for creation, append(slice, elems...) for growth, slice[low:high] for sub-slicing, copy() for independent copies, and len()/cap() for inspection.",
    explanation: `Go provides clear syntax for slices with several variations depending on your needs. The standard library builds extensively on these foundations.

Basic syntax is straightforward. Advanced usage involves combining multiple features for powerful abstractions.

Naming conventions and code style matter. Following the community established patterns makes your code readable to other Go developers.

Modern Go continues to evolve, adding syntactic improvements while maintaining backwards compatibility with existing code.`,
    code: `// Slices - Syntax patterns
package main

import (
    "context"
    "fmt"
    "time"
)

// Interfaces (implicit implementation)
type Attacker interface {
    Attack() int
    Name() string
}

// Struct with methods
type Warrior struct {
    name   string
    damage int
}

func (w Warrior) Attack() int  { return w.damage }
func (w Warrior) Name() string { return w.name }

// Error handling
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("division by zero")
    }
    return a / b, nil
}

func main() {
    // Type assertion and interface
    var a Attacker = Warrior{"Knight", 50}
    fmt.Printf("%s attacks for %d\n", a.Name(), a.Attack())

    // Error handling
    result, err := divide(10, 0)
    if err != nil {
        fmt.Printf("Error: %v\n", err)
    } else {
        fmt.Printf("Result: %.2f\n", result)
    }

    // Context for cancellation
    ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
    defer cancel()
    <-ctx.Done()
}`,
    breakdown: `\u2022 Multiple syntax forms serve different use cases \u2014 choose based on context.\n\n\u2022 The standard library provides ready-made implementations for common patterns.\n\n\u2022 Naming conventions follow Go community standards.\n\n\u2022 Modern Go features reduce boilerplate while maintaining clarity.\n\n\u2022 Each syntax variant has specific trade-offs in readability vs power.`,
    summary: "Go syntax for slices is expressive and type-safe. Multiple forms serve different needs from simple to complex use cases."
  },
  {
    title: "Practical examples of Slices",
    definition: "In real applications, slices stores collections of game entities, processes batched data, implements stacks/queues, and handles variable-length inputs in APIs.",
    explanation: `Real-world Go applications use slices for data processing, system design, and performance-critical code paths. These patterns appear in production codebases everywhere.

Game development, web services, and system programming all leverage these concepts extensively.

Open-source Go projects provide excellent examples of slices in action. Studying them accelerates your learning.

The patterns you learn here transfer to related problems. Once you understand the principles, applying them to new situations becomes natural.`,
    code: `// Slices - Practical game server
package main

import (
    "fmt"
    "math/rand"
    "sync"
    "time"
)

type Player struct {
    Name  string
    Score int
    mu    sync.Mutex
}

func (p *Player) AddScore(points int) {
    p.mu.Lock()
    defer p.mu.Unlock()
    p.Score += points
}

type GameServer struct {
    players []*Player
    events  chan string
}

func NewServer() *GameServer {
    return &GameServer{
        events: make(chan string, 100),
    }
}

func (s *GameServer) Run() {
    // Event processor goroutine
    go func() {
        for event := range s.events {
            fmt.Printf("[EVENT] %s\n", event)
        }
    }()

    // Simulate concurrent players
    var wg sync.WaitGroup
    for _, p := range s.players {
        wg.Add(1)
        go func(player *Player) {
            defer wg.Done()
            for i := 0; i < 5; i++ {
                points := rand.Intn(100)
                player.AddScore(points)
                s.events <- fmt.Sprintf("%s scored %d", player.Name, points)
                time.Sleep(100 * time.Millisecond)
            }
        }(p)
    }
    wg.Wait()
    close(s.events)
}`,
    breakdown: `\u2022 Real applications combine multiple features for practical solutions.\n\n\u2022 Game and system examples show performance-conscious usage.\n\n\u2022 The pipeline/composition approach keeps code modular and testable.\n\n\u2022 Error handling is integrated throughout \u2014 not an afterthought.\n\n\u2022 These patterns scale from small scripts to large applications.`,
    summary: "Real applications demonstrate slices in game systems, data processing, and service design. The patterns are universal across Go projects."
  },
  {
    title: "Slices best practices",
    definition: "Best practices for slices include pre-allocating with make when size is known, being aware of shared backing arrays after slicing, using copy for independent slices, clearing with slice[:0], and avoiding memory leaks from sub-slicing large arrays.",
    explanation: `Professional Go code follows established conventions for slices that emerge from years of community experience and real-world usage.

Code review standards emphasize proper usage of these patterns. Following best practices signals professional competence.

Testing is easier when slices is used correctly as well-structured code is inherently more testable.

Performance and safety are balanced through careful application of these principles. Knowing when to optimize and when readability matters more is a key skill.`,
    code: `// Slices - Best practices
package main

import (
    "context"
    "errors"
    "fmt"
    "time"
)

// DO: Always handle errors
func loadConfig(path string) (Config, error) {
    data, err := os.ReadFile(path)
    if err != nil {
        return Config{}, fmt.Errorf("loading config: %w", err)
    }
    return parseConfig(data)
}

// DO: Use context for cancellation
func fetchData(ctx context.Context, url string) ([]byte, error) {
    select {
    case <-ctx.Done():
        return nil, ctx.Err()
    default:
    }
    // ... fetch logic
}

// DO: Define interfaces where used
type Repository interface {
    FindByID(id string) (*Entity, error)
    Save(entity *Entity) error
}

// DO: Return errors, don't panic
func SafeDivide(a, b int) (int, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}

// DO: Use defer for cleanup
func processFile(path string) error {
    f, err := os.Open(path)
    if err != nil {
        return err
    }
    defer f.Close() // guaranteed cleanup
    // ... process
    return nil
}`,
    breakdown: `\u2022 Following community conventions makes code readable to other developers.\n\n\u2022 Proper error handling prevents crashes and data corruption.\n\n\u2022 Performance considerations guide implementation choices.\n\n\u2022 Testing is easier with well-structured code.\n\n\u2022 Avoid common anti-patterns that lead to bugs or performance issues.`,
    summary: "Best practices ensure code quality: pre-allocating with make when size is known, being aware of shared backing arrays after slicing, using copy for independent slices, clearing with slice[:0], and avoiding memory leaks from sub-slicing large arrays.. Following conventions makes code maintainable and professional."
  }
];
