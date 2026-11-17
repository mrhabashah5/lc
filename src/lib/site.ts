export const site = {
  name: "ByeByeLoan",
  tagline: "Get Clarity. Find Your Way Forward.",
  description:
    "Professional loan settlement and clearance assistance for individuals in Pakistan.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://byebyeloan.online",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+92 300 0000000",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923000000000",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@byebyeloan.online",
  address: process.env.NEXT_PUBLIC_ADDRESS ?? "Office address, City, Pakistan",
  hours: "Monday to Saturday, 10:00 am – 6:00 pm (PKT)",
};

export function whatsappLink(message = "Hello ByeByeLoan, I would like to request a consultation.") {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const telLink = `tel:${site.phone.replace(/[^\d+]/g, "")}`;

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
