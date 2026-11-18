import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, ListChecks, Scale } from "lucide-react";
import { CtaBand, PageHero } from "@/components/Sections";
import { tools } from "@/lib/tools";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Free Loan Calculators & Clearance Checklist",
  description:
    "Free loan repayment calculator, settlement offer calculator and loan clearance checklist for borrowers in Pakistan. No sign-up, and nothing you enter is sent.",
  path: "/tools",
});

const icons = { calculator: Calculator, scale: Scale, list: ListChecks } as const;

export default function ToolsPage() {
  return (
    <>
      <PageHero
        path="/tools"
        crumb="Free Loan Tools"
        eyebrow="Free tools"
        title="Free loan tools,"
        highlight="no sign-up needed."
        intro="Work out your instalments, compare a settlement offer and follow a clearance checklist. Everything runs in your browser and nothing you enter is sent to us."
      />
      <section className="section bg-white">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {tools.map((t) => {
            const I = icons[t.icon];
            return (
              <article key={t.slug} className="card group relative flex flex-col transition-shadow hover:shadow-float">
                <span className="icon-tile">
                  <I size={24} aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-xl font-bold">
                  <Link href={`/tools/${t.slug}`} className="after:absolute after:inset-0 group-hover:text-brand-ink">
                    {t.title}
                  </Link>
                </h2>
                <p className="mt-3 flex-1 leading-relaxed text-muted">{t.short}</p>
                <span className="link-arrow mt-5" aria-hidden="true">
                  Open tool <ArrowRight size={17} />
                </span>
              </article>
            );
          })}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
