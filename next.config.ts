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
      // Page renamed when the brand changed from LoanClear to ByeByeLoan.
      { source: "/why-choose-loanclear", destination: "/why-choose-byebyeloan", permanent: true },
      // Articles moved to /blog when the site became a blog.
      { source: "/articles", destination: "/blog", permanent: true },
      { source: "/articles/:slug", destination: "/blog/:slug", permanent: true },
      // One canonical host: send www to the bare domain.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.byebyeloan.online" }],
        destination: "https://byebyeloan.online/:path*",
        permanent: true,
      },
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
