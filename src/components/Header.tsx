import Link from "next/link";
import CartBadge from "./CartBadge";
import FavoritesBadge from "./FavoritesBadge";
import NavLink from "./NavLink";
import Ornament from "./Ornament";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b border-champagne">
      {/* Franja decorativa superior */}
      <div className="bg-thyme text-champagne text-[10px] tracking-[0.3em] uppercase text-center py-1.5">
        Envíos a todo Paraguay · Coordinado por WhatsApp
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 h-20 flex items-center justify-between relative">
        {/* Logo con ornamento sutil */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="opacity-70 group-hover:opacity-100 transition-opacity">
            <Ornament size={38} variant="bud" opacity={0.85} />
          </div>
          <div className="leading-none">
            <div className="font-serif text-3xl text-ink">
              Camélia<span className="text-rose">.</span>
            </div>
            <div className="eyebrow text-[9px] tracking-[0.4em] mt-0.5">Boutique · Py</div>
          </div>
        </Link>

        {/* Nav central con separadores ornamentales */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink href="/">Inicio</NavLink>
          <span className="text-rose/50 text-xs">✿</span>
          <NavLink href="/catalogo">Catálogo</NavLink>
          <span className="text-rose/50 text-xs">✿</span>
          <NavLink href="/catalogo?sale=1" className="text-rose">Rebajas</NavLink>
        </nav>

        {/* Íconos derecha */}
        <div className="flex items-center gap-5">
          <Link
            href="/catalogo"
            aria-label="Buscar"
            className="text-ink hover:text-rose transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3-3" />
            </svg>
          </Link>
          <FavoritesBadge />
          <Link
            href="/admin"
            aria-label="Admin"
            className="text-ink hover:text-rose transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
          <CartBadge />
        </div>
      </div>
    </header>
  );
}
