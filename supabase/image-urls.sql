-- ============================================================
-- Camélia — plantilla para asignar fotos a productos
-- ============================================================
-- Cómo usar:
--   1. Reemplazá 'REPLACE_ME' en cada línea con la URL pública de la
--      foto correspondiente. Podés usar Supabase Storage, Cloudinary,
--      Imgur, Google Drive (link público), etc.
--   2. Si todavía no tenés la foto de un producto, dejá esa línea con
--      'REPLACE_ME' — el filtro 'like http%' evita actualizarla, y ese
--      producto queda con el ornamento de camelia como fallback.
--   3. Corré el SQL entero en el SQL Editor de Supabase.
-- ============================================================

set search_path = boutique, public;

-- === ABRIGOS ===
update boutique.products set images = array['REPLACE_ME'] where slug = 'saco-camelia'      and 'REPLACE_ME' like 'http%';
update boutique.products set images = array['REPLACE_ME'] where slug = 'tapado-bisque'     and 'REPLACE_ME' like 'http%';
update boutique.products set images = array['REPLACE_ME'] where slug = 'trench-champagne'  and 'REPLACE_ME' like 'http%';

-- === SUÉTERES ===
update boutique.products set images = array['REPLACE_ME'] where slug = 'sueter-thyme'       and 'REPLACE_ME' like 'http%';
update boutique.products set images = array['REPLACE_ME'] where slug = 'cardigan-champagne' and 'REPLACE_ME' like 'http%';

-- === REMERAS ===
update boutique.products set images = array['REPLACE_ME'] where slug = 'remera-blush'    and 'REPLACE_ME' like 'http%';
update boutique.products set images = array['REPLACE_ME'] where slug = 'blusa-antique'   and 'REPLACE_ME' like 'http%';
update boutique.products set images = array['REPLACE_ME'] where slug = 'top-art-nouveau' and 'REPLACE_ME' like 'http%';

-- === BUFANDAS ===
update boutique.products set images = array['REPLACE_ME'] where slug = 'bufanda-rose'    and 'REPLACE_ME' like 'http%';
update boutique.products set images = array['REPLACE_ME'] where slug = 'pashmina-bisque' and 'REPLACE_ME' like 'http%';

-- === ACCESORIOS ===
update boutique.products set images = array['REPLACE_ME'] where slug = 'vincha-camelia' and 'REPLACE_ME' like 'http%';
update boutique.products set images = array['REPLACE_ME'] where slug = 'cinturon-thyme' and 'REPLACE_ME' like 'http%';

-- ============================================================
-- Verificación: muestra qué productos ya tienen foto asignada
-- ============================================================
select
  slug,
  case
    when images[1] like 'http%' then '✓ con foto'
    else '✗ sin foto (usa ornamento fallback)'
  end as estado,
  images[1] as url
from boutique.products
order by slug;
