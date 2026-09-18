import { describe, expect, it } from "vitest";
import { decodeBase64, encodeBase64 } from "./base64";

describe("encodeBase64", () => {
  it("encodes plain ASCII text", () => {
    expect(encodeBase64("hello world")).toBe("aGVsbG8gd29ybGQ=");
  });

  it("encodes an empty string to an empty string", () => {
    expect(encodeBase64("")).toBe("");
  });

  it("round-trips unicode and emoji", () => {
    const input = "José 日本語 🚀";
    expect(decodeBase64(encodeBase64(input))).toBe(input);
  });

  it("handles large input", () => {
    const large = "x".repeat(200_000);
    expect(decodeBase64(encodeBase64(large))).toBe(large);
  });
});

describe("decodeBase64", () => {
  it("decodes a known Base64 string", () => {
    expect(decodeBase64("aGVsbG8gd29ybGQ=")).toBe("hello world");
  });

  it("rejects empty input", () => {
    expect(() => decodeBase64("")).toThrow(/empty/i);
  });

  it("rejects whitespace-only input", () => {
    expect(() => decodeBase64("   \n  ")).toThrow(/empty/i);
  });

  it("tolerates internal whitespace/newlines", () => {
    expect(decodeBase64("aGVsbG8g\nd29ybGQ=")).toBe("hello world");
  });

  it("rejects invalid Base64 characters", () => {
    expect(() => decodeBase64("not-valid-base64!!")).toThrow(/valid Base64/i);
  });

  it("rejects a string with incorrect padding length", () => {
    expect(() => decodeBase64("abcde")).toThrow(/valid Base64/i);
  });
});
