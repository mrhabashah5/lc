import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { CtaBand, DisclaimerNote, PageHero, SectionHeading, StepCards } from "./Sections";

export type ServiceDetailProps = {
  crumb: string;
  title: string;
  highlight: string;
  intro: string;
  whatTitle: string;
  what: string[];
  forWhom: string[];
  helpTitle: string;
  help: { title: string; text: string }[];
  knowTitle: string;
  know: string[];
  disclaimer: string;
  /** Optional highlighted link shown under the introduction. */
  callout?: { title: string; text: string; href: string; label: string };
};

export function ServiceDetail(p: ServiceDetailProps) {
  return (
    <>
      <PageHero crumb={p.crumb} eyebrow="Our services" title={p.title} highlight={p.highlight} intro={p.intro} />

      <section className="section bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <h2 className="h-section">{p.whatTitle}</h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink">
              {p.what.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
            <Link href="/request-consultation" className="btn btn-primary mt-8">
              Request Consultation
            </Link>
          </div>
          <aside className="self-start rounded-3xl bg-sky-light/30 p-8">
            <h2 className="text-xl font-extrabold">This may be right for you if</h2>
            <ul className="mt-5 space-y-4">
              {p.forWhom.map((t) => (
                <li key={t} className="flex items-start gap-3 font-medium text-ink">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky text-white">
                    <Check size={14} strokeWidth={3.5} aria-hidden="true" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </aside>
        </div>
        {p.callout && (
          <div className="container-x mt-12">
            <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div className="max-w-2xl">
                <h2 className="text-xl font-extrabold">{p.callout.title}</h2>
                <p className="mt-1.5 leading-relaxed text-muted">{p.callout.text}</p>
              </div>
              <Link href={p.callout.href} className="btn btn-secondary shrink-0">
                {p.callout.label} <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        )}
      </section>

      <section className="section border-y border-line bg-surface">
        <div className="container-x">
          <SectionHeading eyebrow="How we help" title={p.helpTitle} />
          <div className="grid gap-6 sm:grid-cols-2">
            {p.help.map((h, i) => (
              <div key={h.title} className="card flex gap-5">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-light/50 text-lg font-extrabold text-navy">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-bold">{h.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{h.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x mx-auto max-w-3xl">
          <h2 className="h-section">{p.knowTitle}</h2>
          <ul className="mt-6 space-y-4">
            {p.know.map((t) => (
              <li key={t} className="flex items-start gap-3 text-lg leading-relaxed text-ink">
                <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-sky" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <DisclaimerNote>{p.disclaimer}</DisclaimerNote>
          </div>
        </div>
      </section>

      <section className="section bg-sky-light/25">
        <div className="container-x">
          <SectionHeading eyebrow="The process" title="Three steps to get started" />
          <StepCards />
          <div className="mt-10 text-center">
            <Link href="/how-it-works" className="link-arrow">
              See how it works <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
