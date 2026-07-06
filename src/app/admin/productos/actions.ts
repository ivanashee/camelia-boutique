"use server";
import { revalidatePath } from "next/cache";
import { serverClient } from "@/lib/supabase";
import { isAdmin } from "@/lib/admin-auth";

export async function saveProduct(prev: any, fd: FormData) {
  if (!isAdmin()) return { ok: false, error: "No autorizado" };
  const sb = serverClient();
  if (!sb) return { ok: false, error: "Supabase no configurado" };
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
    ? await sb.from("products").update(payload).eq("id", id)
    : await sb.from("products").insert(payload);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/productos");
  return { ok: true };
}

export async function deleteProduct(id: string) {
  if (!isAdmin()) return { ok: false };
  const sb = serverClient();
  if (!sb) return { ok: false };
  await sb.from("products").delete().eq("id", id);
  revalidatePath("/admin/productos");
  return { ok: true };
}

export async function toggleProductActive(id: string, active: boolean) {
  if (!isAdmin()) return { ok: false };
  const sb = serverClient();
  if (!sb) return { ok: false };
  await sb.from("products").update({ active }).eq("id", id);
  revalidatePath("/admin/productos");
  return { ok: true };
}
