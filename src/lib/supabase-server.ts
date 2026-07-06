import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
const schema = process.env.NEXT_PUBLIC_SUPABASE_SCHEMA || "boutique";

// Cliente para RSC / server actions / route handlers — con cookies de session.
export function ssrClient() {
  const store = cookies();
  return createServerClient(url, anon, {
    cookies: {
      get: (name) => store.get(name)?.value,
      set: (name, value, options: CookieOptions) => {
        try { store.set({ name, value, ...options }); } catch {}
      },
      remove: (name, options: CookieOptions) => {
        try { store.set({ name, value: "", ...options }); } catch {}
      },
    },
    db: { schema },
  });
}

// Cliente admin (service_role) — bypass RLS. Solo server-side.
export function adminClient() {
  if (!service) return null;
  return createClient(url, service, {
    db: { schema },
    auth: { persistSession: false },
  });
}
