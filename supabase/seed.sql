-- Camélia Boutique — datos demo
set search_path = boutique, public;

insert into boutique.categories (name, slug, description) values
  ('Abrigos','sacos','Sacos, tapados y abrigos de temporada'),
  ('Suéteres','sueteres','Suéteres tejidos y de punto'),
  ('Remeras','remeras','Remeras y blusas'),
  ('Bufandas','bufandas','Bufandas y pashminas'),
  ('Accesorios','accesorios','Accesorios seleccionados')
on conflict (slug) do nothing;

with cats as (
  select id, slug from boutique.categories
)
insert into boutique.products (category_id, name, slug, description, price, stock, images, featured)
select c.id, x.name, x.slug, x.description, x.price, x.stock, x.images, x.featured
from cats c
join (values
  ('sacos',     'Saco Camélia',        'saco-camelia',        'Saco de paño en tono rose, corte oversize.',                480000, 6,  array['/img/p-01.jpg'], true),
  ('sacos',     'Tapado Bisque',       'tapado-bisque',       'Tapado largo en bisque con cinturón.',                       620000, 3,  array['/img/p-02.jpg'], true),
  ('sueteres',  'Suéter Thyme',        'sueter-thyme',        'Suéter de punto grueso en verde thyme.',                    280000, 12, array['/img/p-03.jpg'], true),
  ('sueteres',  'Cardigan Champagne',  'cardigan-champagne',  'Cardigan liviano tono champagne.',                          260000, 8,  array['/img/p-04.jpg'], false),
  ('remeras',   'Remera Blush',        'remera-blush',        'Remera de algodón peinado, cuello redondo.',                120000, 20, array['/img/p-05.jpg'], true),
  ('remeras',   'Blusa Antique',       'blusa-antique',       'Blusa de gasa con detalle floral.',                         180000, 10, array['/img/p-06.jpg'], false),
  ('bufandas',  'Bufanda Rose',        'bufanda-rose',        'Bufanda tejida a mano en antique rose.',                     95000, 15, array['/img/p-07.jpg'], true),
  ('bufandas',  'Pashmina Bisque',     'pashmina-bisque',     'Pashmina de lana suave en bisque.',                         110000, 9,  array['/img/p-08.jpg'], false),
  ('accesorios','Vincha Camélia',      'vincha-camelia',      'Vincha con flor de camelia bordada.',                        45000, 25, array['/img/p-09.jpg'], false),
  ('accesorios','Cinturón Thyme',      'cinturon-thyme',      'Cinturón de cuero verde thyme.',                             80000, 14, array['/img/p-10.jpg'], false),
  ('remeras',   'Top Art Nouveau',     'top-art-nouveau',     'Top con estampa Art Nouveau exclusiva.',                    150000, 7,  array['/img/p-11.jpg'], true),
  ('sacos',     'Trench Champagne',    'trench-champagne',    'Trench liviano en color champagne, ideal media estación.',  550000, 4,  array['/img/p-12.jpg'], false)

) as x(cat_slug, name, slug, description, price, stock, images, featured)
  on c.slug = x.cat_slug
on conflict (slug) do nothing;
