// Pre-written lessons for Java Module: Streams API

export const javaStreamsLessons = [
  {
    title: "What is Streams API?",
    definition: "The Java Streams API (Java 8+) enables functional-style operations on collections — filtering, mapping, sorting, and reducing data through declarative pipelines instead of manual loops.",
    explanation: `Streams API is a fundamental concept in Java programming that enables writing more organized, efficient, and maintainable code. Understanding streams api deeply is essential for any Java developer.

At its core, streams api provides abstractions that reduce code duplication and improve type safety. Rather than writing similar code for different scenarios, you define the pattern once and reuse it.

Java's implementation of streams api is designed to be both powerful and practical. It integrates seamlessly with the language's existing type system and standard library.

Mastering streams api opens up advanced design patterns and architectural approaches that are standard in professional Java development.`,
    code: `// Streams API in Java - Basic usage\npublic class Example {\n    // Core concept demonstration\n    public static void main(String[] args) {\n        System.out.println("Streams API basics");\n\n        // Fundamental operations\n        var data = new ArrayList<String>();\n        data.add("Sword");\n        data.add("Shield");\n        data.add("Potion");\n\n        // Process with modern Java\n        data.stream()\n            .filter(item -> item.length() > 5)\n            .forEach(System.out::println);\n\n        // Type-safe operations\n        for (String item : data) {\n            System.out.printf("Item: %s (%d chars)%n",\n                item, item.length());\n        }\n    }\n}`,
    breakdown: `\u2022 Core concepts demonstrated with practical examples showing how streams api works in everyday Java code.\n\n\u2022 Type safety ensures compile-time error detection rather than runtime crashes.\n\n\u2022 Modern Java features like var, streams, and enhanced for-each make code concise and readable.\n\n\u2022 Standard library provides ready-made implementations for common patterns.`,
    summary: "Streams API in Java provides type-safe, efficient abstractions for common programming patterns. The standard library offers ready-made implementations. Modern Java syntax makes usage concise and readable."
  },
  {
    title: "How Streams API works",
    definition: "Streams use lazy evaluation and internal iteration. Operations build a pipeline that executes only when a terminal operation is called. Intermediate operations return new streams; terminal operations produce results.",
    explanation: `Under the hood, streams api in Java involves compile-time checks and runtime mechanisms that ensure correctness and performance. The JVM optimizes common patterns for maximum efficiency.

The Java compiler performs extensive analysis to verify type safety and catch errors early. This means many bugs that would be runtime errors in dynamic languages are caught at compile time.

Memory management and object lifecycle are handled automatically by the garbage collector, but understanding how streams api interacts with memory helps you write more efficient code.

Performance characteristics vary by implementation. Understanding the tradeoffs helps you choose the right approach for your specific use case.`,
    code: `// Streams API - Internal mechanics\npublic class Internals {\n    // How Java handles this under the hood\n    private int[] buffer = new int[16];\n    private int size = 0;\n\n    public void add(int value) {\n        if (size == buffer.length) {\n            // Dynamic resizing (like ArrayList)\n            buffer = Arrays.copyOf(buffer, buffer.length * 2);\n        }\n        buffer[size++] = value;\n    }\n\n    public int get(int index) {\n        if (index < 0 || index >= size)\n            throw new IndexOutOfBoundsException(index);\n        return buffer[index];\n    }\n\n    // JVM optimizes common access patterns\n    public boolean contains(int value) {\n        for (int i = 0; i < size; i++)\n            if (buffer[i] == value) return true;\n        return false;\n    }\n}`,
    breakdown: `\u2022 Internal buffer management shows how dynamic data structures work under the hood.\n\n\u2022 Bounds checking prevents array index errors with descriptive exceptions.\n\n\u2022 Dynamic resizing doubles capacity when full \u2014 amortized O(1) insertion.\n\n\u2022 Sequential search demonstrates the simplest contains implementation (O(n) time).`,
    summary: "Java handles streams api through compile-time checks and JVM optimization. Understanding internal mechanics helps choose the right implementation for performance-critical code."
  },
  {
    title: "Streams API syntax & usage",
    definition: "Stream syntax: source.stream().filter().map().collect(). Key operations: filter, map, flatMap, sorted, distinct, limit, reduce, collect. Collectors provide toList, groupingBy, joining, etc.",
    explanation: `Java provides rich syntax for streams api with multiple approaches depending on the complexity of your needs. The standard library provides ready-made implementations for common cases.

Basic syntax is straightforward and readable. Advanced features like generics and functional interfaces add power for complex scenarios without sacrificing clarity.

Annotations provide metadata that enhances IDE support and enables frameworks to provide additional functionality. @Override, @FunctionalInterface, and custom annotations are commonly used.

Modern Java (11+) continues to add syntactic improvements that make streams api code more concise while maintaining backwards compatibility.`,
    code: `// Streams API - Syntax patterns\nimport java.util.*;\nimport java.util.stream.*;\n\npublic class Syntax {\n    // Modern Java syntax features\n    public record Item(String name, int value, String type) {}\n\n    // Method with generics\n    public static <T extends Comparable<T>> T findMax(List<T> items) {\n        return items.stream().max(Comparator.naturalOrder()).orElseThrow();\n    }\n\n    // Functional interface usage\n    @FunctionalInterface\n    interface Transformer<T, R> {\n        R transform(T input);\n    }\n\n    // Lambda and method reference\n    Transformer<String, Integer> length = String::length;\n    Transformer<Integer, String> stringify = Object::toString;\n\n    // Pattern usage\n    public void process(List<Item> items) {\n        Map<String, List<Item>> grouped = items.stream()\n            .collect(Collectors.groupingBy(Item::type));\n        grouped.forEach((type, list) ->\n            System.out.printf("%s: %d items%n", type, list.size()));\n    }\n}`,
    breakdown: `\u2022 Records provide immutable data classes with minimal boilerplate (Java 16+).\n\n\u2022 Generic methods with bounds (T extends Comparable) enable constrained polymorphism.\n\n\u2022 @FunctionalInterface annotation ensures the interface has exactly one abstract method.\n\n\u2022 Method references (String::length) are shorthand for simple lambda expressions.\n\n\u2022 Collectors.groupingBy creates maps from stream elements grouped by a classifier.`,
    summary: "Java provides rich syntax including generics, records, functional interfaces, method references, and stream collectors. These compose together for powerful data processing pipelines."
  },
  {
    title: "Practical examples of Streams API",
    definition: "Streams simplify data processing: filtering game entities by criteria, transforming DTOs, aggregating statistics, and generating reports. Parallel streams distribute work across CPU cores.",
    explanation: `Real-world Java applications use streams api extensively for data processing, API design, game mechanics, and enterprise systems. The patterns you learn here appear in every significant Java codebase.

Game development uses streams api for entity management, event systems, and data pipelines. Web applications use it for request handling, data transformation, and service composition.

Frameworks like Spring, which power most enterprise Java applications, are built entirely around these concepts. Understanding them deeply makes framework usage intuitive.

Open-source Java projects demonstrate real-world usage patterns that you can study and apply to your own code.`,
    code: `// Streams API - Practical game example\npublic class GameSystem {\n    record Enemy(String name, int hp, int damage, String type) {}\n\n    private List<Enemy> enemies = new ArrayList<>();\n\n    public void spawnWave(int waveNum) {\n        for (int i = 0; i < waveNum * 3; i++) {\n            enemies.add(new Enemy(\n                "Goblin_" + i, 50 + waveNum * 10,\n                5 + waveNum * 2, "melee"\n            ));\n        }\n        System.out.printf("Wave %d: %d enemies spawned%n",\n            waveNum, enemies.size());\n    }\n\n    public List<Enemy> getAliveEnemies() {\n        return enemies.stream()\n            .filter(e -> e.hp() > 0)\n            .sorted(Comparator.comparingInt(Enemy::hp))\n            .collect(Collectors.toList());\n    }\n\n    public Map<String, Long> getEnemyCountByType() {\n        return enemies.stream()\n            .collect(Collectors.groupingBy(Enemy::type, Collectors.counting()));\n    }\n\n    public int getTotalEnemyHp() {\n        return enemies.stream().mapToInt(Enemy::hp).sum();\n    }\n}`,
    breakdown: `\u2022 Record-based entities provide immutable game data with automatic equality and toString.\n\n\u2022 Stream pipeline filters, sorts, and collects in a declarative readable chain.\n\n\u2022 Collectors.counting() aggregates group sizes in a groupingBy operation.\n\n\u2022 mapToInt creates an IntStream enabling sum(), average(), max() without boxing.`,
    summary: "Real applications use streams api for entity management, data pipelines, statistics aggregation, and game systems. Streams provide declarative alternatives to manual loops."
  },
  {
    title: "Streams API best practices",
    definition: "Best practices: keep stream pipelines readable (one operation per line), avoid side effects in stream operations, use method references where possible, only parallelize CPU-intensive operations on large datasets.",
    explanation: `Professional Java development follows established conventions for streams api that make code readable, maintainable, and robust. These conventions emerge from decades of community experience.

Code review standards in Java projects emphasize proper use of streams api — it's one of the first things reviewers check. Following best practices signals professional competence.

Testing is easier when streams api is used correctly. Well-structured code using these patterns is inherently more testable due to loose coupling and clear interfaces.

Performance and memory efficiency are important considerations. Knowing when to optimize and when readability matters more is a key professional skill.`,
    code: `// Streams API - Best practices\npublic class BestPractices {\n    // DO: Program to interfaces\n    private final List<String> items = new ArrayList<>(); // not ArrayList<String> items\n\n    // DO: Use final for immutability\n    private final String name;\n    private final int maxHp;\n\n    // DO: Validate inputs\n    public void addItem(String item) {\n        Objects.requireNonNull(item, "Item cannot be null");\n        if (item.isBlank()) throw new IllegalArgumentException("Item cannot be blank");\n        items.add(item);\n    }\n\n    // DO: Return unmodifiable views\n    public List<String> getItems() {\n        return Collections.unmodifiableList(items);\n    }\n\n    // DO: Use try-with-resources\n    public String loadData(String path) throws IOException {\n        try (var reader = new BufferedReader(new FileReader(path))) {\n            return reader.lines().collect(Collectors.joining("\\n"));\n        }\n    }\n\n    // DO: Use Optional for nullable returns\n    public Optional<String> findItem(String query) {\n        return items.stream()\n            .filter(i -> i.contains(query))\n            .findFirst();\n    }\n}`,
    breakdown: `\u2022 Program to interfaces (List not ArrayList) \u2014 enables swapping implementations without changing code.\n\n\u2022 Objects.requireNonNull fails fast with clear message on null inputs.\n\n\u2022 Collections.unmodifiableList prevents external modification of internal state.\n\n\u2022 try-with-resources guarantees resource cleanup even if exceptions occur.\n\n\u2022 Optional<String> explicitly communicates that absence is possible, avoiding null.`,
    summary: "Program to interfaces, validate inputs, return unmodifiable views, use try-with-resources for cleanup, and Optional for nullable returns. These practices prevent bugs and improve code quality."
  }
];
