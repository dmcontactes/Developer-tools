import { describe, expect, it } from "vitest";
import { formatSql, minifySql } from "./sql";

describe("minifySql", () => {
  it("rejects empty input", () => {
    expect(() => minifySql("")).toThrow(/empty/i);
  });

  it("collapses whitespace and newlines", () => {
    expect(minifySql("SELECT  *\n FROM   users")).toBe("SELECT * FROM users");
  });

  it("preserves whitespace inside string literals", () => {
    expect(minifySql("SELECT '  a  b  '")).toBe("SELECT '  a  b  '");
  });
});

describe("formatSql", () => {
  it("rejects empty input", () => {
    expect(() => formatSql("")).toThrow(/empty/i);
  });

  it("breaks major clauses onto their own line", () => {
    const output = formatSql(
      "select id, name from users where age > 18 and active = true order by name"
    );
    expect(output).toBe(
      [
        "SELECT id, name",
        "FROM users",
        "WHERE age > 18",
        "  AND active = true",
        "ORDER BY name",
      ].join("\n")
    );
  });

  it("indents AND/OR conditions", () => {
    const output = formatSql("select 1 where a = 1 and b = 2 or c = 3");
    expect(output).toContain("\n  AND b = 2");
    expect(output).toContain("\n  OR c = 3");
  });

  it("does not rewrite string literal contents", () => {
    const output = formatSql("select * from users where name = 'select from'");
    expect(output).toContain("'select from'");
  });

  it("uppercases keywords regardless of input case", () => {
    const output = formatSql("select * from users");
    expect(output).toBe("SELECT *\nFROM users");
  });
});
