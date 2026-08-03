// Pre-written lessons for C++ Module: Classes & OOP

export const cppClassesLessons = [
  {
    title: "What is Classes & OOP?",
    definition: "Classes & OOP in C++ define user types with data members and member functions, supporting encapsulation, inheritance, and polymorphism through virtual functions.",
    explanation: `Classes & OOP is a core concept in C++ that every developer needs to master. It provides the foundation for writing efficient, safe, and maintainable code.

Understanding this concept deeply enables you to leverage the language's strengths and avoid common pitfalls that plague beginners.

C++'s approach to classes & oop is unique among programming languages, offering specific guarantees and trade-offs that shape how you design your programs.

By mastering classes & oop, you unlock powerful patterns and idioms that are standard in professional C++ development.`,
    code: `// Classes & OOP - Basic usage in C++
#include <iostream>
#include <memory>
#include <vector>
using namespace std;

int main() {
    // Fundamental demonstration
    cout << "Classes & OOP in C++" << endl;

    // Example with standard types
    vector<int> scores = {100, 85, 92, 78, 95};
    
    // Process data
    for (const auto& s : scores) {
        cout << "Score: " << s << endl;
    }

    // Modern C++ features
    auto maxScore = *max_element(scores.begin(), scores.end());
    cout << "Max: " << maxScore << endl;
    return 0;
}`,
    breakdown: `\u2022 The basic declaration shows how to define and use classes & oop in C++.\n\n\u2022 Type safety ensures the compiler catches errors before runtime.\n\n\u2022 Standard library integration makes common operations concise.\n\n\u2022 Comments explain each line's purpose for learners.\n\n\u2022 The example demonstrates the most common usage pattern.`,
    summary: "Classes & OOP in C++ provides define user types with data members and member functions, supporting encapsulation, inheritance, and polymorphism through virtual functions.. It's fundamental to writing correct, efficient C++ code."
  },
  {
    title: "How Classes & OOP works",
    definition: "Classes & OOP works by allocating memory for members, calling constructors/destructors, and using vtables for virtual dispatch. The Rule of Three/Five governs resource management.",
    explanation: `Under the hood, classes & oop in C++ involves specific compile-time and runtime mechanisms. The compiler enforces rules that ensure correctness.

The implementation details affect performance characteristics and memory usage patterns that matter in production systems.

Understanding how classes & oop works internally helps you predict behavior, debug issues, and write more efficient code.

This knowledge separates intermediate developers from advanced ones and is the difference between using a feature and truly understanding it.`,
    code: `// Classes & OOP - How it works internally
#include <iostream>
using namespace std;

// Demonstrating memory layout and mechanics
class Example {
private:
    int* data;
    size_t size;

public:
    Example(size_t n) : size(n) {
        data = new int[n]{}; // heap allocation
        cout << "Allocated " << n << " ints at " << data << endl;
    }

    ~Example() {
        delete[] data; // must free!
        cout << "Freed memory" << endl;
    }

    // Copy constructor (deep copy)
    Example(const Example& other) : size(other.size) {
        data = new int[size];
        copy(other.data, other.data + size, data);
    }

    // Move constructor (transfer ownership)
    Example(Example&& other) noexcept : data(other.data), size(other.size) {
        other.data = nullptr;
        other.size = 0;
    }

    int& operator[](size_t i) { return data[i]; }
};`,
    breakdown: `\u2022 Internal mechanics show how the memory model handles this concept.\n\n\u2022 Performance characteristics depend on implementation choices.\n\n\u2022 The compiler/runtime enforces safety rules automatically.\n\n\u2022 Understanding internals helps predict behavior and debug issues.`,
    summary: "Classes & OOP works through allocating memory for members, calling constructors/destructors, and using vtables for virtual dispatch. The Rule of Three/Five governs resource management.. Understanding internals helps you write better code and debug effectively."
  },
  {
    title: "Classes & OOP syntax & usage",
    definition: "C++ classes & oop syntax includes class/struct declarations, access specifiers (public/private/protected), constructors, destructors, virtual functions, operator overloading, and friend declarations.",
    explanation: `C++ provides clear syntax for classes & oop with several variations depending on your needs. The standard library builds extensively on these foundations.

Basic syntax is straightforward. Advanced usage involves combining multiple features for powerful abstractions.

Naming conventions and code style matter. Following the community established patterns makes your code readable to other C++ developers.

Modern C++ continues to evolve, adding syntactic improvements while maintaining backwards compatibility with existing code.`,
    code: `// Classes & OOP - Syntax patterns
#include <iostream>
#include <memory>
#include <vector>
#include <algorithm>
using namespace std;

// Template usage
template<typename T>
T findMax(const vector<T>& items) {
    return *max_element(items.begin(), items.end());
}

// Smart pointers
void smartPointerDemo() {
    auto player = make_unique<string>("Hero");
    cout << "Player: " << *player << endl;

    auto shared = make_shared<vector<int>>(initializer_list<int>{1,2,3});
    auto copy = shared; // shared ownership
    cout << "Count: " << shared.use_count() << endl; // 2
}

// Lambda expressions
void lambdaDemo() {
    vector<int> scores = {45, 92, 78, 100, 63};
    sort(scores.begin(), scores.end(), [](int a, int b) {
        return a > b; // descending
    });
    for_each(scores.begin(), scores.end(), [](int s) {
        cout << s << " ";
    });
}`,
    breakdown: `\u2022 Multiple syntax forms serve different use cases \u2014 choose based on context.\n\n\u2022 The standard library provides ready-made implementations for common patterns.\n\n\u2022 Naming conventions follow C++ community standards.\n\n\u2022 Modern C++ features reduce boilerplate while maintaining clarity.\n\n\u2022 Each syntax variant has specific trade-offs in readability vs power.`,
    summary: "C++ syntax for classes & oop is expressive and type-safe. Multiple forms serve different needs from simple to complex use cases."
  },
  {
    title: "Practical examples of Classes & OOP",
    definition: "In real applications, classes & oop model game entities, UI widgets, hardware abstractions, and mathematical types. Virtual functions enable polymorphic behavior.",
    explanation: `Real-world C++ applications use classes & oop for data processing, system design, and performance-critical code paths. These patterns appear in production codebases everywhere.

Game development, web services, and system programming all leverage these concepts extensively.

Open-source C++ projects provide excellent examples of classes & oop in action. Studying them accelerates your learning.

The patterns you learn here transfer to related problems. Once you understand the principles, applying them to new situations becomes natural.`,
    code: `// Classes & OOP - Practical game example
#include <iostream>
#include <vector>
#include <memory>
#include <algorithm>
using namespace std;

class Entity {
protected:
    string name;
    int hp;
public:
    Entity(string n, int h) : name(move(n)), hp(h) {}
    virtual ~Entity() = default;
    virtual int attack() = 0;
    string getName() const { return name; }
    int getHp() const { return hp; }
    void takeDamage(int d) { hp = max(0, hp - d); }
    bool isAlive() const { return hp > 0; }
};

class Warrior : public Entity {
    int armor;
public:
    Warrior(string n, int h, int a) : Entity(move(n), h), armor(a) {}
    int attack() override { return 20 + armor / 2; }
    void takeDamage(int d) { Entity::takeDamage(max(0, d - armor)); }
};

class Mage : public Entity {
    int mana;
public:
    Mage(string n, int h, int m) : Entity(move(n), h), mana(m) {}
    int attack() override { return mana > 10 ? 50 : 10; }
};

int main() {
    vector<unique_ptr<Entity>> party;
    party.push_back(make_unique<Warrior>("Tank", 200, 30));
    party.push_back(make_unique<Mage>("Caster", 80, 100));

    for (auto& e : party)
        cout << e->getName() << " attacks for " << e->attack() << endl;
}`,
    breakdown: `\u2022 Real applications combine multiple features for practical solutions.\n\n\u2022 Game and system examples show performance-conscious usage.\n\n\u2022 The pipeline/composition approach keeps code modular and testable.\n\n\u2022 Error handling is integrated throughout \u2014 not an afterthought.\n\n\u2022 These patterns scale from small scripts to large applications.`,
    summary: "Real applications demonstrate classes & oop in game systems, data processing, and service design. The patterns are universal across C++ projects."
  },
  {
    title: "Classes & OOP best practices",
    definition: "Best practices for classes & oop include following Rule of Five, making destructors virtual in base classes, preferring composition, using override keyword, and keeping interfaces minimal.",
    explanation: `Professional C++ code follows established conventions for classes & oop that emerge from years of community experience and real-world usage.

Code review standards emphasize proper usage of these patterns. Following best practices signals professional competence.

Testing is easier when classes & oop is used correctly as well-structured code is inherently more testable.

Performance and safety are balanced through careful application of these principles. Knowing when to optimize and when readability matters more is a key skill.`,
    code: `// Classes & OOP - Best practices
#include <memory>
#include <vector>
#include <string>
using namespace std;

// DO: Use smart pointers for ownership
class GameWorld {
    vector<unique_ptr<Entity>> entities; // owns entities

public:
    void addEntity(unique_ptr<Entity> e) {
        entities.push_back(move(e)); // transfer ownership
    }

    // Non-owning access (raw pointer or reference)
    Entity* findByName(const string& name) {
        for (auto& e : entities)
            if (e->getName() == name) return e.get();
        return nullptr;
    }
};

// DO: Use const correctness
class Player {
    string name;
    int score;
public:
    const string& getName() const { return name; } // const method
    void addScore(int s) { score += s; } // non-const: modifies
};

// DO: Prefer stack allocation
void process() {
    string name = "Hero"; // stack, automatic cleanup
    vector<int> scores = {1, 2, 3}; // stack (buffer on heap)
    // No manual cleanup needed!
}

// DO: Use RAII for resources
class FileHandle {
    FILE* file;
public:
    FileHandle(const char* path) : file(fopen(path, "r")) {}
    ~FileHandle() { if (file) fclose(file); } // auto-cleanup
    operator bool() const { return file != nullptr; }
};`,
    breakdown: `\u2022 Following community conventions makes code readable to other developers.\n\n\u2022 Proper error handling prevents crashes and data corruption.\n\n\u2022 Performance considerations guide implementation choices.\n\n\u2022 Testing is easier with well-structured code.\n\n\u2022 Avoid common anti-patterns that lead to bugs or performance issues.`,
    summary: "Best practices ensure code quality: following Rule of Five, making destructors virtual in base classes, preferring composition, using override keyword, and keeping interfaces minimal.. Following conventions makes code maintainable and professional."
  }
];
