// src/components/admin/AnalyticsPanel.jsx
// Estadísticas de contactos derivadas de datos reales de Supabase
// Gráficos SVG puros — sin dependencias externas
import { useEffect, useState, useMemo } from 'react';
import { supabase } from '../../lib/supabaseClient';

const s = {
  bg:'#0a0a0a', surface:'#111111', border:'rgba(255,255,255,0.07)',
  accent:'#8fad6e', accentDim:'rgba(143,173,110,0.12)',
  text:'#e2e8f0', muted:'rgba(255,255,255,0.4)',
  fontH:"'Space Grotesk', sans-serif", fontS:"'Inter', sans-serif",
};

const STATUS_COLOR = {
  'Nuevo': '#8fad6e', 'Contactado': '#60a5fa',
  'En negociación': '#fbbf24', 'Cerrado': '#94a3b8',
};

// ── Bar Chart (pure SVG) ──────────────────────────────────────────────────────
const BarChart = ({ data, color = '#8fad6e', height = 140, label }) => {
  const max = Math.max(...data.map(d => d.value), 1);
  const W = 100 / data.length;

  return (
    <div>
      {label && <div style={{ fontSize:'11px', color:s.muted, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'12px' }}>{label}</div>}
      <svg viewBox={`0 0 400 ${height + 30}`} style={{ width:'100%', display:'block', overflow:'visible' }}>
        {data.map((d, i) => {
          const barH = max > 0 ? (d.value / max) * height : 0;
          const x = i * (400 / data.length) + 4;
          const w = (400 / data.length) - 8;
          const y = height - barH;
          return (
            <g key={i}>
              {/* Background bar */}
              <rect x={x} y={0} width={w} height={height} rx="4" fill="rgba(255,255,255,0.03)" />
              {/* Value bar */}
              {d.value > 0 && (
                <rect x={x} y={y} width={w} height={barH} rx="4" fill={color} opacity="0.85">
                  <title>{d.label}: {d.value}</title>
                </rect>
              )}
              {/* Value label */}
              {d.value > 0 && (
                <text x={x + w/2} y={y - 5} textAnchor="middle" fill={color} fontSize="11" fontFamily="Inter, sans-serif">
                  {d.value}
                </text>
              )}
              {/* X label */}
              <text x={x + w/2} y={height + 18} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="Inter, sans-serif">
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// ── Donut Chart (pure SVG) ────────────────────────────────────────────────────
const DonutChart = ({ segments, label }) => {
  const total = segments.reduce((s, d) => s + d.value, 0);
  let cumAngle = -90; // start at top
  const R = 60; const CX = 90; const CY = 90;

  const arcs = segments.filter(d => d.value > 0).map(d => {
    const angle = (d.value / total) * 360;
    const startAngle = cumAngle;
    cumAngle += angle;
    const endAngle = cumAngle;
    const toRad = a => (a * Math.PI) / 180;
    const x1 = CX + R * Math.cos(toRad(startAngle));
    const y1 = CY + R * Math.sin(toRad(startAngle));
    const x2 = CX + R * Math.cos(toRad(endAngle));
    const y2 = CY + R * Math.sin(toRad(endAngle));
    const largeArc = angle > 180 ? 1 : 0;
    return { ...d, path: `M ${CX} ${CY} L ${x1} ${y1} A ${R} ${R} 0 ${largeArc} 1 ${x2} ${y2} Z` };
  });

  return (
    <div>
      {label && <div style={{ fontSize:'11px', color:s.muted, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'12px' }}>{label}</div>}
      <div style={{ display:'flex', alignItems:'center', gap:'24px', flexWrap:'wrap' }}>
        <svg width="180" height="180" viewBox="0 0 180 180" style={{ flexShrink:0 }}>
          {total === 0 ? (
            <circle cx="90" cy="90" r="60" fill="rgba(255,255,255,0.05)" />
          ) : (
            arcs.map((a, i) => (
              <path key={i} d={a.path} fill={a.color} opacity="0.88">
                <title>{a.label}: {a.value}</title>
              </path>
            ))
          )}
          {/* Inner circle (donut hole) */}
          <circle cx="90" cy="90" r="38" fill="#111111" />
          <text x="90" y="87" textAnchor="middle" fill="white" fontSize="18" fontWeight="700" fontFamily="Space Grotesk, sans-serif">{total}</text>
          <text x="90" y="103" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="Inter, sans-serif">total</text>
        </svg>
        <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
          {segments.map(d => (
            <div key={d.label} style={{ display:'flex', alignItems:'center', gap:'10px' }}>
              <div style={{ width:'10px', height:'10px', borderRadius:'3px', background:d.color, flexShrink:0 }} />
              <span style={{ fontSize:'13px', color:s.muted }}>{d.label}</span>
              <span style={{ fontSize:'13px', fontWeight:600, color:s.text, marginLeft:'auto' }}>{d.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const getWeekLabel = (d) => {
  const date = new Date(d);
  return date.toLocaleDateString('es-PE', { month:'short', day:'2-digit' });
};

const getMonthLabel = (year, month) =>
  new Date(year, month).toLocaleDateString('es-PE', { month:'short', year:'2-digit' });

// ── Main Panel ────────────────────────────────────────────────────────────────
const AnalyticsPanel = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [period, setPeriod]     = useState('weeks'); // 'weeks' | 'months'

  useEffect(() => {
    supabase.from('contacts').select('id, status, created_at')
      .order('created_at', { ascending: true })
      .then(({ data }) => { setContacts(data || []); setLoading(false); });
  }, []);

  // ── Contacts by last 8 weeks ──────────────────────────────────────────────
  const byWeek = useMemo(() => {
    const weeks = [];
    const now = new Date();
    for (let i = 7; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i * 7);
      const start = new Date(d); start.setDate(start.getDate() - 7);
      const count = contacts.filter(c => {
        const t = new Date(c.created_at);
        return t >= start && t < d;
      }).length;
      weeks.push({ label: getWeekLabel(d), value: count });
    }
    return weeks;
  }, [contacts]);

  // ── Contacts by last 6 months ────────────────────────────────────────────
  const byMonth = useMemo(() => {
    const months = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const y = now.getFullYear();
      const m = now.getMonth() - i;
      const start = new Date(y, m, 1);
      const end   = new Date(y, m + 1, 1);
      const count = contacts.filter(c => {
        const t = new Date(c.created_at);
        return t >= start && t < end;
      }).length;
      months.push({ label: getMonthLabel(y, m), value: count });
    }
    return months;
  }, [contacts]);

  // ── Status distribution ───────────────────────────────────────────────────
  const statusDist = useMemo(() => {
    const statuses = ['Nuevo', 'Contactado', 'En negociación', 'Cerrado'];
    return statuses.map(st => ({
      label: st,
      value: contacts.filter(c => c.status === st).length,
      color: STATUS_COLOR[st],
    }));
  }, [contacts]);

  // ── Best month ────────────────────────────────────────────────────────────
  const bestMonth = useMemo(() => {
    if (byMonth.length === 0) return null;
    return byMonth.reduce((a, b) => a.value > b.value ? a : b);
  }, [byMonth]);

  const conversionRate = useMemo(() => {
    if (contacts.length === 0) return 0;
    const closed = contacts.filter(c => c.status === 'Cerrado').length;
    return Math.round((closed / contacts.length) * 100);
  }, [contacts]);

  return (
    <div style={{ padding:'32px', minHeight:'100vh' }}>
      <div style={{ marginBottom:'28px' }}>
        <h1 style={{ fontFamily:s.fontH, fontSize:'22px', fontWeight:700, color:'#fff', margin:'0 0 4px', letterSpacing:'-0.01em' }}>Estadísticas</h1>
        <p style={{ fontSize:'13px', color:s.muted, margin:0 }}>Análisis de contactos recibidos desde la landing page</p>
      </div>

      {loading ? (
        <div style={{ padding:'64px', textAlign:'center', color:s.muted, fontSize:'13px' }}>Cargando estadísticas…</div>
      ) : (
        <>
          {/* KPI Row */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'14px', marginBottom:'28px' }}>
            {[
              { label:'Total contactos', value:contacts.length, color:s.accent },
              { label:'Tasa de cierre',  value:`${conversionRate}%`, color:'#60a5fa' },
              { label:'Mejor mes',       value: bestMonth?.value > 0 ? `${bestMonth.value} leads` : '—', color:'#fbbf24' },
              { label:'En negociación',  value: contacts.filter(c=>c.status==='En negociación').length, color:'#fbbf24' },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ background:s.surface, border:`1px solid ${s.border}`, borderRadius:'14px', padding:'20px 22px' }}>
                <div style={{ fontSize:'10px', color:s.muted, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'10px' }}>{label}</div>
                <div style={{ fontFamily:s.fontH, fontSize:'30px', fontWeight:700, color, lineHeight:1 }}>{loading?'—':value}</div>
              </div>
            ))}
          </div>

          {/* Chart period toggle + bar chart */}
          <div style={{ background:s.surface, border:`1px solid ${s.border}`, borderRadius:'16px', padding:'24px', marginBottom:'20px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }}>
              <div style={{ fontFamily:s.fontH, fontSize:'15px', fontWeight:600, color:s.text }}>
                Contactos por {period === 'weeks' ? 'semana' : 'mes'}
              </div>
              <div style={{ display:'flex', gap:'6px' }}>
                {[['weeks','Semanal'],['months','Mensual']].map(([k,l]) => (
                  <button key={k} onClick={()=>setPeriod(k)}
                    style={{ padding:'7px 14px', borderRadius:'8px', border:`1px solid ${period===k?'rgba(143,173,110,0.4)':s.border}`, background:period===k?s.accentDim:'transparent', color:period===k?s.accent:s.muted, cursor:'pointer', fontSize:'12px', fontFamily:s.fontS, fontWeight:period===k?600:400, transition:'all 0.15s' }}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
            {contacts.length === 0 ? (
              <div style={{ textAlign:'center', padding:'40px', color:s.muted, fontSize:'13px' }}>Aún no hay contactos registrados.</div>
            ) : (
              <BarChart data={period==='weeks'?byWeek:byMonth} color={s.accent} />
            )}
          </div>

          {/* Status distribution */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px' }}>
            <div style={{ background:s.surface, border:`1px solid ${s.border}`, borderRadius:'16px', padding:'24px' }}>
              <DonutChart segments={statusDist} label="Distribución por estado" />
            </div>
            <div style={{ background:s.surface, border:`1px solid ${s.border}`, borderRadius:'16px', padding:'24px' }}>
              <div style={{ fontSize:'11px', color:s.muted, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'16px' }}>Últimos 10 contactos</div>
              {contacts.length === 0 ? (
                <p style={{ fontSize:'13px', color:s.muted }}>Sin contactos aún.</p>
              ) : (
                [...contacts].reverse().slice(0, 10).map((c, i) => (
                  <div key={c.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'9px 0', borderBottom: i < 9 ? `1px solid ${s.border}` : 'none' }}>
                    <div>
                      <div style={{ fontSize:'13px', fontWeight:600, color:s.text }}>{c.id?.slice?.(0,8) ?? '—'}</div>
                      <div style={{ fontSize:'11px', color:s.muted }}>
                        {new Date(c.created_at).toLocaleDateString('es-PE', {day:'2-digit',month:'short'})}
                      </div>
                    </div>
                    <span style={{ fontSize:'11px', fontWeight:600, padding:'3px 8px', borderRadius:'20px', background:`${STATUS_COLOR[c.status]}20`, color:STATUS_COLOR[c.status], border:`1px solid ${STATUS_COLOR[c.status]}40` }}>
                      {c.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AnalyticsPanel;
