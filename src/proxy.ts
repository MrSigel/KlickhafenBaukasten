import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { alternateFor, isEnglishPath, localeCookie, normalizePath } from "@/lib/i18n";

const ignoredPrefixes = [
  "/admin",
  "/api",
  "/_next",
  "/favicon",
  "/opengraph-image",
  "/manifest",
  "/robots.txt",
  "/sitemap.xml",
];

function isBot(userAgent: string) {
  return /bot|crawler|spider|slurp|bingpreview|google|search|facebookexternalhit|whatsapp/i.test(userAgent);
}

function wantsGerman(request: NextRequest) {
  const country = request.headers.get("x-vercel-ip-country")?.toUpperCase();
  if (country && ["DE", "AT", "CH"].includes(country)) return true;
  if (country) return false;

  const language = request.headers.get("accept-language")?.toLowerCase() ?? "";
  return language.includes("de") || language.includes("de-de") || language.includes("de-at") || language.includes("de-ch");
}

export function proxy(request: NextRequest) {
  const pathname = normalizePath(request.nextUrl.pathname);

  if (ignoredPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return NextResponse.next();
  }

  if (isBot(request.headers.get("user-agent") ?? "")) {
    return NextResponse.next();
  }

  const manualLocale = request.cookies.get(localeCookie)?.value;
  const isEnglish = isEnglishPath(pathname);

  if (manualLocale === "en" && !isEnglish) {
    const target = alternateFor(pathname, "en");
    if (target !== pathname) return NextResponse.redirect(new URL(target, request.url));
  }

  if (manualLocale === "de" && isEnglish) {
    const target = alternateFor(pathname, "de");
    if (target !== pathname) return NextResponse.redirect(new URL(target, request.url));
  }

  if (!manualLocale && !isEnglish && !wantsGerman(request)) {
    const target = alternateFor(pathname, "en");
    if (target !== pathname) return NextResponse.redirect(new URL(target, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
