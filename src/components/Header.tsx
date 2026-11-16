"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { mainNav } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <div className="shrink-0">
          <Logo />
        </div>

        <nav aria-label="Main" className="hidden items-center gap-6 xl:flex 2xl:gap-8">
          {mainNav.map((item) =>
            item.children ? (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`inline-flex items-center gap-1 py-2 text-[15px] font-semibold whitespace-nowrap transition-colors hover:text-sky-ink ${
                    isActive(item.href) || item.children.some((c) => isActive(c.href))
                      ? "text-sky-ink"
                      : "text-navy"
                  }`}
                >
                  {item.label}
                  <ChevronDown size={16} aria-hidden="true" />
                </Link>
                <div className="invisible absolute top-full left-0 w-56 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <div className="rounded-xl border border-line bg-white p-2 shadow-float">
                    {item.children.map((c) => (
                      <Link
                        key={c.label}
                        href={c.href}
                        aria-current={isActive(c.href) ? "page" : undefined}
                        className="block rounded-lg px-3 py-2.5 text-[15px] font-semibold text-navy hover:bg-sky-light/30"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`py-2 text-[15px] font-semibold whitespace-nowrap transition-colors hover:text-sky-ink ${
                  isActive(item.href) ? "text-sky-ink" : "text-navy"
                }`}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <Link href="/request-consultation" className="btn btn-primary btn-sm hidden sm:inline-flex">
            Request Consultation
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-navy hover:bg-sky-light/30 xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-line bg-white xl:hidden"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) setOpen(false);
          }}
        >
          <div className="container-x flex flex-col py-3">
            <Link href="/" className="py-3 text-base font-semibold text-navy">
              Home
            </Link>
            {mainNav.map((item) => (
              <div key={item.href} className="border-t border-line">
                <Link
                  href={item.href}
                  className={`block py-3 text-base font-semibold ${isActive(item.href) ? "text-sky-ink" : "text-navy"}`}
                >
                  {item.label}
                </Link>
                {item.children?.slice(1).map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className={`block py-2.5 pl-4 text-[15px] font-medium ${isActive(c.href) ? "text-sky-ink" : "text-muted"}`}
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            ))}
            <Link href="/request-consultation" className="btn btn-primary mt-4 mb-2">
              Request Consultation
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
