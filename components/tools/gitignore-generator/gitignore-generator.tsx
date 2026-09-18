"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/ui/copy-button";
import { cn } from "@/lib/utils";
import { generateGitignore, GITIGNORE_TEMPLATES } from "@/lib/tools/gitignore/gitignore";

export function GitignoreGenerator() {
  const [selected, setSelected] = useState<string[]>(["node"]);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  function toggle(id: string) {
    setSelected((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id]
    );
  }

  function handleGenerate() {
    try {
      setOutput(generateGitignore(selected));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not generate .gitignore.");
      setOutput("");
    }
  }

  function handleDownload() {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = ".gitignore";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {GITIGNORE_TEMPLATES.map((template) => (
          <button
            key={template.id}
            type="button"
            onClick={() => toggle(template.id)}
            className={cn(
              "rounded-md border px-3 py-1.5 text-sm transition-colors",
              selected.includes(template.id)
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-surface text-muted-foreground hover:text-foreground"
            )}
          >
            {template.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" onClick={handleGenerate}>
          Generate
        </Button>
        <Button type="button" variant="outline" onClick={handleDownload} disabled={!output}>
          Download
        </Button>
        <CopyButton value={output} className="ml-auto" />
      </div>

      {error && (
        <p className="rounded-md border border-red-900/50 bg-red-950/40 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      )}

      <Textarea
        value={output}
        readOnly
        placeholder="Select at least one stack above, then Generate."
        rows={14}
        spellCheck={false}
        className="bg-background"
      />
    </div>
  );
}
