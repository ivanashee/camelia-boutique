import { serverClient } from "./supabase";
import { demoCategories, demoProducts } from "./demo-data";
import type { Category, Order, Product } from "./types";

export async function adminGetProducts(): Promise<Product[]> {
  const sb = serverClient();
  if (!sb) return demoProducts;
  const { data } = await sb
    .from("products")
    .select("*, category:categories(*)")
    .order("created_at", { ascending: false });
  return (data as Product[]) || [];
}

export async function adminGetCategories(): Promise<Category[]> {
  const sb = serverClient();
  if (!sb) return demoCategories;
  const { data } = await sb.from("categories").select("*").order("name");
  return (data as Category[]) || [];
}

export async function adminGetOrders(): Promise<Order[]> {
  const sb = serverClient();
  if (!sb) return [];
  const { data } = await sb
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false });
  return (data as Order[]) || [];
}

export async function adminGetSummary() {
  const [products, categories, orders] = await Promise.all([
    adminGetProducts(),
    adminGetCategories(),
    adminGetOrders(),
  ]);
  const totalRevenue = orders
    .filter((o) => o.status !== "cancelado")
    .reduce((a, o) => a + o.total, 0);
  const pending = orders.filter((o) => o.status === "pendiente").length;
  return {
    products: products.length,
    categories: categories.length,
    orders: orders.length,
    pending,
    revenue: totalRevenue,
    lowStock: products.filter((p) => p.stock <= 3).length,
  };
}
