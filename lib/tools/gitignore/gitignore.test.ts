import { describe, expect, it } from "vitest";
import { generateGitignore } from "./gitignore";

describe("generateGitignore", () => {
  it("rejects an empty selection", () => {
    expect(() => generateGitignore([])).toThrow(/select at least one/i);
  });

  it("rejects a selection of only unknown ids", () => {
    expect(() => generateGitignore(["not-a-real-template"])).toThrow(/select at least one/i);
  });

  it("includes a labeled section for a known template", () => {
    const output = generateGitignore(["node"]);
    expect(output).toContain("# Node");
    expect(output).toContain("node_modules/");
  });

  it("combines multiple templates", () => {
    const output = generateGitignore(["node", "macos"]);
    expect(output).toContain("# Node");
    expect(output).toContain("# macOS");
    expect(output).toContain(".DS_Store");
  });

  it("deduplicates lines shared across templates", () => {
    const output = generateGitignore(["node", "python"]);
    const occurrences = output.split("\n").filter((line) => line === "build/").length;
    expect(occurrences).toBe(1);
  });

  it("ignores unknown ids mixed with known ones", () => {
    const output = generateGitignore(["node", "not-real"]);
    expect(output).toContain("node_modules/");
  });
});
