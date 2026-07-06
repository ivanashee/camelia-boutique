"use server";
import { serverClient } from "@/lib/supabase";
import type { CartItem } from "@/lib/types";

export type CheckoutInput = {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  city?: string;
  delivery: string;
  payment: string;
  notes?: string;
  items: CartItem[];
};

export type CheckoutResult =
  | { ok: true; orderId: string; demo: boolean }
  | { ok: false; error: string };

export async function createOrder(input: CheckoutInput): Promise<CheckoutResult> {
  const subtotal = input.items.reduce((a, i) => a + i.price * i.qty, 0);
  const total = subtotal;

  const sb = serverClient();
  if (!sb) {
    // Modo demo: sin Supabase configurado, generamos un id local.
    const orderId = "demo-" + Math.random().toString(36).slice(2, 10);
    return { ok: true, orderId, demo: true };
  }

  const { data: customer, error: cErr } = await sb
    .from("customers")
    .insert({
      name: input.name,
      phone: input.phone,
      email: input.email || null,
      address: input.address || null,
      city: input.city || null,
    })
    .select("id")
    .single();
  if (cErr) return { ok: false, error: cErr.message };

  const { data: order, error: oErr } = await sb
    .from("orders")
    .insert({
      customer_id: customer!.id,
      customer_name: input.name,
      phone: input.phone,
      email: input.email || null,
      address: input.address || null,
      city: input.city || null,
      delivery: input.delivery,
      payment: input.payment,
      notes: input.notes || null,
      subtotal,
      total,
      status: "pendiente",
    })
    .select("id")
    .single();
  if (oErr) return { ok: false, error: oErr.message };

  const rows = input.items.map((i) => ({
    order_id: order!.id,
    product_id: i.productId,
    name: i.name,
    price: i.price,
    qty: i.qty,
    subtotal: i.price * i.qty,
  }));
  const { error: iErr } = await sb.from("order_items").insert(rows);
  if (iErr) return { ok: false, error: iErr.message };

  return { ok: true, orderId: order!.id, demo: false };
}
