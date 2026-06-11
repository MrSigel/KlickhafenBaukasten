import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { MotionProvider } from "@/components/motion-provider";
import { SiteChrome } from "@/components/site-chrome";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Klickhafen | Webdesign, Landingpages & Website-Hilfe",
    template: "%s",
  },
  description:
    "Klickhafen erstellt moderne Websites und Landingpages mit WordPress oder Baukasten-Systemen und hilft bei bestehenden Websites, Shops und SEO-Grundlagen.",
  applicationName: site.name,
  manifest: "/manifest.webmanifest",
  alternates: { canonical: site.url },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "mask-icon", url: "/favicon-512x512.png", color: "#0e7490" },
    ],
  },
  appleWebApp: {
    capable: true,
    title: site.name,
    statusBarStyle: "default",
  },
  other: {
    "msapplication-TileColor": "#0f172a",
    "msapplication-TileImage": "/mstile-150x150.png",
  },
  openGraph: {
    title: "Klickhafen | Webdesign, Landingpages & Website-Hilfe",
    description:
      "Moderne Websites, Landingpages, Website-Hilfe und SEO-Grundlagen für Selbstständige und kleine Unternehmen.",
    url: site.url,
    siteName: site.name,
    locale: "de_DE",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Klickhafen Website-Hilfe" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Klickhafen | Webdesign, Landingpages & Website-Hilfe",
    description:
      "Moderne Websites, Landingpages und Hilfe bei bestehenden Websites, Shops und SEO-Grundlagen.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <MotionProvider>
          <SiteChrome>{children}</SiteChrome>
        </MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
