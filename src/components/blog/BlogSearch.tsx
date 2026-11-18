"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

export type SearchItem = { title: string; href: string; category: string; text: string };

/** Instant search over the blog's guides (runs in the browser; nothing is sent anywhere). */
export function BlogSearch({ items }: { items: SearchItem[] }) {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const results = useMemo(() => {
    if (query.length < 2) return [];
    const words = query.split(/\s+/);
    return items
      .map((it) => {
        const hay = `${it.title} ${it.category} ${it.text}`.toLowerCase();
        const score = words.reduce((s, w) => s + (it.title.toLowerCase().includes(w) ? 3 : hay.includes(w) ? 1 : -99), 0);
        return { it, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((r) => r.it);
  }, [items, query]);

  return (
    <div className="relative">
      <label htmlFor="blog-search" className="sr-only">
        Search the guides
      </label>
      <Search size={20} aria-hidden="true" className="pointer-events-none absolute top-[1.15rem] left-4 text-brand-ink" />
      <input
        id="blog-search"
        type="search"
        autoComplete="off"
        placeholder='Search guides, e.g. "NOC" or "loan app"'
        className="field rounded-xl py-3.5 pr-11 pl-12 text-base shadow-card [&::-webkit-search-cancel-button]:hidden"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-describedby="blog-search-status"
      />
      {q && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => setQ("")}
          className="absolute top-2 right-2 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-muted hover:text-brand-dark"
        >
          <X size={18} />
        </button>
      )}
      <p id="blog-search-status" className="sr-only" aria-live="polite">
        {query.length >= 2 ? `${results.length} guides found` : ""}
      </p>
      {query.length >= 2 && (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-line bg-white shadow-float">
          {results.length ? (
            <ul>
              {results.map((r) => (
                <li key={r.href} className="border-b border-line last:border-0">
                  <Link href={r.href} className="block px-4 py-3 hover:bg-brand-soft/30">
                    <span className="block text-xs font-bold tracking-wider text-brand-ink uppercase">{r.category}</span>
                    <span className="block font-semibold text-brand-dark">{r.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-3 text-sm text-muted">
              No guides match “{q}”.{" "}
              <Link href="/blog" className="font-semibold text-brand-ink underline">
                Browse all guides
              </Link>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
