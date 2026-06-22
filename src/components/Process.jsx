import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { MessageSquare, Palette, Code2, Rocket, HeartHandshake } from 'lucide-react';

const STEPS = [
  {
    id: 1,
    icon: MessageSquare,
    title: 'Escuchamos tu negocio',
    description:
      'Todo empieza con una conversación. Queremos entender quiénes son tus clientes, qué te diferencia de la competencia y qué esperas de tu nueva web. Sin formularios complicados — solo una charla directa por WhatsApp o videollamada.',
    duration: 'Día 1',
  },
  {
    id: 2,
    icon: Palette,
    title: 'Diseñamos tu propuesta',
    description:
      'Nuestro equipo crea un diseño a medida que refleja la identidad de tu negocio. Paleta de colores, tipografía, estructura de contenido — todo pensado para generar confianza desde el primer vistazo.',
    duration: 'Días 2–4',
  },
  {
    id: 3,
    icon: Code2,
    title: 'Desarrollamos con tecnología de punta',
    description:
      'Construimos tu web con herramientas avanzadas de desarrollo para garantizar velocidad, seguridad y una experiencia impecable en todos los dispositivos. Tu web estará optimizada para cargar rápido y posicionarse bien en Google.',
    duration: 'Días 5–8',
  },
  {
    id: 4,
    icon: Rocket,
    title: 'Revisamos y publicamos',
    description:
      'Antes de publicar, revisamos cada detalle contigo. Una vez que apruebes, conectamos tu dominio y lanzamos. Tu negocio ya tiene presencia digital profesional — lista para recibir clientes.',
    duration: 'Día 9–10',
  },
  {
    id: 5,
    icon: HeartHandshake,
    title: 'Soporte continuo',
    description:
      'Publicar es solo el inicio. Con nuestro Plan Tranquilidad Web te aseguramos que tu sitio siempre esté actualizado, seguro y funcionando. Somos el equipo técnico que tu negocio necesita sin tener que contratar a nadie.',
    duration: 'Ongoing',
  },
];

// ── Step Item ─────────────────────────────────────────────────────────────────
const StepItem = ({ step, index, isLast }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'flex',
        gap: '24px',
        paddingBottom: isLast ? 0 : '52px',
        position: 'relative',
      }}
    >
      {/* Vertical line + icon column */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '12px',
          background: inView ? '#0B0B0B' : '#f0f0f0',
          border: '2px solid #0B0B0B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          zIndex: 1,
          transition: 'background 0.4s',
        }}>
          <step.icon size={22} color="#8fad6e" />
        </div>
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            style={{
              width: '1px',
              flex: 1,
              background: 'linear-gradient(to bottom, #3D4A31, rgba(61,74,49,0.15))',
              transformOrigin: 'top',
              marginTop: '8px',
            }}
          />
        )}
      </div>

      {/* Content */}
      <div style={{ paddingTop: '10px', paddingBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            fontWeight: 700,
            color: '#3D4A31',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            background: 'rgba(61,74,49,0.08)',
            padding: '3px 10px',
            borderRadius: '100px',
          }}>
            {step.duration}
          </span>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            color: '#aaa',
          }}>
            Paso {index + 1} de {STEPS.length}
          </span>
        </div>
        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(18px, 2.5vw, 22px)',
          fontWeight: 700,
          color: '#0B0B0B',
          letterSpacing: '-0.01em',
          marginBottom: '10px',
          lineHeight: 1.25,
        }}>
          {step.title}
        </h3>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '15px',
          lineHeight: 1.7,
          color: '#555',
          maxWidth: '480px',
        }}>
          {step.description}
        </p>
      </div>
    </motion.div>
  );
};

// ── Sticky Visual Panel ───────────────────────────────────────────────────────
const StickyPanel = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div
      ref={ref}
      style={{
        position: 'sticky',
        top: '100px',
        height: 'fit-content',
        background: '#0B0B0B',
        borderRadius: '20px',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        overflow: 'hidden',
        minHeight: '440px',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(61,74,49,0.4) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Progress track */}
      <div style={{
        position: 'relative',
        width: '2px',
        height: '220px',
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '2px',
        marginBottom: '32px',
      }}>
        <motion.div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: lineHeight,
          background: 'linear-gradient(to bottom, #3D4A31, #8fad6e)',
          borderRadius: '2px',
        }} />
        {/* Step dots */}
        {STEPS.map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: '50%',
            top: `${(i / (STEPS.length - 1)) * 100}%`,
            transform: 'translate(-50%, -50%)',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: '#3D4A31',
            border: '2px solid #0B0B0B',
            zIndex: 2,
          }} />
        ))}
      </div>

      {/* Labels */}
      <div style={{ textAlign: 'center' }}>
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '22px',
          fontWeight: 700,
          color: '#ffffff',
          marginBottom: '8px',
        }}>
          De la idea al lanzamiento
        </p>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '14px',
          color: 'rgba(255,255,255,0.5)',
          lineHeight: 1.6,
          maxWidth: '220px',
          margin: '0 auto',
        }}>
          Proceso ágil pensado para tu tranquilidad
        </p>
      </div>

      {/* Bottom stat */}
      <div style={{
        marginTop: '32px',
        padding: '14px 24px',
        background: 'rgba(61,74,49,0.2)',
        border: '1px solid rgba(61,74,49,0.3)',
        borderRadius: '10px',
        textAlign: 'center',
      }}>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '28px',
          fontWeight: 800,
          color: '#8fad6e',
        }}>~10 días</span>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          color: 'rgba(255,255,255,0.5)',
          marginTop: '4px',
        }}>
          de idea a sitio publicado
        </p>
      </div>
    </div>
  );
};

// ── Main Section ──────────────────────────────────────────────────────────────
const Process = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section
      id="proceso"
      aria-labelledby="proceso-heading"
      style={{
        position: 'relative',
        padding: 'clamp(72px, 10vw, 120px) 24px',
        background: '#ffffff',
        borderTop: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 32 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: 'clamp(56px, 8vw, 88px)' }}
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
            Cómo trabajamos
          </span>
          <h2
            id="proceso-heading"
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
            Simple, rápido{' '}
            <span style={{ color: '#3D4A31' }}>y sin estrés</span>
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: '#666',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: 1.65,
          }}>
            Un proceso claro para que sepas exactamente qué esperar
            en cada momento del camino.
          </p>
        </motion.div>

        {/* Two-column: sticky visual + steps */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'start',
        }}
          className="process-grid"
        >
          {/* Sticky visual (left on desktop) */}
          <div className="process-sticky">
            <StickyPanel />
          </div>

          {/* Steps (right on desktop) */}
          <div>
            {STEPS.map((step, i) => (
              <StepItem
                key={step.id}
                step={step}
                index={i}
                isLast={i === STEPS.length - 1}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .process-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .process-sticky {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Process;
