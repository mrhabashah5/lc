import type { Metadata } from "next";
import { ServiceDetail } from "@/components/ServiceDetail";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Loan Settlement Assistance in Pakistan",
  description:
    "Struggling with loan repayments? We help you understand your options, prepare your case and talk to your lender about a settlement. Free first consultation.",
  path: "/loan-settlement",
});

export default function LoanSettlementPage() {
  return (
    <ServiceDetail
      crumb="Loan Settlement"
      path="/loan-settlement"
      serviceType="Loan settlement assistance"
      title="Loan settlement"
      highlight="assistance."
      intro="When repayments are no longer manageable, a structured approach to your lender is better than silence. We help you take it."
      whatTitle="What is loan settlement?"
      what={[
        "A loan settlement is an agreement between you and your lender to close a loan on terms that differ from the original contract. It is usually considered when a borrower is in genuine financial difficulty and cannot continue with the agreed repayments.",
        "Whether to offer a settlement, and on what terms, is entirely the lender's decision. Our role is to help you understand your position, prepare a clear and honest case, and assist you in communicating it.",
      ]}
      forWhom={[
        "Your income has dropped or your expenses have risen and instalments are no longer affordable",
        "You have missed payments and are receiving recovery calls or letters",
        "You want to resolve the loan but do not know how to approach your lender",
        "You have been offered terms and want to understand them before agreeing",
      ]}
      helpTitle="How ByeByeLoan assists with settlement"
      help={[
        {
          title: "Reviewing your position",
          text: "We go through your statements and letters with you to establish what is owed, what has been charged and where the account stands.",
        },
        {
          title: "Explaining your options",
          text: "Settlement is not the only route. We explain alternatives such as restructuring or rescheduling, and the consequences of each.",
        },
        {
          title: "Preparing your case",
          text: "We help you put together a clear summary of your circumstances and repayment capacity to present to your lender.",
        },
        {
          title: "Assisting with communication",
          text: "With your written authorisation, we assist you in corresponding with the lender and keeping a proper record of what is discussed.",
        },
        {
          title: "Getting it in writing",
          text: "We help you make sure any terms offered are confirmed in writing by the lender before you make a payment.",
        },
        {
          title: "Following through to clearance",
          text: "Once you have paid, we help you follow up for the clearance letter and the update of your records.",
        },
      ]}
      knowTitle="What you should know before you decide"
      know={[
        "A settlement may be reported on your credit record differently from a loan repaid in full, which can affect future borrowing.",
        "Lenders are not obliged to agree to a settlement, and terms vary from case to case.",
        "We do not advise anyone to stop making payments. Missed payments can increase what you owe and lead to recovery action.",
        "Always make payments directly to your lender through its official channels and keep the receipts. ByeByeLoan does not collect loan repayments.",
      ]}
      disclaimer="ByeByeLoan is not a bank, lender or law firm. We cannot guarantee that a lender will agree to a settlement, or the amount or timing of any settlement. Where your matter involves court proceedings, you should seek advice from a qualified lawyer."
    />
  );
}
