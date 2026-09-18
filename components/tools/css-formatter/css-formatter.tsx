"use client";

import { SingleTransformTool } from "@/components/tools/shared/single-transform-tool";
import { formatCss } from "@/lib/tools/css/css";

export function CssFormatter() {
  return (
    <SingleTransformTool
      transform={formatCss}
      actionLabel="Format"
      inputPlaceholder="body{color:red;background:blue}"
      outputPlaceholder="Formatted CSS will appear here."
    />
  );
}
