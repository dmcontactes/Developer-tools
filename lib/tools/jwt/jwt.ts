export interface DecodedJwt {
  header: unknown;
  payload: unknown;
  signature: string;
}

function decodeSegment(segment: string): unknown {
  const base64 = segment.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);

  let binary: string;
  try {
    binary = atob(padded);
  } catch {
    throw new Error("Token contains a segment that isn't valid Base64URL.");
  }

  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const json = new TextDecoder().decode(bytes);

  try {
    return JSON.parse(json);
  } catch {
    throw new Error("A token segment decoded to invalid JSON.");
  }
}

export function decodeJwt(token: string): DecodedJwt {
  const trimmed = token.trim();
  if (!trimmed) {
    throw new Error("Input is empty.");
  }

  const parts = trimmed.split(".");
  if (parts.length !== 3) {
    throw new Error(
      "A JWT must have three dot-separated segments (header.payload.signature)."
    );
  }

  const [headerSegment, payloadSegment, signature] = parts;
  return {
    header: decodeSegment(headerSegment),
    payload: decodeSegment(payloadSegment),
    signature,
  };
}
