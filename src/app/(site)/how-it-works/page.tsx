import type { Metadata } from "next";
import { CtaBand, DisclaimerNote, PageHero, SectionHeading, StepCards } from "@/components/Sections";
import { shortDisclaimer } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "How Loan Clearance Works: 3 Simple Steps",
  description:
    "See how SmartGuru helps you clear a loan in 3 steps: request a consultation, share your documents and get your clearance letter. No obligation to proceed.",
  path: "/how-it-works",
});

const detail = [
  {
    title: "You tell us about your situation",
    text: "Complete the consultation form or message us on WhatsApp. We only need the basics at this stage: the type of loan, a rough amount and what is happening now.",
    you: "Share basic details. Never share PINs, passwords or OTPs.",
  },
  {
    title: "A consultant contacts you",
    text: "We get in touch using the contact method you chose, listen to your situation and ask a few questions to understand it properly.",
    you: "Have any statements or letters to hand if you can.",
  },
  {
    title: "We explain where you stand",
    text: "You receive a plain-language explanation of your position and the realistic options open to you, including the downsides of each.",
    you: "Ask anything. There is no pressure to proceed.",
  },
  {
    title: "We agree the scope in writing",
    text: "If you want our assistance, we set out exactly what we will do and what it will cost before any work begins.",
    you: "Read the terms and decide in your own time.",
  },
  {
    title: "We assist you through the process",
    text: "We help you prepare documents and communicate with your lender, and we keep you informed at each stage.",
    you: "Make any payments directly to your lender and keep receipts.",
  },
  {
    title: "We follow through to clearance",
    text: "After the loan is closed, we help you follow up for the clearance letter, release of documents and record update.",
    you: "Keep your clearance letter safe.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        path="/how-it-works"
        crumb="How It Works"
        eyebrow="How it works"
        title="A clear process,"
        highlight="from first call to clearance."
        urdu="تین آسان قدم: واٹس ایپ کریں، کاغذات بھیجیں اور NOC لیٹر لیں"
        intro="No jargon and no surprises. Here is exactly what happens when you contact SmartGuru."
      />

      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="At a glance" title="Three simple steps" />
          <StepCards />
        </div>
      </section>

      <section className="section border-y border-line bg-surface">
        <div className="container-x mx-auto max-w-4xl">
          <SectionHeading eyebrow="In detail" title="What to expect at each stage" />
          <ol className="relative space-y-6 before:absolute before:top-2 before:bottom-2 before:left-[21px] before:w-0.5 before:bg-brand-soft">
            {detail.map((d, i) => (
              <li key={d.title} className="relative flex gap-5">
                <span className="relative z-10 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-ink text-lg font-extrabold text-white">
                  {i + 1}
                </span>
                <div className="card flex-1 sm:p-6">
                  <h3 className="text-xl font-bold">{d.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{d.text}</p>
                  <p className="mt-3 text-sm font-semibold text-brand-dark">
                    <span className="text-brand-ink">Your part: </span>
                    {d.you}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <DisclaimerNote>{shortDisclaimer}</DisclaimerNote>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
