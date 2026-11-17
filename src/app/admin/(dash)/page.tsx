import Link from "next/link";
import { formatDate, StatusBadge } from "@/components/admin/ui";
import { consultationCounts, listConsultations } from "@/lib/db";
import { consultationStatuses, statusLabels, type ConsultationStatus } from "@/lib/options";

export const metadata = { title: "Consultations" };

type Props = { searchParams: Promise<{ status?: string }> };

export default async function AdminHome({ searchParams }: Props) {
  const { status } = await searchParams;
  const filter = consultationStatuses.includes(status as ConsultationStatus)
    ? (status as ConsultationStatus)
    : undefined;
  const [counts, rows] = await Promise.all([consultationCounts(), listConsultations(filter)]);

  const tiles = [
    { label: "All requests", value: counts.total ?? 0, href: "/admin", active: !filter },
    ...consultationStatuses.map((s) => ({
      label: statusLabels[s],
      value: counts[s] ?? 0,
      href: `/admin?status=${s}`,
      active: filter === s,
    })),
  ];

  return (
    <>
      <h1 className="text-3xl font-extrabold">Consultation requests</h1>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-5">
        {tiles.map((t) => (
          <Link
            key={t.label}
            href={t.href}
            aria-current={t.active ? "page" : undefined}
            className={`rounded-2xl border-2 bg-white p-5 shadow-card transition-colors hover:border-brand ${
              t.active ? "border-brand" : "border-line"
            }`}
          >
            <p className="text-sm font-semibold text-muted">{t.label}</p>
            <p className="mt-1 text-3xl font-extrabold text-brand-dark">{t.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
        {rows.length === 0 ? (
          <p className="p-10 text-center text-muted">
            {filter ? "No requests with this status." : "No consultation requests yet."}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-line bg-surface text-xs font-bold tracking-wider text-muted uppercase">
                <tr>
                  <th className="px-5 py-3.5">Reference</th>
                  <th className="px-5 py-3.5">Received</th>
                  <th className="px-5 py-3.5">Name</th>
                  <th className="px-5 py-3.5">Phone</th>
                  <th className="px-5 py-3.5">Service</th>
                  <th className="px-5 py-3.5">Loan</th>
                  <th className="px-5 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map((r) => (
                  <tr key={r.id} className="hover:bg-brand-soft/15">
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/consultations/${r.id}`}
                        className="font-bold text-brand-dark underline decoration-brand underline-offset-4 hover:text-brand-ink"
                      >
                        {r.reference}
                      </Link>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-muted">{formatDate(r.created_at)}</td>
                    <td className="px-5 py-4 font-semibold text-ink">{r.full_name}</td>
                    <td className="px-5 py-4 whitespace-nowrap text-ink">{r.phone}</td>
                    <td className="px-5 py-4 text-ink">{r.service_needed}</td>
                    <td className="px-5 py-4 text-ink">{r.loan_type}</td>
                    <td className="px-5 py-4">
                      <StatusBadge status={r.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
