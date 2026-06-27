// src/components/admin/SettingsPanel.jsx
// Configuración general del sitio: meta tags, contacto, WhatsApp
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabaseClient';

const s = {
  bg:'#0a0a0a', surface:'#111111', border:'rgba(255,255,255,0.07)',
  accent:'#8fad6e', accentDim:'rgba(143,173,110,0.12)',
  text:'#e2e8f0', muted:'rgba(255,255,255,0.4)',
  fontH:"'Space Grotesk', sans-serif", fontS:"'Inter', sans-serif",
};

// Keys visibles en el panel, agrupadas por sección
const SECTIONS = [
  {
    title: 'SEO — Meta tags',
    description: 'Estos valores afectan cómo Google y las redes sociales muestran tu sitio.',
    fields: [
      { key: 'site_title',       label: 'Título de la página',              placeholder: 'Kacti Labs — Diseño Web Premium…', type: 'text',     hint: 'Aparece en la pestaña del navegador y en los resultados de Google.' },
      { key: 'site_description', label: 'Descripción meta',                 placeholder: 'Descripción corta del sitio…',     type: 'textarea', hint: 'Idealmente 120-160 caracteres. Aparece en los resultados de búsqueda.' },
      { key: 'og_description',   label: 'Descripción Open Graph (redes)',   placeholder: 'Descripción para compartir…',      type: 'textarea', hint: 'Se muestra al compartir el link en WhatsApp, Facebook, LinkedIn.' },
    ],
  },
  {
    title: 'Información de contacto',
    description: 'Datos visibles en la sección de contacto de la landing page.',
    fields: [
      { key: 'contact_email',  label: 'Email público',          placeholder: 'hola@kactilabs.com',    type: 'email', hint: '' },
      { key: 'contact_phone',  label: 'Teléfono público',       placeholder: '+51 999 999 999',       type: 'text',  hint: 'Con código de país y formato legible.' },
      { key: 'location',       label: 'Ubicación',              placeholder: 'Lima, Perú',            type: 'text',  hint: '' },
      { key: 'whatsapp_number',label: 'Número WhatsApp',        placeholder: '51999999999',           type: 'text',  hint: 'Sin + ni espacios. Ej: 51987654321' },
    ],
  },
];

const inputSx = {
  width:'100%', padding:'11px 14px', boxSizing:'border-box',
  background:'rgba(255,255,255,0.04)', border:`1px solid rgba(255,255,255,0.09)`,
  borderRadius:'9px', color:s.text, fontSize:'13px',
  fontFamily:s.fontS, outline:'none', transition:'border-color 0.2s',
};
const focusIn  = (e, accent) => { e.target.style.borderColor = accent; };
const focusOut = (e) => { e.target.style.borderColor = 'rgba(255,255,255,0.09)'; };

const SettingsPanel = () => {
  const [config, setConfig]   = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);

  useEffect(() => {
    supabase.from('site_config').select('key, value, label')
      .then(({ data }) => {
        if (data) {
          const map = {};
          data.forEach(row => { map[row.key] = row.value; });
          setConfig(map);
        }
        setLoading(false);
      });
  }, []);

  const handleChange = (key, val) => {
    setConfig(prev => ({ ...prev, [key]: val }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    // Upsert all changed keys
    const rows = Object.entries(config).map(([key, value]) => ({ key, value, updated_at: new Date().toISOString() }));
    const { error } = await supabase.from('site_config').upsert(rows, { onConflict: 'key' });
    setSaving(false);
    if (!error) { setSaved(true); setTimeout(() => setSaved(false), 3000); }
  };

  const charCount = (key) => (config[key] || '').length;

  return (
    <div style={{ padding:'32px', minHeight:'100vh', maxWidth:'780px' }}>
      <div style={{ marginBottom:'28px' }}>
        <h1 style={{ fontFamily:s.fontH, fontSize:'22px', fontWeight:700, color:'#fff', margin:'0 0 4px', letterSpacing:'-0.01em' }}>Configuración</h1>
        <p style={{ fontSize:'13px', color:s.muted, margin:0 }}>Ajustes generales del sitio web guardados en Supabase</p>
      </div>

      {loading ? (
        <div style={{ padding:'64px', textAlign:'center', color:s.muted, fontSize:'13px' }}>Cargando configuración…</div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:'24px' }}>
          {SECTIONS.map(section => (
            <motion.div key={section.title} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
              style={{ background:s.surface, border:`1px solid ${s.border}`, borderRadius:'16px', padding:'24px' }}>
              <div style={{ marginBottom:'20px', paddingBottom:'16px', borderBottom:`1px solid ${s.border}` }}>
                <div style={{ fontFamily:s.fontH, fontSize:'15px', fontWeight:700, color:s.text, marginBottom:'4px' }}>{section.title}</div>
                <div style={{ fontSize:'12px', color:s.muted }}>{section.description}</div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'18px' }}>
                {section.fields.map(field => (
                  <div key={field.key}>
                    <label style={{ display:'block', fontSize:'11px', fontWeight:600, color:s.muted, letterSpacing:'0.07em', textTransform:'uppercase', marginBottom:'7px' }}>
                      {field.label}
                    </label>
                    {field.type === 'textarea' ? (
                      <div>
                        <textarea
                          value={config[field.key] || ''}
                          onChange={e => handleChange(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          rows={3}
                          style={{ ...inputSx, resize:'vertical', minHeight:'80px' }}
                          onFocus={e => focusIn(e, s.accent)}
                          onBlur={focusOut}
                        />
                        <div style={{ display:'flex', justifyContent:'space-between', marginTop:'4px' }}>
                          {field.hint && <span style={{ fontSize:'11px', color:s.muted }}>{field.hint}</span>}
                          <span style={{ fontSize:'11px', color: charCount(field.key) > 160 ? '#f87171' : s.muted, marginLeft:'auto' }}>
                            {charCount(field.key)} car.
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <input
                          type={field.type || 'text'}
                          value={config[field.key] || ''}
                          onChange={e => handleChange(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          style={inputSx}
                          onFocus={e => focusIn(e, s.accent)}
                          onBlur={focusOut}
                        />
                        {field.hint && <p style={{ fontSize:'11px', color:s.muted, margin:'4px 0 0' }}>{field.hint}</p>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Save button */}
          <div style={{ display:'flex', alignItems:'center', gap:'12px', paddingTop:'4px' }}>
            <button onClick={handleSave} disabled={saving}
              style={{
                padding:'13px 28px', borderRadius:'10px',
                background: saved ? 'rgba(143,173,110,0.2)' : 'linear-gradient(135deg,#3D4A31,#5a6e45)',
                border: saved ? `1px solid rgba(143,173,110,0.5)` : 'none',
                color: saved ? s.accent : '#fff', cursor:'pointer',
                fontSize:'14px', fontFamily:s.fontH, fontWeight:700,
                opacity: saving ? 0.7 : 1, transition:'all 0.2s',
              }}>
              {saving ? 'Guardando…' : saved ? '✓ Cambios guardados' : 'Guardar cambios'}
            </button>
            {!saved && !saving && (
              <span style={{ fontSize:'12px', color:s.muted }}>Los cambios se aplicarán al sitio en el próximo despliegue.</span>
            )}
          </div>

          {/* Info box */}
          <div style={{ padding:'16px 20px', background:'rgba(96,165,250,0.07)', border:'1px solid rgba(96,165,250,0.2)', borderRadius:'12px' }}>
            <div style={{ fontSize:'12px', color:'rgba(147,197,253,0.8)', lineHeight:1.6 }}>
              <strong style={{color:'#93c5fd'}}>ℹ Cómo funcionan estos ajustes:</strong><br/>
              Los valores de SEO (título, descripción) se aplican directamente en el <code style={{background:'rgba(255,255,255,0.08)',padding:'1px 5px',borderRadius:'4px',fontSize:'11px'}}>index.html</code> al desplegar.
              La información de contacto se lee en tiempo real desde Supabase cada vez que alguien carga la landing.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPanel;
