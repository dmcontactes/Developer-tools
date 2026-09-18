"use client";

import { SingleTransformTool } from "@/components/tools/shared/single-transform-tool";
import { formatSql } from "@/lib/tools/sql/sql";

export function SqlFormatter() {
  return (
    <SingleTransformTool
      transform={formatSql}
      actionLabel="Format"
      inputPlaceholder="select id, name from users where active = true"
      outputPlaceholder="Formatted SQL will appear here."
    />
  );
}
