-- ─────────────────────────────────────────────────────────────────────────────
-- KACTI LABS — Proyectos / Portafolio
-- Ejecuta en: Supabase Dashboard → SQL Editor → New query
-- ─────────────────────────────────────────────────────────────────────────────

-- ── 1. Tabla de proyectos ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.projects (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,
  category    TEXT        NOT NULL,
  tag         TEXT        NOT NULL DEFAULT 'Proyecto',
  description TEXT        NOT NULL,
  image_url   TEXT        NULL,
  project_url TEXT        NULL,
  plan        TEXT        NULL,
  color       TEXT        NOT NULL DEFAULT '#0f0f0f',
  accent      TEXT        NOT NULL DEFAULT '#8fad6e',
  featured    BOOLEAN     NOT NULL DEFAULT false,
  sort_order  INTEGER     NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  public.projects             IS 'Proyectos del portafolio de Kacti Labs';
COMMENT ON COLUMN public.projects.name        IS 'Nombre del proyecto / cliente';
COMMENT ON COLUMN public.projects.category    IS 'Categoría del proyecto (Restaurante, Clínica, etc.)';
COMMENT ON COLUMN public.projects.tag         IS 'Etiqueta de estado (Concepto, Propuesta, Entregado)';
COMMENT ON COLUMN public.projects.image_url   IS 'URL pública de la imagen (Supabase Storage)';
COMMENT ON COLUMN public.projects.project_url IS 'URL del proyecto live (opcional)';
COMMENT ON COLUMN public.projects.color       IS 'Color de fondo de la tarjeta (hex)';
COMMENT ON COLUMN public.projects.accent      IS 'Color de acento (hex)';
COMMENT ON COLUMN public.projects.featured    IS 'Si aparece destacado en el portafolio';
COMMENT ON COLUMN public.projects.sort_order  IS 'Orden de aparición en el portafolio';

-- ── 2. RLS en projects ────────────────────────────────────────────────────────
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Público puede leer proyectos (la landing los muestra)
CREATE POLICY "public_can_select_projects"
  ON public.projects FOR SELECT TO anon, authenticated USING (true);

-- Solo admin puede crear/editar/eliminar
CREATE POLICY "authenticated_can_insert_projects"
  ON public.projects FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "authenticated_can_update_projects"
  ON public.projects FOR UPDATE TO authenticated USING (true);

CREATE POLICY "authenticated_can_delete_projects"
  ON public.projects FOR DELETE TO authenticated USING (true);

-- ── 3. Índice por orden ───────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS projects_sort_order_idx
  ON public.projects (sort_order ASC, created_at DESC);

-- ── 4. Datos iniciales (los 4 proyectos actuales de la landing) ───────────────
INSERT INTO public.projects (name, category, tag, description, color, accent, plan, sort_order)
VALUES
  ('La Hacienda',   'Restaurante',       'Concepto',            'Landing page elegante con menú visual y reservas online para restaurante gourmet peruano.',     '#1a0f00', '#c9883a', 'Profesional', 1),
  ('Sonría Dental', 'Clínica dental',    'Propuesta de diseño', 'Web institucional con agenda online y galería de casos para clínica odontológica moderna.',      '#001f2e', '#2eb8b8', 'Profesional', 2),
  ('FORGE Gym',     'Centro de fitness', 'Concepto',            'Sitio de alto impacto con planes de membresía y horario de clases para gimnasio premium.',       '#0f0f0f', '#e85d04', 'Premium',     3),
  ('Zenith Spa',    'Spa & Bienestar',   'Propuesta de diseño', 'Experiencia web serena con galería inmersiva y sistema de reservas para spa de lujo.',           '#1c2416', '#8fad6e', 'Profesional', 4)
ON CONFLICT DO NOTHING;

SELECT 'Projects setup completado correctamente ✓' AS resultado;
