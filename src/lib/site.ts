export const site = {
  name: "ByeByeLoan",
  tagline: "Get Clarity. Find Your Way Forward.",
  description:
    "Professional loan settlement and clearance assistance for individuals in Pakistan.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://byebyeloan.online",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923101990325",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@byebyeloan.online",
  /** Real office address; leave unset to hide it everywhere (never show a placeholder). */
  address: process.env.NEXT_PUBLIC_ADDRESS ?? "",
  hours: "Monday to Saturday, 10:00 am – 6:00 pm (PKT)",
};

/** WhatsApp number formatted for display, e.g. +92 310 1990325. */
export const whatsappDisplay = site.whatsapp.replace(/^(92)(\d{3})(\d+)$/, "+$1 $2 $3");

export function whatsappLink(message = "Hello ByeByeLoan, I would like to request a consultation.") {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const mainNav = [
  { href: "/about", label: "About Us" },
  { href: "/how-it-works", label: "Clearance Process" },
  {
    href: "/services",
    label: "Services",
    children: [
      { href: "/services", label: "All Services" },
      { href: "/loan-settlement", label: "Loan Settlement" },
      { href: "/loan-clearance", label: "Loan Clearance" },
      { href: "/loan-apps", label: "Loan Apps We Cover" },
    ],
  },
  {
    href: "/articles",
    label: "Resources",
    children: [
      { href: "/articles", label: "Financial Education" },
      { href: "/tools", label: "Free Loan Tools" },
      { href: "/why-choose-byebyeloan", label: "Why Choose Us" },
      { href: "/faqs", label: "FAQs" },
    ],
  },
  { href: "/contact", label: "Contact" },
];

export const legalNav = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/complaints-policy", label: "Complaints Policy" },
  { href: "/cookie-policy", label: "Cookie Policy" },
];

export const shortDisclaimer =
  "ByeByeLoan is an independent assistance service. We are not a bank, lender or law firm, and we do not provide loans. Outcomes depend on your circumstances and on your lender's decision; no specific result, reduction or timeline is guaranteed.";
