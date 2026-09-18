export type HashAlgorithm = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function generateHash(
  input: string,
  algorithm: HashAlgorithm
): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest(algorithm, data);
  return bufferToHex(digest);
}
