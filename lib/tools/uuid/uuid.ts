const UUID_V4_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isValidUuidV4(value: string): boolean {
  return UUID_V4_REGEX.test(value);
}

export function generateUuids(count: number): string[] {
  const safeCount = Math.min(Math.max(Math.trunc(count) || 1, 1), 100);
  return Array.from({ length: safeCount }, () => crypto.randomUUID());
}
