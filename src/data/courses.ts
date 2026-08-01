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
import { cModules } from "./c";
import { phpModules } from "./php";
import { swiftModules } from "./swift";
import { kotlinModules } from "./kotlin";
import { rubyModules } from "./ruby";
import { perlModules } from "./perl";
import { csharpModules } from "./csharp";
import { tailwindModules } from "./tailwind";

export const courses: Course[] = [
  { id: "python", name: "PYTHON", icon: "\u{1F40D}", color: "#FFDE4D", description: "Variables, loops, functions & more", modules: pythonModules },
  { id: "javascript", name: "JAVASCRIPT", icon: "\u26A1", color: "#00E5FF", description: "DOM, async, objects & modern JS", modules: javascriptModules },
  { id: "typescript", name: "TYPESCRIPT", icon: "\u{1F6E1}\uFE0F", color: "#3178C6", description: "Types, generics & advanced patterns", modules: typescriptModules },
  { id: "htmlcss", name: "HTML / CSS", icon: "\u{1F3A8}", color: "#A259FF", description: "Structure, styling & layouts", modules: htmlcssModules },
  { id: "tailwind", name: "TAILWIND CSS", icon: "\u{1F4A8}", color: "#38BDF8", description: "Utility-first CSS framework", modules: tailwindModules },
  { id: "java", name: "JAVA", icon: "\u2615", color: "#F89820", description: "OOP, collections & streams", modules: javaModules },
  { id: "csharp", name: "C#", icon: "\u{1F3AF}", color: "#68217A", description: "LINQ, async & .NET patterns", modules: csharpModules },
  { id: "c", name: "C", icon: "\u{1F527}", color: "#555555", description: "Pointers, memory & low-level control", modules: cModules },
  { id: "cpp", name: "C++", icon: "\u2699\uFE0F", color: "#659BD3", description: "Templates, STL & RAII", modules: cppModules },
  { id: "rust", name: "RUST", icon: "\u{1F980}", color: "#FF4A4A", description: "Ownership, traits & lifetimes", modules: rustModules },
  { id: "go", name: "GO", icon: "\u{1F439}", color: "#00ADD8", description: "Goroutines, channels & interfaces", modules: goModules },
  { id: "kotlin", name: "KOTLIN", icon: "\u{1F4A0}", color: "#7F52FF", description: "Null safety, coroutines & DSLs", modules: kotlinModules },
  { id: "swift", name: "SWIFT", icon: "\u{1F426}", color: "#F05138", description: "Optionals, protocols & generics", modules: swiftModules },
  { id: "php", name: "PHP", icon: "\u{1F418}", color: "#777BB4", description: "Web backend, OOP & databases", modules: phpModules },
  { id: "ruby", name: "RUBY", icon: "\u{1F48E}", color: "#CC342D", description: "Blocks, metaprogramming & gems", modules: rubyModules },
  { id: "perl", name: "PERL", icon: "\u{1F42A}", color: "#39457E", description: "Regex, one-liners & text wizardry", modules: perlModules },
  { id: "sql", name: "SQL", icon: "\u{1F4CA}", color: "#39FF14", description: "Queries, joins & optimization", modules: sqlModules },
];
