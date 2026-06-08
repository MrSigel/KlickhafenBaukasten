"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, { error: "" });

  return (
    <form action={action} className="mt-8 space-y-5">
      <label className="block">
        <span className="text-sm font-semibold text-slate-800">E-Mail</span>
        <input name="email" type="email" required className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 outline-none focus:border-cyan-700 focus:ring-4 focus:ring-cyan-100" />
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-slate-800">Passwort</span>
        <input name="password" type="password" required className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 outline-none focus:border-cyan-700 focus:ring-4 focus:ring-cyan-100" />
      </label>
      {state.error ? <p className="rounded-md bg-red-50 p-3 text-sm font-semibold text-red-800">{state.error}</p> : null}
      <button disabled={pending} className="min-h-12 w-full rounded-md bg-cyan-700 px-5 py-3 text-sm font-semibold text-white hover:bg-cyan-800 disabled:opacity-70">
        {pending ? "Login wird geprüft" : "Einloggen"}
      </button>
    </form>
  );
}
