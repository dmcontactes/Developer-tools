import { describe, expect, it } from "vitest";
import { testRegex } from "./regex";

describe("testRegex", () => {
  it("returns no matches and no error for an empty pattern", () => {
    const result = testRegex("", "", "hello");
    expect(result.matches).toEqual([]);
    expect(result.error).toBeUndefined();
  });

  it("finds all matches even without an explicit global flag", () => {
    const result = testRegex("\\d+", "", "a1b22c333");
    expect(result.matches.map((m) => m.match)).toEqual(["1", "22", "333"]);
  });

  it("reports match indices", () => {
    const result = testRegex("b", "", "abc");
    expect(result.matches[0].index).toBe(1);
  });

  it("captures numbered groups", () => {
    const result = testRegex("(\\w+)@(\\w+)", "", "user@example");
    expect(result.matches[0].groups).toEqual(["user", "example"]);
  });

  it("captures named groups", () => {
    const result = testRegex("(?<year>\\d{4})-(?<month>\\d{2})", "", "2026-09");
    expect(result.matches[0].namedGroups).toEqual({ year: "2026", month: "09" });
  });

  it("returns an error for invalid syntax instead of throwing", () => {
    const result = testRegex("(", "", "hello");
    expect(result.error).toBeDefined();
    expect(result.matches).toEqual([]);
  });

  it("does not hang on zero-length matches", () => {
    const result = testRegex("a*", "", "bbb");
    expect(result.matches.length).toBeGreaterThan(0);
    expect(result.matches.every((m) => m.match === "")).toBe(true);
  });

  it("respects the case-insensitive flag", () => {
    const result = testRegex("HELLO", "i", "say hello there");
    expect(result.matches).toHaveLength(1);
  });

  it("caps the number of matches on pathological input", () => {
    const result = testRegex("a", "", "a".repeat(5000));
    expect(result.matches.length).toBeLessThanOrEqual(1000);
  });
});
