import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { CtaBand, PageHero } from "@/components/Sections";
import { faqs } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Loan Clearance & NOC FAQs for Pakistan",
  description:
    "Answers to common questions about loan clearance, NOC letters, consultations, loan apps, credit records and confidentiality for borrowers in Pakistan.",
  path: "/faqs",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqsPage() {
  return (
    <>
      <PageHero
        path="/faqs"
        crumb="FAQs"
        eyebrow="FAQs"
        title="Questions,"
        highlight="answered clearly."
        intro="If you cannot find what you are looking for, contact us and we will be glad to help."
      />

      <section className="section bg-white">
        <div className="container-x mx-auto max-w-3xl">
          <div className="space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-line bg-white shadow-card open:border-brand-soft"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl p-5 text-lg font-bold text-brand-dark sm:p-6 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <ChevronDown
                    size={22}
                    aria-hidden="true"
                    className="shrink-0 text-brand transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="px-5 pb-5 leading-relaxed text-ink sm:px-6 sm:pb-6">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-10 text-center text-muted">
            Still have a question?{" "}
            <Link href="/contact" className="link-arrow">
              Contact us
            </Link>
          </p>
        </div>
      </section>

      <CtaBand />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
