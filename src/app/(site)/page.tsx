import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";
import { HeroVisual } from "@/components/HeroVisual";
import { Icon, IconTile } from "@/components/Icon";
import { LoanAppsTeaser } from "@/components/LoanAppsTeaser";
import { CtaBand, SectionHeading, StepCards } from "@/components/Sections";
import { ServiceTabs } from "@/components/ServiceTabs";
import { articles, coreServices, reasons, trustPoints } from "@/lib/content";

export const metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden bg-white">
        <div className="container-x grid grid-cols-1 items-center gap-12 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16 lg:py-24">
          <div>
            <p className="eyebrow mb-4">Loan settlement &amp; clearance assistance</p>
            <h1 className="h-display lg:text-[4rem]">
              Get <span className="text-sky">Clarity.</span>
              <br />
              Find Your Way Forward.
            </h1>
            <p className="lead mt-6 max-w-xl text-xl">
              Professional loan settlement and clearance assistance for individuals in Pakistan.
            </p>
            <div className="mt-8 flex flex-col gap-x-7 gap-y-4 sm:flex-row sm:items-center">
              <Link href="/request-consultation" className="btn btn-primary px-8 py-4 text-lg">
                Request Consultation
              </Link>
              <Link href="/services" className="link-arrow text-lg">
                Explore Our Services <ArrowRight size={19} aria-hidden="true" />
              </Link>
            </div>
            <p className="mt-6 text-sm text-muted">Free initial consultation. No obligation.</p>
          </div>
          <HeroVisual />
        </div>
      </section>

      {/* Trust indicators */}
      <section aria-label="Why people trust ByeByeLoan" className="border-y border-line bg-surface">
        <ul className="container-x grid gap-x-8 gap-y-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((t) => (
            <li key={t.title} className="flex items-start gap-3.5">
              <Icon name={t.icon} size={26} className="mt-0.5 shrink-0 text-sky" />
              <div>
                <p className="font-bold text-navy">{t.title}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-muted">{t.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* What ByeByeLoan can do */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our services"
            title={
              <>
                What ByeByeLoan Can <span className="text-sky">Do For You</span>
              </>
            }
            text="Whether you are struggling with repayments or trying to close a loan properly, we help you understand where you stand and what to do next."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {coreServices.map((s) => (
              <div key={s.title} className="card flex flex-col transition-shadow hover:shadow-float">
                <IconTile name={s.icon} />
                <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted">{s.text}</p>
                <Link href={s.href} className="link-arrow mt-5">
                  Learn more<span className="sr-only"> about {s.title}</span>{" "}
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three-step process */}
      <section className="section bg-sky-light/25">
        <div className="container-x">
          <SectionHeading
            eyebrow="How it works"
            title={
              <>
                Three steps to a <span className="text-sky">clear plan</span>
              </>
            }
            text="A simple, structured process designed to replace uncertainty with a plan you understand."
          />
          <StepCards />
          <div className="mt-10 text-center">
            <Link href="/how-it-works" className="link-arrow">
              See the full process <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Service categories */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="Loan types"
            title={
              <>
                Help for the loan <span className="text-sky">you have</span>
              </>
            }
            text="Choose a category to see how we can assist."
          />
          <ServiceTabs />
        </div>
      </section>

      {/* Loan apps we cover */}
      <LoanAppsTeaser />

      {/* Financial education */}
      <section className="section border-y border-line bg-surface">
        <div className="container-x">
          <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow mb-3">Financial education</p>
              <h2 className="h-section">
                Understand your options <span className="text-sky">before you decide</span>
              </h2>
            </div>
            <Link href="/articles" className="link-arrow shrink-0">
              All articles <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {articles.slice(0, 3).map((a) => (
              <div key={a.slug} className="relative flex">
                <ArticleCard article={a} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="section bg-white">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-16">
          <div>
            <p className="eyebrow mb-3">Why choose ByeByeLoan</p>
            <h2 className="h-section">
              Straightforward help, <span className="text-sky">honestly delivered</span>
            </h2>
            <p className="lead mt-4">
              Debt problems attract big promises. We take the opposite approach: clear information,
              written terms and realistic expectations.
            </p>
            <Link href="/why-choose-byebyeloan" className="btn btn-secondary mt-7">
              Why ByeByeLoan
            </Link>
          </div>
          <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {reasons.map((r) => (
              <li key={r.title} className="flex items-start gap-4">
                <IconTile name={r.icon} />
                <div>
                  <h3 className="text-lg font-bold">{r.title}</h3>
                  <p className="mt-1 leading-relaxed text-muted">{r.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
