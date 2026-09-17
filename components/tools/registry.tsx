import type { ComponentType } from "react";
import { JsonFormatter } from "@/components/tools/json-formatter/json-formatter";

export const toolRegistry: Record<string, ComponentType> = {
  "json-formatter": JsonFormatter,
};
