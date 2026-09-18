"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/ui/copy-button";
import {
  toCamelCase,
  toConstantCase,
  toKebabCase,
  toPascalCase,
  toSnakeCase,
  toTitleCase,
} from "@/lib/tools/text/case-converter";

const CASES: { label: string; convert: (input: string) => string }[] = [
  { label: "camelCase", convert: toCamelCase },
  { label: "PascalCase", convert: toPascalCase },
  { label: "snake_case", convert: toSnakeCase },
  { label: "kebab-case", convert: toKebabCase },
  { label: "CONSTANT_CASE", convert: toConstantCase },
  { label: "Title Case", convert: toTitleCase },
];

export function CaseConverter() {
  const [input, setInput] = useState("hello world");

  const results = useMemo(
    () => CASES.map(({ label, convert }) => ({ label, value: convert(input) })),
    [input]
  );

  return (
    <div className="flex flex-col gap-4">
      <Input
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Enter text, camelCase, snake_case or kebab-case…"
      />

      <div className="flex flex-col gap-2">
        {results.map((result) => (
          <div
            key={result.label}
            className="flex items-center justify-between gap-3 rounded-md border border-border bg-surface px-3 py-2.5"
          >
            <div className="flex min-w-0 flex-col">
              <span className="text-xs text-muted-foreground">{result.label}</span>
              <span className="truncate font-mono text-sm text-foreground">
                {result.value || "—"}
              </span>
            </div>
            <CopyButton value={result.value} className="shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
