"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { appCategories, consultationLinkFor, loanApps, type AppCategoryId, type LoanApp } from "@/lib/loan-apps";

const avatarTones = ["bg-brand-dark text-white", "bg-brand-ink text-white", "bg-brand-soft text-brand-dark"];

export function AppAvatar({ name, index, logo }: { name: string; index: number; logo?: string }) {
  if (logo) {
    return (
      <span className="inline-flex h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-line bg-white">
        <Image src={logo} alt="" width={48} height={48} className="h-full w-full object-cover" />
      </span>
    );
  }
  const words = name.split(/\s+/);
  const initials = (words.length > 1 ? words[0][0] + words[1][0] : name.slice(0, 2)).toUpperCase();
  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-base font-extrabold ${avatarTones[index % avatarTones.length]}`}
    >
      {initials}
    </span>
  );
}

function AppCard({ app, index, categoryLabel }: { app: LoanApp; index: number; categoryLabel: string }) {
  return (
    <li>
      <Link
        href={consultationLinkFor(app)}
        className="group flex h-full items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-card transition hover:border-brand hover:shadow-float"
      >
        <AppAvatar name={app.name} index={index} logo={app.logo} />
        <span className="min-w-0 flex-1">
          <span className="block text-lg leading-tight font-bold text-brand-dark">{app.name}</span>
          <span className="mt-0.5 block text-sm leading-snug text-muted">
            {app.company ?? categoryLabel}
          </span>
          {app.note && (
            <span className="mt-1.5 inline-block rounded-full bg-brand-soft/50 px-2.5 py-0.5 text-[13px] font-bold text-brand-dark">
              {app.note}
            </span>
          )}
        </span>
        <ArrowRight
          size={18}
          aria-hidden="true"
          className="shrink-0 text-brand transition-transform group-hover:translate-x-1"
        />
        <span className="sr-only">Request clearance help for {app.name}</span>
      </Link>
    </li>
  );
}

export function LoanAppDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<AppCategoryId | "all">("all");

  const q = query.trim().toLowerCase();
  const matches = useMemo(
    () =>
      loanApps.filter(
        (a) =>
          (category === "all" || a.category === category) &&
          (!q || a.name.toLowerCase().includes(q) || a.company?.toLowerCase().includes(q)),
      ),
    [q, category],
  );

  const filters = [
    { id: "all" as const, label: "All apps", count: loanApps.length },
    ...appCategories.map((c) => ({
      id: c.id,
      label: c.label,
      count: loanApps.filter((a) => a.category === c.id).length,
    })),
  ];

  return (
    <div>
      {/* Search and filters */}
      <div className="rounded-2xl border border-line bg-white p-4 shadow-card sm:p-5">
        <div className="relative">
          <Search
            size={20}
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-brand"
          />
          <label htmlFor="app-search" className="sr-only">
            Search for a loan app or lending company
          </label>
          <input
            id="app-search"
            type="search"
            className="field pr-11 pl-12 [&::-webkit-search-cancel-button]:hidden"
            placeholder="Search by app or company name"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setQuery("")}
              className="absolute top-1/2 right-2 inline-flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-muted hover:bg-brand-soft/30 hover:text-brand-dark"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <div
          role="group"
          aria-label="Filter by financing type"
          className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={category === f.id}
              onClick={() => setCategory(f.id)}
              className={`inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors ${
                category === f.id
                  ? "border-brand-dark bg-brand-dark text-white"
                  : "border-field bg-white text-brand-dark hover:border-brand-ink hover:text-brand-ink"
              }`}
            >
              {f.label}
              <span
                className={`rounded-full px-2 py-0.5 text-[13px] ${
                  category === f.id ? "bg-white/20 text-white" : "bg-brand-soft/40 text-brand-dark"
                }`}
              >
                {f.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <p className="mt-5 text-sm text-muted" aria-live="polite">
        Showing {matches.length} of {loanApps.length} apps. Select an app to request clearance help.
      </p>

      {/* Results grouped by category */}
      {matches.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-line bg-white p-10 text-center shadow-card">
          <p className="text-lg font-bold text-brand-dark">No app matches “{query}”.</p>
          <p className="mx-auto mt-2 max-w-md text-muted">
            Check the spelling, or tell us which app your loan is with and we will let you know
            whether we can assist.
          </p>
          <Link href="/request-consultation" className="btn btn-primary mt-6">
            Request Consultation
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-10">
          {appCategories.map((c) => {
            const items = matches.filter((a) => a.category === c.id);
            if (items.length === 0) return null;
            return (
              <section key={c.id} aria-labelledby={`cat-${c.id}`}>
                <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line pb-3">
                  <h3 id={`cat-${c.id}`} className="text-xl font-extrabold">
                    {c.label}{" "}
                    <span className="ml-1 text-base font-bold text-brand-ink">
                      {items.length} {items.length === 1 ? "app" : "apps"}
                    </span>
                  </h3>
                  <p className="text-sm text-muted">{c.description}</p>
                </div>
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((a) => (
                    <AppCard key={a.name} app={a} index={loanApps.indexOf(a)} categoryLabel={c.label} />
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
