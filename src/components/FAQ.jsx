import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const FAQS = [
  {
    id: 'entrega',
    question: '¿Cuánto tiempo tarda en estar lista mi web?',
    answer:
      'Nuestro proceso estándar toma entre 8 y 12 días hábiles desde la primera reunión hasta el lanzamiento. El plan Básico suele estar listo antes — el plan Premium puede tomar un poco más dependiendo de la complejidad del contenido. Te damos una fecha estimada clara desde el inicio.',
  },
  {
    id: 'tranquilidad',
    question: '¿Qué pasa cuando se acaba el periodo gratis de Tranquilidad Web?',
    answer:
      'Al finalizar el periodo gratuito incluido en tu plan (1, 2 o 4 meses según el plan que elegiste), el Plan Tranquilidad Web entra en vigencia automáticamente al precio mensual correspondiente. Te avisamos con anticipación para que puedas decidir si deseas continuar. Puedes cancelar en cualquier momento sin permanencia mínima.',
  },
  {
    id: 'pagos',
    question: '¿Cuáles son los métodos de pago aceptados?',
    answer:
      'Aceptamos transferencia bancaria (BCP, Interbank, BBVA), Yape y Plin. El pago del proyecto principal se divide en dos partes: 50% al inicio para reservar tu fecha y 50% al aprobar el diseño final. El plan Tranquilidad Web se cobra mensualmente.',
  },
  {
    id: 'dominio',
    question: '¿El dominio es mío para siempre?',
    answer:
      'El dominio .com que incluimos en tu plan cubre el primer año de registro — a tu nombre, con tus datos. A partir del segundo año, la renovación anual tiene un costo de mercado (aproximadamente S/60–80 al año). Te avisamos antes de que venza para que nunca pierdas tu nombre de dominio.',
  },
  {
    id: 'cambios',
    question: '¿Puedo pedir cambios después de que se entregue la web?',
    answer:
      'Antes del lanzamiento incluimos rondas de revisión para asegurarnos de que todo quede exactamente como lo imaginas. Una vez publicada la web, los cambios menores de contenido (textos, fotos) están cubiertos por el Plan Tranquilidad Web. Cambios estructurales mayores se cotizan por separado.',
  },
  {
    id: 'ai',
    question: '¿Cómo construyen las webs tan rápido sin perder calidad?',
    answer:
      'Trabajamos con herramientas avanzadas de desarrollo y un proceso probado que nos permite ser ágiles sin sacrificar detalle. Cada web es diseñada y revisada a mano por nuestro equipo — la velocidad viene de la experiencia y las herramientas de punta que usamos, no de recortar pasos.',
  },
];

// ── FAQ Item ──────────────────────────────────────────────────────────────────
const FAQItem = ({ faq, index }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`faq-answer-${faq.id}`}
        id={`faq-btn-${faq.id}`}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          padding: '22px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(15px, 2vw, 17px)',
          fontWeight: 600,
          color: open ? '#3D4A31' : '#0B0B0B',
          lineHeight: 1.35,
          transition: 'color 0.2s',
        }}>
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          style={{
            flexShrink: 0,
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: open ? '#3D4A31' : 'rgba(0,0,0,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.25s',
          }}
        >
          <Plus size={16} color={open ? '#fff' : '#555'} strokeWidth={2} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-answer-${faq.id}`}
            role="region"
            aria-labelledby={`faq-btn-${faq.id}`}
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              lineHeight: 1.75,
              color: '#555',
              paddingBottom: '22px',
              maxWidth: '740px',
            }}>
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ── Main Section ──────────────────────────────────────────────────────────────
const FAQ = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      style={{
        position: 'relative',
        padding: 'clamp(72px, 10vw, 120px) 24px',
        background: '#F8F9FA',
        borderTop: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

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
            Preguntas frecuentes
          </span>
          <h2
            id="faq-heading"
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
            Todo lo que quieres{' '}
            <span style={{ color: '#3D4A31' }}>saber</span>
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(15px, 2vw, 17px)',
            color: '#666',
            lineHeight: 1.65,
          }}>
            Si tienes una pregunta que no está aquí, escríbenos por WhatsApp — te respondemos en minutos.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div>
          {FAQS.map((faq, i) => (
            <FAQItem key={faq.id} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
