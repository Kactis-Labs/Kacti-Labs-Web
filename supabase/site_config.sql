-- ─────────────────────────────────────────────────────────────────────────────
-- KACTI LABS — Configuración del sitio
-- Ejecuta en: Supabase Dashboard → SQL Editor → New query
-- ─────────────────────────────────────────────────────────────────────────────

-- ── 1. Tabla de configuración (pares clave → valor) ──────────────────────────
CREATE TABLE IF NOT EXISTS public.site_config (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL DEFAULT '',
  label      TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  public.site_config       IS 'Configuración general del sitio web';
COMMENT ON COLUMN public.site_config.key   IS 'Clave única del ajuste';
COMMENT ON COLUMN public.site_config.value IS 'Valor del ajuste';
COMMENT ON COLUMN public.site_config.label IS 'Etiqueta legible para el panel de admin';

-- ── 2. RLS en site_config ────────────────────────────────────────────────────
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

-- Público puede leer la config (la landing la usa para meta tags)
CREATE POLICY "public_can_select_config"
  ON public.site_config FOR SELECT TO anon, authenticated USING (true);

-- Solo admin puede actualizar
CREATE POLICY "authenticated_can_update_config"
  ON public.site_config FOR UPDATE TO authenticated USING (true);

CREATE POLICY "authenticated_can_insert_config"
  ON public.site_config FOR INSERT TO authenticated WITH CHECK (true);

-- ── 3. Valores iniciales ──────────────────────────────────────────────────────
INSERT INTO public.site_config (key, value, label) VALUES
  ('site_title',       'Kacti Labs — Diseño Web Premium para Negocios Locales en Perú',                                                                                        'Título de la página (SEO)'),
  ('site_description', 'Kacti Labs es un estudio de diseño y desarrollo web premium para negocios locales en Perú. Páginas web profesionales, rápidas y optimizadas.', 'Descripción meta (SEO)'),
  ('og_description',   'Páginas web profesionales que generan confianza y convierten visitantes en clientes. Diseño premium para negocios locales en Perú.',             'Descripción Open Graph (redes sociales)'),
  ('contact_email',    'hola@kactilabs.com',                                                                                                                            'Email de contacto público'),
  ('contact_phone',    '+51 999 999 999',                                                                                                                               'Teléfono público'),
  ('whatsapp_number',  '51999999999',                                                                                                                                   'Número WhatsApp (sin + ni espacios)'),
  ('location',         'Lima, Perú',                                                                                                                                    'Ubicación pública')
ON CONFLICT (key) DO NOTHING;

SELECT 'Site config completado correctamente ✓' AS resultado;
