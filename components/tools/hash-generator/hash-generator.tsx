"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/ui/copy-button";
import { cn } from "@/lib/utils";
import { generateHash, type HashAlgorithm } from "@/lib/tools/hash/hash";

const ALGORITHMS: HashAlgorithm[] = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];

export function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({});

  async function handleChange(value: string) {
    setInput(value);
    if (!value) {
      setHashes({});
      return;
    }
    const entries = await Promise.all(
      ALGORITHMS.map(async (algorithm) => [algorithm, await generateHash(value, algorithm)] as const)
    );
    setHashes(Object.fromEntries(entries));
  }

  return (
    <div className="flex flex-col gap-4">
      <Textarea
        value={input}
        onChange={(event) => handleChange(event.target.value)}
        placeholder="Type or paste text to hash…"
        rows={6}
        spellCheck={false}
      />

      <div className="flex flex-col gap-2">
        {ALGORITHMS.map((algorithm) => (
          <div
            key={algorithm}
            className={cn(
              "flex items-center justify-between gap-3 rounded-md border border-border bg-surface px-3 py-2.5",
              !hashes[algorithm] && "opacity-50"
            )}
          >
            <div className="flex min-w-0 flex-col">
              <span className="text-xs text-muted-foreground">{algorithm}</span>
              <span className="truncate font-mono text-sm text-foreground">
                {hashes[algorithm] ?? "—"}
              </span>
            </div>
            <CopyButton value={hashes[algorithm] ?? ""} className="shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
