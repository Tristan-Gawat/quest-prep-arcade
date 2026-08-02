// UPHSL BITCF - Game Development Specialization
// Each topic can be learned in any programming language the user picks

import { SpecModule } from "./uphsl-cybersec";

export const gamedevModules: SpecModule[] = [
  // DESIGN
  {
    id: "gd-level-design",
    title: "Level Design Principles",
    category: "design",
    difficulty: "EASY",
    description: "Learn how to craft engaging game levels — flow, pacing, spatial storytelling, and player guidance.",
    concepts: ["level flow and pacing", "environmental storytelling", "player guidance techniques", "difficulty curves", "blockout and iteration"],
  },
  {
    id: "gd-playtesting",
    title: "Playtesting & Iteration",
    category: "design",
    difficulty: "EASY",
    description: "Understand how to gather player feedback, run playtests, and iterate on game design effectively.",
    concepts: ["playtesting methodologies", "feedback collection", "A/B testing in games", "analytics interpretation", "iterative design process"],
  },
  {
    id: "gd-ui-ux",
    title: "UI/UX Design for Games",
    category: "design",
    difficulty: "MEDIUM",
    description: "Design intuitive game interfaces — HUDs, menus, accessibility, and player communication systems.",
    concepts: ["HUD design patterns", "menu flow architecture", "accessibility standards", "visual feedback systems", "responsive game UI"],
  },
  {
    id: "gd-procedural-gen",
    title: "Procedural Generation",
    category: "design",
    difficulty: "HARD",
    description: "Generate infinite content algorithmically — dungeons, terrain, loot tables, and narrative structures.",
    concepts: ["noise functions (Perlin/Simplex)", "wave function collapse", "L-systems", "procedural dungeon generation", "seed-based randomization"],
  },

  // PROGRAMMING
  {
    id: "gd-game-loops",
    title: "Game Loops & Architecture",
    category: "programming",
    difficulty: "EASY",
    description: "Master the core heartbeat of every game — update cycles, fixed timesteps, and game state management.",
    concepts: ["fixed vs variable timestep", "game state machines", "entity-component systems", "update and render separation", "delta time"],
  },
  {
    id: "gd-input-systems",
    title: "Input Systems & Controls",
    category: "programming",
    difficulty: "EASY",
    description: "Handle player input across devices — keyboard, gamepad, touch, and gesture recognition systems.",
    concepts: ["input mapping and rebinding", "controller abstraction layers", "dead zones and sensitivity", "input buffering", "multiplatform input handling"],
  },
  {
    id: "gd-physics-engines",
    title: "Physics Engine Fundamentals",
    category: "programming",
    difficulty: "MEDIUM",
    description: "Build and understand physics simulations — collision detection, rigid bodies, and force-based movement.",
    concepts: ["collision detection (AABB, SAT)", "rigid body dynamics", "raycasting", "physics materials and friction", "spatial partitioning"],
  },
  {
    id: "gd-game-math",
    title: "Game Math: Vectors & Matrices",
    category: "programming",
    difficulty: "MEDIUM",
    description: "Master the math behind games — vectors, matrices, quaternions, and transformations in 2D/3D space.",
    concepts: ["vector operations (dot, cross)", "matrix transformations", "quaternion rotations", "linear interpolation (lerp)", "coordinate spaces"],
  },
  {
    id: "gd-ai-pathfinding",
    title: "AI & Pathfinding Systems",
    category: "programming",
    difficulty: "HARD",
    description: "Implement intelligent game agents — A* pathfinding, behavior trees, finite state machines, and steering behaviors.",
    concepts: ["A* pathfinding algorithm", "navigation meshes", "behavior trees", "finite state machines", "steering behaviors (seek, flee, wander)"],
  },
  {
    id: "gd-multiplayer-networking",
    title: "Multiplayer Networking",
    category: "programming",
    difficulty: "EXPERT",
    description: "Build real-time multiplayer systems — client-server architecture, lag compensation, and state synchronization.",
    concepts: ["client-server architecture", "state synchronization", "lag compensation and prediction", "authoritative server model", "network interpolation"],
  },

  // ART
  {
    id: "gd-shaders",
    title: "Shaders & Graphics Programming",
    category: "art",
    difficulty: "HARD",
    description: "Write GPU shaders to create stunning visuals — lighting, post-processing, and real-time rendering techniques.",
    concepts: ["vertex and fragment shaders", "lighting models (Phong, PBR)", "post-processing effects", "shader math", "render pipeline stages"],
  },
  {
    id: "gd-animation-state",
    title: "Animation State Machines",
    category: "art",
    difficulty: "MEDIUM",
    description: "Control character animations programmatically — blend trees, transitions, and animation controllers.",
    concepts: ["state machine design", "animation blending", "transition conditions", "inverse kinematics basics", "sprite animation systems"],
  },
  {
    id: "gd-audio-systems",
    title: "Audio Systems & Sound Design",
    category: "art",
    difficulty: "MEDIUM",
    description: "Implement dynamic game audio — spatial sound, adaptive music, sound triggers, and audio mixing.",
    concepts: ["spatial/3D audio", "adaptive music systems", "sound event triggers", "audio mixing and buses", "audio pooling and optimization"],
  },

  // PRODUCTION
  {
    id: "gd-version-control",
    title: "Version Control for Game Projects",
    category: "production",
    difficulty: "MEDIUM",
    description: "Manage large game projects with Git and LFS — branching strategies, asset management, and team workflows.",
    concepts: ["Git LFS for large assets", "branching strategies for games", "merge conflict resolution", "asset pipeline versioning", "collaborative workflows"],
  },
  {
    id: "gd-optimization",
    title: "Game Performance Optimization",
    category: "production",
    difficulty: "HARD",
    description: "Squeeze maximum performance from your game — profiling, memory management, and rendering optimization.",
    concepts: ["CPU/GPU profiling", "object pooling", "LOD systems", "draw call batching", "memory management and garbage collection"],
  },
  {
    id: "gd-publishing",
    title: "Publishing & Monetization",
    category: "production",
    difficulty: "EXPERT",
    description: "Launch your game to the world — platform requirements, store listings, monetization models, and live ops.",
    concepts: ["platform certification requirements", "store optimization (ASO)", "monetization models (F2P, premium)", "live operations strategy", "analytics and KPIs"],
  },
];
