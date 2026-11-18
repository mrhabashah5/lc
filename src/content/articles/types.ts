export type ArticleTable = {
  caption: string;
  headers: string[];
  rows: string[][];
};

export type ArticleSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  /** Numbered steps, rendered as an ordered list. */
  steps?: string[];
  table?: ArticleTable;
  /** Highlighted tip or warning shown under the section. */
  note?: string;
};

export type Article = {
  slug: string;
  title: string;
  /** Shorter title for search results (~60 characters) when the page heading is long. */
  seoTitle?: string;
  /** Short summary used on cards and as the meta description. */
  excerpt: string;
  /** Search result description, 140–160 characters. Falls back to a trimmed excerpt. */
  metaDescription?: string;
  category: string;
  /** ISO date of the last review, e.g. "2026-11-16". */
  updated?: string;
  /** The direct answer, shown first (2–3 sentences), for search result answer boxes. */
  quickAnswer?: string;
  takeaways?: string[];
  sections: ArticleSection[];
  faqs?: { q: string; a: string }[];
  sources?: { label: string; url: string }[];
};

const words = (s: string) => s.split(/\s+/).filter(Boolean).length;

/** Total words in an article's body text. */
export function articleWordCount(a: Article) {
  let n = words(a.quickAnswer ?? "");
  for (const t of a.takeaways ?? []) n += words(t);
  for (const s of a.sections) {
    n += words(s.heading);
    for (const p of [...(s.paragraphs ?? []), ...(s.bullets ?? []), ...(s.steps ?? []), s.note ?? ""]) n += words(p);
    if (s.table) for (const r of s.table.rows) n += words(r.join(" "));
  }
  for (const f of a.faqs ?? []) n += words(f.q) + words(f.a);
  return n;
}

export const readMinutes = (a: Article) => Math.max(2, Math.round(articleWordCount(a) / 220));
