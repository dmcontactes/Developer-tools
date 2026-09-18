"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/ui/copy-button";
import { formatHsl, formatRgb, parseColor, rgbToHex, rgbToHsl } from "@/lib/tools/color/color";

export function ColorConverter() {
  const [input, setInput] = useState("#6366f1");

  const result = useMemo(() => {
    try {
      const rgb = parseColor(input);
      return {
        hex: rgbToHex(rgb),
        rgb: formatRgb(rgb),
        hsl: formatHsl(rgbToHsl(rgb)),
        swatch: rgbToHex(rgb),
        error: null as string | null,
      };
    } catch (err) {
      return {
        hex: "",
        rgb: "",
        hsl: "",
        swatch: null,
        error: err instanceof Error ? err.message : "Invalid color.",
      };
    }
  }, [input]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="#6366f1, rgb(99, 102, 241) or hsl(239, 84%, 67%)"
        />
        <div
          className="size-10 shrink-0 rounded-md border border-border"
          style={{ background: result.swatch ?? "transparent" }}
        />
      </div>

      {result.error && (
        <p className="rounded-md border border-red-900/50 bg-red-950/40 px-3 py-2 text-sm text-red-300">
          {result.error}
        </p>
      )}

      {!result.error && (
        <div className="flex flex-col gap-2">
          {[
            { label: "HEX", value: result.hex },
            { label: "RGB", value: result.rgb },
            { label: "HSL", value: result.hsl },
          ].map((format) => (
            <div
              key={format.label}
              className="flex items-center justify-between gap-3 rounded-md border border-border bg-surface px-3 py-2.5"
            >
              <div className="flex min-w-0 flex-col">
                <span className="text-xs text-muted-foreground">{format.label}</span>
                <span className="truncate font-mono text-sm text-foreground">
                  {format.value}
                </span>
              </div>
              <CopyButton value={format.value} className="shrink-0" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
