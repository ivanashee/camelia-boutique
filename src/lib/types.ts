export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  active: boolean;
};

export type Product = {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  stock: number;
  images: string[];
  featured: boolean;
  active: boolean;
  category?: Category | null;
  discount?: number; // 0-100 % (0 = sin rebaja)
  sizes?: string[]; // ["XS","S","M","L","XL"] o [] para accesorios
};

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
  stock: number;
};

export type OrderStatus =
  | "pendiente"
  | "confirmado"
  | "preparando"
  | "enviado"
  | "entregado"
  | "cancelado";

export type Order = {
  id: string;
  customer_name: string;
  phone: string;
  email?: string | null;
  address?: string | null;
  city?: string | null;
  delivery: string;
  payment: string;
  notes?: string | null;
  subtotal: number;
  total: number;
  status: OrderStatus;
  created_at: string;
  order_items?: OrderItem[];
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string | null;
  name: string;
  price: number;
  qty: number;
  subtotal: number;
};
