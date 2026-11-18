"use client";

import { useState } from "react";
import { Check, Link2, MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

/** Share links for a post: WhatsApp, Facebook, X, LinkedIn and copy link. */
export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;
  const links = [
    { name: "WhatsApp", href: `https://wa.me/?text=${enc(`${title} ${url}`)}`, icon: <MessageCircle size={16} aria-hidden="true" /> },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`, label: "f" },
    { name: "X", href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`, label: "X" },
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`, label: "in" },
  ];
  const btn =
    "inline-flex h-10 min-w-10 cursor-pointer items-center justify-center gap-1.5 rounded-full border border-field bg-white px-3 text-sm font-bold text-brand-dark transition-colors hover:border-brand-ink hover:text-brand-ink";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-semibold text-muted">Share:</span>
      {links.map((l) => (
        <a
          key={l.name}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className={btn}
          onClick={() => trackEvent("share", { method: l.name, item_id: url })}
        >
          {l.icon ?? <span aria-hidden="true">{l.label}</span>}
          <span className="sr-only">
            Share on {l.name} (opens in a new tab)
          </span>
        </a>
      ))}
      <button
        type="button"
        className={btn}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            trackEvent("share", { method: "copy_link", item_id: url });
          } catch {
            /* clipboard unavailable: ignore */
          }
        }}
      >
        {copied ? <Check size={16} aria-hidden="true" /> : <Link2 size={16} aria-hidden="true" />}
        <span>{copied ? "Copied" : "Copy link"}</span>
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Link copied" : ""}
      </span>
    </div>
  );
}
