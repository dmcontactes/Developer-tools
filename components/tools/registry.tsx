import type { ComponentType } from "react";
import { JsonFormatter } from "@/components/tools/json-formatter/json-formatter";
import { JsonValidator } from "@/components/tools/json-validator/json-validator";
import { JsonMinifier } from "@/components/tools/json-minifier/json-minifier";
import { JsonToCsv } from "@/components/tools/json-to-csv/json-to-csv";
import { Base64Encoder } from "@/components/tools/base64-encoder/base64-encoder";
import { UrlEncoder } from "@/components/tools/url-encoder/url-encoder";
import { UuidGenerator } from "@/components/tools/uuid-generator/uuid-generator";
import { CaseConverter } from "@/components/tools/case-converter/case-converter";
import { SqlFormatter } from "@/components/tools/sql-formatter/sql-formatter";
import { SqlMinifier } from "@/components/tools/sql-minifier/sql-minifier";
import { ColorConverter } from "@/components/tools/color-converter/color-converter";
import { HashGenerator } from "@/components/tools/hash-generator/hash-generator";
import { UnixTimestampConverter } from "@/components/tools/unix-timestamp-converter/unix-timestamp-converter";
import { JwtDecoder } from "@/components/tools/jwt-decoder/jwt-decoder";
import { HtmlFormatter } from "@/components/tools/html-formatter/html-formatter";
import { CssFormatter } from "@/components/tools/css-formatter/css-formatter";
import { RegexTester } from "@/components/tools/regex-tester/regex-tester";
import { GitignoreGenerator } from "@/components/tools/gitignore-generator/gitignore-generator";
import { MarkdownPreviewer } from "@/components/tools/markdown-previewer/markdown-previewer";
import { TextDiff } from "@/components/tools/text-diff/text-diff";

export const toolRegistry: Record<string, ComponentType> = {
  "json-formatter": JsonFormatter,
  "json-validator": JsonValidator,
  "json-minifier": JsonMinifier,
  "json-to-csv": JsonToCsv,
  "base64-encoder": Base64Encoder,
  "url-encoder": UrlEncoder,
  "uuid-generator": UuidGenerator,
  "case-converter": CaseConverter,
  "sql-formatter": SqlFormatter,
  "sql-minifier": SqlMinifier,
  "color-converter": ColorConverter,
  "hash-generator": HashGenerator,
  "unix-timestamp-converter": UnixTimestampConverter,
  "jwt-decoder": JwtDecoder,
  "html-formatter": HtmlFormatter,
  "css-formatter": CssFormatter,
  "regex-tester": RegexTester,
  "gitignore-generator": GitignoreGenerator,
  "markdown-previewer": MarkdownPreviewer,
  "text-diff": TextDiff,
};
