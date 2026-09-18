import { describe, expect, it } from "vitest";
import {
  formatHsl,
  formatRgb,
  hexToRgb,
  hslToRgb,
  parseColor,
  rgbToHex,
  rgbToHsl,
} from "./color";

describe("parseColor", () => {
  it("rejects empty input", () => {
    expect(() => parseColor("")).toThrow(/empty/i);
  });

  it("rejects an unrecognized format", () => {
    expect(() => parseColor("not-a-color")).toThrow(/unrecognized/i);
  });

  it("parses 3-digit hex", () => {
    expect(parseColor("#f00")).toEqual({ r: 255, g: 0, b: 0, a: 1 });
  });

  it("parses 6-digit hex without a leading #", () => {
    expect(parseColor("ff0000")).toEqual({ r: 255, g: 0, b: 0, a: 1 });
  });

  it("parses rgb()", () => {
    expect(parseColor("rgb(255, 0, 0)")).toEqual({ r: 255, g: 0, b: 0, a: 1 });
  });

  it("parses rgba() with alpha", () => {
    expect(parseColor("rgba(255, 0, 0, 0.5)")).toEqual({ r: 255, g: 0, b: 0, a: 0.5 });
  });

  it("parses hsl()", () => {
    const rgb = parseColor("hsl(0, 100%, 50%)");
    expect(rgb).toEqual({ r: 255, g: 0, b: 0, a: 1 });
  });
});

describe("hex <-> rgb <-> hsl round-trip", () => {
  it("round-trips pure red", () => {
    const rgb = hexToRgb("#ff0000");
    expect(rgbToHex(rgb)).toBe("#ff0000");
    expect(rgbToHsl(rgb)).toEqual({ h: 0, s: 100, l: 50, a: 1 });
  });

  it("round-trips black and white without NaN", () => {
    expect(rgbToHsl({ r: 0, g: 0, b: 0, a: 1 })).toEqual({ h: 0, s: 0, l: 0, a: 1 });
    expect(rgbToHsl({ r: 255, g: 255, b: 255, a: 1 })).toEqual({ h: 0, s: 0, l: 100, a: 1 });
  });

  it("round-trips an arbitrary color within rounding tolerance", () => {
    const original = { r: 34, g: 139, b: 230, a: 1 };
    const hsl = rgbToHsl(original);
    const roundTripped = hslToRgb(hsl);
    expect(Math.abs(roundTripped.r - original.r)).toBeLessThanOrEqual(1);
    expect(Math.abs(roundTripped.g - original.g)).toBeLessThanOrEqual(1);
    expect(Math.abs(roundTripped.b - original.b)).toBeLessThanOrEqual(1);
  });
});

describe("formatters", () => {
  it("formats rgb without alpha when opaque", () => {
    expect(formatRgb({ r: 1, g: 2, b: 3, a: 1 })).toBe("rgb(1, 2, 3)");
  });

  it("formats rgba when alpha is set", () => {
    expect(formatRgb({ r: 1, g: 2, b: 3, a: 0.4 })).toBe("rgba(1, 2, 3, 0.4)");
  });

  it("formats hsl without alpha when opaque", () => {
    expect(formatHsl({ h: 10, s: 20, l: 30, a: 1 })).toBe("hsl(10, 20%, 30%)");
  });
});
