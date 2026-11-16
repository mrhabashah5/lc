import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/Sections";
import { site, telLink, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact ByeByeLoan by phone, WhatsApp, email or our contact form.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const items = [
    { icon: Phone, label: "Phone", value: site.phone, href: telLink },
    { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: whatsappLink(), external: true },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: "Office", value: site.address },
    { icon: Clock, label: "Hours", value: site.hours },
  ];

  return (
    <>
      <PageHero
        crumb="Contact Us"
        eyebrow="Contact us"
        title="We are here"
        highlight="to help."
        intro="Have a question about our services? Get in touch using whichever method suits you."
      />
      <section className="section bg-white">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-12">
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
                        className="text-lg font-bold text-navy hover:text-sky-ink"
                      >
                        {value}
                        {external && <span className="sr-only"> (opens in a new tab)</span>}
                      </a>
                    ) : (
                      <p className="text-lg font-semibold text-navy">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl bg-sky-light/30 p-6">
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
