// Pre-written lessons for Java Module: OOP & Inheritance

export const javaOOPLessons = [
  {
    title: "What is OOP & Inheritance?",
    definition: "OOP & Inheritance in Java enables creating class hierarchies where child classes inherit and extend parent class functionality. Java uses 'extends' for class inheritance and 'implements' for interfaces.",
    explanation: `OOP & Inheritance is a fundamental concept in Java programming that enables writing more organized, efficient, and maintainable code. Understanding oop & inheritance deeply is essential for any Java developer.

At its core, oop & inheritance provides abstractions that reduce code duplication and improve type safety. Rather than writing similar code for different scenarios, you define the pattern once and reuse it.

Java's implementation of oop & inheritance is designed to be both powerful and practical. It integrates seamlessly with the language's existing type system and standard library.

Mastering oop & inheritance opens up advanced design patterns and architectural approaches that are standard in professional Java development.`,
    code: `// OOP & Inheritance in Java - Basic usage\npublic class Example {\n    // Core concept demonstration\n    public static void main(String[] args) {\n        System.out.println("OOP & Inheritance basics");\n\n        // Fundamental operations\n        var data = new ArrayList<String>();\n        data.add("Sword");\n        data.add("Shield");\n        data.add("Potion");\n\n        // Process with modern Java\n        data.stream()\n            .filter(item -> item.length() > 5)\n            .forEach(System.out::println);\n\n        // Type-safe operations\n        for (String item : data) {\n            System.out.printf("Item: %s (%d chars)%n",\n                item, item.length());\n        }\n    }\n}`,
    breakdown: `\u2022 Core concepts demonstrated with practical examples showing how oop & inheritance works in everyday Java code.\n\n\u2022 Type safety ensures compile-time error detection rather than runtime crashes.\n\n\u2022 Modern Java features like var, streams, and enhanced for-each make code concise and readable.\n\n\u2022 Standard library provides ready-made implementations for common patterns.`,
    summary: "OOP & Inheritance in Java provides type-safe, efficient abstractions for common programming patterns. The standard library offers ready-made implementations. Modern Java syntax makes usage concise and readable."
  },
  {
    title: "How OOP & Inheritance works",
    definition: "Inheritance works through the JVM's method dispatch table (vtable). When calling a method on a reference, the JVM looks up the actual object's class to find the correct implementation (dynamic dispatch).",
    explanation: `Under the hood, oop & inheritance in Java involves compile-time checks and runtime mechanisms that ensure correctness and performance. The JVM optimizes common patterns for maximum efficiency.

The Java compiler performs extensive analysis to verify type safety and catch errors early. This means many bugs that would be runtime errors in dynamic languages are caught at compile time.

Memory management and object lifecycle are handled automatically by the garbage collector, but understanding how oop & inheritance interacts with memory helps you write more efficient code.

Performance characteristics vary by implementation. Understanding the tradeoffs helps you choose the right approach for your specific use case.`,
    code: `// OOP & Inheritance - Internal mechanics\npublic class Internals {\n    // How Java handles this under the hood\n    private int[] buffer = new int[16];\n    private int size = 0;\n\n    public void add(int value) {\n        if (size == buffer.length) {\n            // Dynamic resizing (like ArrayList)\n            buffer = Arrays.copyOf(buffer, buffer.length * 2);\n        }\n        buffer[size++] = value;\n    }\n\n    public int get(int index) {\n        if (index < 0 || index >= size)\n            throw new IndexOutOfBoundsException(index);\n        return buffer[index];\n    }\n\n    // JVM optimizes common access patterns\n    public boolean contains(int value) {\n        for (int i = 0; i < size; i++)\n            if (buffer[i] == value) return true;\n        return false;\n    }\n}`,
    breakdown: `\u2022 Internal buffer management shows how dynamic data structures work under the hood.\n\n\u2022 Bounds checking prevents array index errors with descriptive exceptions.\n\n\u2022 Dynamic resizing doubles capacity when full \u2014 amortized O(1) insertion.\n\n\u2022 Sequential search demonstrates the simplest contains implementation (O(n) time).`,
    summary: "Java handles oop & inheritance through compile-time checks and JVM optimization. Understanding internal mechanics helps choose the right implementation for performance-critical code."
  },
  {
    title: "OOP & Inheritance syntax & usage",
    definition: "Java OOP syntax includes extends (single inheritance), implements (multiple interfaces), abstract classes, super keyword, @Override annotation, and sealed classes (Java 17+).",
    explanation: `Java provides rich syntax for oop & inheritance with multiple approaches depending on the complexity of your needs. The standard library provides ready-made implementations for common cases.

Basic syntax is straightforward and readable. Advanced features like generics and functional interfaces add power for complex scenarios without sacrificing clarity.

Annotations provide metadata that enhances IDE support and enables frameworks to provide additional functionality. @Override, @FunctionalInterface, and custom annotations are commonly used.

Modern Java (11+) continues to add syntactic improvements that make oop & inheritance code more concise while maintaining backwards compatibility.`,
    code: `// OOP & Inheritance - Syntax patterns\nimport java.util.*;\nimport java.util.stream.*;\n\npublic class Syntax {\n    // Modern Java syntax features\n    public record Item(String name, int value, String type) {}\n\n    // Method with generics\n    public static <T extends Comparable<T>> T findMax(List<T> items) {\n        return items.stream().max(Comparator.naturalOrder()).orElseThrow();\n    }\n\n    // Functional interface usage\n    @FunctionalInterface\n    interface Transformer<T, R> {\n        R transform(T input);\n    }\n\n    // Lambda and method reference\n    Transformer<String, Integer> length = String::length;\n    Transformer<Integer, String> stringify = Object::toString;\n\n    // Pattern usage\n    public void process(List<Item> items) {\n        Map<String, List<Item>> grouped = items.stream()\n            .collect(Collectors.groupingBy(Item::type));\n        grouped.forEach((type, list) ->\n            System.out.printf("%s: %d items%n", type, list.size()));\n    }\n}`,
    breakdown: `\u2022 Records provide immutable data classes with minimal boilerplate (Java 16+).\n\n\u2022 Generic methods with bounds (T extends Comparable) enable constrained polymorphism.\n\n\u2022 @FunctionalInterface annotation ensures the interface has exactly one abstract method.\n\n\u2022 Method references (String::length) are shorthand for simple lambda expressions.\n\n\u2022 Collectors.groupingBy creates maps from stream elements grouped by a classifier.`,
    summary: "Java provides rich syntax including generics, records, functional interfaces, method references, and stream collectors. These compose together for powerful data processing pipelines."
  },
  {
    title: "Practical examples of OOP & Inheritance",
    definition: "OOP inheritance models real relationships: games use entity hierarchies (Character → Player/Enemy), frameworks use template patterns, and APIs use interface-based design for flexibility.",
    explanation: `Real-world Java applications use oop & inheritance extensively for data processing, API design, game mechanics, and enterprise systems. The patterns you learn here appear in every significant Java codebase.

Game development uses oop & inheritance for entity management, event systems, and data pipelines. Web applications use it for request handling, data transformation, and service composition.

Frameworks like Spring, which power most enterprise Java applications, are built entirely around these concepts. Understanding them deeply makes framework usage intuitive.

Open-source Java projects demonstrate real-world usage patterns that you can study and apply to your own code.`,
    code: `// OOP & Inheritance - Practical game example\npublic class GameSystem {\n    record Enemy(String name, int hp, int damage, String type) {}\n\n    private List<Enemy> enemies = new ArrayList<>();\n\n    public void spawnWave(int waveNum) {\n        for (int i = 0; i < waveNum * 3; i++) {\n            enemies.add(new Enemy(\n                "Goblin_" + i, 50 + waveNum * 10,\n                5 + waveNum * 2, "melee"\n            ));\n        }\n        System.out.printf("Wave %d: %d enemies spawned%n",\n            waveNum, enemies.size());\n    }\n\n    public List<Enemy> getAliveEnemies() {\n        return enemies.stream()\n            .filter(e -> e.hp() > 0)\n            .sorted(Comparator.comparingInt(Enemy::hp))\n            .collect(Collectors.toList());\n    }\n\n    public Map<String, Long> getEnemyCountByType() {\n        return enemies.stream()\n            .collect(Collectors.groupingBy(Enemy::type, Collectors.counting()));\n    }\n\n    public int getTotalEnemyHp() {\n        return enemies.stream().mapToInt(Enemy::hp).sum();\n    }\n}`,
    breakdown: `\u2022 Record-based entities provide immutable game data with automatic equality and toString.\n\n\u2022 Stream pipeline filters, sorts, and collects in a declarative readable chain.\n\n\u2022 Collectors.counting() aggregates group sizes in a groupingBy operation.\n\n\u2022 mapToInt creates an IntStream enabling sum(), average(), max() without boxing.`,
    summary: "Real applications use oop & inheritance for entity management, data pipelines, statistics aggregation, and game systems. Streams provide declarative alternatives to manual loops."
  },
  {
    title: "OOP & Inheritance best practices",
    definition: "Best practices: favor composition over inheritance, keep hierarchies shallow (2-3 levels max), program to interfaces not implementations, follow Liskov Substitution Principle, use abstract classes for shared code.",
    explanation: `Professional Java development follows established conventions for oop & inheritance that make code readable, maintainable, and robust. These conventions emerge from decades of community experience.

Code review standards in Java projects emphasize proper use of oop & inheritance — it's one of the first things reviewers check. Following best practices signals professional competence.

Testing is easier when oop & inheritance is used correctly. Well-structured code using these patterns is inherently more testable due to loose coupling and clear interfaces.

Performance and memory efficiency are important considerations. Knowing when to optimize and when readability matters more is a key professional skill.`,
    code: `// OOP & Inheritance - Best practices\npublic class BestPractices {\n    // DO: Program to interfaces\n    private final List<String> items = new ArrayList<>(); // not ArrayList<String> items\n\n    // DO: Use final for immutability\n    private final String name;\n    private final int maxHp;\n\n    // DO: Validate inputs\n    public void addItem(String item) {\n        Objects.requireNonNull(item, "Item cannot be null");\n        if (item.isBlank()) throw new IllegalArgumentException("Item cannot be blank");\n        items.add(item);\n    }\n\n    // DO: Return unmodifiable views\n    public List<String> getItems() {\n        return Collections.unmodifiableList(items);\n    }\n\n    // DO: Use try-with-resources\n    public String loadData(String path) throws IOException {\n        try (var reader = new BufferedReader(new FileReader(path))) {\n            return reader.lines().collect(Collectors.joining("\\n"));\n        }\n    }\n\n    // DO: Use Optional for nullable returns\n    public Optional<String> findItem(String query) {\n        return items.stream()\n            .filter(i -> i.contains(query))\n            .findFirst();\n    }\n}`,
    breakdown: `\u2022 Program to interfaces (List not ArrayList) \u2014 enables swapping implementations without changing code.\n\n\u2022 Objects.requireNonNull fails fast with clear message on null inputs.\n\n\u2022 Collections.unmodifiableList prevents external modification of internal state.\n\n\u2022 try-with-resources guarantees resource cleanup even if exceptions occur.\n\n\u2022 Optional<String> explicitly communicates that absence is possible, avoiding null.`,
    summary: "Program to interfaces, validate inputs, return unmodifiable views, use try-with-resources for cleanup, and Optional for nullable returns. These practices prevent bugs and improve code quality."
  }
];
