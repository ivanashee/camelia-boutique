"use server";
import { revalidatePath } from "next/cache";
import { adminClient } from "@/lib/supabase-server";
import { isAdmin } from "@/lib/admin-auth";

export async function createCategory(fd: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const sb = adminClient();
  if (!sb) return;
  await sb.from("categories").insert({
    name: String(fd.get("name") || ""),
    slug: String(fd.get("slug") || ""),
    description: String(fd.get("description") || ""),
    active: true,
  });
  revalidatePath("/admin/categorias");
}

export async function toggleCategory(id: string, active: boolean): Promise<void> {
  if (!(await isAdmin())) return;
  const sb = adminClient();
  if (!sb) return;
  await sb.from("categories").update({ active }).eq("id", id);
  revalidatePath("/admin/categorias");
}
