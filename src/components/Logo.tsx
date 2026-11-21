import Link from "next/link";

export function LogoMark({ onDark = false, size = 36 }: { onDark?: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="11" className={onDark ? "fill-white" : "fill-brand-dark"} />
      <path
        d="M11 21.5l6.2 6L29.5 13"
        fill="none"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={onDark ? "stroke-brand-ink" : "stroke-brand-bright"}
      />
    </svg>
  );
}

export function Logo({ onDark = false, href = "/" }: { onDark?: boolean; href?: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2.5" aria-label="SmartGuru home">
      <LogoMark onDark={onDark} />
      <span className={`text-2xl font-extrabold tracking-tight ${onDark ? "text-white" : "text-brand-dark"}`}>
        SmartGuru
      </span>
    </Link>
  );
}
