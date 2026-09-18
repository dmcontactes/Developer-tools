import { diffLines } from "diff";

export type DiffLineType = "added" | "removed" | "unchanged";

export interface DiffLine {
  type: DiffLineType;
  value: string;
}

function ensureTrailingNewline(text: string): string {
  return text.endsWith("\n") || text === "" ? text : `${text}\n`;
}

export function computeLineDiff(a: string, b: string): DiffLine[] {
  // diffLines tokenizes the newline as part of each line, so a missing
  // trailing newline on one side makes the whole last line look "changed"
  // even when only a later line differs. Normalizing avoids that false diff.
  const parts = diffLines(ensureTrailingNewline(a), ensureTrailingNewline(b));
  const lines: DiffLine[] = [];

  for (const part of parts) {
    const type: DiffLineType = part.added ? "added" : part.removed ? "removed" : "unchanged";
    const valueLines = part.value.split("\n");
    const withoutTrailingEmpty =
      valueLines[valueLines.length - 1] === "" ? valueLines.slice(0, -1) : valueLines;
    for (const line of withoutTrailingEmpty) {
      lines.push({ type, value: line });
    }
  }

  return lines;
}
