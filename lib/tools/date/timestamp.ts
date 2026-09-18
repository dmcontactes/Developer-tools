function isLikelyMilliseconds(value: number): boolean {
  return Math.abs(value) > 1e11;
}

export function unixToDate(value: number): Date {
  if (!Number.isFinite(value)) {
    throw new Error("Enter a valid number.");
  }
  const ms = isLikelyMilliseconds(value) ? value : value * 1000;
  const date = new Date(ms);
  if (Number.isNaN(date.getTime())) {
    throw new Error("Timestamp is out of range.");
  }
  return date;
}

export function dateToUnix(dateString: string): number {
  if (!dateString.trim()) {
    throw new Error("Input is empty.");
  }
  const ms = Date.parse(dateString);
  if (Number.isNaN(ms)) {
    throw new Error("Enter a valid date, e.g. 2026-01-01T00:00:00Z.");
  }
  return Math.floor(ms / 1000);
}

export function nowUnix(): number {
  return Math.floor(Date.now() / 1000);
}
