// Google Analytics 4 is optional: it only loads when NEXT_PUBLIC_GA_ID is set.
export const gaId = process.env.NEXT_PUBLIC_GA_ID ?? "";
export const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "1841255493813494";

type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;

declare global {
  interface Window {
    fbq?: (command: "track", eventName: "PageView") => void;
  }
}

/** Sends a GA4 event if analytics is enabled; does nothing otherwise. Safe to call anywhere on the client. */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (gtag) gtag("event", name, params);
}

/** Sends a Meta Pixel page view when the pixel is enabled. */
export function trackMetaPageView() {
  if (typeof window !== "undefined") window.fbq?.("track", "PageView");
}
