import { describe, expect, it } from "vitest";
import { formatHtml } from "./html";

describe("formatHtml", () => {
  it("rejects empty input", () => {
    expect(() => formatHtml("")).toThrow(/empty/i);
  });

  it("indents nested elements", () => {
    expect(formatHtml("<div><p>Hello</p></div>")).toBe(
      "<div>\n  <p>\n    Hello\n  </p>\n</div>"
    );
  });

  it("does not add a closing tag for void elements", () => {
    const output = formatHtml("<div><img src=\"a.png\"><br></div>");
    expect(output).toBe(
      '<div>\n  <img src="a.png">\n  <br>\n</div>'
    );
  });

  it("normalizes self-closing tags", () => {
    expect(formatHtml("<div><input   type=\"text\"/></div>")).toBe(
      '<div>\n  <input type="text" />\n</div>'
    );
  });

  it("collapses messy whitespace in attributes but preserves quoted values", () => {
    const output = formatHtml('<div   class="a  b"   id=\'c\'>x</div>');
    expect(output).toBe('<div class="a  b" id=\'c\'>\n  x\n</div>');
  });

  it("preserves script content verbatim without reformatting it", () => {
    const output = formatHtml("<script>if(a<b){x()}</script>");
    expect(output).toBe("<script>\n  if(a<b){x()}\n</script>");
  });

  it("preserves HTML comments", () => {
    const output = formatHtml("<div><!-- note --></div>");
    expect(output).toBe("<div>\n  <!-- note -->\n</div>");
  });

  it("keeps the doctype on its own line", () => {
    const output = formatHtml("<!DOCTYPE html><html></html>");
    expect(output).toBe("<!DOCTYPE html>\n<html>\n</html>");
  });
});
