import type { MetadataRoute } from "next";
import { articles } from "@/lib/content";
import { tools } from "@/lib/tools";
import { legalDocs } from "@/lib/legal";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/about",
    "/services",
    "/loan-settlement",
    "/loan-clearance",
    "/loan-apps",
    "/how-it-works",
    "/why-choose-byebyeloan",
    "/faqs",
    "/contact",
    "/request-consultation",
    "/articles",
    ...articles.map((a) => `/articles/${a.slug}`),
    "/tools",
    ...tools.map((t) => `/tools/${t.slug}`),
    ...legalDocs.map((d) => `/${d.slug}`),
  ];
  return paths.map((p) => ({
    url: `${site.url}${p}`,
    changeFrequency: p.startsWith("/articles") || p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : p === "/request-consultation" ? 0.9 : 0.7,
  }));
}
