"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { computeLineDiff, type DiffLine } from "@/lib/tools/diff/diff";

export function TextDiff() {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [diff, setDiff] = useState<DiffLine[] | null>(null);

  function handleCompare() {
    setDiff(computeLineDiff(textA, textB));
  }

  function handleClear() {
    setTextA("");
    setTextB("");
    setDiff(null);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Original
          </span>
          <Textarea
            value={textA}
            onChange={(event) => setTextA(event.target.value)}
            rows={10}
            spellCheck={false}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Changed
          </span>
          <Textarea
            value={textB}
            onChange={(event) => setTextB(event.target.value)}
            rows={10}
            spellCheck={false}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button type="button" onClick={handleCompare}>
          Compare
        </Button>
        <Button type="button" variant="ghost" onClick={handleClear}>
          Clear
        </Button>
      </div>

      {diff && (
        <div className="overflow-x-auto rounded-md border border-border bg-surface font-mono text-sm">
          {diff.map((line, index) => (
            <div
              key={index}
              className={cn(
                "whitespace-pre px-3 py-0.5",
                line.type === "added" && "bg-emerald-950/40 text-emerald-300",
                line.type === "removed" && "bg-red-950/40 text-red-300",
                line.type === "unchanged" && "text-muted-foreground"
              )}
            >
              {line.type === "added" ? "+ " : line.type === "removed" ? "- " : "  "}
              {line.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
