function toWords(input: string): string[] {
  return input
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/[_\-.]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.toLowerCase());
}

export function toCamelCase(input: string): string {
  const words = toWords(input);
  return words
    .map((word, index) =>
      index === 0 ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join("");
}

export function toPascalCase(input: string): string {
  return toWords(input)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join("");
}

export function toSnakeCase(input: string): string {
  return toWords(input).join("_");
}

export function toKebabCase(input: string): string {
  return toWords(input).join("-");
}

export function toConstantCase(input: string): string {
  return toWords(input).join("_").toUpperCase();
}

export function toTitleCase(input: string): string {
  return toWords(input)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}
