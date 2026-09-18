"use client";

import { SingleTransformTool } from "@/components/tools/shared/single-transform-tool";
import { jsonToCsv } from "@/lib/tools/json/json-to-csv";

export function JsonToCsv() {
  return (
    <SingleTransformTool
      transform={jsonToCsv}
      actionLabel="Convert"
      inputPlaceholder='[{"name": "John", "age": 25}, {"name": "Jane", "age": 30}]'
      outputPlaceholder="CSV output will appear here."
    />
  );
}
