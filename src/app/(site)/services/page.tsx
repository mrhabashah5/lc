import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IconTile } from "@/components/Icon";
import { CtaBand, DisclaimerNote, PageHero, SectionHeading } from "@/components/Sections";
import { ServiceTabs } from "@/components/ServiceTabs";
import { coreServices } from "@/lib/content";
import { shortDisclaimer } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Loan Settlement & Clearance Services",
  description:
    "Loan settlement assistance, loan clearance and NOC follow-up for personal loans, credit cards, car finance and loan apps in Pakistan. Free first consultation.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        path="/services"
        crumb="Our Services"
        eyebrow="Our services"
        title="Practical help with"
        highlight="settlement and clearance."
        intro="From the first conversation with your lender to the final clearance letter, we help you handle each stage properly."
      />

      <section className="section bg-white">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {coreServices.map((s) => (
            <div key={s.title} className="card flex flex-col">
              <IconTile name={s.icon} />
              <h2 className="mt-5 text-xl font-bold">{s.title}</h2>
              <p className="mt-3 flex-1 leading-relaxed text-muted">{s.text}</p>
              <Link href={s.href === "/services" ? "/request-consultation" : s.href} className="link-arrow mt-5">
                {s.href === "/services" ? "Request a consultation" : "Learn more"}
                <span className="sr-only"> about {s.title}</span>{" "}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-brand-soft/25">
        <div className="container-x">
          <SectionHeading
            eyebrow="Loan types"
            title="Assistance by type of loan"
            text="Each kind of finance has its own documents and process. Select yours to see how we help."
          />
          <ServiceTabs />
          <div className="mx-auto mt-10 max-w-3xl">
            <DisclaimerNote>{shortDisclaimer}</DisclaimerNote>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
