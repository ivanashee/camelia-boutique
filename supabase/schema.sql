-- Camélia Boutique — schema
-- Ejecutar en el SQL editor de Supabase.
-- Podés cambiar 'boutique' por 'demoboutique' si querés separar entornos.

create schema if not exists boutique;
set search_path = boutique, public;

-- ============ CATEGORIES ============
create table if not exists boutique.categories (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  slug         text not null unique,
  description  text,
  active       boolean not null default true,
  created_at   timestamptz not null default now()
);

-- ============ PRODUCTS ============
create table if not exists boutique.products (
  id           uuid primary key default gen_random_uuid(),
  category_id  uuid references boutique.categories(id) on delete set null,
  name         text not null,
  slug         text not null unique,
  description  text,
  price        numeric(12,0) not null check (price >= 0),
  stock        integer not null default 0 check (stock >= 0),
  images       text[] not null default '{}',
  featured     boolean not null default false,
  active       boolean not null default true,
  created_at   timestamptz not null default now()
);
create index if not exists products_category_idx on boutique.products(category_id);
create index if not exists products_featured_idx on boutique.products(featured) where featured;
create index if not exists products_active_idx on boutique.products(active) where active;

-- ============ CUSTOMERS ============
create table if not exists boutique.customers (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  phone      text not null,
  email      text,
  address    text,
  city       text,
  created_at timestamptz not null default now()
);

-- ============ ORDERS ============
do $$ begin
  create type boutique.order_status as enum
    ('pendiente','confirmado','preparando','enviado','entregado','cancelado');
exception when duplicate_object then null; end $$;

create table if not exists boutique.orders (
  id             uuid primary key default gen_random_uuid(),
  customer_id    uuid references boutique.customers(id) on delete set null,
  customer_name  text not null,
  phone          text not null,
  email          text,
  address        text,
  city           text,
  delivery       text not null default 'delivery',        -- delivery | pickup
  payment        text not null default 'transferencia',   -- transferencia | tarjeta | efectivo
  notes          text,
  subtotal       numeric(12,0) not null default 0,
  total          numeric(12,0) not null default 0,
  status         boutique.order_status not null default 'pendiente',
  created_at     timestamptz not null default now()
);
create index if not exists orders_status_idx on boutique.orders(status);
create index if not exists orders_created_idx on boutique.orders(created_at desc);

-- ============ ORDER ITEMS ============
create table if not exists boutique.order_items (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid not null references boutique.orders(id) on delete cascade,
  product_id  uuid references boutique.products(id) on delete set null,
  name        text not null,
  price       numeric(12,0) not null,
  qty         integer not null check (qty > 0),
  subtotal    numeric(12,0) not null
);
create index if not exists order_items_order_idx on boutique.order_items(order_id);

-- ============ RLS ============
alter table boutique.categories  enable row level security;
alter table boutique.products    enable row level security;
alter table boutique.customers   enable row level security;
alter table boutique.orders      enable row level security;
alter table boutique.order_items enable row level security;

-- Público lee catálogo activo
drop policy if exists "read active categories" on boutique.categories;
create policy "read active categories" on boutique.categories
  for select using (active = true);

drop policy if exists "read active products" on boutique.products;
create policy "read active products" on boutique.products
  for select using (active = true);

-- Público puede crear pedidos (checkout anónimo)
drop policy if exists "anon insert customers" on boutique.customers;
create policy "anon insert customers" on boutique.customers
  for insert with check (true);

drop policy if exists "anon insert orders" on boutique.orders;
create policy "anon insert orders" on boutique.orders
  for insert with check (true);

drop policy if exists "anon insert order_items" on boutique.order_items;
create policy "anon insert order_items" on boutique.order_items
  for insert with check (true);

-- El admin usa la service_role_key (bypassa RLS) desde el server.
