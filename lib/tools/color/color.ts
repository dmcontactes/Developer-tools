export interface Rgb {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface Hsl {
  h: number;
  s: number;
  l: number;
  a: number;
}

function clamp255(value: number): number {
  return Math.min(255, Math.max(0, Math.round(value)));
}

export function parseColor(input: string): Rgb {
  const value = input.trim();
  if (!value) {
    throw new Error("Input is empty.");
  }

  const hexMatch = value.match(/^#?([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i);
  if (hexMatch) {
    return hexToRgb(value);
  }

  const rgbMatch = value.match(
    /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*([\d.]+)\s*)?\)$/i
  );
  if (rgbMatch) {
    const [, r, g, b, a] = rgbMatch;
    return {
      r: clamp255(Number(r)),
      g: clamp255(Number(g)),
      b: clamp255(Number(b)),
      a: a !== undefined ? Math.min(1, Math.max(0, Number(a))) : 1,
    };
  }

  const hslMatch = value.match(
    /^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*([\d.]+)\s*)?\)$/i
  );
  if (hslMatch) {
    const [, h, s, l, a] = hslMatch;
    const rgb = hslToRgb({
      h: Number(h),
      s: Number(s),
      l: Number(l),
      a: a !== undefined ? Number(a) : 1,
    });
    return rgb;
  }

  throw new Error("Unrecognized color format. Use hex, rgb() or hsl().");
}

export function hexToRgb(hex: string): Rgb {
  const clean = hex.replace("#", "");
  let expanded = clean;
  if (clean.length === 3 || clean.length === 4) {
    expanded = clean
      .split("")
      .map((char) => char + char)
      .join("");
  }
  if (![6, 8].includes(expanded.length)) {
    throw new Error("Invalid hex color.");
  }
  const r = parseInt(expanded.slice(0, 2), 16);
  const g = parseInt(expanded.slice(2, 4), 16);
  const b = parseInt(expanded.slice(4, 6), 16);
  const a = expanded.length === 8 ? parseInt(expanded.slice(6, 8), 16) / 255 : 1;
  return { r, g, b, a };
}

export function rgbToHex({ r, g, b, a }: Rgb): string {
  const toHex = (value: number) => clamp255(value).toString(16).padStart(2, "0");
  const base = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  return a < 1 ? `${base}${Math.round(a * 255).toString(16).padStart(2, "0")}` : base;
}

export function rgbToHsl({ r, g, b, a }: Rgb): Hsl {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const l = (max + min) / 2;

  if (max === min) {
    return { h: 0, s: 0, l: Math.round(l * 100), a };
  }

  const delta = max - min;
  const s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

  let h: number;
  switch (max) {
    case rNorm:
      h = ((gNorm - bNorm) / delta) % 6;
      break;
    case gNorm:
      h = (bNorm - rNorm) / delta + 2;
      break;
    default:
      h = (rNorm - gNorm) / delta + 4;
  }
  h = Math.round(h * 60);
  if (h < 0) h += 360;

  return { h, s: Math.round(s * 100), l: Math.round(l * 100), a };
}

export function hslToRgb({ h, s, l, a }: Hsl): Rgb {
  const sNorm = s / 100;
  const lNorm = l / 100;
  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lNorm - c / 2;

  let rPrime = 0;
  let gPrime = 0;
  let bPrime = 0;

  if (h < 60) [rPrime, gPrime, bPrime] = [c, x, 0];
  else if (h < 120) [rPrime, gPrime, bPrime] = [x, c, 0];
  else if (h < 180) [rPrime, gPrime, bPrime] = [0, c, x];
  else if (h < 240) [rPrime, gPrime, bPrime] = [0, x, c];
  else if (h < 300) [rPrime, gPrime, bPrime] = [x, 0, c];
  else [rPrime, gPrime, bPrime] = [c, 0, x];

  return {
    r: clamp255((rPrime + m) * 255),
    g: clamp255((gPrime + m) * 255),
    b: clamp255((bPrime + m) * 255),
    a: a ?? 1,
  };
}

export function formatRgb(rgb: Rgb): string {
  return rgb.a < 1
    ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`
    : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

export function formatHsl(hsl: Hsl): string {
  return hsl.a < 1
    ? `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${hsl.a})`
    : `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}
