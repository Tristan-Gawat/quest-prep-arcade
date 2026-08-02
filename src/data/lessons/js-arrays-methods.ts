export const jsArraysMethodsLessons = [
  {
    title: "What is Arrays & Methods?",
    definition: "Arrays are ordered collections of values stored in a single variable, and array methods are built-in functions that let you add, remove, search, transform, and manipulate those collections efficiently.",
    explanation: `Arrays are the party system of JavaScript — instead of managing each hero individually, you group them into a single ordered list. An array can hold any mix of data types: numbers, strings, objects, even other arrays. This makes them one of the most versatile and frequently used data structures in programming.

Think of an array like your adventure party lineup. Each member has a position (index) starting from 0. The first hero is at index 0, the second at index 1, and so on. You can add new members, remove fallen ones, rearrange the order, or apply effects to the entire group at once.

Creating arrays in JavaScript is straightforward — you use square brackets \`[]\` and separate values with commas. The \`Array.from()\` constructor offers advanced creation patterns, like generating arrays from other iterables or creating sequences programmatically.

Array methods are the spells you cast on your party. Some methods mutate (change) the original array — like \`push()\` adding a member directly to your roster. Others return new arrays without touching the original — like \`filter()\` creating a subset without removing anyone from the main group.

Understanding the difference between mutating and non-mutating methods is crucial. Mutating methods change your data in place (risky but sometimes efficient), while non-mutating methods create new copies (safer but uses more memory). Modern JavaScript favors the non-mutating approach for predictable, bug-free code.`,
    code: `// Arrays & Methods - Your Adventure Party System

// Creating arrays - square bracket syntax
const party = ["Warrior", "Mage", "Healer", "Rogue"];
const scores = [95, 87, 72, 100, 63];
const mixed = ["Sword", 42, true, null, { type: "rare" }];

// Accessing elements by index (0-based)
console.log(party[0]); // "Warrior" (first element)
console.log(party[3]); // "Rogue" (fourth element)
console.log(party.length); // 4 (total elements)

// Array.from() - create arrays from iterables
const emptySlots = Array.from({ length: 5 }, (_, i) => \`Slot \${i + 1}\`);
console.log(emptySlots); // ["Slot 1", "Slot 2", ... "Slot 5"]

// Creating arrays from strings
const spellName = "FIREBALL";
const letters = Array.from(spellName);
console.log(letters); // ["F", "I", "R", "E", "B", "A", "L", "L"]

// Spread operator for array creation and copying
const mainParty = ["Warrior", "Mage"];
const reserves = ["Bard", "Ranger"];
const fullRoster = [...mainParty, ...reserves];
console.log(fullRoster); // ["Warrior", "Mage", "Bard", "Ranger"]

// Creating an independent copy (not a reference)
const partyBackup = [...party];
partyBackup[0] = "Berserker";
console.log(party[0]);       // "Warrior" (original unchanged)
console.log(partyBackup[0]); // "Berserker" (only copy changed)

// Checking if something is an array
console.log(Array.isArray(party));  // true
console.log(Array.isArray("text")); // false`,
    breakdown: `• \`const party = ["Warrior", "Mage", "Healer", "Rogue"]\` — creates an array with four string elements using literal syntax
• \`party[0]\` — accesses the first element using zero-based indexing
• \`party.length\` — property that returns the total number of elements in the array
• \`Array.from({ length: 5 }, (_, i) => ...)\` — creates an array of 5 elements using a mapping function; underscore ignores the undefined value
• \`Array.from(spellName)\` — converts a string iterable into an array of individual characters
• \`[...mainParty, ...reserves]\` — spread operator unpacks both arrays into a new combined array
• \`const partyBackup = [...party]\` — creates a shallow copy; changes to the copy don't affect the original
• \`partyBackup[0] = "Berserker"\` — modifying the copy proves it's independent from the original array
• \`Array.isArray(party)\` — the reliable way to check if a value is an array (typeof returns "object" for arrays)`,
    summary: `Arrays are ordered collections created with square brackets that use zero-based indexing. Array.from() creates arrays from iterables or generates sequences. The spread operator (...) combines and copies arrays. Arrays are reference types, so use spread to create independent copies.`
  },
  {
    title: "How Arrays & Methods works",
    definition: "Mutating methods like push, pop, shift, and unshift directly modify the original array's contents by adding or removing elements from either end of the collection.",
    explanation: `The core mutating methods are your party management commands — they directly add or remove members from your roster. These operations modify the array in place, meaning the original array is permanently changed after calling them.

\`push()\` adds one or more elements to the END of an array. It's like recruiting a new member and placing them at the back of the party line. It returns the new length of the array, not the array itself — a common gotcha for beginners.

\`pop()\` removes and returns the LAST element. It's like the rear guard of your party getting separated. The array shrinks by one, and you get back the removed element (useful if you need to use it elsewhere).

\`shift()\` removes and returns the FIRST element, while \`unshift()\` adds elements to the BEGINNING. These are like managing the front of your party line — shift pulls the point person out, unshift puts someone new at the front.

An important performance note: push/pop operate on the end of the array and are very fast (O(1)). Shift/unshift operate on the beginning and are slower (O(n)) because every other element must be re-indexed. For large arrays, this difference matters — it's like the difference between adding a note at the end of a scroll versus inserting one at the beginning (requiring all other notes to move down).`,
    code: `// Mutating Array Methods - Direct party management

const inventory = ["Health Potion", "Mana Crystal", "Iron Shield"];
console.log("Starting:", inventory);

// PUSH - add to the end (returns new length)
const newLength = inventory.push("Fire Scroll");
console.log("After push:", inventory);
// ["Health Potion", "Mana Crystal", "Iron Shield", "Fire Scroll"]
console.log("New length:", newLength); // 4

// Push multiple items at once
inventory.push("Bomb", "Antidote");
console.log("Multi-push:", inventory);
// [..., "Fire Scroll", "Bomb", "Antidote"]

// POP - remove from the end (returns removed item)
const lastItem = inventory.pop();
console.log("Popped:", lastItem); // "Antidote"
console.log("After pop:", inventory); // "Antidote" is gone

// SHIFT - remove from the beginning (returns removed item)
const firstItem = inventory.shift();
console.log("Shifted:", firstItem); // "Health Potion"
console.log("After shift:", inventory); // starts with "Mana Crystal"

// UNSHIFT - add to the beginning (returns new length)
inventory.unshift("Legendary Sword");
console.log("After unshift:", inventory);
// ["Legendary Sword", "Mana Crystal", "Iron Shield", ...]

// SPLICE - the swiss army knife (add/remove at ANY position)
// splice(startIndex, deleteCount, ...itemsToAdd)
const enemies = ["Goblin", "Orc", "Dragon", "Slime", "Wolf"];

// Remove 1 element at index 2
const removed = enemies.splice(2, 1);
console.log("Removed:", removed);   // ["Dragon"]
console.log("Remaining:", enemies); // ["Goblin", "Orc", "Slime", "Wolf"]

// Insert without removing (deleteCount = 0)
enemies.splice(1, 0, "Troll", "Ogre");
console.log("Inserted:", enemies);
// ["Goblin", "Troll", "Ogre", "Orc", "Slime", "Wolf"]`,
    breakdown: `• \`inventory.push("Fire Scroll")\` — appends to the end; returns 4 (new length), not the modified array
• \`inventory.push("Bomb", "Antidote")\` — push accepts multiple arguments, adding all of them to the end
• \`inventory.pop()\` — removes and returns "Antidote" (the last element); array shrinks by one
• \`inventory.shift()\` — removes and returns "Health Potion" (the first element); all remaining elements shift left
• \`inventory.unshift("Legendary Sword")\` — adds to the beginning; all existing elements shift right
• \`enemies.splice(2, 1)\` — starting at index 2, delete 1 element; returns the deleted elements as an array
• \`enemies.splice(1, 0, "Troll", "Ogre")\` — at index 1, delete 0 elements, insert "Troll" and "Ogre"
• Splice is the most versatile mutating method — it can add, remove, or replace elements at any position
• All these methods mutate the original array — the changes are permanent and immediate`,
    summary: `Push/pop add and remove from the array's end (fast O(1) operations). Shift/unshift add and remove from the beginning (slower O(n)). Splice is the most flexible, allowing insertion, deletion, or replacement at any index. All these methods mutate the original array directly.`
  },
  {
    title: "Arrays & Methods syntax & usage",
    definition: "Transformation methods like map, filter, and reduce create new arrays or values from existing ones without modifying the original, enabling functional programming patterns and data pipeline construction.",
    explanation: `Map, filter, and reduce are the three legendary spells of array manipulation. Unlike push/pop/splice which mutate your original array, these methods return brand new results while leaving the source untouched. They're the foundation of functional programming in JavaScript.

\`map()\` transforms every element in an array by applying a function to each one, producing a new array of the same length. It's like casting an enchantment on every party member — each one is transformed, but you get a new roster back rather than changing the original.

\`filter()\` creates a new array containing only elements that pass a test function. The callback must return true or false for each element — true means "keep it," false means "exclude it." It's like running your party through a selection trial: only those who meet the criteria make it to the new team.

\`reduce()\` is the most powerful and flexible of the three. It processes every element and "reduces" the entire array down to a single accumulated value — a sum, an object, a string, anything. Think of it as a hero gathering all the loot from a dungeon into one treasure total.

These methods can be chained together to create data transformation pipelines: filter out what you don't want, map what remains into a new shape, then reduce it into a final result. This chaining pattern is one of the most elegant and powerful techniques in JavaScript.`,
    code: `// Transformation Methods - The Legendary Trio

const monsters = [
  { name: "Goblin", hp: 30, xp: 10, level: 2 },
  { name: "Orc", hp: 80, xp: 35, level: 8 },
  { name: "Dragon", hp: 500, xp: 200, level: 25 },
  { name: "Slime", hp: 15, xp: 5, level: 1 },
  { name: "Demon", hp: 300, xp: 150, level: 20 }
];

// MAP - transform every element into something new
const monsterNames = monsters.map(m => m.name);
console.log(monsterNames); // ["Goblin", "Orc", "Dragon", "Slime", "Demon"]

const battleCards = monsters.map(m => ({
  title: m.name,
  difficulty: m.level > 15 ? "Hard" : "Normal",
  reward: \`\${m.xp} XP\`
}));
console.log(battleCards);

// FILTER - keep only elements that pass the test
const hardEnemies = monsters.filter(m => m.level >= 10);
console.log(hardEnemies); // Dragon, Demon (only level 10+)

const lowHpTargets = monsters.filter(m => m.hp < 50);
console.log(lowHpTargets); // Goblin, Slime

// REDUCE - accumulate all elements into one value
const totalXP = monsters.reduce((sum, m) => sum + m.xp, 0);
console.log(\`Total XP available: \${totalXP}\`); // 400

// Reduce to find the strongest monster
const strongest = monsters.reduce((best, m) =>
  m.hp > best.hp ? m : best
);
console.log(\`Strongest: \${strongest.name}\`); // "Dragon"

// CHAINING - combine methods into a pipeline
const eliteRewards = monsters
  .filter(m => m.level >= 10)          // keep high-level only
  .map(m => m.xp * 2)                  // double their XP rewards
  .reduce((total, xp) => total + xp, 0); // sum it all up
console.log(\`Elite bonus XP: \${eliteRewards}\`); // 700`,
    breakdown: `• \`monsters.map(m => m.name)\` — extracts just the name from each object, producing a new array of strings
• \`monsters.map(m => ({...}))\` — transforms each monster into a new "battle card" object shape (parentheses required for object literal)
• \`monsters.filter(m => m.level >= 10)\` — returns only monsters where the level condition is true
• \`monsters.filter(m => m.hp < 50)\` — different filter criteria produces a different subset
• \`monsters.reduce((sum, m) => sum + m.xp, 0)\` — accumulates XP values starting from 0; sum carries forward between iterations
• The second argument to reduce (0) is the initial value of the accumulator
• \`monsters.reduce((best, m) => m.hp > best.hp ? m : best)\` — reduce can find max/min by comparing each element to the running "winner"
• The chained pipeline: filter → map → reduce processes data step by step, each method receiving the previous result
• All three methods return new values/arrays — the original \`monsters\` array is never modified`,
    summary: `Map transforms every element and returns a same-length array. Filter returns a subset of elements passing a test. Reduce accumulates all elements into a single value. These methods don't mutate the original array and can be chained into powerful data transformation pipelines.`
  },
  {
    title: "Practical examples of Arrays & Methods",
    definition: "Find, findIndex, slice, and splice provide targeted element lookup and extraction capabilities, while the spread operator enables flexible array composition, destructuring, and immutable update patterns.",
    explanation: `Beyond the legendary trio of map/filter/reduce, JavaScript arrays come equipped with a full arsenal of utility methods for specific situations. These are your specialized tools — each designed for a particular type of array operation.

\`find()\` returns the first element that satisfies a condition, or undefined if none match. Unlike filter (which returns all matches as an array), find stops at the first hit. It's perfect when you know there's only one match or you only need the first one — like searching your inventory for a specific item.

\`findIndex()\` works like find but returns the element's position (index) instead of the element itself. This is crucial when you need to know WHERE something is in the array, not just WHAT it is — like finding which inventory slot holds your healing potion so you can swap it.

\`slice()\` extracts a portion of an array without modifying the original. You specify start and end indices, and it returns a new array with just that section. It's like copying a page from a spell book — the original book stays intact.

The spread operator (\`...\`) unlocks powerful patterns for combining arrays, inserting elements at specific positions, and creating modified copies without mutation. Combined with destructuring, you can extract elements and remainders in a single elegant statement.`,
    code: `// Utility Methods & Spread Patterns

const questLog = [
  { id: 1, name: "Rescue the Villagers", status: "complete", reward: 100 },
  { id: 2, name: "Defeat the Dragon", status: "active", reward: 500 },
  { id: 3, name: "Find the Lost Artifact", status: "active", reward: 300 },
  { id: 4, name: "Escort the Merchant", status: "failed", reward: 75 },
  { id: 5, name: "Clear the Dungeon", status: "complete", reward: 200 }
];

// FIND - get the first matching element
const activeQuest = questLog.find(q => q.status === "active");
console.log("Current quest:", activeQuest.name); // "Defeat the Dragon"

// FINDINDEX - get the position of an element
const dragonQuestIndex = questLog.findIndex(q => q.name.includes("Dragon"));
console.log("Dragon quest at index:", dragonQuestIndex); // 1

// SLICE - extract a portion (non-mutating)
const firstThree = questLog.slice(0, 3);  // index 0, 1, 2
const lastTwo = questLog.slice(-2);        // last 2 elements
console.log("First three:", firstThree.map(q => q.name));
console.log("Last two:", lastTwo.map(q => q.name));

// SPREAD OPERATOR patterns
const baseStats = [10, 8, 12, 6, 9];

// Insert element at specific position (immutable)
const withNewStat = [...baseStats.slice(0, 2), 99, ...baseStats.slice(2)];
console.log(withNewStat); // [10, 8, 99, 12, 6, 9]

// Remove element by index (immutable alternative to splice)
const indexToRemove = 3;
const withoutElement = [
  ...baseStats.slice(0, indexToRemove),
  ...baseStats.slice(indexToRemove + 1)
];
console.log(withoutElement); // [10, 8, 12, 9] (index 3 removed)

// DESTRUCTURING with arrays
const [leader, healer, ...backline] = ["Knight", "Cleric", "Mage", "Archer"];
console.log(leader);   // "Knight"
console.log(healer);   // "Cleric"
console.log(backline); // ["Mage", "Archer"] (rest operator collects remaining)

// INCLUDES and SOME/EVERY for checking conditions
const partyClasses = ["warrior", "mage", "healer", "rogue"];
console.log(partyClasses.includes("healer")); // true
console.log(partyClasses.some(c => c === "tank")); // false
console.log(partyClasses.every(c => c.length > 3)); // true`,
    breakdown: `• \`questLog.find(q => q.status === "active")\` — returns the first quest object with "active" status, not an array
• \`questLog.findIndex(q => q.name.includes("Dragon"))\` — returns 1, the index position of the matching element
• \`questLog.slice(0, 3)\` — extracts elements at indices 0, 1, 2 (end index is exclusive); original unchanged
• \`questLog.slice(-2)\` — negative index counts from the end, getting the last two elements
• \`[...baseStats.slice(0, 2), 99, ...baseStats.slice(2)]\` — immutable insertion: spread before, new element, spread after
• The immutable removal pattern — slices around the target index and spreads both halves into a new array
• \`const [leader, healer, ...backline]\` — destructuring assigns first two to variables, rest operator collects the remainder
• \`partyClasses.includes("healer")\` — simple boolean check for presence of a value
• \`.some(c => c === "tank")\` — returns true if ANY element passes; like filter but returns boolean
• \`.every(c => c.length > 3)\` — returns true only if ALL elements pass the test`,
    summary: `Find/findIndex locate specific elements by condition. Slice extracts portions without mutation. The spread operator enables immutable insertion and removal patterns. Destructuring with rest syntax elegantly separates array elements. Includes/some/every provide boolean checks on array contents.`
  },
  {
    title: "Arrays & Methods best practices",
    definition: "Array best practices involve preferring immutable methods over mutating ones, using descriptive callback parameters, choosing the right method for each task, and building efficient data transformation pipelines.",
    explanation: `Mastering arrays isn't just about knowing what methods exist — it's about choosing the right tool for each situation and writing code that's both efficient and maintainable. Like a seasoned adventurer who knows exactly which item to use for each encounter, you should develop intuition for which array method fits best.

Prefer non-mutating methods when possible. Instead of splice to remove an item, use filter. Instead of push to add an item, spread into a new array. Immutable patterns are easier to debug because you can always trace back to the original data. The original array serves as a "save point" you can return to.

Use descriptive parameter names in your callbacks. Instead of \`.map(x => x.name)\`, write \`.map(monster => monster.name)\`. Single-letter parameters save keystrokes but cost readability. When you revisit code months later, descriptive names tell the story instantly.

Choose the most specific method for your need. Don't use \`reduce\` when \`map\` would do — it's like using a warhammer to hang a picture. Find is for one element, filter for many. Includes is for simple presence checks, some/every for condition-based checks.

For performance-critical code, be aware that chaining creates intermediate arrays. Three chained methods on a 10,000-element array create two temporary arrays before the final result. If performance matters, consider a single reduce that does all the work in one pass — though readability should win over micro-optimization in most cases.`,
    code: `// Array Best Practices - The Master's Techniques

// PRACTICE 1: Prefer immutable operations
const originalParty = ["Warrior", "Mage", "Healer"];

// Bad: mutating the original
// originalParty.push("Rogue"); // changes originalParty forever

// Good: create new array with addition
const expandedParty = [...originalParty, "Rogue"];
console.log(originalParty);  // ["Warrior", "Mage", "Healer"] (safe!)
console.log(expandedParty);  // ["Warrior", "Mage", "Healer", "Rogue"]

// PRACTICE 2: Use descriptive callback parameters
const enemies = [
  { name: "Goblin", hp: 30, loot: 10 },
  { name: "Orc", hp: 80, loot: 35 },
  { name: "Dragon", hp: 500, loot: 200 }
];

// Bad: cryptic parameter names
// enemies.filter(x => x.hp > 50).map(x => x.loot);

// Good: descriptive and readable
const valuableLoot = enemies
  .filter(enemy => enemy.hp > 50)
  .map(enemy => ({ target: enemy.name, gold: enemy.loot }));
console.log(valuableLoot);

// PRACTICE 3: Choose the right method for the job
const scores = [85, 92, 67, 100, 73, 88];

// Need one element? Use find (not filter[0])
const firstPerfect = scores.find(score => score === 100);

// Need a boolean? Use some/every (not filter.length > 0)
const hasFailure = scores.some(score => score < 70);
const allPassing = scores.every(score => score >= 60);

// PRACTICE 4: Efficient pipeline construction
const gameData = [
  { player: "Kai", score: 950, region: "NA" },
  { player: "Luna", score: 1200, region: "EU" },
  { player: "Rex", score: 800, region: "NA" },
  { player: "Yuki", score: 1100, region: "JP" },
  { player: "Zed", score: 600, region: "NA" }
];

// Clean pipeline: filter -> sort -> map -> slice (top 3 NA players)
const naLeaderboard = gameData
  .filter(entry => entry.region === "NA")
  .sort((a, b) => b.score - a.score)
  .map((entry, rank) => \`\${rank + 1}. \${entry.player} (\${entry.score}pts)\`)
  .slice(0, 3);
console.log("NA Leaderboard:", naLeaderboard);

// PRACTICE 5: Use Array.from for generation patterns
const healthBar = Array.from({ length: 10 }, (_, i) =>
  i < 7 ? "█" : "░"
).join("");
console.log(\`HP: [\${healthBar}] 70%\`);`,
    breakdown: `• \`[...originalParty, "Rogue"]\` — immutable addition creates a new array, preserving the original as a reference point
• Descriptive \`enemy =>\` vs cryptic \`x =>\` — makes callbacks self-documenting without needing comments
• \`enemy => ({ target: enemy.name, gold: enemy.loot })\` — map transforms objects into a new shape; parentheses wrap the object literal
• \`scores.find(score => score === 100)\` — returns the value directly; more appropriate than filter when you want one result
• \`scores.some(score => score < 70)\` — returns boolean immediately; more efficient than checking filter().length
• The leaderboard pipeline — filter by region, sort descending, map to formatted strings, slice top 3
• \`sort((a, b) => b.score - a.score)\` — custom comparator sorts in descending order (highest first)
• \`.map((entry, rank) => ...)\` — map's second parameter is the index, used here as rank number
• \`Array.from({ length: 10 }, (_, i) => ...)\` — generates a visual health bar using conditional fill characters
• \`.join("")\` — converts the array of characters into a single string for display`,
    summary: `Best practices include preferring immutable operations (spread over push/splice), using descriptive callback names, choosing the most specific method (find vs filter, some vs filter.length), building clean transformation pipelines, and leveraging Array.from for generation patterns. Prioritize readability over micro-optimization.`
  }
];
