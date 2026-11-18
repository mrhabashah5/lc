// Google Analytics 4 is optional: it only loads when NEXT_PUBLIC_GA_ID is set.
export const gaId = process.env.NEXT_PUBLIC_GA_ID ?? "";

type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;

/** Sends a GA4 event if analytics is enabled; does nothing otherwise. Safe to call anywhere on the client. */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (gtag) gtag("event", name, params);
}
