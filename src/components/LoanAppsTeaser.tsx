import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AppAvatar } from "./LoanAppDirectory";
import { appCategories, loanApps } from "@/lib/loan-apps";

const SHOWN = 12;

/** Homepage section: a preview of the loan apps we cover, linking to the full directory. */
export function LoanAppsTeaser() {
  return (
    <section className="section bg-sky-light/25">
      <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-16">
        <div>
          <p className="eyebrow mb-3">Loan app clearance</p>
          <h2 className="h-section">
            Clearance help for <span className="text-sky">digital loan apps</span>
          </h2>
          <p className="lead mt-4">
            Took a loan through a mobile app? We provide clearance assistance for {loanApps.length}{" "}
            digital lending apps in Pakistan.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {appCategories.map((c) => (
              <li
                key={c.id}
                className="rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-semibold text-navy"
              >
                {c.label}
              </li>
            ))}
          </ul>
          <Link href="/loan-apps" className="btn btn-primary mt-8">
            Find Your Loan App <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>

        <div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {loanApps.slice(0, SHOWN).map((a, i) => (
              <li
                key={a.name}
                className={`items-center gap-3 rounded-xl border border-line bg-white p-3 shadow-card ${
                  i >= 8 ? "hidden sm:flex" : "flex"
                }`}
              >
                <AppAvatar name={a.name} index={i} logo={a.logo} />
                <span className="min-w-0 truncate font-bold text-navy">{a.name}</span>
              </li>
            ))}
          </ul>
          <Link href="/loan-apps" className="link-arrow mt-5">
            View all {loanApps.length} apps <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
