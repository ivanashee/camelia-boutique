import { AdminChrome } from "./AdminChrome";
import { adminGetSummary, adminGetOrders } from "@/lib/admin-data";
import { formatGs } from "@/lib/format";
import { supabaseConfigured } from "@/lib/supabase";

export default async function AdminDashboard() {
  const s = await adminGetSummary();
  const recent = (await adminGetOrders()).slice(0, 5);
  const stats = [
    { l: "Pedidos", v: s.orders },
    { l: "Pendientes", v: s.pending },
    { l: "Facturado", v: formatGs(s.revenue) },
    { l: "Productos", v: s.products },
    { l: "Categorías", v: s.categories },
    { l: "Stock bajo", v: s.lowStock },
  ];
  return (
    <AdminChrome>
      <h1 className="font-serif text-3xl text-ink mb-2">Dashboard</h1>
      <p className="text-sm text-thyme mb-6">Resumen del negocio.</p>

      {!supabaseConfigured && (
        <div className="bg-champagne border border-bisque text-ink rounded-xl p-4 mb-6 text-sm">
          Estás en <b>modo demo</b>. Configurá <code>NEXT_PUBLIC_SUPABASE_URL</code> y las keys en{" "}
          <code>.env.local</code> para persistir pedidos.
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((k) => (
          <div key={k.l} className="bg-cream border border-champagne rounded-xl p-5">
            <div className="eyebrow">{k.l}</div>
            <div className="font-serif text-3xl text-ink mt-1">{k.v}</div>
          </div>
        ))}
      </div>

      <h2 className="font-serif text-xl text-ink mt-10 mb-3">Pedidos recientes</h2>
      {recent.length === 0 ? (
        <div className="text-sm text-thyme">Todavía no hay pedidos.</div>
      ) : (
        <div className="card-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((o) => (
                <tr key={o.id}>
                  <td className="font-mono text-xs">{o.id.slice(0, 8)}</td>
                  <td className="font-medium">{o.customer_name}</td>
                  <td className="text-rose font-semibold">{formatGs(o.total)}</td>
                  <td><span className="badge badge-active capitalize">{o.status}</span></td>
                  <td className="muted">{new Date(o.created_at).toLocaleString("es-PY")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminChrome>
  );
}
