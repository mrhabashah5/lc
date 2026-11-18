export const tools = [
  {
    slug: "loan-repayment-calculator",
    title: "Loan Repayment Calculator",
    short: "Work out your monthly instalment, total mark-up and total repayment for any loan.",
    icon: "calculator",
  },
  {
    slug: "clearance-checklist",
    title: "Loan Clearance Checklist",
    short: "A step-by-step checklist for closing your loan properly, tailored to your type of loan.",
    icon: "list",
  },
] as const;

export type ToolSlug = (typeof tools)[number]["slug"];

export const pkr = (n: number) =>
  Number.isFinite(n)
    ? `Rs ${new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 }).format(Math.round(n))}`
    : "–";

export const toolDisclaimer =
  "These tools give estimates for general information only. They are not financial advice and do not represent an offer from any lender. Your lender's own figures, terms and decisions always apply.";
