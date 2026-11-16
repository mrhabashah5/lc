import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | ByeByeLoan Admin" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-screen flex-col bg-surface">{children}</div>;
}
