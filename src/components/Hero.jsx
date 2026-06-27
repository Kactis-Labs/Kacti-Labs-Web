import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { getWhatsAppURL } from '../config/env';
import { useSiteConfig } from '../context/SiteContext';

// ── Animated Counter ──────────────────────────────────────────────────────────
const AnimatedCounter = ({ target, suffix = '', duration = 2000, decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration, decimals]);

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : Math.round(count)}{suffix}
    </span>
  );
};

// ── Stat Card ─────────────────────────────────────────────────────────────────
const StatCard = ({ value, suffix, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    style={{
      flex: '1 1 160px',
      padding: '22px 20px',
      background: 'rgba(255,255,255,0.7)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(0,0,0,0.08)',
      borderRadius: '12px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}
    className="stat-card"
  >
    <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: '2px', background: '#3D4A31', borderRadius: '0 0 2px 2px' }} />
    <div style={{
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: 'clamp(28px, 4vw, 44px)',
      fontWeight: 700,
      color: '#0B0B0B',
      lineHeight: 1,
      marginBottom: '8px',
    }}>
      <AnimatedCounter target={value} suffix={suffix} duration={2200} />
    </div>
    <p style={{
      fontFamily: "'Inter', sans-serif",
      fontSize: '12px',
      fontWeight: 400,
      color: '#555',
      lineHeight: 1.5,
      maxWidth: '180px',
      margin: '0 auto',
    }}>
      {label}
    </p>
  </motion.div>
);

// ── Float Badge ───────────────────────────────────────────────────────────────
// Reusable white-card badge — same style as 98/100 PageSpeed
const FloatBadge = ({
  icon,
  title,
  subtitle,
  iconBg = 'rgba(61,74,49,0.1)',
  size = 'md',   // 'md' | 'sm'
}) => {
  const pad   = size === 'sm' ? '8px 12px'  : '11px 16px';
  const icoSz = size === 'sm' ? '26px'      : '32px';
  const icoR  = size === 'sm' ? '7px'       : '9px';
  const icoFs = size === 'sm' ? '13px'      : '16px';
  const titFs = size === 'sm' ? '12px'      : '14px';
  const subFs = size === 'sm' ? '10px'      : '11px';
  const gap   = size === 'sm' ? '8px'       : '10px';
  const bdr   = size === 'sm' ? '10px'      : '12px';

  return (
    <div style={{
      background: '#fff',
      borderRadius: bdr,
      padding: pad,
      boxShadow: '0 10px 40px rgba(0,0,0,0.13), 0 1px 0 rgba(255,255,255,0.9) inset',
      border: '1px solid rgba(0,0,0,0.07)',
      display: 'flex',
      alignItems: 'center',
      gap,
      whiteSpace: 'nowrap',
    }}>
      <div style={{
        width: icoSz, height: icoSz,
        borderRadius: icoR,
        background: iconBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: icoFs,
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: titFs, fontWeight: 700, color: '#0B0B0B', lineHeight: 1,
        }}>{title}</div>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: subFs, color: '#888', lineHeight: 1.3, marginTop: '3px',
        }}>{subtitle}</div>
      </div>
    </div>
  );
};

// Badge data — all share the white-card style; texts renewed
const BADGES = [
  { icon: '📈', title: 'Más clientes',    subtitle: 'desde el primer mes', iconBg: 'rgba(61,74,49,0.1)',  anim: 'badge-float-1', dur: '3.4s', delay: '0s'   },
  { icon: '🌐', title: 'Más presencia',   subtitle: 'en tu mercado',       iconBg: 'rgba(59,130,246,0.1)', anim: 'badge-float-2', dur: '4.2s', delay: '0.6s' },
  { icon: '🚀', title: 'Mayor alcance',   subtitle: 'en tu sector',        iconBg: 'rgba(239,68,68,0.09)', anim: 'badge-float-3', dur: '3.8s', delay: '1.2s' },
  { icon: '⭐', title: 'Confianza',       subtitle: 'en tu negocio',       iconBg: 'rgba(245,158,11,0.1)', anim: 'badge-float-1', dur: '3.6s', delay: '1.8s' },
];

// Desktop positions: clustered around the laptop/keyboard area
// Reference: "+2.4× más clientes" was at bottom:24%, right:16%
// New cluster spreads to the left of that anchor
const BADGE_POS = [
  { bottom: '42%', right: '40%' },   // upper-left  — above laptop screen
  { bottom: '36%', right: '20%' },   // upper-right — laptop top edge
  { bottom: '22%', right: '32%' },   // lower-left  — near keyboard
  { bottom: '16%', right: '14%' },   // lower-right — hands/trackpad
];

// ── Hero Component ────────────────────────────────────────────────────────────
const Hero = () => {
  const { config } = useSiteConfig();
  const whatsappUrl = getWhatsAppURL(undefined, config.whatsapp_number);
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="inicio"
      aria-label="Sección principal"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'stretch',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      {/* ─────────────────────────────────────────────────────────────────────
          DESKTOP ONLY — Hero photo, full height, anchored to the right
      ──────────────────────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="hero-image-desktop"
        style={{
          position: 'absolute',
          top: 0, right: 0,
          width: '75%',
          height: '100%',
          zIndex: 0,
        }}
      >
        <img
          src="/hero-person.png"
          alt=""
          aria-hidden="true"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
          }}
        />
        {/* Left-edge blend: white → transparent */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.9) 12%, rgba(255,255,255,0.42) 26%, rgba(255,255,255,0.05) 44%, transparent 100%)',
          pointerEvents: 'none',
        }} />
        {/* Top/bottom vignette */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.18) 0%, transparent 10%, transparent 88%, rgba(255,255,255,0.22) 100%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Radial accent */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 60% 70% at 15% 40%, rgba(61,74,49,0.055) 0%, transparent 65%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* ─────────────────────────────────────────────────────────────────────
          DESKTOP ONLY — 4 floating badges orbiting the laptop
          Two-wrapper trick: outer motion.div = entrance; inner div = CSS float
      ──────────────────────────────────────────────────────────────────────── */}
      {BADGES.map((b, i) => (
        <motion.div
          key={i}
          className="hero-badge-desktop"
          initial={{ opacity: 0, scale: 0.82 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3 + i * 0.18, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            bottom: BADGE_POS[i].bottom,
            right:  BADGE_POS[i].right,
            zIndex: 3,
          }}
        >
          <div style={{
            animation: `${b.anim} ${b.dur} ease-in-out infinite`,
            animationDelay: b.delay,
          }}>
            <FloatBadge
              icon={b.icon}
              title={b.title}
              subtitle={b.subtitle}
              iconBg={b.iconBg}
              size="md"
            />
          </div>
        </motion.div>
      ))}

      {/* ─────────────────────────────────────────────────────────────────────
          MAIN CONTENT WRAPPER
      ──────────────────────────────────────────────────────────────────────── */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '100px',
        paddingBottom: '80px',
      }}>
        <div
          className="hero-grid"
          style={{
            maxWidth: '1200px',
            width: '100%',
            margin: '0 auto',
            padding: '0 24px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0',
            alignItems: 'center',
          }}
        >
          {/* ── LEFT: Text content ── */}
          <motion.div
            className="hero-text-col"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ paddingRight: '32px' }}
          >
            {/* Badge */}
            <motion.div variants={itemVariants} style={{ marginBottom: '28px' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '7px 16px',
                borderRadius: '100px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                fontWeight: 500,
                color: '#ffffff',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                background: '#0B0B0B',
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6aad5b', display: 'inline-block', animation: 'badge-blink 2.5s ease-in-out infinite', flexShrink: 0 }} />
                Estudio de Diseño Web · Perú
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={itemVariants}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                color: '#0B0B0B',
                marginBottom: '24px',
              }}
            >
              Tu negocio merece{' '}
              <span style={{ position: 'relative', display: 'inline-block' }}>
                una web
                <svg
                  aria-hidden="true"
                  style={{ position: 'absolute', bottom: '-4px', left: 0, width: '100%', overflow: 'visible' }}
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  height="12"
                >
                  <motion.path
                    d="M2 9 C50 3, 150 3, 198 9"
                    fill="none"
                    stroke="#3D4A31"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.9, ease: 'easeOut' }}
                  />
                </svg>
              </span>
              {' '}que{' '}
              genera confianza
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(15px, 1.8vw, 18px)',
                fontWeight: 400,
                color: '#444',
                lineHeight: 1.65,
                maxWidth: '500px',
                marginBottom: '40px',
              }}
            >
              Diseñamos páginas web premium con tecnología de punta que convierten
              visitantes en clientes — y posicionan tu negocio como referente en tu sector.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '48px' }}
            >
              <motion.a
                href="#contacto"
                whileHover={{ backgroundColor: '#3D4A31', scale: 1.03, boxShadow: '0 8px 30px rgba(61,74,49,0.3)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '14px 28px',
                  background: '#0B0B0B', color: '#fff',
                  borderRadius: '8px', textDecoration: 'none',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '15px', fontWeight: 600, letterSpacing: '0.01em',
                  border: '1px solid #0B0B0B',
                }}
              >
                Cotiza tu web ahora
                <ArrowRight size={16} />
              </motion.a>

              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ backgroundColor: '#f0f4ee', scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '14px 28px',
                  background: '#fff', color: '#0B0B0B',
                  borderRadius: '8px', textDecoration: 'none',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '15px', fontWeight: 600, letterSpacing: '0.01em',
                  border: '1px solid rgba(0,0,0,0.15)',
                }}
              >
                <MessageCircle size={16} color="#25D366" />
                WhatsApp
              </motion.a>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              variants={itemVariants}
              style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
            >
              <StatCard value={75} suffix="%" label="juzgan credibilidad por diseño web" delay={0.7} />
              <StatCard value={94} suffix="%" label="primeras impresiones por diseño visual" delay={0.82} />
              {/* Static stat */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.94, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  flex: '1 1 160px',
                  padding: '22px 20px',
                  background: 'rgba(255,255,255,0.7)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(0,0,0,0.08)',
                  borderRadius: '12px',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                className="stat-card"
              >
                <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: '2px', background: '#3D4A31', borderRadius: '0 0 2px 2px' }} />
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#0B0B0B', lineHeight: 1, marginBottom: '8px' }}>
                  0.05 s
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 400, color: '#555', lineHeight: 1.5, maxWidth: '180px', margin: '0 auto' }}>
                  para formarse una opinión sobre tu web
                </p>
              </motion.div>
            </motion.div>

            {/* Stanford source */}
            <motion.p
              variants={itemVariants}
              style={{ marginTop: '16px', fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#999', letterSpacing: '0.03em' }}
            >
              Fuente: Estudio de Credibilidad Web — Stanford University
            </motion.p>
          </motion.div>

          {/* ── RIGHT: Mobile-only image block (hidden on desktop via CSS) ── */}
          <motion.div
            className="hero-image-mobile"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'none',         /* CSS shows this on mobile */
              position: 'relative',
              width: '100%',
              height: '320px',
              borderRadius: '20px',
              overflow: 'hidden',
            }}
          >
            <img
              src="/hero-person.png"
              alt="Profesional trabajando en su laptop"
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover',
                objectPosition: '60% top',
                display: 'block',
                borderRadius: '20px',
              }}
            />

            {/* Mobile badge 1 — top-left (Más clientes) */}
            <div style={{
              position: 'absolute', top: '16px', left: '12px', zIndex: 2,
              animation: 'badge-float-1 3.4s ease-in-out infinite',
            }}>
              <FloatBadge icon="📈" title="Más clientes" subtitle="desde el primer mes" iconBg="rgba(61,74,49,0.1)" size="sm" />
            </div>

            {/* Mobile badge 2 — middle-right (Mayor alcance) */}
            <div style={{
              position: 'absolute', top: '76px', right: '12px', zIndex: 2,
              animation: 'badge-float-3 3.8s ease-in-out infinite',
              animationDelay: '0.9s',
            }}>
              <FloatBadge icon="🚀" title="Mayor alcance" subtitle="en tu sector" iconBg="rgba(239,68,68,0.09)" size="sm" />
            </div>

            {/* Mobile badge 3 — middle-left (Más presencia) */}
            <div style={{
              position: 'absolute', bottom: '76px', left: '12px', zIndex: 2,
              animation: 'badge-float-2 4.2s ease-in-out infinite',
              animationDelay: '0.4s',
            }}>
              <FloatBadge icon="🌐" title="Más presencia" subtitle="en tu mercado" iconBg="rgba(59,130,246,0.1)" size="sm" />
            </div>

            {/* Mobile badge 4 — bottom-right (Confianza) */}
            <div style={{
              position: 'absolute', bottom: '16px', right: '12px', zIndex: 2,
              animation: 'badge-float-1 3.6s ease-in-out infinite',
              animationDelay: '1.5s',
            }}>
              <FloatBadge icon="⭐" title="Confianza" subtitle="en tu negocio" iconBg="rgba(245,158,11,0.1)" size="sm" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          zIndex: 2,
        }}
        aria-hidden="true"
      >
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#aaa', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          scroll
        </span>
        <div style={{
          width: '1px',
          height: '36px',
          background: 'linear-gradient(to bottom, #3D4A31, transparent)',
          animation: 'scroll-line 1.8s ease-in-out infinite',
        }} />
      </motion.div>

      <style>{`
        @keyframes badge-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        /* Three float phases — staggered for orbital feel */
        @keyframes badge-float-1 {
          0%, 100% { transform: translateY(0px);   }
          50%       { transform: translateY(-9px);  }
        }
        @keyframes badge-float-2 {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(7px); }
        }
        @keyframes badge-float-3 {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-6px); }
        }
        @keyframes scroll-line {
          0%   { transform: scaleY(0); transform-origin: top;    opacity: 1; }
          50%  { transform: scaleY(1); transform-origin: top;    opacity: 1; }
          51%  { transform: scaleY(1); transform-origin: bottom; opacity: 1; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
        .stat-card:hover {
          border-color: rgba(61,74,49,0.25) !important;
          box-shadow: 0 8px 32px rgba(61,74,49,0.08);
          transition: border-color 0.25s, box-shadow 0.25s;
        }

        /* ── Mobile ─────────────────────────────────────────────────────── */
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .hero-text-col {
            padding-right: 0 !important;
          }
          .hero-image-desktop,
          .hero-badge-desktop {
            display: none !important;
          }
          .hero-image-mobile {
            display: block !important;
          }
        }

        /* Very small screens — shrink badges a bit */
        @media (max-width: 400px) {
          .hero-image-mobile {
            height: 270px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
