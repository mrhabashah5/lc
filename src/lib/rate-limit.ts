import "server-only";

// Simple in-memory limiter. Good for a single server process; use a shared
// store (e.g. Redis) if the site is ever run on several instances.
const g = globalThis as unknown as { __lcHits?: Map<string, number[]> };
const hits: Map<string, number[]> = (g.__lcHits ??= new Map());

export function rateLimit(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}

export function clientIp(headers: Headers) {
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim() || headers.get("x-real-ip") || "local";
}
