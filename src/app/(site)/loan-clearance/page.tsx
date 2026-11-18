import type { Metadata } from "next";
import { ServiceDetail } from "@/components/ServiceDetail";
import { loanApps } from "@/lib/loan-apps";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Loan Clearance & NOC Help in Pakistan",
  description:
    "Paid off or settled a loan? We help you get your clearance letter (NOC), your original documents back and your credit record updated. Free consultation.",
  path: "/loan-clearance",
});

export default function LoanClearancePage() {
  return (
    <ServiceDetail
      crumb="Loan Clearance"
      path="/loan-clearance"
      serviceType="Loan clearance assistance"
      title="Loan clearance"
      highlight="assistance."
      intro="Paying the last instalment is not the final step. We help you make sure the loan is closed on paper as well."
      whatTitle="What is loan clearance?"
      what={[
        "Loan clearance is the paperwork that proves a loan is closed and that the lender has no further claim. It applies whether you repaid in full, repaid early or settled.",
        "It usually involves a clearance letter or no-objection certificate (NOC), the return of any original documents or security, and an accurate update of the account on your credit record. Without it, an old loan can cause problems years later.",
      ]}
      forWhom={[
        "You have repaid or settled a loan but never received a clearance letter",
        "Your lender still holds your original vehicle or property documents",
        "A closed loan still appears as outstanding or overdue on your credit record",
        "You are being contacted about a loan you believe is already closed",
      ]}
      callout={{
        title: "Loan taken through a mobile app?",
        text: `We provide clearance assistance for ${loanApps.length} digital lending apps in Pakistan, from personal loan apps to buy now, pay later.`,
        href: "/loan-apps",
        label: "See the apps we cover",
      }}
      helpTitle="How ByeByeLoan assists with clearance"
      help={[
        {
          title: "Checking what you have",
          text: "We review your payment receipts, settlement letter and any correspondence to confirm what has been paid and what is still missing.",
        },
        {
          title: "Requesting the clearance letter",
          text: "We help you prepare and submit a proper written request for a clearance letter or NOC, and follow it up.",
        },
        {
          title: "Release of documents and lien",
          text: "For secured finance, we guide you through getting original documents back and the lender's lien or charge removed.",
        },
        {
          title: "Credit record follow-up",
          text: "We help you ask the lender to update your credit record and explain how to raise a correction if the record is wrong.",
        },
      ]}
      knowTitle="What you should know"
      know={[
        "Only the lender can issue a clearance letter and only the lender can report updates to a credit bureau. We assist with the request and follow-up.",
        "An accurate record cannot be changed. If a loan was settled, it may continue to be shown as settled.",
        "Timeframes depend on the lender's internal process and cannot be guaranteed.",
        "If a lender does not respond to a valid request, official complaint channels are available, and we can explain how to use them.",
      ]}
      disclaimer="ByeByeLoan is not a bank, lender, credit bureau or law firm. We do not issue clearance letters and cannot alter credit records. We cannot guarantee the outcome or timing of any request made to a lender."
    />
  );
}
