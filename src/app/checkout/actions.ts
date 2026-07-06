"use server";
import { serverClient } from "@/lib/supabase";
import { applyCoupon, validateCoupon } from "@/lib/coupons";
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
  couponCode?: string;
};

export type CheckoutResult =
  | { ok: true; orderId: string; demo: boolean; total: number; discount: number }
  | { ok: false; error: string };

export async function createOrder(input: CheckoutInput): Promise<CheckoutResult> {
  const subtotal = input.items.reduce((a, i) => a + i.price * i.qty, 0);
  const coupon = input.couponCode ? validateCoupon(input.couponCode) : null;
  const { discount, total } = applyCoupon(subtotal, coupon);

  const sb = serverClient();
  if (!sb) {
    const orderId = "demo-" + Math.random().toString(36).slice(2, 10);
    return { ok: true, orderId, demo: true, total, discount };
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

  // Guardamos el cupón en las notas (para no requerir migración de schema).
  // Si más adelante querés columnas dedicadas, agregarlas con ALTER TABLE.
  const notesWithCoupon =
    coupon && discount > 0
      ? `${input.notes ? input.notes + " · " : ""}Cupón ${coupon.code} (-${coupon.percent}%, -${discount})`
      : input.notes || null;

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
      notes: notesWithCoupon,
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

  return { ok: true, orderId: order!.id, demo: false, total, discount };
}
