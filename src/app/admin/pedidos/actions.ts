"use server";
import { revalidatePath } from "next/cache";
import { adminClient } from "@/lib/supabase-server";
import { isAdmin } from "@/lib/admin-auth";
import type { OrderStatus } from "@/lib/types";

export async function updateOrderStatus(id: string, status: OrderStatus) {
  if (!(await isAdmin())) return { ok: false };
  const sb = adminClient();
  if (!sb) return { ok: false };
  const { error } = await sb.from("orders").update({ status }).eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/pedidos");
  return { ok: true };
}
