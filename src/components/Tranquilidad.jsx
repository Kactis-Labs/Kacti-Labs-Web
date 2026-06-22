import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, RefreshCw, Bell, Clock } from 'lucide-react';
import { getWhatsAppURL } from '../config/env';

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

const BENEFITS = [
  { icon: Shield, text: 'Tu web siempre protegida y actualizada' },
  { icon: RefreshCw, text: 'Backups automáticos — nunca pierdes nada' },
  { icon: Bell, text: 'Monitoreo 24/7 — te avisamos antes que tú notes algo' },
  { icon: Clock, text: 'Sin contratos largos — cancela cuando quieras' },
];

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
        boxShadow: plan.highlighted ? '0 12px 40px rgba(0,0,0,0.2)' : '0 2px 14px rgba(0,0,0,0.05)',
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
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: plan.highlighted ? 'rgba(255,255,255,0.4)' : '#bbb', marginBottom: '24px' }}>Incluye IGV · Sin permanencia</p>

      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {plan.features.map(f => (
          <li key={f} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{
              flexShrink: 0, marginTop: '2px', width: '16px', height: '16px', borderRadius: '50%',
              background: plan.highlighted ? 'rgba(143,173,110,0.2)' : 'rgba(61,74,49,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1 4l2 2 4-4" stroke={plan.highlighted ? '#8fad6e' : '#3D4A31'} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: plan.highlighted ? 'rgba(255,255,255,0.75)' : '#444', lineHeight: 1.5 }}>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href={getWhatsAppURL(`Hola%2C%20me%20interesa%20el%20Plan%20Tranquilidad%20Web%20${plan.name}`)}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'block',
          textAlign: 'center',
          padding: '12px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '14px',
          fontWeight: 600,
          background: plan.highlighted ? '#3D4A31' : 'transparent',
          color: plan.highlighted ? '#fff' : '#0B0B0B',
          border: plan.highlighted ? '1px solid #3D4A31' : '1px solid rgba(0,0,0,0.15)',
          transition: 'background 0.2s, color 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#3D4A31'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#3D4A31'; }}
        onMouseLeave={e => {
          e.currentTarget.style.background = plan.highlighted ? '#3D4A31' : 'transparent';
          e.currentTarget.style.color = plan.highlighted ? '#fff' : '#0B0B0B';
          e.currentTarget.style.borderColor = plan.highlighted ? '#3D4A31' : 'rgba(0,0,0,0.15)';
        }}
      >
        Contratar plan
      </a>
    </motion.div>
  );
};

const Tranquilidad = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
  const benefitsRef = useRef(null);
  const benefitsInView = useInView(benefitsRef, { once: true, margin: '-60px' });

  return (
    <section
      id="tranquilidad"
      aria-labelledby="tranquilidad-heading"
      style={{
        position: 'relative',
        padding: 'clamp(72px, 10vw, 120px) 24px',
        background: '#ffffff',
        borderTop: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 32 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: 'clamp(32px, 5vw, 56px)' }}
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
            Plan Tranquilidad Web
          </span>
          <h2
            id="tranquilidad-heading"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(26px, 4vw, 48px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: '#0B0B0B',
              marginBottom: '18px',
            }}
          >
            Tu web en manos seguras,{' '}
            <span style={{ color: '#3D4A31' }}>todos los meses</span>
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(15px, 2vw, 17px)',
            color: '#666',
            maxWidth: '540px',
            margin: '0 auto',
            lineHeight: 1.65,
          }}>
            No es mantenimiento técnico — es tranquilidad. Tu web siempre
            segura, actualizada y funcionando para que tú te enfocas en
            lo que mejor haces: tu negocio.
          </p>
        </motion.div>

        {/* Benefits row */}
        <motion.div
          ref={benefitsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '56px',
          }}
        >
          {BENEFITS.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={benefitsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: 'rgba(61,74,49,0.05)',
                border: '1px solid rgba(61,74,49,0.12)',
                borderRadius: '100px',
              }}
            >
              <b.icon size={14} color="#3D4A31" />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#444', fontWeight: 500 }}>
                {b.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Plans */}
        <div style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          alignItems: 'stretch',
        }}>
          {PEACE_PLANS.map((plan, i) => (
            <TranquilidadPlan key={plan.id} plan={plan} index={i} />
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '12.5px',
            color: '#aaa',
            textAlign: 'center',
            marginTop: '32px',
            lineHeight: 1.6,
          }}
        >
          Los meses gratuitos incluidos en tu plan web se activan desde el día del lanzamiento.
          Al vencer el periodo gratuito, el plan mensual entra en vigencia automáticamente —
          puedes cancelar en cualquier momento sin penalidad.
        </motion.p>
      </div>
    </section>
  );
};

export default Tranquilidad;
