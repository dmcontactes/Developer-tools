"use client";

import { SingleTransformTool } from "@/components/tools/shared/single-transform-tool";
import { minifySql } from "@/lib/tools/sql/sql";

export function SqlMinifier() {
  return (
    <SingleTransformTool
      transform={minifySql}
      actionLabel="Minify"
      inputPlaceholder="SELECT id, name\nFROM users\nWHERE active = true"
      outputPlaceholder="Minified SQL will appear here."
      rows={10}
    />
  );
}
