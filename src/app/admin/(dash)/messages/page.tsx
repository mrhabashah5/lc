import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { formatDate } from "@/components/admin/ui";
import { listMessages } from "@/lib/db";
import { removeMessage, toggleMessageRead } from "../../actions";

export const metadata = { title: "Messages" };

export default async function MessagesPage() {
  const rows = await listMessages();
  return (
    <>
      <h1 className="text-3xl font-extrabold">Contact messages</h1>
      {rows.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-line bg-white p-10 text-center text-muted shadow-card">
          No messages yet.
        </p>
      ) : (
        <ul className="mt-6 space-y-4">
          {rows.map((m) => (
            <li
              key={m.id}
              className={`rounded-2xl border bg-white p-5 shadow-card sm:p-6 ${m.is_read ? "border-line" : "border-brand"}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-bold text-brand-dark">
                    {m.subject || "General enquiry"}
                    {!m.is_read && (
                      <span className="ml-3 rounded-full bg-cta px-2.5 py-0.5 align-middle text-xs font-bold text-white">
                        New
                      </span>
                    )}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {m.name}
                    {m.email && (
                      <>
                        {" · "}
                        <a href={`mailto:${m.email}`} className="font-semibold text-brand-dark hover:text-brand-ink">
                          {m.email}
                        </a>
                      </>
                    )}
                    {m.phone && ` · ${m.phone}`}
                    {" · "}
                    {formatDate(m.created_at)}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm font-bold">
                  <form action={toggleMessageRead}>
                    <input type="hidden" name="id" value={m.id} />
                    <input type="hidden" name="read" value={m.is_read ? "0" : "1"} />
                    <button type="submit" className="cursor-pointer text-brand-ink hover:text-brand-dark">
                      Mark as {m.is_read ? "unread" : "read"}
                    </button>
                  </form>
                  <form action={removeMessage}>
                    <input type="hidden" name="id" value={m.id} />
                    <ConfirmButton
                      message="Permanently delete this message? This cannot be undone."
                      className="cursor-pointer text-danger"
                    >
                      Delete
                    </ConfirmButton>
                  </form>
                </div>
              </div>
              <p className="mt-4 leading-relaxed whitespace-pre-wrap text-ink">{m.message}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
