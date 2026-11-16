"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { serviceTabs } from "@/lib/content";

export function ServiceTabs() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const tab = serviceTabs[active];

  function onKey(e: React.KeyboardEvent) {
    const n = serviceTabs.length;
    let next = -1;
    if (e.key === "ArrowRight") next = (active + 1) % n;
    if (e.key === "ArrowLeft") next = (active - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next >= 0) {
      e.preventDefault();
      setActive(next);
      refs.current[next]?.focus();
    }
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Loan types we assist with"
        onKeyDown={onKey}
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
      >
        {serviceTabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            type="button"
            id={`tab-${t.id}`}
            aria-selected={i === active}
            aria-controls={`panel-${t.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={`shrink-0 cursor-pointer rounded-full border-2 px-5 py-2.5 text-sm font-bold transition-colors ${
              i === active
                ? "border-navy bg-navy text-white"
                : "border-field bg-white text-navy hover:border-sky-ink hover:text-sky-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`panel-${tab.id}`}
        aria-labelledby={`tab-${tab.id}`}
        className="card mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12 lg:p-10"
      >
        <div>
          <h3 className="text-2xl font-extrabold">{tab.title}</h3>
          <p className="mt-3 leading-relaxed text-muted">{tab.text}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/request-consultation" className="btn btn-primary">
              Request Consultation
            </Link>
            <Link href="/services" className="link-arrow">
              View all services <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <ul className="space-y-4 rounded-2xl bg-sky-light/25 p-6">
          {tab.points.map((p) => (
            <li key={p} className="flex items-start gap-3 font-medium text-ink">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky text-white">
                <Check size={14} strokeWidth={3.5} aria-hidden="true" />
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
