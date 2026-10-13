import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const BUCKET_FOTOS = "fotos-cotizaciones";

let cliente: SupabaseClient | null | undefined;

/**
 * Cliente de Supabase con la llave de servicio (solo servidor).
 * Devuelve null si faltan las variables de entorno, para que el sitio
 * funcione en desarrollo sin cuentas configuradas.
 */
export function supabaseAdmin(): SupabaseClient | null {
  if (cliente !== undefined) return cliente;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const llave = process.env.SUPABASE_SERVICE_ROLE_KEY;
  cliente = url && llave ? createClient(url, llave, { auth: { persistSession: false } }) : null;
  return cliente;
}
