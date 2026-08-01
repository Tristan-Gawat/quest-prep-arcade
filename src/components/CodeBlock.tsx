"use client";

import { useMemo } from "react";
import { highlightCode } from "@/lib/highlighter";

interface CodeBlockProps {
  code: string;
  language: string;
  label?: string;
}

export default function CodeBlock({ code, language, label }: CodeBlockProps) {
  const highlighted = useMemo(() => highlightCode(code, language), [code, language]);

  return (
    <div className="rounded-lg overflow-hidden">
      {label && (
        <div className="bg-[#161b22] px-4 py-2 flex items-center justify-between border-b border-[#2d333b]">
          <span className="text-xs text-text-secondary">{label}</span>
          <span className="text-[10px] text-text-muted uppercase">{language}</span>
        </div>
      )}
      <div className="code-block">
        <pre className="m-0">
          <code dangerouslySetInnerHTML={{ __html: highlighted }} />
        </pre>
      </div>
    </div>
  );
}
