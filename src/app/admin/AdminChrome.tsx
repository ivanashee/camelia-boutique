import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin, getSessionUser } from "@/lib/admin-auth";
import { logoutAction } from "./login/actions";
import Ornament from "@/components/Ornament";

const nav = [
  { href: "/admin", label: "Dashboard", icon: "M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10" },
  { href: "/admin/productos", label: "Productos", icon: "M20 7l-8-4-8 4M4 7v10l8 4 8-4V7M4 7l8 4 8-4M12 11v10" },
  { href: "/admin/categorias", label: "Categorías", icon: "M3 5h18v4H3zM3 11h18v4H3zM3 17h18v4H3z" },
  { href: "/admin/pedidos", label: "Pedidos", icon: "M9 3h6l1 3h3v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h3zM9 12h6M9 16h6" },
];

export async function AdminChrome({ children }: { children: React.ReactNode }) {
  const ok = await isAdmin();
  if (!ok) redirect("/admin/login");
  const user = await getSessionUser();
  return (
    <div className="grid md:grid-cols-[240px_1fr] min-h-[70vh]">
      <aside className="relative border-r border-champagne bg-gradient-to-b from-champagne/50 to-champagne/10 p-6 overflow-hidden">
        <div className="absolute -top-6 -right-6 opacity-25 pointer-events-none">
          <Ornament size={140} opacity={0.4} />
        </div>

        <Link href="/" className="flex items-center gap-2 mb-8 group">
          <Ornament size={30} variant="bud" opacity={0.85} />
          <div className="leading-none">
            <div className="font-serif text-2xl text-ink">
              Camélia<span className="text-rose">.</span>
            </div>
            <div className="eyebrow text-[9px] tracking-[0.4em] mt-0.5">Panel</div>
          </div>
        </Link>

        <nav className="flex flex-col gap-1">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink hover:bg-cream/70 transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-thyme group-hover:text-rose transition-colors"
              >
                <path d={n.icon} />
              </svg>
              <span className="tracking-wide">{n.label}</span>
              <span className="ml-auto text-rose opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </Link>
          ))}
        </nav>

        <div className="mt-8 pt-6 border-t border-champagne/70">
          <div className="eyebrow text-[9px] mb-1">Sesión</div>
          <div className="text-xs text-ink truncate">{user?.email}</div>
          <form action={logoutAction} className="mt-3">
            <button className="text-xs text-thyme hover:text-rose flex items-center gap-1 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <path d="M10 17l-5-5 5-5" />
                <path d="M15 12H5" />
              </svg>
              Cerrar sesión
            </button>
          </form>
        </div>

        <div className="absolute bottom-3 left-6 text-[10px] text-thyme/70 tracking-widest">
          NEURA · v1
        </div>
      </aside>
      <div className="p-6 md:p-8">{children}</div>
    </div>
  );
}
