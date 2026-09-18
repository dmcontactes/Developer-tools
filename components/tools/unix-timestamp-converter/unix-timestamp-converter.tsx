"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/ui/copy-button";
import { dateToUnix, nowUnix, unixToDate } from "@/lib/tools/date/timestamp";

export function UnixTimestampConverter() {
  const [timestamp, setTimestamp] = useState(String(nowUnix()));
  const [dateInput, setDateInput] = useState("");
  const [timestampError, setTimestampError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);

  let converted: { iso: string; local: string } | null = null;
  if (!timestampError && timestamp.trim()) {
    try {
      const date = unixToDate(Number(timestamp));
      converted = { iso: date.toISOString(), local: date.toString() };
    } catch {
      // surfaced via the button handler below
    }
  }

  function handleConvertTimestamp() {
    try {
      unixToDate(Number(timestamp));
      setTimestampError(null);
    } catch (err) {
      setTimestampError(err instanceof Error ? err.message : "Invalid timestamp.");
    }
  }

  function handleConvertDate() {
    try {
      setTimestamp(String(dateToUnix(dateInput)));
      setDateError(null);
    } catch (err) {
      setDateError(err instanceof Error ? err.message : "Invalid date.");
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Unix timestamp (seconds or milliseconds)
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <Input
            value={timestamp}
            onChange={(event) => setTimestamp(event.target.value)}
            className="max-w-xs font-mono"
          />
          <Button type="button" variant="secondary" onClick={handleConvertTimestamp}>
            Convert
          </Button>
          <Button type="button" variant="outline" onClick={() => setTimestamp(String(nowUnix()))}>
            Now
          </Button>
        </div>
        {timestampError && (
          <p className="rounded-md border border-red-900/50 bg-red-950/40 px-3 py-2 text-sm text-red-300">
            {timestampError}
          </p>
        )}
        {converted && (
          <div className="mt-1 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3 rounded-md border border-border bg-surface px-3 py-2.5">
              <div className="flex min-w-0 flex-col">
                <span className="text-xs text-muted-foreground">ISO 8601 (UTC)</span>
                <span className="truncate font-mono text-sm text-foreground">{converted.iso}</span>
              </div>
              <CopyButton value={converted.iso} className="shrink-0" />
            </div>
            <div className="flex items-center justify-between gap-3 rounded-md border border-border bg-surface px-3 py-2.5">
              <div className="flex min-w-0 flex-col">
                <span className="text-xs text-muted-foreground">Local time</span>
                <span className="truncate font-mono text-sm text-foreground">{converted.local}</span>
              </div>
              <CopyButton value={converted.local} className="shrink-0" />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Date to Unix timestamp
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <Input
            value={dateInput}
            onChange={(event) => setDateInput(event.target.value)}
            placeholder="2026-01-01T00:00:00Z"
            className="max-w-xs font-mono"
          />
          <Button type="button" variant="secondary" onClick={handleConvertDate}>
            Convert
          </Button>
        </div>
        {dateError && (
          <p className="rounded-md border border-red-900/50 bg-red-950/40 px-3 py-2 text-sm text-red-300">
            {dateError}
          </p>
        )}
      </div>
    </div>
  );
}
