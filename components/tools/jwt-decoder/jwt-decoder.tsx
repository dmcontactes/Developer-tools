"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CodeBlock } from "@/components/ui/code-block";
import { CopyButton } from "@/components/ui/copy-button";
import { decodeJwt } from "@/lib/tools/jwt/jwt";

export function JwtDecoder() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ header: string; payload: string; signature: string } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  function handleDecode() {
    try {
      const decoded = decodeJwt(input);
      setResult({
        header: JSON.stringify(decoded.header, null, 2),
        payload: JSON.stringify(decoded.payload, null, 2),
        signature: decoded.signature,
      });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not decode token.");
      setResult(null);
    }
  }

  function handleClear() {
    setInput("");
    setResult(null);
    setError(null);
  }

  return (
    <div className="flex flex-col gap-4">
      <Textarea
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."
        rows={6}
        spellCheck={false}
        className="break-all"
      />

      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" onClick={handleDecode}>
          Decode
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

      {result && (
        <div className="flex flex-col gap-4">
          <p className="text-xs text-muted-foreground">
            This only decodes the token — it does not verify the signature. Never
            paste a production token from a system you don&apos;t trust into a
            third-party site.
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Header
              </span>
              <CopyButton value={result.header} />
            </div>
            <CodeBlock>{result.header}</CodeBlock>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Payload
              </span>
              <CopyButton value={result.payload} />
            </div>
            <CodeBlock>{result.payload}</CodeBlock>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Signature
            </span>
            <CodeBlock className="break-all">{result.signature}</CodeBlock>
          </div>
        </div>
      )}
    </div>
  );
}
