import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Ornament from "@/components/Ornament";
import PriceRange from "@/components/PriceRange";
import { StaggerGroup, StaggerItem } from "@/components/Reveal";
import SortDropdown from "@/components/SortDropdown";
import { getCategories, getProducts } from "@/lib/data";
import { formatGs } from "@/lib/format";

const SORT_OPTIONS = [
  { value: "new",        label: "Más recientes" },
  { value: "price-asc",  label: "Precio: menor" },
  { value: "price-desc", label: "Precio: mayor" },
  { value: "name",       label: "Nombre A-Z" },
];

type SP = {
  cat?: string;
  q?: string;
  featured?: string;
  sale?: string;
  sort?: "price-asc" | "price-desc" | "name" | "new";
  stock?: string;
  min?: string;
  max?: string;
};

export default async function CatalogoPage({ searchParams }: { searchParams: SP }) {
  const [products, categories] = await Promise.all([
    getProducts({
      categorySlug: searchParams.cat,
      search: searchParams.q,
      featured: searchParams.featured === "1",
      onSale: searchParams.sale === "1",
    }),
    getCategories(),
  ]);

  let list = [...products];
  if (searchParams.stock === "1") list = list.filter((p) => p.stock > 0);
  const min = Number(searchParams.min || 0);
  const max = Number(searchParams.max || 0);
  if (min) list = list.filter((p) => p.price >= min);
  if (max) list = list.filter((p) => p.price <= max);
  switch (searchParams.sort) {
    case "price-asc": list.sort((a, b) => a.price - b.price); break;
    case "price-desc": list.sort((a, b) => b.price - a.price); break;
    case "name": list.sort((a, b) => a.name.localeCompare(b.name)); break;
    default: break;
  }

  const isRebajas = searchParams.sale === "1";

  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 py-12 relative">
      <div className="absolute -top-4 right-4 opacity-20 pointer-events-none hidden md:block">
        <Ornament size={160} opacity={0.3} />
      </div>
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <div className="eyebrow mb-2">{isRebajas ? "— Rebajas" : "— Catálogo"}</div>
          <h1 className="font-serif text-4xl text-ink">
            {isRebajas ? (
              <>Ofertas <span className="italic text-rose">imperdibles</span></>
            ) : (
              <>Todos los <span className="italic text-rose">productos</span></>
            )}
          </h1>
        </div>
        <form
          action="/catalogo"
          className="group flex items-center gap-2 bg-cream border border-champagne rounded-full pl-4 md:pl-5 pr-1.5 py-1 shadow-sm w-full md:w-auto md:min-w-[520px] focus-within:border-rose transition-colors"
        >
          <svg className="text-thyme shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3-3" />
          </svg>
          <input
            name="q"
            defaultValue={searchParams.q || ""}
            placeholder="Buscar"
            className="flex-1 bg-transparent border-0 outline-none text-sm py-2 min-w-0 placeholder:text-thyme/60 placeholder:italic placeholder:font-serif"
          />
          <span className="h-6 w-px bg-champagne hidden md:block" aria-hidden />
          <div className="hidden md:block px-2">
            <SortDropdown
              name="sort"
              defaultValue={searchParams.sort || "new"}
              options={SORT_OPTIONS}
            />
          </div>
          {searchParams.cat && <input type="hidden" name="cat" value={searchParams.cat} />}
          {searchParams.sale && <input type="hidden" name="sale" value={searchParams.sale} />}
          {searchParams.sort && <input type="hidden" name="sort" value={searchParams.sort} />}
          <button
            className="rounded-full bg-thyme text-champagne text-[10px] uppercase tracking-[0.2em] px-4 md:px-5 py-2.5 hover:bg-ink transition-colors shrink-0 flex items-center gap-1.5 min-h-[40px]"
            aria-label="Buscar"
          >
            <span className="text-rose">✿</span>
            Buscar
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        {/* Filtros */}
        <aside className="space-y-6">
          <div>
            <div className="eyebrow mb-3">Categorías</div>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link
                  href={`/catalogo${searchParams.q ? `?q=${searchParams.q}` : ""}`}
                  className={!searchParams.cat ? "text-rose" : "text-ink hover:text-rose"}
                >Todas</Link>
              </li>
              {categories.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/catalogo?cat=${c.slug}`}
                    className={searchParams.cat === c.slug ? "text-rose" : "text-ink hover:text-rose"}
                  >{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <form action="/catalogo" className="space-y-5 bg-cream border border-champagne rounded-2xl p-4">
            {searchParams.cat && <input type="hidden" name="cat" value={searchParams.cat} />}
            {searchParams.sale && <input type="hidden" name="sale" value={searchParams.sale} />}
            <div>
              <div className="eyebrow mb-3">Rango de precio</div>
              <PriceRange
                initialMin={Number(searchParams.min || 0) || undefined}
                initialMax={Number(searchParams.max || 0) || undefined}
              />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="stock" value="1" defaultChecked={searchParams.stock === "1"} />
              Sólo con stock
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="featured" value="1" defaultChecked={searchParams.featured === "1"} />
              Sólo destacados
            </label>
            {!isRebajas && (
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="sale" value="1" defaultChecked={searchParams.sale === "1"} />
                Sólo en rebajas
              </label>
            )}
            <button className="btn-outline !py-2 w-full">Aplicar filtros</button>
          </form>
        </aside>

        {/* Grid */}
        <div>
          {list.length === 0 ? (
            <div className="text-thyme text-sm py-16 text-center">
              No encontramos productos con esos filtros.
            </div>
          ) : (
            <>
              <div className="text-xs text-thyme mb-4">
                {list.length} producto{list.length === 1 ? "" : "s"} · desde {formatGs(Math.min(...list.map((p) => p.price)))}
              </div>
              <StaggerGroup className="grid grid-cols-2 md:grid-cols-3 gap-5" stagger={0.06} amount={0.05}>
                {list.map((p) => (
                  <StaggerItem key={p.id}>
                    <ProductCard p={p} />
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
