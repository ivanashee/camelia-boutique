import Link from "next/link";
import CartBadge from "./CartBadge";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur border-b border-champagne">
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl text-ink">
          Camélia<span className="text-rose">.</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-ink">
          <Link href="/">Inicio</Link>
          <Link href="/catalogo">Catálogo</Link>
          <Link href="/catalogo?featured=1">Destacados</Link>
          <Link href="/catalogo?cat=accesorios">Accesorios</Link>
        </nav>
        <div className="flex items-center gap-5">
          <Link href="/catalogo" aria-label="Buscar" className="text-ink hover:text-rose">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3-3" />
            </svg>
          </Link>
          <Link href="/admin" aria-label="Admin" className="text-ink hover:text-rose">
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
