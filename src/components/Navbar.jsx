import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MessageCircle } from 'lucide-react';
import KactiLogo from './KactiLogo';
import { getWhatsAppURL } from '../config/env';

const NAV_LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Por qué elegirnos', href: '#por-que-elegirnos' },
  { label: 'Portafolio', href: '#portafolio' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'FAQ', href: '#faq' },
];

const WHATSAPP_URL = getWhatsAppURL();

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    setActiveSection(href);
  };

  return (
    <>
      {/* ── NAVBAR ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease',
          background: scrolled ? 'rgba(255,255,255,0.94)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid transparent',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            height: '68px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <a href="#" aria-label="Kacti Labs — inicio" style={{ textDecoration: 'none' }}>
            <KactiLogo size="md" textColor="#0B0B0B" iconColor="#3D4A31" />
          </a>

          {/* Desktop Nav Links */}
          <nav
            aria-label="Navegación principal"
            style={{ display: 'flex', gap: '32px', alignItems: 'center' }}
            className="hidden lg:flex"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#0B0B0B',
                  textDecoration: 'none',
                  position: 'relative',
                  padding: '4px 0',
                  transition: 'color 0.2s',
                }}
                className="nav-link group"
              >
                {link.label}
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: activeSection === link.href ? '100%' : '0%',
                    height: '1.5px',
                    background: '#3D4A31',
                    transition: 'width 0.25s ease',
                  }}
                  className="nav-underline"
                />
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex" style={{ alignItems: 'center', gap: '12px' }}>
            <motion.a
              href="#contacto"
              whileHover={{ backgroundColor: '#3D4A31', scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '10px 22px',
                background: '#0B0B0B',
                color: '#ffffff',
                textDecoration: 'none',
                borderRadius: '6px',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.02em',
                border: '1px solid #0B0B0B',
                transition: 'background 0.2s, color 0.2s',
              }}
            >
              Cotiza tu web
            </motion.a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
            className="lg:hidden"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              color: '#0B0B0B',
            }}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              style={{
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.98)',
                borderTop: '1px solid rgba(0,0,0,0.06)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div style={{ padding: '20px 24px 28px' }}>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {NAV_LINKS.map((link, i) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => handleNavClick(link.href)}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.06, duration: 0.28 }}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '16px',
                        fontWeight: 500,
                        color: '#0B0B0B',
                        textDecoration: 'none',
                        padding: '12px 0',
                        borderBottom: '1px solid rgba(0,0,0,0.06)',
                        display: 'block',
                      }}
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </nav>
                <motion.a
                  href="#contacto"
                  onClick={() => setMobileOpen(false)}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.32, duration: 0.28 }}
                  style={{
                    display: 'block',
                    marginTop: '20px',
                    padding: '14px',
                    background: '#0B0B0B',
                    color: '#fff',
                    textAlign: 'center',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 600,
                    fontSize: '15px',
                  }}
                >
                  Cotiza tu web ahora
                </motion.a>
                <motion.a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.38, duration: 0.28 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    marginTop: '10px',
                    padding: '14px',
                    background: '#25D366',
                    color: '#fff',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 600,
                    fontSize: '15px',
                  }}
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── FLOATING WHATSAPP BUTTON ── */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 200, damping: 18 }}
        whileHover={{ scale: 1.05, boxShadow: '0 6px 28px rgba(37,211,102,0.55)' }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '24px',
          zIndex: 9999,
          height: '50px',
          paddingLeft: '16px',
          paddingRight: '20px',
          borderRadius: '100px',
          background: '#25D366',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
          textDecoration: 'none',
          color: '#fff',
        }}
      >
        {/* WhatsApp icon */}
        <svg viewBox="0 0 24 24" width="22" height="22" fill="white" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        {/* Label */}
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '14px',
          fontWeight: 600,
          letterSpacing: '0.01em',
          whiteSpace: 'nowrap',
        }}>
          Hablemos
        </span>

        {/* Pulse ring */}
        <span
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '100px',
            border: '2px solid rgba(37, 211, 102, 0.5)',
            animation: 'whatsapp-pulse 2s ease-out infinite',
          }}
        />
      </motion.a>

      <style>{`
        @keyframes whatsapp-pulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        .nav-link:hover .nav-underline {
          width: 100% !important;
        }
        .nav-link:hover {
          color: #3D4A31 !important;
        }
      `}</style>
    </>
  );
};

export default Navbar;
