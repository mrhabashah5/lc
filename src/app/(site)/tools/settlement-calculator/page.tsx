import type { Metadata } from "next";
import { SettlementCalculator } from "@/components/tools/SettlementCalculator";
import { ToolPage } from "@/components/tools/ToolPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Loan Settlement Offer Calculator",
  description:
    "Compare a loan settlement offer with your outstanding balance. See the difference in rupees and percent, each payment amount, and what to check first.",
  path: "/tools/settlement-calculator",
});

export default function Page() {
  return (
    <ToolPage
      slug="settlement-calculator"
      title="Settlement offer"
      highlight="calculator."
      quickAnswer="Enter your outstanding balance, the settlement amount your lender has offered in writing and how many payments it will be split into. The calculator shows how much less you would pay in rupees and percent, and the amount of each payment, so you can judge the offer clearly before you decide."
      related={[
        { href: "/articles/loan-settlement-vs-loan-clearance", label: "Loan settlement vs. loan clearance" },
        { href: "/articles/check-credit-report-pakistan", label: "How settlement can appear on your credit report" },
        { href: "/loan-settlement", label: "Loan settlement assistance" },
      ]}
      howItWorks={[
        {
          heading: "How to use the result",
          paragraphs: [
            "The calculator compares two numbers you already have: what the lender says you owe and what it has offered to accept. It does not predict what a lender will offer, and it cannot tell you whether an offer is the best available.",
            "A lower figure is not the only thing that matters. Consider whether you can make every payment on time, how the settlement will be reported to credit bureaus and whether the lender has confirmed the terms in writing.",
          ],
        },
        {
          heading: "Settlement and your credit record",
          paragraphs: [
            "A settled loan may be reported differently from a loan repaid in full, which can affect future applications for credit. Ask the lender exactly how the account will be reported before you accept, and request a clearance letter that refers to the settlement once you have paid.",
          ],
        },
      ]}
      faqs={[
        {
          q: "Can this calculator tell me what my lender will offer?",
          a: "No. Settlement offers are decided by lenders based on their own policies and your circumstances. The calculator only helps you understand an offer you already have.",
        },
        {
          q: "Should I accept a verbal settlement offer?",
          a: "Always get the terms in writing from the lender's official channel before paying anything.",
        },
        {
          q: "Is the information I enter saved?",
          a: "No. The calculation runs in your browser and nothing you enter is sent to ByeByeLoan.",
        },
      ]}
    >
      <SettlementCalculator />
    </ToolPage>
  );
}
