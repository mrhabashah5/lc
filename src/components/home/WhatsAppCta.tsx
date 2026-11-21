import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";

/**
 * Large WhatsApp button. Each placement sends its own pre-filled message,
 * so you can see in WhatsApp which part of the page a lead came from.
 */
export function WhatsAppCta({
  message,
  label = "Chat with us on WhatsApp",
  variant = "primary",
  className = "",
}: {
  message: string;
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
      <MessageCircle size={22} aria-hidden="true" />
      {label}
      <span className="sr-only"> (opens WhatsApp in a new tab)</span>
    </a>
  );
}
