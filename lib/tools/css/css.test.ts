import { describe, expect, it } from "vitest";
import { formatCss } from "./css";

describe("formatCss", () => {
  it("rejects empty input", () => {
    expect(() => formatCss("")).toThrow(/empty/i);
  });

  it("formats a simple rule", () => {
    expect(formatCss("body{color:red;background:blue}")).toBe(
      "body {\n  color: red;\n  background: blue;\n}"
    );
  });

  it("indents nested at-rules", () => {
    expect(formatCss("@media (min-width: 600px) { .a { color: red; } }")).toBe(
      "@media (min-width: 600px) {\n  .a {\n    color: red;\n  }\n}"
    );
  });

  it("preserves content inside string literals", () => {
    const output = formatCss('.a { content: "a { b }"; }');
    expect(output).toContain('"a { b }"');
  });

  it("preserves comments", () => {
    const output = formatCss("/* note */ .a { color: red; }");
    expect(output).toContain("/* note */");
  });

  it("collapses messy whitespace in selectors and declarations", () => {
    const output = formatCss("  .a  ,  .b  {\n  color:   red  ;\n}");
    expect(output).toBe(".a , .b {\n  color: red;\n}");
  });
});
