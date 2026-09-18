function collapseWhitespace(text: string): string {
  return text.trim().replace(/\s+/g, " ");
}

function formatDeclaration(text: string): string {
  return text.replace(/^([^:]+):\s*/, "$1: ");
}

export function formatCss(input: string): string {
  if (!input.trim()) {
    throw new Error("Input is empty.");
  }

  let result = "";
  let indent = 0;
  let buffer = "";
  let i = 0;
  const indentStr = () => "  ".repeat(indent);
  const flushBuffer = () => {
    const collapsed = collapseWhitespace(buffer);
    buffer = "";
    return collapsed;
  };

  while (i < input.length) {
    const char = input[i];

    if (char === "/" && input[i + 1] === "*") {
      const end = input.indexOf("*/", i + 2);
      const commentEnd = end === -1 ? input.length : end + 2;
      const pending = flushBuffer();
      if (pending) result += `${indentStr()}${pending}\n`;
      result += `${indentStr()}${input.slice(i, commentEnd)}\n`;
      i = commentEnd;
      continue;
    }

    if (char === '"' || char === "'") {
      const quote = char;
      let j = i + 1;
      while (j < input.length && input[j] !== quote) {
        if (input[j] === "\\") j++;
        j++;
      }
      buffer += input.slice(i, j + 1);
      i = j + 1;
      continue;
    }

    if (char === "{") {
      const selector = flushBuffer();
      result += `${indentStr()}${selector} {\n`;
      indent++;
      i++;
      continue;
    }

    if (char === "}") {
      const declaration = flushBuffer();
      if (declaration) result += `${indentStr()}${formatDeclaration(declaration)};\n`;
      indent = Math.max(0, indent - 1);
      result += `${indentStr()}}\n`;
      i++;
      continue;
    }

    if (char === ";") {
      const declaration = flushBuffer();
      if (declaration) result += `${indentStr()}${formatDeclaration(declaration)};\n`;
      i++;
      continue;
    }

    buffer += char;
    i++;
  }

  const trailing = flushBuffer();
  if (trailing) result += `${indentStr()}${trailing}\n`;

  return result.trim();
}
