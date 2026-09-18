import type { ComponentType } from "react";
import { JsonFormatter } from "@/components/tools/json-formatter/json-formatter";
import { Base64Encoder } from "@/components/tools/base64-encoder/base64-encoder";

export const toolRegistry: Record<string, ComponentType> = {
  "json-formatter": JsonFormatter,
  "base64-encoder": Base64Encoder,
};
