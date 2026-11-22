import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Check, ChevronDown, Clock, FileCheck, FolderOpen, Layers, ShieldCheck } from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";
import { JsonLd } from "@/components/JsonLd";
import { HeroIllustration } from "@/components/HeroIllustration";
import { AppCategoryWall } from "@/components/home/AppCategoryWall";
import { AppTicker } from "@/components/home/AppTicker";
import { ChatPreview } from "@/components/home/ChatPreview";
import { WhatsAppCta } from "@/components/home/WhatsAppCta";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { articles } from "@/lib/content";
import { loanApps } from "@/lib/loan-apps";
import { serviceJsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { site, whatsappDisplay, whatsappLink } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Loan Clearance Letter (NOC) Help in Pakistan | SmartGuru",
  absoluteTitle: true,
  description: `Paid off a loan? Get help with your clearance letter (NOC) and documents for loans from banks and ${loanApps.length} digital loan apps in Pakistan. Free first consultation.`,
  path: "/",
});

// Each button sends its own WhatsApp message, so you can tell which part of the page a lead came from.
const msg = {
  hero: "Hi SmartGuru, I paid off my loan and I need help getting my clearance letter (NOC).",
  situations: "Hi SmartGuru, I think I need a clearance letter for my loan. Can you help?",
  steps: "Hi SmartGuru, I want to start. Here are my loan details:",
  faq: "Hi SmartGuru, I have a question about loan clearance.",
  final: "Hi SmartGuru, I would like a free chat about my loan clearance.",
  sticky: "Hi SmartGuru, I need help with my loan clearance letter (NOC).",
};

const situations = [
  "You paid your loan, but you never got a clearance letter",
  "Your loan app still shows money due after you paid",
  "The bank still has your car or house papers",
  "You need proof the loan is closed, for a new loan or account",
];

const steps = [
  { title: "Message us on WhatsApp", text: "Say hello and tell us which bank or loan app you used." },
  { title: "Send your payment proof", text: "Share your receipts or last statement. We check what is still missing." },
  { title: "Get your clearance paperwork", text: "We help you ask the lender for the clearance letter and your papers back." },
];

const benefits = [
  { icon: FileCheck, title: "Clearance letter (NOC)", text: "A letter from your lender that says you owe nothing more." },
  { icon: FolderOpen, title: "Your documents back", text: "Car papers, house papers or cheques the lender is still holding." },
  { icon: ShieldCheck, title: "Proof for the future", text: "A complete file that shows the loan is closed, whenever you need it." },
];

const faqs = [
  { q: "Is the first chat free?", a: "Yes. Your first chat with us is free and you do not have to continue." },
  { q: "Are you a bank or a loan company?", a: "No. We do not give loans and we do not take loan payments. You always pay your lender directly." },
  {
    q: "How long does it take to get the letter?",
    a: "It depends on your lender. We help you send the request the right way and follow up until it arrives.",
  },
  { q: "Will you ask for my password or OTP?", a: "Never. We will never ask for your PIN, password, OTP or full card number." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const homeService = serviceJsonLd({
  name: "Loan clearance letter (NOC) assistance",
  serviceType: "Loan clearance assistance",
  description:
    "Help for people in Pakistan who have paid off a bank or loan app loan to request the clearance letter (NOC) and get their documents back.",
  path: "/",
});

export default function HomePage() {
  const guides = articles.slice(0, 3);
  const facts = [
    { icon: Layers, value: String(loanApps.length), label: "Loan apps covered" },
    { icon: BookOpen, value: String(articles.length), label: "Free guides" },
    { icon: Clock, value: "Mon–Sat", label: "10 am – 6 pm replies" },
  ];

  return (
    <div
      className="home-page pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-0"
      data-home-page
    >
      {/* Hero: one message, one main action */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-mist via-brand-mist/60 to-white">
        <div aria-hidden="true" className="absolute top-16 -right-32 h-96 w-96 rounded-full bg-brand-soft/70 blur-3xl" />
        <div className="container-x relative grid grid-cols-1 items-center gap-12 py-7 sm:py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div>
            <p className="eyebrow mb-3">Free help on WhatsApp</p>
            <h1 className="text-3xl leading-[1.08] font-extrabold text-brand-dark sm:text-5xl lg:text-[3.3rem]">
              Paid off your loan? <span className="text-brand">Get your clearance letter.</span>
            </h1>
            <p className="lead mt-4 max-w-xl">
              Many people in Pakistan pay their loan but never get proof that it is closed. We help you get the
              clearance letter (NOC) and your documents back from the bank or loan app.
            </p>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <WhatsAppCta message={msg.hero} />
              <Link href="/request-consultation" className="link-arrow">
                Or fill a short form <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-brand-dark">
              {["Free first chat", "No obligation", "We are not a lender"].map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5">
                  <Check size={16} strokeWidth={3} className="text-brand-ink" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <ChatPreview />
        </div>
      </section>

      {/* Key facts */}
      <section aria-label="SmartGuru at a glance" className="border-t border-line bg-white">
        <ul className="container-x grid grid-cols-3 divide-x divide-line py-5 text-center">
          {facts.map((f) => (
            <li key={f.label} className="px-2">
              <f.icon size={22} className="mx-auto text-brand" aria-hidden="true" />
              <p className="mt-1.5 text-lg font-extrabold text-brand-dark sm:text-2xl">{f.value}</p>
              <p className="text-xs text-muted sm:text-sm">{f.label}</p>
            </li>
          ))}
        </ul>
      </section>

      <AppTicker />

      {/* Is this you? */}
      <section className="section bg-white">
        <div className="container-x grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div>
            <h2 className="h-section">Is this you?</h2>
            <p className="lead mt-3">If any of these sound familiar, we can help.</p>
            <ul className="mt-7 space-y-3">
              {situations.map((s) => (
                <li key={s} className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4 shadow-card">
                  <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-ink">
                    <Check size={16} strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className="text-lg font-semibold text-brand-dark">{s}</span>
                </li>
              ))}
            </ul>
            <WhatsAppCta message={msg.situations} label="Yes, this is me. Chat now" className="mt-8" />
          </div>
          <HeroIllustration className="mx-auto h-auto w-full max-w-lg" />
        </div>
      </section>

      {/* How it works */}
      <section className="section bg-surface">
        <div className="container-x">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="h-section">How it works</h2>
            <p className="lead mt-3">Three easy steps. You can start right now on WhatsApp.</p>
          </div>
          <ol className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-line bg-white p-7 text-center shadow-card">
                <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-ink text-2xl font-extrabold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-lg leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <WhatsAppCta message={msg.steps} label="Start step 1 on WhatsApp" />
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="section bg-white">
        <div className="container-x">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="h-section">What you get</h2>
          </div>
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {benefits.map((b) => (
              <li key={b.title} className="rounded-2xl border border-line bg-white p-7 shadow-card">
                <span className="icon-tile">
                  <b.icon size={24} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-bold">{b.title}</h3>
                <p className="mt-2 text-lg leading-relaxed text-muted">{b.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <AppCategoryWall />

      {/* Quick answers */}
      <section className="section bg-white">
        <div className="container-x max-w-3xl">
          <h2 className="h-section text-center">Quick answers</h2>
          <div className="mt-8 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-line bg-white p-5 shadow-card">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-brand-dark">
                  {f.q}
                  <ChevronDown size={20} className="shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="mt-3 text-lg leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-center text-lg text-ink">
            Still have a question?{" "}
            <a
              href={whatsappLink(msg.faq)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-brand-ink underline underline-offset-4"
            >
              Ask us on WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </section>

      {/* Free guides */}
      <section className="section border-t border-line bg-surface">
        <div className="container-x">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow mb-2">Free guides</p>
              <h2 className="h-section">Learn more before you start</h2>
            </div>
            <Link href="/blog" className="link-arrow">
              All guides <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((a) => (
              <ArticleCard key={a.slug} article={a} headingLevel={3} />
            ))}
          </div>
        </div>
      </section>

      {/* Final call to action */}
      <section className="on-dark bg-brand-dark py-16 text-white sm:py-20">
        <div className="container-x text-center">
          <h2 className="text-3xl leading-tight font-extrabold text-white sm:text-4xl">Close your loan the right way</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">Send us a message today. Your first chat is free.</p>
          <WhatsAppCta message={msg.final} label={`WhatsApp ${whatsappDisplay}`} variant="light" className="mt-8" />
          <p className="mt-4 text-sm text-white/80">We reply {site.hours}.</p>
        </div>
      </section>
      <a
        href={whatsappLink(msg.sticky)}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed inset-x-0 bottom-0 z-50 flex min-h-16 items-center justify-center gap-3 bg-cta px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] text-center text-sm leading-tight font-bold text-white shadow-float md:hidden"
      >
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
          <WhatsAppIcon size={24} />
        </span>
        <span>Chat with us on WhatsApp — it&apos;s free</span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      <JsonLd data={homeService} />
      <JsonLd data={faqJsonLd} />
    </div>
  );
}
