import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin, getSessionUser } from "@/lib/admin-auth";
import { logoutAction } from "./login/actions";

export async function AdminChrome({ children }: { children: React.ReactNode }) {
  const ok = await isAdmin();
  if (!ok) redirect("/admin/login");
  const user = await getSessionUser();
  return (
    <div className="grid md:grid-cols-[220px_1fr] min-h-[70vh]">
      <aside className="border-r border-champagne p-6 bg-champagne/40">
        <div className="font-serif text-2xl text-ink mb-6">Camélia<span className="text-rose">.</span></div>
        <nav className="text-sm space-y-1.5 flex flex-col">
          <Link href="/admin" className="hover:text-rose">Dashboard</Link>
          <Link href="/admin/productos" className="hover:text-rose">Productos</Link>
          <Link href="/admin/categorias" className="hover:text-rose">Categorías</Link>
          <Link href="/admin/pedidos" className="hover:text-rose">Pedidos</Link>
        </nav>
        <div className="mt-10 text-xs text-thyme">
          <div className="opacity-70">Sesión:</div>
          <div className="text-ink truncate">{user?.email}</div>
        </div>
        <form action={logoutAction} className="mt-4">
          <button className="text-xs text-thyme hover:text-rose">Cerrar sesión →</button>
        </form>
      </aside>
      <div className="p-6 md:p-8">{children}</div>
    </div>
  );
}
