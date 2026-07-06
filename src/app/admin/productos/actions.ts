"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { adminClient } from "@/lib/supabase-server";
import { isAdmin } from "@/lib/admin-auth";

export async function saveProduct(fd: FormData): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login");
  const sb = adminClient();
  if (!sb) redirect("/admin/productos?error=no-supabase");
  const payload = {
    name: String(fd.get("name") || ""),
    slug: String(fd.get("slug") || ""),
    description: String(fd.get("description") || ""),
    price: Number(fd.get("price") || 0),
    stock: Number(fd.get("stock") || 0),
    category_id: String(fd.get("category_id") || "") || null,
    featured: fd.get("featured") === "on",
    active: fd.get("active") === "on",
    images: [],
  };
  const id = String(fd.get("id") || "");
  const { error } = id
    ? await sb!.from("products").update(payload).eq("id", id)
    : await sb!.from("products").insert(payload);
  if (error) redirect(`/admin/productos?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/admin/productos");
  redirect("/admin/productos");
}

export async function deleteProduct(id: string): Promise<void> {
  if (!(await isAdmin())) return;
  const sb = adminClient();
  if (!sb) return;
  await sb.from("products").delete().eq("id", id);
  revalidatePath("/admin/productos");
}

export async function toggleProductActive(id: string, active: boolean): Promise<void> {
  if (!(await isAdmin())) return;
  const sb = adminClient();
  if (!sb) return;
  await sb.from("products").update({ active }).eq("id", id);
  revalidatePath("/admin/productos");
}
