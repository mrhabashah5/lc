import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { CtaBand, PageHero } from "@/components/Sections";
import { articles } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Loan Clearance Guides for Pakistan",
  description:
    "Free, plain-language guides on loan clearance letters (NOC), loan app loans, settlement, credit reports and your rights as a borrower in Pakistan.",
  path: "/articles",
});

export default function ArticlesPage() {
  return (
    <>
      <PageHero
        path="/articles"
        crumb="Financial Education"
        eyebrow="Financial education"
        title="Understand your options"
        highlight="before you decide."
        intro="Short, practical guides written to help you make informed decisions about your loan."
      />
      <section className="section bg-white">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {articles.map((a, i) => (
            <ArticleCard key={a.slug} article={a} headingLevel={2} priority={i === 0} />
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
