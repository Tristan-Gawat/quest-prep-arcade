import { Course } from "./curriculum";
import { pythonModules } from "./python";
import { javascriptModules } from "./javascript";
import { htmlcssModules } from "./htmlcss";

export const courses: Course[] = [
  {
    id: "python",
    name: "PYTHON",
    icon: "🐍",
    color: "#FFDE4D",
    description: "Variables, loops, functions & more",
    modules: pythonModules,
  },
  {
    id: "javascript",
    name: "JAVASCRIPT",
    icon: "⚡",
    color: "#00E5FF",
    description: "DOM, async, objects & modern JS",
    modules: javascriptModules,
  },
  {
    id: "htmlcss",
    name: "HTML / CSS",
    icon: "🎨",
    color: "#A259FF",
    description: "Structure, styling & layouts",
    modules: htmlcssModules,
  },
];
