import type { Metadata } from "next";
import { ClearanceChecklist } from "@/components/tools/ClearanceChecklist";
import { ToolPage } from "@/components/tools/ToolPage";

export const metadata: Metadata = {
  title: "Loan Clearance Checklist (Pakistan)",
  description:
    "Free step-by-step loan clearance checklist for personal loans, credit cards, car finance, home finance, loan apps and settled loans in Pakistan. Tick off each step and print it.",
  alternates: { canonical: "/tools/clearance-checklist" },
};

export default function Page() {
  return (
    <ToolPage
      slug="clearance-checklist"
      title="Loan clearance"
      highlight="checklist."
      quickAnswer="Choose your type of loan and follow the steps in order: get the final figure in writing, pay through official channels, request a clearance letter (NOC) and check it, then complete any extra steps such as lien removal for car finance. Tick each step as you go and print the list to keep with your documents."
      related={[
        { href: "/articles/loan-clearance-certificate-noc-pakistan", label: "How to get a loan clearance certificate (NOC)" },
        { href: "/articles/remove-bank-lien-car-registration-pakistan", label: "Remove the bank's name from your car registration" },
        { href: "/articles/close-loan-app-loan-pakistan", label: "How to close a loan app loan" },
      ]}
      howItWorks={[
        {
          heading: "Why a checklist helps",
          paragraphs: [
            "Most clearance problems come from a missed step: a small balance left unpaid, a clearance letter never requested, original documents not collected or a lien never removed. Working through a checklist makes sure each step is done and documented.",
            "Your ticks are not saved after you leave the page, so print the checklist or keep notes alongside your documents.",
          ],
        },
      ]}
      faqs={[
        {
          q: "Does completing the checklist guarantee my loan is cleared?",
          a: "No. Only your lender can confirm closure and issue a clearance letter. The checklist helps you make sure nothing is missed.",
        },
        {
          q: "Is my progress saved?",
          a: "No. Nothing is stored or sent to ByeByeLoan. Use the print button to keep a copy.",
        },
      ]}
    >
      <ClearanceChecklist />
    </ToolPage>
  );
}
