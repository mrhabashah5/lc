// Digital lending apps ByeByeLoan provides clearance assistance for.
// To add or remove an app, edit this list; every page reads from it.

export const appCategories = [
  {
    id: "personal",
    label: "Personal Loan Apps",
    description: "Mobile apps offering short-term personal loans, with the company behind each one.",
  },
  {
    id: "bnpl",
    label: "Buy Now, Pay Later",
    description: "Instalment and pay-later purchases made through shopping and payment apps.",
  },
  {
    id: "salary",
    label: "Salary Advance",
    description: "Apps that advance part of your salary before payday.",
  },
  {
    id: "business",
    label: "Business Financing",
    description: "Digital financing for shopkeepers, traders and small businesses.",
  },
  {
    id: "education",
    label: "Education Financing",
    description: "Apps that finance school, college and course fees.",
  },
] as const;

export type AppCategoryId = (typeof appCategories)[number]["id"];

export type LoanApp = {
  name: string;
  category: AppCategoryId;
  /** Lending company behind the app, where known. */
  company?: string;
  /** App icon from its official store listing, in /public/logos. */
  logo?: string;
  /** Short qualifier shown as a badge. */
  note?: string;
};

export const loanApps: LoanApp[] = [
  { name: "Paisayaar", logo: "/logos/paisayaar.jpg", company: "JingleCred Digital Financial Services", category: "personal" },
  { name: "Aitemaad", logo: "/logos/aitemaad.png", company: "4Sight Finance Services", category: "personal" },
  { name: "Hakeem", logo: "/logos/hakeem.png", company: "Walee Financial Services", category: "personal" },
  { name: "Fauri Cash", logo: "/logos/fauri-cash.jpg", company: "Pakisnova Microfinance", category: "personal" },
  { name: "SmartQarza", logo: "/logos/smartqarza.png", company: "Goldlion Financial", category: "personal" },
  { name: "Money Tap", logo: "/logos/money-tap.jpg", company: "Zanda Financials", category: "personal" },
  { name: "Pakcredit", logo: "/logos/pakcredit.png", company: "VisionCred Financial Services", category: "personal" },
  { name: "Daira", logo: "/logos/daira.png", company: "Finleap Financial Services", category: "personal" },
  { name: "Loan Lado", logo: "/logos/loan-lado.png", company: "Easy Finance", category: "personal" },
  { name: "CashBazar", logo: "/logos/cashbazar.png", company: "Bluesky Financial Services", category: "personal" },
  { name: "Sahara", logo: "/logos/sahara.png", company: "Awami Financials", category: "personal" },
  { name: "PaisaGhur", logo: "/logos/paisaghur.png", company: "Quark Financials Pakistan", category: "personal" },
  { name: "QarzMitra", logo: "/logos/qarzmitra.png", company: "Fintech Gharana Financial", category: "personal" },
  { name: "ForiQarz", logo: "/logos/foriqarz.png", company: "Foremost Financials Services", category: "personal" },
  { name: "Ishtirak", logo: "/logos/ishtirak.png", company: "Ishtirak Microfinance", category: "personal" },
  { name: "Fori Raqam", logo: "/logos/fori-raqam.png", company: "Original Khaata Financial Services", category: "personal" },

  { name: "QistBazaar", logo: "/logos/qistbazaar.jpg", category: "bnpl" },
  { name: "Baadmay", logo: "/logos/baadmay.png", category: "bnpl" },
  { name: "Alif Shop", logo: "/logos/alif-shop.png", category: "bnpl" },
  { name: "PalmPay", logo: "/logos/palmpay.png", category: "bnpl" },
  // ZoodPay and ZoodMall now share one official app ("ZOOD"), so they share its icon.
  { name: "ZoodPay", logo: "/logos/zood.png", category: "bnpl", note: "Outstanding dues only" },
  { name: "ZoodMall", logo: "/logos/zood.png", category: "bnpl", note: "Outstanding dues only" },

  { name: "NeemPaymenow", logo: "/logos/neempaymenow.png", category: "salary" },
  { name: "Nova Finance", logo: "/logos/nova-finance.png", category: "salary" },

  // Tijara is CreditBook's lending product and has no separate logo.
  { name: "Tijara", logo: "/logos/tijara.png", company: "CreditBook Financial Services", category: "business" },
  { name: "Digi Khata", logo: "/logos/digi-khata.png", category: "business" },
  {
    name: "Shaamilkar Tajir",
    logo: "/logos/shaamilkar-tajir.png",
    company: "Shaamilkar Financial Services",
    category: "business",
  },
  { name: "Bunyaad Finance", logo: "/logos/bunyaad-finance.png", category: "business" },

  { name: "Edufi", logo: "/logos/edufi.png", category: "education" },
  { name: "Taleem Connect", logo: "/logos/taleem-connect.png", category: "education" },
];

export function findLoanApp(name: string | undefined) {
  if (!name) return undefined;
  const n = name.trim().toLowerCase();
  return loanApps.find((a) => a.name.toLowerCase() === n);
}

export const consultationLinkFor = (app: LoanApp) =>
  `/request-consultation?app=${encodeURIComponent(app.name)}`;

export const appsDisclaimer =
  "ByeByeLoan is an independent service. We are not affiliated with, endorsed by or acting on behalf of any app or company listed here. App names, company names and logos are trademarks of their respective owners and are shown only to identify the loans we can assist with. A clearance can only be issued by the lender itself, and outcomes and timelines cannot be guaranteed.";
