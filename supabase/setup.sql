-- ─────────────────────────────────────────────────────────────────────────────
-- KACTI LABS — Supabase Database Setup
-- Ejecuta este script completo en: Supabase Dashboard → SQL Editor → New query
-- ─────────────────────────────────────────────────────────────────────────────


-- ── 1. Crear la tabla de contactos ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.contacts (
  id             UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  name           TEXT          NOT NULL,
  email          TEXT          NOT NULL,
  contact_number TEXT          NULL,
  message        TEXT          NOT NULL,
  status         TEXT          NOT NULL DEFAULT 'Nuevo'
                               CHECK (status IN ('Nuevo', 'Contactado', 'Cerrado')),
  created_at     TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Comentarios de columnas (opcional pero útil en el dashboard)
COMMENT ON TABLE  public.contacts                IS 'Contactos recibidos desde el formulario de la landing page';
COMMENT ON COLUMN public.contacts.id             IS 'ID único autogenerado';
COMMENT ON COLUMN public.contacts.name           IS 'Nombre del remitente';
COMMENT ON COLUMN public.contacts.email          IS 'Correo electrónico del remitente';
COMMENT ON COLUMN public.contacts.contact_number IS 'Número de contacto (opcional)';
COMMENT ON COLUMN public.contacts.message        IS 'Mensaje enviado desde el formulario';
COMMENT ON COLUMN public.contacts.status         IS 'Estado del contacto: Nuevo | Contactado | Cerrado';
COMMENT ON COLUMN public.contacts.created_at     IS 'Fecha y hora del envío';


-- ── 2. Activar Row Level Security ────────────────────────────────────────────
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;


-- ── 3. Policy pública: cualquiera puede INSERTAR (enviar el formulario) ───────
CREATE POLICY "public_can_insert"
  ON public.contacts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);


-- ── 4. Policy admin: solo usuarios autenticados pueden LEER ──────────────────
CREATE POLICY "authenticated_can_select"
  ON public.contacts
  FOR SELECT
  TO authenticated
  USING (true);


-- ── 5. Policy admin: solo usuarios autenticados pueden ACTUALIZAR el estado ───
CREATE POLICY "authenticated_can_update"
  ON public.contacts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (status IN ('Nuevo', 'Contactado', 'Cerrado'));


-- ── 6. Nadie puede ELIMINAR registros (ni siquiera el admin desde el panel) ───
--    Para eliminar, hazlo directamente desde el dashboard de Supabase.
--    (No se crea policy de DELETE → RLS lo bloquea por defecto)


-- ── 7. Índice para ordenar por fecha rápidamente ─────────────────────────────
CREATE INDEX IF NOT EXISTS contacts_created_at_idx
  ON public.contacts (created_at DESC);


-- ── Verificación ──────────────────────────────────────────────────────────────
-- Después de ejecutar, deberías ver:
--   ✓ Tabla "contacts" en Table Editor
--   ✓ RLS habilitado (candado verde en la tabla)
--   ✓ 3 policies listadas en Authentication → Policies

SELECT 'Setup completado correctamente' AS resultado;
