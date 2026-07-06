-- ============================================================
-- Camélia — tabla admins para Supabase Auth
-- Corré esto una vez, después agregá tus usuarios en Authentication → Users
-- ============================================================

set search_path = boutique, public;

create table if not exists boutique.admins (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  email      text not null,
  created_at timestamptz not null default now()
);

alter table boutique.admins enable row level security;

-- Solo el propio usuario puede leerse (para chequeos client-side si algún día lo necesitás)
drop policy if exists "admin reads self" on boutique.admins;
create policy "admin reads self" on boutique.admins
  for select using (auth.uid() = user_id);

grant usage on schema boutique to anon, authenticated;
grant select on boutique.admins to authenticated;
grant all on boutique.admins to service_role;

-- ============================================================
-- Cómo agregar tu primer admin:
-- 1. En Supabase → Authentication → Users → "Add user" → poné email + password
--    (marcá "Auto Confirm User" para no tener que confirmar por mail)
-- 2. Copiá el UUID que aparece.
-- 3. Corré:
--
--    insert into boutique.admins (user_id, email)
--    values ('EL-UUID-AQUI', 'admin@tu-email.com');
--
-- O más rápido, si ya lo creaste en Auth y no querés copiar UUID a mano:
--
--    insert into boutique.admins (user_id, email)
--    select id, email from auth.users where email = 'admin@tu-email.com'
--    on conflict do nothing;
-- ============================================================
