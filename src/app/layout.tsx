import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ogImageFor } from "@/lib/images";
import { loanApps } from "@/lib/loan-apps";
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
    default: "Loan Clearance Help in Pakistan | ByeByeLoan",
    template: "%s | ByeByeLoan",
  },
  description:
    `Get help with the clearance letter (NOC) and documents for paid-off loans from banks and ${loanApps.length} digital loan apps in Pakistan. Free, no-obligation first consultation.`,
  applicationName: site.name,
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : {}),
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } }
      : {}),
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_PK",
    title: "Loan Clearance Help in Pakistan | ByeByeLoan",
    description: site.description,
    url: "/",
    images: [{ ...ogImageFor(), alt: "ByeByeLoan – loan clearance assistance in Pakistan" }],
  },
  twitter: { card: "summary_large_image", images: [ogImageFor().url] },
};

export const viewport: Viewport = {
  themeColor: "#0B4D33",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
