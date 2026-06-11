"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect, useState } from "react";

const storageKey = "klickhafen-cookie-consent";

function hasAnalyticsConsent() {
  try {
    const value = window.localStorage.getItem(storageKey);
    return value ? Boolean(JSON.parse(value)?.analytics) : false;
  } catch {
    return false;
  }
}

export function AnalyticsConsent() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const update = () => setEnabled(hasAnalyticsConsent());
    update();
    window.addEventListener("klickhafen:cookie-consent-changed", update);
    return () => window.removeEventListener("klickhafen:cookie-consent-changed", update);
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
