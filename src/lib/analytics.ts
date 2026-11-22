// Google Analytics 4 is optional: it only loads when NEXT_PUBLIC_GA_ID is set.
export const gaId = process.env.NEXT_PUBLIC_GA_ID ?? "";
export const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "1841255493813494";

type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[][];
  push?: unknown;
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

/** Sends a GA4 event if analytics is enabled; does nothing otherwise. Safe to call anywhere on the client. */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (gtag) gtag("event", name, params);
}

/**
 * Starts the Meta Pixel (once): defines the fbq queue, loads Meta's script in the background,
 * and records the first PageView. Events sent before the script arrives are queued, not lost.
 */
export function loadMetaPixel() {
  if (typeof window === "undefined" || !metaPixelId || window.fbq) return;
  // Same behaviour as Meta's official snippet: queue calls until fbevents.js takes over.
  const fbq: Fbq = (...args: unknown[]) => {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue?.push(args);
  };
  fbq.queue = [];
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  window.fbq = fbq;
  window._fbq = fbq;
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
  fbq("init", metaPixelId);
  fbq("track", "PageView");
}

/** Sends a Meta Pixel event if the pixel has started. */
export function trackMeta(event: "PageView" | "Contact" | "Lead", params?: Record<string, unknown>) {
  if (typeof window !== "undefined") window.fbq?.("track", event, params);
}
