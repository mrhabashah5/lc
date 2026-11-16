import Link from "next/link";

export function LogoMark({ onDark = false, size = 36 }: { onDark?: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="11" className={onDark ? "fill-white" : "fill-navy"} />
      <path
        d="M11 21.5l6.2 6L29.5 13"
        fill="none"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={onDark ? "stroke-sky-ink" : "stroke-sky-brand"}
      />
    </svg>
  );
}

export function Logo({ onDark = false, href = "/" }: { onDark?: boolean; href?: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2.5" aria-label="ByeByeLoan home">
      <LogoMark onDark={onDark} />
      <span className={`text-2xl font-extrabold tracking-tight ${onDark ? "text-white" : "text-navy"}`}>
        ByeBye<span className={onDark ? "text-sky-light" : "text-sky"}>Loan</span>
      </span>
    </Link>
  );
}
