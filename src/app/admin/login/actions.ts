"use server";
import { redirect } from "next/navigation";
import { ssrClient } from "@/lib/supabase-server";
import { isAdmin } from "@/lib/admin-auth";

export async function loginAction(formData: FormData): Promise<void> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  const sb = ssrClient();
  const { error } = await sb.auth.signInWithPassword({ email, password });
  if (error) redirect(`/admin/login?error=${encodeURIComponent(error.message)}`);

  // Chequear que el usuario esté en la tabla admins
  const ok = await isAdmin();
  if (!ok) {
    await sb.auth.signOut();
    redirect("/admin/login?error=No%20autorizado");
  }
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  const sb = ssrClient();
  await sb.auth.signOut();
  redirect("/admin/login");
}
