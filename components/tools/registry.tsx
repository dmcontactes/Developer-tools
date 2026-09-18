import type { ComponentType } from "react";
import { JsonFormatter } from "@/components/tools/json-formatter/json-formatter";
import { JsonMinifier } from "@/components/tools/json-minifier/json-minifier";
import { Base64Encoder } from "@/components/tools/base64-encoder/base64-encoder";
import { UrlEncoder } from "@/components/tools/url-encoder/url-encoder";
import { UuidGenerator } from "@/components/tools/uuid-generator/uuid-generator";
import { CaseConverter } from "@/components/tools/case-converter/case-converter";
import { SqlFormatter } from "@/components/tools/sql-formatter/sql-formatter";
import { SqlMinifier } from "@/components/tools/sql-minifier/sql-minifier";
import { ColorConverter } from "@/components/tools/color-converter/color-converter";
import { HashGenerator } from "@/components/tools/hash-generator/hash-generator";
import { UnixTimestampConverter } from "@/components/tools/unix-timestamp-converter/unix-timestamp-converter";

export const toolRegistry: Record<string, ComponentType> = {
  "json-formatter": JsonFormatter,
  "json-minifier": JsonMinifier,
  "base64-encoder": Base64Encoder,
  "url-encoder": UrlEncoder,
  "uuid-generator": UuidGenerator,
  "case-converter": CaseConverter,
  "sql-formatter": SqlFormatter,
  "sql-minifier": SqlMinifier,
  "color-converter": ColorConverter,
  "hash-generator": HashGenerator,
  "unix-timestamp-converter": UnixTimestampConverter,
};
