import { describe, expect, it } from "vitest";
import { generateHash } from "./hash";

describe("generateHash", () => {
  it("matches the known SHA-256 vector for 'hello'", async () => {
    const hash = await generateHash("hello", "SHA-256");
    expect(hash).toBe(
      "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
    );
  });

  it("matches the known SHA-1 vector for 'hello'", async () => {
    const hash = await generateHash("hello", "SHA-1");
    expect(hash).toBe("aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d");
  });

  it("matches the known SHA-256 vector for an empty string", async () => {
    const hash = await generateHash("", "SHA-256");
    expect(hash).toBe(
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    );
  });

  it("produces a different hash for different input", async () => {
    const a = await generateHash("hello", "SHA-256");
    const b = await generateHash("Hello", "SHA-256");
    expect(a).not.toBe(b);
  });

  it("produces output of the expected hex length per algorithm", async () => {
    expect((await generateHash("x", "SHA-1")).length).toBe(40);
    expect((await generateHash("x", "SHA-256")).length).toBe(64);
    expect((await generateHash("x", "SHA-512")).length).toBe(128);
  });

  it("handles unicode input", async () => {
    const hash = await generateHash("日本語 🚀", "SHA-256");
    expect(hash).toHaveLength(64);
  });
});
