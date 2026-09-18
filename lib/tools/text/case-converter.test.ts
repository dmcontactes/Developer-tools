import { describe, expect, it } from "vitest";
import {
  toCamelCase,
  toConstantCase,
  toKebabCase,
  toPascalCase,
  toSnakeCase,
  toTitleCase,
} from "./case-converter";

describe("case converter", () => {
  it("converts space-separated words", () => {
    expect(toCamelCase("hello world")).toBe("helloWorld");
    expect(toPascalCase("hello world")).toBe("HelloWorld");
    expect(toSnakeCase("hello world")).toBe("hello_world");
    expect(toKebabCase("hello world")).toBe("hello-world");
    expect(toConstantCase("hello world")).toBe("HELLO_WORLD");
    expect(toTitleCase("hello world")).toBe("Hello World");
  });

  it("splits existing camelCase input", () => {
    expect(toSnakeCase("helloWorldAgain")).toBe("hello_world_again");
  });

  it("splits existing snake_case input", () => {
    expect(toCamelCase("hello_world")).toBe("helloWorld");
  });

  it("splits existing kebab-case input", () => {
    expect(toCamelCase("hello-world")).toBe("helloWorld");
  });

  it("handles consecutive uppercase acronyms", () => {
    expect(toSnakeCase("XMLHttpRequest")).toBe("xml_http_request");
  });

  it("returns an empty string for empty input", () => {
    expect(toCamelCase("")).toBe("");
    expect(toSnakeCase("   ")).toBe("");
  });

  it("handles a single word", () => {
    expect(toPascalCase("hello")).toBe("Hello");
  });

  it("handles numbers within words", () => {
    expect(toKebabCase("version2Update")).toBe("version2-update");
  });
});
