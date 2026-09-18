"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/ui/copy-button";
import { Icon } from "@/components/ui/icon";

export function EncodeDecodeTool({
  encode,
  decode,
  inputPlaceholder,
}: {
  encode: (input: string) => string;
  decode: (input: string) => string;
  inputPlaceholder: string;
}) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleEncode() {
    try {
      setOutput(encode(input));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not encode input.");
      setOutput("");
    }
  }

  function handleDecode() {
    try {
      setOutput(decode(input));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not decode input.");
      setOutput("");
    }
  }

  function handleSwap() {
    setInput(output);
    setOutput(input);
    setError(null);
  }

  function handleClear() {
    setInput("");
    setOutput("");
    setError(null);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" onClick={handleEncode}>
          <Icon name="ArrowRight" className="size-3.5" />
          Encode
        </Button>
        <Button type="button" variant="secondary" onClick={handleDecode}>
          <Icon name="ArrowLeftRight" className="size-3.5" />
          Decode
        </Button>
        <Button type="button" variant="outline" onClick={handleSwap} disabled={!output}>
          Swap
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
            rows={12}
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
            placeholder="Result will appear here."
            rows={12}
            spellCheck={false}
            className="bg-background"
          />
        </div>
      </div>
    </div>
  );
}
