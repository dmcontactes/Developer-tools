// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { renderMarkdown } from "./markdown";

describe("renderMarkdown", () => {
  it("renders headings and paragraphs", () => {
    const html = renderMarkdown("# Title\n\nHello world.");
    expect(html).toContain("<h1>Title</h1>");
    expect(html).toContain("<p>Hello world.</p>");
  });

  it("renders a fenced code block", () => {
    const html = renderMarkdown("```js\nconst a = 1;\n```");
    expect(html).toContain("<pre>");
    expect(html).toContain("const a = 1;");
  });

  it("renders GFM tables", () => {
    const html = renderMarkdown("| a | b |\n| - | - |\n| 1 | 2 |");
    expect(html).toContain("<table>");
  });

  it("returns an empty string for empty input", () => {
    expect(renderMarkdown("")).toBe("");
  });

  it("strips script tags instead of rendering them", () => {
    const html = renderMarkdown("<script>alert('xss')</script>\n\nHello");
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("alert(");
  });

  it("strips inline event handler attributes", () => {
    const html = renderMarkdown('<img src="x" onerror="alert(1)">');
    expect(html).not.toContain("onerror");
  });

  it("preserves safe inline HTML like line breaks", () => {
    const html = renderMarkdown("line one  \nline two");
    expect(html).toContain("<br");
  });
});
