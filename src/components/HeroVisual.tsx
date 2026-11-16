import { BadgeCheck, ShieldCheck } from "lucide-react";
import { HeroIllustration } from "./HeroIllustration";

/** Home page hero: original illustration on a light-blue panel with floating benefit cards. */
export function HeroVisual() {
  return (
    <div className="relative mx-auto mt-6 w-full max-w-md sm:mt-0 lg:max-w-lg">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-sky-light">
        <div aria-hidden="true" className="absolute -top-20 -right-16 h-64 w-64 rounded-full bg-white/45" />
        <div aria-hidden="true" className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-sky-brand/15" />
        <HeroIllustration className="relative block h-auto w-full" />
      </div>

      {/* Floating benefit cards */}
      <div
        aria-hidden="true"
        className="absolute -top-5 -left-2 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-float sm:top-8 sm:-left-8"
      >
        <span className="icon-tile h-10 w-10">
          <ShieldCheck size={20} />
        </span>
        <div>
          <p className="text-sm font-extrabold whitespace-nowrap text-navy">Confidential</p>
          <p className="text-sm whitespace-nowrap text-muted">Private consultation</p>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute -right-2 -bottom-5 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-float sm:bottom-10 sm:-right-6"
      >
        <span className="icon-tile h-10 w-10">
          <BadgeCheck size={20} />
        </span>
        <div>
          <p className="text-sm font-extrabold whitespace-nowrap text-navy">No obligation</p>
          <p className="text-sm whitespace-nowrap text-muted">Decide after you understand</p>
        </div>
      </div>
    </div>
  );
}
