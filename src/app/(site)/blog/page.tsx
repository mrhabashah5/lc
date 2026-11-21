import type { Metadata } from "next";
import Link from "next/link";
import { Rss } from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";
import { CategoryPills, FeaturedPost } from "@/components/blog/BlogParts";
import { JsonLd } from "@/components/JsonLd";
import { CtaBand, PageHero } from "@/components/Sections";
import { blogPath } from "@/lib/blog";
import { articles } from "@/lib/content";
import { orgId, websiteId } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Loan Clearance Blog: Guides for Pakistan",
    description:
      "Plain-language guides on loan clearance letters (NOC), loan app loans, credit reports and your rights as a borrower in Pakistan. Free to read.",
    path: "/blog",
  }),
  alternates: { canonical: "/blog", types: { "application/rss+xml": `${site.url}/blog/rss.xml` } },
};

export default function BlogPage() {
  const [featured, ...rest] = articles;
  const blogLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${site.url}/blog#blog`,
    name: `${site.name} Blog`,
    url: `${site.url}/blog`,
    description: "Guides on loan clearance, loan apps, credit reports and borrower rights in Pakistan.",
    inLanguage: "en-PK",
    publisher: { "@id": orgId },
    isPartOf: { "@id": websiteId },
    blogPost: articles.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      url: `${site.url}${blogPath(a.slug)}`,
      datePublished: a.updated,
      dateModified: a.updated,
    })),
  };

  return (
    <>
      <PageHero
        path="/blog"
        crumb="Blog"
        eyebrow="SmartGuru Blog"
        title="Clear answers on"
        highlight="loans in Pakistan."
        intro="Practical, plain-language guides on clearance letters, loan apps, credit records and your rights as a borrower."
      />
      <JsonLd data={blogLd} />

      <section className="section bg-white">
        <div className="container-x">
          <CategoryPills />
          <div className="mt-8">
            <FeaturedPost post={featured} priority />
          </div>

          <div className="mt-14 mb-6 flex flex-wrap items-end justify-between gap-3">
            <h2 className="h-section">Latest guides</h2>
            <a href="/blog/rss.xml" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink hover:underline">
              <Rss size={16} aria-hidden="true" /> RSS feed
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <ArticleCard key={a.slug} article={a} headingLevel={3} />
            ))}
          </div>
          <p className="mt-10 text-center text-muted">
            Looking for something else?{" "}
            <Link href="/faqs" className="link-arrow">
              Read the FAQs
            </Link>{" "}
            or{" "}
            <Link href="/tools" className="link-arrow">
              try the free loan tools
            </Link>
          </p>
        </div>
      </section>

      <CtaBand
        title="Need help with your own loan?"
        text="Our guides are free. If you want someone to look at your situation, request a free, no-obligation consultation."
      />
    </>
  );
}
