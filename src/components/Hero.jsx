import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, MessageCircle, BarChart3, Eye, Zap } from 'lucide-react';
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

// ── Premium Right-Side Stat Card ──────────────────────────────────────────────
const RightStatCard = ({ icon: Icon, value, suffix, label, delay, isStatic, staticValue }) => (
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -4, borderColor: 'rgba(61,74,49,0.3)', boxShadow: '0 16px 36px rgba(0,0,0,0.08)' }}
    style={{
      padding: '24px 28px',
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(0,0,0,0.08)',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.25s ease',
    }}
  >
    {/* Left accent indicator */}
    <div style={{
      position: 'absolute',
      left: 0,
      top: '15%',
      bottom: '15%',
      width: '4px',
      background: '#3D4A31',
      borderRadius: '0 4px 4px 0',
    }} />

    {/* Icon badge */}
    <div style={{
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      background: 'rgba(61,74,49,0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      <Icon size={22} color="#3D4A31" />
    </div>

    {/* Values & Label */}
    <div>
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 'clamp(28px, 3.5vw, 36px)',
        fontWeight: 800,
        color: '#0B0B0B',
        lineHeight: 1,
        marginBottom: '6px',
        letterSpacing: '-0.02em',
      }}>
        {isStatic ? staticValue : <AnimatedCounter target={value} suffix={suffix} duration={2200} />}
      </div>
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '13px',
        fontWeight: 450,
        color: '#555',
        lineHeight: 1.45,
        margin: 0,
      }}>
        {label}
      </p>
    </div>
  </motion.div>
);

// ── Hero Component ────────────────────────────────────────────────────────────
const Hero = () => {
  const { config } = useSiteConfig();
  const whatsappUrl = getWhatsAppURL(undefined, config.whatsapp_number);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
        alignItems: 'center',
        overflow: 'hidden',
        zIndex: 1,
        paddingTop: '100px',
        paddingBottom: '80px',
      }}
    >
      {/* Background radial accent */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(61,74,49,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
      }}>
        <div
          className="hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '56px',
            alignItems: 'center',
          }}
        >
          {/* ── LEFT: Text content ── */}
          <motion.div
            className="hero-text-col"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* H1 */}
            <motion.h1
              variants={itemVariants}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(36px, 5.2vw, 64px)',
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
                maxWidth: '520px',
                marginBottom: '40px',
              }}
            >
              Diseñamos páginas web premium con tecnología de punta que convierten
              visitantes en clientes — y posicionan tu negocio como referente en tu sector.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}
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
                  padding: '15px 30px',
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
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ backgroundColor: '#f0f4ee', scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '15px 30px',
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
          </motion.div>

          {/* ── RIGHT: Modern Data / Statistics Column ── */}
          <div className="hero-stats-col" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <RightStatCard
              icon={BarChart3}
              value={75}
              suffix="%"
              label="juzgan la credibilidad de un negocio por su diseño web"
              delay={0.3}
            />

            <RightStatCard
              icon={Eye}
              value={94}
              suffix="%"
              label="de las primeras impresiones están relacionadas al diseño visual"
              delay={0.45}
            />

            <RightStatCard
              icon={Zap}
              isStatic
              staticValue="0.05 seg"
              label="toma hacer una opinión sobre tu web"
              delay={0.6}
            />

            {/* Stanford source footnote */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.5 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '11.5px',
                color: '#888',
                letterSpacing: '0.02em',
                textAlign: 'right',
                margin: '4px 4px 0 0',
              }}
            >
              Fuente: Estudio de Credibilidad Web — Stanford University
            </motion.p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '24px',
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
          height: '32px',
          background: 'linear-gradient(to bottom, #3D4A31, transparent)',
          animation: 'scroll-line 1.8s ease-in-out infinite',
        }} />
      </motion.div>

      <style>{`
        @keyframes scroll-line {
          0%   { transform: scaleY(0); transform-origin: top;    opacity: 1; }
          50%  { transform: scaleY(1); transform-origin: top;    opacity: 1; }
          51%  { transform: scaleY(1); transform-origin: bottom; opacity: 1; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }

        /* Responsive layout */
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .hero-stats-col {
            margin-top: 12px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
