"use server";
import { revalidatePath } from "next/cache";
import { serverClient } from "@/lib/supabase";
import { isAdmin } from "@/lib/admin-auth";

export async function createCategory(fd: FormData) {
  if (!isAdmin()) return;
  const sb = serverClient();
  if (!sb) return;
  await sb.from("categories").insert({
    name: String(fd.get("name") || ""),
    slug: String(fd.get("slug") || ""),
    description: String(fd.get("description") || ""),
    active: true,
  });
  revalidatePath("/admin/categorias");
}

export async function toggleCategory(id: string, active: boolean) {
  if (!isAdmin()) return;
  const sb = serverClient();
  if (!sb) return;
  await sb.from("categories").update({ active }).eq("id", id);
  revalidatePath("/admin/categorias");
}
