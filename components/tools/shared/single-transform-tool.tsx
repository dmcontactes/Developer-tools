"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/ui/copy-button";

export function SingleTransformTool({
  transform,
  actionLabel,
  inputPlaceholder,
  outputPlaceholder = "Result will appear here.",
  rows = 14,
}: {
  transform: (input: string) => string;
  actionLabel: string;
  inputPlaceholder: string;
  outputPlaceholder?: string;
  rows?: number;
}) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleRun() {
    try {
      setOutput(transform(input));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not process input.");
      setOutput("");
    }
  }

  function handleClear() {
    setInput("");
    setOutput("");
    setError(null);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" onClick={handleRun}>
          {actionLabel}
        </Button>
        <Button type="button" variant="ghost" onClick={handleClear}>
          Clear
        </Button>
      </div>

      {error && (
        <p className="rounded-md border border-red-900/50 bg-red-950/40 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Input
          </span>
          <Textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={inputPlaceholder}
            rows={rows}
            spellCheck={false}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Output
            </span>
            <CopyButton value={output} />
          </div>
          <Textarea
            value={output}
            readOnly
            placeholder={outputPlaceholder}
            rows={rows}
            spellCheck={false}
            className="bg-background"
          />
        </div>
      </div>
    </div>
  );
}
