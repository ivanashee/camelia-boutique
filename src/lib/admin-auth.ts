import { ssrClient } from "./supabase-server";

// Un usuario es admin si:
//  1. Tiene sesión activa en Supabase Auth
//  2. Su user_id existe en la tabla boutique.admins
export async function isAdmin(): Promise<boolean> {
  const sb = ssrClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return false;
  const { data } = await sb.from("admins").select("user_id").eq("user_id", user.id).maybeSingle();
  return Boolean(data);
}

export async function getSessionUser() {
  const sb = ssrClient();
  const { data: { user } } = await sb.auth.getUser();
  return user;
}
