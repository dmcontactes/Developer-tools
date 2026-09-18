"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/ui/copy-button";
import { generateUuids } from "@/lib/tools/uuid/uuid";

export function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [output, setOutput] = useState<string[]>(() => generateUuids(5));

  function handleGenerate() {
    setOutput(generateUuids(count));
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <label htmlFor="uuid-count" className="text-sm text-muted-foreground">
          Count
        </label>
        <Input
          id="uuid-count"
          type="number"
          min={1}
          max={100}
          value={count}
          onChange={(event) => setCount(Number(event.target.value))}
          className="w-24"
        />
        <Button type="button" onClick={handleGenerate}>
          Generate
        </Button>
        <CopyButton value={output.join("\n")} label="Copy all" className="ml-auto" />
      </div>

      <Textarea
        value={output.join("\n")}
        readOnly
        rows={12}
        spellCheck={false}
        className="bg-background"
      />
    </div>
  );
}
