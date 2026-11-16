import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ogImageFor } from "@/lib/images";
import { site } from "@/lib/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "ByeByeLoan | Loan Settlement & Clearance Assistance in Pakistan",
    template: "%s | ByeByeLoan",
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_PK",
    title: "ByeByeLoan | Loan Settlement & Clearance Assistance in Pakistan",
    description: site.description,
    url: "/",
    images: [{ ...ogImageFor(), alt: "ByeByeLoan – loan settlement and clearance assistance in Pakistan" }],
  },
  twitter: { card: "summary_large_image", images: [ogImageFor().url] },
};

export const viewport: Viewport = {
  themeColor: "#00496E",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
