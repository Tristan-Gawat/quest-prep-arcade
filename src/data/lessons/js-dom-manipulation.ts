// Pre-written full lessons for JavaScript Module: DOM Manipulation
// Each sub-lesson has: definition, explanation, code, breakdown, summary

export const jsDomManipulationLessons = [
  {
    title: "What is DOM Manipulation?",
    definition: "DOM (Document Object Model) manipulation is the process of using JavaScript to dynamically read, modify, create, and remove HTML elements and their attributes on a webpage. It transforms static HTML into interactive, living interfaces — the foundation of every game UI, dashboard, and web application.",
    explanation: `The DOM is the browser's in-memory representation of your HTML document as a tree of objects. Every HTML tag becomes a node in this tree, and JavaScript can traverse, modify, add to, or remove from this tree in real time. When you change the DOM, the browser automatically re-renders the affected parts of the page.

Think of the DOM as the game world's scene graph. Just as a game engine maintains a tree of entities (player → weapon → particle effects), the browser maintains a tree of HTML elements (body → div → span). DOM manipulation is how you update the game's "screen" — showing health bars, spawning enemy cards, updating score displays, and animating transitions.

querySelector() and querySelectorAll() are the modern way to find elements. They use CSS selector syntax — the same selectors you use in stylesheets. querySelector('.health-bar') finds the first element with class "health-bar". querySelectorAll('.enemy') finds ALL elements matching, returned as a NodeList. These replaced older methods like getElementById and getElementsByClassName.

Once you have an element reference, you can modify its content (textContent, innerHTML), its appearance (style, classList), its attributes (setAttribute, dataset), and its position in the tree (appendChild, remove). You can also create brand-new elements from scratch with createElement() and insert them anywhere in the document.

DOM manipulation is what makes web games possible. Without it, your HTML is just a static document. With it, you can build real-time strategy games, card games, RPG interfaces, and any interactive experience. Every tooltip that appears on hover, every health bar that decreases, every monster that spawns — that's DOM manipulation.`,
    code: `// querySelector — find elements using CSS selectors
const title = document.querySelector("h1");          // First h1 element
const healthBar = document.querySelector(".health-bar"); // First .health-bar class
const bossHP = document.querySelector("#boss-hp");   // Element with id="boss-hp"
const firstEnemy = document.querySelector("[data-type='enemy']"); // Attribute selector

// querySelectorAll — find ALL matching elements
const allCards = document.querySelectorAll(".card");
const menuItems = document.querySelectorAll("nav > li");
console.log(\`Found \${allCards.length} cards on the page\`);

// Modifying text content
const scoreDisplay = document.querySelector("#score");
scoreDisplay.textContent = "Score: 1500"; // Safe text only — no HTML parsing

// Modifying innerHTML (renders HTML tags)
const notification = document.querySelector(".notification");
notification.innerHTML = \`<strong>⚔️ Critical Hit!</strong> <em>+250 damage</em>\`;

// Changing styles directly
const playerAvatar = document.querySelector(".avatar");
playerAvatar.style.border = "3px solid gold";
playerAvatar.style.transform = "scale(1.1)";
playerAvatar.style.transition = "all 0.3s ease";

// Working with classList — add, remove, toggle classes
const menuPanel = document.querySelector(".game-menu");
menuPanel.classList.add("visible", "animated");    // Add classes
menuPanel.classList.remove("hidden");              // Remove class
menuPanel.classList.toggle("expanded");            // Toggle on/off
const isOpen = menuPanel.classList.contains("expanded"); // Check
console.log(\`Menu expanded: \${isOpen}\`);

// Reading and setting attributes
const weaponSlot = document.querySelector(".weapon-slot");
weaponSlot.setAttribute("data-equipped", "flame-sword");
weaponSlot.setAttribute("title", "Flame Sword - 45 DMG");
const equipped = weaponSlot.getAttribute("data-equipped");
console.log(\`Equipped: \${equipped}\`);`,
    breakdown: `Let's analyze each DOM operation:

• document.querySelector("h1") — Searches the ENTIRE document for the FIRST element matching the CSS selector "h1". Returns the element node or null if not found. Uses the same selector syntax as CSS stylesheets.

• document.querySelector(".health-bar") — The dot prefix selects by CLASS name. Equivalent to the old document.getElementsByClassName("health-bar")[0] but more flexible since you can combine selectors.

• document.querySelector("#boss-hp") — The hash prefix selects by ID. IDs should be unique on a page, so this always returns at most one element. Equivalent to document.getElementById("boss-hp").

• document.querySelector("[data-type='enemy']") — ATTRIBUTE selector. Finds the first element with a data-type attribute equal to "enemy". Square brackets select by any attribute, not just class or ID.

• document.querySelectorAll(".card") — Returns a NODELIST (array-like) of ALL matching elements. Unlike querySelector which returns only the first match. You can iterate NodeLists with forEach or for...of.

• scoreDisplay.textContent = "Score: 1500" — Sets the text inside an element. SAFE from XSS attacks because it treats everything as plain text. HTML tags in the string are displayed literally, not rendered.

• notification.innerHTML = \`<strong>...</strong>\` — Parses the string as HTML and renders it. DANGEROUS with user input (XSS vulnerability) but useful for creating rich formatted content from trusted sources.

• playerAvatar.style.transform = "scale(1.1)" — Directly sets inline CSS styles. Property names use camelCase (transform, backgroundColor) instead of CSS's kebab-case (background-color). Useful for dynamic values.

• menuPanel.classList.toggle("expanded") — If the element HAS the class, removes it. If it DOESN'T have it, adds it. Returns true if the class is now present. Perfect for show/hide toggles.

• weaponSlot.setAttribute("data-equipped", "flame-sword") — Sets any HTML attribute. data-* attributes are custom data storage on elements. Access them via getAttribute() or the element.dataset object.`,
    summary: `DOM manipulation lets JavaScript dynamically control webpage content. querySelector/querySelectorAll find elements using CSS selector syntax (class, id, attribute selectors). textContent sets safe text; innerHTML renders HTML (use cautiously). Inline styles use camelCase property names. classList provides add/remove/toggle/contains for CSS classes. setAttribute/getAttribute handle any HTML attribute. Always check for null when querying elements.`
  },

  {
    title: "How DOM Manipulation works",
    definition: "The DOM is a tree data structure where each HTML element is a node with parent, child, and sibling relationships. JavaScript interacts with this tree through element node objects that expose properties and methods for traversal, modification, and creation. Changes trigger the browser's rendering pipeline to repaint the screen.",
    explanation: `The browser's rendering engine parses your HTML into a tree of node objects. Each node knows its parent, children, and siblings. Understanding this tree structure is key to efficient DOM manipulation — navigating relationships is often faster than querying the whole document.

When HTML is parsed, the browser builds the DOM tree: document → html → head/body → nested elements. Each element becomes an object with properties like parentElement, children, nextElementSibling, and previousElementSibling. You can walk this tree to find related elements without expensive document-wide queries.

Creating elements follows a specific pattern: (1) createElement() builds a detached node in memory, (2) you configure it (set text, attributes, classes, styles), (3) you attach it to the DOM tree with appendChild(), append(), or insertBefore(). Until step 3, the element exists only in JavaScript memory — it's invisible to the user. This pattern is efficient because you do all setup before the expensive insertion that triggers rendering.

The browser's RENDERING PIPELINE has three stages: Layout (calculate positions/sizes), Paint (fill pixels), and Composite (layer elements). DOM changes can trigger some or all of these stages. Changing text triggers layout + paint. Changing color triggers only paint. Changing transform/opacity triggers only composite (cheapest). Batch your DOM changes to minimize these expensive operations.

DocumentFragment is a lightweight container for building multiple elements before inserting them all at once. Instead of appending 100 items one by one (100 reflows), you build them in a fragment (0 reflows) then append the fragment once (1 reflow). This is critical for game UIs that render many entities — leaderboards, inventories, card decks.

The DOM also supports removing elements with remove() or removeChild(), replacing elements with replaceWith() or replaceChild(), and cloning elements with cloneNode(). These operations let you build reusable templates — create a "card" element once, then clone it for each card in the deck.`,
    code: `// createElement — building elements from scratch
const card = document.createElement("div");
card.className = "enemy-card";
card.id = "enemy-goblin";

// Configure before attaching (efficient — no reflows yet)
const nameEl = document.createElement("h3");
nameEl.textContent = "Goblin Scout";
nameEl.classList.add("enemy-name");

const hpBar = document.createElement("div");
hpBar.classList.add("hp-bar");
hpBar.style.width = "100%";
hpBar.style.backgroundColor = "#4caf50";
hpBar.textContent = "HP: 45/45";

const attackBtn = document.createElement("button");
attackBtn.textContent = "⚔️ Attack";
attackBtn.classList.add("attack-btn");
attackBtn.dataset.target = "goblin";

// Assemble the card (still in memory)
card.appendChild(nameEl);
card.appendChild(hpBar);
card.appendChild(attackBtn);

// Single DOM insertion — one reflow
const battleField = document.querySelector("#battlefield");
battleField.appendChild(card);

// DocumentFragment — batch multiple insertions
const fragment = document.createDocumentFragment();
const enemies = ["Slime", "Wolf", "Bat", "Spider", "Skeleton"];
enemies.forEach((name, i) => {
  const el = document.createElement("div");
  el.className = "spawn-card";
  el.innerHTML = \`<span class="name">\${name}</span><span class="level">Lv.\${i + 1}</span>\`;
  el.dataset.id = \`enemy-\${i}\`;
  fragment.appendChild(el); // Appends to fragment, NOT to DOM
});
// One single DOM operation for all 5 elements
document.querySelector("#spawn-zone").appendChild(fragment);

// Traversing the DOM tree
const firstCard = battleField.firstElementChild;     // First child element
const nextCard = firstCard.nextElementSibling;       // Next sibling
const parent = firstCard.parentElement;              // Parent element
console.log(\`First card: \${firstCard.id}\`);
console.log(\`Parent: \${parent.id}\`);

// Removing and replacing elements
const oldCard = document.querySelector("#enemy-goblin");
oldCard.remove(); // Remove from DOM entirely`,
    breakdown: `Let's trace through the DOM building process:

• document.createElement("div") — Creates a new div element IN MEMORY. It is NOT visible yet — not attached to the document tree. Think of it as crafting an item before placing it in the game world.

• card.className = "enemy-card" — Sets the class attribute. className is a string property (use classList for individual class manipulation). This is equivalent to <div class="enemy-card">.

• nameEl.classList.add("enemy-name") — Adds a single class using the classList API. More precise than className which replaces ALL classes. Use classList when the element might already have other classes.

• attackBtn.dataset.target = "goblin" — Sets a data-* attribute via the dataset API. This creates data-target="goblin" in the HTML. Access custom data without getAttribute — cleaner and auto-converts kebab-case to camelCase.

• card.appendChild(nameEl) — Adds nameEl as the LAST CHILD of card. Since card isn't in the DOM yet, this doesn't trigger any rendering. You're assembling the element tree in memory first.

• battleField.appendChild(card) — NOW the card enters the DOM. The browser calculates layout for the new element, paints it, and composites. This is the expensive step — one single reflow for the entire card assembly.

• document.createDocumentFragment() — Creates a lightweight container that acts as a temporary DOM. Append elements to it freely with zero rendering cost. When you append the fragment to a real DOM node, its CHILDREN transfer (the fragment itself doesn't appear in the DOM).

• el.innerHTML = \`<span>...</span>\` — Sets HTML content inside the element. Since we're building from known strings (not user input), innerHTML is safe here and more concise than creating multiple elements manually.

• battleField.firstElementChild — Traverses DOWN the tree to the first child. Note: firstElementChild skips text nodes and comments (unlike firstChild which includes all node types).

• oldCard.remove() — Modern method to remove an element. Simpler than the old pattern: parent.removeChild(child). The element is detached from the DOM and will be garbage collected if no JavaScript references remain.`,
    summary: `Create elements with createElement(), configure them fully in memory, then attach with one appendChild() call to minimize reflows. Use DocumentFragment to batch-insert multiple elements with a single DOM operation. Navigate the tree with parentElement, firstElementChild, and nextElementSibling. dataset provides clean access to data-* attributes. Remove elements with remove(). Build entire component trees in memory before inserting.`
  },

  {
    title: "DOM Manipulation syntax & usage",
    definition: "addEventListener attaches event handlers to elements, enabling interactivity through clicks, keyboard input, mouse movement, and custom events. Event delegation leverages event bubbling to handle events from multiple child elements with a single parent listener — essential for dynamic content.",
    explanation: `Events are the bridge between user actions and your JavaScript code. Every click, keypress, mouse move, and touch generates an event that bubbles up through the DOM tree. addEventListener is how you intercept these events and respond.

addEventListener(type, callback, options) registers a function to be called when a specific event occurs on an element. The callback receives an Event object with details about what happened: which element was clicked (target), mouse coordinates, which key was pressed, and methods to control event behavior (preventDefault, stopPropagation).

EVENT BUBBLING means events travel UP the DOM tree from the target element to the document root. If you click a button inside a div inside the body, the click event fires on the button first, then the div, then the body, then the document. This is crucial to understand because it enables event delegation.

EVENT DELEGATION is a powerful pattern where you attach ONE listener to a parent element instead of individual listeners on each child. When a child is clicked, the event bubbles up to the parent where your listener catches it. You inspect event.target to determine which child was clicked. This is essential for game UIs with dynamic content — you don't need to re-attach listeners when enemies are spawned or removed.

Common event types in game development: 'click' for buttons and card selection, 'keydown'/'keyup' for player movement and shortcuts, 'mouseenter'/'mouseleave' for tooltips and hover effects, 'submit' for forms, 'animationend' for sequencing animations, and custom events for game state communication.

preventDefault() stops the browser's default behavior (form submission, link navigation, text selection). stopPropagation() stops the event from bubbling further. These give you full control over how user interactions are handled in your game without unintended browser behaviors interfering.`,
    code: `// Basic addEventListener — responding to clicks
const attackBtn = document.querySelector("#attack-btn");
attackBtn.addEventListener("click", (event) => {
  console.log("⚔️ Attack button clicked!");
  console.log(\`  Target: \${event.target.tagName}\`);
  console.log(\`  Coordinates: (\${event.clientX}, \${event.clientY})\`);
  event.target.classList.add("clicked");
});

// Keyboard events — player controls
document.addEventListener("keydown", (event) => {
  const keyActions = {
    ArrowUp: "move-north",
    ArrowDown: "move-south",
    ArrowLeft: "move-west",
    ArrowRight: "move-east",
    " ": "attack",    // Spacebar
    "i": "inventory",
    "Escape": "pause"
  };
  const action = keyActions[event.key];
  if (action) {
    event.preventDefault(); // Stop page scrolling on arrows
    console.log(\`🎮 Action: \${action}\`);
  }
});

// Event delegation — one listener handles many children
const inventoryGrid = document.querySelector("#inventory-grid");
inventoryGrid.addEventListener("click", (event) => {
  // Find the closest .item-slot ancestor (or self)
  const slot = event.target.closest(".item-slot");
  if (!slot) return; // Click was not on an item slot

  const itemId = slot.dataset.itemId;
  const itemName = slot.dataset.name;
  console.log(\`🎒 Selected: \${itemName} (id: \${itemId})\`);

  // Remove 'selected' from all slots, add to clicked one
  inventoryGrid.querySelectorAll(".item-slot.selected")
    .forEach(el => el.classList.remove("selected"));
  slot.classList.add("selected");
});

// Custom events — game system communication
const gameEventBus = document.querySelector("#game-root");
// Listen for custom events
gameEventBus.addEventListener("enemy-defeated", (event) => {
  const { enemyName, xpReward } = event.detail;
  console.log(\`💀 \${enemyName} defeated! +\${xpReward} XP\`);
});

// Dispatch custom event from anywhere
const defeatEvent = new CustomEvent("enemy-defeated", {
  detail: { enemyName: "Shadow Dragon", xpReward: 500 },
  bubbles: true
});
gameEventBus.dispatchEvent(defeatEvent);`,
    breakdown: `Let's examine each event pattern:

• attackBtn.addEventListener("click", (event) => { ... }) — Registers a click handler. The arrow function receives an Event object with properties: target (the clicked element), clientX/clientY (mouse position), type ("click"), and many more.

• event.target.tagName — The element that was ACTUALLY clicked (might be a child of the element the listener is on). tagName returns "BUTTON", "DIV", etc. in uppercase.

• event.target.classList.add("clicked") — Directly modifies the clicked element's classes through the event object. Useful for visual feedback like adding a "pressed" animation class.

• document.addEventListener("keydown", ...) — Listens for keyboard events on the ENTIRE document. event.key returns the key identifier: "ArrowUp", "a", " " (space), "Escape", etc. Key names are standardized across browsers.

• event.preventDefault() — Stops the browser's default behavior. For arrow keys, the default is scrolling the page. For form submit, it's navigating. For links, it's following the href. Games almost always need this to prevent page interactions.

• const slot = event.target.closest(".item-slot") — EVENT DELEGATION pattern. closest() walks UP from the target looking for an ancestor matching the selector. If the user clicks a span INSIDE a .item-slot div, closest finds that parent div. Returns null if no match found.

• if (!slot) return — Guard clause: if the click wasn't inside an .item-slot (maybe they clicked the grid background), exit early. This prevents errors from trying to read dataset of null.

• inventoryGrid.querySelectorAll(".item-slot.selected").forEach(el => ...) — Scoped query: searches only WITHIN inventoryGrid, not the whole document. Finds all currently-selected slots and removes the "selected" class before adding it to the new selection.

• new CustomEvent("enemy-defeated", { detail: {...}, bubbles: true }) — Creates a CUSTOM event type with arbitrary data in the 'detail' property. bubbles: true makes it propagate up the DOM tree like native events.

• gameEventBus.dispatchEvent(defeatEvent) — Fires the custom event, triggering any listeners registered for "enemy-defeated" on this element or its ancestors (due to bubbling).`,
    summary: `addEventListener registers event handlers with full Event object access (target, coordinates, key). Use event.preventDefault() to stop browser defaults and event.key for keyboard input. Event delegation with closest() handles dynamic children through one parent listener — essential for game UIs. Custom events (CustomEvent with detail) enable communication between game systems through the DOM event system.`
  },

  {
    title: "Practical examples of DOM Manipulation",
    definition: "In real web game development, DOM manipulation powers dynamic health bars, animated card systems, real-time scoreboards, interactive inventory grids, modal dialogs, notification toasts, and any visual element that changes based on game state or player interaction.",
    explanation: `Let's build complete, interactive game UI components using DOM manipulation. These are the exact patterns used in browser-based card games, RPGs, and puzzle games. Each example creates functional UI from scratch with JavaScript.

A dynamic health bar system creates visual HP representations that animate smoothly when damage is taken. It combines createElement, style manipulation, classList for state changes (low HP turns red), and transition CSS for smooth animations. Every RPG needs real-time health visualization.

A card spawning system demonstrates creating complex multi-element components from data, attaching them to the DOM with proper event handlers, and managing card state (facedown/faceup, selected/unselected). This is the foundation of any card game — Solitaire, Hearthstone-style games, or memory matching.

A notification/toast system creates temporary messages that appear, display information, and auto-remove after a timer. This uses createElement, classList animations, setTimeout for auto-dismiss, and proper cleanup to prevent memory leaks. Every game needs feedback messages.

An interactive inventory grid builds a full grid of slots, handles drag-and-drop-style selection, tooltip display on hover, and item usage on double-click. Event delegation on the grid parent handles all interactions efficiently regardless of how many items exist.

Each example follows production patterns: separate data from display logic, use event delegation for dynamic content, batch DOM operations for performance, and clean up listeners and timers to prevent memory leaks.`,
    code: `// Dynamic Health Bar component
function createHealthBar(entityName, maxHP) {
  const container = document.createElement("div");
  container.className = "hp-container";
  container.innerHTML = \`
    <div class="hp-label">
      <span class="entity-name">\${entityName}</span>
      <span class="hp-text">\${maxHP}/\${maxHP}</span>
    </div>
    <div class="hp-track">
      <div class="hp-fill" style="width: 100%;"></div>
    </div>\`;

  let currentHP = maxHP;
  const fill = container.querySelector(".hp-fill");
  const text = container.querySelector(".hp-text");

  return {
    element: container,
    takeDamage(amount) {
      currentHP = Math.max(currentHP - amount, 0);
      const percent = (currentHP / maxHP) * 100;
      fill.style.width = \`\${percent}%\`;
      fill.style.transition = "width 0.5s ease, background-color 0.3s";
      text.textContent = \`\${currentHP}/\${maxHP}\`;
      fill.className = "hp-fill" + (percent < 25 ? " critical" : percent < 50 ? " warning" : "");
      if (currentHP <= 0) container.classList.add("defeated");
      return currentHP;
    },
    heal(amount) {
      currentHP = Math.min(currentHP + amount, maxHP);
      const percent = (currentHP / maxHP) * 100;
      fill.style.width = \`\${percent}%\`;
      text.textContent = \`\${currentHP}/\${maxHP}\`;
      fill.className = "hp-fill" + (percent < 25 ? " critical" : percent < 50 ? " warning" : "");
    }
  };
}

const bossBar = createHealthBar("Shadow Dragon", 500);
document.querySelector("#ui-panel").appendChild(bossBar.element);
bossBar.takeDamage(150); // Animates to 70%
bossBar.takeDamage(200); // Animates to 30% — warning state

// Notification Toast system
const toastContainer = document.createElement("div");
toastContainer.id = "toast-container";
toastContainer.style.cssText = "position:fixed; top:20px; right:20px; z-index:1000;";
document.body.appendChild(toastContainer);

function showToast(message, type = "info", duration = 3000) {
  const toast = document.createElement("div");
  toast.className = \`toast toast-\${type}\`;
  toast.innerHTML = \`<span class="toast-icon">\${
    type === "success" ? "✅" : type === "error" ? "❌" : type === "loot" ? "💎" : "ℹ️"
  }</span><span class="toast-msg">\${message}</span>\`;
  toastContainer.appendChild(toast);

  // Trigger animation on next frame
  requestAnimationFrame(() => toast.classList.add("visible"));

  // Auto-remove after duration
  setTimeout(() => {
    toast.classList.remove("visible");
    toast.addEventListener("transitionend", () => toast.remove());
  }, duration);
}

showToast("Quest complete: Defeat 5 Goblins", "success");
showToast("Legendary Drop: Flame Sword!", "loot", 5000);

// Interactive Card Spawner with event delegation
const cardData = [
  { id: 1, name: "Fireball", cost: 3, type: "spell", damage: 40 },
  { id: 2, name: "Shield Wall", cost: 2, type: "defense", block: 30 },
  { id: 3, name: "Heal", cost: 4, type: "spell", heal: 50 },
  { id: 4, name: "Quick Strike", cost: 1, type: "attack", damage: 15 }
];

const hand = document.querySelector("#player-hand");
const fragment = document.createDocumentFragment();
cardData.forEach(card => {
  const el = document.createElement("div");
  el.className = "game-card";
  el.dataset.cardId = card.id;
  el.innerHTML = \`
    <div class="card-cost">\${card.cost}</div>
    <div class="card-name">\${card.name}</div>
    <div class="card-type">\${card.type}</div>\`;
  fragment.appendChild(el);
});
hand.appendChild(fragment);

// Event delegation — single listener handles all cards
hand.addEventListener("click", (event) => {
  const cardEl = event.target.closest(".game-card");
  if (!cardEl) return;
  const cardId = parseInt(cardEl.dataset.cardId);
  const card = cardData.find(c => c.id === cardId);
  hand.querySelectorAll(".game-card.selected").forEach(el => el.classList.remove("selected"));
  cardEl.classList.add("selected");
  console.log(\`🃏 Selected: \${card.name} (cost: \${card.cost})\`);
});`,
    breakdown: `Let's trace through each game UI component:

• createHealthBar returns an object with element (the DOM node to insert) plus methods (takeDamage, heal). This ENCAPSULATES the HP bar — callers don't need to know about internal DOM structure. They just call bossBar.takeDamage(150).

• container.innerHTML = \`...\` — Creates the entire HP bar structure in one string. innerHTML with template literals is efficient for building initial structure from trusted data. The backtick template allows multi-line HTML with embedded values.

• fill.style.transition = "width 0.5s ease" — CSS transitions make the width change ANIMATE smoothly over 0.5 seconds instead of jumping instantly. The browser handles the animation — no JavaScript animation loop needed.

• fill.className = "hp-fill" + (percent < 25 ? " critical" : ...) — Dynamically changes class based on HP percentage. CSS can then style .critical with red color and .warning with yellow. Ternary chain selects the appropriate class.

• requestAnimationFrame(() => toast.classList.add("visible")) — Adding the class on the NEXT FRAME allows CSS transitions to animate from the initial state to the visible state. Without rAF, the browser batches both the append and the class-add, skipping the animation.

• toast.addEventListener("transitionend", () => toast.remove()) — Waits for the CSS fade-out animation to FINISH before removing the element. This prevents the toast from disappearing abruptly mid-animation. Clean removal prevents memory leaks.

• document.createDocumentFragment() — All 4 cards are built and appended to the fragment in a loop (zero reflows). Then one hand.appendChild(fragment) inserts them all at once (one reflow). Four times more efficient than individual appends.

• hand.addEventListener("click", ...) with event.target.closest(".game-card") — ONE listener on the parent handles clicks on ANY card, including cards added later. If you spawn more cards dynamically, they automatically work without new listeners.

• const card = cardData.find(c => c.id === cardId) — Links the DOM element back to the data object using the dataset.cardId. This pattern separates DATA (the card's stats) from DISPLAY (the DOM element). Update data independently of display.`,
    summary: `Build reusable UI components with factory functions that return { element, methods }. Use innerHTML with templates for initial structure, then manipulate individual elements for updates. CSS transitions handle animations — just toggle classes. requestAnimationFrame ensures class-add animations play. DocumentFragment batches element creation. Event delegation with closest() handles dynamic child elements. Link DOM elements to data via dataset attributes.`
  },

  {
    title: "DOM Manipulation best practices",
    definition: "Professional DOM code minimizes reflows by batching operations, uses event delegation for dynamic content, separates data from display logic, cleans up event listeners and timers to prevent memory leaks, prefers classList over direct style manipulation, and uses templates or frameworks for complex UIs.",
    explanation: `DOM manipulation is one of the most performance-sensitive areas of web development. The browser's rendering pipeline is expensive, and careless DOM access can cause layout thrashing, memory leaks, and janky animations. These best practices keep your game UI smooth at 60 FPS.

MINIMIZE REFLOWS: Every time you change the DOM's geometry (size, position, content), the browser recalculates layout for potentially the entire page. Reading layout properties (offsetHeight, getBoundingClientRect) immediately after writing forces a synchronous reflow. Batch all reads together, then all writes together. Never interleave read-write-read-write.

USE EVENT DELEGATION for any container with dynamic children. Attaching listeners to individual elements that get added/removed means constantly managing listener lifecycle — error-prone and memory-wasteful. One parent listener with closest() checking handles all current and future children automatically.

SEPARATE DATA FROM DOM: Keep your game state in JavaScript objects/arrays, not in the DOM. The DOM is a DISPLAY layer, not a data store. Don't read game state from element attributes — compute it from your data model and UPDATE the display to reflect the model. This makes debugging easy (inspect state in console) and enables features like undo/redo.

CLEAN UP to prevent memory leaks. Remove event listeners when elements are destroyed (especially in single-page apps). Clear timeouts and intervals. Nullify references to removed elements. In games with frequent entity creation/destruction, leaks accumulate fast and cause performance degradation.

USE CSS CLASSES over inline styles for state changes. Define .hidden, .active, .damaged, .selected classes in CSS and toggle them with classList. This separates styling concerns, enables CSS transitions/animations automatically, and is more maintainable than setting individual style properties in JavaScript. Reserve inline styles for truly dynamic values (calculated positions, progress percentages).`,
    code: `// GOOD: Batch DOM reads and writes to prevent layout thrashing
function updateEnemyPositions(enemies) {
  // BAD pattern (layout thrashing):
  // enemies.forEach(e => {
  //   const height = e.element.offsetHeight; // READ — forces layout
  //   e.element.style.top = height + "px";   // WRITE — invalidates layout
  // });

  // GOOD: Read all, THEN write all
  const measurements = enemies.map(e => ({
    el: e.element,
    height: e.element.offsetHeight // All reads together
  }));
  measurements.forEach(({ el, height }) => {
    el.style.transform = \`translateY(\${height}px)\`; // All writes together
  });
}

// GOOD: Reusable component with cleanup
function createTimer(parentEl, seconds) {
  const el = document.createElement("div");
  el.className = "game-timer";
  el.textContent = \`⏱️ \${seconds}s\`;
  parentEl.appendChild(el);

  let remaining = seconds;
  const intervalId = setInterval(() => {
    remaining--;
    el.textContent = \`⏱️ \${remaining}s\`;
    if (remaining <= 5) el.classList.add("urgent");
    if (remaining <= 0) destroy();
  }, 1000);

  function destroy() {
    clearInterval(intervalId);  // Stop the timer
    el.remove();                // Remove from DOM
  }

  return { element: el, destroy, getRemaining: () => remaining };
}

const timer = createTimer(document.querySelector("#hud"), 30);
// Later: timer.destroy() — clean removal with no leaks

// GOOD: Data-driven rendering — state as source of truth
const gameState = {
  players: [
    { id: "p1", name: "Hero", hp: 85, maxHP: 100, status: "normal" },
    { id: "p2", name: "Ally", hp: 20, maxHP: 80, status: "poisoned" }
  ]
};

function renderPlayerList(container, players) {
  // Clear and rebuild — simple and correct
  container.innerHTML = "";
  const fragment = document.createDocumentFragment();
  players.forEach(player => {
    const el = document.createElement("div");
    el.className = \`player-row \${player.status}\`;
    el.dataset.playerId = player.id;
    const percent = Math.round((player.hp / player.maxHP) * 100);
    el.innerHTML = \`
      <span class="name">\${player.name}</span>
      <div class="mini-hp">
        <div class="mini-hp-fill" style="width:\${percent}%"></div>
      </div>
      <span class="hp-num">\${player.hp}/\${player.maxHP}</span>\`;
    fragment.appendChild(el);
  });
  container.appendChild(fragment);
}

renderPlayerList(document.querySelector("#party-panel"), gameState.players);

// GOOD: classList for state changes + CSS handles visuals
const card = document.querySelector(".game-card");
// Toggle states with classes — CSS defines how each looks
card.classList.toggle("flipped");       // Flip animation via CSS
card.classList.toggle("highlighted");   // Glow effect via CSS
card.classList.add("played");           // Slide-out animation via CSS
card.classList.remove("in-hand");       // Remove hand positioning

// GOOD: Debounce expensive DOM operations
function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
const updateSearch = debounce((query) => {
  const results = document.querySelector("#search-results");
  results.innerHTML = \`<div class="searching">Searching for "\${query}"...</div>\`;
  // Actual search logic here
}, 300);

document.querySelector("#search-input")
  .addEventListener("input", (e) => updateSearch(e.target.value));`,
    breakdown: `Let's examine each performance pattern:

• enemies.map(e => ({ el: e.element, height: e.element.offsetHeight })) — Reads ALL heights first. When you read offsetHeight, the browser must ensure layout is up-to-date. Reading all at once means layout is calculated ONCE. Then all writes (transform changes) are batched, triggering only ONE recalculation.

• el.style.transform = \`translateY(...)\` — Using transform instead of top/left. Transforms only trigger COMPOSITE (cheapest rendering step), not layout or paint. Always prefer transform and opacity for animations — the browser can GPU-accelerate them.

• clearInterval(intervalId) in destroy() — CRITICAL cleanup. Without this, the interval keeps running even after the element is removed from the DOM, updating a detached element forever. This is a memory leak and wasted CPU.

• return { element, destroy, getRemaining } — The component exposes a cleanup API. Callers are responsible for calling destroy() when the timer is no longer needed. This pattern prevents leaks in games with many short-lived UI elements.

• container.innerHTML = "" — Clears all children before re-rendering. Simple but effective for lists that change frequently. For very large lists or when preserving scroll position matters, use diffing (compare old vs new, update only changes).

• renderPlayerList receives DATA (players array) and OUTPUTS DOM. The function doesn't read state from existing DOM elements — it receives truth from the data model. If game state changes, just call renderPlayerList again with the new data.

• card.classList.toggle("flipped") — CSS defines what "flipped" looks like (rotation, opacity, etc.) and the transition duration. JavaScript only toggles the class — clean separation of concerns. Change animations by editing CSS, not JavaScript.

• debounce(fn, delay) — Prevents fn from running until the user STOPS typing for 'delay' milliseconds. Each keystroke resets the timer. Without debounce, searching on every keystroke fires DOM updates 10+ times per second, causing jank.

• clearTimeout(timeoutId) before setTimeout — Cancels the previous pending call. Only the LAST call within the delay window actually executes. Essential for search-as-you-type, resize handlers, and scroll events.`,
    summary: `DOM best practices: batch reads then writes to prevent layout thrashing. Use transform/opacity for animations (GPU-accelerated). Always clean up intervals, timeouts, and listeners when removing elements. Keep game state in JS objects — render the DOM FROM state, don't read state FROM the DOM. Use classList for state changes, let CSS handle visual details. Debounce expensive operations triggered by rapid events. Use DocumentFragment for batch insertions.`
  }
];
