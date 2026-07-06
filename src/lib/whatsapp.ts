import { formatGs } from "./format";
import type { CartItem, Order, OrderItem } from "./types";

const number = () => process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "595981000000";

export function waCartLink(items: CartItem[], total: number, customer?: string) {
  const lines = [
    "Hola Camélia! Quisiera comprar:",
    "",
    ...items.map((i) => `• ${i.qty} × ${i.name} — ${formatGs(i.price * i.qty)}`),
    "",
    `Total: ${formatGs(total)}`,
    customer ? `A nombre de: ${customer}` : "",
  ].filter(Boolean);
  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${number()}?text=${text}`;
}

export function waProductLink(name: string, price: number) {
  const text = encodeURIComponent(
    `Hola Camélia! Me interesa el producto "${name}" (${formatGs(price)}). ¿Está disponible?`
  );
  return `https://wa.me/${number()}?text=${text}`;
}

export function waOrderLink(order: Order, items: OrderItem[] | CartItem[]) {
  const lines = [
    `Hola Camélia! Confirmo mi pedido #${order.id.slice(0, 8)}:`,
    "",
    ...items.map((i: any) => `• ${i.qty} × ${i.name} — ${formatGs(i.price * i.qty)}`),
    "",
    `Total: ${formatGs(order.total)}`,
    `Nombre: ${order.customer_name}`,
    `Teléfono: ${order.phone}`,
    order.address ? `Dirección: ${order.address}, ${order.city ?? ""}` : "",
    `Entrega: ${order.delivery}`,
    `Pago: ${order.payment}`,
    order.notes ? `Obs: ${order.notes}` : "",
  ].filter(Boolean);
  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${number()}?text=${text}`;
}
