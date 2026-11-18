import { HeroIllustration } from "@/components/HeroIllustration";
import { loanApps } from "@/lib/loan-apps";
import { MiniCheck, PhoneFrame, ScreenBar } from "./PhoneFrame";

/** Five cards showing ByeByeLoan's real website features, drawn as phone screens. */
export function AboutScreens() {
  const apps = loanApps.filter((a) => a.logo).slice(0, 5);
  const cards = [
    {
      kicker: "Free first step",
      title: "Free consultation",
      screen: (
        <div className="space-y-2 p-3">
          <p className="text-[10px] font-bold text-brand-dark">Step 1 of 3 · Your details</p>
          {["Full name", "Mobile number", "City"].map((f) => (
            <div key={f} className="rounded-md border border-line bg-white px-2 py-1.5 text-[9px] text-muted">
              {f}
            </div>
          ))}
          <div className="rounded-md bg-cta py-1.5 text-center text-[9px] font-bold text-white">Continue</div>
        </div>
      ),
    },
    {
      kicker: "Clear in",
      title: "3 simple steps",
      screen: (
        <div className="space-y-2.5 p-3">
          <MiniCheck label="Request consultation" />
          <MiniCheck label="We review your case" />
          <MiniCheck done={false} label="Get your clearance" />
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
            <div className="h-full w-2/3 rounded-full bg-brand-ink" />
          </div>
        </div>
      ),
    },
    {
      kicker: `${loanApps.length} apps`,
      title: "Loan apps we cover",
      screen: (
        <div className="space-y-1.5 p-3">
          {apps.map((a) => (
            <div key={a.name} className="flex items-center gap-2 rounded-md bg-white px-2 py-1.5 shadow-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a.logo} alt="" width={16} height={16} className="h-4 w-4 rounded" />
              <span className="truncate text-[9px] font-semibold text-brand-dark">{a.name}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      kicker: "Proof on paper",
      title: "Clearance letter",
      screen: (
        <div className="p-3">
          <div className="rounded-md bg-white p-2.5 shadow-card">
            <p className="text-[9px] font-bold text-brand-dark">Clearance certificate (NOC)</p>
            <div className="mt-2 space-y-1">
              <div className="h-1 rounded bg-line" />
              <div className="h-1 w-4/5 rounded bg-line" />
              <div className="h-1 w-3/5 rounded bg-line" />
            </div>
            <p className="mt-2 inline-block rounded-full bg-brand-soft px-2 py-0.5 text-[8px] font-bold text-brand-ink">
              Nothing outstanding
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {cards.map((c) => (
        <li key={c.title} className="rounded-2xl bg-brand-ink p-3 pb-0 text-white shadow-card">
          <p className="text-center text-xs font-semibold text-white">{c.kicker}</p>
          <p className="mb-3 text-center text-base leading-tight font-extrabold text-white">{c.title}</p>
          <PhoneFrame className="mx-auto w-[85%] rounded-b-none border-b-0">
            <ScreenBar />
            <div className="h-40">{c.screen}</div>
          </PhoneFrame>
        </li>
      ))}
      <li className="col-span-2 flex flex-col overflow-hidden rounded-2xl bg-brand-soft shadow-card sm:col-span-1">
        <p className="mx-3 mt-3 rounded-lg bg-brand-ink py-1.5 text-center text-sm font-extrabold text-white">Respectful Support</p>
        <p className="mt-2 text-center text-sm font-semibold text-brand-dark">Private, judgement-free help</p>
        <HeroIllustration className="mt-auto h-auto w-full" />
      </li>
    </ul>
  );
}
