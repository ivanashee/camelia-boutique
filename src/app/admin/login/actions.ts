"use server";
import { redirect } from "next/navigation";
import { adminEmail, adminPassword, loginAdmin, logoutAdmin } from "@/lib/admin-auth";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const pass = String(formData.get("password") || "");
  if (email !== adminEmail() || pass !== adminPassword()) {
    return { ok: false, error: "Credenciales inválidas" };
  }
  loginAdmin();
  redirect("/admin");
}

export async function logoutAction() {
  logoutAdmin();
  redirect("/admin/login");
}
