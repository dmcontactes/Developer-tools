const VOID_ELEMENTS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr",
]);
const RAW_TEXT_ELEMENTS = new Set(["script", "style"]);

type Token =
  | { kind: "open" | "close" | "selfclose" | "decl" | "comment"; name?: string; raw: string }
  | { kind: "text" | "raw"; text: string };

function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < input.length) {
    if (input[i] !== "<") {
      const nextTag = input.indexOf("<", i);
      const textEnd = nextTag === -1 ? input.length : nextTag;
      const text = input.slice(i, textEnd);
      if (text.trim()) tokens.push({ kind: "text", text });
      i = textEnd;
      continue;
    }

    if (input.startsWith("<!--", i)) {
      const end = input.indexOf("-->", i);
      const commentEnd = end === -1 ? input.length : end + 3;
      tokens.push({ kind: "comment", raw: input.slice(i, commentEnd) });
      i = commentEnd;
      continue;
    }

    if (input.startsWith("<!", i)) {
      const end = input.indexOf(">", i);
      const declEnd = end === -1 ? input.length : end + 1;
      tokens.push({ kind: "decl", raw: input.slice(i, declEnd) });
      i = declEnd;
      continue;
    }

    let j = i + 1;
    let inQuote: string | null = null;
    while (j < input.length) {
      const char = input[j];
      if (inQuote) {
        if (char === inQuote) inQuote = null;
      } else if (char === '"' || char === "'") {
        inQuote = char;
      } else if (char === ">") {
        break;
      }
      j++;
    }
    const tagEnd = j < input.length ? j + 1 : input.length;
    const raw = input.slice(i, tagEnd);
    const closing = raw.startsWith("</");
    const selfClosing = /\/>\s*$/.test(raw);
    const nameMatch = raw.match(/^<\/?\s*([a-zA-Z0-9-]+)/);
    const name = nameMatch ? nameMatch[1].toLowerCase() : "";

    if (closing) {
      tokens.push({ kind: "close", name, raw });
      i = tagEnd;
      continue;
    }

    if (RAW_TEXT_ELEMENTS.has(name) && !selfClosing) {
      const closeTagPattern = new RegExp(`</${name}\\s*>`, "i");
      const match = input.slice(tagEnd).match(closeTagPattern);
      tokens.push({ kind: "open", name, raw });
      if (match && match.index !== undefined) {
        const contentEnd = tagEnd + match.index;
        const content = input.slice(tagEnd, contentEnd);
        if (content.trim()) tokens.push({ kind: "raw", text: content });
        tokens.push({ kind: "close", name, raw: match[0] });
        i = contentEnd + match[0].length;
      } else {
        i = tagEnd;
      }
      continue;
    }

    const isVoid = VOID_ELEMENTS.has(name) || selfClosing;
    tokens.push({ kind: isVoid ? "selfclose" : "open", name, raw });
    i = tagEnd;
  }

  return tokens;
}

function normalizeTag(raw: string): string {
  let result = "";
  let i = 0;
  while (i < raw.length) {
    const char = raw[i];
    if (char === '"' || char === "'") {
      const quote = char;
      let j = i + 1;
      while (j < raw.length && raw[j] !== quote) j++;
      result += raw.slice(i, j + 1);
      i = j + 1;
      continue;
    }
    if (/\s/.test(char)) {
      result += " ";
      i++;
      while (i < raw.length && /\s/.test(raw[i])) i++;
      continue;
    }
    result += char;
    i++;
  }
  return result.replace(/\s*\/>/, " />").replace(/\s+>/g, ">").trim();
}

function collapseWhitespace(text: string): string {
  return text.trim().replace(/\s+/g, " ");
}

export function formatHtml(input: string): string {
  if (!input.trim()) {
    throw new Error("Input is empty.");
  }

  const tokens = tokenize(input);
  const lines: string[] = [];
  let indent = 0;
  const indentStr = () => "  ".repeat(indent);

  for (const token of tokens) {
    switch (token.kind) {
      case "decl":
      case "comment":
        lines.push(`${indentStr()}${token.raw.trim()}`);
        break;
      case "open":
        lines.push(`${indentStr()}${normalizeTag(token.raw)}`);
        indent++;
        break;
      case "selfclose":
        lines.push(`${indentStr()}${normalizeTag(token.raw)}`);
        break;
      case "close":
        indent = Math.max(0, indent - 1);
        lines.push(`${indentStr()}${token.raw.trim()}`);
        break;
      case "text":
        lines.push(`${indentStr()}${collapseWhitespace(token.text)}`);
        break;
      case "raw":
        for (const rawLine of token.text.split("\n")) {
          const trimmed = rawLine.trim();
          if (trimmed) lines.push(`${indentStr()}${trimmed}`);
        }
        break;
    }
  }

  return lines.join("\n").trim();
}
