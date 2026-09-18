import { describe, expect, it } from "vitest";
import { generateUuids, isValidUuidV4 } from "./uuid";

describe("generateUuids", () => {
  it("generates the requested count", () => {
    expect(generateUuids(5)).toHaveLength(5);
  });

  it("generates valid v4 UUIDs", () => {
    for (const id of generateUuids(20)) {
      expect(isValidUuidV4(id)).toBe(true);
    }
  });

  it("generates unique values", () => {
    const ids = generateUuids(50);
    expect(new Set(ids).size).toBe(50);
  });

  it("clamps counts below 1 up to 1", () => {
    expect(generateUuids(0)).toHaveLength(1);
    expect(generateUuids(-5)).toHaveLength(1);
  });

  it("clamps very large counts to a sane maximum", () => {
    expect(generateUuids(100_000)).toHaveLength(100);
  });
});

describe("isValidUuidV4", () => {
  it("rejects a non-UUID string", () => {
    expect(isValidUuidV4("not-a-uuid")).toBe(false);
  });
});
