"use client";

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="text-sm text-slate-300 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
      onClick={() => window.dispatchEvent(new Event("klickhafen:open-cookie-settings"))}
    >
      Cookie-Einstellungen
    </button>
  );
}
