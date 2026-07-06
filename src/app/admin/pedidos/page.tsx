import { AdminChrome } from "../layout";
import { adminGetOrders } from "@/lib/admin-data";
import { formatGs } from "@/lib/format";
import StatusSelect from "./StatusSelect";
import { supabaseConfigured } from "@/lib/supabase";

export default async function AdminPedidosPage() {
  const orders = await adminGetOrders();
  return (
    <AdminChrome>
      <h1 className="font-serif text-3xl text-ink mb-2">Pedidos</h1>
      <p className="text-sm text-thyme mb-6">Gestión de pedidos y estados.</p>

      {!supabaseConfigured && (
        <div className="bg-champagne border border-bisque rounded-xl p-4 mb-4 text-sm">
          Configurá Supabase para ver pedidos reales.
        </div>
      )}

      {orders.length === 0 ? (
        <div className="text-sm text-thyme">Aún no hay pedidos.</div>
      ) : (
        <div className="bg-cream border border-champagne rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-champagne/60 text-thyme">
              <tr>
                <th className="text-left px-4 py-2">#</th>
                <th className="text-left px-4 py-2">Cliente</th>
                <th className="text-left px-4 py-2">Contacto</th>
                <th className="text-left px-4 py-2">Total</th>
                <th className="text-left px-4 py-2">Estado</th>
                <th className="text-left px-4 py-2">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-t border-champagne align-top">
                  <td className="px-4 py-3 font-mono text-xs">{o.id.slice(0, 8)}</td>
                  <td className="px-4 py-3">
                    <div className="text-ink">{o.customer_name}</div>
                    <div className="text-[11px] text-thyme">
                      {(o.order_items || []).length} ítem(s)
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-thyme">
                    {o.phone}<br />{o.address ? `${o.address}, ${o.city ?? ""}` : "—"}
                  </td>
                  <td className="px-4 py-3 text-rose">{formatGs(o.total)}</td>
                  <td className="px-4 py-3"><StatusSelect id={o.id} status={o.status} /></td>
                  <td className="px-4 py-3 text-xs text-thyme">
                    {new Date(o.created_at).toLocaleString("es-PY")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminChrome>
  );
}
