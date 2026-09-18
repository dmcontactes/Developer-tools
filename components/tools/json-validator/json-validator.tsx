"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Icon } from "@/components/ui/icon";
import { validateJson } from "@/lib/tools/json/format";

export function JsonValidator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ valid: boolean; message: string } | null>(null);

  function handleValidate() {
    const validation = validateJson(input);
    if (validation.valid) {
      setResult({ valid: true, message: "Valid JSON." });
    } else {
      setResult({
        valid: false,
        message: validation.line
          ? `${validation.error} (line ${validation.line}, column ${validation.column})`
          : validation.error ?? "Invalid JSON.",
      });
    }
  }

  function handleClear() {
    setInput("");
    setResult(null);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" onClick={handleValidate}>
          <Icon name="CheckCircle2" className="size-3.5" />
          Validate
        </Button>
        <Button type="button" variant="ghost" onClick={handleClear}>
          Clear
        </Button>
      </div>

      {result && (
        <p
          className={
            result.valid
              ? "rounded-md border border-emerald-900/50 bg-emerald-950/40 px-3 py-2 text-sm text-emerald-300"
              : "rounded-md border border-red-900/50 bg-red-950/40 px-3 py-2 text-sm text-red-300"
          }
        >
          {result.message}
        </p>
      )}

      <Textarea
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder='{"name": "John", "age": 25}'
        rows={16}
        spellCheck={false}
      />
    </div>
  );
}
