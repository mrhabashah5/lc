import Link from "next/link";
import { AlertTriangle, Mail, MapPin, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { blogCategories, categoryPath } from "@/lib/blog";
import { legalNav, shortDisclaimer, site, whatsappDisplay, whatsappLink } from "@/lib/site";

const blog = [
  { href: "/blog", label: "All Posts" },
  ...blogCategories.map((c) => ({ href: categoryPath(c.slug), label: c.label })),
];

const help = [
  { href: "/services", label: "Our Services" },
  { href: "/loan-clearance", label: "Loan Clearance" },
  { href: "/loan-apps", label: "Loan Apps We Cover" },
  { href: "/tools", label: "Free Loan Tools" },
  { href: "/request-consultation", label: "Free Consultation" },
];

const company = [
  { href: "/about", label: "About Us" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/why-choose-byebyeloan", label: "Why Choose ByeByeLoan" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact Us" },
];

function Col({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="mb-4 text-sm font-bold tracking-widest text-white uppercase">{title}</h2>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="inline-block py-1 text-[15px] text-footer-muted transition-colors hover:text-white">
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
    <footer className="on-dark bg-footer text-white">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.2fr]">
        <div>
          <Logo onDark />
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-white/80">{site.description}</p>
        </div>
        <Col title="Blog" links={blog} />
        <Col title="Get Help" links={help} />
        <Col title="Company" links={company} />
        <div>
          <h2 className="mb-4 text-sm font-bold tracking-widest text-white uppercase">Get in touch</h2>
          <ul className="space-y-3 text-[15px] text-footer-muted">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 hover:text-white"
              >
                <MessageCircle size={17} aria-hidden="true" /> {whatsappDisplay} (WhatsApp)<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5 hover:text-white">
                <Mail size={17} aria-hidden="true" /> {site.email}
              </a>
            </li>
            {site.address && (<li className="flex items-start gap-2.5 text-white/80">
              <MapPin size={17} className="mt-0.5 shrink-0" aria-hidden="true" /> {site.address}
            </li>)}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container-x py-8">
          <div className="mb-6 flex gap-3 rounded-2xl border border-notice-border/40 bg-white/5 p-5">
            <AlertTriangle size={22} className="mt-0.5 shrink-0 text-notice-border" aria-hidden="true" />
            <div>
              <h2 className="text-base font-extrabold text-white">Clear Responsibly</h2>
              <p className="mt-1 text-sm leading-relaxed text-white/80">
                Always make loan payments directly to your lender through its official app, branch or account, and keep
                your receipts. {site.name} never collects loan repayments and never asks you to pay a personal account.
                Clearance letters are issued by your lender, so no result or timeline can be guaranteed.
              </p>
              <p className="mt-1.5 text-sm font-bold text-white">Your financial peace of mind is our priority.</p>
            </div>
          </div>
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
                  <Link href={l.href} className="inline-block py-1 text-footer-muted hover:text-white">
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
