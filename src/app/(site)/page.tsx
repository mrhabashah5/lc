import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Check,
  Clock,
  FileText,
  Footprints,
  Gift,
  Layers,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { AboutScreens } from "@/components/home/AboutScreens";
import { AppTicker } from "@/components/home/AppTicker";
import { HomeHero } from "@/components/home/HomeHero";
import { articles } from "@/lib/content";
import { loanApps } from "@/lib/loan-apps";
import { site, whatsappDisplay, whatsappLink } from "@/lib/site";

export const metadata = { alternates: { canonical: "/" } };

const stats = [
  { icon: Layers, value: String(loanApps.length), label: "Loan apps covered" },
  { icon: Footprints, value: "3", label: "Simple steps" },
  { icon: Gift, value: "Free", label: "First consultation" },
  { icon: BookOpen, value: String(articles.length), label: "Free clearance guides" },
];

const reasons = [
  {
    icon: Clock,
    title: "Quick & Simple",
    text: "Tell us about your loan in about two minutes. A consultant reviews it and explains your options in plain language.",
  },
  {
    icon: Gift,
    title: "Free First Consultation",
    text: "Your first consultation is free and places you under no obligation. Decide only after you understand your options.",
  },
  {
    icon: FileText,
    title: "Transparent Fees",
    text: "If you choose our help, the scope and the fee are set out in writing before any work begins. No surprises.",
  },
  {
    icon: Lock,
    title: "Private & Secure",
    text: "Your details are handled confidentially. We never ask for your PIN, password, OTP or full card number.",
  },
];

const steps = [
  {
    title: "Request a Consultation",
    text: "Fill in the short form or message us on WhatsApp with the basics: your loan, the lender and where it stands.",
  },
  {
    title: "Share Your Documents",
    text: "We review your statements and payment records and explain the realistic route to closing the loan.",
  },
  {
    title: "Get Your Clearance",
    text: "You pay your lender directly and we follow up until you have the clearance letter and an updated record.",
  },
];

export default function HomePage() {
  const channels = [
    { icon: MessageCircle, label: "WhatsApp", value: whatsappDisplay, href: whatsappLink(), external: true },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: "Office", value: site.address },
  ];

  return (
    <>
      <HomeHero />
      <AppTicker />

      {/* Stats */}
      <section className="bg-white py-14 sm:py-16">
        <ul className="container-x grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <li key={s.label} className="rounded-2xl border border-line bg-white p-6 text-center shadow-card">
              <s.icon size={30} className="mx-auto text-brand" aria-hidden="true" />
              <p className="mt-3 text-3xl font-extrabold text-brand-dark sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-muted">{s.label}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Why choose */}
      <section className="section bg-surface">
        <div className="container-x">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="h-section">Why Choose ByeByeLoan?</h2>
            <p className="lead mt-3">Fast, honest and reliable loan clearance help</p>
          </div>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2">
            {reasons.map((r) => (
              <div key={r.title} className="rounded-2xl border border-line bg-white p-7 shadow-card transition-shadow hover:shadow-float">
                <span className="icon-tile">
                  <r.icon size={24} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{r.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section bg-white">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-brand-soft px-4 py-1.5 text-sm font-bold text-brand-ink">About Us</span>
            <h2 className="h-section mt-4">Your Trusted Loan Clearance Partner in Pakistan</h2>
            <p className="lead mt-5">
              ByeByeLoan is an independent service that helps individuals in Pakistan close loans properly. We are
              not a bank or a lender, and we do not give loans.
            </p>
            <p className="mt-4 leading-relaxed text-ink">
              Whether your loan is with a bank or one of {loanApps.length} digital lending apps, we help you confirm what
              you owe, communicate with your lender, and follow through until you have a clearance letter and an
              accurate credit record.
            </p>
            <ul className="mt-7 flex flex-wrap justify-center gap-3">
              {["100% Online Process", "Quick Response", "Secure & Confidential"].map((p) => (
                <li
                  key={p}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-brand-dark shadow-card"
                >
                  <Check size={15} strokeWidth={3} className="text-brand-ink" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <AboutScreens />
        </div>
      </section>

      {/* Process */}
      <section className="section bg-surface">
        <div className="container-x">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="h-section">Simple Clearance Process</h2>
            <p className="lead mt-3">Clear your loan in just 3 easy steps</p>
          </div>
          <ol className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-line bg-white p-7 shadow-card">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-ink text-lg font-extrabold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <Link href="/how-it-works" className="link-arrow">
              See the full clearance process <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="section bg-white">
        <div className="container-x">
          <div className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-b from-surface to-white px-6 py-12 text-center shadow-float sm:px-12">
            <ShieldCheck size={44} className="mx-auto text-brand" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl">Privacy Policy</h2>
            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted">
              Your data security and privacy are our top priorities. Learn how we protect your information.
            </p>
            <Link href="/privacy-policy" className="btn mt-6 bg-orange-ink text-white hover:bg-orange-hover">
              View Privacy Policy <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Official contact channels */}
      <section className="section bg-surface">
        <div className="container-x">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <Smartphone size={40} className="mx-auto text-brand" aria-hidden="true" />
            <h2 className="h-section mt-3">Official Contact Channels</h2>
            <p className="lead mt-3">These are our only official contact details. Please verify before you respond.</p>
          </div>
          <ul className="mx-auto grid max-w-4xl grid-cols-1 gap-4 rounded-3xl border border-line bg-white p-5 shadow-card sm:grid-cols-2 sm:p-8">
            {channels.map((c, i) => (
              <li key={c.label} className="flex items-center gap-4 rounded-2xl border border-line p-4">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-sm font-extrabold text-brand-ink">
                  {i + 1}
                </span>
                <c.icon size={22} className="shrink-0 text-brand" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-sm text-muted">{c.label}</p>
                  {c.href ? (
                    <a
                      href={c.href}
                      {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="font-bold break-words text-brand-dark hover:text-brand-ink"
                    >
                      {c.value}
                      {c.external && <span className="sr-only"> (opens in a new tab)</span>}
                    </a>
                  ) : (
                    <p className="font-bold text-brand-dark">{c.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-6 flex max-w-4xl items-start gap-3 rounded-xl border border-notice-border/60 bg-notice px-5 py-4 text-sm text-notice-ink">
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-notice-icon" aria-hidden="true" />
            If someone contacts you claiming to be ByeByeLoan from any other number, or asks you to pay into a personal
            account, do not pay. Please report it to us immediately.
          </p>
        </div>
      </section>
    </>
  );
}
