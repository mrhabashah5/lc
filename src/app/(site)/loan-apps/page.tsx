import type { Metadata } from "next";
import { IconTile } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { loanAppsItemList, serviceJsonLd } from "@/lib/schema";
import { LoanAppDirectory } from "@/components/LoanAppDirectory";
import { CtaBand, DisclaimerNote, PageHero, SectionHeading } from "@/components/Sections";
import { appCategories, appsDisclaimer, loanApps } from "@/lib/loan-apps";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Loan App Clearance Help in Pakistan",
  description:
    "Clearance help for loans from 31 digital lending apps in Pakistan, from personal loan apps to buy now, pay later. Find your app and request free help today.",
  path: "/loan-apps",
});

const help = [
  {
    icon: "eye",
    title: "Confirm what you owe",
    text: "We check the amount shown in the app against your own payment records before anything is paid.",
  },
  {
    icon: "check",
    title: "Close the loan properly",
    text: "We guide you through closing the loan using the lender's official payment channels only.",
  },
  {
    icon: "badge",
    title: "Get clearance in writing",
    text: "We help you request written confirmation from the lender that nothing further is owed.",
  },
  {
    icon: "file",
    title: "Follow up on your record",
    text: "We help you ask the lender to update your credit record once the loan is closed.",
  },
] as const;

export default function LoanAppsPage() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "Loan app clearance assistance",
          description: `Clearance help for loans taken through ${loanApps.length} digital lending apps in Pakistan.`,
          path: "/loan-apps",
          serviceType: "Loan clearance assistance",
        })}
      />
      <JsonLd data={loanAppsItemList()} />
      <PageHero
        path="/loan-apps"
        crumb="Loan Apps"
        eyebrow="Loan app clearance"
        title="Clearance help for"
        highlight="digital loan apps."
        intro={`We provide loan clearance assistance for ${loanApps.length} digital lending apps in Pakistan across ${appCategories.length} types of financing. Find yours below.`}
      />

      <section className="section bg-surface">
        <div className="container-x">
          <h2 className="sr-only">Find your loan app</h2>
          <LoanAppDirectory />
          <div className="mx-auto mt-12 max-w-3xl">
            <DisclaimerNote>{appsDisclaimer}</DisclaimerNote>
          </div>
        </div>
      </section>

      <section className="section border-t border-line bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="How we help"
            title={
              <>
                What clearance assistance <span className="text-brand">includes</span>
              </>
            }
            text="The same structured approach for every app on the list."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {help.map((h) => (
              <div key={h.title} className="card sm:p-6">
                <IconTile name={h.icon} />
                <h3 className="mt-5 text-lg font-bold">{h.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Is your loan with one of these apps?"
        text="Request a free, no-obligation consultation and we will explain how clearance works for your loan."
      />
    </>
  );
}
