-- ============================================================
-- Camélia — URLs de fotos por producto
-- Corré esto una vez para que los productos existentes en Supabase
-- muestren fotos reales de Unsplash en vez del ornamento fallback.
-- ============================================================

set search_path = boutique, public;

update boutique.products set images = array['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80'] where slug = 'saco-camelia';
update boutique.products set images = array['https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=900&q=80']    where slug = 'tapado-bisque';
update boutique.products set images = array['https://images.unsplash.com/photo-1548624313-0396c75f8b23?auto=format&fit=crop&w=900&q=80']    where slug = 'trench-champagne';
update boutique.products set images = array['https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=80'] where slug = 'sueter-thyme';
update boutique.products set images = array['https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?auto=format&fit=crop&w=900&q=80'] where slug = 'cardigan-champagne';
update boutique.products set images = array['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80'] where slug = 'remera-blush';
update boutique.products set images = array['https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80'] where slug = 'blusa-antique';
update boutique.products set images = array['https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80'] where slug = 'top-art-nouveau';
update boutique.products set images = array['https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=900&q=80'] where slug = 'bufanda-rose';
update boutique.products set images = array['https://images.unsplash.com/photo-1517486803493-49af95d29d5c?auto=format&fit=crop&w=900&q=80'] where slug = 'pashmina-bisque';
update boutique.products set images = array['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=80'] where slug = 'vincha-camelia';
update boutique.products set images = array['https://images.unsplash.com/photo-1553981834-a23f5f81b0f4?auto=format&fit=crop&w=900&q=80']    where slug = 'cinturon-thyme';

-- Verificación — deberías ver 12 filas con URLs de unsplash.com
select slug, images[1] as photo from boutique.products order by slug;
