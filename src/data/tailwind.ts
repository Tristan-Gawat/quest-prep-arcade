import { Module } from "./curriculum";

export const tailwindModules: Module[] = [
  {
    id: "tailwind-utility-basics",
    title: "Utility Classes Basics",
    tier: "EASY",
    lesson: {
      title: "Utility Classes Basics",
      concept: "Tailwind CSS uses utility classes — small, single-purpose power-ups you compose to build any design.",
      explanation:
        "Instead of writing custom CSS, Tailwind provides utility classes like 'text-center', 'bg-blue-500', 'p-4'. Each class does one thing. You combine them directly in HTML. This approach is faster to prototype, easier to maintain, and eliminates naming conflicts. Think of utilities as modular armor pieces you assemble.",
      codeExample: `<!-- Basic layout with Tailwind utilities -->
<div class="p-4 m-2 bg-white rounded-lg shadow-md">
  <h1 class="text-2xl font-bold text-gray-800">
    Quest Board
  </h1>
  <p class="mt-2 text-gray-600">
    Choose your next adventure!
  </p>
  <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
    Start Quest
  </button>
</div>

<!-- Breakdown:
  p-4      = padding: 1rem (all sides)
  m-2      = margin: 0.5rem
  bg-white = background-color: white
  rounded-lg = border-radius: 0.5rem
  shadow-md  = medium box shadow
  text-2xl   = font-size: 1.5rem
  font-bold  = font-weight: 700
-->`,
      breakdown: "",
      language: "css",
    },
    quiz: [
      {
        question: "What does 'p-4' mean in Tailwind?",
        choices: ["Paragraph 4", "Padding of 1rem on all sides", "Position 4", "Priority 4"],
        correct: 1,
        explanation: "p-4 applies padding: 1rem (16px) on all sides. The number maps to Tailwind's spacing scale.",
      },
      {
        question: "How does Tailwind differ from traditional CSS?",
        choices: [
          "It uses JavaScript instead",
          "You apply small utility classes directly in HTML instead of writing custom CSS",
          "It only works with React",
          "It replaces HTML",
        ],
        correct: 1,
        explanation: "Tailwind is utility-first: compose designs from pre-built single-purpose classes right in your markup.",
      },
      {
        question: "What does 'text-2xl' control?",
        choices: ["Text color", "Font size (1.5rem)", "Text alignment", "Text decoration"],
        correct: 1,
        explanation: "text-{size} controls font-size. 2xl = 1.5rem. Other sizes: sm, base, lg, xl, 3xl, etc.",
      },
    ],
        subLessons: ["What is Utility Classes Basics?","How Utility Classes Basics works","Utility Classes Basics syntax & usage","Practical examples of Utility Classes Basics","Utility Classes Basics best practices"],
challenge: {
      title: "Card Builder",
      description:
        "Create a card with: padding of 6 (p-6), white background (bg-white), large rounded corners (rounded-lg), and a large shadow (shadow-lg). Inside, add a bold heading with dark text.",
      starterCode: "<!-- Build your card -->\n<div class=\"\">\n  <h2 class=\"\">Inventory</h2>\n</div>",
      expectedOutput: "<div class=\"p-6 bg-white rounded-lg shadow-lg\"><h2 class=\"font-bold text-gray-900\">Inventory</h2></div>",
      hints: [
        "Combine spacing, background, border-radius, and shadow utilities",
        "Use font-bold for bold text",
        "text-gray-900 gives very dark gray text",
      ],
      solution: `<div class="p-6 bg-white rounded-lg shadow-lg">\n  <h2 class="font-bold text-gray-900">Inventory</h2>\n</div>`,
      language: "css",
    },
  },

  {
    id: "tailwind-colors-typography",
    title: "Colors & Typography",
    tier: "EASY",
    lesson: {
      title: "Colors & Typography",
      concept: "Tailwind's color and typography system is your palette — paint any UI with precision.",
      explanation:
        "Colors follow the pattern: {property}-{color}-{shade}. Properties: text, bg, border. Colors: gray, red, blue, green, etc. Shades: 50 (lightest) to 950 (darkest). Typography: text-{size}, font-{weight}, leading-{spacing}, tracking-{letter-spacing}. Combine for stunning text designs.",
      codeExample: `<!-- Color palette usage -->
<div class="bg-slate-900 p-6">
  <h1 class="text-3xl font-extrabold text-emerald-400">
    Level Complete!
  </h1>
  <p class="text-lg text-slate-300 leading-relaxed">
    You've earned 500 XP and unlocked new abilities.
  </p>
  <span class="text-sm font-mono text-amber-500 tracking-wide">
    +500 XP
  </span>
</div>

<!-- Typography scale:
  text-xs   = 0.75rem    font-thin       = 100
  text-sm   = 0.875rem   font-light      = 300
  text-base = 1rem       font-normal     = 400
  text-lg   = 1.125rem   font-medium     = 500
  text-xl   = 1.25rem    font-semibold   = 600
  text-2xl  = 1.5rem     font-bold       = 700
  text-3xl  = 1.875rem   font-extrabold  = 800
-->

<!-- Color shades: lighter (50) to darker (950) -->
<div class="text-blue-100">Very light blue</div>
<div class="text-blue-500">Medium blue</div>
<div class="text-blue-900">Very dark blue</div>`,
      breakdown: "",
      language: "css",
    },
    quiz: [
      {
        question: "What does 'bg-red-500' apply?",
        choices: ["Red text", "Red border", "Red background (medium shade)", "Red shadow"],
        correct: 2,
        explanation: "bg- prefix targets background-color. red-500 is the medium/base shade of red.",
      },
      {
        question: "Which shade number is darkest?",
        choices: ["50", "100", "500", "900"],
        correct: 3,
        explanation: "Shades go from 50 (very light) to 900/950 (very dark). 500 is the base/middle shade.",
      },
      {
        question: "What does 'font-mono' do?",
        choices: ["Makes text monochrome", "Applies a monospace font family", "Sets font size to 1", "Makes text bold"],
        correct: 1,
        explanation: "font-mono sets font-family to a monospace font — great for code and technical displays!",
      },
    ],
        subLessons: ["What is Colors & Typography?","How Colors & Typography works","Colors & Typography syntax & usage","Practical examples of Colors & Typography","Colors & Typography best practices"],
challenge: {
      title: "Achievement Badge",
      description:
        "Create a span element styled as a badge: small text (text-sm), semibold weight, green-100 background, green-800 text color, with small padding (px-2 py-1) and rounded corners.",
      starterCode: "<!-- Create the achievement badge -->\n<span class=\"\">\n  Achievement Unlocked\n</span>",
      expectedOutput: "<span class=\"text-sm font-semibold bg-green-100 text-green-800 px-2 py-1 rounded\">Achievement Unlocked</span>",
      hints: [
        "Combine text-sm font-semibold for typography",
        "bg-green-100 for light green background",
        "text-green-800 for dark green text",
      ],
      solution: `<span class="text-sm font-semibold bg-green-100 text-green-800 px-2 py-1 rounded">\n  Achievement Unlocked\n</span>`,
      language: "css",
    },
  },

  {
    id: "tailwind-spacing-sizing",
    title: "Spacing & Sizing",
    tier: "EASY",
    lesson: {
      title: "Spacing & Sizing",
      concept: "Master Tailwind's spacing scale — control the rhythm and proportions of your layout.",
      explanation:
        "Spacing uses a consistent scale: 1 = 0.25rem, 2 = 0.5rem, 4 = 1rem, 8 = 2rem, etc. Margin: m-{n}, mt/mr/mb/ml for sides, mx/my for axes. Padding: p-{n} with same directional modifiers. Width: w-{n}, w-full, w-1/2, w-screen. Height: h-{n}, h-full, h-screen. Max/min-width and height also available.",
      codeExample: `<!-- Spacing scale -->
<div class="m-4 p-6">
  <!-- m-4 = margin 1rem, p-6 = padding 1.5rem -->
</div>

<!-- Directional spacing -->
<div class="mt-2 mb-4 px-6 py-3">
  <!-- mt = margin-top, mb = margin-bottom -->
  <!-- px = padding left+right, py = padding top+bottom -->
</div>

<!-- Sizing -->
<div class="w-full max-w-md h-64">
  <!-- w-full = width: 100% -->
  <!-- max-w-md = max-width: 28rem -->
  <!-- h-64 = height: 16rem -->
</div>

<!-- Fractional widths -->
<div class="flex">
  <div class="w-1/3 bg-blue-200 p-4">Sidebar</div>
  <div class="w-2/3 bg-blue-100 p-4">Content</div>
</div>

<!-- Space between children -->
<div class="flex space-x-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>`,
      breakdown: "",
      language: "css",
    },
    quiz: [
      {
        question: "What is the CSS value of 'p-4' in Tailwind?",
        choices: ["4px", "0.4rem", "1rem (16px)", "4rem"],
        correct: 2,
        explanation: "Each unit = 0.25rem. So p-4 = 4 * 0.25rem = 1rem = 16px.",
      },
      {
        question: "What does 'mx-auto' do?",
        choices: ["Sets margin to automatic value", "Centers an element horizontally", "Removes all margins", "Sets max margin"],
        correct: 1,
        explanation: "mx-auto sets margin-left and margin-right to auto — centering a block element horizontally!",
      },
      {
        question: "What does 'space-x-4' do?",
        choices: [
          "Adds 1rem space between flex children horizontally",
          "Adds padding to the container",
          "Sets letter spacing",
          "Creates a gap in grid",
        ],
        correct: 0,
        explanation: "space-x-4 adds margin-left: 1rem to all children except the first — spacing between items!",
      },
    ],
        subLessons: ["What is Spacing & Sizing?","How Spacing & Sizing works","Spacing & Sizing syntax & usage","Practical examples of Spacing & Sizing","Spacing & Sizing best practices"],
challenge: {
      title: "Centered Container",
      description:
        "Create a div that is centered horizontally (mx-auto), has a max-width of 'lg' (max-w-lg), padding of 8 on all sides, and margin-top of 10. Add a heading inside.",
      starterCode: "<!-- Build the centered container -->\n<div class=\"\">\n  <h1>Game Hub</h1>\n</div>",
      expectedOutput: "<div class=\"mx-auto max-w-lg p-8 mt-10\"><h1>Game Hub</h1></div>",
      hints: [
        "mx-auto centers the element",
        "max-w-lg constrains width to 32rem",
        "Combine p-8 and mt-10 for spacing",
      ],
      solution: `<div class="mx-auto max-w-lg p-8 mt-10">\n  <h1>Game Hub</h1>\n</div>`,
      language: "css",
    },
  },

  {
    id: "tailwind-flexbox",
    title: "Flexbox Utilities",
    tier: "EASY",
    lesson: {
      title: "Flexbox Utilities",
      concept: "Flexbox in Tailwind — arrange your UI elements like a party formation in an RPG.",
      explanation:
        "Enable flex with 'flex'. Direction: flex-row (default), flex-col. Justify content (main axis): justify-start, justify-center, justify-between, justify-around. Align items (cross axis): items-start, items-center, items-end. Flex children: flex-1 (grow), flex-none (don't grow), flex-shrink-0.",
      codeExample: `<!-- Horizontal center -->
<div class="flex justify-center items-center h-screen">
  <p>Perfectly centered!</p>
</div>

<!-- Navigation bar -->
<nav class="flex justify-between items-center p-4 bg-gray-800">
  <span class="text-white font-bold">GameHub</span>
  <div class="flex space-x-4">
    <a class="text-gray-300">Home</a>
    <a class="text-gray-300">Quests</a>
    <a class="text-gray-300">Profile</a>
  </div>
</nav>

<!-- Card row with equal sizing -->
<div class="flex gap-4 p-4">
  <div class="flex-1 bg-blue-100 p-4 rounded">Card 1</div>
  <div class="flex-1 bg-blue-100 p-4 rounded">Card 2</div>
  <div class="flex-1 bg-blue-100 p-4 rounded">Card 3</div>
</div>

<!-- Column layout -->
<div class="flex flex-col gap-2">
  <div class="p-3 bg-gray-100">Quest 1</div>
  <div class="p-3 bg-gray-100">Quest 2</div>
  <div class="p-3 bg-gray-100">Quest 3</div>
</div>`,
      breakdown: "",
      language: "css",
    },
    quiz: [
      {
        question: "How do you center an element both horizontally and vertically?",
        choices: [
          "text-center align-middle",
          "flex justify-center items-center",
          "center-all",
          "mx-auto my-auto",
        ],
        correct: 1,
        explanation: "flex + justify-center (horizontal) + items-center (vertical) creates perfect centering!",
      },
      {
        question: "What does 'justify-between' do?",
        choices: [
          "Centers all items",
          "Spaces items evenly with first/last at edges",
          "Adds gaps between items",
          "Justifies text",
        ],
        correct: 1,
        explanation: "justify-between distributes space between items, pushing first and last to the container edges.",
      },
      {
        question: "What does 'flex-1' do to a flex child?",
        choices: [
          "Sets it as the first item",
          "Makes it grow to fill available space equally",
          "Sets flex to 1px",
          "Makes it fixed size",
        ],
        correct: 1,
        explanation: "flex-1 = flex: 1 1 0% — the item grows and shrinks to fill available space.",
      },
    ],
        subLessons: ["What is Flexbox Utilities?","How Flexbox Utilities works","Flexbox Utilities syntax & usage","Practical examples of Flexbox Utilities","Flexbox Utilities best practices"],
challenge: {
      title: "Party Formation",
      description:
        "Create a flex container that spaces items evenly (justify-between), centers them vertically (items-center), with padding of 4. Place three span elements inside with names 'Tank', 'DPS', 'Healer'.",
      starterCode: "<!-- Build the party formation -->\n<div class=\"\">\n  <span>Tank</span>\n  <span>DPS</span>\n  <span>Healer</span>\n</div>",
      expectedOutput: "<div class=\"flex justify-between items-center p-4\"><span>Tank</span><span>DPS</span><span>Healer</span></div>",
      hints: [
        "Start with 'flex' to enable flexbox",
        "justify-between for even spacing",
        "items-center for vertical centering",
      ],
      solution: `<div class="flex justify-between items-center p-4">\n  <span>Tank</span>\n  <span>DPS</span>\n  <span>Healer</span>\n</div>`,
      language: "css",
    },
  },

  {
    id: "tailwind-grid",
    title: "Grid Utilities",
    tier: "MEDIUM",
    lesson: {
      title: "Grid Utilities",
      concept: "CSS Grid in Tailwind — lay out your game board with precise row and column control.",
      explanation:
        "Enable grid with 'grid'. Define columns: grid-cols-{n} (1-12). Rows: grid-rows-{n}. Gap between cells: gap-{n}. Span cells: col-span-{n}, row-span-{n}. Place items: col-start-{n}, col-end-{n}. Auto-fit with grid-cols-[repeat(auto-fit,minmax(200px,1fr))] via arbitrary values.",
      codeExample: `<!-- Basic 3-column grid -->
<div class="grid grid-cols-3 gap-4 p-4">
  <div class="bg-blue-200 p-4 rounded">Slot 1</div>
  <div class="bg-blue-200 p-4 rounded">Slot 2</div>
  <div class="bg-blue-200 p-4 rounded">Slot 3</div>
  <div class="bg-blue-200 p-4 rounded">Slot 4</div>
  <div class="bg-blue-200 p-4 rounded">Slot 5</div>
  <div class="bg-blue-200 p-4 rounded">Slot 6</div>
</div>

<!-- Spanning columns -->
<div class="grid grid-cols-4 gap-4">
  <div class="col-span-2 bg-purple-200 p-4">Wide item (2 cols)</div>
  <div class="bg-purple-200 p-4">Normal</div>
  <div class="bg-purple-200 p-4">Normal</div>
</div>

<!-- Dashboard layout -->
<div class="grid grid-cols-4 grid-rows-3 gap-4 h-screen">
  <header class="col-span-4 bg-gray-800 p-4">Header</header>
  <aside class="row-span-2 bg-gray-200 p-4">Sidebar</aside>
  <main class="col-span-3 row-span-2 bg-white p-4">Main Content</main>
</div>`,
      breakdown: "",
      language: "css",
    },
    quiz: [
      {
        question: "What does 'grid-cols-3' create?",
        choices: ["3 rows", "3 equal-width columns", "3px columns", "3 grid items"],
        correct: 1,
        explanation: "grid-cols-3 creates a 3-column grid with equal-width columns (1fr each).",
      },
      {
        question: "What does 'col-span-2' do?",
        choices: ["Creates 2 columns", "Makes an item span 2 columns", "Adds 2 column gap", "Skips 2 columns"],
        correct: 1,
        explanation: "col-span-2 makes a grid item stretch across 2 columns instead of the default 1.",
      },
      {
        question: "What does 'gap-4' apply?",
        choices: ["Padding inside items", "Space between grid cells (1rem)", "Margin on the container", "Border width"],
        correct: 1,
        explanation: "gap-4 adds 1rem spacing between all grid cells — both rows and columns.",
      },
    ],
        subLessons: ["What is Grid Utilities?","How Grid Utilities works","Grid Utilities syntax & usage","Practical examples of Grid Utilities","Grid Utilities best practices"],
challenge: {
      title: "Inventory Grid",
      description:
        "Create a 4-column grid with gap-2 and padding-4. Place 8 div items inside, each with bg-gray-200 p-3 and rounded. The first item should span 2 columns.",
      starterCode: "<!-- Build the inventory grid -->\n<div class=\"\">\n  <div class=\"\">Item 1 (wide)</div>\n  <div class=\"bg-gray-200 p-3 rounded\">Item 2</div>\n  <!-- ... more items -->\n</div>",
      expectedOutput: "<div class=\"grid grid-cols-4 gap-2 p-4\"><div class=\"col-span-2 bg-gray-200 p-3 rounded\">Item 1 (wide)</div>...</div>",
      hints: [
        "Use grid grid-cols-4 gap-2 p-4 on container",
        "Add col-span-2 to the first item",
        "Each item gets bg-gray-200 p-3 rounded",
      ],
      solution: `<div class="grid grid-cols-4 gap-2 p-4">\n  <div class="col-span-2 bg-gray-200 p-3 rounded">Item 1 (wide)</div>\n  <div class="bg-gray-200 p-3 rounded">Item 2</div>\n  <div class="bg-gray-200 p-3 rounded">Item 3</div>\n  <div class="bg-gray-200 p-3 rounded">Item 4</div>\n  <div class="bg-gray-200 p-3 rounded">Item 5</div>\n  <div class="bg-gray-200 p-3 rounded">Item 6</div>\n  <div class="bg-gray-200 p-3 rounded">Item 7</div>\n  <div class="bg-gray-200 p-3 rounded">Item 8</div>\n</div>`,
      language: "css",
    },
  },

  {
    id: "tailwind-responsive",
    title: "Responsive Design",
    tier: "MEDIUM",
    lesson: {
      title: "Responsive Design",
      concept: "Responsive design in Tailwind — your layout adapts like a shapeshifting character across all screen sizes.",
      explanation:
        "Tailwind uses mobile-first responsive breakpoints as prefixes: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px). Unprefixed classes apply to all sizes. Prefixed classes apply at that breakpoint and above. Stack on mobile, spread on desktop is the common pattern.",
      codeExample: `<!-- Mobile-first responsive card grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
  <div class="bg-white p-4 rounded shadow">Card 1</div>
  <div class="bg-white p-4 rounded shadow">Card 2</div>
  <div class="bg-white p-4 rounded shadow">Card 3</div>
  <div class="bg-white p-4 rounded shadow">Card 4</div>
</div>

<!-- Responsive text sizing -->
<h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
  Level Up!
</h1>

<!-- Show/hide at breakpoints -->
<nav class="hidden md:flex space-x-4">Desktop Nav</nav>
<button class="md:hidden">Mobile Menu</button>

<!-- Responsive padding/layout -->
<div class="px-4 md:px-8 lg:px-16">
  <div class="flex flex-col md:flex-row gap-4">
    <aside class="w-full md:w-1/4">Sidebar</aside>
    <main class="w-full md:w-3/4">Content</main>
  </div>
</div>`,
      breakdown: "",
      language: "css",
    },
    quiz: [
      {
        question: "What does 'md:flex-row' mean?",
        choices: [
          "Always flex-row",
          "flex-row at medium screens (768px) and above",
          "flex-row only at medium screens",
          "flex-row below medium",
        ],
        correct: 1,
        explanation: "Breakpoint prefixes apply at that size AND above. md: means 768px and wider.",
      },
      {
        question: "Which approach does Tailwind use — mobile-first or desktop-first?",
        choices: ["Desktop-first", "Mobile-first", "Both equally", "Neither"],
        correct: 1,
        explanation: "Tailwind is mobile-first: base classes style mobile, breakpoint prefixes override for larger screens.",
      },
      {
        question: "How do you hide something on mobile but show on desktop?",
        choices: ["mobile:hidden", "hidden md:block (or md:flex)", "display-none-mobile", "sm:visible"],
        correct: 1,
        explanation: "'hidden' hides by default (mobile), then md:block or md:flex shows it at medium screens and up.",
      },
    ],
        subLessons: ["What is Responsive Design?","How Responsive Design works","Responsive Design syntax & usage","Practical examples of Responsive Design","Responsive Design best practices"],
challenge: {
      title: "Responsive Quest List",
      description:
        "Create a grid that shows 1 column on mobile, 2 columns on sm screens, and 3 columns on lg screens. Add gap-4. Include 3 quest card divs.",
      starterCode: "<!-- Responsive quest grid -->\n<div class=\"\">\n  <div class=\"bg-white p-4 rounded shadow\">Quest 1</div>\n  <div class=\"bg-white p-4 rounded shadow\">Quest 2</div>\n  <div class=\"bg-white p-4 rounded shadow\">Quest 3</div>\n</div>",
      expectedOutput: "<div class=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4\">...</div>",
      hints: [
        "Start with grid grid-cols-1 for mobile",
        "Add sm:grid-cols-2 for small screens",
        "Add lg:grid-cols-3 for large screens",
      ],
      solution: `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">\n  <div class="bg-white p-4 rounded shadow">Quest 1</div>\n  <div class="bg-white p-4 rounded shadow">Quest 2</div>\n  <div class="bg-white p-4 rounded shadow">Quest 3</div>\n</div>`,
      language: "css",
    },
  },

  {
    id: "tailwind-hover-focus",
    title: "Hover & Focus States",
    tier: "MEDIUM",
    lesson: {
      title: "Hover & Focus States",
      concept: "State variants are your interactive spells — transform elements when players interact!",
      explanation:
        "Tailwind uses modifier prefixes for states: hover:, focus:, active:, disabled:, group-hover:, focus-within:. Apply any utility conditionally on interaction. Transition utilities (transition, duration-{ms}, ease-{type}) smooth the changes. Combine for polished interactive experiences.",
      codeExample: `<!-- Button with hover and active states -->
<button class="px-6 py-3 bg-blue-500 text-white rounded-lg
  hover:bg-blue-600 active:bg-blue-700
  transition duration-200 ease-in-out
  focus:outline-none focus:ring-2 focus:ring-blue-400">
  Attack!
</button>

<!-- Card with hover effect -->
<div class="p-4 bg-white rounded-lg shadow
  hover:shadow-xl hover:-translate-y-1
  transition-all duration-300">
  <h3>Quest Available</h3>
</div>

<!-- Group hover (parent triggers child change) -->
<div class="group p-4 bg-gray-100 rounded hover:bg-gray-200 transition">
  <h3 class="text-gray-700 group-hover:text-blue-600">
    Hover the card!
  </h3>
  <p class="text-gray-500 group-hover:text-gray-700">
    Text changes too
  </p>
</div>

<!-- Focus states for inputs -->
<input class="border border-gray-300 rounded px-3 py-2
  focus:border-blue-500 focus:ring-2 focus:ring-blue-200
  transition duration-150"
  placeholder="Enter hero name" />`,
      breakdown: "",
      language: "css",
    },
    quiz: [
      {
        question: "What does 'hover:bg-blue-600' do?",
        choices: [
          "Always applies blue-600 background",
          "Changes background to blue-600 only when hovered",
          "Changes on click",
          "Animates the background",
        ],
        correct: 1,
        explanation: "hover: prefix applies the utility only when the element is being hovered over.",
      },
      {
        question: "What does the 'group-hover:' prefix do?",
        choices: [
          "Hovers all elements in a group",
          "Applies styles to a child when a parent with 'group' class is hovered",
          "Groups hover effects together",
          "Disables hover on groups",
        ],
        correct: 1,
        explanation: "group-hover targets a child element that changes when its parent 'group' element is hovered.",
      },
      {
        question: "What does 'transition duration-300' do?",
        choices: [
          "Delays hover by 300ms",
          "Smoothly animates property changes over 300ms",
          "Removes after 300ms",
          "Sets opacity to 300",
        ],
        correct: 1,
        explanation: "transition enables CSS transitions; duration-300 sets the animation time to 300ms for smooth changes.",
      },
    ],
        subLessons: ["What is Hover & Focus States?","How Hover & Focus States works","Hover & Focus States syntax & usage","Practical examples of Hover & Focus States","Hover & Focus States best practices"],
challenge: {
      title: "Interactive Button",
      description:
        "Create a button with blue-500 background, white text, rounded-lg, px-6 py-3. Add: hover changes to blue-700, transition with 200ms duration. Add focus:ring-2 focus:ring-blue-300.",
      starterCode: "<!-- Build the interactive button -->\n<button class=\"\">\n  Cast Spell\n</button>",
      expectedOutput: "<button class=\"bg-blue-500 text-white rounded-lg px-6 py-3 hover:bg-blue-700 transition duration-200 focus:ring-2 focus:ring-blue-300\">Cast Spell</button>",
      hints: [
        "Base styles first: bg-blue-500 text-white rounded-lg px-6 py-3",
        "Add hover:bg-blue-700 for hover state",
        "Add transition duration-200 for smooth animation",
      ],
      solution: `<button class="bg-blue-500 text-white rounded-lg px-6 py-3 hover:bg-blue-700 transition duration-200 focus:ring-2 focus:ring-blue-300">\n  Cast Spell\n</button>`,
      language: "css",
    },
  },

  {
    id: "tailwind-dark-mode",
    title: "Dark Mode",
    tier: "MEDIUM",
    lesson: {
      title: "Dark Mode",
      concept: "Dark mode in Tailwind — toggle between light and shadow realms with a single prefix.",
      explanation:
        "Use the 'dark:' prefix to apply styles in dark mode. Configure in tailwind.config.js: 'class' strategy (toggle via .dark class on html) or 'media' strategy (uses OS preference). Dark mode pairs well with transitions. Design both modes simultaneously by adding dark: variants alongside base styles.",
      codeExample: `<!-- Dark mode card -->
<div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
  <h2 class="text-gray-900 dark:text-white text-xl font-bold">
    Quest Log
  </h2>
  <p class="text-gray-600 dark:text-gray-300 mt-2">
    Your active quests appear here.
  </p>
  <button class="mt-4 px-4 py-2
    bg-blue-500 dark:bg-blue-600
    hover:bg-blue-600 dark:hover:bg-blue-700
    text-white rounded transition">
    View Quests
  </button>
</div>

<!-- Toggle button -->
<button onclick="document.documentElement.classList.toggle('dark')"
  class="p-2 rounded-full
    bg-gray-200 dark:bg-gray-700
    text-gray-800 dark:text-yellow-300">
  Toggle Dark Mode
</button>

<!-- tailwind.config.js setup:
module.exports = {
  darkMode: 'class',  // or 'media' for OS preference
  // ...
}
-->`,
      breakdown: "",
      language: "css",
    },
    quiz: [
      {
        question: "What does 'dark:bg-gray-800' do?",
        choices: [
          "Always applies gray-800",
          "Applies gray-800 background only in dark mode",
          "Makes the element darker",
          "Adds a dark border",
        ],
        correct: 1,
        explanation: "dark: prefix applies the utility only when dark mode is active — light mode ignores it.",
      },
      {
        question: "What are the two dark mode strategies in Tailwind?",
        choices: [
          "auto and manual",
          "'class' (toggle via class) and 'media' (OS preference)",
          "light and dark",
          "theme and variant",
        ],
        correct: 1,
        explanation: "'class' gives you manual control via .dark class; 'media' automatically follows the user's OS preference.",
      },
      {
        question: "Can you combine dark: with hover:?",
        choices: ["No, only one prefix allowed", "Yes, like dark:hover:bg-blue-700", "Only with !important", "Only in config"],
        correct: 1,
        explanation: "Modifiers can be stacked! dark:hover:bg-blue-700 applies on hover specifically in dark mode.",
      },
    ],
        subLessons: ["What is Dark Mode?","How Dark Mode works","Dark Mode syntax & usage","Practical examples of Dark Mode","Dark Mode best practices"],
challenge: {
      title: "Dark Mode Card",
      description:
        "Create a div with: white background in light mode, gray-900 in dark mode. Text: gray-900 in light, white in dark. Add padding-6, rounded-lg. Include a heading that also switches colors.",
      starterCode: "<!-- Build the dark-mode-aware card -->\n<div class=\"\">\n  <h2 class=\"\">Score: 9001</h2>\n</div>",
      expectedOutput: "<div class=\"bg-white dark:bg-gray-900 p-6 rounded-lg\"><h2 class=\"text-gray-900 dark:text-white font-bold\">Score: 9001</h2></div>",
      hints: [
        "Use bg-white dark:bg-gray-900 for background",
        "Use text-gray-900 dark:text-white for text",
        "Add p-6 rounded-lg for the container",
      ],
      solution: `<div class="bg-white dark:bg-gray-900 p-6 rounded-lg">\n  <h2 class="text-gray-900 dark:text-white font-bold">Score: 9001</h2>\n</div>`,
      language: "css",
    },
  },

  {
    id: "tailwind-animations",
    title: "Animations & Transitions",
    tier: "HARD",
    lesson: {
      title: "Animations & Transitions",
      concept: "Animations bring your UI to life — add motion like spell effects to your interface!",
      explanation:
        "Tailwind includes built-in animations: animate-spin, animate-ping, animate-pulse, animate-bounce. For transitions: transition-{property}, duration-{ms}, ease-{type}, delay-{ms}. Transform utilities: scale-{n}, rotate-{deg}, translate-x/y-{n}. Combine hover states with transforms for polished interactions. Custom animations go in tailwind.config.js.",
      codeExample: `<!-- Built-in animations -->
<div class="animate-spin h-8 w-8 border-4 border-blue-500
  border-t-transparent rounded-full">
</div>  <!-- Loading spinner -->

<div class="animate-pulse bg-gray-300 h-4 w-48 rounded">
</div>  <!-- Skeleton loader -->

<div class="animate-bounce text-4xl">⬇️</div>  <!-- Bouncing arrow -->

<!-- Transform on hover -->
<div class="transform hover:scale-110 hover:rotate-3
  transition-transform duration-300 ease-out
  p-4 bg-purple-500 text-white rounded-lg cursor-pointer">
  Hover to transform!
</div>

<!-- Staggered entrance (with custom animation) -->
<div class="opacity-0 translate-y-4
  animate-[fadeIn_0.5s_ease-out_forwards]">
  Fades in from below
</div>

<!-- Custom in tailwind.config.js:
  animation: {
    'fadeIn': 'fadeIn 0.5s ease-out forwards',
  },
  keyframes: {
    fadeIn: {
      '0%': { opacity: '0', transform: 'translateY(1rem)' },
      '100%': { opacity: '1', transform: 'translateY(0)' },
    },
  },
-->`,
      breakdown: "",
      language: "css",
    },
    quiz: [
      {
        question: "What does 'animate-spin' do?",
        choices: [
          "Spins once",
          "Continuously rotates the element 360 degrees",
          "Adds a spin on hover",
          "Shakes the element",
        ],
        correct: 1,
        explanation: "animate-spin applies an infinite 360-degree rotation — perfect for loading spinners!",
      },
      {
        question: "What does 'transition-transform' do?",
        choices: [
          "Transforms immediately",
          "Only animates transform property changes (not color, opacity, etc.)",
          "Enables all transitions",
          "Disables transitions on transforms",
        ],
        correct: 1,
        explanation: "transition-transform limits the transition to only transform changes — better performance than transition-all!",
      },
      {
        question: "How do you add a custom animation in Tailwind?",
        choices: [
          "Use inline styles",
          "Define keyframes and animation in tailwind.config.js",
          "Import CSS files",
          "Use !important",
        ],
        correct: 1,
        explanation: "Custom animations are defined in tailwind.config.js under theme.extend.keyframes and theme.extend.animation.",
      },
    ],
        subLessons: ["What is Animations & Transitions?","How Animations & Transitions works","Animations & Transitions syntax & usage","Practical examples of Animations & Transitions","Animations & Transitions best practices"],
challenge: {
      title: "Animated Power-Up",
      description:
        "Create a div that bounces (animate-bounce), has a large emoji '⭐' inside with text-4xl, and on hover scales to 125% (hover:scale-125) with a smooth 300ms transition.",
      starterCode: "<!-- Create the animated power-up -->\n<div class=\"\">\n  ⭐\n</div>",
      expectedOutput: "<div class=\"animate-bounce text-4xl hover:scale-125 transition-transform duration-300\">⭐</div>",
      hints: [
        "Use animate-bounce for the continuous bounce",
        "text-4xl makes the emoji large",
        "hover:scale-125 with transition-transform duration-300",
      ],
      solution: `<div class="animate-bounce text-4xl hover:scale-125 transition-transform duration-300">\n  ⭐\n</div>`,
      language: "css",
    },
  },

  {
    id: "tailwind-components",
    title: "Component Patterns",
    tier: "HARD",
    lesson: {
      title: "Component Patterns",
      concept: "Component patterns in Tailwind — assemble reusable UI building blocks like crafting legendary gear.",
      explanation:
        "While Tailwind is utility-first, you'll develop common patterns: buttons, cards, badges, modals, navbars. Use @apply in CSS to extract patterns. In frameworks (React, Vue), create component files. Group related utilities logically. Use consistent spacing and color tokens. Tailwind UI and Headless UI provide pre-built accessible components.",
      codeExample: `<!-- Alert component pattern -->
<div class="flex items-center gap-3 p-4 rounded-lg
  bg-yellow-50 border border-yellow-200">
  <span class="text-yellow-600 text-xl">⚠️</span>
  <div>
    <h4 class="font-semibold text-yellow-800">Warning</h4>
    <p class="text-sm text-yellow-700">Low mana reserves!</p>
  </div>
</div>

<!-- Avatar with status indicator -->
<div class="relative inline-block">
  <img class="w-12 h-12 rounded-full ring-2 ring-green-400"
    src="avatar.png" alt="Player" />
  <span class="absolute bottom-0 right-0 w-3 h-3
    bg-green-500 rounded-full ring-2 ring-white"></span>
</div>

<!-- Stat bar component -->
<div class="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
  <div class="h-full bg-gradient-to-r from-green-400 to-green-600
    rounded-full transition-all duration-500"
    style="width: 75%">
  </div>
</div>

<!-- Using @apply in CSS for reuse -->
<!-- In your CSS file:
.btn-primary {
  @apply px-4 py-2 bg-blue-500 text-white rounded-lg
    hover:bg-blue-600 transition duration-200
    focus:ring-2 focus:ring-blue-300;
}
-->`,
      breakdown: "",
      language: "css",
    },
    quiz: [
      {
        question: "What does @apply do in Tailwind CSS?",
        choices: [
          "Imports a component",
          "Extracts utility classes into a custom CSS class for reuse",
          "Applies styles globally",
          "Creates a variable",
        ],
        correct: 1,
        explanation: "@apply lets you compose utility classes into a reusable CSS class — DRY without losing Tailwind's power.",
      },
      {
        question: "How do you position a badge on top of an avatar?",
        choices: [
          "Use margin hacks",
          "Use relative on parent, absolute on badge with positioning utilities",
          "Use z-index only",
          "Use float",
        ],
        correct: 1,
        explanation: "relative + absolute positioning is the pattern: parent is relative, badge is absolute with top/right positioning.",
      },
      {
        question: "What does 'ring-2 ring-green-400' create?",
        choices: [
          "A green border",
          "A 2px green outline/ring with box-shadow (doesn't affect layout)",
          "Green text decoration",
          "A green gradient",
        ],
        correct: 1,
        explanation: "ring utilities create outline-style rings using box-shadow — they don't affect layout like borders do!",
      },
    ],
        subLessons: ["What is Component Patterns?","How Component Patterns works","Component Patterns syntax & usage","Practical examples of Component Patterns","Component Patterns best practices"],
challenge: {
      title: "Health Bar Component",
      description:
        "Build a health bar: outer div with w-full bg-gray-200 rounded-full h-4. Inner div with h-full bg-green-500 rounded-full and width set to 60% (use style attribute). Add overflow-hidden on the outer div.",
      starterCode: "<!-- Build the health bar -->\n<div class=\"\">\n  <div class=\"\" style=\"width: 60%\"></div>\n</div>",
      expectedOutput: "<div class=\"w-full bg-gray-200 rounded-full h-4 overflow-hidden\"><div class=\"h-full bg-green-500 rounded-full\" style=\"width: 60%\"></div></div>",
      hints: [
        "Outer: w-full bg-gray-200 rounded-full h-4 overflow-hidden",
        "Inner: h-full bg-green-500 rounded-full",
        "Use style=\"width: 60%\" for the fill amount",
      ],
      solution: `<div class="w-full bg-gray-200 rounded-full h-4 overflow-hidden">\n  <div class="h-full bg-green-500 rounded-full" style="width: 60%"></div>\n</div>`,
      language: "css",
    },
  },

  {
    id: "tailwind-custom-config",
    title: "Custom Configuration",
    tier: "EXPERT",
    lesson: {
      title: "Custom Configuration",
      concept: "Tailwind's config is your game engine settings — customize every aspect of the design system.",
      explanation:
        "tailwind.config.js controls your entire design system. Extend or override: colors, spacing, fonts, breakpoints, animations. Use theme.extend to add without replacing defaults. Plugins add new utilities. Content array tells Tailwind where to scan for classes. Arbitrary values with [] brackets for one-off values.",
      codeExample: `// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{html,js,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'game-primary': '#6C5CE7',
        'game-secondary': '#00CEC9',
        'game-accent': '#FD79A8',
        'game-dark': '#2D3436',
        'xp-gold': {
          light: '#FFEAA7',
          DEFAULT: '#FDCB6E',
          dark: '#E17055',
        },
      },
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'monospace'],
        'display': ['Orbitron', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          from: { boxShadow: '0 0 5px #6C5CE7' },
          to: { boxShadow: '0 0 20px #6C5CE7' },
        },
      },
    },
  },
  plugins: [],
};

/* Usage of custom values: */
// <div class="bg-game-primary text-xp-gold font-pixel animate-float">
// <div class="w-[calc(100%-2rem)] h-[300px]">  ← arbitrary values
// <div class="mt-18 w-88">  ← custom spacing`,
      breakdown: "",
      language: "css",
    },
    quiz: [
      {
        question: "What does theme.extend do vs overriding theme directly?",
        choices: [
          "No difference",
          "extend adds to defaults; direct override replaces all defaults",
          "extend is slower",
          "extend is deprecated",
        ],
        correct: 1,
        explanation: "theme.extend ADDS your values alongside defaults. Overriding theme directly REPLACES all default values for that key.",
      },
      {
        question: "What are arbitrary values (e.g., w-[300px])?",
        choices: [
          "Invalid syntax",
          "One-off custom values using brackets, bypassing the config",
          "Variables",
          "Responsive values",
        ],
        correct: 1,
        explanation: "Arbitrary values in [] let you use any CSS value as a one-off without touching the config.",
      },
      {
        question: "What does the 'content' array in config control?",
        choices: [
          "The page content",
          "Which files Tailwind scans to find class names for the final build",
          "CDN content",
          "Database content",
        ],
        correct: 1,
        explanation: "content tells Tailwind's purge engine which files to scan — only used classes end up in the final CSS!",
      },
    ],
        subLessons: ["What is Custom Configuration?","How Custom Configuration works","Custom Configuration syntax & usage","Practical examples of Custom Configuration","Custom Configuration best practices"],
challenge: {
      title: "Custom Theme Setup",
      description:
        "Write a tailwind.config.js snippet that extends colors with 'brand' having shades: light '#A29BFE', DEFAULT '#6C5CE7', dark '#5B4CC4'. Also add a custom font-family 'game' with 'Orbitron' as the font.",
      starterCode: "// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      // Add custom colors and font\n    },\n  },\n};",
      expectedOutput: "colors: { brand: { light: '#A29BFE', DEFAULT: '#6C5CE7', dark: '#5B4CC4' } }, fontFamily: { game: ['Orbitron', 'sans-serif'] }",
      hints: [
        "Use nested object for color shades with light, DEFAULT, dark",
        "DEFAULT (all caps) is the base shade used with just 'brand'",
        "fontFamily takes an array of font names",
      ],
      solution: `module.exports = {\n  theme: {\n    extend: {\n      colors: {\n        brand: {\n          light: '#A29BFE',\n          DEFAULT: '#6C5CE7',\n          dark: '#5B4CC4',\n        },\n      },\n      fontFamily: {\n        game: ['Orbitron', 'sans-serif'],\n      },\n    },\n  },\n};`,
      language: "css",
    },
  },

  {
    id: "tailwind-advanced",
    title: "Advanced Customization",
    tier: "EXPERT",
    lesson: {
      title: "Advanced Customization",
      concept: "Advanced Tailwind mastery — create plugins, leverage JIT features, and push the framework to its limits.",
      explanation:
        "Advanced Tailwind includes: custom plugins (addUtilities, addComponents), the @layer directive for organizing custom styles, peer modifiers (peer-checked, peer-focus), container queries, arbitrary properties, important modifier (!), and performance optimization. Master these to build production-grade design systems.",
      codeExample: `<!-- Peer modifiers (sibling-based styling) -->
<div>
  <input type="checkbox" class="peer sr-only" id="toggle" />
  <label for="toggle" class="cursor-pointer p-2 bg-gray-200 rounded
    peer-checked:bg-green-500 peer-checked:text-white transition">
    Toggle Power
  </label>
  <div class="mt-2 hidden peer-checked:block text-green-600">
    Power activated! ⚡
  </div>
</div>

<!-- Important modifier (!) for overrides -->
<div class="!mt-0">Forces margin-top: 0 regardless of specificity</div>

<!-- @layer for custom utilities -->
<style>
@layer utilities {
  .text-shadow-glow {
    text-shadow: 0 0 10px currentColor, 0 0 20px currentColor;
  }
}
@layer components {
  .game-card {
    @apply p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg
      hover:shadow-2xl transition-shadow duration-300;
  }
}
</style>

<!-- Custom plugin example in config:
const plugin = require('tailwindcss/plugin');
module.exports = {
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        },
      });
    }),
  ],
};
-->

<!-- Container queries (modern) -->
<div class="@container">
  <div class="@sm:flex @lg:grid @lg:grid-cols-2">
    Adapts to container size, not viewport!
  </div>
</div>`,
      breakdown: "",
      language: "css",
    },
    quiz: [
      {
        question: "What does the 'peer' modifier system do?",
        choices: [
          "Connects to a database peer",
          "Styles an element based on a sibling's state (like checked, focused)",
          "Creates peer-to-peer connections",
          "Groups elements together",
        ],
        correct: 1,
        explanation: "peer/peer-{state} lets you style one element based on a sibling's state — powerful for pure-CSS interactivity!",
      },
      {
        question: "What does the ! prefix do (e.g., !mt-0)?",
        choices: [
          "Negates the value",
          "Adds !important to override specificity conflicts",
          "Makes it optional",
          "Removes the class",
        ],
        correct: 1,
        explanation: "! prefix adds !important — use sparingly when you need to override conflicting styles.",
      },
      {
        question: "What's the difference between @layer components and @layer utilities?",
        choices: [
          "No difference",
          "Components are multi-property reusable classes; utilities are single-purpose",
          "Components are for JavaScript",
          "Utilities are deprecated",
        ],
        correct: 1,
        explanation: "Components are higher-level classes like .btn, .card. Utilities are atomic single-purpose classes. The layer determines sort order.",
      },
    ],
        subLessons: ["What is Advanced Customization?","How Advanced Customization works","Advanced Customization syntax & usage","Practical examples of Advanced Customization","Advanced Customization best practices"],
challenge: {
      title: "Peer-Powered Toggle",
      description:
        "Create a checkbox input with class 'peer' and 'sr-only' (screen-reader only). Add a label that changes from gray-200 background to green-500 when checked (peer-checked:bg-green-500). Add a div that's hidden by default and shows when checked (hidden peer-checked:block).",
      starterCode: "<!-- Build peer-based toggle -->\n<div>\n  <input type=\"checkbox\" class=\"\" id=\"power\" />\n  <label for=\"power\" class=\"\">\n    Activate\n  </label>\n  <div class=\"\">\n    Power ON!\n  </div>\n</div>",
      expectedOutput: "<input class=\"peer sr-only\" .../><label class=\"bg-gray-200 peer-checked:bg-green-500 ...\" ...>Activate</label><div class=\"hidden peer-checked:block\">Power ON!</div>",
      hints: [
        "Input needs: peer sr-only",
        "Label needs: bg-gray-200 peer-checked:bg-green-500 with transition",
        "Div needs: hidden peer-checked:block",
      ],
      solution: `<div>\n  <input type="checkbox" class="peer sr-only" id="power" />\n  <label for="power" class="cursor-pointer p-2 bg-gray-200 rounded peer-checked:bg-green-500 peer-checked:text-white transition">\n    Activate\n  </label>\n  <div class="mt-2 hidden peer-checked:block text-green-600">\n    Power ON!\n  </div>\n</div>`,
      language: "css",
    },
  },
];
