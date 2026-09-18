"use client";

import { EncodeDecodeTool } from "@/components/tools/shared/encode-decode-tool";
import { decodeBase64, encodeBase64 } from "@/lib/tools/base64/base64";

export function Base64Encoder() {
  return (
    <EncodeDecodeTool
      encode={encodeBase64}
      decode={decodeBase64}
      inputPlaceholder="Plain text to encode, or a Base64 string to decode…"
    />
  );
}
