import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import { MessageSquare, Palette, Code2, Rocket, HeartHandshake } from 'lucide-react';

const STEPS = [
  {
    id: 1,
    icon: MessageSquare,
    title: 'Escuchamos tu negocio',
    description:
      'Todo empieza con una conversación. Queremos entender quiénes son tus clientes, qué te diferencia de la competencia y qué esperas de tu nueva web. Sin formularios complicados — solo una charla directa por WhatsApp o videollamada.',
  },
  {
    id: 2,
    icon: Palette,
    title: 'Diseñamos tu propuesta',
    description:
      'Nuestro equipo crea un diseño a medida que refleja la identidad de tu negocio. Paleta de colores, tipografía, estructura de contenido — todo pensado para generar confianza desde el primer vistazo.',
  },
  {
    id: 3,
    icon: Code2,
    title: 'Desarrollamos con tecnología de punta',
    description:
      'Construimos tu web con herramientas avanzadas de desarrollo para garantizar velocidad, seguridad y una experiencia impecable en todos los dispositivos. Tu web estará optimizada para cargar rápido y posicionarse bien en Google.',
  },
  {
    id: 4,
    icon: Rocket,
    title: 'Revisamos y publicamos',
    description:
      'Antes de publicar, revisamos cada detalle contigo. Una vez que apruebes, conectamos tu dominio y lanzamos. Tu negocio ya tiene presencia digital profesional — lista para recibir clientes.',
  },
  {
    id: 5,
    icon: HeartHandshake,
    title: 'Soporte continuo',
    description:
      'Publicar es solo el inicio. Con nuestro Plan Tranquilidad Web te aseguramos que tu sitio siempre esté actualizado, seguro y funcionando. Somos el equipo técnico que tu negocio necesita sin tener que contratar a nadie.',
  },
];

// ── Scroll-driven timeline step ───────────────────────────────────────────────
const StepItem = ({ step, index, isLast, sectionProgress }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  // Each step occupies an equal fraction of the scroll range
  const stepFraction = 1 / STEPS.length;
  const stepStart = index * stepFraction;
  const stepEnd = (index + 1) * stepFraction;

  // This step is "done" when scroll has passed its midpoint
  const stepMid = stepStart + stepFraction * 0.5;
  // Use a derived motion value to drive the check icon
  const isDone = useTransform(sectionProgress, (p) => p >= stepMid);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'flex',
        gap: '24px',
        paddingBottom: isLast ? 0 : '52px',
        position: 'relative',
      }}
    >
      {/* Icon column with scroll-driven connector line */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        {/* Step icon — shows checkmark when this step is done */}
        <motion.div
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '12px',
            background: '#0B0B0B',
            border: '2px solid #0B0B0B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            zIndex: 1,
            position: 'relative',
          }}
        >
          {/* Base icon */}
          <motion.span
            style={{ position: 'absolute', display: 'flex' }}
            animate={undefined}
          >
            <step.icon size={22} color="#8fad6e" />
          </motion.span>

          {/* Check overlay — fades in when step is done */}
          <motion.span
            style={{
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              borderRadius: '12px',
              background: '#3D4A31',
              opacity: useTransform(sectionProgress, [stepMid - 0.05, stepMid + 0.05], [0, 1]),
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <motion.path
                d="M4 10l4 4 8-8"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={useTransform(sectionProgress, [stepMid - 0.05, stepMid + 0.1], [0, 1])}
              />
            </svg>
          </motion.span>
        </motion.div>

        {/* Connector line between steps — fills with scroll progress */}
        {!isLast && (
          <div style={{
            width: '2px',
            flex: 1,
            background: 'rgba(61,74,49,0.12)',
            borderRadius: '2px',
            marginTop: '8px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                // Fill from 0% to 100% as scroll goes from this step's start to next step's start
                height: useTransform(
                  sectionProgress,
                  [stepStart, stepEnd],
                  ['0%', '100%'],
                ),
                background: 'linear-gradient(to bottom, #3D4A31, #8fad6e)',
                borderRadius: '2px',
              }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ paddingTop: '10px', paddingBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            fontWeight: 700,
            color: '#aaa',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
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
const StickyPanel = ({ sectionProgress }) => {
  const lineHeight = useTransform(sectionProgress, [0, 1], ['0%', '100%']);
  const smoothLine = useSpring(lineHeight, { stiffness: 80, damping: 20, mass: 0.5 });

  return (
    <div
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

      {/* Progress track — scroll driven */}
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
          height: smoothLine,
          background: 'linear-gradient(to bottom, #3D4A31, #8fad6e)',
          borderRadius: '2px',
        }} />
        {/* Dots with check on completion */}
        {STEPS.map((_, i) => {
          const dotProgress = i / (STEPS.length - 1);
          const dotDone = useTransform(sectionProgress, (p) => p >= dotProgress + 0.05);
          return (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                left: '50%',
                top: `${dotProgress * 100}%`,
                transform: 'translate(-50%, -50%)',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: useTransform(sectionProgress, (p) =>
                  p >= dotProgress + 0.05 ? '#8fad6e' : '#3D4A31'
                ),
                border: '2px solid #0B0B0B',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          );
        })}
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

      {/* Progress percentage */}
      <div style={{
        marginTop: '32px',
        padding: '14px 24px',
        background: 'rgba(61,74,49,0.2)',
        border: '1px solid rgba(61,74,49,0.3)',
        borderRadius: '10px',
        textAlign: 'center',
      }}>
        <motion.span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '28px',
          fontWeight: 800,
          color: '#8fad6e',
          display: 'block',
        }}>
          {useTransform(sectionProgress, (p) => `${Math.round(p * 100)}%`)}
        </motion.span>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          color: 'rgba(255,255,255,0.5)',
          marginTop: '4px',
        }}>
          del proceso completado
        </p>
      </div>
    </div>
  );
};

// ── Main Section ──────────────────────────────────────────────────────────────
const Process = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  // Track scroll progress of the ENTIRE section — from when top enters viewport to bottom exits
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 70%', 'end 90%'],
  });

  // Smooth spring so the line follows scroll fluidly
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 18, mass: 0.8 });

  return (
    <section
      ref={sectionRef}
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
            Simple, claro{' '}
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
            Un proceso transparente para que sepas exactamente qué esperar
            en cada momento del camino.
          </p>
        </motion.div>

        {/* Two-column: sticky visual + steps */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            /*
             * NO alignItems: start — the default 'stretch' is intentional.
             * It makes the left cell expand to the same height as the right
             * cell (driven by the 5-step list). Only when the left column
             * is that tall does position:sticky have room to stay pinned
             * through all 5 steps.
             */
          }}
          className="process-grid"
        >
          {/* LEFT — sticky column. Height = right column height (via grid stretch). */}
          <div className="process-sticky">
            <StickyPanel sectionProgress={smoothProgress} />
          </div>

          {/* RIGHT — steps list.
              paddingBottom creates a release buffer: the sticky card
              glides off gently before the section's bottom edge arrives. */}
          <div style={{ paddingBottom: '120px' }}>
            {STEPS.map((step, i) => (
              <StepItem
                key={step.id}
                step={step}
                index={i}
                isLast={i === STEPS.length - 1}
                sectionProgress={smoothProgress}
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
