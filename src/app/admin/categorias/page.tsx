import { AdminChrome } from "../layout";
import { adminGetCategories } from "@/lib/admin-data";
import { createCategory } from "./actions";

export default async function AdminCategoriasPage() {
  const cats = await adminGetCategories();
  return (
    <AdminChrome>
      <h1 className="font-serif text-3xl text-ink mb-2">Categorías</h1>
      <p className="text-sm text-thyme mb-6">Organizá el catálogo por categorías.</p>

      <div className="grid md:grid-cols-[1fr_320px] gap-6">
        <div className="bg-cream border border-champagne rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-champagne/60 text-thyme">
              <tr>
                <th className="text-left px-4 py-2">Nombre</th>
                <th className="text-left px-4 py-2">Slug</th>
                <th className="text-left px-4 py-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {cats.map((c) => (
                <tr key={c.id} className="border-t border-champagne">
                  <td className="px-4 py-2 font-serif text-ink">{c.name}</td>
                  <td className="px-4 py-2 text-thyme">{c.slug}</td>
                  <td className="px-4 py-2">{c.active ? "Activa" : "Inactiva"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <form action={createCategory} className="bg-cream border border-champagne rounded-xl p-5 h-fit">
          <h2 className="font-serif text-lg text-ink mb-3">Nueva categoría</h2>
          <label className="label">Nombre</label>
          <input name="name" required className="input mb-3" />
          <label className="label">Slug</label>
          <input name="slug" required className="input mb-3" placeholder="accesorios" />
          <label className="label">Descripción</label>
          <textarea name="description" rows={3} className="input mb-4" />
          <button className="btn-primary w-full">Crear</button>
        </form>
      </div>
    </AdminChrome>
  );
}
