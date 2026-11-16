import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with ByeByeLoan on WhatsApp (opens in a new tab)"
      className="fixed right-4 bottom-4 z-30 inline-flex items-center gap-2 rounded-full bg-navy px-4 py-3.5 text-sm font-bold text-white shadow-float transition-colors hover:bg-sky-ink sm:right-6 sm:bottom-6"
    >
      <MessageCircle size={22} aria-hidden="true" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
