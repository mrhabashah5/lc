import { blogPath } from "@/lib/blog";
import { articles } from "@/lib/content";
import { site } from "@/lib/site";

// RSS 2.0 feed of blog posts, so readers and search engines can follow new guides.
export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = articles
    .map((a) => {
      const url = `${site.url}${blogPath(a.slug)}`;
      return `    <item>
      <title>${esc(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <category>${esc(a.category)}</category>
      ${a.updated ? `<pubDate>${new Date(a.updated + "T00:00:00Z").toUTCString()}</pubDate>` : ""}
      <description>${esc(a.quickAnswer ?? a.excerpt)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)} Blog</title>
    <link>${site.url}/blog</link>
    <atom:link href="${site.url}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>Guides on loan clearance, loan apps, credit reports and borrower rights in Pakistan.</description>
    <language>en-pk</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
