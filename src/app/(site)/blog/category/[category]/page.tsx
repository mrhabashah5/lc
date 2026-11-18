import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { CategoryPills } from "@/components/blog/BlogParts";
import { JsonLd } from "@/components/JsonLd";
import { CtaBand, PageHero } from "@/components/Sections";
import { blogCategories, blogPath, categoryPath } from "@/lib/blog";
import { websiteId } from "@/lib/schema";
import { clampDescription, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ category: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return blogCategories.map((c) => ({ category: c.slug }));
}

const find = (slug: string) => blogCategories.find((c) => c.slug === slug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const c = find(category);
  if (!c) return {};
  return pageMetadata({
    title: `${c.label} Guides for Borrowers in Pakistan`,
    description: clampDescription(`${c.description} Free, plain-language guides from the ByeByeLoan blog.`),
    path: categoryPath(c.slug),
  });
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const c = find(category);
  if (!c) notFound();

  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${c.label} guides`,
    description: c.description,
    url: `${site.url}${categoryPath(c.slug)}`,
    isPartOf: { "@id": websiteId },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: c.posts.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${site.url}${blogPath(p.slug)}`,
        name: p.title,
      })),
    },
  };

  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Blog", path: "/blog" },
          { name: c.label, path: categoryPath(c.slug) },
        ]}
        crumb={`Blog / ${c.label}`}
        eyebrow="Blog category"
        title={c.label}
        intro={c.description}
      />
      <JsonLd data={ld} />
      <section className="section bg-white">
        <div className="container-x">
          <CategoryPills current={c.slug} />
          <h2 className="sr-only">{c.label} guides</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {c.posts.map((a, i) => (
              <ArticleCard key={a.slug} article={a} headingLevel={3} priority={i === 0} />
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
