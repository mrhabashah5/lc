import { guides, type Article } from "@/content/articles";

export type { Article } from "@/content/articles";
export { readMinutes, articleWordCount } from "@/content/articles";

// Site copy lives here so pages stay consistent with one another.

export const trustPoints = [
  { icon: "lock", title: "Confidential", text: "Your details are handled privately and never sold." },
  { icon: "file", title: "Free first consultation", text: "Talk to us about your loan with no cost and no obligation." },
  { icon: "scale", title: "Honest guidance", text: "No guaranteed-outcome promises. Just clear, realistic information." },
  { icon: "map", title: "Pakistan focused", text: "Built around local lenders, documents and processes." },
] as const;

export const coreServices = [
  {
    icon: "badge",
    title: "Loan Clearance Assistance",
    href: "/loan-clearance",
    text: "Paid off a loan? We help you follow up with your lender for the clearance letter (NOC) and the return of your original documents.",
  },
  {
    icon: "handshake",
    title: "Loan App Loans",
    href: "/loan-apps",
    text: "Closing a loan taken through a mobile app? We help you check the final amount, pay only through official channels and get written confirmation.",
  },
  {
    icon: "compass",
    title: "Guidance & Documentation",
    href: "/services",
    text: "Not sure where you stand? We review your paperwork, explain it in plain language and outline sensible next steps before you decide anything.",
  },
] as const;

export const steps = [
  {
    title: "Request a consultation",
    text: "Tell us about your loan and what paperwork you need using our short online form or on WhatsApp.",
  },
  {
    title: "We review your documents",
    text: "A consultant checks your payment records and explains what is still needed to show the loan is closed.",
  },
  {
    title: "Get your clearance paperwork",
    text: "You deal with your lender directly, and we help you follow up until the clearance letter and documents arrive.",
  },
] as const;

export const serviceTabs = [
  {
    id: "personal",
    label: "Personal Loans",
    title: "Personal loan clearance",
    text: "Once a personal loan is paid off, the lender should confirm it in writing. We help you make sure nothing is left open.",
    points: [
      "Checking your final payoff figure and payment receipts",
      "Confirming the last payment has been recorded by the lender",
      "Help requesting the clearance letter (NOC)",
      "Guidance on checking your credit report shows the loan as closed",
    ],
  },
  {
    id: "cards",
    label: "Credit Cards",
    title: "Credit card closure",
    text: "Paying a card to zero does not always close it. We help you close the account properly and get confirmation in writing.",
    points: [
      "Plain-language explanation of your final statement and charges",
      "Help requesting card cancellation and account closure",
      "Follow-up for a zero-balance confirmation and clearance letter",
      "Guidance on checking the card shows as closed on your report",
    ],
  },
  {
    id: "auto",
    label: "Auto Finance",
    title: "Auto finance and leasing",
    text: "When you finish paying for a car, extra paperwork is needed before it is fully yours. We help you keep it on track.",
    points: [
      "Review of your finance or lease agreement and payment history",
      "Help requesting a written early-payoff figure from the lender",
      "Follow-up for the NOC and release of original vehicle documents",
      "Guidance on removing the lender's lien from the registration",
    ],
  },
  {
    id: "home",
    label: "Home Finance",
    title: "Home finance",
    text: "Property-backed finance needs careful paperwork once it is repaid. We help you get every document back.",
    points: [
      "Review of your facility letter, schedule and final payment",
      "Help requesting a written redemption figure",
      "Follow-up for clearance and release of title documents",
      "Guidance on when independent legal advice is advisable",
    ],
  },
  {
    id: "business",
    label: "Business Loans",
    title: "Small business and SME loans",
    text: "For sole proprietors and small business owners, closing a facility also means releasing securities and guarantees.",
    points: [
      "Summary of the facilities, securities and guarantees to be released",
      "Help requesting the clearance letter for each facility",
      "Follow-up for the return of pledged documents",
      "Guidance on confirming guarantees have been discharged",
    ],
  },
  {
    id: "micro",
    label: "Microfinance & Apps",
    title: "Microfinance and digital lending",
    text: "Small loans from microfinance banks and lending apps still need to be closed properly. We help you confirm what you owe and get proof once it is paid.",
    points: [
      "Checking the amount claimed against your records",
      "Paying only through the lender's official app or account",
      "Help requesting written confirmation once a loan is closed",
      "Information on the official complaint channels available to you",
    ],
  },
] as const;

export const reasons = [
  {
    icon: "eye",
    title: "Clarity first",
    text: "We explain your position in plain language, including what we cannot do, before you decide anything.",
  },
  {
    icon: "file",
    title: "You pay your lender directly",
    text: "We never collect loan repayments and never ask you to pay a personal account.",
  },
  {
    icon: "lock",
    title: "Private and respectful",
    text: "Your information is treated confidentially and without judgement.",
  },
  {
    icon: "scale",
    title: "Realistic expectations",
    text: "Lenders issue clearance letters on their own timelines. We never promise a specific result or date.",
  },
  {
    icon: "users",
    title: "One point of contact",
    text: "A named consultant stays with your case, so you do not have to repeat your story.",
  },
  {
    icon: "check",
    title: "Follow-through to clearance",
    text: "We stay involved until the paperwork is complete and your documents are back with you.",
  },
] as const;

export const faqs = [
  {
    q: "What does ByeByeLoan do?",
    a: "ByeByeLoan helps individuals in Pakistan complete the clearance of a loan. We review your payment records, explain what paperwork you need and help you follow up with your lender for the clearance letter (NOC) and the return of your documents.",
  },
  {
    q: "Is ByeByeLoan a bank or a lender?",
    a: "No. ByeByeLoan is an independent assistance service. We do not provide loans, we do not collect repayments on behalf of lenders, and we are not a law firm.",
  },
  {
    q: "Do you negotiate settlements or reduce loans?",
    a: "No. ByeByeLoan does not negotiate settlements, reduce debts or arrange repayment plans. We help with the clearance paperwork once a loan has been paid or closed with your lender.",
  },
  {
    q: "Can you guarantee when I will get my clearance letter?",
    a: "No. Clearance letters are issued by your lender on its own timeline. We help you request the letter properly and follow up, but we cannot guarantee a result or a date, and you should be cautious of anyone who does.",
  },
  {
    q: "What is the difference between loan settlement and loan clearance?",
    a: "Settlement is an agreement made between a borrower and a lender to close a loan on different terms. Clearance is the paperwork that follows any closure: the lender's written confirmation that nothing further is owed and the return of your documents.",
  },
  {
    q: "How much does a consultation cost?",
    a: "The first consultation is free and places you under no obligation.",
  },
  {
    q: "What information do I need to provide?",
    a: "To start, only basic details: the type of loan, the lender and whether it has been paid off. Please do not send passwords, PINs, OTPs or full card numbers. We will never ask for them.",
  },
  {
    q: "Should I stop paying my loan while I speak to you?",
    a: "No. We do not advise anyone to stop making payments. Missing payments can lead to additional charges, recovery action and damage to your credit record.",
  },
  {
    q: "Is my information kept confidential?",
    a: "Yes. We use your information only to respond to your request and to assist with your case, as described in our Privacy Policy.",
  },
  {
    q: "Which cities do you cover?",
    a: "Consultations are carried out on WhatsApp and by email, so we can assist individuals anywhere in Pakistan.",
  },
] as const;

/** All articles, in display order. */
export const articles: Article[] = guides;
