-- ─────────────────────────────────────────────────────────────────────────────
-- KACTI LABS — CRM Update
-- Ejecuta en: Supabase Dashboard → SQL Editor → New query
-- Agrega: estado "En negociación", tabla de notas internas
-- ─────────────────────────────────────────────────────────────────────────────

-- ── 1. Actualizar constraint de status en contacts ────────────────────────────
ALTER TABLE public.contacts
  DROP CONSTRAINT IF EXISTS contacts_status_check;

ALTER TABLE public.contacts
  ADD CONSTRAINT contacts_status_check
  CHECK (status IN ('Nuevo', 'Contactado', 'En negociación', 'Cerrado'));

COMMENT ON COLUMN public.contacts.status IS
  'Estado del contacto: Nuevo | Contactado | En negociación | Cerrado';


-- ── 2. Tabla de notas internas por contacto ───────────────────────────────────
CREATE TABLE IF NOT EXISTS public.contact_notes (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id UUID        NOT NULL REFERENCES public.contacts(id) ON DELETE CASCADE,
  note       TEXT        NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  public.contact_notes            IS 'Notas internas del admin por contacto';
COMMENT ON COLUMN public.contact_notes.contact_id IS 'Referencia al contacto';
COMMENT ON COLUMN public.contact_notes.note       IS 'Texto de la nota interna';

-- ── 3. RLS en contact_notes ──────────────────────────────────────────────────
ALTER TABLE public.contact_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "authenticated_can_select_notes"
  ON public.contact_notes FOR SELECT TO authenticated USING (true);

CREATE POLICY "authenticated_can_insert_notes"
  ON public.contact_notes FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "authenticated_can_delete_notes"
  ON public.contact_notes FOR DELETE TO authenticated USING (true);

-- ── 4. Índice para buscar notas por contacto ──────────────────────────────────
CREATE INDEX IF NOT EXISTS contact_notes_contact_id_idx
  ON public.contact_notes (contact_id, created_at DESC);

SELECT 'CRM update completado correctamente ✓' AS resultado;
