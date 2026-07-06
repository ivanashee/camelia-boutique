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
  bg: string,
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
  images: [bg],
  featured,
  active: true,
  discount,
  // accesorios y bufandas no tienen talles
  sizes: cat === "c5" || cat === "c4" ? NO_SIZES : CLOTHING_SIZES,
});

export const demoProducts: Product[] = [
  mk("p1",  "c1", "Saco Camélia",       "saco-camelia",       480000, 6,  true,  "#F0C4CB", "Saco de paño en tono rose, corte oversize.",              0),
  mk("p2",  "c1", "Tapado Bisque",      "tapado-bisque",      620000, 3,  true,  "#E5BCA9", "Tapado largo en bisque con cinturón.",                    15),
  mk("p3",  "c2", "Suéter Thyme",       "sueter-thyme",       280000, 12, true,  "#6B7556", "Suéter de punto grueso en verde thyme.",                  0),
  mk("p4",  "c2", "Cardigan Champagne", "cardigan-champagne", 260000, 8,  false, "#FBEAD6", "Cardigan liviano tono champagne.",                        20),
  mk("p5",  "c3", "Remera Blush",       "remera-blush",       120000, 20, true,  "#F0C4CB", "Remera de algodón peinado, cuello redondo.",              0),
  mk("p6",  "c3", "Blusa Antique",      "blusa-antique",      180000, 10, false, "#C87D87", "Blusa de gasa con detalle floral.",                       10),
  mk("p7",  "c4", "Bufanda Rose",       "bufanda-rose",        95000, 15, true,  "#C87D87", "Bufanda tejida a mano en antique rose.",                  0),
  mk("p8",  "c4", "Pashmina Bisque",    "pashmina-bisque",    110000, 9,  false, "#E5BCA9", "Pashmina de lana suave en bisque.",                       25),
  mk("p9",  "c5", "Vincha Camélia",     "vincha-camelia",      45000, 25, false, "#FBEAD6", "Vincha con flor de camelia bordada.",                     0),
  mk("p10", "c5", "Cinturón Thyme",     "cinturon-thyme",      80000, 14, false, "#6B7556", "Cinturón de cuero verde thyme.",                          30),
  mk("p11", "c3", "Top Art Nouveau",    "top-art-nouveau",    150000, 7,  true,  "#F0C4CB", "Top con estampa Art Nouveau exclusiva.",                  0),
  mk("p12", "c1", "Trench Champagne",   "trench-champagne",   550000, 4,  false, "#FBEAD6", "Trench liviano en color champagne.",                      35),
];

export function withCategory(p: Product): Product {
  const cat = demoCategories.find((c) => c.id === p.category_id) || null;
  return { ...p, category: cat };
}
