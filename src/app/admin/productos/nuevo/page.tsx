import { AdminChrome } from "../../AdminChrome";
import { adminGetCategories } from "@/lib/admin-data";
import { saveProduct } from "../actions";

export default async function NuevoProductoPage() {
  const cats = await adminGetCategories();
  return (
    <AdminChrome>
      <h1 className="font-serif text-3xl text-ink mb-6">Nuevo producto</h1>
      <form action={saveProduct} className="grid md:grid-cols-2 gap-4 bg-cream border border-champagne rounded-xl p-6 max-w-3xl">
        <div><label className="label">Nombre</label><input name="name" required className="input" /></div>
        <div><label className="label">Slug</label><input name="slug" required className="input" placeholder="saco-camelia" /></div>
        <div>
          <label className="label">Categoría</label>
          <select name="category_id" className="input">
            {cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div><label className="label">Precio (Gs.)</label><input name="price" type="number" required className="input" /></div>
        <div><label className="label">Stock</label><input name="stock" type="number" required className="input" defaultValue={0} /></div>
        <div className="flex items-end gap-4">
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="featured" /> Destacado</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="active" defaultChecked /> Activo</label>
        </div>
        <div className="md:col-span-2">
          <label className="label">URL de la foto</label>
          <input name="image_url" type="url" className="input" placeholder="https://... (pegá la URL de la foto)" />
          <p className="text-[11px] text-thyme mt-1">Si dejás vacío, se usa el ornamento de camelia como fallback.</p>
        </div>
        <div className="md:col-span-2">
          <label className="label">Descripción</label>
          <textarea name="description" rows={4} className="input" />
        </div>
        <div className="md:col-span-2 flex gap-3">
          <button className="btn-primary">Guardar</button>
          <a href="/admin/productos" className="btn-outline">Cancelar</a>
        </div>
      </form>
    </AdminChrome>
  );
}
