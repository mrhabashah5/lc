import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { whatsappLink, whatsappMessage } from "@/lib/site";

/** Large WhatsApp button that opens a chat with the standard pre-typed message. */
export function WhatsAppCta({
  message = whatsappMessage,
  label = "Chat with us on WhatsApp",
  variant = "primary",
  className = "",
}: {
  message?: string;
  label?: string;
  variant?: "primary" | "light";
  className?: string;
}) {
  const look =
    variant === "light"
      ? "bg-white text-brand-dark hover:bg-brand-soft"
      : "bg-cta text-white hover:bg-cta-hover";
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn ${look} w-full px-6 py-4 text-center text-lg leading-snug whitespace-normal shadow-float sm:w-auto sm:px-7 ${className}`}
    >
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
        <WhatsAppIcon size={20} />
      </span>
      {label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
