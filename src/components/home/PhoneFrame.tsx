import { Check } from "lucide-react";
import { LogoMark } from "@/components/Logo";

/** A phone drawn in code, used for decorative screen mock-ups (no image files). */
export function PhoneFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-[2.2rem] border-[7px] border-ink bg-ink shadow-float ${className}`} aria-hidden="true">
      <div className="absolute top-2 left-1/2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-ink" />
      <div className="overflow-hidden rounded-[1.7rem] bg-surface">{children}</div>
    </div>
  );
}

/** Green app-style bar shown at the top of each mock screen. */
export function ScreenBar({ title = "ByeByeLoan" }: { title?: string }) {
  return (
    <div className="flex items-center gap-2 bg-brand-ink px-4 pt-7 pb-3 text-white">
      <LogoMark onDark size={18} />
      <span className="text-[11px] font-bold">{title}</span>
    </div>
  );
}

export function MiniCheck({ done = true, label }: { done?: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2 text-[10px] font-semibold text-ink">
      <span
        className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
          done ? "bg-brand-ink text-white" : "border-2 border-line bg-white"
        }`}
      >
        {done && <Check size={10} strokeWidth={4} />}
      </span>
      {label}
    </div>
  );
}
