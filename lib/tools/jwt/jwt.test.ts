import { describe, expect, it } from "vitest";
import { decodeJwt } from "./jwt";

const SAMPLE_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

describe("decodeJwt", () => {
  it("decodes the header and payload of a well-known sample token", () => {
    const result = decodeJwt(SAMPLE_JWT);
    expect(result.header).toEqual({ alg: "HS256", typ: "JWT" });
    expect(result.payload).toEqual({
      sub: "1234567890",
      name: "John Doe",
      iat: 1516239022,
    });
    expect(result.signature).toBe("SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
  });

  it("rejects empty input", () => {
    expect(() => decodeJwt("")).toThrow(/empty/i);
  });

  it("rejects a token without three segments", () => {
    expect(() => decodeJwt("only.two")).toThrow(/three dot-separated segments/i);
  });

  it("rejects a token with invalid Base64URL", () => {
    expect(() => decodeJwt("not-base64!.also-not!!.sig")).toThrow(/valid Base64URL/i);
  });

  it("rejects a segment that decodes to invalid JSON", () => {
    const notJsonSegment = Buffer.from("not json").toString("base64url");
    expect(() => decodeJwt(`${notJsonSegment}.${notJsonSegment}.sig`)).toThrow(
      /invalid JSON/i
    );
  });

  it("tolerates unpadded Base64URL segments", () => {
    const result = decodeJwt(SAMPLE_JWT);
    expect(result.header).toBeDefined();
  });
});
