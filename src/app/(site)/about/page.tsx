import type { Metadata } from "next";
import { IconTile } from "@/components/Icon";
import { CtaBand, DisclaimerNote, PageHero, SectionHeading } from "@/components/Sections";
import { shortDisclaimer } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About SmartGuru | Independent Loan Clearance Help",
  absoluteTitle: true,
  description:
    "SmartGuru is an independent service helping people in Pakistan clear loans properly: checking what is owed, dealing with lenders and getting clearance letters.",
  path: "/about",
});

const values = [
  {
    icon: "eye",
    title: "Clarity",
    text: "We turn confusing statements, letters and terms into plain language so you can make informed decisions.",
  },
  {
    icon: "scale",
    title: "Honesty",
    text: "We tell you what is realistic, including what we cannot do. We do not sell guaranteed outcomes.",
  },
  {
    icon: "lock",
    title: "Respect",
    text: "Financial difficulty can happen to anyone. We treat every person and every case with dignity and privacy.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        path="/about"
        crumb="About Us"
        eyebrow="About SmartGuru"
        title="Helping people move forward"
        highlight="with clarity."
        intro="SmartGuru exists for one reason: dealing with a loan problem is far harder when you do not understand where you stand."
      />

      <section className="section bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="h-section">Who we are</h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink">
              <p>
                SmartGuru is an independent assistance service for individuals in Pakistan. We help
                people who have paid off a loan get the paperwork completed properly: the clearance
                letter, their original documents and proof that nothing more is owed.
              </p>
              <p>
                We are not a bank and we do not lend money. Our role is to sit on your side of the
                table: to review your records, explain what is still needed and help you follow up
                with your lender in an organised, documented way.
              </p>
            </div>
          </div>
          <div className="rounded-3xl bg-brand-soft/30 p-8 sm:p-10">
            <h2 className="text-2xl font-extrabold">Our mission</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink">
              To give every borrower a clear understanding of their position and a practical,
              honest path to resolving it.
            </p>
            <h2 className="mt-8 text-2xl font-extrabold">What we believe</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink">
              People make better decisions when they have accurate information, written terms and
              time to think. So that is what we provide.
            </p>
          </div>
        </div>
      </section>

      <section className="section border-y border-line bg-surface">
        <div className="container-x">
          <SectionHeading eyebrow="Our values" title="How we work" />
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="card">
                <IconTile name={v.icon} />
                <h3 className="mt-5 text-xl font-bold">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{v.text}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-3xl">
            <DisclaimerNote>{shortDisclaimer}</DisclaimerNote>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
