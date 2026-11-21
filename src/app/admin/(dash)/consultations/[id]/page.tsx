import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, MessageCircle, Phone } from "lucide-react";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { formatDate, StatusBadge } from "@/components/admin/ui";
import { getConsultation } from "@/lib/db";
import { consultationStatuses, statusLabels } from "@/lib/options";
import { removeConsultation, saveConsultation } from "../../../actions";

export const metadata = { title: "Consultation" };

type Props = { params: Promise<{ id: string }> };

function waNumber(phone: string) {
  const d = phone.replace(/\D/g, "");
  return d.startsWith("0") ? `92${d.slice(1)}` : d;
}

export default async function ConsultationDetail({ params }: Props) {
  const { id } = await params;
  const n = Number(id);
  const c = Number.isInteger(n) && n > 0 ? await getConsultation(n) : undefined;
  if (!c) notFound();

  const details: [string, string][] = [
    ["Full name", c.full_name],
    ["Phone", c.phone],
    ["Email", c.email || "Not provided"],
    ["City", c.city],
    ["Preferred contact", c.contact_method],
    ["Service needed", c.service_needed],
    ["Loan type", c.loan_type],
    ["Lender", c.lender_name || "Not provided"],
    ["Approx. amount", c.amount_range],
    ["Loan status", c.loan_status],
  ];

  return (
    <>
      <Link href="/admin" className="link-arrow text-sm">
        <ArrowLeft size={16} aria-hidden="true" /> All requests
      </Link>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <h1 className="text-3xl font-extrabold">{c.reference}</h1>
        <StatusBadge status={c.status} />
      </div>
      <p className="mt-1 text-sm text-muted">Received {formatDate(c.created_at)}</p>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="card sm:p-6">
          <h2 className="text-lg font-extrabold">Request details</h2>
          <dl className="mt-4 divide-y divide-line text-[15px]">
            {details.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[150px_1fr] gap-4 py-3">
                <dt className="text-muted">{k}</dt>
                <dd className="font-semibold break-words text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <h3 className="mt-6 text-sm font-bold tracking-wider text-muted uppercase">Message</h3>
          <p className="mt-2 leading-relaxed whitespace-pre-wrap text-ink">{c.message || "No message provided."}</p>

          <div className="mt-6 flex flex-wrap gap-3 border-t border-line pt-6">
            <a href={`tel:${c.phone.replace(/[^\d+]/g, "")}`} className="btn btn-secondary btn-sm">
              <Phone size={16} aria-hidden="true" /> Call
            </a>
            <a
              href={`https://wa.me/${waNumber(c.phone)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              <MessageCircle size={16} aria-hidden="true" /> WhatsApp
            </a>
            {c.email && (
              <a href={`mailto:${c.email}?subject=${encodeURIComponent(`Your SmartGuru request ${c.reference}`)}`} className="btn btn-secondary btn-sm">
                <Mail size={16} aria-hidden="true" /> Email
              </a>
            )}
          </div>
        </div>

        <div className="space-y-6 self-start">
          <form action={saveConsultation} className="card space-y-5 sm:p-6">
            <h2 className="text-lg font-extrabold">Manage</h2>
            <input type="hidden" name="id" value={c.id} />
            <div>
              <label htmlFor="status" className="label">
                Status
              </label>
              <select id="status" name="status" defaultValue={c.status} className="field">
                {consultationStatuses.map((s) => (
                  <option key={s} value={s}>
                    {statusLabels[s]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="notes" className="label">
                Internal notes
              </label>
              <textarea id="notes" name="notes" rows={6} defaultValue={c.admin_notes} className="field" />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Save changes
            </button>
          </form>

          <form action={removeConsultation} className="rounded-2xl border border-line bg-white p-5">
            <input type="hidden" name="id" value={c.id} />
            <p className="mb-3 text-sm text-muted">
              Permanently delete this request, for example when a person asks for their data to be removed.
            </p>
            <ConfirmButton
              message={`Permanently delete ${c.reference}? This cannot be undone.`}
              className="cursor-pointer text-sm font-bold text-danger underline underline-offset-4"
            >
              Delete request
            </ConfirmButton>
          </form>
        </div>
      </div>
    </>
  );
}
