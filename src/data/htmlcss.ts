import { Module } from "./curriculum";

export const htmlcssModules: Module[] = [
  // === ROOKIE TIER ===
  {
    id: "html-structure",
    title: "HTML Structure & Tags",
    tier: "EASY",
    lesson: {
      title: "HTML Structure",
      concept: "HTML uses tags to structure content on web pages.",
      explanation:
        "HTML (HyperText Markup Language) uses opening and closing tags to wrap content. Every page has <!DOCTYPE html>, <html>, <head> (metadata), and <body> (visible content). Tags nest inside each other like boxes.",
      codeExample: `<!DOCTYPE html>
<html>
  <head>
    <title>My Game</title>
  </head>
  <body>
    <h1>Quest Prep Arcade</h1>
    <p>Learn to code!</p>
    <button>Start Game</button>
  </body>
</html>`,
      language: "html",
    },
    quiz: [
      {
        question: "What goes inside the <head> tag?",
        choices: ["Visible content", "Metadata and title", "Images", "Buttons"],
        correct: 1,
        explanation: "The <head> contains metadata, title, links to CSS, and other non-visible info.",
      },
      {
        question: "Which tag creates a paragraph?",
        choices: ["<text>", "<paragraph>", "<p>", "<para>"],
        correct: 2,
        explanation: "The <p> tag creates a paragraph element.",
      },
      {
        question: "What does <!DOCTYPE html> do?",
        choices: ["Creates a div", "Tells browser it's HTML5", "Adds styling", "Links JavaScript"],
        correct: 1,
        explanation: "<!DOCTYPE html> declares the document type as HTML5.",
      },
    ],
    challenge: {
      title: "Build a Game Card",
      description:
        'Write HTML with an <h2> containing "QUEST PREP", a <p> with "Level 1 - Variables", and a <button> saying "START". Just the body content, no full document needed.',
      starterCode: `<!-- Write your HTML here -->\n`,
      expectedOutput: '<h2>QUEST PREP</h2><p>Level 1 - Variables</p><button>START</button>',
      hints: [
        "h2 is a heading tag",
        "p is for paragraph text",
        "button creates a clickable button",
      ],
      solution: `<h2>QUEST PREP</h2>\n<p>Level 1 - Variables</p>\n<button>START</button>`,
      language: "html",
    },
  },
  {
    id: "css-basics",
    title: "CSS Selectors & Properties",
    tier: "EASY",
    lesson: {
      title: "CSS Basics",
      concept: "CSS styles HTML elements using selectors and property-value pairs.",
      explanation:
        "CSS (Cascading Style Sheets) controls how elements look. Select elements by tag name, .class, or #id. Properties like color, background, font-size, padding, and margin control appearance and spacing.",
      codeExample: `/* Tag selector */
h1 {
  color: #FFDE4D;
  font-size: 24px;
}

/* Class selector */
.arcade-card {
  background: #2A2A2A;
  border: 4px solid black;
  padding: 20px;
  margin: 10px;
}

/* ID selector */
#score {
  color: #39FF14;
  font-weight: bold;
}`,
      language: "css",
    },
    quiz: [
      {
        question: "How do you select an element with class 'card'?",
        choices: ["card", "#card", ".card", "*card"],
        correct: 2,
        explanation: "Classes are selected with a dot (.) prefix: .card",
      },
      {
        question: "What property changes text color?",
        choices: ["text-color", "font-color", "color", "foreground"],
        correct: 2,
        explanation: "The 'color' property sets the text/foreground color.",
      },
      {
        question: "What's the difference between padding and margin?",
        choices: ["No difference", "Padding is inside, margin is outside the border", "Margin is inside", "Padding moves elements"],
        correct: 1,
        explanation: "Padding is space inside the border, margin is space outside.",
      },
    ],
    challenge: {
      title: "Style an Arcade Button",
      description:
        'Write CSS for a .retro-btn class: background #FFDE4D, color black, border 4px solid black, padding 16px, and font-size 14px.',
      starterCode: `/* Style the retro button */\n.retro-btn {\n\n}`,
      expectedOutput: ".retro-btn{background:#FFDE4D;color:black;border:4px solid black;padding:16px;font-size:14px}",
      hints: [
        "Each property goes on its own line with a semicolon",
        "background: #FFDE4D;",
        "Don't forget the semicolons!",
      ],
      solution: `.retro-btn {\n  background: #FFDE4D;\n  color: black;\n  border: 4px solid black;\n  padding: 16px;\n  font-size: 14px;\n}`,
      language: "css",
    },
  },

  // === CHAMPI0N TIER ===
  {
    id: "css-flexbox",
    title: "Flexbox Layout",
    tier: "MEDIUM",
    lesson: {
      title: "Flexbox",
      concept: "Flexbox is a 1D layout system for arranging items in rows or columns.",
      explanation:
        "Set display: flex on a container to enable Flexbox. Control direction (row/column), alignment (align-items, justify-content), and spacing (gap). Items can grow, shrink, and wrap. This is how modern layouts are built!",
      codeExample: `/* Flex container */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 12px;
}

/* Flex items */
.nav-item {
  flex: 1; /* grow equally */
}

/* Centering trick */
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}`,
      language: "css",
    },
    quiz: [
      {
        question: "What does justify-content control?",
        choices: ["Vertical alignment", "Horizontal alignment (main axis)", "Font size", "Border width"],
        correct: 1,
        explanation: "justify-content aligns items along the main axis (horizontal in row direction).",
      },
      {
        question: "How do you center something vertically AND horizontally with flex?",
        choices: ["text-align: center", "margin: auto", "justify-content + align-items: center", "float: center"],
        correct: 2,
        explanation: "Combine justify-content: center (horizontal) and align-items: center (vertical).",
      },
      {
        question: "What does gap: 16px do in a flex container?",
        choices: ["Adds margin to container", "Adds space between flex items", "Sets font size", "Adds padding"],
        correct: 1,
        explanation: "gap adds consistent spacing between flex items without using margins.",
      },
    ],
    challenge: {
      title: "Stats Bar Layout",
      description:
        "Write CSS for a .stats-bar container: display flex, justify-content space-between, align-items center, gap 12px, and padding 16px.",
      starterCode: `/* Create the stats bar layout */\n.stats-bar {\n\n}`,
      expectedOutput: ".stats-bar{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:16px}",
      hints: [
        "display: flex enables flexbox",
        "justify-content: space-between pushes items apart",
        "align-items: center vertically centers items",
      ],
      solution: `.stats-bar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  padding: 16px;\n}`,
      language: "css",
    },
  },
  {
    id: "html-forms",
    title: "Forms & Inputs",
    tier: "MEDIUM",
    lesson: {
      title: "HTML Forms",
      concept: "Forms collect user input through various input types.",
      explanation:
        "The <form> element wraps input fields. Key input types: text, email, password, number, checkbox, radio, submit. Labels improve accessibility. The name attribute identifies data when submitted. Use placeholder for hint text.",
      codeExample: `<form action="/submit" method="POST">
  <label for="username">Username:</label>
  <input type="text" id="username" 
         name="username" 
         placeholder="Enter name"
         required>

  <label for="level">Level:</label>
  <input type="number" id="level" 
         name="level" min="1" max="100">

  <button type="submit">Save</button>
</form>`,
      language: "html",
    },
    quiz: [
      {
        question: "What attribute makes an input field mandatory?",
        choices: ["mandatory", "needed", "required", "must"],
        correct: 2,
        explanation: "The 'required' attribute prevents form submission if the field is empty.",
      },
      {
        question: "What does the 'for' attribute in <label> do?",
        choices: ["Loops the label", "Links label to input by matching id", "Sets font", "Creates a variable"],
        correct: 1,
        explanation: "The 'for' attribute connects a label to an input element by its id.",
      },
      {
        question: "What input type hides the characters typed?",
        choices: ["hidden", "secret", "password", "encrypted"],
        correct: 2,
        explanation: "type='password' masks the input with dots/asterisks.",
      },
    ],
    challenge: {
      title: "Player Registration Form",
      description:
        'Create a form with: a text input (id="player-name", placeholder="Your Name"), a number input (id="age", min=13), and a submit button saying "JOIN ARCADE". Include labels.',
      starterCode: `<!-- Build your form -->\n<form>\n\n</form>`,
      expectedOutput: 'form>label+input[text]+label+input[number]+button',
      hints: [
        "Use <label for='id'> to link labels",
        "type='text' and type='number'",
        "min attribute sets minimum value",
      ],
      solution: `<form>\n  <label for="player-name">Name:</label>\n  <input type="text" id="player-name" placeholder="Your Name">\n  <label for="age">Age:</label>\n  <input type="number" id="age" min="13">\n  <button type="submit">JOIN ARCADE</button>\n</form>`,
      language: "html",
    },
  },

  // === ELITE TIER ===
  {
    id: "css-grid",
    title: "CSS Grid Layout",
    tier: "HARD",
    lesson: {
      title: "CSS Grid",
      concept: "Grid is a 2D layout system for creating complex page layouts.",
      explanation:
        "CSS Grid works in two dimensions (rows AND columns). Define columns with grid-template-columns, rows with grid-template-rows. Items can span multiple cells. Use fr units for fractional space, auto-fit/auto-fill for responsive grids.",
      codeExample: `/* 3-column responsive grid */
.dashboard {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

/* Item spanning 2 columns */
.feature-card {
  grid-column: span 2;
}

/* Responsive: auto-fit */
.auto-grid {
  display: grid;
  grid-template-columns: 
    repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}`,
      language: "css",
    },
    quiz: [
      {
        question: "What does 'fr' stand for in Grid?",
        choices: ["Frame", "Fraction", "Frequency", "Free"],
        correct: 1,
        explanation: "fr means fraction — it divides available space proportionally.",
      },
      {
        question: "What does grid-column: span 2 do?",
        choices: ["Creates 2 grids", "Makes item take up 2 columns", "Adds 2px gap", "Sets 2 rows"],
        correct: 1,
        explanation: "span 2 makes a grid item stretch across 2 column tracks.",
      },
      {
        question: "What does auto-fit do in repeat()?",
        choices: ["Fixes column count", "Automatically creates columns to fill space", "Sets auto height", "Disables wrapping"],
        correct: 1,
        explanation: "auto-fit creates as many columns as will fit in the container width.",
      },
    ],
    challenge: {
      title: "Arcade Dashboard Grid",
      description:
        "Write CSS for a .game-grid: display grid, 3 equal columns using fr, gap of 16px, and padding 20px.",
      starterCode: `/* Create the game grid layout */\n.game-grid {\n\n}`,
      expectedOutput: ".game-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:20px}",
      hints: [
        "display: grid enables grid layout",
        "Use repeat(3, 1fr) for 3 equal columns",
        "gap works the same as in flexbox",
      ],
      solution: `.game-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n  padding: 20px;\n}`,
      language: "css",
    },
  },
  {
    id: "css-animations",
    title: "CSS Animations & Transitions",
    tier: "HARD",
    lesson: {
      title: "CSS Animations",
      concept: "Animations bring pages to life with smooth transitions and keyframe sequences.",
      explanation:
        "Transitions animate property changes (hover, focus, etc). @keyframes define multi-step animations. Control timing with duration, easing, delay. Use transform for performant animations (translate, scale, rotate).",
      codeExample: `/* Simple transition */
.btn {
  transition: all 0.3s ease;
}
.btn:hover {
  transform: scale(1.05);
  background: #39FF14;
}

/* Keyframe animation */
@keyframes glow {
  0%, 100% { box-shadow: 0 0 5px #A259FF; }
  50% { box-shadow: 0 0 20px #A259FF; }
}

.glowing {
  animation: glow 2s ease infinite;
}`,
      language: "css",
    },
    quiz: [
      {
        question: "What CSS property enables smooth state changes?",
        choices: ["animation", "transform", "transition", "keyframes"],
        correct: 2,
        explanation: "transition creates smooth changes when CSS properties change value.",
      },
      {
        question: "What does 'infinite' do in an animation?",
        choices: ["Speeds it up", "Makes it loop forever", "Adds delay", "Reverses it"],
        correct: 1,
        explanation: "The 'infinite' keyword makes the animation repeat indefinitely.",
      },
      {
        question: "Why use transform instead of changing top/left?",
        choices: ["It's newer", "Better performance (GPU-accelerated)", "Simpler syntax", "Works on all browsers"],
        correct: 1,
        explanation: "transform is GPU-accelerated and doesn't trigger layout recalculations.",
      },
    ],
    challenge: {
      title: "Pulse Animation",
      description:
        "Write a @keyframes rule called 'pulse' that scales from 1 to 1.1 and back. Then apply it to .pulse-btn with 1s duration, ease timing, and infinite repeat.",
      starterCode: `/* Define keyframes */\n\n\n/* Apply to .pulse-btn */\n.pulse-btn {\n\n}`,
      expectedOutput: "@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}.pulse-btn{animation:pulse 1s ease infinite}",
      hints: [
        "Use @keyframes pulse { ... }",
        "0% and 100% should be scale(1)",
        "50% should be scale(1.1)",
      ],
      solution: `@keyframes pulse {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.1); }\n}\n\n.pulse-btn {\n  animation: pulse 1s ease infinite;\n}`,
      language: "css",
    },
  },
];
