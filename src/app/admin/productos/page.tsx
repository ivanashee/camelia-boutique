import { AdminChrome } from "../layout";
import { adminGetCategories, adminGetProducts } from "@/lib/admin-data";
import { formatGs } from "@/lib/format";
import { supabaseConfigured } from "@/lib/supabase";

export default async function AdminProductosPage() {
  const [products, categories] = await Promise.all([adminGetProducts(), adminGetCategories()]);
  return (
    <AdminChrome>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl text-ink">Productos</h1>
          <p className="text-sm text-thyme">Gestioná el catálogo.</p>
        </div>
        <a href="/admin/productos/nuevo" className="btn-primary !py-2 !px-4">+ Nuevo producto</a>
      </div>

      {!supabaseConfigured && (
        <div className="bg-champagne border border-bisque rounded-xl p-4 mb-4 text-sm">
          Modo demo: la edición se activa cuando configurés Supabase.
        </div>
      )}

      <div className="bg-cream border border-champagne rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-champagne/60 text-thyme">
            <tr>
              <th className="text-left px-4 py-2">Producto</th>
              <th className="text-left px-4 py-2">Categoría</th>
              <th className="text-left px-4 py-2">Precio</th>
              <th className="text-left px-4 py-2">Stock</th>
              <th className="text-left px-4 py-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-champagne">
                <td className="px-4 py-2">
                  <div className="font-serif text-ink">{p.name}</div>
                  <div className="text-[11px] text-thyme">{p.slug}</div>
                </td>
                <td className="px-4 py-2">{categories.find((c) => c.id === p.category_id)?.name ?? "—"}</td>
                <td className="px-4 py-2 text-rose">{formatGs(p.price)}</td>
                <td className="px-4 py-2">{p.stock}</td>
                <td className="px-4 py-2">
                  {p.active ? <span className="text-thyme">Activo</span> : <span className="text-ink/50">Inactivo</span>}
                  {p.featured && <span className="ml-2 text-[10px] uppercase tracking-widest text-rose">Destacado</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminChrome>
  );
}
