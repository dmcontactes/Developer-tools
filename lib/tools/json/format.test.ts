import { describe, expect, it } from "vitest";
import { formatJson, minifyJson, validateJson } from "./format";

describe("validateJson", () => {
  it("rejects empty input", () => {
    const result = validateJson("");
    expect(result.valid).toBe(false);
    expect(result.error).toMatch(/empty/i);
  });

  it("rejects whitespace-only input", () => {
    expect(validateJson("   \n  ").valid).toBe(false);
  });

  it("accepts valid JSON", () => {
    expect(validateJson('{"a":1}').valid).toBe(true);
  });

  it("reports a location for invalid JSON", () => {
    const result = validateJson('{"a": 1, }');
    expect(result.valid).toBe(false);
    expect(result.line).toBeDefined();
  });

  it("does not duplicate the location in the error message", () => {
    const result = validateJson('{"a": 1, }');
    const occurrences = (result.error?.match(/line \d+/gi) ?? []).length;
    expect(occurrences).toBe(0);
  });

  it("rejects trailing commas", () => {
    expect(validateJson("[1, 2, 3,]").valid).toBe(false);
  });

  it("rejects single-quoted keys", () => {
    expect(validateJson("{'a': 1}").valid).toBe(false);
  });
});

describe("formatJson", () => {
  it("indents nested objects and arrays", () => {
    const output = formatJson('{"a":[1,2,{"b":true}]}');
    expect(output).toBe(
      JSON.stringify({ a: [1, 2, { b: true }] }, null, 2)
    );
  });

  it("preserves unicode and special characters", () => {
    const input = JSON.stringify({ name: "José 日本語", emoji: "🚀", quote: '"q"' });
    const output = formatJson(input);
    expect(JSON.parse(output)).toEqual(JSON.parse(input));
  });

  it("throws on invalid JSON instead of silently returning input", () => {
    expect(() => formatJson("{not json}")).toThrow();
  });

  it("handles large arrays without truncation", () => {
    const large = JSON.stringify(Array.from({ length: 5000 }, (_, i) => i));
    const output = formatJson(large);
    expect(JSON.parse(output)).toHaveLength(5000);
  });

  it("preserves null and numeric edge values", () => {
    const input = JSON.stringify({ a: null, b: 0, c: -1.5, d: false });
    expect(JSON.parse(formatJson(input))).toEqual(JSON.parse(input));
  });
});

describe("minifyJson", () => {
  it("removes all insignificant whitespace", () => {
    const output = minifyJson('{\n  "a": 1,\n  "b": [1, 2]\n}');
    expect(output).toBe('{"a":1,"b":[1,2]}');
  });

  it("throws on invalid JSON", () => {
    expect(() => minifyJson("not json")).toThrow();
  });
});
