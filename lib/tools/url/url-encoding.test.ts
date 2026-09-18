import { describe, expect, it } from "vitest";
import { decodeUrl, encodeUrl } from "./url-encoding";

describe("encodeUrl", () => {
  it("encodes reserved characters", () => {
    expect(encodeUrl("a b&c=d")).toBe("a%20b%26c%3Dd");
  });

  it("encodes an empty string to an empty string", () => {
    expect(encodeUrl("")).toBe("");
  });

  it("round-trips unicode", () => {
    const input = "José 日本語 🚀";
    expect(decodeUrl(encodeUrl(input))).toBe(input);
  });
});

describe("decodeUrl", () => {
  it("decodes percent-encoded text", () => {
    expect(decodeUrl("a%20b%26c%3Dd")).toBe("a b&c=d");
  });

  it("rejects empty input", () => {
    expect(() => decodeUrl("")).toThrow(/empty/i);
  });

  it("rejects malformed percent-encoding", () => {
    expect(() => decodeUrl("100% done")).toThrow(/invalid/i);
  });

  it("passes through strings with no encoding", () => {
    expect(decodeUrl("hello")).toBe("hello");
  });
});
