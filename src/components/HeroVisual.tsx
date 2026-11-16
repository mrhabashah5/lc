import { BadgeCheck, Check, FileText, ShieldCheck } from "lucide-react";

const rows = [
  { label: "Situation reviewed", done: true },
  { label: "Options explained", done: true },
  { label: "Clearance documented", done: false },
];

/** Original ByeByeLoan hero illustration: light-blue panel, plan card and floating benefit cards. */
export function HeroVisual() {
  return (
    <div className="relative mx-auto mt-4 w-full max-w-md sm:mt-0 lg:max-w-lg" aria-hidden="true">
      {/* Light blue illustration background */}
      <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-sky-light">
        <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/40" />
        <div className="absolute -bottom-20 -left-12 h-64 w-64 rounded-full bg-sky/20" />
        <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
          <path
            d="M-10 330 C 90 300, 130 230, 210 215 S 340 150, 420 60"
            fill="none"
            strokeWidth="3"
            strokeDasharray="2 12"
            strokeLinecap="round"
            className="stroke-navy/40"
          />
          <circle cx="352" cy="118" r="9" className="fill-orange" />
          <circle cx="352" cy="118" r="18" className="fill-orange/25" />
        </svg>

        {/* Plan card */}
        <div className="absolute top-1/2 left-1/2 w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-5 shadow-float sm:p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-white">
              <FileText size={20} />
            </span>
            <div>
              <p className="text-sm font-semibold text-muted">Your way forward</p>
              <p className="text-base font-extrabold text-navy">Clear plan</p>
            </div>
          </div>
          <ul className="space-y-3">
            {rows.map((r) => (
              <li key={r.label} className="flex items-center gap-2.5 text-sm font-semibold text-ink">
                <span
                  className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                    r.done ? "bg-sky text-white" : "border-2 border-sky-light bg-white"
                  }`}
                >
                  {r.done && <Check size={13} strokeWidth={3.5} />}
                </span>
                {r.label}
              </li>
            ))}
          </ul>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-line">
            <div className="h-full w-2/3 rounded-full bg-sky" />
          </div>
        </div>
      </div>

      {/* Floating benefit cards */}
      <div className="absolute -top-5 -left-2 sm:top-6 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-float sm:-left-8">
        <span className="icon-tile h-10 w-10">
          <ShieldCheck size={20} />
        </span>
        <div>
          <p className="text-sm font-extrabold text-navy">Confidential</p>
          <p className="text-sm text-muted">Private consultation</p>
        </div>
      </div>
      <div className="absolute -right-2 -bottom-5 sm:bottom-8 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-float sm:-right-6">
        <span className="icon-tile h-10 w-10">
          <BadgeCheck size={20} />
        </span>
        <div>
          <p className="text-sm font-extrabold text-navy">No obligation</p>
          <p className="text-sm text-muted">Decide after you understand</p>
        </div>
      </div>
    </div>
  );
}
