export function encodeUrl(input: string): string {
  return encodeURIComponent(input);
}

export function decodeUrl(input: string): string {
  if (!input.trim()) {
    throw new Error("Input is empty.");
  }
  try {
    return decodeURIComponent(input);
  } catch {
    throw new Error("Input contains invalid percent-encoding.");
  }
}
