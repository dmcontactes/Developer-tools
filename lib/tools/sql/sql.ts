const CLAUSE_KEYWORDS = [
  "SELECT",
  "FROM",
  "WHERE",
  "INNER JOIN",
  "LEFT JOIN",
  "RIGHT JOIN",
  "FULL JOIN",
  "JOIN",
  "GROUP BY",
  "ORDER BY",
  "HAVING",
  "LIMIT",
  "OFFSET",
  "INSERT INTO",
  "VALUES",
  "UPDATE",
  "SET",
  "DELETE FROM",
  "UNION ALL",
  "UNION",
];

const INDENT_KEYWORDS = ["AND", "OR"];

// Tags each segment as inside/outside a '...' string literal, so callers never rewrite string content.
function splitPreservingStrings(input: string): { text: string; inString: boolean }[] {
  const segments: { text: string; inString: boolean }[] = [];
  let current = "";
  let inString = false;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char === "'") {
      current += char;
      segments.push({ text: current, inString });
      current = "";
      inString = !inString;
      continue;
    }
    current += char;
  }
  if (current) segments.push({ text: current, inString });
  return segments;
}

function transformOutsideStrings(
  input: string,
  transform: (segment: string) => string
): string {
  return splitPreservingStrings(input)
    .map((segment) => (segment.inString ? segment.text : transform(segment.text)))
    .join("");
}

export function minifySql(input: string): string {
  if (!input.trim()) {
    throw new Error("Input is empty.");
  }
  const collapsed = transformOutsideStrings(input, (text) =>
    text.replace(/\s+/g, " ")
  );
  return collapsed.trim();
}

export function formatSql(input: string): string {
  if (!input.trim()) {
    throw new Error("Input is empty.");
  }

  const normalized = minifySql(input);

  let withBreaks = normalized;
  for (const keyword of CLAUSE_KEYWORDS) {
    const pattern = new RegExp(`\\s*\\b${keyword.replace(/ /g, "\\s+")}\\b`, "gi");
    withBreaks = transformOutsideStrings(withBreaks, (text) =>
      text.replace(pattern, (match) => `\n${match.trim().toUpperCase()}`)
    );
  }
  for (const keyword of INDENT_KEYWORDS) {
    const pattern = new RegExp(`\\s+\\b${keyword}\\b`, "gi");
    withBreaks = transformOutsideStrings(withBreaks, (text) =>
      text.replace(pattern, (match) => `\n  ${match.trim().toUpperCase()}`)
    );
  }

  return withBreaks
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .join("\n");
}
