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
      // ease out cubic
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
      flex: '1 1 180px',
      padding: '28px 24px',
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
    {/* Subtle top accent line */}
    <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: '2px', background: '#3D4A31', borderRadius: '0 0 2px 2px' }} />

    <div style={{
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: 'clamp(36px, 5vw, 52px)',
      fontWeight: 700,
      color: '#0B0B0B',
      lineHeight: 1,
      marginBottom: '10px',
    }}>
      <AnimatedCounter target={value} suffix={suffix} duration={2200} decimals={value % 1 !== 0 ? 0 : 0} />
    </div>
    <p style={{
      fontFamily: "'Inter', sans-serif",
      fontSize: '13px',
      fontWeight: 400,
      color: '#555',
      lineHeight: 1.5,
      maxWidth: '200px',
      margin: '0 auto',
    }}>
      {label}
    </p>
  </motion.div>
);

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

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '820px',
          width: '100%',
          textAlign: 'center',
          margin: '0 auto',
        }}
      >
        {/* Badge */}
        <motion.div variants={itemVariants} style={{ marginBottom: '28px' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            border: '1px solid rgba(61,74,49,0.3)',
            borderRadius: '100px',
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            fontWeight: 500,
            color: '#3D4A31',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            background: 'rgba(61,74,49,0.05)',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3D4A31', display: 'inline-block', animation: 'badge-blink 2.5s ease-in-out infinite' }} />
            Estudio de diseño web • Lima, Perú
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          variants={itemVariants}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(38px, 7vw, 80px)',
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
            {/* Underline accent */}
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
          <br className="hidden sm:block" />
          genera confianza
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(16px, 2.5vw, 20px)',
            fontWeight: 400,
            color: '#444',
            lineHeight: 1.65,
            maxWidth: '580px',
            margin: '0 auto 40px',
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
            gap: '14px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '72px',
          }}
        >
          {/* Primary CTA */}
          <motion.a
            href="#contacto"
            whileHover={{ backgroundColor: '#3D4A31', scale: 1.03, boxShadow: '0 8px 30px rgba(61,74,49,0.3)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '15px 32px',
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

          {/* Secondary WhatsApp CTA */}
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
              padding: '15px 32px',
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
            Escríbenos por WhatsApp
          </motion.a>
        </motion.div>

        {/* ── Stats Row ── */}
        <motion.div
          variants={itemVariants}
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <StatCard
            value={75}
            suffix="%"
            label="de usuarios juzga la credibilidad de una empresa por el diseño de su web"
            delay={0.7}
          />
          <StatCard
            value={94}
            suffix="%"
            label="de las primeras impresiones son determinadas por el diseño visual"
            delay={0.82}
          />
          <StatCard
            value={50}
            suffix=" ms"
            label="tarda un usuario en formarse una opinión sobre tu sitio web"
            delay={0.94}
          />
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
      `}</style>
    </section>
  );
};

export default Hero;
