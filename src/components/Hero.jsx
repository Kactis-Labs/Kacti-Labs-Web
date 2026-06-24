import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { getWhatsAppURL } from '../config/env';

const WHATSAPP_URL = getWhatsAppURL();

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

// ── Laptop Mockup ─────────────────────────────────────────────────────────────
const LaptopMockup = () => {
  // Simulated landing page rows that animate in
  const rows = [
    { w: '60%', h: 10, color: '#0B0B0B', mb: 8 },
    { w: '80%', h: 6, color: '#e2e8da', mb: 5 },
    { w: '45%', h: 6, color: '#e2e8da', mb: 18 },
    { w: '32%', h: 28, color: '#3D4A31', mb: 16, radius: 6 },
    { w: '100%', h: 1, color: 'rgba(0,0,0,0.08)', mb: 14 },
    { w: '90%', h: 5, color: '#d1d9c8', mb: 5 },
    { w: '70%', h: 5, color: '#d1d9c8', mb: 5 },
    { w: '50%', h: 5, color: '#d1d9c8', mb: 14 },
    { w: '100%', h: 72, color: '#f4f6f1', mb: 0, radius: 6 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 60, rotateY: -8 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
    >
      {/* Subtle floating animation */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Laptop shell */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '480px', margin: '0 auto' }}>

          {/* Screen */}
          <div style={{
            background: '#1a1a1a',
            borderRadius: '16px 16px 4px 4px',
            padding: '10px',
            boxShadow: '0 32px 80px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.06)',
            position: 'relative',
          }}>
            {/* Camera dot */}
            <div style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#333', margin: '0 auto 8px',
            }} />

            {/* Screen content */}
            <div style={{
              background: '#ffffff',
              borderRadius: '8px',
              overflow: 'hidden',
              aspectRatio: '16/10',
              position: 'relative',
            }}>
              {/* Navbar bar */}
              <div style={{
                height: '28px',
                background: '#0B0B0B',
                display: 'flex',
                alignItems: 'center',
                padding: '0 10px',
                gap: '5px',
              }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width: '5px', height: '5px', borderRadius: '50%', background: ['#ff5f57','#febc2e','#28c840'][i] }} />
                ))}
                <div style={{ flex: 1, height: '3px', borderRadius: '2px', background: 'rgba(255,255,255,0.1)', margin: '0 8px' }} />
                <div style={{ width: '36px', height: '5px', borderRadius: '2px', background: '#3D4A31' }} />
              </div>

              {/* Page content */}
              <div style={{ padding: '16px 14px' }}>
                {/* Hero text skeleton */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                >
                  {rows.map((r, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 + i * 0.06, duration: 0.35 }}
                      style={{
                        width: r.w,
                        height: r.h,
                        background: r.color,
                        borderRadius: r.radius || 3,
                        marginBottom: r.mb,
                      }}
                    />
                  ))}
                </motion.div>

                {/* Mockup badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.9, duration: 0.4, type: 'spring' }}
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    background: '#3D4A31',
                    color: '#fff',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '7px',
                    fontWeight: 600,
                    padding: '4px 8px',
                    borderRadius: '100px',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}
                >
                  ✓ Listo para publicar
                </motion.div>
              </div>
            </div>
          </div>

          {/* Keyboard base */}
          <div style={{
            background: 'linear-gradient(to bottom, #2a2a2a, #1e1e1e)',
            borderRadius: '0 0 12px 12px',
            height: '18px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{ width: '60px', height: '3px', borderRadius: '2px', background: 'rgba(255,255,255,0.06)' }} />
          </div>

          {/* Base stand */}
          <div style={{
            height: '4px',
            background: 'linear-gradient(to bottom, #141414, #0a0a0a)',
            borderRadius: '0 0 6px 6px',
            margin: '0 8px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          }} />
        </div>

        {/* Floating metric cards */}
        <motion.div
          initial={{ opacity: 0, x: -20, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          style={{
            position: 'absolute',
            top: '12%',
            left: '-8%',
            background: '#fff',
            borderRadius: '10px',
            padding: '10px 14px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
            border: '1px solid rgba(0,0,0,0.06)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(61,74,49,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>⚡</div>
          <div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '13px', fontWeight: 700, color: '#0B0B0B', lineHeight: 1 }}>98 / 100</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: '#888', lineHeight: 1.3, marginTop: '2px' }}>PageSpeed</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 2.0, duration: 0.5 }}
          style={{
            position: 'absolute',
            bottom: '20%',
            right: '-6%',
            background: '#0B0B0B',
            borderRadius: '10px',
            padding: '10px 14px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(143,173,110,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>📈</div>
          <div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '13px', fontWeight: 700, color: '#8fad6e', lineHeight: 1 }}>+2.4× más clientes</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.3, marginTop: '2px' }}>vs. sin web profesional</div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// ── Hero Component ────────────────────────────────────────────────────────────
const Hero = () => {
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '100px',
        paddingBottom: '60px',
        paddingLeft: '24px',
        paddingRight: '24px',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      {/* Background gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(61,74,49,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* ── Two-column layout wrapper ── */}
      <div
        className="hero-grid"
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'center',
          paddingBottom: '80px',
        }}
      >
        {/* ── LEFT: Text content ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
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
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              marginBottom: '48px',
            }}
          >
            <motion.a
              href="#contacto"
              whileHover={{ backgroundColor: '#3D4A31', scale: 1.03, boxShadow: '0 8px 30px rgba(61,74,49,0.3)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                background: '#0B0B0B',
                color: '#fff',
                borderRadius: '8px',
                textDecoration: 'none',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '15px',
                fontWeight: 600,
                letterSpacing: '0.01em',
                border: '1px solid #0B0B0B',
              }}
            >
              Cotiza tu web ahora
              <ArrowRight size={16} />
            </motion.a>

            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ backgroundColor: '#f0f4ee', scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                background: '#fff',
                color: '#0B0B0B',
                borderRadius: '8px',
                textDecoration: 'none',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '15px',
                fontWeight: 600,
                letterSpacing: '0.01em',
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
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <StatCard
              value={75}
              suffix="%"
              label="juzgan credibilidad por diseño web"
              delay={0.7}
            />
            <StatCard
              value={94}
              suffix="%"
              label="primeras impresiones por diseño visual"
              delay={0.82}
            />
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
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 700,
                color: '#0B0B0B',
                lineHeight: 1,
                marginBottom: '8px',
              }}>
                0.05 s
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
                para formarse una opinión sobre tu web
              </p>
            </motion.div>
          </motion.div>

          {/* Stanford source */}
          <motion.p
            variants={itemVariants}
            style={{
              marginTop: '16px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              color: '#999',
              letterSpacing: '0.03em',
            }}
          >
            Fuente: Estudio de Credibilidad Web — Stanford University
          </motion.p>
        </motion.div>

        {/* ── RIGHT: Laptop Mockup ── */}
        <div style={{ position: 'relative' }}>
          <LaptopMockup />
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
          zIndex: 1,
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
        @keyframes scroll-line {
          0% { transform: scaleY(0); transform-origin: top; opacity: 1; }
          50% { transform: scaleY(1); transform-origin: top; opacity: 1; }
          51% { transform: scaleY(1); transform-origin: bottom; opacity: 1; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
        .stat-card:hover {
          border-color: rgba(61,74,49,0.25) !important;
          box-shadow: 0 8px 32px rgba(61,74,49,0.08);
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
            text-align: center;
          }
          .hero-grid > div:last-child {
            max-width: 400px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
