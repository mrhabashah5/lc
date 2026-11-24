import { Noto_Nastaliq_Urdu } from "next/font/google";

// Nastaliq is the Urdu script most readers in Pakistan are used to.
export const urduFont = Noto_Nastaliq_Urdu({ subsets: ["arabic"], weight: ["400", "700"], display: "swap" });

/**
 * A short Urdu title (and optional smaller line) shown under an English heading,
 * so visitors who read Urdu understand the page straight away.
 */
export function UrduTitle({
  title,
  sub,
  centered = false,
  onDark = false,
  className = "",
}: {
  title: string;
  sub?: string;
  /** Centred text without the side bar, for centred sections. */
  centered?: boolean;
  /** White text for dark backgrounds. */
  onDark?: boolean;
  className?: string;
}) {
  const layout = centered ? "mx-auto max-w-2xl text-center" : `max-w-3xl border-r-4 pr-4 ${onDark ? "border-white/60" : "border-brand"}`;
  return (
    <div lang="ur" dir="rtl" className={`${urduFont.className} ${layout} ${className}`}>
      <p className={`text-[1.4rem] leading-[1.9] font-bold sm:text-3xl ${onDark ? "text-white" : "text-brand-dark"}`}>{title}</p>
      {sub && <p className={`text-lg leading-[2] ${onDark ? "text-white/85" : "text-ink"}`}>{sub}</p>}
    </div>
  );
}
