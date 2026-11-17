import { statusLabels, type ConsultationStatus } from "@/lib/options";

const badge: Record<ConsultationStatus, string> = {
  new: "bg-cta text-white",
  contacted: "bg-brand-soft/50 text-brand-dark",
  in_progress: "bg-brand/15 text-brand-dark",
  closed: "bg-line text-muted",
};

export function StatusBadge({ status }: { status: ConsultationStatus }) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold whitespace-nowrap ${badge[status] ?? badge.closed}`}>
      {statusLabels[status] ?? status}
    </span>
  );
}

const fmt = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Karachi",
});

export function formatDate(iso: string) {
  return fmt.format(new Date(iso));
}
