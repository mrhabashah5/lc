import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { legalNav, shortDisclaimer, site, telLink, whatsappLink } from "@/lib/site";

const company = [
  { href: "/about", label: "About Us" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/why-choose-byebyeloan", label: "Why Choose ByeByeLoan" },
  { href: "/articles", label: "Financial Education" },
  { href: "/tools", label: "Free Loan Tools" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact Us" },
];

const services = [
  { href: "/services", label: "Our Services" },
  { href: "/loan-settlement", label: "Loan Settlement" },
  { href: "/loan-clearance", label: "Loan Clearance" },
  { href: "/loan-apps", label: "Loan Apps We Cover" },
  { href: "/request-consultation", label: "Request Consultation" },
];

function Col({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="mb-4 text-sm font-bold tracking-widest text-white uppercase">{title}</h2>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="inline-block py-1 text-[15px] text-sky-light transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="on-dark bg-navy text-white">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo onDark />
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-white/80">{site.description}</p>
        </div>
        <Col title="Company" links={company} />
        <Col title="Services" links={services} />
        <div>
          <h2 className="mb-4 text-sm font-bold tracking-widest text-white uppercase">Get in touch</h2>
          <ul className="space-y-3 text-[15px] text-sky-light">
            <li>
              <a href={telLink} className="inline-flex items-center gap-2.5 hover:text-white">
                <Phone size={17} aria-hidden="true" /> {site.phone}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 hover:text-white"
              >
                <MessageCircle size={17} aria-hidden="true" /> WhatsApp us<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5 hover:text-white">
                <Mail size={17} aria-hidden="true" /> {site.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5 text-white/80">
              <MapPin size={17} className="mt-0.5 shrink-0" aria-hidden="true" /> {site.address}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container-x py-8">
          <p className="text-sm leading-relaxed text-white/70">
            <strong className="text-white">Important:</strong> {shortDisclaimer}
          </p>
          <div className="mt-6 flex flex-col gap-4 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {legalNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-block py-1 text-sky-light hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
