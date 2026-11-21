import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // libSQL ships a native driver for local files; load it at runtime instead of bundling it.
  serverExternalPackages: ["@libsql/client", "libsql"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      // Preserve the prior route after the SmartGuru rebrand.
      { source: "/why-choose-loanclear", destination: "/why-choose-byebyeloan", permanent: true },
      // Articles moved to /blog when the site became a blog.
      { source: "/articles", destination: "/blog", permanent: true },
      { source: "/articles/:slug", destination: "/blog/:slug", permanent: true },
      // Settlement service withdrawn; send old links to the clearance pages.
      { source: "/loan-settlement", destination: "/loan-clearance", permanent: true },
      { source: "/tools/settlement-calculator", destination: "/tools", permanent: true },
      // The www -> bare-domain redirect is set in Vercel's Domains settings, not here,
      // so the two can never point at each other and cause a redirect loop.
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Force HTTPS for two years, including subdomains (ignored on plain-http localhost).
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
          // Safe CSP directives that do not restrict scripts (the site uses inline JSON-LD).
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
