# Camélia Boutique

Tienda online de moda femenina con estética Art Nouveau. Next.js 14 (App Router) + TypeScript + TailwindCSS + Supabase.

## Stack

- **Next.js 14** (App Router, Server Components, Server Actions)
- **TypeScript**
- **TailwindCSS** con paleta custom (Blush · Antique Rose · Champagne · Thyme · Bisque)
- **Supabase** (Postgres) — schema `boutique`
- **Zustand** con persistencia en `localStorage` para el carrito

## Requisitos

- Node 18+ (recomendado 20)
- npm / pnpm / yarn
- Cuenta en Supabase (opcional para arrancar: hay modo demo con datos hardcodeados)

## Instalación

```bash
cd camelia-web
npm install
cp .env.example .env.local
# editá .env.local con tus credenciales
npm run dev
```

Abrí <http://localhost:3000>.

> **Modo demo:** si no configurás Supabase, la web arranca igual usando `src/lib/demo-data.ts` (12 productos + 5 categorías). El checkout crea pedidos ficticios (`orderId` empieza con `demo-`).

## Configurar Supabase

1. Crea un proyecto en <https://app.supabase.com>.
2. En SQL Editor, ejecutá primero `supabase/schema.sql` y después `supabase/seed.sql`.
3. En **Project settings → API**, copiá:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY` (¡solo servidor!)
4. En **Project settings → API → Exposed schemas** agregá `boutique`.
5. Reiniciá `npm run dev`.

Podés usar `demoboutique` en vez de `boutique` cambiando `search_path` en el SQL y `NEXT_PUBLIC_SUPABASE_SCHEMA`.

## Tablas (schema `boutique`)

- `categories` — id, name, slug, description, active
- `products` — id, category_id, name, slug, description, price, stock, images[], featured, active
- `customers` — id, name, phone, email, address, city
- `orders` — id, customer_id, customer_name, phone, email, address, city, delivery, payment, notes, subtotal, total, status, created_at
- `order_items` — id, order_id, product_id, name, price, qty, subtotal

Estado del pedido: `pendiente · confirmado · preparando · enviado · entregado · cancelado`.

## Rutas

| Ruta                          | Descripción                                       |
|-------------------------------|---------------------------------------------------|
| `/`                           | Home con hero, categorías, destacados, beneficios |
| `/catalogo`                   | Grilla con buscador, filtros, orden               |
| `/producto/[slug]`            | Detalle + galería + WhatsApp + relacionados       |
| `/carrito`                    | Carrito con qty/eliminar/subtotal                 |
| `/checkout`                   | Datos + entrega + pago → guarda en Supabase       |
| `/pedido-confirmado/[id]`     | Confirmación + botón WhatsApp con resumen         |
| `/admin/login`                | Login por email + password                        |
| `/admin`                      | Dashboard con métricas                            |
| `/admin/productos`            | Lista + nuevo producto                            |
| `/admin/categorias`           | Lista + nueva categoría                           |
| `/admin/pedidos`              | Lista con cambio de estado                        |

## Admin

Login por email y password guardados en `.env.local` (`ADMIN_EMAIL`, `ADMIN_PASSWORD`). El session cookie dura 8 horas. Para prod migrar a Supabase Auth (una línea de cambio en `src/lib/admin-auth.ts`).

## WhatsApp

Configurá `NEXT_PUBLIC_WHATSAPP_NUMBER` (formato internacional, sin `+`, ej. `595981000000`).

Los mensajes se generan automáticamente en:
- Botón "Comprar por WhatsApp" en detalle de producto
- "Consultar por WhatsApp" en carrito
- Pantalla de pedido confirmado

## Reglas de negocio implementadas

- Los productos con `active = false` no se muestran en el storefront (RLS + query).
- Los productos con `stock = 0` muestran badge "Sin stock" y desactivan "Agregar al carrito".
- El carrito persiste con `zustand/persist` en `localStorage` (`camelia-cart`).
- Cantidad máxima en el carrito = stock del producto.

## Comandos

```bash
npm run dev    # dev server
npm run build  # build producción
npm run start  # servir build
npm run lint   # lint
```

## Deploy

Recomendado en Vercel:

1. Push a GitHub.
2. Import en Vercel.
3. Copiar variables de `.env.example` → **Environment Variables** en Vercel.
4. Deploy.

## Créditos

Diseñado y desarrollado por **Neura**.
