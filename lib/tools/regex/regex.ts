export interface RegexMatch {
  match: string;
  index: number;
  groups: (string | undefined)[];
  namedGroups?: Record<string, string>;
}

export interface RegexTestResult {
  matches: RegexMatch[];
  error?: string;
}

const MAX_MATCHES = 1000;

export function testRegex(
  pattern: string,
  flags: string,
  input: string
): RegexTestResult {
  if (!pattern) {
    return { matches: [] };
  }

  let regex: RegExp;
  try {
    const normalizedFlags = flags.includes("g") ? flags : `${flags}g`;
    regex = new RegExp(pattern, normalizedFlags);
  } catch (err) {
    return {
      matches: [],
      error: err instanceof Error ? err.message : "Invalid regular expression.",
    };
  }

  const matches: RegexMatch[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(input)) !== null) {
    matches.push({
      match: match[0],
      index: match.index,
      groups: match.slice(1),
      namedGroups: match.groups,
    });
    if (matches.length >= MAX_MATCHES) break;
    if (match[0] === "") {
      regex.lastIndex++;
    }
  }

  return { matches };
}
