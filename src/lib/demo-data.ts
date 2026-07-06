import type { Category, Product } from "./types";

// Fallback usado cuando Supabase no está configurado (o falla).

export const demoCategories: Category[] = [
  { id: "c1", name: "Abrigos", slug: "sacos", active: true },
  { id: "c2", name: "Suéteres", slug: "sueteres", active: true },
  { id: "c3", name: "Remeras", slug: "remeras", active: true },
  { id: "c4", name: "Bufandas", slug: "bufandas", active: true },
  { id: "c5", name: "Accesorios", slug: "accesorios", active: true },
];

const CLOTHING_SIZES = ["XS", "S", "M", "L", "XL"];
const NO_SIZES: string[] = [];

const mk = (
  id: string,
  cat: string,
  name: string,
  slug: string,
  price: number,
  stock: number,
  featured: boolean,
  image: string,
  description: string,
  discount = 0
): Product => ({
  id,
  category_id: cat,
  name,
  slug,
  description,
  price,
  stock,
  // Convención: images[0] = URL de la foto principal.
  // Si empieza con "#" es un color de fallback (compat vieja).
  images: [image],
  featured,
  active: true,
  discount,
  sizes: cat === "c5" || cat === "c4" ? NO_SIZES : CLOTHING_SIZES,
});

// URLs de Unsplash — fotos que reflejan el color/producto real.
// Formato: photo-{id}?auto=format&fit=crop&w=900&q=80
const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

export const demoProducts: Product[] = [
  // === ABRIGOS ===
  mk("p1",  "c1", "Saco Camélia",       "saco-camelia",       480000, 6,  true,  U("1591047139829-d91aecb6caea"), "Saco de paño en tono rose, corte oversize.",              0),
  mk("p2",  "c1", "Tapado Bisque",      "tapado-bisque",      620000, 3,  true,  U("1544022613-e87ca75a784a"),    "Tapado largo en bisque con cinturón.",                    15),
  mk("p12", "c1", "Trench Champagne",   "trench-champagne",   550000, 4,  false, U("1548624313-0396c75f8b23"),    "Trench liviano en color champagne.",                      35),

  // === SUÉTERES ===
  mk("p3",  "c2", "Suéter Thyme",       "sueter-thyme",       280000, 12, true,  U("1620799140408-edc6dcb6d633"), "Suéter de punto grueso en verde thyme.",                  0),
  mk("p4",  "c2", "Cardigan Champagne", "cardigan-champagne", 260000, 8,  false, U("1583744946564-b52ac1c389c8"), "Cardigan liviano tono champagne.",                        20),

  // === REMERAS ===
  mk("p5",  "c3", "Remera Blush",       "remera-blush",       120000, 20, true,  U("1521572163474-6864f9cf17ab"), "Remera de algodón peinado, cuello redondo.",              0),
  mk("p6",  "c3", "Blusa Antique",      "blusa-antique",      180000, 10, false, U("1490481651871-ab68de25d43d"), "Blusa de gasa con detalle floral.",                       10),
  mk("p11", "c3", "Top Art Nouveau",    "top-art-nouveau",    150000, 7,  true,  U("1618354691373-d851c5c3a990"), "Top con estampa Art Nouveau exclusiva.",                  0),

  // === BUFANDAS ===
  mk("p7",  "c4", "Bufanda Rose",       "bufanda-rose",        95000, 15, true,  U("1520903920243-00d872a2d1c9"), "Bufanda tejida a mano en antique rose.",                  0),
  mk("p8",  "c4", "Pashmina Bisque",    "pashmina-bisque",    110000, 9,  false, U("1517486803493-49af95d29d5c"), "Pashmina de lana suave en bisque.",                       25),

  // === ACCESORIOS ===
  mk("p9",  "c5", "Vincha Camélia",     "vincha-camelia",      45000, 25, false, U("1611591437281-460bfbe1220a"), "Vincha con flor de camelia bordada.",                     0),
  mk("p10", "c5", "Cinturón Thyme",     "cinturon-thyme",      80000, 14, false, U("1553981834-a23f5f81b0f4"),    "Cinturón de cuero verde thyme.",                          30),
];

export function withCategory(p: Product): Product {
  const cat = demoCategories.find((c) => c.id === p.category_id) || null;
  return { ...p, category: cat };
}
