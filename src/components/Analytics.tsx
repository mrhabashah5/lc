"use client";

import Script from "next/script";
import { useEffect } from "react";
import { gaId, trackEvent } from "@/lib/analytics";

/**
 * Loads GA4 when NEXT_PUBLIC_GA_ID is set and records WhatsApp link clicks as a conversion event.
 * Renders nothing when analytics is not configured.
 */
export function Analytics() {
  useEffect(() => {
    if (!gaId) return;
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.("a[href*='wa.me/']");
      if (link) trackEvent("whatsapp_click", { link_url: (link as HTMLAnchorElement).href, page_path: location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!gaId) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(gaId)});`}
      </Script>
    </>
  );
}
