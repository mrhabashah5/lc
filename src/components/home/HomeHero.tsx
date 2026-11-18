import Link from "next/link";
import { BadgeCheck, Check, FileCheck, Play, ShieldCheck } from "lucide-react";
import { MiniCheck, PhoneFrame, ScreenBar } from "./PhoneFrame";

const pills = ["Free first consultation", "Not a lender", "Confidential"];

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-mist via-brand-mist/60 to-white">
      <div aria-hidden="true" className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-white/60 blur-2xl" />
      <div aria-hidden="true" className="absolute top-20 -right-32 h-96 w-96 rounded-full bg-brand-soft/70 blur-3xl" />

      <div className="container-x relative grid grid-cols-1 items-center gap-14 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:py-24">
        <div>
          <h1 className="text-4xl leading-[1.1] font-extrabold text-brand-dark sm:text-5xl lg:text-[3.4rem]">
            Simple &amp; Honest
            <br />
            <span className="text-brand">Loan Clearance</span>
            <br />
            for Pakistan
          </h1>
          <p className="lead mt-6 max-w-xl">
            Paid off a loan? ByeByeLoan helps you close it properly on paper: the clearance letter (NOC), your
            original documents and written proof, for loans from banks and digital lending apps.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {pills.map((p) => (
              <li
                key={p}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-semibold text-brand-dark shadow-card"
              >
                <Check size={15} strokeWidth={3} className="text-brand-ink" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-x-6 gap-y-4 sm:flex-row sm:items-center">
            <Link href="/request-consultation" className="btn btn-primary px-7 py-4 text-lg">
              Get Clearance Help – Free Consultation <Play size={16} fill="currentColor" aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted">No obligation. We are an independent service, not a lender.</p>
        </div>

        {/* Phone mock-up with floating cards */}
        <div className="relative mx-auto w-full max-w-sm">
          <PhoneFrame className="mx-auto w-[16.5rem]">
            <ScreenBar />
            <div className="space-y-3 p-4">
              <div className="rounded-xl bg-white p-3 shadow-card">
                <p className="text-[10px] font-semibold text-muted">Loan paid off</p>
                <p className="mt-0.5 text-2xl font-extrabold text-brand-dark">Rs 50,000</p>
                <p className="text-[10px] text-muted">Personal loan app</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line">
                  <div className="h-full w-3/4 rounded-full bg-brand-ink" />
                </div>
                <p className="mt-1 text-right text-[9px] font-bold text-brand-ink">Paperwork 75% complete</p>
              </div>
              <div className="space-y-2 rounded-xl bg-white p-3 shadow-card">
                <MiniCheck label="Amount checked" />
                <MiniCheck label="Paid to lender" />
                <MiniCheck label="Clearance letter requested" />
                <MiniCheck done={false} label="Documents returned" />
              </div>
              <div className="rounded-xl bg-cta py-2.5 text-center text-[11px] font-bold text-white">Request consultation</div>
            </div>
          </PhoneFrame>

          <div className="absolute top-8 -left-4 flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 shadow-float sm:-left-14" aria-hidden="true">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-ink text-sm font-extrabold text-white">Rs</span>
            <div>
              <p className="text-[11px] text-muted">Any loan size</p>
              <p className="text-sm font-extrabold whitespace-nowrap text-brand-dark">Small to large</p>
            </div>
          </div>
          <div className="absolute top-1/2 -right-3 flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 shadow-float sm:-right-12" aria-hidden="true">
            <span className="icon-tile h-9 w-9">
              <FileCheck size={18} />
            </span>
            <div>
              <p className="text-[11px] text-muted">Clearance letter</p>
              <p className="text-sm font-extrabold whitespace-nowrap text-brand-dark">In writing</p>
            </div>
          </div>
          <div className="absolute -bottom-4 -left-2 flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 shadow-float sm:-left-10" aria-hidden="true">
            <span className="icon-tile h-9 w-9">
              <ShieldCheck size={18} />
            </span>
            <div>
              <p className="text-[11px] text-muted">Independent</p>
              <p className="text-sm font-extrabold whitespace-nowrap text-brand-dark">Not a lender</p>
            </div>
          </div>
          <BadgeCheck className="absolute -top-3 right-6 text-brand" size={34} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
