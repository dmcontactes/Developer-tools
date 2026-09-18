import { marked } from "marked";
import DOMPurify from "dompurify";

marked.setOptions({ gfm: true, breaks: true });

export function renderMarkdown(input: string): string {
  const rawHtml = marked.parse(input, { async: false }) as string;
  return DOMPurify.sanitize(rawHtml);
}
