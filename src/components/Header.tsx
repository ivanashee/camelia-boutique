import Link from "next/link";
import CartBadge from "./CartBadge";
import FavoritesBadge from "./FavoritesBadge";
import MobileMenu from "./MobileMenu";
import NavLink from "./NavLink";
import Ornament from "./Ornament";
import PromoBar from "./PromoBar";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b border-champagne">
      {/* Franja promo — cupón clickeable para copiar */}
      <PromoBar />

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
        <nav className="hidden md:flex items-baseline gap-8">
          <NavLink href="/">Inicio</NavLink>
          <span aria-hidden className="text-rose/50 text-xs">✿</span>
          <NavLink href="/catalogo">Catálogo</NavLink>
          <span aria-hidden className="text-rose/50 text-xs">✿</span>
          <NavLink href="/quienes-somos">Nosotros</NavLink>
          <span aria-hidden className="text-rose/50 text-xs">✿</span>
          <NavLink href="/catalogo?sale=1" className="text-rose">Rebajas</NavLink>
        </nav>

        {/* Íconos derecha — cada uno con min tap target 40x40 en mobile */}
        <div className="flex items-center gap-1 md:gap-3">
          <Link
            href="/catalogo"
            aria-label="Buscar"
            className="hidden md:inline-flex w-10 h-10 items-center justify-center text-ink hover:text-rose transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3-3" />
            </svg>
          </Link>
          <div className="w-10 h-10 flex items-center justify-center">
            <FavoritesBadge />
          </div>
          <div className="w-10 h-10 flex items-center justify-center">
            <CartBadge />
          </div>
          <div className="w-10 h-10 flex items-center justify-center md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
