import { Module } from "./curriculum";

export const cppModules: Module[] = [
  {
    id: "cpp-pointers",
    title: "Pointers & References",
    tier: "EASY",
    lesson: {
      title: "Pointers & References",
      concept: "Pointers store memory addresses; references are aliases to existing variables.",
      explanation:
        "A pointer holds the address of a variable. Use * to declare and dereference, & to get the address. References (&) are safer aliases — they can't be null or reassigned. Pointers enable dynamic memory, linked structures, and polymorphism. nullptr represents a null pointer in modern C++.",
      codeExample: `#include <iostream>
using namespace std;

int main() {
  int health = 100;
  int* ptr = &health;     // pointer to health
  int& ref = health;      // reference to health

  cout << "Value: " << health << endl;     // 100
  cout << "Via pointer: " << *ptr << endl; // 100
  cout << "Via ref: " << ref << endl;      // 100
  cout << "Address: " << ptr << endl;      // 0x7ff...

  *ptr = 75;  // modify through pointer
  cout << "Health now: " << health << endl; // 75

  ref = 50;   // modify through reference
  cout << "Health now: " << health << endl; // 50
  return 0;
}`,
      language: "cpp",
    },
    quiz: [
      { question: "What does the * operator do when used on a pointer?", choices: ["Gets the address", "Dereferences — accesses the value at the address", "Multiplies", "Declares a variable"], correct: 1, explanation: "Dereferencing (*ptr) accesses the value stored at the memory address the pointer holds." },
      { question: "What's the difference between a pointer and a reference?", choices: ["No difference", "References can't be null or reassigned", "Pointers are faster", "References use more memory"], correct: 1, explanation: "References are safer aliases — once bound, they always refer to the same object and can't be null." },
      { question: "What is nullptr?", choices: ["Zero integer", "A null pointer literal in modern C++", "An empty string", "A void type"], correct: 1, explanation: "nullptr is the type-safe null pointer constant introduced in C++11, replacing NULL." },
    ],
    challenge: {
      title: "Pointer Power-Up",
      description: "Declare an int variable `score` set to 0. Create a pointer `scorePtr` to it. Use the pointer to set score to 9001. Print score to verify.",
      starterCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n  // Declare score and pointer\n\n  // Modify through pointer\n\n  // Print score\n\n  return 0;\n}",
      expectedOutput: "9001",
      hints: ["int* scorePtr = &score; creates the pointer", "Use *scorePtr = 9001; to modify through the pointer", "cout << score prints the value"],
      solution: `#include <iostream>\nusing namespace std;\n\nint main() {\n  int score = 0;\n  int* scorePtr = &score;\n  *scorePtr = 9001;\n  cout << score << endl;\n  return 0;\n}`,
      language: "cpp",
    },
  },
  {
    id: "cpp-memory",
    title: "Dynamic Memory",
    tier: "EASY",
    lesson: {
      title: "Dynamic Memory",
      concept: "Dynamic memory allocation lets you create objects whose lifetime you control.",
      explanation:
        "Use 'new' to allocate memory on the heap and 'delete' to free it. For arrays, use new[] and delete[]. Forgetting to delete causes memory leaks. Modern C++ prefers smart pointers (unique_ptr, shared_ptr) which auto-delete. Stack memory is automatic; heap memory is manual.",
      codeExample: `#include <iostream>
#include <memory>
using namespace std;

int main() {
  // Raw pointer (old way — risky!)
  int* coins = new int(42);
  cout << *coins << endl;  // 42
  delete coins;            // Must free!

  // Dynamic array
  int* levels = new int[3]{1, 2, 3};
  cout << levels[1] << endl; // 2
  delete[] levels;

  // Smart pointer (modern, safe!)
  unique_ptr<int> hp = make_unique<int>(100);
  cout << *hp << endl;  // 100
  // No delete needed — automatically freed!

  return 0;
}`,
      language: "cpp",
    },
    quiz: [
      { question: "What happens if you forget to call delete?", choices: ["Compile error", "Memory leak — memory is never freed", "Auto garbage collected", "Program crashes immediately"], correct: 1, explanation: "C++ has no garbage collector — forgetting delete means memory stays allocated until the program ends." },
      { question: "What's the advantage of unique_ptr?", choices: ["Faster allocation", "Automatically frees memory when out of scope", "Allows multiple owners", "Uses stack memory"], correct: 1, explanation: "unique_ptr automatically calls delete when it goes out of scope — no leaks possible!" },
      { question: "Which delete form is for arrays?", choices: ["delete", "delete[]", "free()", "remove[]"], correct: 1, explanation: "delete[] must be used for arrays allocated with new[] — it calls destructors for each element." },
    ],
    challenge: {
      title: "Smart Inventory",
      description: "Create a unique_ptr<int> called `gold` initialized to 500 using make_unique. Print the value. Then reassign it to a new value 1000 using *gold = 1000. Print again.",
      starterCode: "#include <iostream>\n#include <memory>\nusing namespace std;\n\nint main() {\n  // Create unique_ptr\n\n  // Print value\n\n  // Reassign value\n\n  // Print again\n\n  return 0;\n}",
      expectedOutput: "500\n1000",
      hints: ["unique_ptr<int> gold = make_unique<int>(500);", "Dereference with *gold to read or write", "No delete needed — it's automatic!"],
      solution: `#include <iostream>\n#include <memory>\nusing namespace std;\n\nint main() {\n  unique_ptr<int> gold = make_unique<int>(500);\n  cout << *gold << endl;\n  *gold = 1000;\n  cout << *gold << endl;\n  return 0;\n}`,
      language: "cpp",
    },
  },
  {
    id: "cpp-classes",
    title: "Classes & OOP",
    tier: "MEDIUM",
    lesson: {
      title: "Classes & OOP",
      concept: "C++ classes combine data and behavior with fine-grained memory control.",
      explanation:
        "Classes have constructors, destructors (~ClassName), and access specifiers. Inheritance uses : public Base. Virtual methods enable polymorphism. Pure virtual (= 0) makes a class abstract. The destructor runs when an object is destroyed — critical for resource cleanup.",
      codeExample: `#include <iostream>
#include <string>
using namespace std;

class Entity {
protected:
  string name;
  int hp;
public:
  Entity(string n, int h) : name(n), hp(h) {}
  virtual ~Entity() {}

  virtual string battleCry() const {
    return name + " is ready!";
  }
};

class Warrior : public Entity {
  int armor;
public:
  Warrior(string n, int h, int a)
    : Entity(n, h), armor(a) {}

  string battleCry() const override {
    return name + " charges with " + to_string(armor) + " armor!";
  }
};

Entity* e = new Warrior("Knight", 100, 50);
cout << e->battleCry() << endl;
delete e;  // virtual destructor ensures proper cleanup`,
      language: "cpp",
    },
    quiz: [
      { question: "What does a destructor do?", choices: ["Creates an object", "Cleans up when an object is destroyed", "Copies an object", "Initializes fields"], correct: 1, explanation: "Destructors (~ClassName) run automatically when an object is destroyed — used for freeing resources." },
      { question: "What does 'virtual' enable?", choices: ["Static dispatch", "Runtime polymorphism", "Multiple inheritance", "Template specialization"], correct: 1, explanation: "Virtual functions enable dynamic dispatch — the correct override is called based on actual object type." },
      { question: "What does '= 0' after a virtual method mean?", choices: ["Default implementation", "Pure virtual — makes the class abstract", "Returns zero", "Disables the method"], correct: 1, explanation: "Pure virtual functions have no implementation — the class becomes abstract and can't be instantiated." },
    ],
    challenge: {
      title: "Polymorphic Enemies",
      description: "Create an abstract base class `Monster` with a pure virtual method `attack()` returning string. Create `Goblin` that returns \"Goblin slashes!\". Create an instance via base pointer and print attack().",
      starterCode: "#include <iostream>\n#include <string>\nusing namespace std;\n\n// Define abstract Monster class\n\n// Define Goblin subclass\n\n// Create and use\n",
      expectedOutput: "Goblin slashes!",
      hints: ["virtual string attack() const = 0; makes it pure virtual", "Goblin inherits with : public Monster", "Use Monster* m = new Goblin(); then m->attack()"],
      solution: `#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Monster {\npublic:\n  virtual ~Monster() {}\n  virtual string attack() const = 0;\n};\n\nclass Goblin : public Monster {\npublic:\n  string attack() const override {\n    return "Goblin slashes!";\n  }\n};\n\nint main() {\n  Monster* m = new Goblin();\n  cout << m->attack() << endl;\n  delete m;\n  return 0;\n}`,
      language: "cpp",
    },
  },
  {
    id: "cpp-stl",
    title: "STL Containers",
    tier: "MEDIUM",
    lesson: {
      title: "STL Containers",
      concept: "The Standard Template Library provides powerful, generic data structures.",
      explanation:
        "STL containers include vector (dynamic array), map (sorted key-value), unordered_map (hash map), set, queue, stack, and deque. Iterators traverse containers generically. Algorithms (sort, find, transform) work with any container via iterators. Range-based for loops simplify iteration.",
      codeExample: `#include <iostream>
#include <vector>
#include <map>
#include <algorithm>
using namespace std;

int main() {
  // Vector - dynamic array
  vector<int> scores = {85, 92, 67, 100, 73};
  sort(scores.begin(), scores.end());
  // scores: {67, 73, 85, 92, 100}

  // Range-based for
  for (int s : scores) {
    cout << s << " ";
  }
  cout << endl;

  // Map - sorted key-value
  map<string, int> inventory;
  inventory["sword"] = 1;
  inventory["potion"] = 5;

  for (auto& [item, count] : inventory) {
    cout << item << ": " << count << endl;
  }

  return 0;
}`,
      language: "cpp",
    },
    quiz: [
      { question: "What is a vector in C++?", choices: ["A math vector", "A dynamic array that can resize", "A linked list", "A fixed-size array"], correct: 1, explanation: "std::vector is a dynamic array — it grows automatically and provides fast random access." },
      { question: "What's the difference between map and unordered_map?", choices: ["No difference", "map is sorted, unordered_map uses hashing", "unordered_map is slower", "map uses less memory"], correct: 1, explanation: "map keeps keys sorted (O(log n)); unordered_map uses a hash table (O(1) average)." },
      { question: "What do iterators provide?", choices: ["Memory management", "A generic way to traverse any container", "Type checking", "Thread safety"], correct: 1, explanation: "Iterators abstract container traversal — algorithms work with any container through iterators." },
    ],
    challenge: {
      title: "Sorted Leaderboard",
      description: "Create a vector<int> with scores {42, 99, 67, 88, 15}. Sort it in descending order. Print the top score (first element).",
      starterCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  // Create vector\n\n  // Sort descending\n\n  // Print top score\n\n  return 0;\n}",
      expectedOutput: "99",
      hints: ["Use vector<int> scores = {42, 99, 67, 88, 15};", "sort with greater<int>() for descending: sort(v.begin(), v.end(), greater<int>())", "Access first element with scores[0] or scores.front()"],
      solution: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> scores = {42, 99, 67, 88, 15};\n  sort(scores.begin(), scores.end(), greater<int>());\n  cout << scores[0] << endl;\n  return 0;\n}`,
      language: "cpp",
    },
  },
  {
    id: "cpp-templates",
    title: "Templates",
    tier: "HARD",
    lesson: {
      title: "Templates",
      concept: "Templates enable compile-time generic programming — write once, use with any type.",
      explanation:
        "Function templates and class templates use template<typename T> to parameterize types. The compiler generates specialized code for each type used. Template specialization lets you customize behavior for specific types. Variadic templates accept any number of type parameters. SFINAE and concepts (C++20) constrain template parameters.",
      codeExample: `#include <iostream>
#include <string>
using namespace std;

// Function template
template<typename T>
T maxVal(T a, T b) {
  return (a > b) ? a : b;
}

// Class template
template<typename T, int Size>
class FixedStack {
  T data[Size];
  int top = -1;
public:
  void push(T val) { data[++top] = val; }
  T pop() { return data[top--]; }
  bool empty() { return top == -1; }
};

int main() {
  cout << maxVal(10, 20) << endl;       // 20
  cout << maxVal(3.14, 2.71) << endl;   // 3.14

  FixedStack<string, 5> bag;
  bag.push("Sword");
  bag.push("Bow");
  cout << bag.pop() << endl;  // Bow
  return 0;
}`,
      language: "cpp",
    },
    quiz: [
      { question: "When does template code get generated?", choices: ["At runtime", "At compile time for each type used", "At link time", "On first call"], correct: 1, explanation: "Templates are instantiated at compile time — the compiler generates code for each unique type combination." },
      { question: "What is template specialization?", choices: ["Making templates faster", "Custom implementation for a specific type", "Using multiple templates", "Default template arguments"], correct: 1, explanation: "Specialization lets you provide a different implementation for specific types." },
      { question: "Can templates have non-type parameters?", choices: ["No, only types", "Yes, like int Size", "Only in C++20", "Only for classes"], correct: 1, explanation: "Templates can have non-type parameters like integers, used for compile-time constants (e.g., array sizes)." },
    ],
    challenge: {
      title: "Template Pair",
      description: "Create a class template `Pair<T, U>` that holds two values of potentially different types. Add a method `first()` and `second()`. Create a Pair<string, int> with (\"Level\", 42) and print both values.",
      starterCode: "#include <iostream>\n#include <string>\nusing namespace std;\n\n// Define Pair template class\n\n\nint main() {\n  // Create and print\n\n  return 0;\n}",
      expectedOutput: "Level 42",
      hints: ["template<typename T, typename U> class Pair { ... }", "Store T and U as private members, return from getter methods", "Use cout << p.first() << \" \" << p.second()"],
      solution: `#include <iostream>\n#include <string>\nusing namespace std;\n\ntemplate<typename T, typename U>\nclass Pair {\n  T a;\n  U b;\npublic:\n  Pair(T x, U y) : a(x), b(y) {}\n  T first() const { return a; }\n  U second() const { return b; }\n};\n\nint main() {\n  Pair<string, int> p("Level", 42);\n  cout << p.first() << " " << p.second() << endl;\n  return 0;\n}`,
      language: "cpp",
    },
  },
  {
    id: "cpp-raii",
    title: "RAII & Move Semantics",
    tier: "HARD",
    lesson: {
      title: "RAII & Move Semantics",
      concept: "RAII ties resource lifetime to object lifetime; move semantics enable efficient transfers.",
      explanation:
        "RAII (Resource Acquisition Is Initialization) means resources are acquired in constructors and released in destructors — no manual cleanup needed. Move semantics (&&, std::move) transfer ownership without copying. The Rule of Five: if you define one of destructor, copy/move constructor, copy/move assignment, define all five.",
      codeExample: `#include <iostream>
#include <utility>
using namespace std;

class GameBuffer {
  int* data;
  size_t size;
public:
  // Constructor (acquire)
  GameBuffer(size_t s) : size(s), data(new int[s]) {
    cout << "Allocated " << s << " ints" << endl;
  }

  // Destructor (release)
  ~GameBuffer() {
    delete[] data;
    cout << "Freed buffer" << endl;
  }

  // Move constructor (transfer ownership)
  GameBuffer(GameBuffer&& other) noexcept
    : data(other.data), size(other.size) {
    other.data = nullptr;
    other.size = 0;
    cout << "Moved!" << endl;
  }

  size_t getSize() const { return size; }
};

int main() {
  GameBuffer buf(100);
  GameBuffer buf2 = std::move(buf); // Transfer, no copy!
  cout << "buf2 size: " << buf2.getSize() << endl;
  return 0;
}`,
      language: "cpp",
    },
    quiz: [
      { question: "What does RAII stand for?", choices: ["Run And Initialize Always", "Resource Acquisition Is Initialization", "Reference And Iterator Access", "Read All Input Immediately"], correct: 1, explanation: "RAII ties resource management to object lifetime — acquire in constructor, release in destructor." },
      { question: "What does std::move do?", choices: ["Physically moves memory", "Casts to an rvalue reference to enable move semantics", "Deletes the source", "Copies with optimization"], correct: 1, explanation: "std::move casts to && (rvalue reference), signaling the object can be 'moved from' (resources transferred)." },
      { question: "Why set moved-from pointer to nullptr?", choices: ["Performance", "To prevent double-delete in the destructor", "Style preference", "Compiler requires it"], correct: 1, explanation: "After moving, the source destructor still runs — if the pointer isn't nulled, it would delete transferred memory!" },
    ],
    challenge: {
      title: "Resource Guard",
      description: "Create a class `FileGuard` that prints \"File opened\" in the constructor and \"File closed\" in the destructor. Create an instance inside a scope block {} so the destructor fires automatically. Print \"Done\" after the block.",
      starterCode: "#include <iostream>\nusing namespace std;\n\n// Define FileGuard class\n\n\nint main() {\n  // Create scope block\n\n  // Print Done\n\n  return 0;\n}",
      expectedOutput: "File opened\nFile closed\nDone",
      hints: ["Constructor: cout << \"File opened\" << endl;", "Destructor ~FileGuard() prints \"File closed\"", "Use { FileGuard f; } to create a local scope"],
      solution: `#include <iostream>\nusing namespace std;\n\nclass FileGuard {\npublic:\n  FileGuard() { cout << "File opened" << endl; }\n  ~FileGuard() { cout << "File closed" << endl; }\n};\n\nint main() {\n  {\n    FileGuard f;\n  }\n  cout << "Done" << endl;\n  return 0;\n}`,
      language: "cpp",
    },
  },
];
