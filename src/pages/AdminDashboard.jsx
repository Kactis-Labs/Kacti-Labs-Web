// src/pages/AdminDashboard.jsx
// Shell del panel de administración con sidebar de navegación y 4 secciones:
// Contactos | Portafolio | Estadísticas | Configuración
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import ContactsPanel   from '../components/admin/ContactsPanel';
import PortfolioPanel  from '../components/admin/PortfolioPanel';
import AnalyticsPanel  from '../components/admin/AnalyticsPanel';
import SettingsPanel   from '../components/admin/SettingsPanel';

// ── Sidebar nav items ─────────────────────────────────────────────────────────
const NAV = [
  {
    id: 'contacts',
    label: 'Contactos',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    id: 'portfolio',
    label: 'Portafolio',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
  },
  {
    id: 'analytics',
    label: 'Estadísticas',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
      </svg>
    ),
  },
  {
    id: 'settings',
    label: 'Configuración',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
  },
];

const AdminDashboard = () => {
  const navigate   = useNavigate();
  const [active, setActive] = useState('contacts');

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login', { replace: true });
  };

  const s = {
    bg:      '#0a0a0a',
    sidebar: '#0f0f0f',
    border:  'rgba(255,255,255,0.07)',
    accent:  '#8fad6e',
    text:    '#e2e8f0',
    muted:   'rgba(255,255,255,0.38)',
    fontH:   "'Space Grotesk', sans-serif",
    fontS:   "'Inter', sans-serif",
  };

  const panels = { contacts: ContactsPanel, portfolio: PortfolioPanel, analytics: AnalyticsPanel, settings: SettingsPanel };
  const ActivePanel = panels[active];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: s.bg, color: s.text, fontFamily: s.fontS }}>

      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <aside style={{
        width: '220px', flexShrink: 0,
        background: s.sidebar,
        borderRight: `1px solid ${s.border}`,
        display: 'flex', flexDirection: 'column',
        position: 'sticky', top: 0, height: '100vh',
        overflowY: 'auto',
      }}>
        {/* Brand */}
        <div style={{ padding: '24px 20px 20px', borderBottom: `1px solid ${s.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '30px', height: '30px', borderRadius: '8px', flexShrink: 0,
              background: 'linear-gradient(135deg, #3D4A31, #8fad6e)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L4 7v10l8 5 8-5V7L12 2z" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round"/>
                <path d="M12 2v20M4 7l8 5 8-5" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: s.fontH, fontWeight: 700, fontSize: '13px', letterSpacing: '-0.01em' }}>Kacti Labs</div>
              <div style={{ fontSize: '10px', color: s.muted, marginTop: '1px' }}>Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: '12px 10px', flex: 1 }}>
          {NAV.map(item => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  width: '100%', padding: '10px 12px',
                  borderRadius: '9px', border: 'none', cursor: 'pointer',
                  background: isActive ? 'rgba(143,173,110,0.12)' : 'transparent',
                  color: isActive ? s.accent : s.muted,
                  fontFamily: s.fontS, fontSize: '13px', fontWeight: isActive ? 600 : 400,
                  textAlign: 'left', marginBottom: '2px',
                  transition: 'all 0.15s',
                  borderLeft: isActive ? `2px solid ${s.accent}` : '2px solid transparent',
                }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = s.text; } }}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = s.muted; } }}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: '12px 10px', borderTop: `1px solid ${s.border}` }}>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              width: '100%', padding: '10px 12px',
              borderRadius: '9px', border: 'none', cursor: 'pointer',
              background: 'transparent',
              color: 'rgba(252,165,165,0.7)',
              fontFamily: s.fontS, fontSize: '13px',
              textAlign: 'left', transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(185,28,28,0.1)'; e.currentTarget.style.color = '#fca5a5'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(252,165,165,0.7)'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* ── Main content ─────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflow: 'auto', minWidth: 0 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ minHeight: '100vh' }}
          >
            <ActivePanel />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;
