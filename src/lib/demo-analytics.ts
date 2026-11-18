import { appCategories, loanApps, type AppCategoryId } from "./loan-apps";

// DEMO DATA ONLY: generated deterministically so the analytics layout can be reviewed.
// Replace with real queries once clearance cases are stored in the database.

export type DailyAppRow = { date: string; app: string; clearances: number; amount: number };
export type RecentCase = {
  ref: string;
  date: string;
  app: string;
  company: string;
  amount: number;
  daysToLetter: number | null;
  status: CaseStatus;
};
export type CaseStatus = "payment_confirmed" | "letter_requested" | "letter_received" | "record_updated";

export const caseStatusLabels: Record<CaseStatus, string> = {
  payment_confirmed: "Payment confirmed",
  letter_requested: "Letter requested",
  letter_received: "Letter received",
  record_updated: "Credit record updated",
};

export type DemoAnalytics = {
  endDate: string;
  days: string[];
  rows: DailyAppRow[];
  recent: RecentCase[];
  pipeline: { status: CaseStatus; count: number }[];
  categoryOf: Record<string, AppCategoryId>;
  categoryLabels: Record<AppCategoryId, string>;
};

// Small seeded PRNG so the demo looks the same on every load.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Relative daily volume per app (higher = more clearances).
const weight: Record<string, number> = {
  Paisayaar: 17, JazzCash: 15, SmartQarza: 12, Aitemaad: 10, "Fori Raqam": 8.5, "Money Tap": 4, Daira: 3.5,
  CashBazar: 4, Pakcredit: 3.5, Hakeem: 3.2, "Fauri Cash": 3, Sahara: 2.8, PaisaGhur: 2.5, QarzMitra: 2.3,
  ForiQarz: 2, Ishtirak: 1.6, "Loan Lado": 1.2, QistBazaar: 2.6, Baadmay: 2, "Alif Shop": 1.6, PalmPay: 1.4,
  ZoodPay: 0.8, ZoodMall: 0.6, NeemPaymenow: 1.5, "Nova Finance": 1.1, Tijara: 1.2, "Digi Khata": 1.3,
  "Shaamilkar Tajir": 0.7, "Bunyaad Finance": 0.8, Edufi: 0.9, "Taleem Connect": 0.7,
};

// Typical amount range per category, in PKR.
const amountRange: Record<AppCategoryId, [number, number]> = {
  personal: [6_000, 65_000],
  bnpl: [12_000, 140_000],
  salary: [10_000, 80_000],
  business: [60_000, 450_000],
  education: [40_000, 220_000],
};

const iso = (d: Date) => d.toISOString().slice(0, 10);

export function buildDemoAnalytics(endDate = new Date(), numDays = 90): DemoAnalytics {
  const rand = mulberry32(20261116);
  const end = new Date(Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate()));
  const days: string[] = [];
  for (let i = numDays - 1; i >= 0; i--) days.push(iso(new Date(end.getTime() - i * 864e5)));

  const categoryOf = Object.fromEntries(loanApps.map((a) => [a.name, a.category])) as Record<string, AppCategoryId>;
  const rows: DailyAppRow[] = [];
  days.forEach((date, di) => {
    const dow = new Date(date + "T00:00:00Z").getUTCDay(); // 0 = Sunday
    const dayFactor = dow === 0 ? 0.35 : dow === 6 ? 0.7 : 1; // quieter weekends
    const growth = 0.75 + (di / numDays) * 0.5; // steady growth over the period
    for (const app of loanApps) {
      const mean = (weight[app.name] ?? 1) * 0.42 * dayFactor * growth;
      // Poisson-like draw
      let n = 0;
      let p = Math.exp(-mean);
      let s = p;
      const u = rand();
      while (u > s && n < 40) {
        n++;
        p *= mean / n;
        s += p;
      }
      const [lo, hi] = amountRange[app.category];
      let amount = 0;
      for (let k = 0; k < n; k++) amount += Math.round((lo + rand() * (hi - lo)) / 500) * 500;
      rows.push({ date, app: app.name, clearances: n, amount });
    }
  });

  // Recent cases for the table: sample the last 10 days.
  const statuses: CaseStatus[] = ["payment_confirmed", "letter_requested", "letter_received", "record_updated"];
  const recent: RecentCase[] = [];
  const recentRows: DailyAppRow[] = [];
  for (const day of days.slice(-10).reverse()) {
    const dayRows = rows.filter((r) => r.date === day && r.clearances > 0);
    for (let k = 0; k < 4 && dayRows.length; k++) recentRows.push(dayRows.splice(Math.floor(rand() * dayRows.length), 1)[0]);
  }
  for (const r of recentRows) {
    if (recent.length >= 40) break;
    const ageDays = Math.round((end.getTime() - new Date(r.date + "T00:00:00Z").getTime()) / 864e5);
    const status = statuses[Math.min(3, Math.floor(ageDays / 3 + rand() * 1.5))];
    const app = loanApps.find((a) => a.name === r.app)!;
    recent.push({
      ref: `LC-${r.date.slice(2).replace(/-/g, "")}-${Math.floor(rand() * 0xffffff).toString(16).toUpperCase().padStart(6, "0")}`,
      date: r.date,
      app: r.app,
      company: app.company ?? appCategories.find((c) => c.id === app.category)!.label,
      amount: Math.round(r.amount / Math.max(1, r.clearances) / 500) * 500,
      daysToLetter: status === "letter_received" || status === "record_updated" ? 4 + Math.floor(rand() * 18) : null,
      status,
    });
  }

  const pipeline = [
    { status: "payment_confirmed" as const, count: 46 },
    { status: "letter_requested" as const, count: 38 },
    { status: "letter_received" as const, count: 27 },
    { status: "record_updated" as const, count: 19 },
  ];

  return {
    endDate: iso(end),
    days,
    rows,
    recent,
    pipeline,
    categoryOf,
    categoryLabels: Object.fromEntries(appCategories.map((c) => [c.id, c.label])) as Record<AppCategoryId, string>,
  };
}
