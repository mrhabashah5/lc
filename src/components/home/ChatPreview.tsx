import { CheckCheck } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { site } from "@/lib/site";

const messages = [
  { from: "you", text: "Hi, I paid off my loan app loan but I never got a clearance letter." },
  { from: "us", text: "No problem. Please send the lender's name and your last payment receipt." },
  { from: "us", text: "We'll help you ask the lender for your clearance letter (NOC)." },
  { from: "you", text: "Great, sending it now. Thank you!" },
] as const;

/** Example WhatsApp conversation shown in the hero. Decorative; the page text says the same thing. */
export function ChatPreview() {
  return (
    <figure className="mx-auto w-full max-w-sm" aria-hidden="true">
      <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-float">
        <div className="flex items-center gap-3 bg-brand-dark px-4 py-3 text-white">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white">
            <WhatsAppIcon size={22} />
          </span>
          <div>
            <p className="text-sm font-bold">{site.name}</p>
            <p className="text-xs text-white/80">WhatsApp · Free first chat</p>
          </div>
        </div>
        <div className="space-y-2.5 bg-brand-mist px-4 py-5">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "you" ? "justify-end" : "justify-start"}`}>
              <p
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-snug shadow-card ${
                  m.from === "you" ? "rounded-br-md bg-brand-soft text-brand-dark" : "rounded-bl-md bg-white text-ink"
                }`}
              >
                {m.text}
                {m.from === "you" && <CheckCheck size={14} className="ml-1.5 inline text-brand-ink" />}
              </p>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">Example conversation</figcaption>
    </figure>
  );
}
