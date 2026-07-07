-- ============================================================
-- Camélia — asignar fotos locales de /public/products/
-- Correr en Supabase SQL Editor después del deploy
-- ============================================================
-- Las 8 fotos están en public/products/ del repo — Vercel las sirve
-- desde el mismo dominio. Los productos sin foto quedan con el
-- ornamento de camelia como fallback.
-- ============================================================

set search_path = boutique, public;

-- === 1. Borrar 'Top Art Nouveau' ===
delete from boutique.products where slug = 'top-art-nouveau';

-- === 2. Asignar fotos a los que sí tenemos ===
update boutique.products set images = array['/products/saco-camelia.webp']       where slug = 'saco-camelia';
update boutique.products set images = array['/products/trench-champagne.webp']   where slug = 'trench-champagne';
update boutique.products set images = array['/products/sueter-thyme.jpeg']       where slug = 'sueter-thyme';
update boutique.products set images = array['/products/cardigan-champagne.jpeg'] where slug = 'cardigan-champagne';
update boutique.products set images = array['/products/remera-blush.webp']       where slug = 'remera-blush';
update boutique.products set images = array['/products/blusa-antique.jpg']       where slug = 'blusa-antique';
update boutique.products set images = array['/products/bufanda-rose.webp']       where slug = 'bufanda-rose';
update boutique.products set images = array['/products/cinturon-thyme.webp']     where slug = 'cinturon-thyme';

-- Los siguientes NO se actualizan — quedan con el ornamento fallback:
--   tapado-bisque
--   pashmina-bisque
--   vincha-camelia
-- Cuando tengas fotos para estos, agregá su UPDATE arriba.

-- === Verificación ===
select
  slug,
  case
    when images[1] like '/products/%' then '✓ con foto'
    when images[1] like 'http%' then '✓ con foto (URL)'
    else '✗ ornamento fallback'
  end as estado
from boutique.products
order by slug;
