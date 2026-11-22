import type { Metadata } from "next";
import { Check, X } from "lucide-react";
import { IconTile } from "@/components/Icon";
import { CtaBand, PageHero, SectionHeading } from "@/components/Sections";
import { reasons } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Why Choose SmartGuru for Loan Clearance Help",
  absoluteTitle: true,
  description:
    "Clear information, honest guidance and realistic expectations. See what SmartGuru will and will not do when helping you clear a loan in Pakistan.",
  path: "/why-choose-smartguru",
});

const will = [
  "Explain your situation and options in plain language",
  "Tell you honestly what we can and cannot help with",
  "Remind you to pay your lender only through official channels",
  "Keep your information confidential",
  "Stay with your case until the paperwork is complete",
];

const wont = [
  "Negotiate settlements, reduce debts or promise a timeline",
  "Advise you to stop paying your lender",
  "Ask for your PIN, password, OTP or full card number",
  "Collect loan repayments on a lender's behalf",
  "Claim we can erase accurate credit records",
];

export default function WhyPage() {
  return (
    <>
      <PageHero
        path="/why-choose-smartguru"
        crumb="Why Choose SmartGuru"
        eyebrow="Why choose SmartGuru"
        title="Straightforward help,"
        highlight="honestly delivered."
        intro="When you are under financial pressure, the last thing you need is another promise that does not hold. Here is how we are different."
      />

      <section className="section bg-white">
        <div className="container-x">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r) => (
              <div key={r.title} className="card">
                <IconTile name={r.icon} />
                <h2 className="mt-5 text-xl font-bold">{r.title}</h2>
                <p className="mt-3 leading-relaxed text-muted">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-brand-soft/25">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our commitments"
            title="What we will and will not do"
            text="Knowing the limits of a service is as important as knowing its benefits."
          />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="card">
              <h3 className="text-xl font-bold">We will</h3>
              <ul className="mt-5 space-y-4">
                {will.map((t) => (
                  <li key={t} className="flex items-start gap-3 font-medium text-ink">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                      <Check size={14} strokeWidth={3.5} aria-hidden="true" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold">We will not</h3>
              <ul className="mt-5 space-y-4">
                {wont.map((t) => (
                  <li key={t} className="flex items-start gap-3 font-medium text-ink">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-dark text-white">
                      <X size={14} strokeWidth={3.5} aria-hidden="true" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
