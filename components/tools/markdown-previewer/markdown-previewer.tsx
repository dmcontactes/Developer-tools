"use client";

import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { renderMarkdown } from "@/lib/tools/markdown/markdown";

const SAMPLE = "# Hello\n\nThis is **Markdown**, rendered live.\n\n- one\n- two\n- three\n\n```js\nconsole.log('hi');\n```";

export function MarkdownPreviewer() {
  const [input, setInput] = useState(SAMPLE);
  const [html, setHtml] = useState("");

  // DOMPurify requires a real `window`, so rendering must stay out of the
  // server-rendered pass (this route is statically prerendered) and only
  // run once mounted in the browser.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHtml(renderMarkdown(input));
  }, [input]);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Markdown
        </span>
        <Textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          rows={18}
          spellCheck={false}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Preview
        </span>
        <div
          className="prose prose-invert prose-sm max-w-none rounded-md border border-border bg-surface p-4"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
