// Legacy shim — reexporta desde supabase-server para código viejo.
// Nuevos módulos deberían importar de "@/lib/supabase-server".
export { adminClient as serverClient } from "./supabase-server";

export const supabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const SCHEMA = process.env.NEXT_PUBLIC_SUPABASE_SCHEMA || "boutique";
