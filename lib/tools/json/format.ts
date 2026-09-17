export interface JsonValidationResult {
  valid: boolean;
  error?: string;
  line?: number;
  column?: number;
}

function locateError(input: string, message: string): { line?: number; column?: number } {
  const match = message.match(/position (\d+)/);
  if (!match) return {};
  const position = Number(match[1]);
  const before = input.slice(0, position);
  const line = before.split("\n").length;
  const lastNewline = before.lastIndexOf("\n");
  const column = position - (lastNewline + 1) + 1;
  return { line, column };
}

// V8 already appends "(line N column M)" to some JSON.parse messages;
// strip it since we compute and surface line/column ourselves.
function stripNativeLocation(message: string): string {
  return message.replace(/\s*\(line \d+ column \d+\)\s*$/i, "");
}

export function validateJson(input: string): JsonValidationResult {
  if (!input.trim()) {
    return { valid: false, error: "Input is empty." };
  }
  try {
    JSON.parse(input);
    return { valid: true };
  } catch (error) {
    const rawMessage = error instanceof Error ? error.message : "Invalid JSON.";
    const { line, column } = locateError(input, rawMessage);
    return { valid: false, error: stripNativeLocation(rawMessage), line, column };
  }
}

export function formatJson(input: string, indent = 2): string {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed, null, indent);
}

export function minifyJson(input: string): string {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed);
}
