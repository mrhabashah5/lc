import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/Sections";
import { site, whatsappDisplay, whatsappLink } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us on WhatsApp or Email",
  description:
    "Contact SmartGuru on WhatsApp or by email for help with loan clearance, NOC letters or closing a loan app loan in Pakistan. Free first consultation.",
  path: "/contact",
});

export default function ContactPage() {
  const items = [
    { icon: MessageCircle, label: "WhatsApp", value: whatsappDisplay, href: whatsappLink(), external: true },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    ...(site.address ? [{ icon: MapPin, label: "Office", value: site.address }] : []),
    { icon: Clock, label: "Hours", value: site.hours },
  ];

  return (
    <>
      <PageHero
        path="/contact"
        crumb="Contact Us"
        eyebrow="Contact us"
        title="We are here"
        highlight="to help."
        intro="Have a question about our services? Get in touch using whichever method suits you."
      />
      <section className="section bg-white">
        <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-12">
          <div>
            <ul className="space-y-5">
              {items.map(({ icon: I, label, value, href, external }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="icon-tile">
                    <I size={22} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-bold tracking-widest text-muted uppercase">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="text-lg font-bold text-brand-dark hover:text-brand-ink"
                      >
                        {value}
                        {external && <span className="sr-only"> (opens in a new tab)</span>}
                      </a>
                    ) : (
                      <p className="text-lg font-semibold text-brand-dark">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl bg-brand-soft/30 p-6">
              <h2 className="text-lg font-extrabold">Need help with a loan?</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-ink">
                The consultation form gives us the details we need to help you faster.
              </p>
              <Link href="/request-consultation" className="btn btn-primary btn-sm mt-4">
                Request Consultation
              </Link>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
