"use client";

import { SingleTransformTool } from "@/components/tools/shared/single-transform-tool";
import { minifyJson } from "@/lib/tools/json/format";

export function JsonMinifier() {
  return (
    <SingleTransformTool
      transform={(input) => minifyJson(input)}
      actionLabel="Minify"
      inputPlaceholder='{"name": "John", "age": 25}'
      outputPlaceholder="Minified JSON will appear here."
      rows={10}
    />
  );
}
