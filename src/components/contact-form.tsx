"use client";

import { Send } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  "Website- & Shop-Hilfe",
  "WordPress Hilfe",
  "Shopify Hilfe",
  "Wix / Baukasten Hilfe",
  "WooCommerce Hilfe",
  "Pflegepaket",
  "SEO & Sichtbarkeit",
  "Individuelle Website-Arbeiten",
  "Sonstiges",
];

const platforms = [
  "WordPress",
  "Elementor",
  "WooCommerce",
  "Shopify",
  "Wix",
  "Strato",
  "IONOS",
  "Jimdo",
  "Squarespace",
  "Webflow",
  "GoDaddy",
  "One.com",
  "Weebly",
  "Shopware",
  "anderes System",
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-800">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

const inputClass =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-700 focus:ring-4 focus:ring-cyan-100";

export function ContactForm() {
  return (
    <form className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Anrede">
          <select className={inputClass} name="anrede">
            <option>Bitte wählen</option>
            <option>Frau</option>
            <option>Herr</option>
            <option>Divers</option>
            <option>Keine Angabe</option>
          </select>
        </Field>
        <Field label="Unternehmen optional">
          <input className={inputClass} name="unternehmen" autoComplete="organization" />
        </Field>
        <Field label="Vorname">
          <input className={inputClass} name="vorname" autoComplete="given-name" required />
        </Field>
        <Field label="Nachname">
          <input className={inputClass} name="nachname" autoComplete="family-name" required />
        </Field>
        <Field label="E-Mail">
          <input className={inputClass} type="email" name="email" autoComplete="email" required />
        </Field>
        <Field label="Website-URL optional">
          <input className={inputClass} type="url" name="website" placeholder="https://" />
        </Field>
        <Field label="Gewünschte Leistung">
          <select className={inputClass} name="leistung">
            {services.map((service) => (
              <option key={service}>{service}</option>
            ))}
          </select>
        </Field>
        <Field label="System / Plattform">
          <select className={inputClass} name="system">
            {platforms.map((platform) => (
              <option key={platform}>{platform}</option>
            ))}
          </select>
        </Field>
        <Field label="Datei-Upload optional">
          <input className={`${inputClass} file:mr-4 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-slate-800`} type="file" name="datei" />
        </Field>
      </div>
      <div className="mt-5">
        <Field label="Nachricht / Problem-Beschreibung">
          <textarea className={`${inputClass} min-h-40 resize-y`} name="nachricht" required />
        </Field>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">
        Das Formular ist für die lokale Anfrage vorbereitet. Ohne angebundenes Backend werden keine Daten versendet.
      </p>
      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-cyan-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-800 sm:w-auto"
      >
        Anfrage vorbereiten <Send className="size-4" aria-hidden="true" />
      </motion.button>
    </form>
  );
}
