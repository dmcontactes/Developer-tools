"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { testRegex } from "@/lib/tools/regex/regex";

function HighlightedText({ text, matches }: { text: string; matches: { index: number; match: string }[] }) {
  if (matches.length === 0) {
    return <span className="whitespace-pre-wrap">{text}</span>;
  }

  const segments: { text: string; highlighted: boolean }[] = [];
  let cursor = 0;
  for (const match of matches) {
    if (match.index > cursor) {
      segments.push({ text: text.slice(cursor, match.index), highlighted: false });
    }
    segments.push({ text: match.match, highlighted: true });
    cursor = match.index + match.match.length;
  }
  if (cursor < text.length) {
    segments.push({ text: text.slice(cursor), highlighted: false });
  }

  return (
    <span className="whitespace-pre-wrap">
      {segments.map((segment, index) =>
        segment.highlighted ? (
          <mark key={index} className="rounded bg-accent/30 text-foreground">
            {segment.text}
          </mark>
        ) : (
          <span key={index}>{segment.text}</span>
        )
      )}
    </span>
  );
}

export function RegexTester() {
  const [pattern, setPattern] = useState("\\d+");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("Order #1234 shipped on 2026-01-15.");

  const result = useMemo(() => testRegex(pattern, flags, testString), [pattern, flags, testString]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-sm text-muted-foreground">/</span>
        <Input
          value={pattern}
          onChange={(event) => setPattern(event.target.value)}
          placeholder="pattern"
          className="max-w-md font-mono"
        />
        <span className="font-mono text-sm text-muted-foreground">/</span>
        <Input
          value={flags}
          onChange={(event) => setFlags(event.target.value.replace(/[^dgimsuy]/g, ""))}
          placeholder="flags"
          className="w-20 font-mono"
        />
      </div>

      {result.error && (
        <p className="rounded-md border border-red-900/50 bg-red-950/40 px-3 py-2 text-sm text-red-300">
          {result.error}
        </p>
      )}

      <Textarea
        value={testString}
        onChange={(event) => setTestString(event.target.value)}
        placeholder="Text to test the pattern against…"
        rows={6}
        spellCheck={false}
      />

      <div className="rounded-md border border-border bg-surface p-3 font-mono text-sm text-foreground">
        <HighlightedText text={testString} matches={result.matches} />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {result.matches.length} match{result.matches.length === 1 ? "" : "es"}
        </span>
        {result.matches.slice(0, 50).map((match, index) => (
          <div
            key={index}
            className="rounded-md border border-border bg-surface px-3 py-2 font-mono text-sm"
          >
            <span className="text-muted-foreground">[{match.index}]</span>{" "}
            <span className="text-foreground">
              {match.match || <em className="text-muted-foreground">(empty match)</em>}
            </span>
            {match.groups.length > 0 && (
              <span className="text-muted-foreground">
                {" "}
                — groups: {match.groups.map((g) => g ?? "∅").join(", ")}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
