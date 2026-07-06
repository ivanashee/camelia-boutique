"use server";
import { revalidatePath } from "next/cache";
import { serverClient } from "@/lib/supabase";
import { isAdmin } from "@/lib/admin-auth";
import type { OrderStatus } from "@/lib/types";

export async function updateOrderStatus(id: string, status: OrderStatus) {
  if (!isAdmin()) return { ok: false };
  const sb = serverClient();
  if (!sb) return { ok: false };
  const { error } = await sb.from("orders").update({ status }).eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/pedidos");
  return { ok: true };
}
