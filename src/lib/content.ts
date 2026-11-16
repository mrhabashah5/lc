import { guides, type Article } from "@/content/articles";

export type { Article } from "@/content/articles";
export { readMinutes, articleWordCount } from "@/content/articles";

// Site copy lives here so pages stay consistent with one another.

export const trustPoints = [
  { icon: "lock", title: "Confidential", text: "Your details are handled privately and never sold." },
  { icon: "file", title: "Written terms", text: "Scope and fees are explained in writing before you commit." },
  { icon: "scale", title: "Honest guidance", text: "No guaranteed-outcome promises. Just clear, realistic options." },
  { icon: "map", title: "Pakistan focused", text: "Built around local lenders, documents and processes." },
] as const;

export const coreServices = [
  {
    icon: "handshake",
    title: "Loan Settlement Assistance",
    href: "/loan-settlement",
    text: "If repayments have become unmanageable, we help you understand your options, prepare your case and communicate with your lender about a possible settlement.",
  },
  {
    icon: "badge",
    title: "Loan Clearance Assistance",
    href: "/loan-clearance",
    text: "Paid off or settled a loan? We help you follow up for your clearance letter (NOC), the release of documents and the correct update of your credit record.",
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
    text: "Tell us about your loan and your situation using our short online form, by phone or on WhatsApp.",
  },
  {
    title: "We review your situation",
    text: "A consultant looks at your details, explains where you stand and talks you through the realistic options.",
  },
  {
    title: "Move forward with a clear plan",
    text: "If you choose to proceed, we agree the scope in writing and assist you through settlement or clearance.",
  },
] as const;

export const serviceTabs = [
  {
    id: "personal",
    label: "Personal Loans",
    title: "Personal loan settlement and clearance",
    text: "Unsecured personal loans are among the most common sources of repayment pressure. We help you organise your case and approach your bank in a structured way.",
    points: [
      "Review of your outstanding balance, mark-up and charges",
      "Preparing a clear hardship and repayment-capacity summary",
      "Assistance in communicating a settlement request to your lender",
      "Follow-up for a written settlement letter and final clearance",
    ],
  },
  {
    id: "cards",
    label: "Credit Cards",
    title: "Credit card dues",
    text: "Card balances can grow quickly once payments are missed. We help you understand the statement and explore whether a settlement or a restructured plan is realistic.",
    points: [
      "Plain-language explanation of your statement and charges",
      "Help preparing a settlement or restructuring request",
      "Guidance on getting any agreed terms confirmed in writing",
      "Follow-up for card closure confirmation and clearance letter",
    ],
  },
  {
    id: "auto",
    label: "Auto Finance",
    title: "Auto finance and leasing",
    text: "Whether you are behind on instalments or have finished paying, vehicle finance involves extra paperwork. We help you keep it on track.",
    points: [
      "Review of your finance or lease agreement and payment history",
      "Assistance with early-termination and settlement queries",
      "Follow-up for the NOC and release of original vehicle documents",
      "Guidance on removing the lender's lien after clearance",
    ],
  },
  {
    id: "home",
    label: "Home Finance",
    title: "Home finance",
    text: "Property-backed finance carries higher stakes. We help you prepare properly before you speak to your lender and after you have paid.",
    points: [
      "Review of your facility letter, schedule and outstanding position",
      "Help preparing restructuring or settlement requests",
      "Follow-up for clearance and release of title documents",
      "Guidance on when independent legal advice is advisable",
    ],
  },
  {
    id: "business",
    label: "Business Loans",
    title: "Small business and SME loans",
    text: "For sole proprietors and small business owners with personal exposure, we help present the situation clearly and pursue a workable outcome.",
    points: [
      "Summary of facilities, securities and personal guarantees",
      "Help preparing a repayment-capacity statement",
      "Assistance in communicating with the lender's recovery team",
      "Follow-up for written settlement terms and clearance",
    ],
  },
  {
    id: "micro",
    label: "Microfinance & Apps",
    title: "Microfinance and digital lending",
    text: "Small loans from microfinance banks and lending apps can still cause real stress. We help you understand what you actually owe and how to close it properly.",
    points: [
      "Checking the amount claimed against your records",
      "Guidance on dealing with repeated recovery contact",
      "Help requesting written confirmation once a loan is closed",
      "Information on the official complaint channels available to you",
    ],
  },
] as const;

export const reasons = [
  {
    icon: "eye",
    title: "Clarity first",
    text: "We explain your position in plain language, including the downsides, before you decide anything.",
  },
  {
    icon: "file",
    title: "Transparent, written terms",
    text: "You see the scope of our assistance and our fee in writing before any engagement begins.",
  },
  {
    icon: "lock",
    title: "Private and respectful",
    text: "Financial difficulty is personal. Your information is treated confidentially and without judgement.",
  },
  {
    icon: "scale",
    title: "Realistic expectations",
    text: "Lenders make the final decision. We never promise a specific reduction, result or timeline.",
  },
  {
    icon: "users",
    title: "One point of contact",
    text: "A named consultant stays with your case, so you do not have to repeat your story.",
  },
  {
    icon: "check",
    title: "Follow-through to clearance",
    text: "We stay involved until the paperwork is complete, not just until an amount is agreed.",
  },
] as const;

export const faqs = [
  {
    q: "What does ByeByeLoan do?",
    a: "ByeByeLoan helps individuals in Pakistan who are dealing with loan repayment difficulties or who need to complete the clearance of a loan. We review your situation, explain your options, help you prepare your case and assist you in communicating with your lender.",
  },
  {
    q: "Is ByeByeLoan a bank or a lender?",
    a: "No. ByeByeLoan is an independent assistance service. We do not provide loans, we do not collect repayments on behalf of lenders, and we are not a law firm.",
  },
  {
    q: "Can you guarantee that my loan will be settled or reduced?",
    a: "No. Any settlement is a decision made by your lender, based on its own policies and your circumstances. We can help you present your case properly, but we cannot guarantee a result, a reduction or a timeline, and you should be cautious of anyone who does.",
  },
  {
    q: "What is the difference between loan settlement and loan clearance?",
    a: "Settlement is an agreement with a lender to close a loan, usually when the borrower cannot repay under the original terms. Clearance is the paperwork that follows any closure: the lender's written confirmation that nothing further is owed, the return of documents and the update of your credit record.",
  },
  {
    q: "Will a settlement affect my credit record?",
    a: "It can. A loan that is settled may be reported differently from a loan that was repaid in full, and this may affect future borrowing. We explain this before you decide so that you can weigh it against your other options.",
  },
  {
    q: "How much does a consultation cost?",
    a: "The initial consultation request is free and places you under no obligation. If you choose to engage us, the scope of work and the fee are set out in writing first.",
  },
  {
    q: "What information do I need to provide?",
    a: "To start, only basic details: the type of loan, an approximate outstanding amount and the current status. Please do not send passwords, PINs, OTPs or full card numbers. We will never ask for them.",
  },
  {
    q: "Should I stop paying my loan while I speak to you?",
    a: "We do not advise anyone to stop making payments. Missing payments can lead to additional charges, recovery action and damage to your credit record. If you are able to pay, continue to do so while you explore your options.",
  },
  {
    q: "Is my information kept confidential?",
    a: "Yes. We use your information only to respond to your request and to assist with your case, as described in our Privacy Policy.",
  },
  {
    q: "Which cities do you cover?",
    a: "Consultations are carried out by phone, WhatsApp and email, so we can assist individuals anywhere in Pakistan.",
  },
] as const;

/** All articles, in display order. */
export const articles: Article[] = guides;
