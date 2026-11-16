import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { CtaBand, PageHero } from "@/components/Sections";
import { articles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Financial Education",
  description:
    "Plain-language guides on loan settlement, clearance letters and credit records in Pakistan from ByeByeLoan.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  return (
    <>
      <PageHero
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
