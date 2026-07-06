"use server";
import { redirect } from "next/navigation";
import { adminEmail, adminPassword, loginAdmin, logoutAdmin } from "@/lib/admin-auth";

export async function loginAction(formData: FormData): Promise<void> {
  const email = String(formData.get("email") || "").trim();
  const pass = String(formData.get("password") || "");
  if (email !== adminEmail() || pass !== adminPassword()) {
    redirect("/admin/login?error=1");
  }
  loginAdmin();
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  logoutAdmin();
  redirect("/admin/login");
}
