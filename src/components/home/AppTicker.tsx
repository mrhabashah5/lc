import Image from "next/image";
import Link from "next/link";
import { loanApps } from "@/lib/loan-apps";

function TickerRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 gap-3 pr-3" aria-hidden={hidden || undefined}>
      {loanApps.map((a) => (
        <li
          key={a.name}
          className="flex shrink-0 items-center gap-2.5 rounded-full border border-line bg-white py-1.5 pr-4 pl-1.5 shadow-card"
        >
          {a.logo ? (
            <Image src={a.logo} alt="" width={28} height={28} unoptimized className="h-7 w-7 rounded-full object-cover" />
          ) : (
            <span className="h-7 w-7 rounded-full bg-brand-soft" />
          )}
          <span className="text-sm font-semibold whitespace-nowrap text-brand-dark">{a.name}</span>
        </li>
      ))}
    </ul>
  );
}

/** Scrolling strip of the loan apps we provide clearance help for. Pauses on hover. */
export function AppTicker() {
  return (
    <section aria-labelledby="ticker-title" className="border-y border-line bg-white py-5">
      <div className="container-x mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="ticker-title" className="text-sm font-bold tracking-widest text-brand-ink uppercase">
          We help clear loans from {loanApps.length} apps
        </h2>
        <Link href="/loan-apps" className="text-sm font-semibold text-brand-ink underline-offset-4 hover:underline">
          See all apps
        </Link>
      </div>
      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          <TickerRow />
          <TickerRow hidden />
        </div>
      </div>
      <p className="container-x mt-3 text-xs text-muted">
        ByeByeLoan is an independent service and is not affiliated with, endorsed by or acting for any of these apps.
        App names and logos belong to their owners and are shown only to identify the loans we help clear.
      </p>
    </section>
  );
}
