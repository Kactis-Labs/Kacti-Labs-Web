import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, RefreshCw, Bell, Clock, MessageCircle } from 'lucide-react';
import { getWhatsAppURL } from '../config/env';

const WHATSAPP_URL = getWhatsAppURL('Hola%2C%20quiero%20saber%20m%C3%A1s%20sobre%20el%20Plan%20Tranquilidad%20Web');

const PEACE_PLANS = [
  {
    id: 'basico',
    name: 'Con el plan Básico',
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
    name: 'Con el plan Profesional',
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
    name: 'Con el plan Premium',
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

const BENEFITS = [
  { icon: Shield,     text: 'Tu web siempre protegida y actualizada' },
  { icon: RefreshCw,  text: 'Backups automáticos — nunca pierdes nada' },
  { icon: Bell,       text: 'Monitoreo 24/7 — te avisamos antes de que notes algo' },
  { icon: Clock,      text: 'Sin contratos largos — cancela cuando quieras' },
];

// ── Plan card — without individual CTA button ─────────────────────────────────
const TranquilidadPlan = ({ plan, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      style={{
        flex: '1 1 220px',
        maxWidth: '320px',
        padding: '32px 28px',
        borderRadius: '14px',
        background: plan.highlighted ? '#0B0B0B' : '#fff',
        border: plan.highlighted ? '2px solid #3D4A31' : '1px solid rgba(0,0,0,0.09)',
        boxShadow: plan.highlighted
          ? '0 12px 40px rgba(0,0,0,0.2)'
          : '0 2px 14px rgba(0,0,0,0.05)',
        position: 'relative',
      }}
    >
      {plan.highlighted && (
        <div style={{
          position: 'absolute',
          top: '-13px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#3D4A31',
          color: '#fff',
          fontFamily: "'Inter', sans-serif",
          fontSize: '11px',
          fontWeight: 700,
          padding: '4px 14px',
          borderRadius: '100px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}>
          Más popular
        </div>
      )}

      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '16px',
        fontWeight: 700,
        color: plan.highlighted ? '#fff' : '#0B0B0B',
        marginBottom: '16px',
      }}>
        {plan.name}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '6px' }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', fontWeight: 600, color: plan.highlighted ? '#8fad6e' : '#3D4A31' }}>S/</span>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '42px', fontWeight: 800, letterSpacing: '-0.02em', color: plan.highlighted ? '#fff' : '#0B0B0B', lineHeight: 1 }}>{plan.price}</span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: plan.highlighted ? 'rgba(255,255,255,0.45)' : '#999' }}>/mes</span>
      </div>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: plan.highlighted ? 'rgba(255,255,255,0.4)' : '#bbb', marginBottom: '24px' }}>
        Incluye IGV · Sin permanencia
      </p>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {plan.features.map(f => (
          <li key={f} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{
              flexShrink: 0, marginTop: '2px', width: '16px', height: '16px', borderRadius: '50%',
              background: plan.highlighted ? 'rgba(143,173,110,0.2)' : 'rgba(61,74,49,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="8" height="8" viewBox="0 0 8 8">
                <path d="M1 4l2 2 4-4" stroke={plan.highlighted ? '#8fad6e' : '#3D4A31'} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: plan.highlighted ? 'rgba(255,255,255,0.75)' : '#444', lineHeight: 1.5 }}>{f}</span>
          </li>
        ))}
      </ul>
      {/* "Contratar plan" button intentionally removed — single CTA below the cards */}
    </motion.div>
  );
};

// ── Main Section ──────────────────────────────────────────────────────────────
const Tranquilidad = () => {
  const headerRef   = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
  const plansRef    = useRef(null);
  const plansInView = useInView(plansRef, { once: true, margin: '-60px' });

  return (
    <section
      id="tranquilidad"
      aria-labelledby="tranquilidad-heading"
      style={{
        position: 'relative',
        background: '#F8F9FA',          /* matches the recolored image bg */
        borderTop: '1px solid rgba(0,0,0,0.06)',
        overflow: 'hidden',
      }}
    >
      {/* ─── TOP BAND: image (left) + intro text (right) ─────────────────────── */}
      <div
        className="tranq-hero-grid"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '620px 1fr',
          gap: '0',
          alignItems: 'center',      /* vertically centres both columns */
          padding: '0 24px',
        }}
      >
        {/* LEFT — team image, flush to the bottom of this band */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative',
          }}
        >
          {/*
           * Floating wrapper. The animation lifts the image up to -12px.
           * A static background patch sits underneath so the section
           * background never shows through the gap when the image is up.
           */}
          <div style={{ position: 'relative' }}>
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'relative', width: '100%' }}
            >
              <img
                src="/tranquilidad-team.png"
                alt="Emprendedores que confían en Kacti Labs"
                style={{
                  width: '100%',
                  maxWidth: '620px',
                  display: 'block',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                }}
              />
              {/* Fade: starts at 40% from bottom, fully opaque at 100% */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '60%',
                  background:
                    'linear-gradient(to bottom, transparent 0%, rgba(248,249,250,0.6) 50%, #F8F9FA 80%)',
                  pointerEvents: 'none',
                }}
              />
            </motion.div>

            {/* Static patch — always covers the bottom gap the float creates */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '20px',
                background: '#F8F9FA',
                pointerEvents: 'none',
              }}
            />
          </div>
        </motion.div>

        {/* RIGHT — section label, title, context explanation, benefits */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            padding: 'clamp(64px, 9vw, 100px) 0 clamp(48px, 6vw, 72px) clamp(32px, 4vw, 60px)',
          }}
        >
          {/* Label */}
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
            Plan Tranquilidad Web
          </span>

          {/* H2 */}
          <h2
            id="tranquilidad-heading"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(26px, 3.5vw, 46px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: '#0B0B0B',
              marginBottom: '20px',
            }}
          >
            Mantén tu web siempre{' '}
            <span style={{ color: '#3D4A31' }}>actualizada y segura</span>
          </h2>

          {/* Context — clarifies hierarchy */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(14px, 1.6vw, 16px)',
            color: '#555',
            lineHeight: 1.7,
            maxWidth: '500px',
            marginBottom: '32px',
          }}>
            Todos nuestros planes web incluyen <strong style={{ color: '#3D4A31' }}>meses gratis</strong> de Plan Tranquilidad Web —
            el nivel de beneficios varía según el plan principal que elijas.
            Después del período gratuito, puedes continuar con este servicio mensual
            para que tu web siempre esté al día, segura y funcionando perfectamente.
            <br /><br />
            <span style={{ color: '#0B0B0B', fontWeight: 500 }}>
              Para que tú solo te preocupes de lo más importante: tu negocio.
            </span>
          </p>

          {/* Benefits pills */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {BENEFITS.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  background: 'rgba(61,74,49,0.06)',
                  border: '1px solid rgba(61,74,49,0.14)',
                  borderRadius: '100px',
                }}
              >
                <b.icon size={14} color="#3D4A31" />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#444', fontWeight: 500 }}>
                  {b.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ─── PLANS BAND ──────────────────────────────────────────────────────── */}
      <div
        style={{
          background: '#fff',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          padding: 'clamp(56px, 7vw, 88px) 24px',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          {/* Plans grid */}
          <div
            ref={plansRef}
            style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              alignItems: 'stretch',
              marginBottom: '48px',
            }}
          >
            {PEACE_PLANS.map((plan, i) => (
              <TranquilidadPlan key={plan.id} plan={plan} index={i} />
            ))}
          </div>

          {/* Single section-level CTA → WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: 'center' }}
          >
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(37,211,102,0.25)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '15px 32px',
                background: '#0B0B0B',
                color: '#fff',
                borderRadius: '10px',
                textDecoration: 'none',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '15px',
                fontWeight: 600,
                letterSpacing: '0.01em',
                border: '1px solid #0B0B0B',
                transition: 'background 0.2s',
              }}
            >
              <MessageCircle size={18} color="#25D366" />
              Pregúntanos por WhatsApp
            </motion.a>

            {/* Disclaimer */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '12.5px',
                color: '#aaa',
                marginTop: '24px',
                lineHeight: 1.6,
                maxWidth: '620px',
                margin: '20px auto 0',
              }}
            >
              Los meses gratuitos se activan desde el día del lanzamiento de tu web.
              Al vencer el período gratuito, el plan mensual entra en vigencia — puedes cancelar en cualquier momento sin penalidad.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 920px) {
          .tranq-hero-grid {
            grid-template-columns: 1fr !important;
          }
          .tranq-hero-grid > div:first-child {
            max-width: 360px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
};

export default Tranquilidad;
