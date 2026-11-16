import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand, DisclaimerNote, PageHero } from "@/components/Sections";
import { site } from "@/lib/site";
import { toolDisclaimer, tools } from "@/lib/tools";

type Props = {
  slug: string;
  title: string;
  highlight?: string;
  /** Direct answer to what the tool does and how to use it (shown first). */
  quickAnswer: string;
  children: React.ReactNode;
  howItWorks: { heading: string; paragraphs: string[] }[];
  faqs: { q: string; a: string }[];
  related: { href: string; label: string }[];
};

export function ToolPage({ slug, title, highlight, quickAnswer, children, howItWorks, faqs, related }: Props) {
  const url = `${site.url}/tools/${slug}`;
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: `${title}${highlight ? ` ${highlight}` : ""}`.replace(/\.$/, ""),
        url,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "PKR" },
        publisher: { "@type": "Organization", name: site.name, url: site.url },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <>
      <PageHero crumb="Free Loan Tools" eyebrow="Free tool" title={title} highlight={highlight} />

      <section className="bg-white pt-10">
        <div className="container-x">
          <div className="max-w-3xl rounded-2xl border-l-4 border-sky-ink bg-sky-light/30 p-6">
            <h2 className="text-sm font-bold tracking-widest text-sky-ink uppercase">Quick answer</h2>
            <p className="mt-2 text-lg leading-relaxed font-medium text-ink">{quickAnswer}</p>
          </div>
        </div>
      </section>

      <section className="section bg-white pt-10 sm:pt-12 lg:pt-12">
        <div className="container-x">{children}</div>
      </section>

      <section className="section border-t border-line bg-surface">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="prose-lc max-w-3xl">
            {howItWorks.map((s) => (
              <section key={s.heading}>
                <h2>{s.heading}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </section>
            ))}

            <h2>Frequently asked questions</h2>
            <div className="space-y-3">
              {faqs.map((f) => (
                <details key={f.q} className="group rounded-2xl border border-line bg-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl p-5 [&::-webkit-details-marker]:hidden">
                    <h3 className="!m-0 text-lg font-bold">{f.q}</h3>
                    <ArrowRight size={20} aria-hidden="true" className="shrink-0 text-sky transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="px-5 !pb-1">{f.a}</p>
                </details>
              ))}
            </div>
            <div className="mt-8">
              <DisclaimerNote>{toolDisclaimer}</DisclaimerNote>
            </div>
          </div>

          <aside className="space-y-6 self-start">
            <div className="card sm:p-6">
              <h2 className="text-lg font-extrabold">Helpful guides</h2>
              <ul className="mt-3 space-y-2">
                {related.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} className="font-semibold text-navy underline decoration-sky underline-offset-4 hover:text-sky-ink">
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card sm:p-6">
              <h2 className="text-lg font-extrabold">More free tools</h2>
              <ul className="mt-3 space-y-2">
                {tools
                  .filter((t) => t.slug !== slug)
                  .map((t) => (
                    <li key={t.slug}>
                      <Link href={`/tools/${t.slug}`} className="link-arrow">
                        {t.title} <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
    </>
  );
}
