import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { whatsappLink } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="home-whatsapp-floating fixed right-4 bottom-4 z-30 inline-flex items-center gap-2 rounded-full bg-brand-dark px-4 py-3.5 text-sm font-bold text-white shadow-float transition-colors hover:bg-brand-ink sm:right-6 sm:bottom-6"
    >
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
        <WhatsAppIcon size={20} />
      </span>
      <span className="hidden sm:inline" aria-hidden="true">Chat on WhatsApp</span>
      <span className="sr-only">Chat on WhatsApp (opens in a new tab)</span>
    </a>
  );
}
