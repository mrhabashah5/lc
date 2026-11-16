import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { Logo } from "@/components/Logo";
import { requireAdmin } from "@/lib/auth";
import { unreadMessageCount } from "@/lib/db";
import { logout } from "../actions";

export default async function DashLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  const unread = await unreadMessageCount();

  return (
    <>
      <header className="on-dark bg-navy text-white">
        <div className="container-x flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-4">
          <div className="flex items-center gap-8">
            <Logo onDark href="/admin" />
            <nav aria-label="Admin" className="flex items-center gap-5 text-[15px] font-semibold">
              <Link href="/admin" className="text-sky-light hover:text-white">
                Consultations
              </Link>
              <Link href="/admin/messages" className="inline-flex items-center gap-2 text-sky-light hover:text-white">
                Messages
                {unread > 0 && (
                  <span className="rounded-full bg-cta px-2 py-0.5 text-xs font-bold text-white">{unread}</span>
                )}
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-5 text-sm font-semibold">
            <Link href="/" target="_blank" className="inline-flex items-center gap-1.5 text-sky-light hover:text-white">
              View site <ExternalLink size={15} aria-hidden="true" />
            </Link>
            <form action={logout}>
              <button type="submit" className="inline-flex cursor-pointer items-center gap-1.5 text-sky-light hover:text-white">
                <LogOut size={15} aria-hidden="true" /> Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="container-x flex-1 py-8 sm:py-10">{children}</main>
    </>
  );
}
