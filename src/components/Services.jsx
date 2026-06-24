import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Star, Zap, Shield, RefreshCw, Bell, Clock } from 'lucide-react';
import { getWhatsAppURL } from '../config/env';

// ── Data ─────────────────────────────────────────────────────────────────────

const PLANS = [
  {
    id: 'basico',
    icon: Shield,
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
    accentColor: '#0B0B0B',
  },
  {
    id: 'profesional',
    icon: Star,
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
    accentColor: '#3D4A31',
  },
  {
    id: 'premium',
    icon: Zap,
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
    accentColor: '#0B0B0B',
  },
];

const PEACE_PLANS = [
  {
    id: 'basico',
    name: 'Básico',
    price: '120',
    features: [
      'Actualizaciones de seguridad',
      'Copias de seguridad mensuales',
      'Monitoreo de uptime',
      'Soporte por WhatsApp',
    ],
  },
  {
    id: 'profesional',
    name: 'Profesional',
    price: '180',
    highlighted: true,
    features: [
      'Todo del plan Básico',
      'Actualizaciones de contenido (2/mes)',
      'Copias de seguridad semanales',
      'Reporte mensual de rendimiento',
      'Soporte prioritario',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '250',
    features: [
      'Todo del plan Profesional',
      'Actualizaciones ilimitadas de contenido',
      'Copias de seguridad diarias',
      'Optimización de velocidad continua',
      'Asesoría mensual de 30 min',
    ],
  },
];

// ── Feature Row ───────────────────────────────────────────────────────────────
const Feature = ({ text, highlighted }) => (
  <li style={{
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    padding: '7px 0',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
  }}>
    <span style={{
      flexShrink: 0,
      marginTop: '2px',
      width: '18px',
      height: '18px',
      borderRadius: '50%',
      background: highlighted ? 'rgba(61,74,49,0.12)' : 'rgba(0,0,0,0.06)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Check size={11} color={highlighted ? '#3D4A31' : '#555'} strokeWidth={2.5} />
    </span>
    <span style={{
      fontFamily: "'Inter', sans-serif",
      fontSize: '14px',
      color: highlighted ? '#0B0B0B' : '#333',
      lineHeight: 1.5,
    }}>
      {text}
    </span>
  </li>
);

// ── Plan Card ─────────────────────────────────────────────────────────────────
const PlanCard = ({ plan, index }) => {
  const { highlighted, icon: Icon, name, price, tag, description, features, cta, accentColor } = plan;
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
      style={{
        flex: '1 1 300px',
        maxWidth: '400px',
        position: 'relative',
        borderRadius: '16px',
        border: highlighted ? '2px solid #3D4A31' : '1px solid rgba(0,0,0,0.1)',
        background: highlighted ? '#0B0B0B' : '#ffffff',
        padding: '36px 32px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: highlighted
          ? '0 20px 60px rgba(61,74,49,0.2), 0 4px 20px rgba(0,0,0,0.15)'
          : '0 4px 24px rgba(0,0,0,0.06)',
        transform: highlighted ? 'scale(1.03)' : 'scale(1)',
        zIndex: highlighted ? 2 : 1,
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

      {/* Icon + Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '10px',
          background: highlighted ? 'rgba(61,74,49,0.3)' : 'rgba(61,74,49,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Icon size={20} color={highlighted ? '#8fad6e' : '#3D4A31'} />
        </div>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '18px',
          fontWeight: 700,
          color: highlighted ? '#ffffff' : '#0B0B0B',
          letterSpacing: '-0.01em',
        }}>
          {name}
        </span>
      </div>

      {/* Price */}
      <div style={{ marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '15px',
            fontWeight: 600,
            color: highlighted ? '#8fad6e' : '#3D4A31',
          }}>
            S/
          </span>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '48px',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            color: highlighted ? '#ffffff' : '#0B0B0B',
          }}>
            {price}
          </span>
        </div>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          color: highlighted ? 'rgba(255,255,255,0.5)' : '#999',
          marginTop: '4px',
        }}>
          Pago único · Incluye IGV
        </p>
      </div>

      {/* Description */}
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '14px',
        lineHeight: 1.6,
        color: highlighted ? 'rgba(255,255,255,0.65)' : '#555',
        marginBottom: '24px',
        paddingBottom: '24px',
        borderBottom: highlighted ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.07)',
      }}>
        {description}
      </p>

      {/* Features */}
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', flex: 1 }}>
        {features.map((f) => (
          <li key={f} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            padding: '7px 0',
            borderBottom: highlighted ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.05)',
          }}>
            <span style={{
              flexShrink: 0,
              marginTop: '2px',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: highlighted ? 'rgba(143,173,110,0.2)' : 'rgba(61,74,49,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Check size={11} color={highlighted ? '#8fad6e' : '#3D4A31'} strokeWidth={2.5} />
            </span>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13.5px',
              color: highlighted ? 'rgba(255,255,255,0.8)' : '#333',
              lineHeight: 1.5,
            }}>
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
          transition: 'background 0.2s, color 0.2s',
          background: highlighted ? '#3D4A31' : '#0B0B0B',
          color: '#ffffff',
          border: highlighted ? '1px solid #3D4A31' : '1px solid #0B0B0B',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = highlighted ? '#4e5f3e' : '#3D4A31';
          e.currentTarget.style.borderColor = '#3D4A31';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = highlighted ? '#3D4A31' : '#0B0B0B';
          e.currentTarget.style.borderColor = highlighted ? '#3D4A31' : '#0B0B0B';
        }}
      >
        {cta}
      </motion.a>
    </motion.div>
  );
};

// ── Tranquilidad Mini Card ────────────────────────────────────────────────────
const PeaceMiniCard = ({ plan, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      style={{
        flex: '1 1 180px',
        maxWidth: '260px',
        padding: '24px 22px',
        borderRadius: '12px',
        background: plan.highlighted ? '#0B0B0B' : '#fff',
        border: plan.highlighted ? '2px solid #3D4A31' : '1px solid rgba(0,0,0,0.09)',
        boxShadow: plan.highlighted ? '0 8px 32px rgba(0,0,0,0.18)' : '0 2px 10px rgba(0,0,0,0.04)',
        position: 'relative',
      }}
    >
      {plan.highlighted && (
        <div style={{
          position: 'absolute', top: '-11px', left: '50%', transform: 'translateX(-50%)',
          background: '#3D4A31', color: '#fff',
          fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 700,
          padding: '3px 12px', borderRadius: '100px', letterSpacing: '0.08em',
          textTransform: 'uppercase', whiteSpace: 'nowrap',
        }}>Más popular</div>
      )}
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', fontWeight: 700, color: plan.highlighted ? '#fff' : '#0B0B0B', marginBottom: '10px' }}>
        {plan.name}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px', marginBottom: '4px' }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '12px', fontWeight: 600, color: plan.highlighted ? '#8fad6e' : '#3D4A31' }}>S/</span>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '32px', fontWeight: 800, letterSpacing: '-0.02em', color: plan.highlighted ? '#fff' : '#0B0B0B', lineHeight: 1 }}>{plan.price}</span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: plan.highlighted ? 'rgba(255,255,255,0.4)' : '#aaa' }}>/mes</span>
      </div>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '10.5px', color: plan.highlighted ? 'rgba(255,255,255,0.35)' : '#bbb', marginBottom: '16px' }}>Sin permanencia · Incluye IGV</p>
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {plan.features.map(f => (
          <li key={f} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <span style={{ flexShrink: 0, marginTop: '2px', width: '14px', height: '14px', borderRadius: '50%', background: plan.highlighted ? 'rgba(143,173,110,0.2)' : 'rgba(61,74,49,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="7" height="7" viewBox="0 0 8 8"><path d="M1 4l2 2 4-4" stroke={plan.highlighted ? '#8fad6e' : '#3D4A31'} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: plan.highlighted ? 'rgba(255,255,255,0.72)' : '#555', lineHeight: 1.45 }}>{f}</span>
          </li>
        ))}
      </ul>
      <a
        href={getWhatsAppURL(`Hola%2C%20me%20interesa%20el%20Plan%20Tranquilidad%20Web%20${plan.name}`)}
        target="_blank" rel="noopener noreferrer"
        style={{
          display: 'block', textAlign: 'center', padding: '10px 12px', borderRadius: '7px',
          textDecoration: 'none', fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '12.5px', fontWeight: 600,
          background: plan.highlighted ? '#3D4A31' : 'transparent',
          color: plan.highlighted ? '#fff' : '#0B0B0B',
          border: plan.highlighted ? '1px solid #3D4A31' : '1px solid rgba(0,0,0,0.14)',
          transition: 'background 0.2s, color 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#3D4A31'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#3D4A31'; }}
        onMouseLeave={e => {
          e.currentTarget.style.background = plan.highlighted ? '#3D4A31' : 'transparent';
          e.currentTarget.style.color = plan.highlighted ? '#fff' : '#0B0B0B';
          e.currentTarget.style.borderColor = plan.highlighted ? '#3D4A31' : 'rgba(0,0,0,0.14)';
        }}
      >Contratar plan</a>
    </motion.div>
  );
};

const PEACE_BENEFITS = [
  { icon: Shield, text: 'Siempre protegida y actualizada' },
  { icon: RefreshCw, text: 'Backups automáticos incluidos' },
  { icon: Bell, text: 'Monitoreo 24/7 de disponibilidad' },
  { icon: Clock, text: 'Sin contratos — cancela cuando quieras' },
];

// ── Compact Tranquilidad Embed ────────────────────────────────────────────────
const TranquilidadEmbed = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      id="tranquilidad"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      style={{
        marginTop: '72px',
        borderTop: '1px solid rgba(0,0,0,0.08)',
        paddingTop: '64px',
      }}
    >
      {/* Section label + heading */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span style={{
          display: 'inline-block', marginBottom: '12px',
          fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600,
          letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3D4A31',
        }}>
          Plan de Tranquilidad Web
        </span>
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(22px, 3.5vw, 38px)',
          fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15,
          color: '#0B0B0B', marginBottom: '12px',
        }}>
          Mantén tu web siempre{' '}
          <span style={{ color: '#3D4A31' }}>actualizada y segura</span>
        </h2>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#666',
          maxWidth: '480px', margin: '0 auto', lineHeight: 1.65,
        }}>
          Servicio mensual complementario a tu plan web — sin permanencia.
        </p>
      </div>

      {/* Benefits pills */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
        {PEACE_BENEFITS.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 + i * 0.07, duration: 0.35 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              padding: '7px 14px', background: 'rgba(61,74,49,0.05)',
              border: '1px solid rgba(61,74,49,0.12)', borderRadius: '100px',
            }}
          >
            <b.icon size={13} color="#3D4A31" />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12.5px', color: '#444', fontWeight: 500 }}>{b.text}</span>
          </motion.div>
        ))}
      </div>

      {/* Mini pricing cards */}
      <div style={{ display: 'flex', gap: '18px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'stretch' }}>
        {PEACE_PLANS.map((plan, i) => (
          <PeaceMiniCard key={plan.id} plan={plan} index={i} />
        ))}
      </div>

      {/* Disclaimer */}
      <p style={{
        fontFamily: "'Inter', sans-serif", fontSize: '11.5px', color: '#bbb',
        textAlign: 'center', marginTop: '24px', lineHeight: 1.6,
      }}>
        Los meses gratuitos incluidos en tu plan web se activan desde el lanzamiento. Al vencer, el plan mensual entra en vigencia — puedes cancelar cuando quieras.
      </p>
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
            Todos incluyen IGV y dominio para el primer año.
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

        {/* ── Tranquilidad Web (compact, embedded) ────────────────────────── */}
        <TranquilidadEmbed />

      </div>
    </section>
  );
};

export default Services;
