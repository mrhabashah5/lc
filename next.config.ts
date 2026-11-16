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
        ],
      },
    ];
  },
};

export default nextConfig;
