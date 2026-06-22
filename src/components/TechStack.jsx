import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TECH_STACK = [
  {
    id: 'react',
    name: 'React',
    description: 'Interfaces dinámicas y rápidas',
    svg: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="#61DAFB">
        <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85-1.03 0-1.87-.85-1.87-1.85 0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 01-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47m-7.07-4l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m5.26-4.38c-1.59-1.5-2.97-2.08-3.6-1.7-.63.35-.82 1.82-.31 3.96.79-.18 1.62-.3 2.4-.36.48-.67.99-1.31 1.51-1.9M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 20c.63-.35.82-1.82.31-3.96-.79.18-1.62.3-2.4.36-.48.67-.99 1.31-1.51 1.9 1.59 1.5 2.97 2.08 3.6 1.7m.71-5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m-1.42-2l.3.51c.11-.28.22-.57.29-.86a19.27 19.27 0 00-.88-.16l.29.51M21.43 12c.51 2.14.32 3.61-.31 3.96-.63.38-2.01-.2-3.6-1.7.52-.59 1.03-1.23 1.51-1.9.9-.12 1.69-.27 2.4-.36m-7.82-1.47L12.8 9.06A22.4 22.4 0 0012 9c-.27 0-.54 0-.8.06l-.81 1.47.81 1.47c.26.06.53.06.8.06.27 0 .54 0 .8-.06l.81-1.47M12 3c.6 0 1.17 0 1.71.03L12 5.25 10.29 3.03C10.83 3 11.4 3 12 3M3.57 12c-.51-2.14-.32-3.61.31-3.96.63-.38 2.01.2 3.6 1.7-.52.59-1.03 1.23-1.51 1.9-.9.12-1.69.27-2.4.36"/>
      </svg>
    ),
  },
  {
    id: 'vercel',
    name: 'Vercel',
    description: 'Despliegue global ultrarrápido',
    svg: (
      <svg viewBox="0 0 24 24" width="30" height="30" fill="#000">
        <path d="M24 22.525H0l12-21.05 12 21.05z"/>
      </svg>
    ),
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Control de versiones seguro',
    svg: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="#0B0B0B">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
  },
  {
    id: 'supabase',
    name: 'Supabase',
    description: 'Base de datos en tiempo real',
    svg: (
      <svg viewBox="0 0 24 24" width="30" height="30" fill="#3ECF8E">
        <path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.579L11.9 1.036z"/>
      </svg>
    ),
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    description: 'Diseño moderno y consistente',
    svg: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="#06B6D4">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
      </svg>
    ),
  },
  {
    id: 'framer',
    name: 'Framer Motion',
    description: 'Animaciones de alto rendimiento',
    svg: (
      <svg viewBox="0 0 24 24" width="30" height="30" fill="#0055FF">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/>
      </svg>
    ),
  },
];

// ── Tech Badge ────────────────────────────────────────────────────────────────
const TechBadge = ({ tech, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.03, transition: { duration: 0.2 } }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '20px 24px',
        background: '#fff',
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: '12px',
        cursor: 'default',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        transition: 'box-shadow 0.25s',
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(61,74,49,0.1)'; e.currentTarget.style.borderColor = 'rgba(61,74,49,0.2)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'; }}
    >
      <div style={{
        width: '48px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        background: '#F8F9FA',
        borderRadius: '10px',
      }}>
        {tech.svg}
      </div>
      <div>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '15px',
          fontWeight: 700,
          color: '#0B0B0B',
          marginBottom: '3px',
        }}>
          {tech.name}
        </div>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          color: '#888',
        }}>
          {tech.description}
        </div>
      </div>
    </motion.div>
  );
};

// ── Main Section ──────────────────────────────────────────────────────────────
const TechStack = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section
      id="tecnologias"
      aria-labelledby="tech-heading"
      style={{
        position: 'relative',
        padding: 'clamp(72px, 10vw, 120px) 24px',
        background: '#F8F9FA',
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
            Tecnologías
          </span>
          <h2
            id="tech-heading"
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
            Construido con herramientas
            <br />
            <span style={{ color: '#3D4A31' }}>de primer nivel</span>
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(15px, 2vw, 17px)',
            color: '#666',
            maxWidth: '480px',
            margin: '0 auto',
            lineHeight: 1.65,
          }}>
            Usamos el stack que usan las grandes: velocidad, seguridad
            y escalabilidad garantizadas desde el día uno.
          </p>
        </motion.div>

        {/* Tech Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
          gap: '16px',
        }}>
          {TECH_STACK.map((tech, i) => (
            <TechBadge key={tech.id} tech={tech} index={i} />
          ))}
        </div>

        {/* Seal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{
            marginTop: '48px',
            textAlign: 'center',
            padding: '16px 0',
            borderTop: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            color: '#aaa',
            letterSpacing: '0.06em',
          }}>
            ✦ Sello de calidad técnica — código limpio, rendimiento verificado, estándares web modernos
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
