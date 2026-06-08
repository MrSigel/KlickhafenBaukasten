import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";
import type { NextResponse } from "next/server";

const cookieName = "klickhafen_admin_session";
const maxAge = 60 * 60 * 8;

function secret() {
  return process.env.ADMIN_LOGIN_PASSWORD || process.env.CRON_SECRET || "klickhafen-dev-secret";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

function sessionValue() {
  const payload = `${process.env.ADMIN_LOGIN_EMAIL}:${Date.now()}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminCredentials(email: string, password: string) {
  return email === process.env.ADMIN_LOGIN_EMAIL && password === process.env.ADMIN_LOGIN_PASSWORD;
}

export async function createAdminSession() {
  const store = await cookies();
  store.set(cookieName, sessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });
}

export function setAdminSessionCookie(response: NextResponse) {
  response.cookies.set(cookieName, sessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });
}

export async function destroyAdminSession() {
  const store = await cookies();
  store.delete(cookieName);
}

export async function isAdminAuthenticated() {
  try {
    const store = await cookies();
    const value = store.get(cookieName)?.value;
    if (!value) return false;

    const [payload, signature] = value.split(".");
    if (!payload || !signature) return false;

    const expected = sign(payload);
    const signatureBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expected);
    if (signatureBuffer.length !== expectedBuffer.length) return false;

    return timingSafeEqual(signatureBuffer, expectedBuffer);
  } catch {
    return false;
  }
}
