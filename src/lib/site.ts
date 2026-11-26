export const site = {
  name: "SmartGuru",
  tagline: "Get Clarity. Find Your Way Forward.",
  description:
    "Professional loan clearance assistance for individuals in Pakistan.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.smartguru.site",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923101990325",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@byebyeloan.online",
  /** Real office address; leave unset to hide it everywhere (never show a placeholder). */
  address: process.env.NEXT_PUBLIC_ADDRESS ?? "",
  hours: "Monday to Saturday, 10:00 am – 6:00 pm (PKT)",
};

/** WhatsApp number formatted for display, e.g. +92 310 1990325. */
export const whatsappDisplay = site.whatsapp.replace(/^(92)(\d{3})(\d+)$/, "+$1 $2 $3");

/**
 * Message already typed in the visitor's WhatsApp box when they tap a WhatsApp button.
 * A short Urdu form, so the first message already says which apps and how much.
 */
export const whatsappMessage = [
  "السلام علیکم! مجھے اپنے لون کا NOC لیٹر چاہیے۔",
  "لون ایپس کی تعداد: ",
  "ایپ کا نام اور رقم:",
  "1) ",
  "2) ",
  "قرض پورا ادا ہو چکا ہے: ہاں / نہیں",
].join(String.fromCharCode(10));

export function whatsappLink(message = whatsappMessage) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export type NavItem = { href: string; label: string; children?: { href: string; label: string }[] };

/** Menu entries that do not depend on blog data. The site layout adds the blog categories. */
export const helpNav: NavItem = {
  href: "/services",
  label: "Get Help",
  children: [
    { href: "/services", label: "Our Services" },
    { href: "/loan-clearance", label: "Loan Clearance" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/request-consultation", label: "Free Consultation" },
  ],
};

export const legalNav = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/complaints-policy", label: "Complaints Policy" },
  { href: "/cookie-policy", label: "Cookie Policy" },
];

export const shortDisclaimer =
  "SmartGuru is an independent assistance service. We are not a bank, lender or law firm, and we do not provide loans. Outcomes depend on your circumstances and on your lender's decision; no specific result, reduction or timeline is guaranteed.";
