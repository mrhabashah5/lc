import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CircleCheck, ExternalLink, Lightbulb } from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";
import { CtaBand, DisclaimerNote, PageHero } from "@/components/Sections";
import { articles, articleWordCount, readMinutes, type Article } from "@/lib/content";
import { ogImageFor } from "@/lib/images";
import { orgId, websiteId } from "@/lib/schema";
import { clampDescription, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

const anchor = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const dateLabel = (iso?: string) =>
  iso
    ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso))
    : undefined;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) return {};
  return pageMetadata({
    title: a.seoTitle ?? a.title,
    description: a.metaDescription ?? clampDescription(a.excerpt),
    path: `/articles/${a.slug}`,
    imageKey: a.slug,
    type: "article",
    modifiedTime: a.updated,
  });
}

function jsonLd(a: Article) {
  const url = `${site.url}/articles/${a.slug}`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      headline: a.title,
      image: [`${site.url}${ogImageFor(a.slug).url}`],
      description: a.excerpt,
      mainEntityOfPage: url,
      datePublished: a.updated,
      dateModified: a.updated,
      wordCount: articleWordCount(a),
      inLanguage: "en-PK",
      author: { "@type": "Organization", name: `${site.name} Editorial Team`, url: `${site.url}/about` },
      publisher: { "@id": orgId },
      isPartOf: { "@id": websiteId },
      articleSection: a.category,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Financial Education", item: `${site.url}/articles` },
        { "@type": "ListItem", position: 3, name: a.title, item: url },
      ],
    },
  ];
  if (a.faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: a.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();

  const related = articles.filter((x) => x.slug !== a.slug && x.category === a.category).slice(0, 3);
  const more = related.length < 3
    ? [...related, ...articles.filter((x) => x.slug !== a.slug && !related.includes(x))].slice(0, 3)
    : related;
  const toc = [
    ...a.sections.map((s) => ({ id: anchor(s.heading), label: s.heading })),
    ...(a.faqs?.length ? [{ id: "faqs", label: "Frequently asked questions" }] : []),
  ];
  const updated = dateLabel(a.updated);

  return (
    <>
      <PageHero crumb="Financial Education" eyebrow={a.category} title={a.title} />

      <article className="section bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
          <div className="min-w-0 max-w-3xl">
            <p className="text-sm text-muted">
              By <span className="font-semibold text-brand-dark">{site.name} Editorial Team</span>
              {updated && (
                <>
                  {" · "}Updated <time dateTime={a.updated}>{updated}</time>
                </>
              )}
              {" · "}
              {readMinutes(a)} min read
            </p>

            {/* The direct answer comes first. */}
            {a.quickAnswer && (
              <section aria-labelledby="quick-answer" className="mt-6 rounded-2xl border-l-4 border-brand-ink bg-brand-soft/30 p-6 sm:p-7">
                <h2 id="quick-answer" className="text-sm font-bold tracking-widest text-brand-ink uppercase">
                  Quick answer
                </h2>
                <p className="mt-2 text-lg leading-relaxed font-medium text-ink">{a.quickAnswer}</p>
              </section>
            )}

            {a.takeaways?.length ? (
              <section aria-labelledby="takeaways" className="mt-8 rounded-2xl border border-line p-6 sm:p-7">
                <h2 id="takeaways" className="text-xl font-extrabold">
                  Key takeaways
                </h2>
                <ul className="mt-4 space-y-3">
                  {a.takeaways.map((t) => (
                    <li key={t} className="flex items-start gap-3 leading-relaxed text-ink">
                      <CircleCheck size={20} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {/* Table of contents (mobile) */}
            {toc.length > 3 && (
              <nav aria-label="In this article" className="mt-8 rounded-2xl bg-surface p-6 lg:hidden">
                <h2 className="text-sm font-bold tracking-widest text-brand-dark uppercase">In this article</h2>
                <ol className="mt-3 list-decimal space-y-1.5 pl-5 marker:text-muted">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`} className="text-[15px] font-semibold text-brand-dark underline decoration-brand-soft underline-offset-4 hover:text-brand-ink">
                        {t.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <div className="prose-lc mt-4">
              {a.sections.map((s) => (
                <section key={s.heading} aria-labelledby={anchor(s.heading)}>
                  <h2 id={anchor(s.heading)} className="scroll-mt-28">
                    {s.heading}
                  </h2>
                  {s.paragraphs?.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                  {s.bullets && (
                    <ul>
                      {s.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                  {s.steps && (
                    <ol className="mb-6 space-y-3">
                      {s.steps.map((st, i) => (
                        <li key={st} className="flex gap-4 leading-relaxed text-ink">
                          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-ink text-sm font-extrabold text-white" aria-hidden="true">
                            {i + 1}
                          </span>
                          <span className="pt-0.5">{st}</span>
                        </li>
                      ))}
                    </ol>
                  )}
                  {s.table && (
                    <div className="mb-6 overflow-x-auto rounded-2xl border border-line" tabIndex={0} role="region" aria-label={s.table.caption}>
                      <table className="w-full min-w-[560px] text-left text-[15px]">
                        <caption className="bg-surface px-5 py-3 text-left text-sm font-bold text-brand-dark">{s.table.caption}</caption>
                        <thead className="bg-brand-dark text-white">
                          <tr>
                            {s.table.headers.map((h) => (
                              <th key={h} scope="col" className="px-5 py-3 font-bold">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-line">
                          {s.table.rows.map((r) => (
                            <tr key={r.join("|")} className="even:bg-surface">
                              {r.map((c, ci) =>
                                ci === 0 ? (
                                  <th key={ci} scope="row" className="px-5 py-3 align-top font-semibold text-brand-dark">
                                    {c}
                                  </th>
                                ) : (
                                  <td key={ci} className="px-5 py-3 align-top leading-relaxed text-ink">
                                    {c}
                                  </td>
                                ),
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {s.note && (
                    <p className="!mb-6 flex gap-3 rounded-xl bg-brand-soft/30 p-4 text-[15px] leading-relaxed text-ink">
                      <Lightbulb size={20} className="mt-0.5 shrink-0 text-brand-ink" aria-hidden="true" />
                      <span>{s.note}</span>
                    </p>
                  )}
                </section>
              ))}
            </div>

            {a.faqs?.length ? (
              <section aria-labelledby="faqs" className="mt-12">
                <h2 id="faqs" className="scroll-mt-28 text-2xl font-extrabold">
                  Frequently asked questions
                </h2>
                <div className="mt-5 space-y-3">
                  {a.faqs.map((f) => (
                    <details key={f.q} className="group rounded-2xl border border-line bg-white shadow-card">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl p-5 text-lg font-bold text-brand-dark [&::-webkit-details-marker]:hidden">
                        <h3 className="text-lg font-bold">{f.q}</h3>
                        <ArrowRight size={20} aria-hidden="true" className="shrink-0 text-brand transition-transform group-open:rotate-90" />
                      </summary>
                      <p className="px-5 pb-5 leading-relaxed text-ink">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}

            {a.sources?.length ? (
              <section aria-labelledby="sources" className="mt-12 border-t border-line pt-8">
                <h2 id="sources" className="text-xl font-extrabold">
                  Official sources and further reading
                </h2>
                <ul className="mt-4 space-y-2">
                  {a.sources.map((s) => (
                    <li key={s.url}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-semibold text-brand-dark underline decoration-brand underline-offset-4 hover:text-brand-ink"
                      >
                        {s.label} <ExternalLink size={15} aria-hidden="true" />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-muted">
                  Rules, fees and procedures can change. Always confirm current requirements with the official source.
                </p>
              </section>
            ) : null}

            <div className="mt-10">
              <DisclaimerNote>
                This article is general information only. It is not legal, financial or credit advice and may not
                reflect your circumstances or your lender&apos;s policies.
              </DisclaimerNote>
            </div>

            <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-brand-dark p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8 on-dark">
              <div>
                <p className="text-xl font-extrabold text-white">Need help with your own loan?</p>
                <p className="mt-1 text-white/85">Get a free, no-obligation consultation.</p>
              </div>
              <Link href="/request-consultation" className="btn btn-primary shrink-0">
                Request Consultation
              </Link>
            </div>

            <Link href="/articles" className="link-arrow mt-8">
              <ArrowLeft size={17} aria-hidden="true" /> All articles
            </Link>
          </div>

          {/* Table of contents (desktop) */}
          {toc.length > 3 && (
            <aside className="hidden lg:block">
              <nav aria-label="In this article (sidebar)" className="sticky top-28 rounded-2xl border border-line bg-surface p-5">
                <h2 className="text-sm font-bold tracking-widest text-brand-dark uppercase">In this article</h2>
                <ol className="mt-3 space-y-1">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`} className="block rounded-lg px-2 py-1.5 text-sm font-semibold text-muted hover:bg-brand-soft/30 hover:text-brand-dark">
                        {t.label}
                      </a>
                    </li>
                  ))}
                </ol>
                <Link href="/tools" className="btn btn-secondary btn-sm mt-5 w-full">
                  Free loan tools
                </Link>
              </nav>
            </aside>
          )}
        </div>
      </article>

      {more.length > 0 && (
        <section className="section border-t border-line bg-surface">
          <div className="container-x">
            <h2 className="h-section mb-8">Related guides</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {more.map((r) => (
                <ArticleCard key={r.slug} article={r} headingLevel={3} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(a) }} />
    </>
  );
}
