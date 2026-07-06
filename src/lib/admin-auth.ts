import { cookies } from "next/headers";

const COOKIE = "camelia_admin";
const VALUE = "ok";

export function adminEmail() {
  return process.env.ADMIN_EMAIL || "admin@camelia.py";
}
export function adminPassword() {
  return process.env.ADMIN_PASSWORD || "camelia2026";
}

export function isAdmin(): boolean {
  return cookies().get(COOKIE)?.value === VALUE;
}

export function loginAdmin() {
  cookies().set(COOKIE, VALUE, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8h
  });
}
export function logoutAdmin() {
  cookies().delete(COOKIE);
}
