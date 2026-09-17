"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/ui/copy-button";
import { Icon } from "@/components/ui/icon";
import { Kbd } from "@/components/ui/kbd";
import { formatJson, minifyJson, validateJson } from "@/lib/tools/json/format";

const SAMPLE = '{"name":"John","age":25,"skills":["json","typescript"]}';

export function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "valid">("idle");

  const runFormat = useCallback(() => {
    try {
      setOutput(formatJson(input, 2));
      setError(null);
      setStatus("idle");
    } catch {
      setError("Invalid JSON — check the syntax and try again.");
      setOutput("");
    }
  }, [input]);

  function handleMinify() {
    try {
      setOutput(minifyJson(input));
      setError(null);
      setStatus("idle");
    } catch {
      setError("Invalid JSON — check the syntax and try again.");
      setOutput("");
    }
  }

  function handleValidate() {
    const result = validateJson(input);
    if (result.valid) {
      setError(null);
      setStatus("valid");
    } else {
      setStatus("idle");
      setError(
        result.line
          ? `${result.error} (line ${result.line}, column ${result.column})`
          : result.error ?? "Invalid JSON."
      );
    }
  }

  function handleClear() {
    setInput("");
    setOutput("");
    setError(null);
    setStatus("idle");
  }

  function handleDownload() {
    if (!output) return;
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "formatted.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      runFormat();
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" onClick={runFormat}>
          <Icon name="Braces" className="size-3.5" />
          Format
        </Button>
        <Button type="button" variant="secondary" onClick={handleMinify}>
          <Icon name="Minimize2" className="size-3.5" />
          Minify
        </Button>
        <Button type="button" variant="secondary" onClick={handleValidate}>
          <Icon name="CheckCircle2" className="size-3.5" />
          Validate
        </Button>
        <Button type="button" variant="outline" onClick={handleDownload} disabled={!output}>
          Download
        </Button>
        <Button type="button" variant="ghost" onClick={handleClear}>
          Clear
        </Button>
        <span className="ml-auto hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
          <Kbd>Ctrl/⌘</Kbd>
          <Kbd>Enter</Kbd>
          to format
        </span>
      </div>

      {error && (
        <p className="rounded-md border border-red-900/50 bg-red-950/40 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      )}
      {status === "valid" && !error && (
        <p className="rounded-md border border-emerald-900/50 bg-emerald-950/40 px-3 py-2 text-sm text-emerald-300">
          Valid JSON.
        </p>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Input
            </span>
            <button
              type="button"
              onClick={() => setInput(SAMPLE)}
              className="text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
            >
              Load sample
            </button>
          </div>
          <Textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='{"name": "John", "age": 25}'
            rows={16}
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
            placeholder="Formatted JSON will appear here."
            rows={16}
            spellCheck={false}
            className="bg-background"
          />
        </div>
      </div>
    </div>
  );
}
