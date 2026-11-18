import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";
import { ArrowRight, ChevronRight, MessageCircle } from "lucide-react";
import { steps } from "@/lib/content";
import { whatsappLink } from "@/lib/site";

/** Hero used on every inner page. */
export function PageHero({
  eyebrow,
  title,
  highlight,
  intro,
  crumb,
  path,
  breadcrumbs,
}: {
  eyebrow?: string;
  title: string;
  /** Optional trailing words of the title shown in the brand colour. */
  highlight?: string;
  intro?: string;
  crumb: string;
  /** Page path; adds breadcrumb structured data (Home > crumb). */
  path?: string;
  /** Full breadcrumb trail after Home, for pages deeper than one level. */
  breadcrumbs?: { name: string; path: string }[];
}) {
  const trail = breadcrumbs ?? (path ? [{ name: crumb, path }] : null);
  return (
    <section className="relative overflow-hidden border-b border-line bg-surface">
      {trail && <JsonLd data={breadcrumbJsonLd(trail)} />}
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-brand-soft/50"
      />
      <div
        aria-hidden="true"
        className="absolute right-40 -bottom-16 hidden h-40 w-40 rounded-full bg-brand-soft/30 md:block"
      />
      <div className="container-x relative py-14 sm:py-20">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-sm text-muted">
          <Link href="/" className="hover:text-brand-dark">
            Home
          </Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page" className="font-semibold text-brand-dark">{crumb}</span>
        </nav>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="h-display max-w-3xl">
          {title} {highlight && <span className="text-brand">{highlight}</span>}
        </h1>
        {intro && <p className="lead mt-5 max-w-2xl">{intro}</p>}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  center = true,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  text?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-10 max-w-2xl sm:mb-14 ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="h-section">{title}</h2>
      {text && <p className="lead mt-4">{text}</p>}
    </div>
  );
}

/** The three-step process cards (home page and How It Works). */
export function StepCards() {
  return (
    <ol className="grid gap-6 md:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s.title} className="card relative">
          <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand text-xl font-extrabold text-white">
            {i + 1}
          </span>
          <h3 className="mb-2 text-xl font-bold">{s.title}</h3>
          <p className="leading-relaxed text-muted">{s.text}</p>
          {i < steps.length - 1 && (
            <ArrowRight
              aria-hidden="true"
              size={22}
              className="absolute top-1/2 -right-[23px] z-10 hidden -translate-y-1/2 rounded-full bg-white text-brand md:block"
            />
          )}
        </li>
      ))}
    </ol>
  );
}

/** Orange call-to-action band shown near the foot of most pages. */
export function CtaBand({
  title = "Ready to get clarity on your loan?",
  text = "Request a free, no-obligation consultation. We will review your situation and explain your options in plain language.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="on-dark bg-cta">
      <div className="container-x flex flex-col items-start gap-8 py-14 lg:flex-row lg:items-center lg:justify-between lg:py-16">
        <div className="max-w-2xl">
          <h2 className="text-3xl leading-tight font-extrabold text-white sm:text-4xl">{title}</h2>
          <p className="mt-3 text-lg leading-relaxed text-white">{text}</p>
        </div>
        <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
          <Link href="/request-consultation" className="btn btn-on-orange">
            Request Consultation <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn border-2 border-white text-white hover:bg-white hover:text-brand-dark"
          >
            <MessageCircle size={18} aria-hidden="true" /> WhatsApp Us<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/** Small boxed disclaimer used on service pages and forms. */
export function DisclaimerNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-xl border border-line bg-surface p-4 text-sm leading-relaxed text-muted">
      <strong className="text-brand-dark">Please note: </strong>
      {children}
    </p>
  );
}
