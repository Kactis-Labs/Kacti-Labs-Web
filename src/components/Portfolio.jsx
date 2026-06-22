import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const PROJECTS = [
  {
    id: 'restaurant',
    name: 'La Hacienda',
    category: 'Restaurante',
    tag: 'Concepto',
    description: 'Landing page elegante con menú visual y reservas online para restaurante gourmet peruano.',
    image: '/mockup_restaurant.png',
    plan: 'Profesional',
    color: '#1a0f00',
    accent: '#c9883a',
  },
  {
    id: 'dental',
    name: 'Sonría Dental',
    category: 'Clínica dental',
    tag: 'Propuesta de diseño',
    description: 'Web institucional con agenda online y galería de casos para clínica odontológica moderna.',
    image: '/mockup_dental.png',
    plan: 'Profesional',
    color: '#001f2e',
    accent: '#2eb8b8',
  },
  {
    id: 'fitness',
    name: 'FORGE Gym',
    category: 'Centro de fitness',
    tag: 'Concepto',
    description: 'Sitio de alto impacto con planes de membresía y horario de clases para gimnasio premium.',
    image: '/mockup_fitness.png',
    plan: 'Premium',
    color: '#0f0f0f',
    accent: '#e85d04',
  },
  {
    id: 'spa',
    name: 'Zenith Spa',
    category: 'Spa & Bienestar',
    tag: 'Propuesta de diseño',
    description: 'Experiencia web serena con galería inmersiva y sistema de reservas para spa de lujo.',
    image: '/mockup_spa.png',
    plan: 'Profesional',
    color: '#1c2416',
    accent: '#8fad6e',
  },
];

// ── Project Card ──────────────────────────────────────────────────────────────
const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.08)',
        background: '#fff',
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.14)' : '0 4px 20px rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.3s, transform 0.3s',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        cursor: 'default',
        position: 'relative',
      }}
    >
      {/* Image area */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16/10',
        overflow: 'hidden',
        background: project.color,
      }}>
        <img
          src={project.image}
          alt={`Diseño web ${project.name} — ${project.tag}`}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
          }}
        />

        {/* Overlay on hover */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(to top, ${project.color}ee 0%, transparent 60%)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '24px',
        }}>
          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '13px',
            fontWeight: 600,
            color: '#fff',
            letterSpacing: '0.04em',
          }}>
            <ExternalLink size={14} />
            Ver propuesta completa
          </span>
        </div>

        {/* Tag badge */}
        <div style={{
          position: 'absolute',
          top: '14px',
          left: '14px',
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)',
          color: '#fff',
          fontFamily: "'Inter', sans-serif",
          fontSize: '11px',
          fontWeight: 500,
          padding: '4px 10px',
          borderRadius: '100px',
          letterSpacing: '0.04em',
        }}>
          {project.tag}
        </div>

        {/* Plan badge */}
        <div style={{
          position: 'absolute',
          top: '14px',
          right: '14px',
          background: 'rgba(61,74,49,0.85)',
          backdropFilter: 'blur(8px)',
          color: '#fff',
          fontFamily: "'Inter', sans-serif",
          fontSize: '11px',
          fontWeight: 600,
          padding: '4px 10px',
          borderRadius: '100px',
        }}>
          Plan {project.plan}
        </div>
      </div>

      {/* Card content */}
      <div style={{ padding: '24px 28px' }}>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: project.accent !== '#8fad6e' ? '#3D4A31' : '#3D4A31',
          marginBottom: '8px',
        }}>
          {project.category}
        </div>
        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '20px',
          fontWeight: 700,
          color: '#0B0B0B',
          letterSpacing: '-0.01em',
          marginBottom: '10px',
        }}>
          {project.name}
        </h3>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '14px',
          color: '#666',
          lineHeight: 1.6,
        }}>
          {project.description}
        </p>
      </div>
    </motion.article>
  );
};

// ── Main Section ──────────────────────────────────────────────────────────────
const Portfolio = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section
      id="portafolio"
      aria-labelledby="portfolio-heading"
      style={{
        position: 'relative',
        padding: 'clamp(72px, 10vw, 120px) 24px',
        background: '#F8F9FA',
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
            Portafolio
          </span>
          <h2
            id="portfolio-heading"
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
            Diseños que{' '}
            <span style={{ color: '#3D4A31' }}>hablan por sí solos</span>
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: '#666',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: 1.65,
          }}>
            Conceptos y propuestas que muestran el nivel de detalle y cuidado
            que ponemos en cada proyecto.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 520px), 1fr))',
          gap: '24px',
        }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ textAlign: 'center', marginTop: '56px' }}
        >
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '16px',
            color: '#555',
            marginBottom: '24px',
          }}>
            ¿Quieres ver cómo quedaría <strong style={{ color: '#0B0B0B' }}>tu negocio</strong>?
          </p>
          <motion.a
            href="https://wa.me/51999999999?text=Hola%2C%20me%20gustar%C3%ADa%20ver%20c%C3%B3mo%20quedar%C3%ADa%20la%20web%20de%20mi%20negocio"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ backgroundColor: '#3D4A31', scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 32px',
              background: '#0B0B0B',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '8px',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '15px',
              fontWeight: 600,
              border: '1px solid #0B0B0B',
              transition: 'background 0.2s',
            }}
          >
            Solicita tu propuesta gratuita
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
