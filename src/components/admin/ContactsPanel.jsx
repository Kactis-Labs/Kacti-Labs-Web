// src/components/admin/ContactsPanel.jsx
// CRM mejorado: notas internas, 4 estados, filtros por estado y fecha
import { useEffect, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabaseClient';

const STATUS_OPTIONS = ['Nuevo', 'Contactado', 'En negociación', 'Cerrado'];
const STATUS_STYLE = {
  'Nuevo':          { bg: 'rgba(143,173,110,0.15)', color: '#8fad6e', border: 'rgba(143,173,110,0.35)' },
  'Contactado':     { bg: 'rgba(96,165,250,0.15)',  color: '#60a5fa', border: 'rgba(96,165,250,0.35)'  },
  'En negociación': { bg: 'rgba(251,191,36,0.15)',  color: '#fbbf24', border: 'rgba(251,191,36,0.35)'  },
  'Cerrado':        { bg: 'rgba(148,163,184,0.12)', color: '#94a3b8', border: 'rgba(148,163,184,0.25)' },
};

const fmtDate = (iso) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('es-PE', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const fmtDateShort = (iso) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' });
};

const exportCSV = (rows) => {
  const h = ['ID', 'Nombre', 'Email', 'Número', 'Mensaje', 'Estado', 'Fecha'];
  const csv = [h.join(','), ...rows.map(r => [
    r.id,
    `"${(r.name||'').replace(/"/g,'""')}"`,
    `"${(r.email||'').replace(/"/g,'""')}"`,
    `"${(r.contact_number||'').replace(/"/g,'""')}"`,
    `"${(r.message||'').replace(/"/g,'""')}"`,
    r.status, fmtDate(r.created_at),
  ].join(','))].join('\n');
  const blob = new Blob(['\uFEFF'+csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `contactos-${new Date().toISOString().slice(0,10)}.csv`; a.click();
  URL.revokeObjectURL(url);
};

const s = {
  bg:'#0a0a0a', surface:'#111111', border:'rgba(255,255,255,0.07)',
  accent:'#8fad6e', accentDim:'rgba(143,173,110,0.12)',
  text:'#e2e8f0', muted:'rgba(255,255,255,0.4)',
  fontH:"'Space Grotesk', sans-serif", fontS:"'Inter', sans-serif",
};

// ── Note row ─────────────────────────────────────────────────────────────────
const NoteItem = ({ note, onDelete }) => (
  <div style={{
    padding: '12px 14px', borderRadius: '10px',
    background: 'rgba(255,255,255,0.03)', border: `1px solid ${s.border}`,
    marginBottom: '8px',
  }}>
    <p style={{ margin: '0 0 6px', fontSize: '13px', color: s.text, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
      {note.note}
    </p>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: '11px', color: s.muted }}>{fmtDate(note.created_at)}</span>
      <button
        onClick={() => onDelete(note.id)}
        style={{ background: 'none', border: 'none', color: 'rgba(252,165,165,0.5)', cursor: 'pointer', fontSize: '11px', padding: '2px 6px' }}
        onMouseEnter={e => { e.currentTarget.style.color = '#fca5a5'; }}
        onMouseLeave={e => { e.currentTarget.style.color = 'rgba(252,165,165,0.5)'; }}
      >
        Eliminar
      </button>
    </div>
  </div>
);

// ── Detail slide-in panel ─────────────────────────────────────────────────────
const DetailPanel = ({ contact, onClose, onStatusChange, updating }) => {
  const [notes, setNotes]         = useState([]);
  const [newNote, setNewNote]     = useState('');
  const [savingNote, setSaving]   = useState(false);
  const [localStatus, setLocal]   = useState(contact.status);

  useEffect(() => {
    supabase.from('contact_notes').select('*').eq('contact_id', contact.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => setNotes(data || []));
  }, [contact.id]);

  const addNote = async () => {
    if (!newNote.trim()) return;
    setSaving(true);
    const { data, error } = await supabase.from('contact_notes').insert([{ contact_id: contact.id, note: newNote.trim() }]).select().single();
    if (!error && data) { setNotes(prev => [data, ...prev]); setNewNote(''); }
    setSaving(false);
  };

  const deleteNote = async (id) => {
    await supabase.from('contact_notes').delete().eq('id', id);
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const handleStatus = (val) => { setLocal(val); onStatusChange(contact.id, val); };

  const st = STATUS_STYLE[localStatus] || STATUS_STYLE['Nuevo'];

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position:'fixed', inset:0, zIndex:200, background:'rgba(0,0,0,0.65)', backdropFilter:'blur(4px)' }} />
      <motion.div
        initial={{ opacity:0, x:64 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:64 }}
        transition={{ type:'spring', damping:28, stiffness:300 }}
        style={{
          position:'fixed', top:0, right:0, bottom:0, zIndex:300,
          width:'100%', maxWidth:'500px',
          background:'#111111', borderLeft:`1px solid ${s.border}`,
          overflowY:'auto', padding:'28px', boxShadow:'-24px 0 64px rgba(0,0,0,0.5)',
        }}
      >
        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'24px' }}>
          <div>
            <h2 style={{ fontFamily:s.fontH, fontSize:'20px', fontWeight:700, color:'#fff', margin:'0 0 6px', letterSpacing:'-0.01em' }}>
              {contact.name}
            </h2>
            <span style={{ display:'inline-block', padding:'3px 10px', borderRadius:'20px', background:st.bg, color:st.color, border:`1px solid ${st.border}`, fontSize:'12px', fontWeight:600 }}>
              {localStatus}
            </span>
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', color:s.muted, cursor:'pointer', fontSize:'20px', lineHeight:1, padding:'4px' }}
            onMouseEnter={e=>{e.currentTarget.style.color='#fff'}} onMouseLeave={e=>{e.currentTarget.style.color=s.muted}}>✕</button>
        </div>

        {/* Info */}
        <div style={{ display:'flex', flexDirection:'column', gap:'8px', marginBottom:'24px' }}>
          {[
            { label:'Email',    val: contact.email },
            { label:'Número',   val: contact.contact_number || 'No proporcionado' },
            { label:'Recibido', val: fmtDate(contact.created_at) },
          ].map(({ label, val }) => (
            <div key={label} style={{ display:'flex', gap:'12px', padding:'10px 14px', background:'rgba(255,255,255,0.03)', borderRadius:'9px', border:`1px solid ${s.border}` }}>
              <span style={{ fontSize:'11px', color:s.muted, textTransform:'uppercase', letterSpacing:'0.06em', whiteSpace:'nowrap', minWidth:'60px', paddingTop:'2px' }}>{label}</span>
              <span style={{ fontSize:'13px', color:s.text, fontWeight:500 }}>{val}</span>
            </div>
          ))}
        </div>

        {/* Message */}
        <div style={{ marginBottom:'24px' }}>
          <div style={{ fontSize:'11px', fontWeight:600, color:s.muted, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'8px' }}>Mensaje</div>
          <div style={{ padding:'16px', background:'rgba(255,255,255,0.03)', border:`1px solid ${s.border}`, borderRadius:'10px', fontSize:'13px', color:s.text, lineHeight:1.7, whiteSpace:'pre-wrap' }}>
            {contact.message}
          </div>
        </div>

        {/* Status update */}
        <div style={{ marginBottom:'28px' }}>
          <div style={{ fontSize:'11px', fontWeight:600, color:s.muted, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'8px' }}>Cambiar estado</div>
          <div style={{ display:'flex', gap:'6px', flexWrap:'wrap' }}>
            {STATUS_OPTIONS.map(opt => {
              const st2 = STATUS_STYLE[opt];
              const isActive = localStatus === opt;
              return (
                <button key={opt} disabled={isActive || updating === contact.id}
                  onClick={() => handleStatus(opt)}
                  style={{
                    flex:1, minWidth:'80px', padding:'9px 6px', borderRadius:'9px',
                    border:`1px solid ${isActive ? st2.border : s.border}`,
                    background: isActive ? st2.bg : 'transparent',
                    color: isActive ? st2.color : s.muted,
                    cursor: isActive ? 'default' : 'pointer',
                    fontSize:'12px', fontWeight:600, fontFamily:s.fontS,
                    transition:'all 0.15s', opacity: updating === contact.id ? 0.6 : 1,
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor=st2.border; e.currentTarget.style.color=st2.color; e.currentTarget.style.background=st2.bg; } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor=s.border; e.currentTarget.style.color=s.muted; e.currentTarget.style.background='transparent'; } }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notes */}
        <div>
          <div style={{ fontSize:'11px', fontWeight:600, color:s.muted, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'12px' }}>
            Notas internas ({notes.length})
          </div>
          <div style={{ marginBottom:'12px' }}>
            <textarea
              value={newNote}
              onChange={e => setNewNote(e.target.value)}
              placeholder="Escribe una nota interna..."
              rows={3}
              style={{
                width:'100%', padding:'12px 14px', boxSizing:'border-box',
                background:'rgba(255,255,255,0.05)', border:`1px solid ${s.border}`,
                borderRadius:'10px', color:s.text, fontSize:'13px',
                fontFamily:s.fontS, outline:'none', resize:'vertical',
                transition:'border-color 0.2s',
              }}
              onFocus={e => { e.target.style.borderColor=s.accent; }}
              onBlur={e  => { e.target.style.borderColor=s.border; }}
            />
            <button
              onClick={addNote} disabled={savingNote || !newNote.trim()}
              style={{
                marginTop:'8px', width:'100%', padding:'10px',
                background: s.accentDim, border:`1px solid rgba(143,173,110,0.3)`,
                borderRadius:'9px', color:s.accent, fontFamily:s.fontS,
                fontSize:'13px', fontWeight:600, cursor: !newNote.trim() ? 'not-allowed' : 'pointer',
                opacity: !newNote.trim() ? 0.5 : 1, transition:'all 0.15s',
              }}
            >
              {savingNote ? 'Guardando…' : '+ Agregar nota'}
            </button>
          </div>
          {notes.length === 0 && (
            <p style={{ fontSize:'13px', color:s.muted, textAlign:'center', padding:'16px 0' }}>Aún no hay notas para este contacto.</p>
          )}
          {notes.map(n => <NoteItem key={n.id} note={n} onDelete={deleteNote} />)}
        </div>
      </motion.div>
    </>
  );
};

// ── Main Panel ────────────────────────────────────────────────────────────────
const ContactsPanel = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortDir, setSortDir]   = useState('desc');
  const [detail, setDetail]     = useState(null);
  const [updating, setUpdating] = useState(null);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('contacts').select('*').order('created_at', { ascending: sortDir === 'asc' });
    setContacts(data || []);
    setLoading(false);
  }, [sortDir]);

  useEffect(() => { fetchContacts(); }, [fetchContacts]);

  const filtered = useMemo(() => {
    let rows = contacts;
    if (filterStatus) rows = rows.filter(c => c.status === filterStatus);
    const q = search.toLowerCase().trim();
    if (q) rows = rows.filter(c => c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q) || c.contact_number?.toLowerCase().includes(q));
    return rows;
  }, [contacts, search, filterStatus]);

  const counters = useMemo(() => ({
    total:      contacts.length,
    nuevo:      contacts.filter(c => c.status === 'Nuevo').length,
    contactado: contacts.filter(c => c.status === 'Contactado').length,
    negociacion:contacts.filter(c => c.status === 'En negociación').length,
    cerrado:    contacts.filter(c => c.status === 'Cerrado').length,
  }), [contacts]);

  const handleStatusChange = async (id, newStatus) => {
    setUpdating(id);
    const { error } = await supabase.from('contacts').update({ status: newStatus }).eq('id', id);
    if (!error) {
      setContacts(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
      if (detail?.id === id) setDetail(prev => ({ ...prev, status: newStatus }));
    }
    setUpdating(null);
  };

  return (
    <div style={{ padding:'32px', minHeight:'100vh' }}>
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'28px' }}>
        <div>
          <h1 style={{ fontFamily:s.fontH, fontSize:'22px', fontWeight:700, color:'#fff', margin:'0 0 4px', letterSpacing:'-0.01em' }}>Contactos</h1>
          <p style={{ fontSize:'13px', color:s.muted, margin:0 }}>Leads recibidos desde el formulario de la landing</p>
        </div>
        <div style={{ display:'flex', gap:'8px' }}>
          <button onClick={fetchContacts}
            style={{ display:'flex', alignItems:'center', gap:'6px', padding:'9px 14px', borderRadius:'9px', background:'transparent', border:`1px solid ${s.border}`, color:s.muted, cursor:'pointer', fontSize:'13px', transition:'all 0.15s', fontFamily:s.fontS }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=s.accent;e.currentTarget.style.color=s.accent}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=s.border;e.currentTarget.style.color=s.muted}}>
            ↻ Actualizar
          </button>
        </div>
      </div>

      {/* Counters */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:'12px', marginBottom:'24px' }}>
        {[
          { label:'Total',          val:counters.total,       ...STATUS_STYLE['Nuevo']          },
          { label:'Nuevos',         val:counters.nuevo,       ...STATUS_STYLE['Nuevo']          },
          { label:'Contactados',    val:counters.contactado,  ...STATUS_STYLE['Contactado']     },
          { label:'En negociación', val:counters.negociacion, ...STATUS_STYLE['En negociación'] },
          { label:'Cerrados',       val:counters.cerrado,     ...STATUS_STYLE['Cerrado']        },
        ].map(({ label, val, bg, color }) => (
          <div key={label} style={{ background:s.surface, border:`1px solid ${s.border}`, borderRadius:'12px', padding:'16px 18px' }}>
            <div style={{ fontSize:'10px', color:s.muted, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'8px' }}>{label}</div>
            <div style={{ fontFamily:s.fontH, fontSize:'28px', fontWeight:700, color, lineHeight:1 }}>{loading ? '—' : val}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display:'flex', gap:'10px', marginBottom:'14px', flexWrap:'wrap' }}>
        <div style={{ position:'relative', flex:1, minWidth:'220px' }}>
          <span style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', color:s.muted, pointerEvents:'none', fontSize:'14px' }}>⌕</span>
          <input type="search" placeholder="Buscar por nombre, email o número..." value={search} onChange={e=>setSearch(e.target.value)}
            style={{ width:'100%', padding:'10px 14px 10px 34px', background:s.surface, border:`1px solid ${s.border}`, borderRadius:'9px', color:s.text, fontSize:'13px', fontFamily:s.fontS, outline:'none', boxSizing:'border-box', transition:'border-color 0.2s' }}
            onFocus={e=>{e.target.style.borderColor=s.accent}} onBlur={e=>{e.target.style.borderColor=s.border}} />
        </div>
        <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}
          style={{ padding:'10px 14px', background:s.surface, border:`1px solid ${s.border}`, borderRadius:'9px', color:s.text, fontSize:'13px', fontFamily:s.fontS, outline:'none', cursor:'pointer' }}>
          <option value="">Todos los estados</option>
          {STATUS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <button onClick={() => setSortDir(d => d==='desc'?'asc':'desc')}
          style={{ padding:'10px 14px', background:s.surface, border:`1px solid ${s.border}`, borderRadius:'9px', color:s.text, fontSize:'13px', fontFamily:s.fontS, cursor:'pointer', whiteSpace:'nowrap', transition:'border-color 0.15s' }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=s.accent}} onMouseLeave={e=>{e.currentTarget.style.borderColor=s.border}}>
          Fecha {sortDir==='desc'?'↓':'↑'}
        </button>
        <button onClick={() => exportCSV(filtered)} disabled={filtered.length===0}
          style={{ display:'flex', alignItems:'center', gap:'6px', padding:'10px 14px', background:s.accentDim, border:`1px solid rgba(143,173,110,0.3)`, borderRadius:'9px', color:s.accent, fontSize:'13px', fontFamily:s.fontS, fontWeight:600, cursor:filtered.length===0?'not-allowed':'pointer', opacity:filtered.length===0?0.5:1, whiteSpace:'nowrap' }}>
          ↓ CSV ({filtered.length})
        </button>
      </div>

      {/* Table */}
      <div style={{ background:s.surface, border:`1px solid ${s.border}`, borderRadius:'14px', overflow:'hidden' }}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 2fr 1.3fr 1.4fr 1.3fr 70px', padding:'11px 18px', borderBottom:`1px solid ${s.border}`, background:'rgba(255,255,255,0.02)' }}>
          {['Nombre','Email','Número','Fecha','Estado',''].map(h => (
            <span key={h} style={{ fontSize:'10px', fontWeight:600, color:s.muted, letterSpacing:'0.07em', textTransform:'uppercase' }}>{h}</span>
          ))}
        </div>
        {loading ? (
          <div style={{ padding:'48px', textAlign:'center', color:s.muted, fontSize:'13px' }}>Cargando…</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding:'56px', textAlign:'center', color:s.muted, fontSize:'13px' }}>
            {search || filterStatus ? 'Sin resultados para esa búsqueda.' : 'Aún no hay contactos registrados.'}
          </div>
        ) : filtered.map((c, i) => {
          const st = STATUS_STYLE[c.status] || STATUS_STYLE['Nuevo'];
          return (
            <div key={c.id}
              style={{ display:'grid', gridTemplateColumns:'2fr 2fr 1.3fr 1.4fr 1.3fr 70px', padding:'13px 18px', borderBottom: i < filtered.length-1 ? `1px solid ${s.border}` : 'none', alignItems:'center', cursor:'pointer', transition:'background 0.12s' }}
              onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.025)'}}
              onMouseLeave={e=>{e.currentTarget.style.background='transparent'}}
              onClick={() => setDetail(c)}
            >
              <span style={{ fontSize:'13px', fontWeight:600, color:s.text, paddingRight:'10px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{c.name}</span>
              <span style={{ fontSize:'12px', color:s.muted, paddingRight:'10px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{c.email}</span>
              <span style={{ fontSize:'12px', color:s.muted }}>{c.contact_number || <span style={{opacity:0.35}}>—</span>}</span>
              <span style={{ fontSize:'11px', color:s.muted }}>{fmtDateShort(c.created_at)}</span>
              <div onClick={e=>e.stopPropagation()}>
                <select value={c.status} disabled={updating===c.id} onChange={e=>handleStatusChange(c.id,e.target.value)}
                  style={{ padding:'4px 8px', borderRadius:'20px', border:`1px solid ${st.border}`, background:st.bg, color:st.color, fontSize:'11px', fontWeight:600, fontFamily:s.fontS, cursor:'pointer', outline:'none', opacity:updating===c.id?0.6:1 }}>
                  {STATUS_OPTIONS.map(o => <option key={o} value={o} style={{background:'#1a1a1a',color:'#e2e8f0'}}>{o}</option>)}
                </select>
              </div>
              <div style={{textAlign:'right'}} onClick={e=>e.stopPropagation()}>
                <button onClick={()=>setDetail(c)}
                  style={{ padding:'5px 10px', borderRadius:'7px', background:'transparent', border:`1px solid ${s.border}`, color:s.muted, cursor:'pointer', fontSize:'11px', fontFamily:s.fontS, transition:'all 0.15s' }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=s.accent;e.currentTarget.style.color=s.accent}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=s.border;e.currentTarget.style.color=s.muted}}>
                  Ver
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {filtered.length > 0 && (
        <p style={{ marginTop:'10px', fontSize:'11px', color:s.muted, textAlign:'right' }}>
          {filtered.length} de {contacts.length} contactos
        </p>
      )}

      {/* Detail panel */}
      <AnimatePresence>
        {detail && (
          <DetailPanel
            contact={detail}
            onClose={() => setDetail(null)}
            onStatusChange={handleStatusChange}
            updating={updating}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactsPanel;
