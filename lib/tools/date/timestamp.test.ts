import { describe, expect, it } from "vitest";
import { dateToUnix, unixToDate } from "./timestamp";

describe("unixToDate", () => {
  it("converts epoch zero", () => {
    expect(unixToDate(0).toISOString()).toBe("1970-01-01T00:00:00.000Z");
  });

  it("handles timestamps before 1970", () => {
    expect(unixToDate(-86400).toISOString()).toBe("1969-12-31T00:00:00.000Z");
  });

  it("auto-detects millisecond timestamps", () => {
    const ms = 1700000000000;
    expect(unixToDate(ms).getTime()).toBe(ms);
  });

  it("treats a typical second-precision timestamp as seconds", () => {
    const seconds = 1700000000;
    expect(unixToDate(seconds).getTime()).toBe(seconds * 1000);
  });

  it("rejects non-finite input", () => {
    expect(() => unixToDate(NaN)).toThrow(/valid number/i);
  });
});

describe("dateToUnix", () => {
  it("converts an ISO date back to the same epoch seconds", () => {
    expect(dateToUnix("1970-01-01T00:00:00.000Z")).toBe(0);
  });

  it("rejects empty input", () => {
    expect(() => dateToUnix("")).toThrow(/empty/i);
  });

  it("rejects an unparseable date", () => {
    expect(() => dateToUnix("not a date")).toThrow(/valid date/i);
  });

  it("round-trips through unixToDate", () => {
    const seconds = 1700000000;
    expect(dateToUnix(unixToDate(seconds).toISOString())).toBe(seconds);
  });
});
