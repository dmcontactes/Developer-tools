import { describe, expect, it } from "vitest";
import { computeLineDiff } from "./diff";

describe("computeLineDiff", () => {
  it("returns unchanged lines for identical input", () => {
    const result = computeLineDiff("a\nb\nc", "a\nb\nc");
    expect(result.every((line) => line.type === "unchanged")).toBe(true);
    expect(result.map((line) => line.value)).toEqual(["a", "b", "c"]);
  });

  it("detects an added line", () => {
    const result = computeLineDiff("a\nb", "a\nb\nc");
    expect(result.filter((line) => line.type === "added")).toEqual([
      { type: "added", value: "c" },
    ]);
  });

  it("detects a removed line", () => {
    const result = computeLineDiff("a\nb\nc", "a\nc");
    expect(result.filter((line) => line.type === "removed")).toEqual([
      { type: "removed", value: "b" },
    ]);
  });

  it("handles both empty inputs", () => {
    const result = computeLineDiff("", "");
    expect(result.every((line) => line.value === "")).toBe(true);
  });

  it("treats every line as added when the original is empty", () => {
    const result = computeLineDiff("", "a\nb");
    expect(result.map((line) => line.type)).toEqual(["added", "added"]);
  });

  it("does not leave a stray empty trailing line for trailing newlines", () => {
    const result = computeLineDiff("a\n", "a\n");
    expect(result).toEqual([{ type: "unchanged", value: "a" }]);
  });
});
