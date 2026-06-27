// src/lib/supabaseClient.js
// ─────────────────────────────────────────────────────────────────────────────
// Cliente Supabase inicializado con las variables de entorno públicas (VITE_*).
// Solo usa la Publishable key — NUNCA la Secret key en el frontend.
// ─────────────────────────────────────────────────────────────────────────────
import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    '[Supabase] Faltan variables de entorno: VITE_SUPABASE_URL y/o VITE_SUPABASE_ANON_KEY. ' +
    'Verifica tu archivo .env'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
