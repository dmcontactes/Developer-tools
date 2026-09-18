import { describe, expect, it } from "vitest";
import { jsonToCsv } from "./json-to-csv";

describe("jsonToCsv", () => {
  it("rejects empty input", () => {
    expect(() => jsonToCsv("")).toThrow(/empty/i);
  });

  it("rejects invalid JSON", () => {
    expect(() => jsonToCsv("{not json}")).toThrow(/invalid json/i);
  });

  it("rejects a JSON object that isn't an array", () => {
    expect(() => jsonToCsv('{"a":1}')).toThrow(/must be a JSON array/i);
  });

  it("rejects an array of non-objects", () => {
    expect(() => jsonToCsv("[1, 2, 3]")).toThrow(/must be an object/i);
  });

  it("returns an empty string for an empty array", () => {
    expect(jsonToCsv("[]")).toBe("");
  });

  it("converts a flat array of objects", () => {
    const output = jsonToCsv('[{"name":"John","age":25},{"name":"Jane","age":30}]');
    expect(output).toBe("name,age\nJohn,25\nJane,30");
  });

  it("flattens nested objects with dot notation", () => {
    const output = jsonToCsv('[{"user":{"name":"John","address":{"city":"NYC"}}}]');
    expect(output).toBe("user.name,user.address.city\nJohn,NYC");
  });

  it("joins primitive arrays with a semicolon", () => {
    const output = jsonToCsv('[{"tags":["a","b","c"]}]');
    expect(output).toBe("tags\na; b; c");
  });

  it("falls back to raw JSON for arrays of objects", () => {
    const output = jsonToCsv('[{"items":[{"id":1}]}]');
    expect(output).toContain('"[{""id"":1}]"');
  });

  it("unions columns across rows with missing keys left blank", () => {
    const output = jsonToCsv('[{"a":1},{"b":2}]');
    expect(output).toBe("a,b\n1,\n,2");
  });

  it("escapes commas and quotes", () => {
    const output = jsonToCsv('[{"note":"has, comma"},{"note":"has \\"quote\\""}]');
    expect(output).toBe('note\n"has, comma"\n"has ""quote"""');
  });

  it("wraps values containing newlines in quotes", () => {
    const output = jsonToCsv('[{"note":"line\\nbreak"}]');
    expect(output).toBe('note\n"line\nbreak"');
  });
});
