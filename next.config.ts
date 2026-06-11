import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/admin/offers/[id]/pdf": ["./logo_klickhafen_transparent.png"],
    "/api/admin/invoices/[id]/pdf": ["./logo_klickhafen_transparent.png"],
  },
};

export default nextConfig;
