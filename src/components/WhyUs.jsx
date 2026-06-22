import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, Clock, Globe, Headphones, Smartphone, BarChart3 } from 'lucide-react';

const FEATURES = [
  {
    id: 'diseno',
    icon: Zap,
    title: 'Diseño moderno y rápido',
    description:
      'Webs optimizadas para cargar en menos de 2 segundos. Un sitio lento pierde clientes antes de que te conozcan.',
    size: 'large',
  },
  {
    id: 'entrega',
    icon: Clock,
    title: 'Entrega en días, no semanas',
    description:
      'Proceso ágil y probado. Tu web lista y publicada en tiempo récord, sin perder calidad.',
    size: 'small',
  },
  {
    id: 'dominio',
    icon: Globe,
    title: 'Dominio incluido',
    description:
      'Tu dirección .com ya viene en el precio — sin sorpresas ni costos ocultos el primer año.',
    size: 'small',
  },
  {
    id: 'soporte',
    icon: Headphones,
    title: 'Soporte cercano y real',
    description:
      'No hay tickets ni bots. Tienes un equipo real que te responde por WhatsApp y resuelve tus dudas.',
    size: 'large',
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Optimizado para celular',
    description:
      'Más del 70% de tus clientes potenciales te visitan desde el teléfono. Tu web luce perfecta en cualquier pantalla.',
    size: 'small',
  },
  {
    id: 'medicion',
    icon: BarChart3,
    title: 'Herramientas de medición incluidas',
    description:
      'Sabe quiénes visitan tu web, de dónde vienen y qué hacen. Decisiones basadas en datos reales.',
    size: 'small',
  },
];

// ── Bento Card ────────────────────────────────────────────────────────────────
const BentoCard = ({ feature, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { icon: Icon, title, description, size } = feature;
  const isLarge = size === 'large';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.22 } }}
      style={{
        gridColumn: isLarge ? 'span 2' : 'span 1',
        background: isLarge ? '#0B0B0B' : '#ffffff',
        border: isLarge ? '1px solid #222' : '1px solid rgba(0,0,0,0.08)',
        borderRadius: '16px',
        padding: '36px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: isLarge
          ? '0 8px 32px rgba(0,0,0,0.15)'
          : '0 2px 16px rgba(0,0,0,0.05)',
        cursor: 'default',
        transition: 'box-shadow 0.25s',
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = isLarge ? '0 16px 48px rgba(0,0,0,0.25)' : '0 8px 32px rgba(61,74,49,0.1)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = isLarge ? '0 8px 32px rgba(0,0,0,0.15)' : '0 2px 16px rgba(0,0,0,0.05)'; }}
    >
      {/* Background decoration for large cards */}
      {isLarge && (
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(61,74,49,0.3) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
      )}

      {/* Icon */}
      <div style={{
        width: '52px',
        height: '52px',
        borderRadius: '12px',
        background: isLarge ? 'rgba(61,74,49,0.25)' : 'rgba(61,74,49,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Icon size={24} color={isLarge ? '#8fad6e' : '#3D4A31'} />
      </div>

      {/* Text */}
      <div>
        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: isLarge ? '22px' : '18px',
          fontWeight: 700,
          color: isLarge ? '#ffffff' : '#0B0B0B',
          letterSpacing: '-0.01em',
          marginBottom: '10px',
          lineHeight: 1.25,
        }}>
          {title}
        </h3>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '14.5px',
          lineHeight: 1.65,
          color: isLarge ? 'rgba(255,255,255,0.65)' : '#555',
          maxWidth: isLarge ? '420px' : '100%',
        }}>
          {description}
        </p>
      </div>

      {/* Olive accent bottom line */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '36px',
        width: '40px',
        height: '3px',
        background: '#3D4A31',
        borderRadius: '3px 3px 0 0',
      }} />
    </motion.div>
  );
};

// ── Main Section ──────────────────────────────────────────────────────────────
const WhyUs = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section
      id="por-que-elegirnos"
      aria-labelledby="why-us-heading"
      style={{
        position: 'relative',
        padding: 'clamp(72px, 10vw, 120px) 24px',
        background: '#ffffff',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 32 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: 'clamp(48px, 7vw, 72px)' }}
        >
          <span style={{
            display: 'inline-block',
            marginBottom: '16px',
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#3D4A31',
          }}>
            Por qué elegirnos
          </span>
          <h2
            id="why-us-heading"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(28px, 4.5vw, 52px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: '#0B0B0B',
              marginBottom: '18px',
            }}
          >
            Lo que nos hace{' '}
            <span style={{ color: '#3D4A31' }}>diferentes</span>
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: '#666',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: 1.65,
          }}>
            Cada decisión de diseño tiene un propósito: que más personas
            confíen en tu negocio desde el primer segundo.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
        }}
          className="bento-grid"
        >
          {/* Row 1: large (2col) + small (1col) */}
          <BentoCard feature={FEATURES[0]} index={0} />  {/* Diseño — large */}
          <BentoCard feature={FEATURES[1]} index={1} />  {/* Entrega — small */}

          {/* Row 2: small (1col) + large (2col) */}
          <BentoCard feature={FEATURES[2]} index={2} />  {/* Dominio — small */}
          <BentoCard feature={FEATURES[3]} index={3} />  {/* Soporte — large */}

          {/* Row 3: two smalls */}
          <BentoCard feature={FEATURES[4]} index={4} />  {/* Mobile — small */}
          <BentoCard feature={FEATURES[5]} index={5} />  {/* Medición — small */}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .bento-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .bento-grid > div[style*="span 2"] {
            grid-column: span 2 !important;
          }
        }
        @media (max-width: 580px) {
          .bento-grid {
            grid-template-columns: 1fr !important;
          }
          .bento-grid > div[style*="span 2"] {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default WhyUs;
