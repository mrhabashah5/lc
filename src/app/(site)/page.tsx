import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Calculator, ListChecks, MessageCircle, Scale } from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";
import { BlogSearch } from "@/components/blog/BlogSearch";
import { CategoryTiles, FeaturedPost, PostListItem } from "@/components/blog/BlogParts";
import { HeroIllustration } from "@/components/HeroIllustration";
import { AppTicker } from "@/components/home/AppTicker";
import { blogPath } from "@/lib/blog";
import { articles } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/site";
import { tools } from "@/lib/tools";

export const metadata: Metadata = pageMetadata({
  title: "Loan Clearance Guides & Help for Pakistan | ByeByeLoan",
  absoluteTitle: true,
  description:
    "Free, plain-language guides on loan clearance letters (NOC), loan app loans, credit reports and your rights as a borrower in Pakistan, plus free loan tools.",
  path: "/",
});

const toolIcons = { calculator: Calculator, scale: Scale, list: ListChecks } as const;

export default function HomePage() {
  const [featured, ...others] = articles;
  const latest = others.slice(0, 6);
  const searchItems = articles.map((a) => ({
    title: a.title,
    href: blogPath(a.slug),
    category: a.category,
    text: `${a.excerpt} ${a.quickAnswer ?? ""} ${(a.takeaways ?? []).join(" ")}`,
  }));

  return (
    <>
      {/* Hero: blog intro, search and featured guide */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-mist via-brand-mist/60 to-white">
        <div aria-hidden="true" className="absolute top-10 -right-32 h-96 w-96 rounded-full bg-brand-soft/70 blur-3xl" />
        <div className="container-x relative grid grid-cols-1 items-center gap-10 py-14 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:py-20">
          <div>
            <p className="eyebrow mb-3">ByeByeLoan Blog</p>
            <h1 className="text-4xl leading-[1.1] font-extrabold text-brand-dark sm:text-5xl">
              Clear answers on <span className="text-brand">loans in Pakistan</span>
            </h1>
            <p className="lead mt-5 max-w-xl">
              Free, plain-language guides on clearance letters (NOC), loan apps, credit records and your rights as a
              borrower. Written to help you close loans the right way.
            </p>
            <div className="mt-7 max-w-xl">
              <BlogSearch items={searchItems} />
            </div>
            <p className="mt-4 text-sm text-muted">
              {articles.length} in-depth guides · {tools.length} free tools · updated regularly
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-bold tracking-widest text-brand-ink uppercase">Most read</h2>
            <ul className="space-y-5 rounded-3xl border border-line bg-white p-6 shadow-card">
              {articles.slice(0, 4).map((a) => (
                <PostListItem key={a.slug} post={a} />
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Featured guide */}
      <section className="bg-white pt-14 sm:pt-16">
        <div className="container-x">
          <FeaturedPost post={featured} />
        </div>
      </section>

      {/* Browse by topic */}
      <section className="section bg-white">
        <div className="container-x">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow mb-2">Browse by topic</p>
              <h2 className="h-section">What do you need help with?</h2>
            </div>
            <Link href="/blog" className="link-arrow">
              All guides <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <CategoryTiles />
        </div>
      </section>

      {/* Latest guides */}
      <section className="section border-y border-line bg-surface">
        <div className="container-x">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow mb-2">Latest</p>
              <h2 className="h-section">New on the blog</h2>
            </div>
            <Link href="/blog" className="link-arrow">
              View all posts <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((a) => (
              <ArticleCard key={a.slug} article={a} headingLevel={3} />
            ))}
          </div>
        </div>
      </section>

      {/* Free tools */}
      <section className="section bg-white">
        <div className="container-x">
          <div className="mb-8">
            <p className="eyebrow mb-2">Free tools</p>
            <h2 className="h-section">Work it out in minutes</h2>
          </div>
          <ul className="grid gap-5 md:grid-cols-3">
            {tools.map((t) => {
              const I = toolIcons[t.icon];
              return (
                <li key={t.slug} className="group relative rounded-2xl border border-line bg-white p-6 shadow-card transition-shadow hover:shadow-float">
                  <span className="icon-tile">
                    <I size={24} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold">
                    <Link href={`/tools/${t.slug}`} className="after:absolute after:inset-0 group-hover:text-brand-ink">
                      {t.title}
                    </Link>
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted">{t.short}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <AppTicker />

      {/* Optional help (secondary) */}
      <section className="section bg-surface">
        <div className="container-x">
          <div className="grid items-center gap-8 overflow-hidden rounded-3xl bg-brand-soft lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <div className="p-8 sm:p-12">
              <p className="eyebrow mb-2">Need more than a guide?</p>
              <h2 className="h-section">Get help with your own loan</h2>
              <p className="mt-4 leading-relaxed text-ink">
                If you would like someone to look at your situation, ByeByeLoan offers a free, no-obligation
                consultation. We are an independent service, not a lender, and we never ask you to pay a personal
                account.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/request-consultation" className="btn btn-primary">
                  Free Consultation
                </Link>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <MessageCircle size={18} aria-hidden="true" /> WhatsApp Us
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
              <Link href="/services" className="link-arrow mt-5 text-sm">
                <BookOpen size={15} aria-hidden="true" /> How our help works
              </Link>
            </div>
            <HeroIllustration className="h-auto w-full self-end" />
          </div>
        </div>
      </section>
    </>
  );
}
