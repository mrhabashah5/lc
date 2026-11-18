import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { appCategories, loanApps, type LoanApp } from "@/lib/loan-apps";

/** Apps in a category, one per logo (ZoodPay and ZoodMall share an icon). */
function appsIn(id: string) {
  const seen = new Set<string>();
  return loanApps.filter((a) => {
    if (a.category !== id || !a.logo || seen.has(a.logo)) return false;
    seen.add(a.logo);
    return true;
  });
}

function Logo({ app, size }: { app: LoanApp; size: number }) {
  return (
    <Image
      src={app.logo!}
      alt=""
      width={size}
      height={size}
      unoptimized
      className="shrink-0 rounded-xl border border-line bg-white object-cover shadow-sm ring-2 ring-white"
      style={{ width: size, height: size }}
    />
  );
}

/** Overlapping stack of app icons with a "+N" counter. */
function LogoStack({ apps, max = 4 }: { apps: LoanApp[]; max?: number }) {
  const shown = apps.slice(0, max);
  const extra = apps.length - shown.length;
  return (
    <div className="flex items-center -space-x-3" aria-hidden="true">
      {shown.map((a) => (
        <Logo key={a.name} app={a} size={48} />
      ))}
      {extra > 0 && (
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-sm font-bold text-brand-ink ring-2 ring-white">
          +{extra}
        </span>
      )}
    </div>
  );
}

const card =
  "group relative rounded-2xl border border-line bg-white p-6 shadow-card transition-shadow hover:shadow-float";

/** Home page section: the loan apps we help with, grouped by type of financing. */
export function AppCategoryWall() {
  const [featured, ...rest] = appCategories;
  const featuredApps = loanApps.filter((a) => a.category === featured.id);
  const count = (id: string) => loanApps.filter((a) => a.category === id).length;

  return (
    <section aria-labelledby="apps-wall-title" className="section border-y border-line bg-brand-mist">
      <div className="container-x">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow mb-2">Loan apps we cover</p>
            <h2 id="apps-wall-title" className="h-section">
              Help with loans from {loanApps.length} apps
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted">
              Personal loan apps, pay-later shopping, salary advances, business and education financing. Find your app
              and see how to close it properly.
            </p>
          </div>
          <Link href="/loan-apps" className="link-arrow">
            See all apps <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>

        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {/* Personal loan apps: the largest group, shown with names */}
          <li className={`${card} md:col-span-2 lg:row-span-2`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold">
                  <Link href="/loan-apps" className="after:absolute after:inset-0 group-hover:text-brand-ink">
                    {featured.label}
                  </Link>
                </h3>
                <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted">{featured.description}</p>
              </div>
              <span className="rounded-full bg-brand-soft px-3 py-1 text-sm font-bold text-brand-ink">
                {featuredApps.length} apps
              </span>
            </div>
            <ul className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
              {featuredApps.slice(0, 12).map((a) => (
                <li
                  key={a.name}
                  className="flex min-w-0 flex-col items-center gap-2 rounded-xl border border-line bg-surface/60 px-1.5 py-3 text-center"
                >
                  <Logo app={a} size={44} />
                  <span className="text-[13px] leading-tight font-semibold text-brand-dark">{a.name}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-ink">
              + {featuredApps.length - 12} more personal loan apps <ArrowRight size={15} aria-hidden="true" />
            </p>
          </li>

          {rest.map((c) => (
            <li key={c.id} className={card}>
              <LogoStack apps={appsIn(c.id)} />
              <h3 className="mt-5 text-lg font-bold">
                <Link href="/loan-apps" className="after:absolute after:inset-0 group-hover:text-brand-ink">
                  {c.label}
                </Link>
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{c.description}</p>
              <p className="mt-4 text-sm font-bold text-brand-ink">
                {count(c.id)} {count(c.id) === 1 ? "app" : "apps"}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-xs leading-relaxed text-muted">
          ByeByeLoan is an independent service and is not affiliated with, endorsed by or acting for any of these apps.
          App names and logos belong to their owners and are shown only to identify the loans we help clear.
        </p>
      </div>
    </section>
  );
}
