"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { gaId, loadMetaPixel, metaPixelId, trackEvent, trackMeta } from "@/lib/analytics";

/**
 * Loads configured analytics and records WhatsApp link clicks as conversions
 * (GA4 "whatsapp_click" and Meta "Contact").
 *
 * The Meta Pixel starts on the visitor's first scroll, tap or key press, or after 4 seconds,
 * so its large script never slows down the first view of the page.
 */
export function Analytics() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  // Start the Meta Pixel after the page is usable.
  useEffect(() => {
    if (!metaPixelId) return;
    const events = ["scroll", "pointerdown", "keydown", "touchstart"] as const;
    const start = () => {
      events.forEach((e) => window.removeEventListener(e, start));
      window.clearTimeout(timer);
      loadMetaPixel();
    };
    const timer = window.setTimeout(start, 4000);
    events.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));
    return () => {
      window.clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, start));
    };
  }, []);

  // WhatsApp clicks are the main conversion.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.("a[href*='wa.me/']");
      if (!link) return;
      if (gaId) trackEvent("whatsapp_click", { link_url: (link as HTMLAnchorElement).href, page_path: location.pathname });
      if (metaPixelId) {
        loadMetaPixel();
        trackMeta("Contact", { content_name: "WhatsApp", page_path: location.pathname });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Page views for in-site navigation (the first one is sent when the pixel starts).
  useEffect(() => {
    if (!metaPixelId || pathname === previousPathname.current) return;
    previousPathname.current = pathname;
    trackMeta("PageView");
  }, [pathname]);

  if (!gaId && !metaPixelId) return null;
  return (
    <>
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(gaId)});`}
          </Script>
        </>
      ) : null}
      {metaPixelId ? (
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${encodeURIComponent(metaPixelId)}&ev=PageView&noscript=1" alt="">`,
          }}
        />
      ) : null}
    </>
  );
}
