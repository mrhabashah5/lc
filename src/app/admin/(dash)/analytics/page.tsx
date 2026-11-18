import { Info } from "lucide-react";
import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";
import { buildDemoAnalytics } from "@/lib/demo-analytics";

export const metadata = { title: "Analytics" };

export default async function AnalyticsPage() {
  const data = buildDemoAnalytics(new Date());
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">Clearance analytics</h1>
          <p className="mt-1 text-muted">Daily loan clearances across the digital lending apps we cover.</p>
        </div>
      </div>
      <p className="mt-5 mb-6 flex items-start gap-3 rounded-xl border border-orange/40 bg-orange/10 px-4 py-3 text-sm text-ink">
        <Info size={18} className="mt-0.5 shrink-0 text-cta" aria-hidden="true" />
        <span>
          <strong className="text-brand-dark">Demo data.</strong> These figures are generated for layout review only and do
          not reflect real clearances.
        </span>
      </p>
      <AnalyticsDashboard data={data} />
    </>
  );
}
