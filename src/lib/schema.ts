import { loanApps } from "./loan-apps";
import { site, whatsappLink } from "./site";

// Structured data (schema.org JSON-LD) shared across pages. Entities reference each other by @id.

export const orgId = `${site.url}/#organization`;
export const websiteId = `${site.url}/#website`;

const abs = (path: string) => (path.startsWith("http") ? path : `${site.url}${path === "/" ? "" : path}`);

export function organizationGraph() {
  const org: Record<string, unknown> = {
    "@type": ["Organization", "ProfessionalService"],
    "@id": orgId,
    name: site.name,
    alternateName: "Bye Bye Loan",
    url: site.url,
    logo: { "@type": "ImageObject", url: abs("/images/logo.png"), width: 512, height: 512 },
    image: abs("/images/og/default.png"),
    description:
      "Independent loan clearance assistance for individuals in Pakistan. Not a bank or lender; does not give loans or collect repayments.",
    slogan: site.tagline,
    email: site.email,
    areaServed: { "@type": "Country", name: "Pakistan" },
    knowsAbout: [
      "Loan clearance",
      "Loan clearance certificate (NOC)",
      "Digital lending apps in Pakistan",
      "Credit reports in Pakistan",
      "Vehicle lien removal after car finance",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: site.email,
        url: whatsappLink(),
        areaServed: "PK",
        availableLanguage: ["English"],
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "18:00",
      },
    ],
  };
  // Only publish an address once a real one is configured.
  if (site.address) {
    org.address = { "@type": "PostalAddress", streetAddress: site.address, addressCountry: "PK" };
  }
  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    url: site.url,
    name: site.name,
    inLanguage: "en-PK",
    publisher: { "@id": orgId },
  };
  return { "@context": "https://schema.org", "@graph": [org, website] };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
  };
}

export function serviceJsonLd({
  name,
  description,
  path,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${abs(path)}#service`,
    name,
    serviceType,
    description,
    url: abs(path),
    provider: { "@id": orgId },
    areaServed: { "@type": "Country", name: "Pakistan" },
    audience: { "@type": "Audience", audienceType: "Individual borrowers in Pakistan" },
  };
}

export function loanAppsItemList() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Loan apps ${site.name} provides clearance help for`,
    numberOfItems: loanApps.length,
    itemListElement: loanApps.map((a, i) => ({ "@type": "ListItem", position: i + 1, name: a.name })),
  };
}
