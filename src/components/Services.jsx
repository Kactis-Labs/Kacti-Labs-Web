import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';
import { getWhatsAppURL } from '../config/env';

// ── Data ─────────────────────────────────────────────────────────────────────

const PLANS = [
  {
    id: 'basico',
    name: 'Básico',
    price: '990',
    tag: null,
    description: 'El punto de partida ideal para tener presencia digital profesional.',
    features: [
      'Landing de 1 página completa',
      'Diseño responsive (mobile-first)',
      'Formulario de contacto',
      'Botón de WhatsApp integrado',
      'SEO básico + certificado SSL',
      'Dominio .com incluido (1er año)',
      '1 mes de Plan Tranquilidad Web gratis',
    ],
    cta: 'Empezar con el Básico',
    highlighted: false,
  },
  {
    id: 'profesional',
    name: 'Profesional',
    price: '1,690',
    tag: 'Recomendado',
    description: 'El balance perfecto entre impacto visual y herramientas de crecimiento.',
    features: [
      'Hasta 5 secciones personalizadas',
      'Diseño premium con animaciones',
      'Gestión de contenido sencilla',
      'Meta Pixel + Google Analytics',
      'Optimización avanzada de velocidad',
      'Dominio .com incluido (1er año)',
      'SEO on-page optimizado',
      '2 meses de Plan Tranquilidad Web gratis',
    ],
    cta: 'Quiero el Profesional',
    highlighted: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '2,390',
    tag: null,
    description: 'Para negocios que quieren dominar su categoría con una web de alto impacto.',
    features: [
      'Todo lo del plan Profesional',
      'Gestión de contenido avanzada',
      'Configuración completa de herramientas de medición',
      'Asesoría Google My Business',
      'Diseño exclusivo a medida',
      'Dominio .com incluido (1er año)',
      'Soporte prioritario de lanzamiento',
      '4 meses de Plan Tranquilidad Web gratis',
    ],
    cta: 'Quiero el Premium',
    highlighted: false,
  },
];

// ── Particle Aura Behind Plan Headers ──────────────────────────────────────────
const PlanParticleAura = ({ planId }) => {
  const isBasico = planId === 'basico';
  const isPro = planId === 'profesional';
  const isPremium = planId === 'premium';

  // Number of particles increases from 4 -> 8 -> 16
  const count = isBasico ? 4 : isPro ? 8 : 16;

  const glowBackground = isPremium
    ? 'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(245,158,11,0.35) 0%, rgba(143,173,110,0.3) 45%, transparent 75%)'
    : isPro
    ? 'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(143,173,110,0.28) 0%, transparent 70%)'
    : 'radial-gradient(circle at 50% 50%, rgba(61,74,49,0.14) 0%, transparent 70%)';

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: '-16px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: isPremium ? '200px' : isPro ? '170px' : '140px',
        height: isPremium ? '90px' : '75px',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Central Ambient Glow — Perfectly centered */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: glowBackground,
          borderRadius: '50%',
          filter: isPremium ? 'blur(10px)' : 'blur(6px)',
          transformOrigin: 'center center',
          animation: isPremium ? 'auraPulse 2.8s ease-in-out infinite alternate' : 'none',
        }}
      />

      {/* Floating Particles */}
      {Array.from({ length: count }).map((_, i) => {
        const size = isPremium
          ? (i % 3 === 0 ? 5 : i % 2 === 0 ? 3.5 : 2.5)
          : (i % 2 === 0 ? 3 : 2);
        const left = 8 + ((i * 21) % 84);
        const top = 15 + ((i * 17) % 65);
        const duration = 2.2 + (i % 4) * 0.7;
        const delay = (i % 5) * 0.35;
        const color = isPremium
          ? (i % 3 === 0 ? '#fbbf24' : i % 2 === 0 ? '#8fad6e' : '#f59e0b')
          : (isPro ? '#8fad6e' : '#3D4A31');

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${left}%`,
              top: `${top}%`,
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%',
              background: color,
              boxShadow: isPremium ? `0 0 ${size * 2.5}px ${color}` : `0 0 ${size}px ${color}`,
              opacity: 0,
              animation: `particleRise ${duration}s ease-in-out infinite`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
};

// ── Plan Card ─────────────────────────────────────────────────────────────────
const PlanCard = ({ plan, index }) => {
  const { highlighted, name, price, tag, description, features, cta } = plan;
  const isPremium = plan.id === 'premium';
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      id={`plan-${plan.id}`}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="plan-card"
      style={{
        flex: '1 1 300px',
        maxWidth: '400px',
        position: 'relative',
        borderRadius: '16px',
        border: isPremium
          ? '2px solid #fbbf24'
          : highlighted
          ? '2px solid #3D4A31'
          : '1px solid rgba(0,0,0,0.1)',
        background: isPremium
          ? 'linear-gradient(180deg, #141612 0%, #0B0B0B 100%)'
          : highlighted
          ? '#0B0B0B'
          : '#ffffff',
        padding: '36px 32px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isPremium
          ? '0 24px 70px rgba(245,158,11,0.2), 0 4px 24px rgba(0,0,0,0.3)'
          : highlighted
          ? '0 20px 60px rgba(61,74,49,0.2), 0 4px 20px rgba(0,0,0,0.15)'
          : '0 4px 24px rgba(0,0,0,0.06)',
        transform: highlighted || isPremium ? 'scale(1.03)' : 'scale(1)',
        zIndex: isPremium ? 3 : highlighted ? 2 : 1,
      }}
    >
      {/* Recommended badge */}
      {tag && (
        <div style={{
          position: 'absolute',
          top: '-14px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#3D4A31',
          color: '#fff',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          padding: '5px 16px',
          borderRadius: '100px',
          whiteSpace: 'nowrap',
        }}>
          ★ {tag}
        </div>
      )}

      {/* Centered Plan Name Header with Escalating Particle Aura */}
      <div style={{ position: 'relative', textAlign: 'center', marginBottom: '20px', paddingTop: '6px' }}>
        <PlanParticleAura planId={plan.id} />
        <h3 style={{
          position: 'relative',
          zIndex: 1,
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: isPremium ? '24px' : '20px',
          fontWeight: isPremium ? 800 : 700,
          letterSpacing: isPremium ? '0.02em' : '-0.01em',
          margin: 0,
          color: isPremium ? '#ffffff' : highlighted ? '#ffffff' : '#0B0B0B',
          textShadow: isPremium
            ? '0 0 20px rgba(251,191,36,0.5), 0 0 35px rgba(143,173,110,0.35)'
            : 'none',
        }}>
          {name}
        </h3>
      </div>

      {/* Price */}
      <div style={{ marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '15px',
            fontWeight: 600,
            color: isPremium ? '#fbbf24' : highlighted ? '#8fad6e' : '#3D4A31',
          }}>
            S/
          </span>
          <span
            className="price-number"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '48px',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              color: isPremium ? '#ffffff' : highlighted ? '#ffffff' : '#0B0B0B',
            }}
          >
            {price}
          </span>
        </div>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          color: isPremium || highlighted ? 'rgba(255,255,255,0.55)' : '#999',
          marginTop: '4px',
        }}>
          Pago único · Con comprobante de pago
        </p>
      </div>

      {/* Description */}
      <p
        className="plan-desc"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '14px',
          lineHeight: 1.6,
          color: isPremium || highlighted ? 'rgba(255,255,255,0.65)' : '#555',
          marginBottom: '24px',
          paddingBottom: '24px',
          borderBottom: isPremium || highlighted ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.07)',
        }}
      >
        {description}
      </p>

      {/* Features */}
      <ul className="feature-list" style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', flex: 1 }}>
        {features.map((f) => (
          <li key={f} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            padding: '7px 0',
            borderBottom: isPremium || highlighted ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.05)',
          }}>
            <span style={{
              flexShrink: 0,
              marginTop: '2px',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: isPremium ? 'rgba(251,191,36,0.2)' : highlighted ? 'rgba(143,173,110,0.2)' : 'rgba(61,74,49,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Check size={11} color={isPremium ? '#fbbf24' : highlighted ? '#8fad6e' : '#3D4A31'} strokeWidth={2.5} />
            </span>
            <span
              className="feature-text"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13.5px',
                color: isPremium || highlighted ? 'rgba(255,255,255,0.8)' : '#333',
                lineHeight: 1.5,
              }}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <motion.a
        href={getWhatsAppURL(`Hola%2C%20me%20interesa%20el%20plan%20${name}%20de%20Kacti%20Labs`)}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="plan-cta"
        style={{
          display: 'block',
          textAlign: 'center',
          padding: '14px 20px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '14px',
          fontWeight: 700,
          letterSpacing: '0.02em',
          transition: 'all 0.2s',
          background: isPremium
            ? 'linear-gradient(135deg, #d97706, #fbbf24)'
            : highlighted
            ? '#3D4A31'
            : '#0B0B0B',
          color: '#ffffff',
          border: isPremium
            ? '1px solid #fbbf24'
            : highlighted
            ? '1px solid #3D4A31'
            : '1px solid #0B0B0B',
          boxShadow: isPremium ? '0 4px 20px rgba(251,191,36,0.3)' : 'none',
        }}
        onMouseEnter={e => {
          if (!isPremium) {
            e.currentTarget.style.background = highlighted ? '#4e5f3e' : '#3D4A31';
            e.currentTarget.style.borderColor = '#3D4A31';
          }
        }}
        onMouseLeave={e => {
          if (!isPremium) {
            e.currentTarget.style.background = highlighted ? '#3D4A31' : '#0B0B0B';
            e.currentTarget.style.borderColor = highlighted ? '#3D4A31' : '#0B0B0B';
          }
        }}
      >
        {cta}
      </motion.a>
    </motion.div>
  );
};

// ── Main Section ──────────────────────────────────────────────────────────────
const Services = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
  const noteRef = useRef(null);
  const noteInView = useInView(noteRef, { once: true, margin: '-40px' });

  return (
    <section
      id="servicios"
      aria-labelledby="servicios-heading"
      style={{
        position: 'relative',
        padding: 'clamp(72px, 10vw, 120px) 24px',
        background: '#F8F9FA',
        borderTop: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      {/* Subtle top gradient */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '200px',
        background: 'linear-gradient(to bottom, rgba(61,74,49,0.03), transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 32 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: 'clamp(48px, 7vw, 72px)' }}
        >
          {/* Eyebrow */}
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
            Nuestros planes
          </span>

          <h2
            id="servicios-heading"
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
            Páginas web profesionales
            <br />
            <span style={{ color: '#3D4A31' }}>para negocios locales</span>
          </h2>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: '#666',
            maxWidth: '520px',
            margin: '0 auto',
            lineHeight: 1.65,
          }}>
            Elige el plan que mejor se adapta a tu negocio.
            Todos incluyen comprobante de pago y dominio para el primer año.
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div style={{
          display: 'flex',
          gap: '24px',
          justifyContent: 'center',
          alignItems: 'stretch',
          flexWrap: 'wrap',
        }}>
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          ref={noteRef}
          initial={{ opacity: 0, y: 16 }}
          animate={noteInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          style={{
            marginTop: '48px',
            textAlign: 'center',
            padding: '20px 28px',
            background: 'rgba(61,74,49,0.05)',
            border: '1px solid rgba(61,74,49,0.12)',
            borderRadius: '10px',
            maxWidth: '680px',
            margin: '48px auto 0',
          }}
        >
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13.5px',
            color: '#555',
            lineHeight: 1.6,
          }}>
            💡 <strong style={{ color: '#3D4A31' }}>¿No sabes cuál elegir?</strong>{' '}
            Escríbenos y te asesoramos sin compromiso. Todos los planes incluyen soporte
            durante el desarrollo y una revisión final antes de publicar.
          </p>
        </motion.div>

      </div>

      <style>{`
        @keyframes particleRise {
          0% {
            transform: translateY(8px) scale(0.6);
            opacity: 0;
          }
          50% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(-26px) scale(1.3);
            opacity: 0;
          }
        }
        @keyframes auraPulse {
          0% {
            transform: scale(0.9);
            opacity: 0.7;
          }
          100% {
            transform: scale(1.15);
            opacity: 1;
          }
        }

        /* ── Mobile Responsive Card Sizing ─────────────────────────── */
        @media (max-width: 640px) {
          .plan-card {
            padding: 24px 20px !important;
            max-width: 340px !important;
            width: 100% !important;
            margin: 0 auto !important;
            transform: scale(1) !important;
          }
          .plan-card h3 {
            font-size: 19px !important;
          }
          .plan-card .price-number {
            font-size: 36px !important;
          }
          .plan-card .plan-desc {
            font-size: 13px !important;
            margin-bottom: 16px !important;
            padding-bottom: 16px !important;
          }
          .plan-card .feature-list {
            margin-bottom: 20px !important;
          }
          .plan-card .feature-text {
            font-size: 12.5px !important;
          }
          .plan-card .plan-cta {
            padding: 12px 16px !important;
            font-size: 13px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Services;
