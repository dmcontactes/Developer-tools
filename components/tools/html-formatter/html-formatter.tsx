"use client";

import { SingleTransformTool } from "@/components/tools/shared/single-transform-tool";
import { formatHtml } from "@/lib/tools/html/html";

export function HtmlFormatter() {
  return (
    <SingleTransformTool
      transform={formatHtml}
      actionLabel="Format"
      inputPlaceholder="<div><p>Hello</p></div>"
      outputPlaceholder="Formatted HTML will appear here."
    />
  );
}
