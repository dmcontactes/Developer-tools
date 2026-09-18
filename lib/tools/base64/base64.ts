export function encodeBase64(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function decodeBase64(input: string): string {
  const sanitized = input.replace(/\s/g, "");
  if (!sanitized) {
    throw new Error("Input is empty.");
  }
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(sanitized) || sanitized.length % 4 !== 0) {
    throw new Error("Input contains characters that aren't valid Base64.");
  }

  let binary: string;
  try {
    binary = atob(sanitized);
  } catch {
    throw new Error("Input contains characters that aren't valid Base64.");
  }

  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}
