import type { Metadata } from "next";
import { ogImageFor } from "./images";
import { site } from "./site";

/** Date the site's main pages were last reviewed. Update it when page content changes. */
export const contentUpdated = "2026-11-18";

type PageMetaInput = {
  /** Page title without the brand. The brand is appended unless `absoluteTitle` is set. */
  title: string;
  /** 140–160 characters: what the page answers, for whom, and the next step. */
  description: string;
  /** Path of the page, e.g. "/loan-clearance". Used for the canonical URL and share link. */
  path: string;
  /** Use the title as written (for titles that already contain the brand). */
  absoluteTitle?: boolean;
  /** Share image key from src/content/og-images.json (article slug), or the site default. */
  imageKey?: string;
  type?: "website" | "article";
  modifiedTime?: string;
};

/**
 * Builds complete metadata for a page: title, description, canonical link and
 * matching Open Graph / X (Twitter) tags, so no page inherits the home page's share tags.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  imageKey,
  type = "website",
  modifiedTime,
}: PageMetaInput): Metadata {
  const suffixed = `${title} | ${site.name}`;
  // Keep titles within ~60 characters: drop the brand suffix if it would make the title too long.
  const useAbsolute = absoluteTitle || suffixed.length > 60;
  const fullTitle = useAbsolute ? title : suffixed;
  const image = ogImageFor(imageKey);
  return {
    title: useAbsolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: site.name,
      locale: "en_PK",
      title: fullTitle,
      description,
      url: path,
      images: [{ ...image, alt: fullTitle }],
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image.url] },
  };
}

/** Shortens text to whole sentences (or words) within `max` characters, for meta descriptions. */
export function clampDescription(text: string, max = 160) {
  if (text.length <= max) return text;
  const sentences = text.match(/[^.!?]+[.!?]+/g) ?? [text];
  let out = "";
  for (const s of sentences) {
    if ((out + s).trim().length > max) break;
    out += s;
  }
  if (out.trim().length >= 100) return out.trim();
  return text.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
}
