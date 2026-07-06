import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
const schema = process.env.NEXT_PUBLIC_SUPABASE_SCHEMA || "boutique";

export const supabaseConfigured = Boolean(url && anon);

export function browserClient(): SupabaseClient | null {
  if (!supabaseConfigured) return null;
  return createClient(url!, anon!, { db: { schema } });
}

export function serverClient(): SupabaseClient | null {
  if (!url) return null;
  const key = service || anon;
  if (!key) return null;
  return createClient(url, key, {
    db: { schema },
    auth: { persistSession: false },
  });
}

export const SCHEMA = schema;
