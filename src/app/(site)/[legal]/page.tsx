import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/Sections";
import { legalDocs } from "@/lib/legal";

// Serves /privacy-policy, /terms-and-conditions, /disclaimer,
// /complaints-policy and /cookie-policy from src/lib/legal.ts.
type Props = { params: Promise<{ legal: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return legalDocs.map((d) => ({ legal: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { legal } = await params;
  const doc = legalDocs.find((d) => d.slug === legal);
  if (!doc) return {};
  return { title: doc.title, description: doc.description, alternates: { canonical: `/${doc.slug}` } };
}

export default async function LegalPage({ params }: Props) {
  const { legal } = await params;
  const doc = legalDocs.find((d) => d.slug === legal);
  if (!doc) notFound();

  return (
    <>
      <PageHero crumb={doc.title} eyebrow="Legal" title={doc.title} intro={doc.description} />
      <section className="section bg-white">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_260px] lg:gap-16">
          <div className="prose-lc max-w-3xl">
            <p className="text-sm font-semibold text-muted">Last updated: {doc.updated}</p>
            <p className="text-lg">{doc.intro}</p>
            {doc.sections.map((s) => (
              <section key={s.heading}>
                <h2>{s.heading}</h2>
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
              </section>
            ))}
          </div>
          <aside className="order-first self-start rounded-2xl border border-line bg-surface p-5 lg:order-none lg:sticky lg:top-28">
            <h2 className="mb-3 text-sm font-bold tracking-widest text-navy uppercase">Legal pages</h2>
            <ul className="space-y-1">
              {legalDocs.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/${d.slug}`}
                    aria-current={d.slug === doc.slug ? "page" : undefined}
                    className={`block rounded-lg px-3 py-2 text-[15px] font-semibold ${
                      d.slug === doc.slug ? "bg-sky-light/40 text-navy" : "text-muted hover:text-navy"
                    }`}
                  >
                    {d.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
