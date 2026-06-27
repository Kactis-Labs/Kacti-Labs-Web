// src/components/admin/PortfolioPanel.jsx
// CRUD completo de proyectos + subida de imágenes a Supabase Storage
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabaseClient';

const BUCKET = 'portfolio-images';

const EMPTY_FORM = {
  name: '', category: '', tag: 'Concepto', description: '',
  image_url: '', project_url: '', plan: '', color: '#0f0f0f',
  accent: '#8fad6e', featured: false, sort_order: 0,
};

const TAG_OPTIONS  = ['Concepto', 'Propuesta de diseño', 'Entregado', 'En desarrollo'];
const PLAN_OPTIONS = ['', 'Esencial', 'Profesional', 'Premium'];

const s = {
  bg:'#0a0a0a', surface:'#111111', border:'rgba(255,255,255,0.07)',
  accent:'#8fad6e', accentDim:'rgba(143,173,110,0.12)',
  text:'#e2e8f0', muted:'rgba(255,255,255,0.4)',
  fontH:"'Space Grotesk', sans-serif", fontS:"'Inter', sans-serif",
};

// ── Form field helpers ────────────────────────────────────────────────────────
const Field = ({ label, required, children }) => (
  <div>
    <label style={{ display:'block', fontSize:'11px', fontWeight:600, color:s.muted, letterSpacing:'0.07em', textTransform:'uppercase', marginBottom:'7px' }}>
      {label}{required && <span style={{color:'#f87171',marginLeft:'3px'}}>*</span>}
    </label>
    {children}
  </div>
);

const inputSx = {
  width:'100%', padding:'11px 14px', boxSizing:'border-box',
  background:'rgba(255,255,255,0.05)', border:`1px solid rgba(255,255,255,0.1)`,
  borderRadius:'9px', color:s.text, fontSize:'13px',
  fontFamily:s.fontS, outline:'none', transition:'border-color 0.2s',
};
const focusIn  = e => { e.target.style.borderColor = s.accent; };
const focusOut = e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; };

// ── Project modal ─────────────────────────────────────────────────────────────
const ProjectModal = ({ project, onClose, onSaved }) => {
  const isNew = !project;
  const [form, setForm] = useState(isNew ? EMPTY_FORM : {
    name: project.name, category: project.category, tag: project.tag,
    description: project.description, image_url: project.image_url || '',
    project_url: project.project_url || '', plan: project.plan || '',
    color: project.color, accent: project.accent,
    featured: project.featured, sort_order: project.sort_order,
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving]       = useState(false);
  const [uploadError, setUpErr]   = useState('');

  const setF = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setUpErr('La imagen no puede superar 5 MB'); return; }
    setUploading(true); setUpErr('');
    const ext  = file.name.split('.').pop();
    const path = `project-${Date.now()}.${ext}`;
    const { data, error } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: true, contentType: file.type });
    if (error) {
      // Bucket might not exist yet
      if (error.message?.includes('Bucket not found') || error.message?.includes('bucket')) {
        setUpErr('El bucket "portfolio-images" no existe aún. Créalo en Supabase → Storage → New bucket (nombre: portfolio-images, tipo: Public).');
      } else {
        setUpErr(`Error al subir: ${error.message}`);
      }
      setUploading(false); return;
    }
    const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(data.path);
    setF('image_url', publicUrl);
    setUploading(false);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.category.trim() || !form.description.trim()) return;
    setSaving(true);
    const payload = {
      name: form.name.trim(), category: form.category.trim(), tag: form.tag,
      description: form.description.trim(), image_url: form.image_url || null,
      project_url: form.project_url || null, plan: form.plan || null,
      color: form.color, accent: form.accent, featured: form.featured,
      sort_order: Number(form.sort_order) || 0,
    };
    let error;
    if (isNew) {
      ({ error } = await supabase.from('projects').insert([payload]));
    } else {
      ({ error } = await supabase.from('projects').update(payload).eq('id', project.id));
    }
    setSaving(false);
    if (!error) onSaved();
  };

  return (
    <>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}
        style={{position:'fixed',inset:0,zIndex:200,background:'rgba(0,0,0,0.7)',backdropFilter:'blur(4px)'}} />
      <motion.div
        initial={{opacity:0,scale:0.96}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.96}}
        transition={{type:'spring',damping:28,stiffness:350}}
        style={{
          position:'fixed', top:'5vh', left:'50%', transform:'translateX(-50%)',
          zIndex:300, width:'100%', maxWidth:'580px', maxHeight:'90vh',
          background:'#131313', border:`1px solid ${s.border}`,
          borderRadius:'18px', overflowY:'auto', padding:'28px',
          boxShadow:'0 32px 80px rgba(0,0,0,0.6)',
        }}
      >
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px' }}>
          <h2 style={{ fontFamily:s.fontH, fontSize:'18px', fontWeight:700, color:'#fff', margin:0 }}>
            {isNew ? 'Nuevo proyecto' : 'Editar proyecto'}
          </h2>
          <button onClick={onClose} style={{background:'none',border:'none',color:s.muted,cursor:'pointer',fontSize:'20px',lineHeight:1,padding:'4px'}}
            onMouseEnter={e=>{e.currentTarget.style.color='#fff'}} onMouseLeave={e=>{e.currentTarget.style.color=s.muted}}>✕</button>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
            <Field label="Nombre del proyecto" required>
              <input value={form.name} onChange={e=>setF('name',e.target.value)} placeholder="Ej. La Hacienda" style={inputSx} onFocus={focusIn} onBlur={focusOut} />
            </Field>
            <Field label="Categoría" required>
              <input value={form.category} onChange={e=>setF('category',e.target.value)} placeholder="Ej. Restaurante" style={inputSx} onFocus={focusIn} onBlur={focusOut} />
            </Field>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
            <Field label="Etiqueta (tag)">
              <select value={form.tag} onChange={e=>setF('tag',e.target.value)} style={{...inputSx,cursor:'pointer'}}>
                {TAG_OPTIONS.map(o=><option key={o} value={o} style={{background:'#1a1a1a'}}>{o}</option>)}
              </select>
            </Field>
            <Field label="Plan">
              <select value={form.plan} onChange={e=>setF('plan',e.target.value)} style={{...inputSx,cursor:'pointer'}}>
                {PLAN_OPTIONS.map(o=><option key={o} value={o} style={{background:'#1a1a1a'}}>{o||'Sin plan'}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Descripción" required>
            <textarea value={form.description} onChange={e=>setF('description',e.target.value)}
              placeholder="Describe el proyecto brevemente..." rows={3}
              style={{...inputSx, resize:'vertical', minHeight:'80px'}} onFocus={focusIn} onBlur={focusOut} />
          </Field>

          {/* Image upload */}
          <Field label="Imagen del proyecto">
            <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
              {form.image_url && (
                <div style={{ position:'relative', borderRadius:'10px', overflow:'hidden', maxHeight:'160px', background:'#0a0a0a' }}>
                  <img src={form.image_url} alt="preview" style={{ width:'100%', height:'160px', objectFit:'cover', display:'block' }} />
                  <button onClick={()=>setF('image_url','')}
                    style={{ position:'absolute', top:'8px', right:'8px', background:'rgba(0,0,0,0.75)', border:'none', color:'#fff', borderRadius:'6px', padding:'4px 8px', cursor:'pointer', fontSize:'12px' }}>
                    Quitar
                  </button>
                </div>
              )}
              <label style={{
                display:'flex', alignItems:'center', justifyContent:'center', gap:'8px',
                padding:'12px', borderRadius:'9px', border:`1.5px dashed rgba(255,255,255,0.15)`,
                cursor:'pointer', color:s.muted, fontSize:'13px', transition:'all 0.15s',
              }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=s.accent;e.currentTarget.style.color=s.accent}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.15)';e.currentTarget.style.color=s.muted}}
              >
                <input type="file" accept="image/*" onChange={handleImage} style={{display:'none'}} />
                {uploading ? '⏳ Subiendo imagen…' : '↑ Subir imagen (máx. 5 MB)'}
              </label>
              {uploadError && <p style={{fontSize:'12px',color:'#f87171',margin:0}}>{uploadError}</p>}
              <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                <div style={{ flex:1, height:'1px', background:s.border }} />
                <span style={{ fontSize:'11px', color:s.muted }}>o pega una URL</span>
                <div style={{ flex:1, height:'1px', background:s.border }} />
              </div>
              <input value={form.image_url} onChange={e=>setF('image_url',e.target.value)} placeholder="https://..." style={inputSx} onFocus={focusIn} onBlur={focusOut} />
            </div>
          </Field>

          <Field label="URL del proyecto (opcional)">
            <input value={form.project_url} onChange={e=>setF('project_url',e.target.value)} placeholder="https://..." style={inputSx} onFocus={focusIn} onBlur={focusOut} />
          </Field>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 80px', gap:'12px' }}>
            <Field label="Color de fondo">
              <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
                <input type="color" value={form.color} onChange={e=>setF('color',e.target.value)}
                  style={{ width:'40px', height:'40px', borderRadius:'8px', border:`1px solid ${s.border}`, background:'none', cursor:'pointer', padding:'2px' }} />
                <input value={form.color} onChange={e=>setF('color',e.target.value)} style={{...inputSx}} onFocus={focusIn} onBlur={focusOut} />
              </div>
            </Field>
            <Field label="Color de acento">
              <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
                <input type="color" value={form.accent} onChange={e=>setF('accent',e.target.value)}
                  style={{ width:'40px', height:'40px', borderRadius:'8px', border:`1px solid ${s.border}`, background:'none', cursor:'pointer', padding:'2px' }} />
                <input value={form.accent} onChange={e=>setF('accent',e.target.value)} style={{...inputSx}} onFocus={focusIn} onBlur={focusOut} />
              </div>
            </Field>
            <Field label="Orden">
              <input type="number" value={form.sort_order} onChange={e=>setF('sort_order',e.target.value)} min={0} style={inputSx} onFocus={focusIn} onBlur={focusOut} />
            </Field>
          </div>

          <label style={{ display:'flex', alignItems:'center', gap:'10px', cursor:'pointer' }}>
            <input type="checkbox" checked={form.featured} onChange={e=>setF('featured',e.target.checked)}
              style={{ width:'16px', height:'16px', cursor:'pointer' }} />
            <span style={{ fontSize:'13px', color:s.text }}>Destacar en el portafolio</span>
          </label>
        </div>

        <div style={{ display:'flex', gap:'10px', marginTop:'24px', paddingTop:'20px', borderTop:`1px solid ${s.border}` }}>
          <button onClick={onClose}
            style={{ flex:1, padding:'12px', borderRadius:'9px', background:'transparent', border:`1px solid ${s.border}`, color:s.muted, cursor:'pointer', fontSize:'14px', fontFamily:s.fontS }}>
            Cancelar
          </button>
          <button onClick={handleSave} disabled={saving || !form.name.trim() || !form.category.trim() || !form.description.trim()}
            style={{ flex:2, padding:'12px', borderRadius:'9px', background:'linear-gradient(135deg,#3D4A31,#5a6e45)', color:'#fff', border:'none', cursor:'pointer', fontSize:'14px', fontFamily:s.fontS, fontWeight:700, opacity: saving ? 0.7 : 1 }}>
            {saving ? 'Guardando…' : isNew ? 'Crear proyecto' : 'Guardar cambios'}
          </button>
        </div>
      </motion.div>
    </>
  );
};

// ── Delete confirm modal ──────────────────────────────────────────────────────
const DeleteModal = ({ project, onClose, onDeleted }) => {
  const [deleting, setDeleting] = useState(false);
  const confirm = async () => {
    setDeleting(true);
    await supabase.from('projects').delete().eq('id', project.id);
    onDeleted();
  };
  return (
    <>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}
        style={{position:'fixed',inset:0,zIndex:200,background:'rgba(0,0,0,0.7)',backdropFilter:'blur(4px)'}} />
      <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:0}}
        style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', zIndex:300, width:'100%', maxWidth:'380px', background:'#131313', border:`1px solid rgba(185,28,28,0.3)`, borderRadius:'16px', padding:'28px', boxShadow:'0 24px 64px rgba(0,0,0,0.6)' }}>
        <h3 style={{ fontFamily:s.fontH, fontSize:'17px', fontWeight:700, color:'#fff', margin:'0 0 12px' }}>Eliminar proyecto</h3>
        <p style={{ fontSize:'13px', color:s.muted, margin:'0 0 24px', lineHeight:1.6 }}>
          ¿Seguro que quieres eliminar <strong style={{color:s.text}}>"{project.name}"</strong>? Esta acción no se puede deshacer.
        </p>
        <div style={{ display:'flex', gap:'10px' }}>
          <button onClick={onClose} style={{ flex:1, padding:'11px', borderRadius:'9px', background:'transparent', border:`1px solid ${s.border}`, color:s.muted, cursor:'pointer', fontSize:'13px', fontFamily:s.fontS }}>Cancelar</button>
          <button onClick={confirm} disabled={deleting}
            style={{ flex:1, padding:'11px', borderRadius:'9px', background:'rgba(185,28,28,0.8)', border:'none', color:'#fff', cursor:'pointer', fontSize:'13px', fontFamily:s.fontS, fontWeight:600 }}>
            {deleting ? 'Eliminando…' : 'Sí, eliminar'}
          </button>
        </div>
      </motion.div>
    </>
  );
};

// ── Main Panel ────────────────────────────────────────────────────────────────
const PortfolioPanel = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [modal, setModal]       = useState(null); // null | { type:'new'|'edit'|'delete', project? }

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from('projects').select('*').order('sort_order').order('created_at');
    setProjects(data || []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const closeAndRefresh = () => { setModal(null); fetch(); };

  return (
    <div style={{ padding:'32px', minHeight:'100vh' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'28px' }}>
        <div>
          <h1 style={{ fontFamily:s.fontH, fontSize:'22px', fontWeight:700, color:'#fff', margin:'0 0 4px', letterSpacing:'-0.01em' }}>Portafolio</h1>
          <p style={{ fontSize:'13px', color:s.muted, margin:0 }}>Gestiona los proyectos que aparecen en la landing page</p>
        </div>
        <button onClick={() => setModal({ type:'new' })}
          style={{ display:'flex', alignItems:'center', gap:'7px', padding:'10px 18px', borderRadius:'9px', background:'linear-gradient(135deg,#3D4A31,#5a6e45)', border:'none', color:'#fff', cursor:'pointer', fontSize:'13px', fontFamily:s.fontH, fontWeight:700 }}>
          + Nuevo proyecto
        </button>
      </div>

      {loading ? (
        <div style={{ padding:'48px', textAlign:'center', color:s.muted, fontSize:'13px' }}>Cargando proyectos…</div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:'16px' }}>
          {projects.map(p => (
            <motion.div key={p.id} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}
              style={{ background:s.surface, border:`1px solid ${s.border}`, borderRadius:'14px', overflow:'hidden' }}>
              {/* Image */}
              <div style={{ height:'140px', background:p.color, position:'relative', overflow:'hidden' }}>
                {p.image_url ? (
                  <img src={p.image_url} alt={p.name} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
                ) : (
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%', color:'rgba(255,255,255,0.2)', fontSize:'12px' }}>Sin imagen</div>
                )}
                {p.featured && (
                  <span style={{ position:'absolute', top:'10px', right:'10px', background:'rgba(143,173,110,0.9)', color:'#fff', fontSize:'10px', fontWeight:700, padding:'3px 8px', borderRadius:'100px' }}>★ Destacado</span>
                )}
              </div>
              {/* Info */}
              <div style={{ padding:'16px 18px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'6px' }}>
                  <div>
                    <div style={{ fontSize:'10px', color:s.muted, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'3px' }}>{p.category}</div>
                    <div style={{ fontFamily:s.fontH, fontSize:'15px', fontWeight:700, color:s.text }}>{p.name}</div>
                  </div>
                  <span style={{ fontSize:'10px', background:'rgba(255,255,255,0.06)', color:s.muted, padding:'3px 8px', borderRadius:'100px', border:`1px solid ${s.border}`, whiteSpace:'nowrap' }}>{p.tag}</span>
                </div>
                <p style={{ fontSize:'12px', color:s.muted, lineHeight:1.5, margin:'0 0 14px', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                  {p.description}
                </p>
                <div style={{ display:'flex', gap:'8px' }}>
                  <button onClick={()=>setModal({type:'edit',project:p})}
                    style={{ flex:1, padding:'8px', borderRadius:'8px', background:'transparent', border:`1px solid ${s.border}`, color:s.muted, cursor:'pointer', fontSize:'12px', fontFamily:s.fontS, transition:'all 0.15s' }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=s.accent;e.currentTarget.style.color=s.accent}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor=s.border;e.currentTarget.style.color=s.muted}}>
                    Editar
                  </button>
                  <button onClick={()=>setModal({type:'delete',project:p})}
                    style={{ padding:'8px 12px', borderRadius:'8px', background:'transparent', border:'1px solid rgba(185,28,28,0.25)', color:'rgba(252,165,165,0.5)', cursor:'pointer', fontSize:'12px', fontFamily:s.fontS, transition:'all 0.15s' }}
                    onMouseEnter={e=>{e.currentTarget.style.background='rgba(185,28,28,0.1)';e.currentTarget.style.color='#fca5a5'}}
                    onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='rgba(252,165,165,0.5)'}}>
                    ✕
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {projects.length === 0 && !loading && (
        <div style={{ textAlign:'center', padding:'64px', color:s.muted }}>
          <p style={{ fontSize:'14px', marginBottom:'16px' }}>No hay proyectos aún.</p>
          <button onClick={()=>setModal({type:'new'})}
            style={{ padding:'11px 22px', borderRadius:'9px', background:s.accentDim, border:`1px solid rgba(143,173,110,0.3)`, color:s.accent, cursor:'pointer', fontSize:'13px', fontFamily:s.fontH, fontWeight:700 }}>
            + Crear primer proyecto
          </button>
        </div>
      )}

      <AnimatePresence>
        {modal?.type === 'new'    && <ProjectModal project={null}         onClose={()=>setModal(null)} onSaved={closeAndRefresh} />}
        {modal?.type === 'edit'   && <ProjectModal project={modal.project} onClose={()=>setModal(null)} onSaved={closeAndRefresh} />}
        {modal?.type === 'delete' && <DeleteModal  project={modal.project} onClose={()=>setModal(null)} onDeleted={closeAndRefresh} />}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioPanel;
