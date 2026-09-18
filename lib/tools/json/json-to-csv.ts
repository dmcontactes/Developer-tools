function flatten(value: unknown, prefix = ""): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    result[prefix] = value;
    return result;
  }
  for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (nested !== null && typeof nested === "object" && !Array.isArray(nested)) {
      Object.assign(result, flatten(nested, path));
    } else {
      result[path] = nested;
    }
  }
  return result;
}

// Primitive arrays join as "a; b"; arrays/objects with nested structure fall back to raw JSON.
function stringifyValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) {
    if (value.every((item) => item === null || typeof item !== "object")) {
      return value.join("; ");
    }
    return JSON.stringify(value);
  }
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function escapeCsvField(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function jsonToCsv(input: string): string {
  if (!input.trim()) {
    throw new Error("Input is empty.");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(input);
  } catch {
    throw new Error("Invalid JSON.");
  }

  if (!Array.isArray(parsed)) {
    throw new Error("Input must be a JSON array of objects.");
  }
  if (parsed.length === 0) {
    return "";
  }
  if (!parsed.every((item) => item !== null && typeof item === "object" && !Array.isArray(item))) {
    throw new Error("Every item in the array must be an object.");
  }

  const rows = parsed.map((item) => flatten(item));
  const columns: string[] = [];
  for (const row of rows) {
    for (const key of Object.keys(row)) {
      if (!columns.includes(key)) columns.push(key);
    }
  }

  const header = columns.map(escapeCsvField).join(",");
  const lines = rows.map((row) =>
    columns.map((column) => escapeCsvField(stringifyValue(row[column]))).join(",")
  );

  return [header, ...lines].join("\n");
}
