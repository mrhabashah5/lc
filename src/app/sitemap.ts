import type { MetadataRoute } from "next";
import { blogCategories, categoryPath } from "@/lib/blog";
import { articles } from "@/lib/content";
import { legalDocs } from "@/lib/legal";
import { contentUpdated } from "@/lib/seo";
import { site } from "@/lib/site";
import { tools } from "@/lib/tools";

// lastModified uses real review dates (articles carry their own), never the build time.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; updated: string; priority: number }[] = [
    { path: "", updated: contentUpdated, priority: 1 },
    { path: "/loan-clearance", updated: contentUpdated, priority: 0.9 },
    { path: "/loan-apps", updated: contentUpdated, priority: 0.9 },
    { path: "/request-consultation", updated: contentUpdated, priority: 0.9 },
    { path: "/loan-settlement", updated: contentUpdated, priority: 0.8 },
    { path: "/services", updated: contentUpdated, priority: 0.8 },
    { path: "/how-it-works", updated: contentUpdated, priority: 0.7 },
    { path: "/faqs", updated: contentUpdated, priority: 0.7 },
    { path: "/about", updated: contentUpdated, priority: 0.6 },
    { path: "/why-choose-byebyeloan", updated: contentUpdated, priority: 0.6 },
    { path: "/contact", updated: contentUpdated, priority: 0.6 },
    { path: "/blog", updated: contentUpdated, priority: 0.9 },
    ...blogCategories.map((c) => ({ path: categoryPath(c.slug), updated: contentUpdated, priority: 0.6 })),
    ...articles.map((a) => ({ path: `/blog/${a.slug}`, updated: a.updated ?? contentUpdated, priority: 0.8 })),
    { path: "/tools", updated: contentUpdated, priority: 0.6 },
    ...tools.map((t) => ({ path: `/tools/${t.slug}`, updated: contentUpdated, priority: 0.6 })),
    ...legalDocs.map((d) => ({ path: `/${d.slug}`, updated: contentUpdated, priority: 0.3 })),
  ];
  return pages.map((p) => ({
    url: `${site.url}${p.path}`,
    lastModified: p.updated,
    priority: p.priority,
  }));
}
