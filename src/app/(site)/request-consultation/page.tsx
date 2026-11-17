import type { Metadata } from "next";
import { Clock, Lock, MessageCircle, Phone } from "lucide-react";
import { ConsultationForm } from "@/components/ConsultationForm";
import { DisclaimerNote, PageHero } from "@/components/Sections";
import { findLoanApp } from "@/lib/loan-apps";
import { shortDisclaimer, site, telLink, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Consultation",
  description:
    "Request a free, no-obligation consultation with ByeByeLoan about loan settlement or loan clearance in Pakistan. It takes about two minutes.",
  alternates: { canonical: "/request-consultation" },
};

type Props = { searchParams: Promise<{ app?: string | string[] }> };

export default async function RequestConsultationPage({ searchParams }: Props) {
  // Arriving from the loan apps directory: only a known app name is accepted.
  const { app } = await searchParams;
  const initialApp = findLoanApp(typeof app === "string" ? app : undefined)?.name;

  return (
    <>
      <PageHero
        crumb="Request Consultation"
        eyebrow="Free consultation"
        title="Request a"
        highlight="consultation."
        intro="Tell us a little about your situation. It takes about two minutes, and there is no obligation."
      />
      <section className="section bg-white">
        <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-12">
          <ConsultationForm key={initialApp ?? "none"} initialApp={initialApp} />
          <aside className="space-y-6 self-start">
            <div className="rounded-2xl bg-brand-soft/30 p-6">
              <h2 className="text-lg font-extrabold">What happens next</h2>
              <ul className="mt-4 space-y-4 text-[15px] leading-relaxed text-ink">
                <li className="flex gap-3">
                  <Clock size={20} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                  A consultant reviews your request and contacts you during business hours.
                </li>
                <li className="flex gap-3">
                  <Lock size={20} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                  Your details stay confidential. We never ask for PINs, passwords or OTPs.
                </li>
              </ul>
            </div>
            <div className="card sm:p-6">
              <h2 className="text-lg font-extrabold">Prefer to talk?</h2>
              <p className="mt-2 text-[15px] text-muted">{site.hours}</p>
              <div className="mt-4 flex flex-col gap-3">
                <a href={telLink} className="btn btn-secondary btn-sm">
                  <Phone size={17} aria-hidden="true" /> {site.phone}
                </a>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                  <MessageCircle size={17} aria-hidden="true" /> WhatsApp us<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </div>
            <DisclaimerNote>{shortDisclaimer}</DisclaimerNote>
          </aside>
        </div>
      </section>
    </>
  );
}
