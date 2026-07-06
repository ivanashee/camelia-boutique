-- ============================================================
-- Camélia — migraciones incrementales
-- Corré esto si ya tenías el schema anterior sin discount/sizes
-- ============================================================

set search_path = boutique, public;

-- 1. Agregar columnas discount y sizes a products
alter table boutique.products
  add column if not exists discount integer not null default 0
    check (discount >= 0 and discount <= 100);

alter table boutique.products
  add column if not exists sizes text[] not null default '{}';

-- 2. Actualizar productos existentes con datos demo
-- (idempotente: sólo aplica cambios donde discount = 0 y sizes = {})
update boutique.products set discount = 15 where slug = 'tapado-bisque'      and discount = 0;
update boutique.products set discount = 20 where slug = 'cardigan-champagne' and discount = 0;
update boutique.products set discount = 10 where slug = 'blusa-antique'      and discount = 0;
update boutique.products set discount = 25 where slug = 'pashmina-bisque'    and discount = 0;
update boutique.products set discount = 30 where slug = 'cinturon-thyme'     and discount = 0;
update boutique.products set discount = 35 where slug = 'trench-champagne'   and discount = 0;

-- 3. Talles XS-XL para indumentaria (sacos, sueteres, remeras)
update boutique.products p set sizes = array['XS','S','M','L','XL']
where sizes = '{}'
  and category_id in (
    select id from boutique.categories where slug in ('sacos','sueteres','remeras')
  );

-- Bufandas y accesorios quedan sin talles (array vacío default).
