"use client";

import { EncodeDecodeTool } from "@/components/tools/shared/encode-decode-tool";
import { decodeUrl, encodeUrl } from "@/lib/tools/url/url-encoding";

export function UrlEncoder() {
  return (
    <EncodeDecodeTool
      encode={encodeUrl}
      decode={decodeUrl}
      inputPlaceholder="Text to URL-encode, or a percent-encoded string to decode…"
    />
  );
}
