"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipContentProps,
  type TooltipValueType,
} from "recharts";

type Tip = TooltipContentProps<TooltipValueType, string | number>;
import { caseStatusLabels, type DemoAnalytics } from "@/lib/demo-analytics";

// Categorical slots (validated for colour-blind separation), assigned to apps by
// overall volume and kept fixed so an app's colour never changes with filters.
const SERIES = ["#2a78d6", "#eb6834", "#6250d6", "#eda100", "#e87ba4"];
const OTHER = "#c3ccd3"; // recessive grey for "Other"
const SINGLE = "#2a78d6";
const PIPELINE = ["#9ec5f4", "#5598e7", "#2a78d6", "#1c5cab"]; // ordinal blue steps
const GRID = "#E5EDF2";
const MUTED = "#5B6B77";
const INK = "#263746";

const RANGES = [
  { days: 7, label: "7 days" },
  { days: 30, label: "30 days" },
  { days: 90, label: "90 days" },
];

const fmtInt = new Intl.NumberFormat("en-PK");
function pkr(n: number) {
  if (n >= 1e7) return `Rs ${(n / 1e7).toFixed(2)} crore`;
  if (n >= 1e5) return `Rs ${(n / 1e5).toFixed(1)} lakh`;
  return `Rs ${fmtInt.format(Math.round(n))}`;
}
function pkrAxis(n: number) {
  if (n >= 1e7) return `${(n / 1e7).toFixed(1)}Cr`;
  if (n >= 1e5) return `${Math.round(n / 1e5)}L`;
  if (n >= 1e3) return `${Math.round(n / 1e3)}K`;
  return String(n);
}
const dayLabel = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });

function ChartCard({ title, subtitle, children, className = "" }: { title: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6 ${className}`}>
      <h2 className="text-lg font-extrabold">{title}</h2>
      {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Legend({ items }: { items: { name: string; color: string }[] }) {
  return (
    <ul className="mb-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-ink">
      {items.map((i) => (
        <li key={i.name} className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-[3px]" style={{ background: i.color }} aria-hidden="true" />
          {i.name}
        </li>
      ))}
    </ul>
  );
}

function TooltipCard({ title, rows, footer }: { title: string; rows: { name: string; value: string; color?: string }[]; footer?: string }) {
  return (
    <div className="min-w-44 rounded-xl border border-line bg-white px-3.5 py-3 text-sm shadow-float">
      <p className="mb-1.5 font-bold text-brand-dark">{title}</p>
      <ul className="space-y-1">
        {rows.map((r) => (
          <li key={r.name} className="flex items-center justify-between gap-4 text-ink">
            <span className="inline-flex items-center gap-2">
              {r.color && <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: r.color }} aria-hidden="true" />}
              {r.name}
            </span>
            <span className="font-semibold tabular-nums">{r.value}</span>
          </li>
        ))}
      </ul>
      {footer && <p className="mt-1.5 border-t border-line pt-1.5 font-semibold text-brand-dark">{footer}</p>}
    </div>
  );
}

const axisProps = {
  tick: { fill: MUTED, fontSize: 12 },
  axisLine: false,
  tickLine: false,
} as const;

export function AnalyticsDashboard({ data }: { data: DemoAnalytics }) {
  const [range, setRange] = useState(30);
  const [app, setApp] = useState("all");

  // Top apps by overall volume get fixed colours; everything else is "Other".
  const topApps = useMemo(() => {
    const totals = new Map<string, number>();
    for (const r of data.rows) totals.set(r.app, (totals.get(r.app) ?? 0) + r.clearances);
    return [...totals.entries()].sort((a, b) => b[1] - a[1]).slice(0, SERIES.length).map(([n]) => n);
  }, [data.rows]);
  const colorOf = (name: string) => {
    const i = topApps.indexOf(name);
    return i >= 0 ? SERIES[i] : OTHER;
  };
  const allApps = useMemo(() => [...new Set(data.rows.map((r) => r.app))].sort(), [data.rows]);

  const view = useMemo(() => {
    const days = data.days.slice(-range);
    const prevDays = data.days.slice(-range * 2, -range);
    const inDays = new Set(days);
    const inPrev = new Set(prevDays);
    const match = (a: string) => app === "all" || a === app;
    const rows = data.rows.filter((r) => inDays.has(r.date) && match(r.app));
    const prev = data.rows.filter((r) => inPrev.has(r.date) && match(r.app));

    const sum = (rs: typeof rows, k: "clearances" | "amount") => rs.reduce((s, r) => s + r[k], 0);
    const total = sum(rows, "clearances");
    const amount = sum(rows, "amount");
    const prevTotal = prevDays.length === range ? sum(prev, "clearances") : null;
    const prevAmount = prevDays.length === range ? sum(prev, "amount") : null;

    // Daily stacked series
    const seriesKeys = app === "all" ? [...topApps, "Other"] : [app];
    const daily = days.map((d) => {
      const o: Record<string, number | string> = { date: d };
      for (const k of seriesKeys) o[k] = 0;
      let amt = 0;
      for (const r of rows) {
        if (r.date !== d) continue;
        const key = app === "all" ? (topApps.includes(r.app) ? r.app : "Other") : r.app;
        o[key] = (o[key] as number) + r.clearances;
        amt += r.amount;
      }
      o.amount = amt;
      o.total = seriesKeys.reduce((s, k) => s + (o[k] as number), 0);
      return o;
    });

    // Ranking by app
    const byApp = new Map<string, { clearances: number; amount: number }>();
    for (const r of rows) {
      const v = byApp.get(r.app) ?? { clearances: 0, amount: 0 };
      v.clearances += r.clearances;
      v.amount += r.amount;
      byApp.set(r.app, v);
    }
    const ranking = [...byApp.entries()]
      .map(([name, v]) => ({ name, ...v }))
      .filter((v) => v.clearances > 0)
      .sort((a, b) => b.clearances - a.clearances)
      .slice(0, 10);

    // By financing type
    const byCat = new Map<string, number>();
    for (const r of rows) {
      const label = data.categoryLabels[data.categoryOf[r.app]];
      byCat.set(label, (byCat.get(label) ?? 0) + r.clearances);
    }
    const categories = [...byCat.entries()].map(([name, clearances]) => ({ name, clearances })).sort((a, b) => b.clearances - a.clearances);

    const activeApps = new Set(rows.filter((r) => r.clearances > 0).map((r) => r.app)).size;
    const busiest = daily.reduce((m, d) => ((d.total as number) > (m.total as number) ? d : m), daily[0]);
    return { days, daily, seriesKeys, total, amount, prevTotal, prevAmount, ranking, categories, activeApps, busiest };
  }, [data, range, app, topApps]);

  const recent = useMemo(
    () => data.recent.filter((r) => app === "all" || r.app === app).slice(0, 12),
    [data.recent, app],
  );
  const lettersWithTime = data.recent.filter((r) => r.daysToLetter !== null);
  const avgDays = lettersWithTime.length
    ? lettersWithTime.reduce((s, r) => s + (r.daysToLetter ?? 0), 0) / lettersWithTime.length
    : 0;

  const delta = (now: number, before: number | null) => {
    if (before === null || before === 0) return null;
    const pct = ((now - before) / before) * 100;
    return { pct, up: pct >= 0 };
  };
  const kpis = [
    { label: "Clearances completed", value: fmtInt.format(view.total), delta: delta(view.total, view.prevTotal) },
    { label: "Loan amount cleared", value: pkr(view.amount), delta: delta(view.amount, view.prevAmount) },
    { label: "Avg. days to clearance letter", value: `${avgDays.toFixed(1)} days`, delta: null },
    { label: "Apps with clearances", value: `${view.activeApps} of ${allApps.length}`, delta: null },
  ];

  const legendItems = view.seriesKeys.map((k) => ({ name: k, color: app === "all" ? colorOf(k) : colorOf(k) === OTHER ? SINGLE : colorOf(k) }));
  const tickEvery = range <= 7 ? 0 : range <= 30 ? 4 : 13;

  return (
    <div className="space-y-6">
      {/* Filters: one row above the charts */}
      <div className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-4 shadow-card sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label="Date range" className="inline-flex rounded-xl border border-field p-1">
          {RANGES.map((r) => (
            <button
              key={r.days}
              type="button"
              aria-pressed={range === r.days}
              onClick={() => setRange(r.days)}
              className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-bold transition-colors ${
                range === r.days ? "bg-brand-dark text-white" : "text-brand-dark hover:bg-brand-soft/40"
              }`}
            >
              Last {r.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="app-filter" className="text-sm font-semibold whitespace-nowrap text-brand-dark">
            Loan app
          </label>
          <select id="app-filter" className="field py-2" value={app} onChange={(e) => setApp(e.target.value)}>
            <option value="all">All apps</option>
            {allApps.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI tiles */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-2xl border border-line bg-white p-5 shadow-card">
            <p className="text-sm font-semibold text-muted">{k.label}</p>
            <p className="mt-1 text-3xl font-extrabold text-brand-dark tabular-nums">{k.value}</p>
            {k.delta ? (
              <p className="mt-1 text-sm text-muted">
                <span className="font-bold text-ink">
                  {k.delta.up ? "▲" : "▼"} {Math.abs(k.delta.pct).toFixed(1)}%
                </span>{" "}
                vs previous {range} days
              </p>
            ) : (
              <p className="mt-1 text-sm text-muted">{k.label.startsWith("Avg") ? "Last 40 cases" : `Last ${range} days`}</p>
            )}
          </div>
        ))}
      </div>

      {/* Daily clearances */}
      <ChartCard
        title="Daily loan clearances by app"
        subtitle={`${fmtInt.format(view.total)} clearances in the last ${range} days · busiest day ${dayLabel(view.busiest.date as string)} (${view.busiest.total})`}
      >
        {view.seriesKeys.length > 1 && <Legend items={legendItems} />}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={view.daily} margin={{ top: 4, right: 4, left: -16, bottom: 0 }} barCategoryGap={range > 30 ? 1 : "18%"}>
              <CartesianGrid vertical={false} stroke={GRID} />
              <XAxis dataKey="date" tickFormatter={dayLabel} interval={tickEvery} {...axisProps} />
              <YAxis allowDecimals={false} {...axisProps} />
              <Tooltip
                cursor={{ fill: "rgba(0,73,110,0.06)" }}
                content={(p: Tip) =>
                  p.active && p.payload?.length ? (
                    <TooltipCard
                      title={dayLabel(String(p.label))}
                      rows={[...p.payload]
                        .reverse()
                        .filter((x) => Number(x.value) > 0)
                        .map((x) => ({ name: String(x.name), value: fmtInt.format(Number(x.value)), color: String(x.color) }))}
                      footer={view.seriesKeys.length > 1 ? `Total: ${p.payload[0]?.payload?.total ?? 0}` : undefined}
                    />
                  ) : null
                }
              />
              {view.seriesKeys.map((k, i) => (
                <Bar
                  key={k}
                  dataKey={k}
                  name={k}
                  stackId="a"
                  fill={legendItems[i].color}
                  stroke="#fff"
                  strokeWidth={range > 30 ? 0.5 : 1}
                  radius={i === view.seriesKeys.length - 1 ? [4, 4, 0, 0] : 0}
                  isAnimationActive={false}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <details className="mt-4 rounded-xl border border-line">
          <summary className="cursor-pointer px-4 py-2.5 text-sm font-semibold text-brand-dark">View as table</summary>
          <div className="max-h-72 overflow-auto">
            <table className="w-full text-left text-sm">
              <thead className="sticky top-0 bg-surface text-xs font-bold tracking-wider text-muted uppercase">
                <tr>
                  <th className="px-4 py-2">Date</th>
                  {view.seriesKeys.map((k) => (
                    <th key={k} className="px-4 py-2 text-right">{k}</th>
                  ))}
                  <th className="px-4 py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {[...view.daily].reverse().map((d) => (
                  <tr key={d.date as string}>
                    <td className="px-4 py-1.5 whitespace-nowrap">{dayLabel(d.date as string)}</td>
                    {view.seriesKeys.map((k) => (
                      <td key={k} className="px-4 py-1.5 text-right tabular-nums">{d[k]}</td>
                    ))}
                    <td className="px-4 py-1.5 text-right font-semibold tabular-nums">{d.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </ChartCard>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Amount cleared per day */}
        <ChartCard title="Loan amount cleared per day" subtitle={`${pkr(view.amount)} in the last ${range} days`}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={view.daily} margin={{ top: 4, right: 4, left: -4, bottom: 0 }}>
                <defs>
                  <linearGradient id="amt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={SINGLE} stopOpacity={0.25} />
                    <stop offset="100%" stopColor={SINGLE} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke={GRID} />
                <XAxis dataKey="date" tickFormatter={dayLabel} interval={tickEvery} {...axisProps} />
                <YAxis tickFormatter={pkrAxis} width={56} {...axisProps} />
                <Tooltip
                  cursor={{ stroke: MUTED, strokeDasharray: "3 3" }}
                  content={(p: Tip) =>
                    p.active && p.payload?.length ? (
                      <TooltipCard title={dayLabel(String(p.label))} rows={[{ name: "Amount cleared", value: pkr(Number(p.payload[0].value)), color: SINGLE }]} />
                    ) : null
                  }
                />
                <Area type="monotone" dataKey="amount" stroke={SINGLE} strokeWidth={2} fill="url(#amt)" isAnimationActive={false} activeDot={{ r: 5, stroke: "#fff", strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Top apps */}
        <ChartCard title="Top apps by clearances" subtitle={`Last ${range} days`}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={view.ranking} layout="vertical" margin={{ top: 0, right: 40, left: 8, bottom: 0 }} barCategoryGap="22%">
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" width={112} interval={0} {...axisProps} tick={{ fill: INK, fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: "rgba(0,73,110,0.06)" }}
                  content={(p: Tip) =>
                    p.active && p.payload?.length ? (
                      <TooltipCard
                        title={String(p.label)}
                        rows={[
                          { name: "Clearances", value: fmtInt.format(Number(p.payload[0].payload.clearances)) },
                          { name: "Amount", value: pkr(Number(p.payload[0].payload.amount)) },
                        ]}
                      />
                    ) : null
                  }
                />
                <Bar dataKey="clearances" radius={[0, 4, 4, 0]} isAnimationActive={false} label={{ position: "right", fill: INK, fontSize: 12 }}>
                  {view.ranking.map((r) => (
                    <Cell key={r.name} fill={app === "all" ? (colorOf(r.name) === OTHER ? "#86b6ef" : colorOf(r.name)) : SINGLE} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* By financing type */}
        <ChartCard title="Clearances by financing type" subtitle={`Last ${range} days`}>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={view.categories} layout="vertical" margin={{ top: 0, right: 48, left: 8, bottom: 0 }} barCategoryGap="26%">
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" width={160} interval={0} {...axisProps} tick={{ fill: INK, fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: "rgba(0,73,110,0.06)" }}
                  content={(p: Tip) =>
                    p.active && p.payload?.length ? (
                      <TooltipCard
                        title={String(p.label)}
                        rows={[
                          { name: "Clearances", value: fmtInt.format(Number(p.payload[0].value)) },
                          { name: "Share", value: `${((Number(p.payload[0].value) / Math.max(1, view.total)) * 100).toFixed(1)}%` },
                        ]}
                      />
                    ) : null
                  }
                />
                <Bar dataKey="clearances" fill={SINGLE} radius={[0, 4, 4, 0]} isAnimationActive={false} label={{ position: "right", fill: INK, fontSize: 12 }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Pipeline */}
        <ChartCard title="Open clearance cases by stage" subtitle="Where current cases are in the process">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.pipeline.map((p) => ({ name: caseStatusLabels[p.status], count: p.count }))}
                layout="vertical"
                margin={{ top: 0, right: 40, left: 8, bottom: 0 }}
                barCategoryGap="26%"
              >
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" width={172} interval={0} {...axisProps} tick={{ fill: INK, fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: "rgba(0,73,110,0.06)" }}
                  content={(p: Tip) =>
                    p.active && p.payload?.length ? (
                      <TooltipCard title={String(p.label)} rows={[{ name: "Cases", value: fmtInt.format(Number(p.payload[0].value)) }]} />
                    ) : null
                  }
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} isAnimationActive={false} label={{ position: "right", fill: INK, fontSize: 12 }}>
                  {data.pipeline.map((p, i) => (
                    <Cell key={p.status} fill={PIPELINE[i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Recent clearances */}
      <section className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
        <div className="flex flex-wrap items-baseline justify-between gap-2 px-5 pt-5 sm:px-6">
          <h2 className="text-lg font-extrabold">Recent clearances</h2>
          <p className="text-sm text-muted">Latest {recent.length} cases{app !== "all" ? ` for ${app}` : ""}</p>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-y border-line bg-surface text-xs font-bold tracking-wider text-muted uppercase">
              <tr>
                <th className="px-5 py-3">Reference</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Loan app</th>
                <th className="px-5 py-3">Lender</th>
                <th className="px-5 py-3 text-right">Amount</th>
                <th className="px-5 py-3 text-right">Days to letter</th>
                <th className="px-5 py-3">Stage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {recent.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-muted">
                    No recent clearances for this app.
                  </td>
                </tr>
              ) : (
                recent.map((r) => (
                  <tr key={r.ref} className="hover:bg-brand-soft/15">
                    <td className="px-5 py-3 font-semibold whitespace-nowrap text-brand-dark">{r.ref}</td>
                    <td className="px-5 py-3 whitespace-nowrap text-muted">{dayLabel(r.date)}</td>
                    <td className="px-5 py-3 font-semibold whitespace-nowrap text-ink">
                      <span className="inline-flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: colorOf(r.app) }} aria-hidden="true" />
                        {r.app}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-ink">{r.company}</td>
                    <td className="px-5 py-3 text-right whitespace-nowrap tabular-nums">{pkr(r.amount)}</td>
                    <td className="px-5 py-3 text-right tabular-nums">{r.daysToLetter ?? "–"}</td>
                    <td className="px-5 py-3">
                      <span className="inline-block rounded-full bg-brand-soft/50 px-3 py-1 text-xs font-bold whitespace-nowrap text-brand-dark">
                        {caseStatusLabels[r.status]}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
