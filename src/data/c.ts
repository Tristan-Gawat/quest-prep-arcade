import { Module } from "./curriculum";

export const cModules: Module[] = [
  {
    id: "c-variables",
    title: "Variables & Types",
    tier: "EASY",
    lesson: {
      title: "Variables & Types",
      concept: "C is a statically typed language where every variable must be declared with a specific type before use.",
      explanation:
        "C provides fundamental types: int (integers), float/double (decimals), char (single characters), and void. Variables must be declared before use with their type. Type sizes vary by platform but follow minimum guarantees. Use sizeof() to check sizes. Type casting converts between types explicitly or implicitly.",
      codeExample: `#include <stdio.h>

int main() {
  // Integer types
  int score = 100;
  short lives = 3;
  long highScore = 999999L;

  // Floating point
  float speed = 3.14f;
  double precision = 3.141592653589;

  // Character
  char grade = 'A';

  // Constants
  const int MAX_LEVEL = 50;

  // Type casting
  int x = 7, y = 2;
  double result = (double)x / y; // 3.5, not 3

  printf("Score: %d, Speed: %.2f, Grade: %c\\n", score, speed, grade);
  printf("Size of int: %zu bytes\\n", sizeof(int));

  return 0;
}`,
      breakdown: "",
      language: "c",
    },
    quiz: [
      { question: "What must you do before using a variable in C?", choices: ["Nothing, just assign it", "Declare it with a type", "Import a variable module", "Use the 'var' keyword"], correct: 1, explanation: "C requires explicit type declarations — the compiler needs to know how much memory to allocate." },
      { question: "What does sizeof() return?", choices: ["The value of a variable", "The number of bytes a type uses", "The address of a variable", "The maximum value of a type"], correct: 1, explanation: "sizeof() returns the size in bytes of a type or variable at compile time." },
      { question: "What is the result of integer division 7/2 in C?", choices: ["3.5", "3", "4", "Error"], correct: 1, explanation: "Integer division truncates the decimal — both operands are int, so the result is int (3)." },
    ],
        subLessons: ["What is Variables & Types?","How Variables & Types works","Variables & Types syntax & usage","Practical examples of Variables & Types","Variables & Types best practices"],
challenge: {
      title: "Type Explorer",
      description: "Declare an int called 'health' set to 100, a float called 'armor' set to 75.5, and a char called 'rank' set to 'S'. Print them in the format: \"Health: 100, Armor: 75.50, Rank: S\".",
      starterCode: "#include <stdio.h>\n\nint main() {\n  // Declare variables here\n\n  // Print them\n\n  return 0;\n}",
      expectedOutput: "Health: 100, Armor: 75.50, Rank: S",
      hints: ["Use %d for int, %.2f for float with 2 decimal places, %c for char", "float literals need an 'f' suffix: 75.5f", "printf formats the output string with placeholders"],
      solution: `#include <stdio.h>\n\nint main() {\n  int health = 100;\n  float armor = 75.5f;\n  char rank = 'S';\n\n  printf("Health: %d, Armor: %.2f, Rank: %c\\n", health, armor, rank);\n\n  return 0;\n}`,
      language: "c",
    },
  },
  {
    id: "c-pointers",
    title: "Pointers",
    tier: "EASY",
    lesson: {
      title: "Pointers",
      concept: "Pointers store memory addresses and give you direct access to manipulate data in memory.",
      explanation:
        "A pointer is a variable that holds the memory address of another variable. Declare with * (int *ptr), get an address with & (&variable), and dereference with * (*ptr). Pointers enable pass-by-reference, dynamic memory, and efficient array manipulation. NULL represents an invalid pointer.",
      codeExample: `#include <stdio.h>

void doubleValue(int *ptr) {
  *ptr = *ptr * 2; // Modify original via pointer
}

int main() {
  int score = 50;
  int *scorePtr = &score; // Pointer to score

  printf("Value: %d\\n", *scorePtr);    // 50 (dereference)
  printf("Address: %p\\n", (void*)scorePtr); // Memory address

  doubleValue(&score);
  printf("Doubled: %d\\n", score); // 100

  // Pointer arithmetic with arrays
  int arr[] = {10, 20, 30, 40, 50};
  int *p = arr; // Points to first element

  printf("First: %d\\n", *p);       // 10
  printf("Third: %d\\n", *(p + 2)); // 30

  return 0;
}`,
      breakdown: "",
      language: "c",
    },
    quiz: [
      { question: "What does the & operator do?", choices: ["Multiplies values", "Returns the memory address of a variable", "Dereferences a pointer", "Performs bitwise AND"], correct: 1, explanation: "The & (address-of) operator returns the memory address where a variable is stored." },
      { question: "What does *ptr do when ptr is a pointer?", choices: ["Gets the address of ptr", "Accesses the value at the address ptr holds", "Declares a new pointer", "Multiplies ptr"], correct: 1, explanation: "Dereferencing (*ptr) accesses the value stored at the memory address the pointer holds." },
      { question: "What is a NULL pointer?", choices: ["A pointer to zero", "A pointer that doesn't point to valid memory", "An uninitialized variable", "A pointer to the stack"], correct: 1, explanation: "NULL indicates a pointer intentionally points to nothing — always check before dereferencing!" },
    ],
        subLessons: ["What is Pointers?","How Pointers works","Pointers syntax & usage","Practical examples of Pointers","Pointers best practices"],
challenge: {
      title: "Swap with Pointers",
      description: "Write a function `swap(int *a, int *b)` that swaps two integers using pointers. Swap variables x=10 and y=20, then print \"x=20, y=10\".",
      starterCode: "#include <stdio.h>\n\n// Define swap function\n\nint main() {\n  int x = 10, y = 20;\n\n  // Call swap\n\n  // Print result\n\n  return 0;\n}",
      expectedOutput: "x=20, y=10",
      hints: ["Use a temporary variable inside swap to hold one value", "Dereference pointers to read and write: *a, *b", "Pass addresses: swap(&x, &y)"],
      solution: `#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n  int temp = *a;\n  *a = *b;\n  *b = temp;\n}\n\nint main() {\n  int x = 10, y = 20;\n  swap(&x, &y);\n  printf("x=%d, y=%d\\n", x, y);\n  return 0;\n}`,
      language: "c",
    },
  },
  {
    id: "c-memory",
    title: "Dynamic Memory Allocation",
    tier: "MEDIUM",
    lesson: {
      title: "Dynamic Memory Allocation",
      concept: "Dynamic memory allocation lets you request memory at runtime from the heap using malloc, calloc, realloc, and free.",
      explanation:
        "Stack memory is limited and auto-managed. Heap memory is larger and manually managed. malloc(size) allocates bytes and returns a void pointer. calloc(count, size) allocates and zeros memory. realloc() resizes existing allocations. Always free() memory when done to prevent leaks. Always check if allocation returned NULL.",
      codeExample: `#include <stdio.h>
#include <stdlib.h>

int main() {
  // Allocate array of 5 ints
  int *scores = (int *)malloc(5 * sizeof(int));
  if (scores == NULL) {
    printf("Allocation failed!\\n");
    return 1;
  }

  // Initialize
  for (int i = 0; i < 5; i++) {
    scores[i] = (i + 1) * 100;
  }

  // Resize to 10 elements
  scores = (int *)realloc(scores, 10 * sizeof(int));
  if (scores == NULL) {
    printf("Reallocation failed!\\n");
    return 1;
  }

  for (int i = 5; i < 10; i++) {
    scores[i] = (i + 1) * 100;
  }

  printf("Score 7: %d\\n", scores[6]); // 700

  free(scores); // Always free!
  scores = NULL; // Avoid dangling pointer

  return 0;
}`,
      breakdown: "",
      language: "c",
    },
    quiz: [
      { question: "What is the difference between malloc and calloc?", choices: ["malloc is faster", "calloc initializes memory to zero, malloc doesn't", "calloc allocates on the stack", "There is no difference"], correct: 1, explanation: "calloc zero-initializes the allocated memory, while malloc leaves it with garbage values." },
      { question: "What happens if you don't call free()?", choices: ["Nothing, the OS handles it", "Memory leak — memory is never returned", "The program crashes immediately", "The variable is auto-deleted"], correct: 1, explanation: "Forgetting to free causes memory leaks — the memory stays allocated until the program ends." },
      { question: "What should you check after calling malloc?", choices: ["If the value is zero", "If the returned pointer is NULL", "If sizeof is correct", "If the stack has space"], correct: 1, explanation: "malloc returns NULL if allocation fails — always check before using the pointer!" },
    ],
        subLessons: ["What is Dynamic Memory Allocation?","How Dynamic Memory Allocation works","Dynamic Memory Allocation syntax & usage","Practical examples of Dynamic Memory Allocation","Dynamic Memory Allocation best practices"],
challenge: {
      title: "Dynamic Inventory",
      description: "Dynamically allocate an array of 3 integers using malloc. Set values to 10, 25, 50. Print their sum (85). Then free the memory.",
      starterCode: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n  // Allocate memory for 3 ints\n\n  // Set values\n\n  // Calculate and print sum\n\n  // Free memory\n\n  return 0;\n}",
      expectedOutput: "85",
      hints: ["Use (int *)malloc(3 * sizeof(int)) to allocate", "Access elements with arr[0], arr[1], arr[2]", "Don't forget to free(arr) at the end"],
      solution: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n  int *arr = (int *)malloc(3 * sizeof(int));\n  if (arr == NULL) return 1;\n\n  arr[0] = 10;\n  arr[1] = 25;\n  arr[2] = 50;\n\n  printf("%d\\n", arr[0] + arr[1] + arr[2]);\n\n  free(arr);\n  return 0;\n}`,
      language: "c",
    },
  },
  {
    id: "c-structs",
    title: "Structs",
    tier: "MEDIUM",
    lesson: {
      title: "Structs",
      concept: "Structs group related variables of different types into a single composite data type.",
      explanation:
        "Structs let you create custom types that bundle multiple fields. Access members with dot notation (.) for values or arrow notation (->) for pointers. Use typedef to create cleaner type names. Structs can be nested, passed to functions, and dynamically allocated. They form the foundation of data-oriented programming in C.",
      codeExample: `#include <stdio.h>
#include <string.h>

typedef struct {
  char name[50];
  int health;
  int attack;
  float speed;
} Player;

void printPlayer(const Player *p) {
  printf("Name: %s, HP: %d, ATK: %d, SPD: %.1f\\n",
         p->name, p->health, p->attack, p->speed);
}

void levelUp(Player *p) {
  p->health += 20;
  p->attack += 5;
  printf("%s leveled up!\\n", p->name);
}

int main() {
  Player hero;
  strcpy(hero.name, "Arcade Knight");
  hero.health = 100;
  hero.attack = 25;
  hero.speed = 1.5f;

  printPlayer(&hero);
  levelUp(&hero);
  printPlayer(&hero);

  return 0;
}`,
      breakdown: "",
      language: "c",
    },
    quiz: [
      { question: "What operator accesses struct members through a pointer?", choices: [".", "->", "*", "&"], correct: 1, explanation: "The arrow operator (->) dereferences a pointer and accesses a member in one step: ptr->field." },
      { question: "What does typedef do with structs?", choices: ["Allocates memory", "Creates a type alias for cleaner syntax", "Makes the struct immutable", "Adds methods to the struct"], correct: 1, explanation: "typedef creates a new name for the struct type so you don't have to write 'struct' every time." },
      { question: "How are structs passed to functions by default?", choices: ["By reference", "By value (copy)", "By pointer", "By name"], correct: 1, explanation: "Structs are passed by value (copied) unless you explicitly pass a pointer for efficiency." },
    ],
        subLessons: ["What is Structs?","How Structs works","Structs syntax & usage","Practical examples of Structs","Structs best practices"],
challenge: {
      title: "Game Item Struct",
      description: "Create a typedef struct `Item` with fields: name (char[30]), damage (int), and weight (float). Create an item called \"Fire Sword\" with damage 45 and weight 3.2. Print \"Fire Sword: 45 dmg, 3.2 lbs\".",
      starterCode: "#include <stdio.h>\n#include <string.h>\n\n// Define Item struct\n\nint main() {\n  // Create and initialize item\n\n  // Print item details\n\n  return 0;\n}",
      expectedOutput: "Fire Sword: 45 dmg, 3.2 lbs",
      hints: ["Use typedef struct { ... } Item; for clean syntax", "Use strcpy() to assign strings to char arrays", "Use %.1f for one decimal place in printf"],
      solution: `#include <stdio.h>\n#include <string.h>\n\ntypedef struct {\n  char name[30];\n  int damage;\n  float weight;\n} Item;\n\nint main() {\n  Item sword;\n  strcpy(sword.name, "Fire Sword");\n  sword.damage = 45;\n  sword.weight = 3.2f;\n\n  printf("%s: %d dmg, %.1f lbs\\n", sword.name, sword.damage, sword.weight);\n  return 0;\n}`,
      language: "c",
    },
  },
  {
    id: "c-fileio",
    title: "File I/O",
    tier: "HARD",
    lesson: {
      title: "File I/O",
      concept: "C provides low-level file operations through FILE pointers and functions like fopen, fclose, fprintf, and fscanf.",
      explanation:
        "Files are opened with fopen() which returns a FILE pointer. Modes include \"r\" (read), \"w\" (write/create), \"a\" (append), and \"rb\"/\"wb\" for binary. Always check if fopen returns NULL. Use fprintf/fscanf for formatted I/O, fgets/fputs for strings, fread/fwrite for binary data. Always fclose() when done.",
      codeExample: `#include <stdio.h>

int main() {
  // Writing to a file
  FILE *fp = fopen("savegame.txt", "w");
  if (fp == NULL) {
    printf("Error opening file!\\n");
    return 1;
  }

  fprintf(fp, "Player: ArcadeKnight\\n");
  fprintf(fp, "Level: 42\\n");
  fprintf(fp, "Score: 99850\\n");
  fclose(fp);

  // Reading from a file
  fp = fopen("savegame.txt", "r");
  if (fp == NULL) {
    printf("Error reading file!\\n");
    return 1;
  }

  char line[100];
  while (fgets(line, sizeof(line), fp) != NULL) {
    printf("%s", line);
  }
  fclose(fp);

  // Append mode
  fp = fopen("savegame.txt", "a");
  fprintf(fp, "Achievement: Unlocked\\n");
  fclose(fp);

  return 0;
}`,
      breakdown: "",
      language: "c",
    },
    quiz: [
      { question: "What does fopen() return on failure?", choices: ["0", "NULL", "-1", "EOF"], correct: 1, explanation: "fopen returns NULL if it cannot open the file — always check before reading or writing!" },
      { question: "What is the difference between \"w\" and \"a\" modes?", choices: ["w reads, a writes", "w overwrites the file, a appends to the end", "w is binary, a is text", "No difference"], correct: 1, explanation: "\"w\" creates/truncates the file; \"a\" opens for appending at the end without erasing existing content." },
      { question: "Why must you call fclose()?", choices: ["To save the filename", "To flush buffers and release system resources", "To delete the file", "It's optional in modern C"], correct: 1, explanation: "fclose flushes unwritten data to disk and frees the file descriptor for the OS." },
    ],
        subLessons: ["What is File I/O?","How File I/O works","File I/O syntax & usage","Practical examples of File I/O","File I/O best practices"],
challenge: {
      title: "Score Logger",
      description: "Write a program that opens a file \"scores.txt\" in write mode, writes three lines: \"Level1: 500\", \"Level2: 750\", \"Level3: 1200\", then closes it. Reopen in read mode, read all lines with fgets, and print them. Print the total as \"Total: 2450\".",
      starterCode: "#include <stdio.h>\n\nint main() {\n  // Write scores to file\n\n  // Read and print scores\n\n  // Print total\n\n  return 0;\n}",
      expectedOutput: "Level1: 500\nLevel2: 750\nLevel3: 1200\nTotal: 2450",
      hints: ["Use fprintf(fp, \"Level1: 500\\n\") to write each line", "Use fgets(line, sizeof(line), fp) in a while loop to read", "Calculate the total separately or hardcode it since you know the values"],
      solution: `#include <stdio.h>\n\nint main() {\n  FILE *fp = fopen("scores.txt", "w");\n  if (fp == NULL) return 1;\n  fprintf(fp, "Level1: 500\\n");\n  fprintf(fp, "Level2: 750\\n");\n  fprintf(fp, "Level3: 1200\\n");\n  fclose(fp);\n\n  fp = fopen("scores.txt", "r");\n  if (fp == NULL) return 1;\n  char line[100];\n  while (fgets(line, sizeof(line), fp) != NULL) {\n    printf("%s", line);\n  }\n  fclose(fp);\n\n  printf("Total: 2450\\n");\n  return 0;\n}`,
      language: "c",
    },
  },
  {
    id: "c-preprocessor",
    title: "Preprocessor Directives",
    tier: "HARD",
    lesson: {
      title: "Preprocessor Directives",
      concept: "The C preprocessor transforms source code before compilation using directives like #define, #include, and #ifdef.",
      explanation:
        "Preprocessor directives start with # and run before the compiler sees your code. #include copies header files in. #define creates macros (constants or function-like). #ifdef/#ifndef enable conditional compilation for platform-specific code or debug modes. Include guards (#ifndef HEADER_H) prevent double inclusion. Macros are powerful but can be tricky — prefer const and inline for type safety.",
      codeExample: `#include <stdio.h>

// Constants
#define MAX_HEALTH 100
#define GAME_TITLE "Arcade Quest"
#define PI 3.14159

// Function-like macro
#define MAX(a, b) ((a) > (b) ? (a) : (b))
#define SQUARE(x) ((x) * (x))

// Conditional compilation
#define DEBUG_MODE

int main() {
  printf("Game: %s\\n", GAME_TITLE);
  printf("Max HP: %d\\n", MAX_HEALTH);

  int playerDmg = 30, bossDmg = 45;
  printf("Higher damage: %d\\n", MAX(playerDmg, bossDmg));

  #ifdef DEBUG_MODE
    printf("[DEBUG] Player damage: %d\\n", playerDmg);
    printf("[DEBUG] Boss damage: %d\\n", bossDmg);
  #endif

  #ifndef RELEASE
    printf("Development build\\n");
  #endif

  return 0;
}`,
      breakdown: "",
      language: "c",
    },
    quiz: [
      { question: "When do preprocessor directives run?", choices: ["At runtime", "Before compilation", "During linking", "After compilation"], correct: 1, explanation: "The preprocessor transforms source code BEFORE the compiler processes it — it's a text substitution step." },
      { question: "Why wrap macro arguments in parentheses?", choices: ["For readability", "To prevent operator precedence bugs", "Required by C standard", "To make them constants"], correct: 1, explanation: "Without parentheses, SQUARE(1+2) becomes (1+2*1+2)=5 instead of ((1+2)*(1+2))=9!" },
      { question: "What does #ifdef check?", choices: ["If a variable is defined", "If a macro is defined", "If a file exists", "If a function is declared"], correct: 1, explanation: "#ifdef checks if a macro has been defined with #define — great for conditional compilation." },
    ],
        subLessons: ["What is Preprocessor Directives?","How Preprocessor Directives works","Preprocessor Directives syntax & usage","Practical examples of Preprocessor Directives","Preprocessor Directives best practices"],
challenge: {
      title: "Config Macros",
      description: "Define a macro MAX_PLAYERS as 4, a macro GAME_VERSION as \"2.0\", and a function-like macro DOUBLE(x) that doubles a value. Print: \"Version 2.0 - Max Players: 4 - Double(5): 10\".",
      starterCode: "#include <stdio.h>\n\n// Define macros\n\nint main() {\n  // Print using macros\n\n  return 0;\n}",
      expectedOutput: "Version 2.0 - Max Players: 4 - Double(5): 10",
      hints: ["#define MAX_PLAYERS 4 (no semicolons in #define!)", "Use #define DOUBLE(x) ((x) * 2) with parentheses", "Use %s for string macros and %d for integer macros in printf"],
      solution: `#include <stdio.h>\n\n#define MAX_PLAYERS 4\n#define GAME_VERSION "2.0"\n#define DOUBLE(x) ((x) * 2)\n\nint main() {\n  printf("Version %s - Max Players: %d - Double(5): %d\\n",\n         GAME_VERSION, MAX_PLAYERS, DOUBLE(5));\n  return 0;\n}`,
      language: "c",
    },
  },
];
