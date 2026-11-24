import type { Metadata } from "next";
import { LoanCalculator } from "@/components/tools/LoanCalculator";
import { ToolPage } from "@/components/tools/ToolPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Loan Repayment (EMI) Calculator Pakistan",
  description:
    "Free loan repayment (EMI) calculator for Pakistan. Enter the amount, mark-up rate and term to see your monthly instalment, total mark-up and full schedule.",
  path: "/tools/loan-repayment-calculator",
});

export default function Page() {
  return (
    <ToolPage
      slug="loan-repayment-calculator"
      title="Loan repayment"
      highlight="calculator."
      urdu="اپنی قسط اور کل رقم کا حساب خود لگائیں"
      quickAnswer="Enter your loan amount in rupees, the annual mark-up rate and the term in months. The calculator shows your monthly instalment, the total mark-up you will pay and a month-by-month schedule, using either the reducing-balance method most lenders use or a flat rate."
      related={[
        { href: "/blog/loan-clearance-certificate-noc-pakistan", label: "How to get a loan clearance certificate (NOC)" },
        { href: "/blog/check-credit-report-pakistan", label: "How to check your credit report in Pakistan" },
        { href: "/loan-apps", label: "Loan apps we cover" },
      ]}
      howItWorks={[
        {
          heading: "How the calculation works",
          paragraphs: [
            "With the reducing-balance method, mark-up is charged each month on the amount you still owe. Early instalments are mostly mark-up; later ones are mostly principal. This is how most bank loans and car finance in Pakistan are calculated.",
            "With a flat rate, mark-up is charged on the original amount for the whole term, so the total cost is higher than a reducing-balance loan with the same headline rate. If an offer quotes a flat rate, compare the total repayment, not just the rate.",
          ],
        },
        {
          heading: "What the calculator does not include",
          paragraphs: [
            "Real loans can include processing fees, insurance, taxes, late-payment charges and early-repayment fees. Lenders may also round figures differently. Always rely on the repayment schedule and key fact statement your lender gives you.",
          ],
        },
      ]}
      faqs={[
        {
          q: "What is the difference between reducing balance and flat rate?",
          a: "Reducing balance charges mark-up only on what you still owe, so the cost falls as you repay. Flat rate charges mark-up on the original amount for the whole term, which costs more for the same headline rate.",
        },
        {
          q: "Why is my lender's instalment slightly different?",
          a: "Lenders may add fees or insurance, use a different day count or round figures. Use the lender's own schedule for exact amounts.",
        },
        {
          q: "Is the information I enter saved?",
          a: "No. The calculation runs in your browser and nothing you enter is sent to SmartGuru.",
        },
      ]}
    >
      <LoanCalculator />
    </ToolPage>
  );
}
