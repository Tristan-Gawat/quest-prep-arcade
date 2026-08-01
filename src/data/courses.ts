import { Course } from "./curriculum";
import { pythonModules } from "./python";
import { javascriptModules } from "./javascript";
import { htmlcssModules } from "./htmlcss";
import { typescriptModules } from "./typescript";
import { javaModules } from "./java";
import { cppModules } from "./cpp";
import { rustModules } from "./rust";
import { goModules } from "./go";
import { sqlModules } from "./sql";

export const courses: Course[] = [
  {
    id: "python",
    name: "PYTHON",
    icon: "\u{1F40D}",
    color: "#FFDE4D",
    description: "Variables, loops, functions & more",
    modules: pythonModules,
  },
  {
    id: "javascript",
    name: "JAVASCRIPT",
    icon: "\u26A1",
    color: "#00E5FF",
    description: "DOM, async, objects & modern JS",
    modules: javascriptModules,
  },
  {
    id: "typescript",
    name: "TYPESCRIPT",
    icon: "\u{1F6E1}\uFE0F",
    color: "#3178C6",
    description: "Types, generics & advanced patterns",
    modules: typescriptModules,
  },
  {
    id: "htmlcss",
    name: "HTML / CSS",
    icon: "\u{1F3A8}",
    color: "#A259FF",
    description: "Structure, styling & layouts",
    modules: htmlcssModules,
  },
  {
    id: "java",
    name: "JAVA",
    icon: "\u2615",
    color: "#F89820",
    description: "OOP, collections & streams",
    modules: javaModules,
  },
  {
    id: "cpp",
    name: "C++",
    icon: "\u2699\uFE0F",
    color: "#659BD3",
    description: "Memory, templates & STL",
    modules: cppModules,
  },
  {
    id: "rust",
    name: "RUST",
    icon: "\u{1F980}",
    color: "#FF4A4A",
    description: "Ownership, traits & lifetimes",
    modules: rustModules,
  },
  {
    id: "go",
    name: "GO",
    icon: "\u{1F439}",
    color: "#00ADD8",
    description: "Goroutines, channels & interfaces",
    modules: goModules,
  },
  {
    id: "sql",
    name: "SQL",
    icon: "\u{1F4CA}",
    color: "#39FF14",
    description: "Queries, joins & optimization",
    modules: sqlModules,
  },
];
